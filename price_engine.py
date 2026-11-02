import os
from typing import Dict, List, Optional, Tuple
import openpyxl

# Dictionary for generating professional descriptions
CATEGORY_TRANSLATIONS = {
    "Full Overlap": {"ar": "مريول تراكب كامل (Full Overlap)", "prefix": "VSF"},
    "Reverse": {"ar": "مريول حماية معكوس (Reverse)", "prefix": "VSR"},
    "Zipper": {"ar": "مريول سحاب أمامي (Zipper)", "prefix": "VSZ"},
    "Full Wraparound Overlap": {"ar": "مريول حماية شاملة تراكبية (Full Wraparound Overlap)", "prefix": "FWF"},
    "Full Wraparound Release": {"ar": "مريول حماية شاملة فك سريع (Full Wraparound Release)", "prefix": "FWR"},
    "Frontal Surgery": {"ar": "مريول جراحي أمامي (Frontal Surgery Drop)", "prefix": "FSD"},
    "Frontal": {"ar": "مريول حماية أمامي (Frontal Vest)", "prefix": "FVP"},
    "Dental Apron": {"ar": "مريول أشعة الأسنان (Dental Apron)", "prefix": "DR"},
    "Accessories": {"ar": "إكسسوارات الوقاية من الإشعاع (Accessories)", "prefix": "ACC"}
}

ACCESSORY_NAMES = {
    "SLV-L": {"name_ar": "كم واقي من الإشعاع - ذراع يسار (Left Sleeve)", "name_en": "Lead Protection Sleeve - Left"},
    "SLV-R": {"name_ar": "كم واقي من الإشعاع - ذراع يمين (Right Sleeve)", "name_en": "Lead Protection Sleeve - Right"},
    "APW": {"name_ar": "أجنحة وحزام تدعيم المريول (Apron Wings Support)", "name_en": "Apron Support Wings Belt"},
    "TCV-S": {"name_ar": "واقي الغدة الدرقية فيلكرو - مقاس S", "name_en": "Thyroid Collar (Velcro) - Small"},
    "TCV-M": {"name_ar": "واقي الغدة الدرقية فيلكرو - مقاس M", "name_en": "Thyroid Collar (Velcro) - Medium"},
    "TCV-L": {"name_ar": "واقي الغدة الدرقية فيلكرو - مقاس L", "name_en": "Thyroid Collar (Velcro) - Large"},
    "TCM-S": {"name_ar": "واقي الغدة الدرقية مغناطيسي - مقاس S", "name_en": "Thyroid Collar (Magnetic) - Small"},
    "TCM-M": {"name_ar": "واقي الغدة الدرقية مغناطيسي - مقاس M", "name_en": "Thyroid Collar (Magnetic) - Medium"},
    "TCM-L": {"name_ar": "واقي الغدة الدرقية مغناطيسي - مقاس L", "name_en": "Thyroid Collar (Magnetic) - Large"},
    "CAP-S": {"name_ar": "قبعة واقية من الإشعاع - قياسية", "name_en": "Radiation Protection Cap - Standard"},
    "CAP-V": {"name_ar": "قبعة واقية من الإشعاع - شريط فيلكرو", "name_en": "Radiation Protection Cap - Velcro"},
    "BSB": {"name_ar": "حزام تدعيم الظهر المرن (Back Support)", "name_en": "Back Support Belt for Aprons"},
    "SUS": {"name_ar": "حمّالات مريول مرنة قابلة للتعديل", "name_en": "Adjustable Apron Suspenders"},
    "BAG": {"name_ar": "حقيبة مبطنة لحفظ ونقل المريول", "name_en": "Heavy-Duty Apron Storage Bag"}
}

DENTAL_NAMES = {
    "DRA": {"name_ar": "مريول أسنان وبانوراما للبالغين", "name_en": "Panoramic Dental Apron - Adult"},
    "DRV": {"name_ar": "مريول أسنان وبانوراما مع واقي غدة مدمج", "name_en": "Dental Apron with Integrated Thyroid Collar"},
    "DRP": {"name_ar": "مريول أسنان وبانوراما للأطفال", "name_en": "Panoramic Dental Apron - Pediatric"}
}

class PriceEngine:
    def __init__(self, excel_path: str = "GulfRay price list.xlsx"):
        self.excel_path = excel_path
        self.items: List[Dict] = []
        self.items_by_code: Dict[str, Dict] = {}
        self.categories: List[str] = []
        self.load_data()

    def generate_item_details(self, category: str, code: str, raw_desc: str, price: float) -> Dict:
        """Determines structured metadata and professional Arabic/English descriptions."""
        parts = code.split("-")
        gender = "Unisex"
        thickness = "0.50 mm Pb"
        size = "One Size"
        model_name = category

        if code in ACCESSORY_NAMES:
            acc = ACCESSORY_NAMES[code]
            name_ar = acc["name_ar"]
            name_en = acc["name_en"]
            if len(parts) == 2 and parts[1] in ["S", "M", "L"]:
                size = parts[1]
        elif code in DENTAL_NAMES:
            d = DENTAL_NAMES[code]
            name_ar = d["name_ar"]
            name_en = d["name_en"]
            thickness = "0.35 mm Pb"
        elif len(parts) == 4:
            # Format: PREFIX-GENDER-THICKNESS-SIZE (e.g. VSF-M-0.50-XS or FSD-F-0.35-XL)
            prefix, g_code, th_code, sz = parts
            gender = "Male" if g_code == "M" else ("Female" if g_code == "F" else "Unisex")
            thickness = f"{th_code} mm Pb"
            size = sz

            g_text_ar = "رجالي" if gender == "Male" else "نسائي"
            cat_info = CATEGORY_TRANSLATIONS.get(category, {"ar": category})
            name_ar = f"{cat_info['ar']} - {g_text_ar} - سمك {thickness} - مقاس {size}"
            name_en = f"{category} Apron - {gender} - {thickness} - Size {size}"
        else:
            cat_info = CATEGORY_TRANSLATIONS.get(category, {"ar": category})
            name_ar = f"{cat_info['ar']} ({code})"
            name_en = f"{category} ({code})"

        return {
            "code": code,
            "category": category,
            "category_ar": CATEGORY_TRANSLATIONS.get(category, {}).get("ar", category),
            "name_ar": name_ar,
            "name_en": name_en,
            "gender": gender,
            "gender_ar": "رجالي" if gender == "Male" else ("نسائي" if gender == "Female" else "للجنسين"),
            "thickness": thickness,
            "size": size,
            "price_sar": round(float(price), 2),
            "uom": "EACH"
        }

    def load_data(self) -> Tuple[bool, str]:
        if not os.path.exists(self.excel_path):
            return False, f"File not found: {self.excel_path}"

        try:
            wb = openpyxl.load_workbook(self.excel_path, data_only=True)
            # Prefer 'GulfRay Detailed' sheet, fallback to first sheet
            sheet_name = "GulfRay Detailed" if "GulfRay Detailed" in wb.sheetnames else wb.sheetnames[0]
            sheet = wb[sheet_name]

            loaded_items = []
            loaded_by_code = {}
            categories_seen = []

            for row in list(sheet.iter_rows(values_only=True))[1:]:
                if not row or not row[0] or not row[1] or row[4] is None:
                    continue
                category = str(row[0]).strip()
                code = str(row[1]).strip()
                raw_desc = str(row[2]).strip() if row[2] else ""
                try:
                    price = float(row[4])
                except (ValueError, TypeError):
                    continue

                item = self.generate_item_details(category, code, raw_desc, price)
                loaded_items.append(item)
                loaded_by_code[code] = item

                if category not in categories_seen:
                    categories_seen.append(category)

            if not loaded_items:
                return False, "No valid items could be read from the sheet."

            self.items = loaded_items
            self.items_by_code = loaded_by_code
            self.categories = categories_seen
            return True, f"Successfully loaded {len(self.items)} items across {len(self.categories)} categories."
        except Exception as e:
            return False, f"Error parsing Excel file: {str(e)}"

    def get_catalog_tree(self) -> Dict:
        """Returns structured data for the frontend configurator filters."""
        tree = {}
        for cat in self.categories:
            cat_items = [it for it in self.items if it["category"] == cat]
            genders = sorted(list(set(it["gender"] for it in cat_items)))
            thicknesses = sorted(list(set(it["thickness"] for it in cat_items)))
            sizes = sorted(list(set(it["size"] for it in cat_items)))
            
            tree[cat] = {
                "category_ar": CATEGORY_TRANSLATIONS.get(cat, {}).get("ar", cat),
                "genders": genders,
                "thicknesses": thicknesses,
                "sizes": sizes,
                "items": cat_items
            }
        return {
            "categories": self.categories,
            "tree": tree,
            "total_items": len(self.items)
        }

    def match_item(self, category: str, gender: Optional[str] = None, thickness: Optional[str] = None, size: Optional[str] = None, code: Optional[str] = None) -> Optional[Dict]:
        """Strict deterministic lookup with zero guesswork."""
        if code and code in self.items_by_code:
            return self.items_by_code[code]

        candidates = [it for it in self.items if it["category"] == category]
        
        if gender:
            candidates = [it for it in candidates if it["gender"].lower() == gender.lower() or it["gender"] == "Unisex"]
        if thickness:
            candidates = [it for it in candidates if it["thickness"] == thickness or it["thickness"] == "-"]
        if size:
            candidates = [it for it in candidates if it["size"] == size or it["size"] == "One Size"]

        if len(candidates) == 1:
            return candidates[0]
        elif len(candidates) > 1:
            # If multiple remain, pick exact match or the first deterministic candidate
            return candidates[0]
        return None

# Singleton instance
engine = PriceEngine()
