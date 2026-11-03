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

        self.fabric_reference = {
            "solid_colors": [
                {"code": "F-01", "hex": "#1D253A", "name_en": "Navy", "name_ar": "كحلي · أزرق ليلي عميق", "rgb": "29 37 58", "cmyk": "50 36 0 77", "used_in": "GR-01, GR-02, MM-01, TU-01, SC-03, SC-05V/S, SC-09, SC-12V/S"},
                {"code": "F-02", "hex": "#1B6F80", "name_en": "Signature Teal", "name_ar": "تركوازي جلف راي · لون الهوية", "rgb": "27 111 128", "cmyk": "79 13 0 50", "used_in": "GR-01, GR-02, TU-03"},
                {"code": "F-03", "hex": "#173832", "name_en": "Deep Teal Green", "name_ar": "أخضر بترولي داكن", "rgb": "23 56 50", "cmyk": "59 0 11 78", "used_in": "BS-01, SC-01, SC-04V/S, SC-07, SC-10V/S"},
                {"code": "F-04", "hex": "#234A3C", "name_en": "Emerald Green", "name_ar": "أخضر زمردي · أخضر غني", "rgb": "35 74 60", "cmyk": "53 0 19 71", "used_in": "GR-05, GR-08, GR-10, GR-11"},
                {"code": "F-05", "hex": "#9AA08E", "name_en": "Sage", "name_ar": "أخضر مريمية · أخضر رمادي هادئ", "rgb": "154 160 142", "cmyk": "4 0 11 37", "used_in": "BS-03, MM-03"},
                {"code": "F-06", "hex": "#657E82", "name_en": "Slate Teal", "name_ar": "رمادي بترولي · أزرق رمادي مطفأ", "rgb": "101 126 130", "cmyk": "22 3 0 49", "used_in": "SS-03"},
                {"code": "F-07", "hex": "#5A6D8E", "name_en": "Slate Blue", "name_ar": "أزرق أردوازي · أزرق رمادي متوسط", "rgb": "90 109 142", "cmyk": "37 23 0 44", "used_in": "SC-03"},
                {"code": "F-08", "hex": "#1F4E9E", "name_en": "Cobalt Blue", "name_ar": "أزرق كوبالتي · أزرق ملكي ساطع", "rgb": "31 78 158", "cmyk": "80 51 0 38", "used_in": "GR-04"},
                {"code": "F-09", "hex": "#A887AD", "name_en": "Lavender", "name_ar": "خزامى · بنفسجي فاتح ناعم", "rgb": "168 135 173", "cmyk": "3 22 0 32", "used_in": "GR-06, BS-02, MM-03, SC-02, SC-06V/S"},
                {"code": "F-10", "hex": "#573649", "name_en": "Aubergine", "name_ar": "باذنجاني · بنفسجي داكن عميق", "rgb": "87 54 73", "cmyk": "0 38 16 66", "used_in": "GR-06, BS-02"},
                {"code": "F-11", "hex": "#5A2332", "name_en": "Burgundy", "name_ar": "عنابي · أحمر نبيذي داكن", "rgb": "90 35 50", "cmyk": "0 61 44 65", "used_in": "GR-03, GR-07, SC-02, SC-06V/S"},
                {"code": "F-12", "hex": "#9A1A22", "name_en": "Gulf Red", "name_ar": "أحمر خليجي · أحمر قرمزي قوي", "rgb": "154 26 34", "cmyk": "0 83 78 40", "used_in": "GR-08, GR-09, GR-10, GR-11"},
                {"code": "F-13", "hex": "#E26C5F", "name_en": "Coral", "name_ar": "مرجاني · برتقالي وردي دافئ", "rgb": "226 108 95", "cmyk": "0 52 58 11", "used_in": "GR-01, GR-03, SS-02, SC-05V/S"},
                {"code": "F-14", "hex": "#B56F74", "name_en": "Dusty Rose", "name_ar": "وردي ترابي · وردي مطفأ", "rgb": "181 111 116", "cmyk": "0 39 36 29", "used_in": "MM-02, SC-08, SC-11V/S"},
                {"code": "F-15", "hex": "#C3938F", "name_en": "Blush Pink", "name_ar": "وردي فاتح · وردي باهت ناعم", "rgb": "195 147 143", "cmyk": "0 25 27 24", "used_in": "GR-07"},
                {"code": "F-16", "hex": "#D58F39", "name_en": "Ochre", "name_ar": "مغرة · أصفر ذهبي ترابي", "rgb": "213 143 57", "cmyk": "0 33 73 16", "used_in": "SS-01"},
                {"code": "F-17", "hex": "#F5BA4F", "name_en": "Sunflower Yellow", "name_ar": "أصفر عبّاد الشمس", "rgb": "245 186 79", "cmyk": "0 24 68 4", "used_in": "GR-04"},
                {"code": "F-18", "hex": "#412821", "name_en": "Chocolate Brown", "name_ar": "بني شوكولاتة · بني داكن", "rgb": "65 40 33", "cmyk": "0 38 49 75", "used_in": "SS-01"},
                {"code": "F-19", "hex": "#D3B599", "name_en": "Sand", "name_ar": "رملي · بيج صحراوي دافئ", "rgb": "211 181 153", "cmyk": "0 14 27 17", "used_in": "GR-01, GR-02"},
                {"code": "F-20", "hex": "#B8A391", "name_en": "Taupe Stone", "name_ar": "بيج حجري · رملي محايد", "rgb": "184 163 145", "cmyk": "0 11 21 28", "used_in": "SS-03, SC-04V/S"},
                {"code": "F-21", "hex": "#C5BBB2", "name_en": "Stone Grey", "name_ar": "رمادي حجري · رمادي دافئ", "rgb": "197 187 178", "cmyk": "0 5 10 23", "used_in": "GR-04"},
                {"code": "F-22", "hex": "#B5B3B0", "name_en": "Pearl Grey", "name_ar": "رمادي لؤلؤي · رمادي فاتح بارد", "rgb": "181 179 176", "cmyk": "0 1 3 29", "used_in": "GR-09"},
                {"code": "F-23", "hex": "#E7D8C9", "name_en": "Ivory", "name_ar": "عاجي · أبيض كريمي ناعم", "rgb": "231 216 201", "cmyk": "0 6 13 9", "used_in": "GR-05, GR-06, GR-07, GR-08, GR-10, GR-11, BS-03"},
                {"code": "F-24", "hex": "#3A393C", "name_en": "Charcoal", "name_ar": "رمادي فحمي · رمادي داكن", "rgb": "58 57 60", "cmyk": "3 5 0 76", "used_in": "GR-03, MM-02, TU-02"},
                {"code": "F-25", "hex": "#1F1E1B", "name_en": "Black", "name_ar": "أسود · أسود كلاسيكي", "rgb": "31 30 27", "cmyk": "0 3 13 88", "used_in": "GR-08, GR-10, TU-03"}
            ],
            "printed_fabrics": [
                {"code": "P08", "name_en": "Sunflower", "name_ar": "عبّاد الشمس", "desc_en": "Sunflower blossoms on cream base", "desc_ar": "زهور عبّاد الشمس على أرضية كريمية", "image": "/images/fabrics/P08_sunflower.jpg", "used_in": "SS-01"},
                {"code": "P17", "name_en": "Eucalyptus", "name_ar": "أوراق الكينا", "desc_en": "Green branches on crisp white base", "desc_ar": "أغصان خضراء على أرضية بيضاء", "image": "/images/fabrics/P17_eucalyptus.jpg", "used_in": "BS-01, SC-07, SC-10V/S"},
                {"code": "P18", "name_en": "Spring Flora", "name_ar": "زهور الربيع", "desc_en": "Pink & blue delicate watercolour flowers", "desc_ar": "زهور مائية وردية وزرقاء رقيقة", "image": "/images/fabrics/P18_spring_flora.jpg", "used_in": "SS-02, SC-11V/S"},
                {"code": "P19", "name_en": "Abstract Botanical", "name_ar": "نباتات تجريدية", "desc_en": "Warm tonal botanical brushstrokes", "desc_ar": "ضربات فرشاة نباتية بدرجات دافئة", "image": "/images/fabrics/P19_abstract_botanical.jpg", "used_in": "SS-03"},
                {"code": "P20", "name_en": "Watercolour Wave", "name_ar": "أمواج مائية", "desc_en": "Gentle undulating watercolour waves", "desc_ar": "خطوط متموجة انسيابية بألوان مائية", "image": "/images/fabrics/P20_watercolour_wave.jpg", "used_in": "MM-03"},
                {"code": "P21", "name_en": "Lavender Sketch", "name_ar": "رسم الخزامى", "desc_en": "Hand-sketched purple lavender botanicals", "desc_ar": "زهور بنفسجية مرسومة باليد", "image": "/images/fabrics/P21_lavender_sketch.jpg", "used_in": "BS-02"},
                {"code": "P22", "name_en": "Micro Floral", "name_ar": "زهور دقيقة", "desc_en": "Subtle miniature floral print on light ground", "desc_ar": "زهور صغيرة ناعمة على أرضية فاتحة", "image": "/images/fabrics/P22_micro_floral.jpg", "used_in": "BS-03"},
                {"code": "P23", "name_en": "Geometric Lattice", "name_ar": "شبكة هندسية", "desc_en": "Refined repeated pink lattice geometric motif", "desc_ar": "نقش هندسي متكرر بلون وردي", "image": "/images/fabrics/P23_geometric_lattice.jpg", "used_in": "MM-02, SC-08"},
                {"code": "P40", "name_en": "Blue Camo", "name_ar": "تمويه أزرق", "desc_en": "Contemporary multi-tonal navy tactical camo", "desc_ar": "تمويه تكتيكي بدرجات الكحلي والأزرق", "image": "/images/fabrics/P40_blue_camo.jpg", "used_in": "TU-01"},
                {"code": "P41", "name_en": "Grey Digital Camo", "name_ar": "تمويه رقمي رمادي", "desc_en": "Modern geometric grey & black digital pixel camo", "desc_ar": "مربعات تمويه رقمي بالرمادي والأسود", "image": "/images/fabrics/P41_grey_digital_camo.jpg", "used_in": "TU-02"},
                {"code": "P68", "name_en": "Teal Abstract", "name_ar": "تجريدي بترولي", "desc_en": "High-contrast teal & black abstract shapes", "desc_ar": "أشكال تجريدية بالتركوازي والأسود", "image": "/images/fabrics/P68_teal_abstract.jpg", "used_in": "MM-01, TU-03, SC-09, SC-12V/S"}
            ],
            "trims": [
                {"code": "T-01", "hex": "#1F1E1B", "name_en": "Black binding tape", "name_ar": "شريط حواف أسود", "type_en": "Edge binding", "type_ar": "تحديد الحواف", "used_in": "All garments except GR-07, GR-09"},
                {"code": "T-02", "hex": "#5A2332", "name_en": "Burgundy binding tape", "name_ar": "شريط حواف عنابي", "type_en": "Edge binding", "type_ar": "تحديد الحواف", "used_in": "GR-07"},
                {"code": "T-03", "hex": "#9A1A22", "name_en": "Red binding tape", "name_ar": "شريط حواف أحمر", "type_en": "Edge binding", "type_ar": "تحديد الحواف", "used_in": "GR-09"},
                {"code": "T-04", "hex": "#C9AE7C", "name_en": "Gold piping", "name_ar": "قيطان ذهبي", "type_en": "Piping between panels", "type_ar": "قيطان بين القطع", "used_in": "GR-05, GR-06"},
                {"code": "T-05", "hex": "#E7D8C9", "name_en": "Ivory piping", "name_ar": "قيطان عاجي", "type_en": "Piping between panels", "type_ar": "قيطان بين القطع", "used_in": "GR-07, GR-09"},
                {"code": "T-06", "hex": "#1F1E1B", "name_en": "Black webbing & Velcro", "name_ar": "أحزمة سوداء وفيلكرو", "type_en": "Belts and closures", "type_ar": "الأحزمة والإغلاقات", "used_in": "All garments"}
            ]
        }

    def get_full_catalog_data(self) -> Dict:
        """Returns the full catalog specification with zero prices."""
        return {
            "categories": list(self.categories_meta.keys()),
            "categories_meta": self.categories_meta,
            "core_materials": self.core_materials,
            "collections": self.collections,
            "fabric_reference": self.fabric_reference,
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
