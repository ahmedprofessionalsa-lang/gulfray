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

def generate_email_html(order: Dict) -> str:
    """Generates an ultra-professional, transactional HTML email for B2B procurement."""
    items = order.get("items", [])
    customer = order.get("customer", {})
    ref_no = order.get("order_id", f"GR-RFQ-{datetime.now().strftime('%Y%m%d%H%M%S')}")
    created_at = order.get("created_at", datetime.now().strftime("%Y-%m-%d %H:%M"))
    
    subtotal = float(order.get("subtotal", 0.0))
    vat = float(order.get("vat", 0.0))
    grand_total = float(order.get("grand_total", 0.0))
    currency = "SAR / ر.س"

    items_rows_html = ""
    for idx, item in enumerate(items, 1):
        item_tot = float(item.get("price_sar", 0)) * int(item.get("qty", 1))
        custom_note = ""
        if item.get("embroidery"):
            custom_note += f"<br><small style='color: #0d9488;'>🧵 التطريز المطلوب: <b>{item.get('embroidery')}</b></small>"
        if item.get("custom_logo"):
            custom_note += f"<br><small style='color: #0284c7;'>📎 مرفق شعار مخصص</small>"

        items_rows_html += f"""
        <tr style="border-bottom: 1px solid #e2e8f0; font-size: 13px;">
            <td style="padding: 12px 10px; color: #64748b; text-align: center;">{idx}</td>
            <td style="padding: 12px 10px;">
                <b style="color: #0f172a; font-size: 14px;">{item.get('name_ar', '')}</b>
                <div style="color: #64748b; font-size: 12px; margin-top: 2px;">كود الصنف: <span style="font-family: monospace; font-weight: bold; color: #0f766e;">{item.get('code', '')}</span></div>
                <div style="color: #475569; font-size: 12px;">المواصفات: {item.get('gender_ar', '')} | {item.get('size', '')} | {item.get('thickness', '')}</div>
                {custom_note}
            </td>
            <td style="padding: 12px 10px; text-align: center; font-weight: bold; color: #0f172a;">{item.get('qty', 1)}</td>
            <td style="padding: 12px 10px; text-align: right; color: #334155;">{item.get('price_sar', 0):,.2f}</td>
            <td style="padding: 12px 10px; text-align: right; font-weight: bold; color: #0f172a;">{item_tot:,.2f}</td>
        </tr>
        """

    payment_method_labels = {
        "bank_transfer": "تحويل بنكي رسمي (Bank Transfer)",
        "lpo": "تعميد رسمي / أمر شراء دفع آجل للمستشفيات (LPO / Credit)",
        "cod": "نقداً / شبكة عند التوريد (COD)"
    }
    pay_label = payment_method_labels.get(customer.get("payment_method"), customer.get("payment_method", "غير محدد"))

    html_content = f"""<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>طلب عرض سعر جديد - GulfRay</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: 'Segoe UI', Tahoma, Arial, sans-serif; direction: rtl; text-align: right; color: #1e293b;">
    <div style="max-width: 680px; margin: 25px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.06); border: 1px solid #e2e8f0;">
        
        <!-- Header with Official GulfRay Shield Logo -->
        <div style="background: linear-gradient(135deg, #042f2e 0%, #0f766e 50%, #14b8a6 100%); padding: 30px 25px; color: #ffffff; text-align: center; border-bottom: 3.5px solid #2dd4bf;">
            <div style="font-size: 24px; font-weight: 800; letter-spacing: 0.5px; color: #ffffff;">GulfRay® | شركة سقالة حلول الوقاية</div>
            <div style="font-size: 13px; color: #ccfbf1; margin-top: 5px; font-weight: 600;">مصنع لإنتاج Radiation Protection Aprons وحلول الوقاية من الأشعة</div>
            <div style="display: inline-block; background-color: rgba(255, 255, 255, 0.18); border: 1px solid #2dd4bf; border-radius: 20px; padding: 5px 18px; margin-top: 15px; font-size: 13px; font-weight: 600; color: #ffffff;">
                طلب عرض سعر جديد / RFQ Quotation Request
            </div>
        </div>

        <div style="padding: 25px;">
            <!-- Order Meta Bar -->
            <div style="background-color: #f0fdfa; border: 1px solid #99f6e4; border-radius: 8px; padding: 15px; margin-bottom: 25px;">
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 4px; font-size: 13px;"><b>رقم الطلب:</b> <span style="font-family: monospace; font-size: 14px; color: #0f766e; font-weight: bold;">{ref_no}</span></td>
                        <td style="padding: 4px; font-size: 13px; text-align: left;"><b>التاريخ:</b> <span style="color: #64748b;">{created_at}</span></td>
                    </tr>
                </table>
            </div>

            <!-- Customer Details Card -->
            <div style="border: 1px solid #e2e8f0; border-radius: 8px; padding: 18px; margin-bottom: 25px; background-color: #ffffff;">
                <div style="font-size: 15px; font-weight: bold; color: #042f2e; border-bottom: 2px solid #f1f5f9; padding-bottom: 8px; margin-bottom: 12px;">
                    👤 بيانات العميل والجهة الطالبة
                </div>
                <table style="width: 100%; font-size: 13px; line-height: 1.8;">
                    <tr>
                        <td style="width: 50%;"><b>اسم المسؤول:</b> {customer.get('name', '-')}</td>
                        <td style="width: 50%;"><b>المستشفى / الجهة:</b> <span style="color: #0d9488; font-weight: bold;">{customer.get('organization', '-')}</span></td>
                    </tr>
                    <tr>
                        <td><b>المدينة:</b> {customer.get('city', '-')}</td>
                        <td><b>رقم الجوال:</b> <span dir="ltr" style="font-family: monospace;">{customer.get('phone', '-')}</span></td>
                    </tr>
                    <tr>
                        <td><b>البريد الإلكتروني:</b> <span dir="ltr">{customer.get('email', '-')}</span></td>
                        <td><b>طريقة السداد المحددة:</b> <span style="color: #0f766e; font-weight: bold;">{pay_label}</span></td>
                    </tr>
                    {f"<tr><td colspan='2' style='padding-top: 6px;'><b>ملاحظات إضافية:</b> {customer.get('notes')}</td></tr>" if customer.get('notes') else ""}
                </table>
            </div>

            <!-- Items Table -->
            <div style="margin-bottom: 25px; overflow-x: auto;">
                <div style="font-size: 15px; font-weight: bold; color: #042f2e; margin-bottom: 10px;">
                    📋 تفاصيل الأصناف ومواصفات المآزر المطلوبة
                </div>
                <table style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; border-radius: 8px;">
                    <thead>
                        <tr style="background-color: #042f2e; color: #ffffff; font-size: 13px;">
                            <th style="padding: 10px; width: 35px; text-align: center;">#</th>
                            <th style="padding: 10px; text-align: right;">الصنف والمواصفات</th>
                            <th style="padding: 10px; width: 60px; text-align: center;">الكمية</th>
                            <th style="padding: 10px; width: 95px; text-align: right;">سعر الوحدة ({currency})</th>
                            <th style="padding: 10px; width: 95px; text-align: right;">الإجمالي ({currency})</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items_rows_html}
                    </tbody>
                </table>
            </div>

            <!-- Financial Summary Box -->
            <div style="background-color: #f0fdfa; border: 1px solid #99f6e4; border-radius: 8px; padding: 18px; margin-bottom: 25px;">
                <table style="width: 100%; font-size: 14px; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 6px 0; color: #475569;">المجموع الفرعي (Subtotal):</td>
                        <td style="padding: 6px 0; text-align: left; font-weight: bold; color: #042f2e;">{subtotal:,.2f} {currency}</td>
                    </tr>
                    <tr>
                        <td style="padding: 6px 0; color: #475569;">ضريبة القيمة المضافة 15% (VAT):</td>
                        <td style="padding: 6px 0; text-align: left; font-weight: bold; color: #042f2e;">{vat:,.2f} {currency}</td>
                    </tr>
                    <tr style="border-top: 2px solid #0f766e;">
                        <td style="padding: 10px 0 4px 0; font-size: 16px; font-weight: 800; color: #042f2e;">الإجمالي النهائي شامل الضريبة:</td>
                        <td style="padding: 10px 0 4px 0; text-align: left; font-size: 18px; font-weight: 800; color: #0d9488;">{grand_total:,.2f} {currency}</td>
                    </tr>
                </table>
            </div>

            <!-- Notice / Terms -->
            <div style="font-size: 12px; color: #64748b; line-height: 1.6; background-color: #f1f5f9; padding: 12px; border-radius: 6px;">
                • الأسعار صالحة لمدة 30 يوماً من تاريخ هذا الطلب.<br>
                • مآزر GulfRay مصنعة ومختبرة وفقاً لأعلى معايير الحماية الإشعاعية العالمية (CE & ISO 13485 Compliant).<br>
                • للتواصل المباشر مع إدارة المبيعات: <b>orders@ims-medical.com</b>
            </div>
        </div>

        <!-- Footer -->
        <div style="background-color: #042f2e; color: #ccfbf1; font-size: 12px; padding: 18px; text-align: center;">
            © {datetime.now().year} GulfRay® - شركة سقالة حلول الوقاية. جميع الحقوق محفوظة.
        </div>
    </div>
</body>
</html>"""
    return html_content

def send_order_email(order: Dict) -> Tuple[bool, str]:
    config = load_config()
    smtp_cfg = config.get("smtp", {})
    notification_emails = config.get("notification_emails", [
        "asaeed@ims-medical.com",
        "tarek@Ims-medical.com",
        "atharwat@ims-medical.com"
    ])
    
    customer = order.get("customer", {})
    customer_email = customer.get("email")

    recipients = [e.strip() for e in notification_emails if e and "@" in e]
    if customer_email and "@" in customer_email:
        recipients.append(customer_email.strip())

    recipients = list(set(recipients))

    subject = f"طلب شراء جديد GulfRay | {order.get('order_id', '')} - {customer.get('organization', customer.get('name', 'عميل جديد'))}"
    html_body = generate_email_html(order)

    os.makedirs("outbox", exist_ok=True)
    outbox_file = os.path.join("outbox", f"{order.get('order_id', 'order')}.html")
    outbox_json = os.path.join("outbox", f"{order.get('order_id', 'order')}.json")

    with open(outbox_file, "w", encoding="utf-8") as f:
        f.write(html_body)
    with open(outbox_json, "w", encoding="utf-8") as f:
        json.dump(order, f, ensure_ascii=False, indent=2)

    # Check if SMTP is configured and active
    if not smtp_cfg.get("enabled", False) or not smtp_cfg.get("user") or not smtp_cfg.get("password"):
        return True, f"تم توثيق طلب الشراء بنجاح وحفظه في صندوق الصادر ({outbox_file}). بانتظار إدخال كلمة مرور البريد المرسل لتسليمه مباشرة للمستلمين."

    try:
        msg = MIMEMultipart("alternative")
        msg["Subject"] = subject
        msg["From"] = f"{smtp_cfg.get('sender_name', 'GulfRay Orders')} <{smtp_cfg.get('sender_email', smtp_cfg.get('user'))}>"
        msg["To"] = ", ".join(recipients)
        msg.attach(MIMEText(html_body, "html", "utf-8"))

        logo_path = order.get("logo_path")
        if logo_path and os.path.exists(logo_path):
            with open(logo_path, "rb") as f:
                part = MIMEBase("application", "octet-stream")
                part.set_payload(f.read())
                encoders.encode_base64(part)
                part.add_header("Content-Disposition", f"attachment; filename={os.path.basename(logo_path)}")
                msg.attach(part)

        host = smtp_cfg.get("host", "smtp.office365.com")
        port = int(smtp_cfg.get("port", 587))
        use_tls = smtp_cfg.get("use_tls", True)

        server = smtplib.SMTP(host, port, timeout=15)
        if use_tls:
            server.starttls()
        server.login(smtp_cfg.get("user"), smtp_cfg.get("password"))
        server.sendmail(smtp_cfg.get("sender_email", smtp_cfg.get("user")), recipients, msg.as_string())
        server.quit()

        return True, f"تم إرسال الإيميل الرسمي بنجاح إلى: {', '.join(recipients)}"
    except Exception as e:
        return False, f"تم حفظ الطلب محلياً بنجاح، ولكن تعذر الإرسال عبر SMTP: {str(e)}"

def send_test_email() -> Tuple[bool, str]:
    config = load_config()
    smtp_cfg = config.get("smtp", {})
    notification_emails = config.get("notification_emails", [])
    
    if not smtp_cfg.get("enabled", False) or not smtp_cfg.get("user") or not smtp_cfg.get("password"):
        return False, "بيانات البريد المرسل (SMTP) غير مفعلة أو لم يتم إدخال اسم المستخدم وكلمة المرور."

    recipients = [e.strip() for e in notification_emails if e and "@" in e]
    if not recipients:
        return False, "لا توجد إيميلات محددة لاستقبال التنبيهات."

    subject = "رسالة اختبار اتصال نظام GulfRay Orders System"
    body = """مرحباً بك،
هذه رسالة اختبارية لتأكيد نجاح اتصال خادم البريد بنظام طلبات عروض أسعار ومبيعات مصنع GulfRay.
إذا وصلتك هذه الرسالة، فهذا يعني أن كافة الطلبيات القادمة ستصلك وتصل لباقي الإيميلات المحددة فوراً."""

    try:
        msg = MIMEMultipart()
        msg["Subject"] = subject
        msg["From"] = f"{smtp_cfg.get('sender_name', 'GulfRay System')} <{smtp_cfg.get('sender_email', smtp_cfg.get('user'))}>"
        msg["To"] = ", ".join(recipients)
        msg.attach(MIMEText(body, "plain", "utf-8"))

        host = smtp_cfg.get("host", "smtp.office365.com")
        port = int(smtp_cfg.get("port", 587))
        use_tls = smtp_cfg.get("use_tls", True)

        server = smtplib.SMTP(host, port, timeout=15)
        if use_tls:
            server.starttls()
        server.login(smtp_cfg.get("user"), smtp_cfg.get("password"))
        server.sendmail(smtp_cfg.get("sender_email", smtp_cfg.get("user")), recipients, msg.as_string())
        server.quit()

        return True, f"تم إرسال الإيميل التجريبي بنجاح إلى: {', '.join(recipients)}"
    except Exception as e:
        return False, f"فشل الاتصال بخادم البريد: {str(e)}"
