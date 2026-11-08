import os
import json
from datetime import datetime
from typing import Dict, List, Optional
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.gzip import GZipMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse, JSONResponse

from catalog_engine import catalog_engine
from mailer import load_config, save_config

app = FastAPI(
    title="GulfRay® Medical - First Saudi Radiation Protection Factory",
    description="Official Local Product & Industrial Showcase Platform",
    version="4.0"
)

# Enable automatic Gzip compression for all responses > 1000 bytes
app.add_middleware(GZipMiddleware, minimum_size=1000)

# Custom HTTP Middleware for Browser Caching & CDN Optimization
@app.middleware("http")
async def add_cache_control_headers(request: Request, call_next):
    response = await call_next(request)
    path = request.url.path
    # Cache static assets (CSS, JS, Images, Fonts) for 7 days
    response.headers["Access-Control-Allow-Origin"] = "*"
    if any(path.startswith(prefix) for prefix in ("/css/", "/js/", "/images/", "/fonts/")):
        response.headers["Cache-Control"] = "public, max-age=604800, immutable"
    elif path.startswith("/api/"):
        response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    return response

# Ensure required directories exist
os.makedirs("static", exist_ok=True)
os.makedirs("static/css", exist_ok=True)
os.makedirs("static/js", exist_ok=True)
os.makedirs("static/images", exist_ok=True)

# -------------------------------------------------------------
# Factory Data & Specifications (Saudi Vision 2030)
# -------------------------------------------------------------
FACTORY_INFO = {
    "brand": "GulfRay® | شركة سقالة حلول الوقاية",
    "factory_name_ar": "مصنع جلف راي للحلول الوقائية من الإشعاع الطبي",
    "factory_name_en": "GulfRay Medical Radiation Shielding Manufacturing Facility",
    "country": "المملكة العربية السعودية | Saudi Arabia",
    "city": "الرياض - المدينة الصناعية الثانية | Riyadh, 2nd Industrial City",
    "national_classification": "أول مصنع وطني سعودي متخصص في حماية الأشعة التشخيصية والتداخلية",
    "standards": [
        "IEC 61331-1:2014 / IEC 61331-3:2014 Certified",
        "ASTM F2547-18 Medical Radiation Attenuation Compliant",
        "CE Marked Medical Device Class I",
        "ISO 13485:2016 Medical Devices Quality Management",
        "Saudi FDA Registered Facility"
    ],
    "capabilities": {
        "core_types": [
            {"code": "UM", "name": "Ultra-Lightest Lead-Free Tri-Element (Bi-Sb-W)", "lightweight_reduction": "38%"},
            {"code": "NL", "name": "Lightweight Non-Lead Multi-Element", "lightweight_reduction": "25%"},
            {"code": "SL", "name": "Standard Lead Premium Core", "lightweight_reduction": "0%"}
        ],
        "precision_manufacturing": [
            "Computerized automated laser cutting ensuring millimeter precision for all 9 apron styles",
            "Double-welded reinforced seam construction with high-tensile medical nylon thread",
            "100% radiographic scan testing on every production batch before release",
            "In-house digital monogramming and hospital emblem embroidery laboratory"
        ]
    },
    "contact": {
        "sales_phone": "+966 50 000 0000",
        "factory_phone": "+966 11 000 0000",
        "email": "info@gulfray.com.sa",
        "location_maps": "https://maps.google.com/?q=Riyadh+Industrial+City"
    }
}

# -------------------------------------------------------------
# API Endpoints (Catalog, Fabrics, Factory Showcase)
# -------------------------------------------------------------
@app.get("/api/catalog")
def get_catalog():
    """Returns the full catalog metadata, core materials, collections, and fabric reference with zero prices."""
    cfg = load_config()
    catalog_data = catalog_engine.get_full_catalog_data()
    catalog_data["company_name_ar"] = cfg.get("company_name_ar", "GulfRay® | شركة سقالة حلول الوقاية")
    catalog_data["company_name_en"] = cfg.get("company_name_en", "GulfRay® | First Saudi Radiation Protection Factory")
    catalog_data["company_subtitle_ar"] = cfg.get("company_subtitle_ar", "مصنع وطني رائد لإنتاج ملابس وحلول الوقاية من الأشعة")
    catalog_data["company_subtitle_en"] = cfg.get("company_subtitle_en", "First Saudi Manufacturer of Radiation Protection Aprons & Shielding")
    return catalog_data

@app.get("/api/fabrics")
def get_fabrics():
    """Returns official 2027 outer fabric colour reference: solids, prints, and trims."""
    return catalog_engine.fabric_reference

@app.get("/api/factory")
def get_factory_info():
    """Returns Saudi factory specifications, industrial standards, and facility data."""
    return {
        "success": True,
        "factory": FACTORY_INFO
    }

# Mount static files
app.mount("/", StaticFiles(directory="static", html=True), name="static")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("server:app", host="0.0.0.0", port=8000, reload=True)
