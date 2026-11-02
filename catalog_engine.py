import os
import openpyxl
from typing import Dict, List, Optional

class CatalogEngine:
    def __init__(self, excel_path: str = "GulfRay price list.xlsx"):
        self.excel_path = excel_path
        self.categories_meta = {
            "Full Overlap": {
                "name_en": "Full Overlap (Vest & Skirt)",
                "name_ar": "مريول تراكب كامل (سترة وتنورة)",
                "format": "Vest + Skirt",
                "format_ar": "طقم سترة وتنورة",
                "description_en": "Complete 360-degree overlapping protection front and back. Distributes garment weight evenly across shoulders and hips.",
                "description_ar": "حماية تراكبية شاملة 360 درجة للصدر والظهر مع توزيع مثالي للوزن بين الكتفين والخصر لتخفيف إجهاد العمليات الطويلة.",
                "image": "/images/vest_skirt_format.jpg",
                "lead_options": ["0.50 mm Pb"],
                "genders": ["Male", "Female"],
                "sizes": ["XS", "S", "M", "L", "XL", "XXL", "Custom"]
            },
            "Reverse": {
                "name_en": "Reverse Apron (Vest & Skirt)",
                "name_ar": "مريول حماية معكوس (سترة وتنورة)",
                "format": "Vest + Skirt",
                "format_ar": "طقم سترة وتنورة",
                "description_en": "Reverse closure apron providing exceptional ergonomic movement with tailored lumbar support and reinforced rear shielding.",
                "description_ar": "إغلاق معكوس يوفر مرونة حركة استثنائية للكادر الطبي مع دعامة مدمجة لأسفل الظهر وحماية متكاملة.",
                "image": "/images/vest_skirt_style.jpg",
                "lead_options": ["0.50 mm Pb"],
                "genders": ["Male", "Female"],
                "sizes": ["XS", "S", "M", "L", "XL", "XXL", "Custom"]
            },
            "Zipper": {
                "name_en": "Zipper Front (Vest & Skirt)",
                "name_ar": "مريول سحاب أمامي (سترة وتنورة)",
                "format": "Vest + Skirt",
                "format_ar": "طقم سترة وتنورة",
                "description_en": "Smooth heavy-duty front zipper closure for swift donning and removal, coupled with wrap-around overlap protection.",
                "description_ar": "سحاب أمامي متين وعالي الاعتمادية لسرعة وسهولة الارتداء والخلع، مع تراكب واقٍ كامل من الداخل.",
                "image": "/images/clinical_procedure.jpg",
                "lead_options": ["0.50 mm Pb"],
                "genders": ["Male", "Female"],
                "sizes": ["XS", "S", "M", "L", "XL", "XXL", "Custom"]
            },
            "Full Wraparound Overlap": {
                "name_en": "Full Wraparound Overlap (One-Piece)",
                "name_ar": "مريول حماية شاملة تراكبية (قطعة واحدة)",
                "format": "Full Apron",
                "format_ar": "مريول كامل قطعة واحدة",
                "description_en": "One-piece full wrap garment designed for maximum front, lateral, and back radiation protection with Velcro belt fastening.",
                "description_ar": "مريول كامل متصل قطعة واحدة يوفر تغطية شاملة للجسم بزاوية 360 درجة مع حزام تثبيت مبطن.",
                "image": "/images/full_wrap_style.jpg",
                "lead_options": ["0.50 mm Pb"],
                "genders": ["Male", "Female"],
                "sizes": ["XS", "S", "M", "L", "XL", "XXL", "Custom"]
            },
            "Full Wraparound Release": {
                "name_en": "Full Wraparound Quick Release",
                "name_ar": "مريول حماية شاملة فك سريع",
                "format": "Full Apron",
                "format_ar": "مريول كامل قطعة واحدة",
                "description_en": "Engineered with quick-release magnetic/buckle mechanisms allowing sterile surgical team removal without breaking scrub.",
                "description_ar": "مزود بأنظمة فك سريعة تتيح نزع المريول في غرف العمليات الجراحية بسهولة تامة وبأعلى درجات التعقيم.",
                "image": "/images/full_apron_format.jpg",
                "lead_options": ["0.50 mm Pb"],
                "genders": ["Male", "Female"],
                "sizes": ["XS", "S", "M", "L", "XL", "XXL", "Custom"]
            },
            "Frontal Surgery": {
                "name_en": "Frontal Surgery Drop-Off Apron",
                "name_ar": "مريول جراحي أمامي سهل الإسقاط (Drop-Off)",
                "format": "Frontal Apron",
                "format_ar": "مريول أمامي جراحي",
                "description_en": "Sterile-field drop design allowing surgeons to remove the apron from underneath sterile surgical gowns during operations.",
                "description_ar": "تصميم جراحي متطور يسمح للجراح بإسقاط ونزع المريول من تحت الرداء الجراحي المعقم دون المساس بمجال التعقيم.",
                "image": "/images/in_use_surgical.jpg",
                "lead_options": ["0.35 mm Pb", "0.50 mm Pb"],
                "genders": ["Male", "Female"],
                "sizes": ["XS", "S", "M", "L", "XL", "XXL", "Custom"]
            },
            "Frontal": {
                "name_en": "Classic Frontal Protection Vest",
                "name_ar": "مريول حماية أمامي كلاسيكي (Frontal Vest)",
                "format": "Frontal Apron",
                "format_ar": "مريول أمامي خفيف",
                "description_en": "Lightweight, highly flexible frontal radiation apron tailored for imaging rooms where back protection is not required.",
                "description_ar": "مريول أمامي خفيف الوزن ومرن للغاية مصمم لأقسام الأشعة السينية التي تتطلب حماية أمامية فقط مع ظهر مفتوح لتوفير أقصى تهوية.",
                "image": "/images/in_use_doctor.jpg",
                "lead_options": ["0.35 mm Pb", "0.50 mm Pb"],
                "genders": ["Male", "Female"],
                "sizes": ["XS", "S", "M", "L", "XL", "XXL", "Custom"]
            },
            "Dental Apron": {
                "name_en": "Panoramic & Dental Shielding Apron",
                "name_ar": "مريول أشعة الأسنان والبانوراما",
                "format": "Dental Shield",
                "format_ar": "واقي عيادات ومراكز الأسنان",
                "description_en": "Specially sculpted aprons for adult and pediatric dental radiography, featuring built-in or attachable thyroid shields.",
                "description_ar": "مصمم خصيصاً للمرضى في عيادات الأسنان ومراكز التصوير البانورامي مع واقي غدة درقية مدمج أو منفصل للأطفال والبالغين.",
                "image": "/images/hero_medical.jpg",
                "lead_options": ["0.35 mm Pb"],
                "genders": ["Unisex"],
                "sizes": ["Adult (One Size)", "Pediatric (Children)"]
            },
            "Accessories": {
                "name_en": "Shielding Accessories (Thyroid, Sleeves, Belts)",
                "name_ar": "إكسسوارات الوقاية (واقي الغدة، الأكمام، أحزمة التدعيم)",
                "format": "Accessories",
                "format_ar": "إكسسوارات وملحقات",
                "description_en": "Comprehensive range of supplementary shields including magnetic/Velcro thyroid collars, radiation sleeves, and lumbar support belts.",
                "description_ar": "تشكيلة متكاملة من واقيات الغدة الدرقية (فيلكرو ومغناطيس)، أكمام الوقاية للذراعين، وأحزمة تدعيم أسفل الظهر لتقليل الإجهاد.",
                "image": "/images/patterns_sadu.jpg",
                "lead_options": ["0.50 mm Pb"],
                "genders": ["Unisex"],
                "sizes": ["S", "M", "L", "One Size"]
            }
        }

        self.core_materials = [
            {
                "id": "UM",
                "name_en": "UM (Ultra-Lightest)",
                "name_ar": "ألترا لايت (UM - الأخف وزناً على الإطلاق)",
                "badge_en": "28% Lighter than Lead",
                "badge_ar": "أخف بنسبة 28% من الرصاص",
                "density": "2.60 kg/m² @ 0.25mm Pb",
                "thickness": "0.66 mm",
                "standard": "Tested to ASTM F2547-18 (60–110 kV)",
                "clinical_use_en": "Designed for demanding, extended cardiac catheterization, interventional radiology, and long orthopaedic surgeries.",
                "clinical_use_ar": "صُمم خصيصاً لإجراءات قسطرة القلب والأشعة التداخلية والعمليات الجراحية الطويلة حيث يهم كل غرام لراحة الفريق الطبي.",
                "is_lead_free": True
            },
            {
                "id": "NPL",
                "name_en": "NPL (Broad-Beam UK Verified)",
                "name_ar": "إن بي إل (NPL - معتمد من المختبر الفيزيائي البريطاني)",
                "badge_en": "Broad-Beam Verified",
                "badge_ar": "معتمد بالحزمة العريضة دولياً",
                "density": "2.83 kg/m² @ 0.25mm Pb",
                "thickness": "0.71 mm",
                "standard": "Tested to BS EN 61331-1:2014 by National Physical Laboratory (UK)",
                "clinical_use_en": "Certified by UK NPL in broad-beam geometry (IEC 61331-1:2014 benchmark). The gold-standard safety validation.",
                "clinical_use_ar": "مختبر وموثق في المختبر الفيزيائي الوطني البريطاني NPL بهندسة الحزمة العريضة وفق معيار IEC 61331-1:2014 القياسي عالمياً.",
                "is_lead_free": True
            },
            {
                "id": "ML",
                "name_en": "ML (Most Economical Lead-Free)",
                "name_ar": "إم إل (ML - الخيار الاقتصادي الأعلى قيمة)",
                "badge_en": "Maximum Procurement Value",
                "badge_ar": "أعلى كفاءة للمناقصات والمستشفيات",
                "density": "3.60 kg/m² @ 0.25mm Pb",
                "thickness": "0.96 mm",
                "standard": "Tested to GBZ/T 147-2020 (60–110 kV)",
                "clinical_use_en": "Provides the same trusted lead-free radiation attenuation at maximum cost efficiency for hospital-wide departmental equipping.",
                "clinical_use_ar": "يقدم نفس مستوى الحماية الموثوقة الخالية من الرصاص بأعلى كفاءة في الميزانية لتجهيز الأقسام والمستشفيات الكبيرة.",
                "is_lead_free": True
            }
        ]

        self.collections = [
            {
                "id": "saudi_editions",
                "name_en": "Collection 02 · Saudi Editions (إصدارات المملكة)",
                "name_ar": "المجموعة الثانية · إصدارات المملكة الفاخرة",
                "description_en": "Reflecting Saudi pride and heritage. Deep Saudi Green carries authority and distinction; contemporary Saudi Lavender offers modern elegance, unified with warm ivory and restrained gold accents.",
                "description_ar": "تجسيد للفخر بالهوية السعودية. الأخضر السعودي يرمز للوقار والتميز، ولافندر المملكة يعكس روح الحداثة والأناقة، متناسقان مع لمسات العاج والذهب الهادئ.",
                "colors": [
                    {"code": "GR-05", "name_en": "Saudi Green", "name_ar": "الأخضر السعودي", "hex": "#006C35", "image": "/images/saudi_green_apron.jpg"},
                    {"code": "GR-06", "name_en": "Saudi Lavender", "name_ar": "اللافندر السعودي", "hex": "#684F8C", "image": "/images/saudi_lavender_apron.jpg"}
                ]
            },
            {
                "id": "sadu_patterns",
                "name_en": "Collection 04 · Saudi Sadu & Geometric Patterns (تطريز ونقشات السدو)",
                "name_ar": "المجموعة الرابعة · تطريز وزخارف السدو السعودي المعاصر",
                "description_en": "Bespoke Saudi Sadu geometric embroidery motifs woven into precision medical-grade fabrics. Where world-class radiation protection meets timeless cultural craftsmanship.",
                "description_ar": "زخارف ونقشات السدو التراثية السعودية محاكة بأعلى درجات الإتقان على أقمشة طبية متطورة، تمنح الرداء الطبي لمسة فخامة وهوية فريدة.",
                "colors": [
                    {"code": "GR-SADU-01", "name_en": "Sadu Heritage Trim", "name_ar": "تطريز السدو التراثي", "hex": "#8B263E", "image": "/images/patterns_sadu.jpg"},
                    {"code": "GR-PAT-02", "name_en": "Modern Motion Geometry", "name_ar": "النمط الحركي المعاصر", "hex": "#1E3A8A", "image": "/images/patterns_sadu.jpg"},
                    {"code": "GR-PAT-03", "name_en": "Botanical Serenity", "name_ar": "نقش الطبيعة الهادئ", "hex": "#0F766E", "image": "/images/patterns_sadu.jpg"},
                    {"code": "GR-PAT-04", "name_en": "Technical Urban", "name_ar": "النمط الحضري التقني", "hex": "#334155", "image": "/images/patterns_sadu.jpg"}
                ]
            },
            {
                "id": "signature_core",
                "name_en": "Collection 01 & 03 · Signature & Gulf Classic Editions (المجموعات الخليجية الكلاسيكية)",
                "name_ar": "المجموعة الأولى والثالثة · المجموعات الخليجية والكلاسيكية المعتمدة",
                "description_en": "Executive solid tones designed for clinical perfection: Royal Navy, Medical Surgical Teal, Charcoal Slate, and Deep Maroon.",
                "description_ar": "ألوان راقية ومعتمدة في أرقى المنشآت الطبية العالمية والمحلية: الأزرق الملكي، التيل الجراحي، والرمادي الحجري الفاخر.",
                "colors": [
                    {"code": "GR-SIG-01", "name_en": "Royal Navy Blue", "name_ar": "أزرق ملكي كحلي", "hex": "#1B2A4A", "image": "/images/vest_skirt_format.jpg"},
                    {"code": "GR-SIG-02", "name_en": "Medical Surgical Teal", "name_ar": "تيل جراحي معتمد", "hex": "#0D9488", "image": "/images/full_wrap_style.jpg"},
                    {"code": "GR-SIG-03", "name_en": "Charcoal Slate", "name_ar": "رمادي حجري", "hex": "#374151", "image": "/images/full_apron_format.jpg"},
                    {"code": "GR-SIG-04", "name_en": "Pure Burgundy", "name_ar": "عنابي ملكي", "hex": "#6B1D2F", "image": "/images/clinical_procedure.jpg"}
                ]
            }
        ]

    def get_full_catalog_data(self) -> Dict:
        """Returns the full catalog specification with zero prices."""
        return {
            "categories": list(self.categories_meta.keys()),
            "categories_meta": self.categories_meta,
            "core_materials": self.core_materials,
            "collections": self.collections,
            "quality_certifications": [
                {
                    "body": "National Physical Laboratory (NPL), UK",
                    "standard": "BS EN 61331-1:2014",
                    "detail": "Broad-beam geometry lead equivalence verified at 60–120 kV (2021, 2023)."
                },
                {
                    "body": "SGS Laboratory",
                    "standard": "EU REACH Screening",
                    "detail": "234 Substances of Very High Concern (SVHC) passed at <= 0.1%."
                },
                {
                    "body": "US FDA Compliance",
                    "standard": "21 CFR 177.2600",
                    "detail": "Extractive residues well within reference food/skin contact limits."
                },
                {
                    "body": "Kingdom of Saudi Arabia",
                    "standard": "Made in Saudi Arabia",
                    "detail": "First national manufacturer of radiation protection aprons and clinical shielding."
                }
            ]
        }

catalog_engine = CatalogEngine()
