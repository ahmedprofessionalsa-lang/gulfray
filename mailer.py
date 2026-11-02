import os
import json
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders
from datetime import datetime
from typing import Dict, List, Tuple

def load_config():
    with open("config.json", "r", encoding="utf-8") as f:
        return json.load(f)

def save_config(cfg: Dict):
    with open("config.json", "w", encoding="utf-8") as f:
        json.dump(cfg, f, ensure_ascii=False, indent=2)

def generate_team_rfq_html(rfq: Dict) -> str:
    """Generates a formal, executive RFQ notification email for the GulfRay sales & engineering team."""
    items = rfq.get("items", [])
    customer = rfq.get("customer", {})
    rfq_id = rfq.get("rfq_id", f"GR-RFQ-{datetime.now().strftime('%Y%m%d%H%M%S')}")
    created_at = rfq.get("created_at", datetime.now().strftime("%Y-%m-%d %H:%M"))

    items_rows_html = ""
    for idx, item in enumerate(items, 1):
        custom_embroidery = ""
        if item.get("embroidery"):
            custom_embroidery = f"<div style='margin-top: 4px; color: #006C35; font-size: 12px;'>🧵 <b>التطريز المخصص:</b> {item.get('embroidery')}</div>"
        
        logo_note = ""
        if item.get("custom_logo"):
            logo_note = f"<div style='margin-top: 2px; color: #684F8C; font-size: 12px;'>📎 <b>شعار المستشفى:</b> تم إرفاق ملف الشعار مع الطلب</div>"

        core_mat = item.get("core_material", "Lead-Free UM (Ultra-Lightest)")
        collection = item.get("collection", "Saudi Editions (Saudi Green)")
        lead_eq = item.get("thickness", "0.50 mm Pb")
        size = item.get("size", "L")
        gender = item.get("gender", "Unisex")

        items_rows_html += f"""
        <tr style="border-bottom: 1px solid #e2e8f0; font-size: 13px;">
            <td style="padding: 12px 10px; color: #64748b; text-align: center; vertical-align: top;">{idx}</td>
            <td style="padding: 12px 10px; vertical-align: top;">
                <b style="color: #0f172a; font-size: 14px;">{item.get('name_en', item.get('name_ar', 'Radiation Protection Apron'))}</b>
                <div style="color: #047857; font-weight: 600; font-size: 12px; margin-top: 2px;">{item.get('name_ar', '')}</div>
                <div style="color: #64748b; font-size: 12px; margin-top: 4px;">
                    <b>الكود:</b> <span style="font-family: monospace; color: #006C35; font-weight: bold;">{item.get('code', 'N/A')}</span> | 
                    <b>الفئة:</b> {item.get('category', '')}
                </div>
                <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 6px 10px; margin-top: 6px; font-size: 12px; color: #334155;">
                    <div>🛡️ <b>المادة الواقية:</b> {core_mat}</div>
                    <div>🎨 <b>المجموعة واللون:</b> {collection}</div>
                    <div>⚖️ <b>سمك الرصاص:</b> {lead_eq} | <b>المقاس والجنس:</b> {size} ({gender})</div>
                </div>
                {custom_embroidery}
                {logo_note}
            </td>
            <td style="padding: 12px 10px; text-align: center; font-weight: bold; color: #0f172a; font-size: 15px; vertical-align: top;">
                {item.get('qty', 1)}
            </td>
        </tr>
        """

    notes_html = ""
    if customer.get("notes"):
        notes_html = f"""
        <div style="background: #fdfaf5; border: 1px solid #fde68a; border-radius: 8px; padding: 14px; margin-top: 20px;">
            <b style="color: #b45309; font-size: 13px;">📝 ملاحظات العميل / مرجع المناقصة:</b>
            <p style="margin: 6px 0 0; color: #78350f; font-size: 13px; line-height: 1.5;">{customer.get('notes')}</p>
        </div>
        """

    return f"""<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<title>GulfRay RFQ - {rfq_id}</title>
</head>
<body style="font-family: 'Segoe UI', Tahoma, Arial, sans-serif; background-color: #f1f5f9; margin: 0; padding: 25px 15px; color: #1e293b;">
    <div style="max-width: 680px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.06); border: 1px solid #e2e8f0;">
        
        <!-- Header with Saudi Heritage Banner -->
        <div style="background: linear-gradient(135deg, #004d26 0%, #006C35 50%, #684F8C 100%); padding: 25px; color: #ffffff; text-align: center;">
            <div style="font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: #C5A869; font-weight: bold;">
                Saudi Arabia's First Radiation Shielding Manufacturer
            </div>
            <h1 style="margin: 8px 0 4px; font-size: 22px; font-weight: 800; letter-spacing: 0.5px;">
                GulfRay® | شركة سقالة حلول الوقاية
            </h1>
            <div style="font-size: 13px; opacity: 0.95;">
                إشعار طلب عرض سعر جديد (Request For Quotation - RFQ)
            </div>
        </div>

        <!-- Meta Bar -->
        <div style="background: #FAF8F5; border-bottom: 2px solid #C5A869; padding: 12px 25px; font-size: 13px; display: flex; justify-content: space-between;">
            <div>رقم الطلب: <b style="color: #006C35; font-family: monospace; font-size: 14px;">{rfq_id}</b></div>
            <div style="color: #64748b;">تاريخ الاستلام: <b>{created_at}</b></div>
        </div>

        <div style="padding: 25px;">
            <!-- Customer Card -->
            <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 10px; padding: 18px; margin-bottom: 22px;">
                <h3 style="margin: 0 0 12px; font-size: 15px; color: #006C35; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">
                    🏥 بيانات المستشفى والجهة الطالبة:
                </h3>
                <table style="width: 100%; font-size: 13px; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 5px 0; color: #64748b; width: 140px;">اسم الجهة / المستشفى:</td>
                        <td style="padding: 5px 0; font-weight: bold; color: #0f172a;">{customer.get('organization', 'N/A')}</td>
                    </tr>
                    <tr>
                        <td style="padding: 5px 0; color: #64748b;">المسؤول / الطبيب:</td>
                        <td style="padding: 5px 0; font-weight: bold; color: #0f172a;">{customer.get('name', 'N/A')}</td>
                    </tr>
                    <tr>
                        <td style="padding: 5px 0; color: #64748b;">المدينة / المنطقة:</td>
                        <td style="padding: 5px 0; color: #334155;">{customer.get('city', 'N/A')}</td>
                    </tr>
                    <tr>
                        <td style="padding: 5px 0; color: #64748b;">رقم التواصل:</td>
                        <td style="padding: 5px 0; font-weight: bold; color: #006C35; direction: ltr; text-align: right;">{customer.get('phone', 'N/A')}</td>
                    </tr>
                    <tr>
                        <td style="padding: 5px 0; color: #64748b;">البريد الإلكتروني:</td>
                        <td style="padding: 5px 0; color: #0284c7; direction: ltr; text-align: right;">{customer.get('email', 'N/A')}</td>
                    </tr>
                </table>
            </div>

            <!-- Items Table (ZERO PRICES) -->
            <h3 style="margin: 0 0 12px; font-size: 15px; color: #0f172a;">
                📋 الأصناف والمواصفات المطلوبة للتسعير:
            </h3>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                <thead>
                    <tr style="background: #006C35; color: #ffffff; font-size: 12px;">
                        <th style="padding: 10px; text-align: center; width: 40px;">#</th>
                        <th style="padding: 10px; text-align: right;">المواصفات وخيارات التصنيع</th>
                        <th style="padding: 10px; text-align: center; width: 80px;">الكمية</th>
                    </tr>
                </thead>
                <tbody>
                    {items_rows_html}
                </tbody>
            </table>

            {notes_html}

            <!-- Required Action for Sales Team -->
            <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 14px; margin-top: 20px;">
                <b style="color: #1d4ed8; font-size: 13px;">⚡ الإجراء المطلوب من فريق مبيعات GulfRay:</b>
                <p style="margin: 6px 0 0; color: #1e40af; font-size: 12px; line-height: 1.6;">
                    1. مراجعة مواصفات الرصاص والمقاسات والألوان المطلوبة.<br>
                    2. إعداد عرض السعر الرسمي المعتمد شاملاً مدة التوريد وضمان الجودة.<br>
                    3. التواصل مع العميل عبر البريد الإلكتروني أو الهاتف خلال 24 ساعة عمل.
                </p>
            </div>
        </div>

        <!-- Footer -->
        <div style="background: #0f172a; color: #94a3b8; padding: 18px 25px; text-align: center; font-size: 11px;">
            <p style="margin: 0 0 6px; color: #ffffff; font-weight: bold; font-size: 12px;">
                GulfRay® | شركة سقالة حلول الوقاية (Siqalah Shielding Solutions)
            </p>
            <p style="margin: 0 0 4px;">
                المملكة العربية السعودية | صنع في السعودية بموجب أعلى المعايير الطبية الدولية IEC / ASTM / BS EN
            </p>
            <p style="margin: 0; opacity: 0.7;">
                نظام إدارة طلبات عروض الأسعار الإلكتروني - بريد آلي معتمد
            </p>
        </div>
    </div>
</body>
</html>"""

def generate_customer_rfq_html(rfq: Dict) -> str:
    """Generates a luxury, bilingual confirmation email sent directly to the prospective healthcare customer."""
    items = rfq.get("items", [])
    customer = rfq.get("customer", {})
    rfq_id = rfq.get("rfq_id", f"GR-RFQ-{datetime.now().strftime('%Y%m%d%H%M%S')}")
    created_at = rfq.get("created_at", datetime.now().strftime("%Y-%m-%d %H:%M"))

    items_summary_rows = ""
    for idx, item in enumerate(items, 1):
        core_mat = item.get("core_material", "Lead-Free UM (Ultra-Lightest)")
        collection = item.get("collection", "Saudi Editions (Saudi Green)")
        lead_eq = item.get("thickness", "0.50 mm Pb")
        size = item.get("size", "L")

        items_summary_rows += f"""
        <tr style="border-bottom: 1px solid #e2e8f0; font-size: 13px;">
            <td style="padding: 10px; text-align: center; color: #64748b;">{idx}</td>
            <td style="padding: 10px;">
                <b style="color: #0f172a;">{item.get('name_en', 'Radiation Protection Apron')}</b>
                <div style="color: #64748b; font-size: 12px; margin-top: 3px;">
                    {item.get('name_ar', '')} | <b>{core_mat}</b> | {lead_eq} | {collection} | Size: {size}
                </div>
            </td>
            <td style="padding: 10px; text-align: center; font-weight: bold; color: #006C35;">{item.get('qty', 1)}</td>
        </tr>
        """

    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Acknowledgment: Request for Quotation {rfq_id} - GulfRay®</title>
</head>
<body style="font-family: 'Segoe UI', Tahoma, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 25px 15px; color: #1e293b;">
    <div style="max-width: 650px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.06); border: 1px solid #e2e8f0;">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #004d26 0%, #006C35 60%, #C5A869 100%); padding: 30px 25px; color: #ffffff; text-align: center;">
            <div style="font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: #FAF8F5; font-weight: bold;">
                Saudi Arabia's First Radiation Shielding Manufacturer
            </div>
            <h1 style="margin: 8px 0 4px; font-size: 24px; font-weight: 800;">
                GulfRay® | Siqalah Shielding Solutions
            </h1>
            <div style="font-size: 14px; opacity: 0.95;">
                شركة سقالة حلول الوقاية - مصنع حلول الوقاية من الإشعاع
            </div>
        </div>

        <!-- Ref Banner -->
        <div style="background: #FAF8F5; border-bottom: 2px solid #C5A869; padding: 14px 25px; font-size: 13px; text-align: center;">
            <span style="color: #64748b;">RFQ Reference Number:</span> 
            <b style="color: #006C35; font-size: 15px; font-family: monospace; margin-left: 6px;">{rfq_id}</b>
        </div>

        <div style="padding: 30px 25px;">
            <!-- Formal English Greeting -->
            <div style="border-bottom: 1px solid #e2e8f0; padding-bottom: 20px; margin-bottom: 20px;">
                <p style="font-size: 15px; font-weight: 600; color: #0f172a; margin: 0 0 10px;">
                    Dear {customer.get('name', 'Valued Client')},
                </p>
                <p style="font-size: 14px; line-height: 1.6; color: #334155; margin: 0 0 10px;">
                    Thank you for your interest in <b>GulfRay® medical radiation protection solutions</b>. We have officially received your <b>Request for Quotation (RFQ)</b> for <b>{customer.get('organization', 'your healthcare facility')}</b>.
                </p>
                <p style="font-size: 14px; line-height: 1.6; color: #334155; margin: 0;">
                    Our specialized technical sales and radiation shielding engineers are currently reviewing your custom specifications, material cores, and lead equivalences. A formal, comprehensive quotation with certified delivery timelines will be forwarded to your email within <b>24 business hours</b>.
                </p>
            </div>

            <!-- Formal Arabic Greeting -->
            <div style="border-bottom: 1px solid #e2e8f0; padding-bottom: 20px; margin-bottom: 20px; text-align: right; direction: rtl;">
                <p style="font-size: 15px; font-weight: 600; color: #006C35; margin: 0 0 10px;">
                    سعادة {customer.get('name', 'العميل الكريم')} المحترم،
                </p>
                <p style="font-size: 14px; line-height: 1.7; color: #334155; margin: 0 0 10px;">
                    نشكركم لاختياركم <b>GulfRay® | شركة سقالة حلول الوقاية</b>، أول مصنع سعودي متخصص في إنتاج ملابس وإكسسوارات الوقاية من الإشعاع الطبي.
                </p>
                <p style="font-size: 14px; line-height: 1.7; color: #334155; margin: 0;">
                    نؤكد لكم استلام طلبكم المسجل برقم <b>({rfq_id})</b>. يقوم فريقنا الاستشاري حالياً بدراسة المواصفات والتطريزات المطلوبة، وسيتم إرسال عرض السعر الرسمي المعتمد والتواصل معكم خلال <b>24 ساعة عمل</b>.
                </p>
            </div>

            <!-- Requested Items Summary (ZERO PRICES) -->
            <h4 style="margin: 0 0 12px; font-size: 14px; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px;">
                Summary of Requested Garments & Specifications:
            </h4>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
                <thead>
                    <tr style="background: #006C35; color: #ffffff; font-size: 12px;">
                        <th style="padding: 8px 10px; text-align: center; width: 40px;">#</th>
                        <th style="padding: 8px 10px; text-align: left;">Item & Configuration</th>
                        <th style="padding: 8px 10px; text-align: center; width: 60px;">Qty</th>
                    </tr>
                </thead>
                <tbody>
                    {items_summary_rows}
                </tbody>
            </table>

            <!-- Factory & Direct Advisory Contact Card -->
            <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 18px; margin-bottom: 20px; font-size: 13px; text-align: center;">
                <b style="color: #006C35; font-size: 14px; display: block; margin-bottom: 6px;">
                    Direct Procurement Advisory / استشارات التوريد المباشرة:
                </b>
                <div style="color: #0f172a; font-weight: bold; margin-bottom: 6px;">
                    Tarek Bakkar | طارق بكار
                </div>
                <div style="margin-bottom: 6px;">
                    📞 Mobile: <a href="tel:+966562414524" style="color: #006C35; font-weight: bold; text-decoration: none;">+966 56 241 4524</a> &nbsp;|&nbsp; 
                    ✉️ Email: <a href="mailto:tarek@Ims-medical.com" style="color: #0284c7; text-decoration: none;">tarek@Ims-medical.com</a>
                </div>
                <div style="margin-top: 10px;">
                    <a href="https://maps.app.goo.gl/D3wPydgN2Z1XWUgc7?g_st=ic" target="_blank" style="display: inline-block; background: #006C35; color: #ffffff; padding: 7px 16px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 12px;">
                        📍 View GulfRay Factory Location (Google Maps) ↗
                    </a>
                </div>
            </div>

            <!-- Factory Certifications Callout -->
            <div style="background: #FAF8F5; border: 1px solid #C5A869; border-radius: 8px; padding: 15px; font-size: 12px; color: #475569; text-align: center;">
                <div style="font-weight: bold; color: #006C35; margin-bottom: 4px;">
                    🛡️ Tested & Verified by Leading Global Laboratories
                </div>
                <div>
                    National Physical Laboratory (UK) · BS EN 61331-1:2014 Broad-Beam · ASTM F2547-18 · SGS REACH Screening · US FDA Compliant
                </div>
            </div>
        </div>

        <!-- Footer -->
        <div style="background: #0f172a; color: #94a3b8; padding: 22px 25px; text-align: center; font-size: 12px;">
            <p style="margin: 0 0 6px; color: #ffffff; font-weight: bold;">
                GulfRay® | Siqalah Shielding Solutions
            </p>
            <p style="margin: 0 0 4px; font-size: 11px;">
                Kingdom of Saudi Arabia · Made in KSA with Pride · info@gulfray.com.sa
            </p>
            <p style="margin: 0; font-size: 10px; opacity: 0.7;">
                This is an automated acknowledgment confirming receipt of your official RFQ.
            </p>
        </div>
    </div>
</body>
</html>"""

def send_rfq_emails(rfq: Dict) -> Tuple[bool, str]:
    """
    Sends:
    1. Detailed RFQ notification to the GulfRay sales team (with attached logo if uploaded).
    2. Formal acknowledgment letter to the customer's email.
    Saves backups into outbox/.
    """
    cfg = load_config()
    smtp_cfg = cfg.get("smtp", {})
    rfq_id = rfq.get("rfq_id", f"GR-RFQ-{datetime.now().strftime('%Y%m%d%H%M%S')}")
    
    # Save outbox backup
    os.makedirs("outbox", exist_ok=True)
    with open(os.path.join("outbox", f"{rfq_id}.json"), "w", encoding="utf-8") as f:
        json.dump(rfq, f, ensure_ascii=False, indent=2)

    team_html = generate_team_rfq_html(rfq)
    customer_html = generate_customer_rfq_html(rfq)

    with open(os.path.join("outbox", f"{rfq_id}_team.html"), "w", encoding="utf-8") as f:
        f.write(team_html)
    with open(os.path.join("outbox", f"{rfq_id}_customer.html"), "w", encoding="utf-8") as f:
        f.write(customer_html)

    if not smtp_cfg.get("enabled", True):
        return True, f"Saved to outbox (SMTP disabled). RFQ ID: {rfq_id}"

    team_recipients = cfg.get("notification_emails", [
        "asaeed@ims-medical.com",
        "tarek@Ims-medical.com",
        "atharwat@ims-medical.com",
        "aabdelrahman@ims-medical.com"
    ])
    
    customer_email = rfq.get("customer", {}).get("email", "").strip()

    host = smtp_cfg.get("host", "smtp.gmail.com")
    port = smtp_cfg.get("port", 587)
    user = smtp_cfg.get("user")
    password = smtp_cfg.get("password")
    sender = smtp_cfg.get("sender_email", user)
    sender_name = smtp_cfg.get("sender_name", "GulfRay RFQ System")

    try:
        server = smtplib.SMTP(host, port, timeout=20)
        if smtp_cfg.get("use_tls", True):
            server.starttls()
        if user and password:
            server.login(user, password)

        # 1. Send Email to GulfRay Sales Team
        msg_team = MIMEMultipart("mixed")
        msg_team["Subject"] = f"🔔 [New RFQ] طلب عرض سعر جديد - {rfq.get('customer', {}).get('organization', 'Client')} - {rfq_id}"
        msg_team["From"] = f"{sender_name} <{sender}>"
        msg_team["To"] = ", ".join(team_recipients)

        msg_body = MIMEMultipart("alternative")
        msg_body.attach(MIMEText(team_html, "html", "utf-8"))
        msg_team.attach(msg_body)

        # Attach customer logo if provided
        logo_filename = rfq.get("logo_filename")
        if logo_filename:
            logo_path = os.path.join("uploads", logo_filename)
            if os.path.exists(logo_path):
                with open(logo_path, "rb") as lf:
                    part = MIMEBase("application", "octet-stream")
                    part.set_payload(lf.read())
                encoders.encode_base64(part)
                part.add_header("Content-Disposition", f'attachment; filename="Hospital_Logo_{logo_filename}"')
                msg_team.attach(part)

        server.sendmail(sender, team_recipients, msg_team.as_string())

        # 2. Send Acknowledgment Email to Customer
        if customer_email and "@" in customer_email:
            msg_cust = MIMEMultipart("alternative")
            msg_cust["Subject"] = f"GulfRay® | Acknowledgment of Request for Quotation ({rfq_id})"
            msg_cust["From"] = f"{sender_name} <{sender}>"
            msg_cust["To"] = customer_email
            msg_cust.attach(MIMEText(customer_html, "html", "utf-8"))
            try:
                server.sendmail(sender, [customer_email], msg_cust.as_string())
            except Exception as e_cust:
                print(f"Warning: Failed to send customer confirmation: {e_cust}")

        server.quit()
        return True, f"Successfully dispatched RFQ {rfq_id} to GulfRay sales team and client confirmation."

    except Exception as e:
        return False, f"SMTP Error sending RFQ emails: {str(e)}"
