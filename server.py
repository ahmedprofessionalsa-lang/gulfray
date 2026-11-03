import os
import json
import uuid
import shutil
import time
from datetime import datetime
from typing import Dict, List, Optional
from collections import defaultdict
from fastapi import FastAPI, File, UploadFile, Form, HTTPException, Request
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse, JSONResponse
from pydantic import BaseModel, EmailStr

from catalog_engine import catalog_engine
from mailer import send_rfq_emails, load_config, save_config

app = FastAPI(title="GulfRay Medical - Radiation Protection RFQ Portal", version="3.0")

# Ensure required directories exist
os.makedirs("uploads", exist_ok=True)
os.makedirs("outbox", exist_ok=True)
os.makedirs("static", exist_ok=True)
os.makedirs("static/css", exist_ok=True)
os.makedirs("static/js", exist_ok=True)
os.makedirs("static/images", exist_ok=True)

# -------------------------------------------------------------
# Security & Rate Limiting Infrastructure
# -------------------------------------------------------------
rfq_rate_limits = defaultdict(list)        # ip -> list of timestamps
admin_pin_attempts = defaultdict(list)     # ip -> list of failed attempt timestamps

MAX_RFQS_PER_WINDOW = 5                    # Max 5 RFQ submissions every 5 minutes per IP
RFQ_WINDOW_SECONDS = 300                   # 5 minutes
MAX_PIN_FAILURES = 5                       # Max 5 wrong PIN attempts
LOCKOUT_SECONDS = 900                      # 15 minutes lockout

def check_rfq_rate_limit(client_ip: str):
    now = time.time()
    rfq_rate_limits[client_ip] = [t for t in rfq_rate_limits[client_ip] if now - t < RFQ_WINDOW_SECONDS]
    if len(rfq_rate_limits[client_ip]) >= MAX_RFQS_PER_WINDOW:
        raise HTTPException(
            status_code=429,
            detail="تم تجاوز الحد المسموح به لإرسال طلبات عروض الأسعار مؤقتاً لحماية النظام من الإغراق. يرجى الانتظار بضع دقائق."
        )
    rfq_rate_limits[client_ip].append(now)

def check_admin_lockout(client_ip: str):
    now = time.time()
    admin_pin_attempts[client_ip] = [t for t in admin_pin_attempts[client_ip] if now - t < LOCKOUT_SECONDS]
    if len(admin_pin_attempts[client_ip]) >= MAX_PIN_FAILURES:
        raise HTTPException(
            status_code=403,
            detail="تم قفل إمكانية إدخال الرمز السري مؤقتاً بسبب تكرار المحاولات الخاطئة. يرجى الانتظار 15 دقيقة."
        )

def record_pin_failure(client_ip: str):
    admin_pin_attempts[client_ip].append(time.time())

# -------------------------------------------------------------
# Request Models (ZERO PRICES)
# -------------------------------------------------------------
class CustomerModel(BaseModel):
    name: str
    organization: str
    city: str
    phone: str
    email: str
    notes: Optional[str] = ""

class RFQItemModel(BaseModel):
    category: str
    name_en: Optional[str] = ""
    name_ar: Optional[str] = ""
    code: Optional[str] = ""
    core_material: Optional[str] = "UM (Ultra-Lightest)"
    collection: Optional[str] = "Saudi Editions (Saudi Green)"
    thickness: Optional[str] = "0.50 mm Pb"
    size: Optional[str] = "L"
    gender: Optional[str] = "Unisex"
    qty: int = 1
    embroidery: Optional[str] = ""
    custom_logo: Optional[str] = ""

class RFQRequest(BaseModel):
    customer: CustomerModel
    items: List[RFQItemModel]
    logo_filename: Optional[str] = None
    honeypot: Optional[str] = ""  # Invisible bot trap

# -------------------------------------------------------------
# API Endpoints
# -------------------------------------------------------------
@app.get("/api/catalog")
def get_catalog():
    """Returns the full catalog metadata, core materials, and collections with zero prices."""
    cfg = load_config()
    catalog_data = catalog_engine.get_full_catalog_data()
    catalog_data["company_name_ar"] = cfg.get("company_name_ar", "GulfRay® | شركة سقالة حلول الوقاية")
    catalog_data["company_name_en"] = cfg.get("company_name_en", "GulfRay® | شركة سقالة حلول الوقاية")
    catalog_data["company_subtitle_ar"] = cfg.get("company_subtitle_ar", "مصنع لإنتاج ملابس وحلول الوقاية من الأشعة")
    catalog_data["company_subtitle_en"] = cfg.get("company_subtitle_en", "First Saudi Manufacturer of Radiation Protection Aprons & Shielding")
    return catalog_data

@app.post("/api/rfq")
def submit_rfq(rfq_data: RFQRequest, request: Request):
    """
    Handles customer RFQ submission:
    - Validates bot honeypot
    - Validates rate limiting
    - Generates official RFQ ID
    - Sends notifications to sales team + customer confirmation email
    """
    client_ip = request.client.host if request.client else "127.0.0.1"
    
    # Honeypot validation
    if rfq_data.honeypot and rfq_data.honeypot.strip():
        # Fake success response for automated bots
        return {
            "success": True,
            "rfq_id": f"GR-RFQ-{datetime.now().strftime('%Y%m%d%H%M%S')}",
            "message": "Request for Quotation submitted successfully."
        }

    # Rate limiting check
    check_rfq_rate_limit(client_ip)

    if not rfq_data.items:
        raise HTTPException(status_code=400, detail="لا يمكن إرسال طلب عرض سعر بدون تحديد صنف واحد على الأقل.")

    # Validate quantities
    for item in rfq_data.items:
        if item.qty <= 0 or item.qty > 5000:
            raise HTTPException(status_code=400, detail="الكمية المطلوبة يجب أن تكون بين 1 و 5000 قطعة لكل صنف.")

    rfq_id = f"GR-RFQ-{datetime.now().strftime('%Y%m%d%H%M%S')}"
    created_at = datetime.now().strftime("%Y-%m-%d %H:%M")

    rfq_record = {
        "rfq_id": rfq_id,
        "created_at": created_at,
        "customer": rfq_data.customer.dict(),
        "items": [it.dict() for it in rfq_data.items],
        "logo_filename": rfq_data.logo_filename,
        "client_ip": client_ip
    }

    # Dispatch emails via transactional engine
    success, email_msg = send_rfq_emails(rfq_record)

    return {
        "success": True,
        "rfq_id": rfq_id,
        "message_ar": f"تم استلام طلب عرض السعر بنجاح برقم {rfq_id}. تم إرسال رسالة تأكيد إلى بريدك الإلكتروني وسيتم التواصل معك بالعرض المعتمد خلال 24 ساعة.",
        "message_en": f"Your RFQ ({rfq_id}) has been submitted successfully. A confirmation email has been dispatched to your inbox and our technical shielding team will provide your official quotation within 24 business hours.",
        "email_status": email_msg
    }

@app.post("/api/upload-logo")
async def upload_logo(file: UploadFile = File(...)):
    """Handles hospital/department logo uploads for custom apron embroidery/screen printing."""
    allowed_exts = {".png", ".jpg", ".jpeg", ".pdf", ".svg"}
    filename = file.filename or "logo"
    ext = os.path.splitext(filename)[1].lower()

    if ext not in allowed_exts:
        raise HTTPException(status_code=400, detail="نوع الملف غير مدعوم. يرجى إرفاق صورة (PNG, JPG, SVG) أو ملف PDF.")

    clean_filename = f"logo_{uuid.uuid4().hex[:10]}{ext}"
    target_path = os.path.join("uploads", clean_filename)

    with open(target_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Size check (Max 8 MB)
    if os.path.getsize(target_path) > 8 * 1024 * 1024:
        os.remove(target_path)
        raise HTTPException(status_code=400, detail="حجم الملف كبير جداً. الحد الأقصى المسموح به هو 8 ميجابايت.")

    return {
        "success": True,
        "filename": clean_filename,
        "url": f"/uploads/{clean_filename}"
    }

@app.get("/api/outbox/{rfq_id}/html")
def get_outbox_html(rfq_id: str, type: str = "team"):
    suffix = "_customer.html" if type == "customer" else "_team.html"
    file_path = os.path.join("outbox", f"{rfq_id}{suffix}")
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="Email not found.")
    with open(file_path, "r", encoding="utf-8") as f:
        return HTMLResponse(content=f.read())

# -------------------------------------------------------------
# Admin Settings (Protected by PIN)
# -------------------------------------------------------------
@app.get("/api/admin/config")
def get_admin_config(pin: str, request: Request):
    client_ip = request.client.host if request.client else "127.0.0.1"
    check_admin_lockout(client_ip)
    
    cfg = load_config()
    if pin != cfg.get("admin_pin", "9988"):
        record_pin_failure(client_ip)
        raise HTTPException(status_code=401, detail="الرمز السري غير صحيح.")

    # Return config with masked password
    safe_cfg = json.loads(json.dumps(cfg))
    if "smtp" in safe_cfg and "password" in safe_cfg["smtp"]:
        safe_cfg["smtp"]["password"] = "******"
    return safe_cfg

@app.post("/api/admin/config")
def update_admin_config(update_data: Dict, pin: str, request: Request):
    client_ip = request.client.host if request.client else "127.0.0.1"
    check_admin_lockout(client_ip)
    
    cfg = load_config()
    if pin != cfg.get("admin_pin", "9988"):
        record_pin_failure(client_ip)
        raise HTTPException(status_code=401, detail="الرمز السري غير صحيح.")

    # Update allowed fields
    if "notification_emails" in update_data:
        cfg["notification_emails"] = update_data["notification_emails"]
    if "admin_pin" in update_data and update_data["admin_pin"]:
        cfg["admin_pin"] = str(update_data["admin_pin"])

    save_config(cfg)
    return {"success": True, "message": "تم حفظ الإعدادات بنجاح."}

# Mount static and uploads
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")
app.mount("/", StaticFiles(directory="static", html=True), name="static")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("server:app", host="0.0.0.0", port=8000, reload=True)
