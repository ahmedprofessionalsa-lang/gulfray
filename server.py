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

from price_engine import engine, PriceEngine
from mailer import send_order_email, load_config

app = FastAPI(title="GulfRay Medical Quotation System - Secure Enterprise Edition", version="2.1")

# Ensure required directories exist
os.makedirs("uploads", exist_ok=True)
os.makedirs("outbox", exist_ok=True)
os.makedirs("static", exist_ok=True)
os.makedirs("static/css", exist_ok=True)
os.makedirs("static/js", exist_ok=True)

# -------------------------------------------------------------
# Security & Rate Limiting Infrastructure
# -------------------------------------------------------------
# Track requests per IP to prevent spam and brute-force
order_rate_limits = defaultdict(list)     # ip -> list of timestamps
admin_pin_attempts = defaultdict(list)    # ip -> list of failed attempt timestamps

MAX_ORDERS_PER_WINDOW = 3                 # Max 3 orders every 5 minutes per IP
ORDER_WINDOW_SECONDS = 300                # 5 minutes
MAX_PIN_FAILURES = 5                      # Max 5 wrong PIN attempts
LOCKOUT_SECONDS = 900                     # 15 minutes lockout

def check_order_rate_limit(client_ip: str):
    now = time.time()
    # Filter out timestamps older than the window
    order_rate_limits[client_ip] = [t for t in order_rate_limits[client_ip] if now - t < ORDER_WINDOW_SECONDS]
    if len(order_rate_limits[client_ip]) >= MAX_ORDERS_PER_WINDOW:
        raise HTTPException(
            status_code=429,
            detail="تم تجاوز الحد المسموح به لإرسال الطلبات مؤقتاً لحماية النظام من الإغراق. يرجى الانتظار 5 دقائق."
        )
    order_rate_limits[client_ip].append(now)

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
# Request Models
# -------------------------------------------------------------
class MatchRequest(BaseModel):
    category: str
    gender: Optional[str] = None
    thickness: Optional[str] = None
    size: Optional[str] = None
    code: Optional[str] = None

class CustomerModel(BaseModel):
    name: str
    organization: str
    city: str
    phone: str
    email: str
    payment_method: str
    notes: Optional[str] = ""

class CartItemModel(BaseModel):
    code: str
    qty: int
    embroidery: Optional[str] = ""
    custom_logo: Optional[str] = ""

class OrderRequest(BaseModel):
    customer: CustomerModel
    items: List[CartItemModel]
    logo_filename: Optional[str] = None
    honeypot: Optional[str] = ""  # Invisible bot trap

# -------------------------------------------------------------
# API Endpoints
# -------------------------------------------------------------
@app.get("/api/catalog")
def get_catalog():
    cfg = load_config()
    catalog_tree = engine.get_catalog_tree()
    return {
        "company_name_ar": cfg.get("company_name_ar", "GulfRay® | شركة سقالة حلول الوقاية"),
        "company_name_en": cfg.get("company_name_en", "GulfRay® | Siqalah Shielding Solutions"),
        "company_subtitle_ar": cfg.get("company_subtitle_ar", "مصنع لإنتاج Radiation Protection Aprons وحلول الوقاية من الأشعة"),
        "company_subtitle_en": cfg.get("company_subtitle_en", "Manufacturer of Radiation Protection Aprons & Radiation Shielding Solutions"),
        "vat_rate": cfg.get("vat_rate", 0.15),
        "currency_ar": cfg.get("currency_ar", "ر.س"),
        "currency_en": cfg.get("currency_en", "SAR"),
        "categories": catalog_tree["categories"],
        "tree": catalog_tree["tree"],
        "total_items": catalog_tree["total_items"],
        "items": engine.items
    }

@app.post("/api/match")
def match_item(req: MatchRequest):
    item = engine.match_item(
        category=req.category,
        gender=req.gender,
        thickness=req.thickness,
        size=req.size,
        code=req.code
    )
    if not item:
        raise HTTPException(status_code=404, detail="No matching item found for given specs.")
    return item

@app.post("/api/upload-logo")
async def upload_logo(file: UploadFile = File(...)):
    ext = os.path.splitext(file.filename)[1].lower()
    if ext not in [".png", ".jpg", ".jpeg", ".svg", ".webp", ".pdf"]:
        raise HTTPException(status_code=400, detail="Invalid file type. Allowed: PNG, JPG, JPEG, SVG, WEBP, PDF")
    
    unique_filename = f"logo_{uuid.uuid4().hex[:10]}{ext}"
    dest_path = os.path.join("uploads", unique_filename)
    
    with open(dest_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
        
    return {"filename": unique_filename, "url": f"/uploads/{unique_filename}"}

@app.post("/api/order")
def create_order(req: OrderRequest, request: Request):
    client_ip = request.client.host if request.client else "unknown"

    # 1. Anti-Bot Honeypot Shield
    if req.honeypot and req.honeypot.strip():
        # If honeypot is filled, it's an automated spam bot
        return {"success": True, "order_id": "REJECTED-SPAM", "message": "OK"}

    # 2. Anti-Spam / Rate Limiting Check
    check_order_rate_limit(client_ip)

    if not req.items:
        raise HTTPException(status_code=400, detail="Cart is empty.")
    
    # 3. Input Validation
    phone = req.customer.phone.strip()
    if len(phone) < 8 or not any(char.isdigit() for char in phone):
        raise HTTPException(status_code=400, detail="رقم الجوال المدخل غير صحيح.")
    
    if "@" not in req.customer.email or "." not in req.customer.email:
        raise HTTPException(status_code=400, detail="صيغة البريد الإلكتروني غير صحيحة.")

    cfg = load_config()
    vat_rate = cfg.get("vat_rate", 0.15)
    
    # 4. CRITICAL FINANCIAL SECURITY: Zero-Trust Price Verification
    # The server NEVER trusts client-submitted prices!
    # All prices are strictly looked up from the official Excel database on the server.
    verified_items = []
    subtotal = 0.0

    for item_req in req.items:
        code = item_req.code.strip()
        if code not in engine.items_by_code:
            raise HTTPException(status_code=400, detail=f"كود الصنف ({code}) غير موجود في قاعدة الأسعار المعتمدة.")
        
        official_item = engine.items_by_code[code]
        qty = max(1, min(500, int(item_req.qty)))
        official_price = float(official_item["price_sar"])
        
        verified_items.append({
            "code": official_item["code"],
            "name_ar": official_item["name_ar"],
            "name_en": official_item["name_en"],
            "category": official_item["category"],
            "category_ar": official_item.get("category_ar", official_item["category"]),
            "gender": official_item["gender"],
            "gender_ar": official_item["gender_ar"],
            "thickness": official_item["thickness"],
            "size": official_item["size"],
            "price_sar": official_price,
            "qty": qty,
            "embroidery": item_req.embroidery[:100] if item_req.embroidery else "",
            "custom_logo": item_req.custom_logo
        })
        subtotal += official_price * qty

    vat = subtotal * vat_rate
    grand_total = subtotal + vat
    
    order_id = f"GR-RFQ-{datetime.now().strftime('%Y%m%d%H%M%S')}"
    created_at = datetime.now().strftime("%Y-%m-%d %H:%M")
    
    logo_path = os.path.join("uploads", req.logo_filename) if req.logo_filename else None
    if logo_path and not os.path.exists(logo_path):
        logo_path = None

    order_payload = {
        "order_id": order_id,
        "created_at": created_at,
        "client_ip": client_ip,
        "customer": req.customer.model_dump(),
        "items": verified_items,
        "subtotal": round(subtotal, 2),
        "vat": round(vat, 2),
        "grand_total": round(grand_total, 2),
        "logo_path": logo_path,
        "logo_filename": req.logo_filename
    }

    success, msg = send_order_email(order_payload)
    
    return {
        "success": True,
        "order_id": order_id,
        "created_at": created_at,
        "message": msg,
        "financials": {
            "subtotal": round(subtotal, 2),
            "vat": round(vat, 2),
            "grand_total": round(grand_total, 2)
        }
    }

class AdminSettingsModel(BaseModel):
    pin: str
    notification_emails: List[str]
    smtp_enabled: Optional[bool] = False
    smtp_host: Optional[str] = "smtp.office365.com"
    smtp_port: Optional[int] = 587
    smtp_user: Optional[str] = ""
    smtp_password: Optional[str] = ""
    sender_name: Optional[str] = "GulfRay Orders System"

@app.post("/api/admin/get-settings")
def get_admin_settings(request: Request, payload: Dict):
    client_ip = request.client.host if request.client else "unknown"
    check_admin_lockout(client_ip)
    
    pin = payload.get("pin", "").strip()
    cfg = load_config()
    expected_pin = str(cfg.get("admin_pin", "9988"))
    
    if pin != expected_pin:
        record_pin_failure(client_ip)
        remaining = MAX_PIN_FAILURES - len(admin_pin_attempts[client_ip])
        raise HTTPException(status_code=401, detail=f"الرمز السري غير صحيح. المحاولات المتبقية: {remaining}")
    
    admin_pin_attempts[client_ip] = []
    
    smtp = cfg.get("smtp", {})
    return {
        "notification_emails": cfg.get("notification_emails", []),
        "smtp": {
            "enabled": smtp.get("enabled", False),
            "host": smtp.get("host", "smtp.office365.com"),
            "port": smtp.get("port", 587),
            "user": smtp.get("user", ""),
            "has_password": bool(smtp.get("password")),
            "sender_name": smtp.get("sender_name", "GulfRay Orders System")
        }
    }

@app.post("/api/admin/save-settings")
def save_admin_settings(request: Request, req: AdminSettingsModel):
    client_ip = request.client.host if request.client else "unknown"
    check_admin_lockout(client_ip)
    
    cfg = load_config()
    expected_pin = str(cfg.get("admin_pin", "9988"))
    
    if req.pin.strip() != expected_pin:
        record_pin_failure(client_ip)
        raise HTTPException(status_code=401, detail="الرمز السري غير صحيح.")
    
    # Clean email list
    clean_emails = [e.strip() for e in req.notification_emails if e.strip() and "@" in e]
    cfg["notification_emails"] = clean_emails
    
    # Update SMTP settings if provided
    if req.smtp_host:
        cfg["smtp"]["host"] = req.smtp_host.strip()
    if req.smtp_port:
        cfg["smtp"]["port"] = req.smtp_port
    if req.smtp_user is not None:
        cfg["smtp"]["user"] = req.smtp_user.strip()
        cfg["smtp"]["sender_email"] = req.smtp_user.strip()
    if req.smtp_password and req.smtp_password.strip():
        cfg["smtp"]["password"] = req.smtp_password.strip()
    if req.sender_name:
        cfg["smtp"]["sender_name"] = req.sender_name.strip()
    cfg["smtp"]["enabled"] = req.smtp_enabled
    
    from mailer import save_config
    save_config(cfg)
    
    return {
        "success": True,
        "message": f"تم حفظ الإعدادات بنجاح! تم تحديث قائمة الإيميلات ({len(clean_emails)} إيميل مسجل).",
        "notification_emails": clean_emails
    }

@app.post("/api/admin/send-test-email")
def test_email_endpoint(request: Request, payload: Dict):
    client_ip = request.client.host if request.client else "unknown"
    check_admin_lockout(client_ip)
    
    pin = payload.get("pin", "").strip()
    cfg = load_config()
    if pin != str(cfg.get("admin_pin", "9988")):
        raise HTTPException(status_code=401, detail="الرمز السري غير صحيح.")
    
    from mailer import send_test_email
    success, msg = send_test_email()
    return {"success": success, "message": msg}

@app.post("/api/admin/upload-pricelist")
async def upload_pricelist(request: Request, pin: str = Form(...), file: UploadFile = File(...)):
    client_ip = request.client.host if request.client else "unknown"
    
    # 1. Anti-Brute Force Protection
    check_admin_lockout(client_ip)

    cfg = load_config()
    expected_pin = str(cfg.get("admin_pin", "9988"))
    
    if pin.strip() != expected_pin:
        record_pin_failure(client_ip)
        remaining = MAX_PIN_FAILURES - len(admin_pin_attempts[client_ip])
        raise HTTPException(
            status_code=401,
            detail=f"الرمز السري غير صحيح. المحاولات المتبقية قبل القفل: {remaining}"
        )
    
    # Clear failures on successful PIN
    admin_pin_attempts[client_ip] = []

    if not file.filename.endswith((".xlsx", ".xls")):
        raise HTTPException(status_code=400, detail="نوع الملف غير مدعوم، يرجى رفع ملف إكسل .xlsx")
    
    # Backup existing file
    backup_path = f"GulfRay price list_backup_{datetime.now().strftime('%Y%m%d%H%M%S')}.xlsx"
    if os.path.exists("GulfRay price list.xlsx"):
        shutil.copy("GulfRay price list.xlsx", backup_path)
    
    temp_target = "GulfRay price list_temp.xlsx"
    with open(temp_target, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
        
    temp_engine = PriceEngine(excel_path=temp_target)
    if not temp_engine.items:
        os.remove(temp_target)
        raise HTTPException(status_code=400, detail="تعذر قراءة بيانات الأصناف من الملف المرفوع. تأكد من وجود ورقة العمل والأعمدة المطلوبة.")
    
    shutil.move(temp_target, "GulfRay price list.xlsx")
    engine.load_data()
    
    return {
        "success": True,
        "message": f"تم تحديث قائمة الأسعار بنجاح! تم تحميل {len(engine.items)} صنفاً عبر {len(engine.categories)} فئات رئيسية.",
        "total_items": len(engine.items),
        "categories": engine.categories
    }

@app.get("/api/outbox/{order_id}/html")
def get_outbox_html(order_id: str):
    file_path = os.path.join("outbox", f"{order_id}.html")
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="Email not found.")
    with open(file_path, "r", encoding="utf-8") as f:
        return HTMLResponse(content=f.read())

app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")
app.mount("/", StaticFiles(directory="static", html=True), name="static")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("server:app", host="0.0.0.0", port=8000, reload=True)
