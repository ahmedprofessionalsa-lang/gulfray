// GulfRay Medical - Advanced Core Materials & Bilingual Configurator Engine
let currentLang = "en"; // "ar" or "en"
let catalogData = {"categories": ["Full Overlap", "Reverse", "Zipper", "Full Wraparound Overlap", "Full Wraparound Release", "Frontal Surgery", "Frontal", "Dental Apron", "Accessories"], "tree": {"Full Overlap": {"category_ar": "مريول تراكب كامل (Full Overlap)", "genders": ["Female", "Male"], "thicknesses": ["0.50 mm Pb"], "sizes": ["L", "M", "S", "XL", "XS", "XXL"], "items": [{"code": "VSF-M-0.50-XS", "category": "Full Overlap", "category_ar": "مريول تراكب كامل (Full Overlap)", "name_ar": "مريول تراكب كامل (Full Overlap) - رجالي - سمك 0.50 mm Pb - مقاس XS", "name_en": "Full Overlap Apron - Male - 0.50 mm Pb - Size XS", "gender": "Male", "gender_ar": "رجالي", "thickness": "0.50 mm Pb", "size": "XS", "price_sar": 2850.0, "uom": "EACH"}, {"code": "VSF-F-0.50-XS", "category": "Full Overlap", "category_ar": "مريول تراكب كامل (Full Overlap)", "name_ar": "مريول تراكب كامل (Full Overlap) - نسائي - سمك 0.50 mm Pb - مقاس XS", "name_en": "Full Overlap Apron - Female - 0.50 mm Pb - Size XS", "gender": "Female", "gender_ar": "نسائي", "thickness": "0.50 mm Pb", "size": "XS", "price_sar": 2850.0, "uom": "EACH"}, {"code": "VSF-M-0.50-S", "category": "Full Overlap", "category_ar": "مريول تراكب كامل (Full Overlap)", "name_ar": "مريول تراكب كامل (Full Overlap) - رجالي - سمك 0.50 mm Pb - مقاس S", "name_en": "Full Overlap Apron - Male - 0.50 mm Pb - Size S", "gender": "Male", "gender_ar": "رجالي", "thickness": "0.50 mm Pb", "size": "S", "price_sar": 2850.0, "uom": "EACH"}, {"code": "VSF-F-0.50-S", "category": "Full Overlap", "category_ar": "مريول تراكب كامل (Full Overlap)", "name_ar": "مريول تراكب كامل (Full Overlap) - نسائي - سمك 0.50 mm Pb - مقاس S", "name_en": "Full Overlap Apron - Female - 0.50 mm Pb - Size S", "gender": "Female", "gender_ar": "نسائي", "thickness": "0.50 mm Pb", "size": "S", "price_sar": 2850.0, "uom": "EACH"}, {"code": "VSF-M-0.50-M", "category": "Full Overlap", "category_ar": "مريول تراكب كامل (Full Overlap)", "name_ar": "مريول تراكب كامل (Full Overlap) - رجالي - سمك 0.50 mm Pb - مقاس M", "name_en": "Full Overlap Apron - Male - 0.50 mm Pb - Size M", "gender": "Male", "gender_ar": "رجالي", "thickness": "0.50 mm Pb", "size": "M", "price_sar": 2850.0, "uom": "EACH"}, {"code": "VSF-F-0.50-M", "category": "Full Overlap", "category_ar": "مريول تراكب كامل (Full Overlap)", "name_ar": "مريول تراكب كامل (Full Overlap) - نسائي - سمك 0.50 mm Pb - مقاس M", "name_en": "Full Overlap Apron - Female - 0.50 mm Pb - Size M", "gender": "Female", "gender_ar": "نسائي", "thickness": "0.50 mm Pb", "size": "M", "price_sar": 2850.0, "uom": "EACH"}, {"code": "VSF-M-0.50-L", "category": "Full Overlap", "category_ar": "مريول تراكب كامل (Full Overlap)", "name_ar": "مريول تراكب كامل (Full Overlap) - رجالي - سمك 0.50 mm Pb - مقاس L", "name_en": "Full Overlap Apron - Male - 0.50 mm Pb - Size L", "gender": "Male", "gender_ar": "رجالي", "thickness": "0.50 mm Pb", "size": "L", "price_sar": 2850.0, "uom": "EACH"}, {"code": "VSF-F-0.50-L", "category": "Full Overlap", "category_ar": "مريول تراكب كامل (Full Overlap)", "name_ar": "مريول تراكب كامل (Full Overlap) - نسائي - سمك 0.50 mm Pb - مقاس L", "name_en": "Full Overlap Apron - Female - 0.50 mm Pb - Size L", "gender": "Female", "gender_ar": "نسائي", "thickness": "0.50 mm Pb", "size": "L", "price_sar": 2850.0, "uom": "EACH"}, {"code": "VSF-M-0.50-XL", "category": "Full Overlap", "category_ar": "مريول تراكب كامل (Full Overlap)", "name_ar": "مريول تراكب كامل (Full Overlap) - رجالي - سمك 0.50 mm Pb - مقاس XL", "name_en": "Full Overlap Apron - Male - 0.50 mm Pb - Size XL", "gender": "Male", "gender_ar": "رجالي", "thickness": "0.50 mm Pb", "size": "XL", "price_sar": 2850.0, "uom": "EACH"}, {"code": "VSF-F-0.50-XL", "category": "Full Overlap", "category_ar": "مريول تراكب كامل (Full Overlap)", "name_ar": "مريول تراكب كامل (Full Overlap) - نسائي - سمك 0.50 mm Pb - مقاس XL", "name_en": "Full Overlap Apron - Female - 0.50 mm Pb - Size XL", "gender": "Female", "gender_ar": "نسائي", "thickness": "0.50 mm Pb", "size": "XL", "price_sar": 2850.0, "uom": "EACH"}, {"code": "VSF-M-0.50-XXL", "category": "Full Overlap", "category_ar": "مريول تراكب كامل (Full Overlap)", "name_ar": "مريول تراكب كامل (Full Overlap) - رجالي - سمك 0.50 mm Pb - مقاس XXL", "name_en": "Full Overlap Apron - Male - 0.50 mm Pb - Size XXL", "gender": "Male", "gender_ar": "رجالي", "thickness": "0.50 mm Pb", "size": "XXL", "price_sar": 3135.0, "uom": "EACH"}, {"code": "VSF-F-0.50-XXL", "category": "Full Overlap", "category_ar": "مريول تراكب كامل (Full Overlap)", "name_ar": "مريول تراكب كامل (Full Overlap) - نسائي - سمك 0.50 mm Pb - مقاس XXL", "name_en": "Full Overlap Apron - Female - 0.50 mm Pb - Size XXL", "gender": "Female", "gender_ar": "نسائي", "thickness": "0.50 mm Pb", "size": "XXL", "price_sar": 3135.0, "uom": "EACH"}]}, "Reverse": {"category_ar": "مريول حماية معكوس (Reverse)", "genders": ["Female", "Male"], "thicknesses": ["0.50 mm Pb"], "sizes": ["L", "M", "S", "XL", "XS", "XXL"], "items": [{"code": "VSR-M-0.50-XS", "category": "Reverse", "category_ar": "مريول حماية معكوس (Reverse)", "name_ar": "مريول حماية معكوس (Reverse) - رجالي - سمك 0.50 mm Pb - مقاس XS", "name_en": "Reverse Apron - Male - 0.50 mm Pb - Size XS", "gender": "Male", "gender_ar": "رجالي", "thickness": "0.50 mm Pb", "size": "XS", "price_sar": 2850.0, "uom": "EACH"}, {"code": "VSR-F-0.50-XS", "category": "Reverse", "category_ar": "مريول حماية معكوس (Reverse)", "name_ar": "مريول حماية معكوس (Reverse) - نسائي - سمك 0.50 mm Pb - مقاس XS", "name_en": "Reverse Apron - Female - 0.50 mm Pb - Size XS", "gender": "Female", "gender_ar": "نسائي", "thickness": "0.50 mm Pb", "size": "XS", "price_sar": 2850.0, "uom": "EACH"}, {"code": "VSR-M-0.50-S", "category": "Reverse", "category_ar": "مريول حماية معكوس (Reverse)", "name_ar": "مريول حماية معكوس (Reverse) - رجالي - سمك 0.50 mm Pb - مقاس S", "name_en": "Reverse Apron - Male - 0.50 mm Pb - Size S", "gender": "Male", "gender_ar": "رجالي", "thickness": "0.50 mm Pb", "size": "S", "price_sar": 2850.0, "uom": "EACH"}, {"code": "VSR-F-0.50-S", "category": "Reverse", "category_ar": "مريول حماية معكوس (Reverse)", "name_ar": "مريول حماية معكوس (Reverse) - نسائي - سمك 0.50 mm Pb - مقاس S", "name_en": "Reverse Apron - Female - 0.50 mm Pb - Size S", "gender": "Female", "gender_ar": "نسائي", "thickness": "0.50 mm Pb", "size": "S", "price_sar": 2850.0, "uom": "EACH"}, {"code": "VSR-M-0.50-M", "category": "Reverse", "category_ar": "مريول حماية معكوس (Reverse)", "name_ar": "مريول حماية معكوس (Reverse) - رجالي - سمك 0.50 mm Pb - مقاس M", "name_en": "Reverse Apron - Male - 0.50 mm Pb - Size M", "gender": "Male", "gender_ar": "رجالي", "thickness": "0.50 mm Pb", "size": "M", "price_sar": 2850.0, "uom": "EACH"}, {"code": "VSR-F-0.50-M", "category": "Reverse", "category_ar": "مريول حماية معكوس (Reverse)", "name_ar": "مريول حماية معكوس (Reverse) - نسائي - سمك 0.50 mm Pb - مقاس M", "name_en": "Reverse Apron - Female - 0.50 mm Pb - Size M", "gender": "Female", "gender_ar": "نسائي", "thickness": "0.50 mm Pb", "size": "M", "price_sar": 2850.0, "uom": "EACH"}, {"code": "VSR-M-0.50-L", "category": "Reverse", "category_ar": "مريول حماية معكوس (Reverse)", "name_ar": "مريول حماية معكوس (Reverse) - رجالي - سمك 0.50 mm Pb - مقاس L", "name_en": "Reverse Apron - Male - 0.50 mm Pb - Size L", "gender": "Male", "gender_ar": "رجالي", "thickness": "0.50 mm Pb", "size": "L", "price_sar": 2850.0, "uom": "EACH"}, {"code": "VSR-F-0.50-L", "category": "Reverse", "category_ar": "مريول حماية معكوس (Reverse)", "name_ar": "مريول حماية معكوس (Reverse) - نسائي - سمك 0.50 mm Pb - مقاس L", "name_en": "Reverse Apron - Female - 0.50 mm Pb - Size L", "gender": "Female", "gender_ar": "نسائي", "thickness": "0.50 mm Pb", "size": "L", "price_sar": 2850.0, "uom": "EACH"}, {"code": "VSR-M-0.50-XL", "category": "Reverse", "category_ar": "مريول حماية معكوس (Reverse)", "name_ar": "مريول حماية معكوس (Reverse) - رجالي - سمك 0.50 mm Pb - مقاس XL", "name_en": "Reverse Apron - Male - 0.50 mm Pb - Size XL", "gender": "Male", "gender_ar": "رجالي", "thickness": "0.50 mm Pb", "size": "XL", "price_sar": 2850.0, "uom": "EACH"}, {"code": "VSR-F-0.50-XL", "category": "Reverse", "category_ar": "مريول حماية معكوس (Reverse)", "name_ar": "مريول حماية معكوس (Reverse) - نسائي - سمك 0.50 mm Pb - مقاس XL", "name_en": "Reverse Apron - Female - 0.50 mm Pb - Size XL", "gender": "Female", "gender_ar": "نسائي", "thickness": "0.50 mm Pb", "size": "XL", "price_sar": 2850.0, "uom": "EACH"}, {"code": "VSR-M-0.50-XXL", "category": "Reverse", "category_ar": "مريول حماية معكوس (Reverse)", "name_ar": "مريول حماية معكوس (Reverse) - رجالي - سمك 0.50 mm Pb - مقاس XXL", "name_en": "Reverse Apron - Male - 0.50 mm Pb - Size XXL", "gender": "Male", "gender_ar": "رجالي", "thickness": "0.50 mm Pb", "size": "XXL", "price_sar": 3135.0, "uom": "EACH"}, {"code": "VSR-F-0.50-XXL", "category": "Reverse", "category_ar": "مريول حماية معكوس (Reverse)", "name_ar": "مريول حماية معكوس (Reverse) - نسائي - سمك 0.50 mm Pb - مقاس XXL", "name_en": "Reverse Apron - Female - 0.50 mm Pb - Size XXL", "gender": "Female", "gender_ar": "نسائي", "thickness": "0.50 mm Pb", "size": "XXL", "price_sar": 3135.0, "uom": "EACH"}]}, "Zipper": {"category_ar": "مريول سحاب أمامي (Zipper)", "genders": ["Female", "Male"], "thicknesses": ["0.50 mm Pb"], "sizes": ["L", "M", "S", "XL", "XS", "XXL"], "items": [{"code": "VSZ-M-0.50-XS", "category": "Zipper", "category_ar": "مريول سحاب أمامي (Zipper)", "name_ar": "مريول سحاب أمامي (Zipper) - رجالي - سمك 0.50 mm Pb - مقاس XS", "name_en": "Zipper Apron - Male - 0.50 mm Pb - Size XS", "gender": "Male", "gender_ar": "رجالي", "thickness": "0.50 mm Pb", "size": "XS", "price_sar": 2850.0, "uom": "EACH"}, {"code": "VSZ-F-0.50-XS", "category": "Zipper", "category_ar": "مريول سحاب أمامي (Zipper)", "name_ar": "مريول سحاب أمامي (Zipper) - نسائي - سمك 0.50 mm Pb - مقاس XS", "name_en": "Zipper Apron - Female - 0.50 mm Pb - Size XS", "gender": "Female", "gender_ar": "نسائي", "thickness": "0.50 mm Pb", "size": "XS", "price_sar": 2850.0, "uom": "EACH"}, {"code": "VSZ-M-0.50-S", "category": "Zipper", "category_ar": "مريول سحاب أمامي (Zipper)", "name_ar": "مريول سحاب أمامي (Zipper) - رجالي - سمك 0.50 mm Pb - مقاس S", "name_en": "Zipper Apron - Male - 0.50 mm Pb - Size S", "gender": "Male", "gender_ar": "رجالي", "thickness": "0.50 mm Pb", "size": "S", "price_sar": 2850.0, "uom": "EACH"}, {"code": "VSZ-F-0.50-S", "category": "Zipper", "category_ar": "مريول سحاب أمامي (Zipper)", "name_ar": "مريول سحاب أمامي (Zipper) - نسائي - سمك 0.50 mm Pb - مقاس S", "name_en": "Zipper Apron - Female - 0.50 mm Pb - Size S", "gender": "Female", "gender_ar": "نسائي", "thickness": "0.50 mm Pb", "size": "S", "price_sar": 2850.0, "uom": "EACH"}, {"code": "VSZ-M-0.50-M", "category": "Zipper", "category_ar": "مريول سحاب أمامي (Zipper)", "name_ar": "مريول سحاب أمامي (Zipper) - رجالي - سمك 0.50 mm Pb - مقاس M", "name_en": "Zipper Apron - Male - 0.50 mm Pb - Size M", "gender": "Male", "gender_ar": "رجالي", "thickness": "0.50 mm Pb", "size": "M", "price_sar": 2850.0, "uom": "EACH"}, {"code": "VSZ-F-0.50-M", "category": "Zipper", "category_ar": "مريول سحاب أمامي (Zipper)", "name_ar": "مريول سحاب أمامي (Zipper) - نسائي - سمك 0.50 mm Pb - مقاس M", "name_en": "Zipper Apron - Female - 0.50 mm Pb - Size M", "gender": "Female", "gender_ar": "نسائي", "thickness": "0.50 mm Pb", "size": "M", "price_sar": 2850.0, "uom": "EACH"}, {"code": "VSZ-M-0.50-L", "category": "Zipper", "category_ar": "مريول سحاب أمامي (Zipper)", "name_ar": "مريول سحاب أمامي (Zipper) - رجالي - سمك 0.50 mm Pb - مقاس L", "name_en": "Zipper Apron - Male - 0.50 mm Pb - Size L", "gender": "Male", "gender_ar": "رجالي", "thickness": "0.50 mm Pb", "size": "L", "price_sar": 2850.0, "uom": "EACH"}, {"code": "VSZ-F-0.50-L", "category": "Zipper", "category_ar": "مريول سحاب أمامي (Zipper)", "name_ar": "مريول سحاب أمامي (Zipper) - نسائي - سمك 0.50 mm Pb - مقاس L", "name_en": "Zipper Apron - Female - 0.50 mm Pb - Size L", "gender": "Female", "gender_ar": "نسائي", "thickness": "0.50 mm Pb", "size": "L", "price_sar": 2850.0, "uom": "EACH"}, {"code": "VSZ-M-0.50-XL", "category": "Zipper", "category_ar": "مريول سحاب أمامي (Zipper)", "name_ar": "مريول سحاب أمامي (Zipper) - رجالي - سمك 0.50 mm Pb - مقاس XL", "name_en": "Zipper Apron - Male - 0.50 mm Pb - Size XL", "gender": "Male", "gender_ar": "رجالي", "thickness": "0.50 mm Pb", "size": "XL", "price_sar": 2850.0, "uom": "EACH"}, {"code": "VSZ-F-0.50-XL", "category": "Zipper", "category_ar": "مريول سحاب أمامي (Zipper)", "name_ar": "مريول سحاب أمامي (Zipper) - نسائي - سمك 0.50 mm Pb - مقاس XL", "name_en": "Zipper Apron - Female - 0.50 mm Pb - Size XL", "gender": "Female", "gender_ar": "نسائي", "thickness": "0.50 mm Pb", "size": "XL", "price_sar": 2850.0, "uom": "EACH"}, {"code": "VSZ-M-0.50-XXL", "category": "Zipper", "category_ar": "مريول سحاب أمامي (Zipper)", "name_ar": "مريول سحاب أمامي (Zipper) - رجالي - سمك 0.50 mm Pb - مقاس XXL", "name_en": "Zipper Apron - Male - 0.50 mm Pb - Size XXL", "gender": "Male", "gender_ar": "رجالي", "thickness": "0.50 mm Pb", "size": "XXL", "price_sar": 3135.0, "uom": "EACH"}, {"code": "VSZ-F-0.50-XXL", "category": "Zipper", "category_ar": "مريول سحاب أمامي (Zipper)", "name_ar": "مريول سحاب أمامي (Zipper) - نسائي - سمك 0.50 mm Pb - مقاس XXL", "name_en": "Zipper Apron - Female - 0.50 mm Pb - Size XXL", "gender": "Female", "gender_ar": "نسائي", "thickness": "0.50 mm Pb", "size": "XXL", "price_sar": 3135.0, "uom": "EACH"}]}, "Full Wraparound Overlap": {"category_ar": "مريول حماية شاملة تراكبية (Full Wraparound Overlap)", "genders": ["Female", "Male"], "thicknesses": ["0.50 mm Pb"], "sizes": ["L", "M", "S", "XL", "XS", "XXL"], "items": [{"code": "FWF-M-0.50-XS", "category": "Full Wraparound Overlap", "category_ar": "مريول حماية شاملة تراكبية (Full Wraparound Overlap)", "name_ar": "مريول حماية شاملة تراكبية (Full Wraparound Overlap) - رجالي - سمك 0.50 mm Pb - مقاس XS", "name_en": "Full Wraparound Overlap Apron - Male - 0.50 mm Pb - Size XS", "gender": "Male", "gender_ar": "رجالي", "thickness": "0.50 mm Pb", "size": "XS", "price_sar": 2850.0, "uom": "EACH"}, {"code": "FWF-F-0.50-XS", "category": "Full Wraparound Overlap", "category_ar": "مريول حماية شاملة تراكبية (Full Wraparound Overlap)", "name_ar": "مريول حماية شاملة تراكبية (Full Wraparound Overlap) - نسائي - سمك 0.50 mm Pb - مقاس XS", "name_en": "Full Wraparound Overlap Apron - Female - 0.50 mm Pb - Size XS", "gender": "Female", "gender_ar": "نسائي", "thickness": "0.50 mm Pb", "size": "XS", "price_sar": 2850.0, "uom": "EACH"}, {"code": "FWF-M-0.50-S", "category": "Full Wraparound Overlap", "category_ar": "مريول حماية شاملة تراكبية (Full Wraparound Overlap)", "name_ar": "مريول حماية شاملة تراكبية (Full Wraparound Overlap) - رجالي - سمك 0.50 mm Pb - مقاس S", "name_en": "Full Wraparound Overlap Apron - Male - 0.50 mm Pb - Size S", "gender": "Male", "gender_ar": "رجالي", "thickness": "0.50 mm Pb", "size": "S", "price_sar": 2850.0, "uom": "EACH"}, {"code": "FWF-F-0.50-S", "category": "Full Wraparound Overlap", "category_ar": "مريول حماية شاملة تراكبية (Full Wraparound Overlap)", "name_ar": "مريول حماية شاملة تراكبية (Full Wraparound Overlap) - نسائي - سمك 0.50 mm Pb - مقاس S", "name_en": "Full Wraparound Overlap Apron - Female - 0.50 mm Pb - Size S", "gender": "Female", "gender_ar": "نسائي", "thickness": "0.50 mm Pb", "size": "S", "price_sar": 2850.0, "uom": "EACH"}, {"code": "FWF-M-0.50-M", "category": "Full Wraparound Overlap", "category_ar": "مريول حماية شاملة تراكبية (Full Wraparound Overlap)", "name_ar": "مريول حماية شاملة تراكبية (Full Wraparound Overlap) - رجالي - سمك 0.50 mm Pb - مقاس M", "name_en": "Full Wraparound Overlap Apron - Male - 0.50 mm Pb - Size M", "gender": "Male", "gender_ar": "رجالي", "thickness": "0.50 mm Pb", "size": "M", "price_sar": 2850.0, "uom": "EACH"}, {"code": "FWF-F-0.50-M", "category": "Full Wraparound Overlap", "category_ar": "مريول حماية شاملة تراكبية (Full Wraparound Overlap)", "name_ar": "مريول حماية شاملة تراكبية (Full Wraparound Overlap) - نسائي - سمك 0.50 mm Pb - مقاس M", "name_en": "Full Wraparound Overlap Apron - Female - 0.50 mm Pb - Size M", "gender": "Female", "gender_ar": "نسائي", "thickness": "0.50 mm Pb", "size": "M", "price_sar": 2850.0, "uom": "EACH"}, {"code": "FWF-M-0.50-L", "category": "Full Wraparound Overlap", "category_ar": "مريول حماية شاملة تراكبية (Full Wraparound Overlap)", "name_ar": "مريول حماية شاملة تراكبية (Full Wraparound Overlap) - رجالي - سمك 0.50 mm Pb - مقاس L", "name_en": "Full Wraparound Overlap Apron - Male - 0.50 mm Pb - Size L", "gender": "Male", "gender_ar": "رجالي", "thickness": "0.50 mm Pb", "size": "L", "price_sar": 2850.0, "uom": "EACH"}, {"code": "FWF-F-0.50-L", "category": "Full Wraparound Overlap", "category_ar": "مريول حماية شاملة تراكبية (Full Wraparound Overlap)", "name_ar": "مريول حماية شاملة تراكبية (Full Wraparound Overlap) - نسائي - سمك 0.50 mm Pb - مقاس L", "name_en": "Full Wraparound Overlap Apron - Female - 0.50 mm Pb - Size L", "gender": "Female", "gender_ar": "نسائي", "thickness": "0.50 mm Pb", "size": "L", "price_sar": 2850.0, "uom": "EACH"}, {"code": "FWF-M-0.50-XL", "category": "Full Wraparound Overlap", "category_ar": "مريول حماية شاملة تراكبية (Full Wraparound Overlap)", "name_ar": "مريول حماية شاملة تراكبية (Full Wraparound Overlap) - رجالي - سمك 0.50 mm Pb - مقاس XL", "name_en": "Full Wraparound Overlap Apron - Male - 0.50 mm Pb - Size XL", "gender": "Male", "gender_ar": "رجالي", "thickness": "0.50 mm Pb", "size": "XL", "price_sar": 2850.0, "uom": "EACH"}, {"code": "FWF-F-0.50-XL", "category": "Full Wraparound Overlap", "category_ar": "مريول حماية شاملة تراكبية (Full Wraparound Overlap)", "name_ar": "مريول حماية شاملة تراكبية (Full Wraparound Overlap) - نسائي - سمك 0.50 mm Pb - مقاس XL", "name_en": "Full Wraparound Overlap Apron - Female - 0.50 mm Pb - Size XL", "gender": "Female", "gender_ar": "نسائي", "thickness": "0.50 mm Pb", "size": "XL", "price_sar": 2850.0, "uom": "EACH"}, {"code": "FWF-M-0.50-XXL", "category": "Full Wraparound Overlap", "category_ar": "مريول حماية شاملة تراكبية (Full Wraparound Overlap)", "name_ar": "مريول حماية شاملة تراكبية (Full Wraparound Overlap) - رجالي - سمك 0.50 mm Pb - مقاس XXL", "name_en": "Full Wraparound Overlap Apron - Male - 0.50 mm Pb - Size XXL", "gender": "Male", "gender_ar": "رجالي", "thickness": "0.50 mm Pb", "size": "XXL", "price_sar": 3135.0, "uom": "EACH"}, {"code": "FWF-F-0.50-XXL", "category": "Full Wraparound Overlap", "category_ar": "مريول حماية شاملة تراكبية (Full Wraparound Overlap)", "name_ar": "مريول حماية شاملة تراكبية (Full Wraparound Overlap) - نسائي - سمك 0.50 mm Pb - مقاس XXL", "name_en": "Full Wraparound Overlap Apron - Female - 0.50 mm Pb - Size XXL", "gender": "Female", "gender_ar": "نسائي", "thickness": "0.50 mm Pb", "size": "XXL", "price_sar": 3135.0, "uom": "EACH"}]}, "Full Wraparound Release": {"category_ar": "مريول حماية شاملة فك سريع (Full Wraparound Release)", "genders": ["Female", "Male"], "thicknesses": ["0.50 mm Pb"], "sizes": ["L", "M", "S", "XL", "XS", "XXL"], "items": [{"code": "FWR-M-0.50-XS", "category": "Full Wraparound Release", "category_ar": "مريول حماية شاملة فك سريع (Full Wraparound Release)", "name_ar": "مريول حماية شاملة فك سريع (Full Wraparound Release) - رجالي - سمك 0.50 mm Pb - مقاس XS", "name_en": "Full Wraparound Release Apron - Male - 0.50 mm Pb - Size XS", "gender": "Male", "gender_ar": "رجالي", "thickness": "0.50 mm Pb", "size": "XS", "price_sar": 2850.0, "uom": "EACH"}, {"code": "FWR-F-0.50-XS", "category": "Full Wraparound Release", "category_ar": "مريول حماية شاملة فك سريع (Full Wraparound Release)", "name_ar": "مريول حماية شاملة فك سريع (Full Wraparound Release) - نسائي - سمك 0.50 mm Pb - مقاس XS", "name_en": "Full Wraparound Release Apron - Female - 0.50 mm Pb - Size XS", "gender": "Female", "gender_ar": "نسائي", "thickness": "0.50 mm Pb", "size": "XS", "price_sar": 2850.0, "uom": "EACH"}, {"code": "FWR-M-0.50-S", "category": "Full Wraparound Release", "category_ar": "مريول حماية شاملة فك سريع (Full Wraparound Release)", "name_ar": "مريول حماية شاملة فك سريع (Full Wraparound Release) - رجالي - سمك 0.50 mm Pb - مقاس S", "name_en": "Full Wraparound Release Apron - Male - 0.50 mm Pb - Size S", "gender": "Male", "gender_ar": "رجالي", "thickness": "0.50 mm Pb", "size": "S", "price_sar": 2850.0, "uom": "EACH"}, {"code": "FWR-F-0.50-S", "category": "Full Wraparound Release", "category_ar": "مريول حماية شاملة فك سريع (Full Wraparound Release)", "name_ar": "مريول حماية شاملة فك سريع (Full Wraparound Release) - نسائي - سمك 0.50 mm Pb - مقاس S", "name_en": "Full Wraparound Release Apron - Female - 0.50 mm Pb - Size S", "gender": "Female", "gender_ar": "نسائي", "thickness": "0.50 mm Pb", "size": "S", "price_sar": 2850.0, "uom": "EACH"}, {"code": "FWR-M-0.50-M", "category": "Full Wraparound Release", "category_ar": "مريول حماية شاملة فك سريع (Full Wraparound Release)", "name_ar": "مريول حماية شاملة فك سريع (Full Wraparound Release) - رجالي - سمك 0.50 mm Pb - مقاس M", "name_en": "Full Wraparound Release Apron - Male - 0.50 mm Pb - Size M", "gender": "Male", "gender_ar": "رجالي", "thickness": "0.50 mm Pb", "size": "M", "price_sar": 2850.0, "uom": "EACH"}, {"code": "FWR-F-0.50-M", "category": "Full Wraparound Release", "category_ar": "مريول حماية شاملة فك سريع (Full Wraparound Release)", "name_ar": "مريول حماية شاملة فك سريع (Full Wraparound Release) - نسائي - سمك 0.50 mm Pb - مقاس M", "name_en": "Full Wraparound Release Apron - Female - 0.50 mm Pb - Size M", "gender": "Female", "gender_ar": "نسائي", "thickness": "0.50 mm Pb", "size": "M", "price_sar": 2850.0, "uom": "EACH"}, {"code": "FWR-M-0.50-L", "category": "Full Wraparound Release", "category_ar": "مريول حماية شاملة فك سريع (Full Wraparound Release)", "name_ar": "مريول حماية شاملة فك سريع (Full Wraparound Release) - رجالي - سمك 0.50 mm Pb - مقاس L", "name_en": "Full Wraparound Release Apron - Male - 0.50 mm Pb - Size L", "gender": "Male", "gender_ar": "رجالي", "thickness": "0.50 mm Pb", "size": "L", "price_sar": 2850.0, "uom": "EACH"}, {"code": "FWR-F-0.50-L", "category": "Full Wraparound Release", "category_ar": "مريول حماية شاملة فك سريع (Full Wraparound Release)", "name_ar": "مريول حماية شاملة فك سريع (Full Wraparound Release) - نسائي - سمك 0.50 mm Pb - مقاس L", "name_en": "Full Wraparound Release Apron - Female - 0.50 mm Pb - Size L", "gender": "Female", "gender_ar": "نسائي", "thickness": "0.50 mm Pb", "size": "L", "price_sar": 2850.0, "uom": "EACH"}, {"code": "FWR-M-0.50-XL", "category": "Full Wraparound Release", "category_ar": "مريول حماية شاملة فك سريع (Full Wraparound Release)", "name_ar": "مريول حماية شاملة فك سريع (Full Wraparound Release) - رجالي - سمك 0.50 mm Pb - مقاس XL", "name_en": "Full Wraparound Release Apron - Male - 0.50 mm Pb - Size XL", "gender": "Male", "gender_ar": "رجالي", "thickness": "0.50 mm Pb", "size": "XL", "price_sar": 2850.0, "uom": "EACH"}, {"code": "FWR-F-0.50-XL", "category": "Full Wraparound Release", "category_ar": "مريول حماية شاملة فك سريع (Full Wraparound Release)", "name_ar": "مريول حماية شاملة فك سريع (Full Wraparound Release) - نسائي - سمك 0.50 mm Pb - مقاس XL", "name_en": "Full Wraparound Release Apron - Female - 0.50 mm Pb - Size XL", "gender": "Female", "gender_ar": "نسائي", "thickness": "0.50 mm Pb", "size": "XL", "price_sar": 2850.0, "uom": "EACH"}, {"code": "FWR-M-0.50-XXL", "category": "Full Wraparound Release", "category_ar": "مريول حماية شاملة فك سريع (Full Wraparound Release)", "name_ar": "مريول حماية شاملة فك سريع (Full Wraparound Release) - رجالي - سمك 0.50 mm Pb - مقاس XXL", "name_en": "Full Wraparound Release Apron - Male - 0.50 mm Pb - Size XXL", "gender": "Male", "gender_ar": "رجالي", "thickness": "0.50 mm Pb", "size": "XXL", "price_sar": 3135.0, "uom": "EACH"}, {"code": "FWR-F-0.50-XXL", "category": "Full Wraparound Release", "category_ar": "مريول حماية شاملة فك سريع (Full Wraparound Release)", "name_ar": "مريول حماية شاملة فك سريع (Full Wraparound Release) - نسائي - سمك 0.50 mm Pb - مقاس XXL", "name_en": "Full Wraparound Release Apron - Female - 0.50 mm Pb - Size XXL", "gender": "Female", "gender_ar": "نسائي", "thickness": "0.50 mm Pb", "size": "XXL", "price_sar": 3135.0, "uom": "EACH"}]}, "Frontal Surgery": {"category_ar": "مريول جراحي أمامي (Frontal Surgery Drop)", "genders": ["Female", "Male"], "thicknesses": ["0.35 mm Pb", "0.50 mm Pb"], "sizes": ["L", "M", "S", "XL", "XS", "XXL"], "items": [{"code": "FSD-M-0.50-XS", "category": "Frontal Surgery", "category_ar": "مريول جراحي أمامي (Frontal Surgery Drop)", "name_ar": "مريول جراحي أمامي (Frontal Surgery Drop) - رجالي - سمك 0.50 mm Pb - مقاس XS", "name_en": "Frontal Surgery Apron - Male - 0.50 mm Pb - Size XS", "gender": "Male", "gender_ar": "رجالي", "thickness": "0.50 mm Pb", "size": "XS", "price_sar": 1938.0, "uom": "EACH"}, {"code": "FSD-F-0.50-XS", "category": "Frontal Surgery", "category_ar": "مريول جراحي أمامي (Frontal Surgery Drop)", "name_ar": "مريول جراحي أمامي (Frontal Surgery Drop) - نسائي - سمك 0.50 mm Pb - مقاس XS", "name_en": "Frontal Surgery Apron - Female - 0.50 mm Pb - Size XS", "gender": "Female", "gender_ar": "نسائي", "thickness": "0.50 mm Pb", "size": "XS", "price_sar": 1938.0, "uom": "EACH"}, {"code": "FSD-M-0.50-S", "category": "Frontal Surgery", "category_ar": "مريول جراحي أمامي (Frontal Surgery Drop)", "name_ar": "مريول جراحي أمامي (Frontal Surgery Drop) - رجالي - سمك 0.50 mm Pb - مقاس S", "name_en": "Frontal Surgery Apron - Male - 0.50 mm Pb - Size S", "gender": "Male", "gender_ar": "رجالي", "thickness": "0.50 mm Pb", "size": "S", "price_sar": 1938.0, "uom": "EACH"}, {"code": "FSD-F-0.50-S", "category": "Frontal Surgery", "category_ar": "مريول جراحي أمامي (Frontal Surgery Drop)", "name_ar": "مريول جراحي أمامي (Frontal Surgery Drop) - نسائي - سمك 0.50 mm Pb - مقاس S", "name_en": "Frontal Surgery Apron - Female - 0.50 mm Pb - Size S", "gender": "Female", "gender_ar": "نسائي", "thickness": "0.50 mm Pb", "size": "S", "price_sar": 1938.0, "uom": "EACH"}, {"code": "FSD-M-0.50-M", "category": "Frontal Surgery", "category_ar": "مريول جراحي أمامي (Frontal Surgery Drop)", "name_ar": "مريول جراحي أمامي (Frontal Surgery Drop) - رجالي - سمك 0.50 mm Pb - مقاس M", "name_en": "Frontal Surgery Apron - Male - 0.50 mm Pb - Size M", "gender": "Male", "gender_ar": "رجالي", "thickness": "0.50 mm Pb", "size": "M", "price_sar": 1938.0, "uom": "EACH"}, {"code": "FSD-F-0.50-M", "category": "Frontal Surgery", "category_ar": "مريول جراحي أمامي (Frontal Surgery Drop)", "name_ar": "مريول جراحي أمامي (Frontal Surgery Drop) - نسائي - سمك 0.50 mm Pb - مقاس M", "name_en": "Frontal Surgery Apron - Female - 0.50 mm Pb - Size M", "gender": "Female", "gender_ar": "نسائي", "thickness": "0.50 mm Pb", "size": "M", "price_sar": 1938.0, "uom": "EACH"}, {"code": "FSD-M-0.50-L", "category": "Frontal Surgery", "category_ar": "مريول جراحي أمامي (Frontal Surgery Drop)", "name_ar": "مريول جراحي أمامي (Frontal Surgery Drop) - رجالي - سمك 0.50 mm Pb - مقاس L", "name_en": "Frontal Surgery Apron - Male - 0.50 mm Pb - Size L", "gender": "Male", "gender_ar": "رجالي", "thickness": "0.50 mm Pb", "size": "L", "price_sar": 1938.0, "uom": "EACH"}, {"code": "FSD-F-0.50-L", "category": "Frontal Surgery", "category_ar": "مريول جراحي أمامي (Frontal Surgery Drop)", "name_ar": "مريول جراحي أمامي (Frontal Surgery Drop) - نسائي - سمك 0.50 mm Pb - مقاس L", "name_en": "Frontal Surgery Apron - Female - 0.50 mm Pb - Size L", "gender": "Female", "gender_ar": "نسائي", "thickness": "0.50 mm Pb", "size": "L", "price_sar": 1938.0, "uom": "EACH"}, {"code": "FSD-M-0.50-XL", "category": "Frontal Surgery", "category_ar": "مريول جراحي أمامي (Frontal Surgery Drop)", "name_ar": "مريول جراحي أمامي (Frontal Surgery Drop) - رجالي - سمك 0.50 mm Pb - مقاس XL", "name_en": "Frontal Surgery Apron - Male - 0.50 mm Pb - Size XL", "gender": "Male", "gender_ar": "رجالي", "thickness": "0.50 mm Pb", "size": "XL", "price_sar": 1938.0, "uom": "EACH"}, {"code": "FSD-F-0.50-XL", "category": "Frontal Surgery", "category_ar": "مريول جراحي أمامي (Frontal Surgery Drop)", "name_ar": "مريول جراحي أمامي (Frontal Surgery Drop) - نسائي - سمك 0.50 mm Pb - مقاس XL", "name_en": "Frontal Surgery Apron - Female - 0.50 mm Pb - Size XL", "gender": "Female", "gender_ar": "نسائي", "thickness": "0.50 mm Pb", "size": "XL", "price_sar": 1938.0, "uom": "EACH"}, {"code": "FSD-M-0.50-XXL", "category": "Frontal Surgery", "category_ar": "مريول جراحي أمامي (Frontal Surgery Drop)", "name_ar": "مريول جراحي أمامي (Frontal Surgery Drop) - رجالي - سمك 0.50 mm Pb - مقاس XXL", "name_en": "Frontal Surgery Apron - Male - 0.50 mm Pb - Size XXL", "gender": "Male", "gender_ar": "رجالي", "thickness": "0.50 mm Pb", "size": "XXL", "price_sar": 2109.0, "uom": "EACH"}, {"code": "FSD-F-0.50-XXL", "category": "Frontal Surgery", "category_ar": "مريول جراحي أمامي (Frontal Surgery Drop)", "name_ar": "مريول جراحي أمامي (Frontal Surgery Drop) - نسائي - سمك 0.50 mm Pb - مقاس XXL", "name_en": "Frontal Surgery Apron - Female - 0.50 mm Pb - Size XXL", "gender": "Female", "gender_ar": "نسائي", "thickness": "0.50 mm Pb", "size": "XXL", "price_sar": 2109.0, "uom": "EACH"}, {"code": "FSD-M-0.35-XL", "category": "Frontal Surgery", "category_ar": "مريول جراحي أمامي (Frontal Surgery Drop)", "name_ar": "مريول جراحي أمامي (Frontal Surgery Drop) - رجالي - سمك 0.35 mm Pb - مقاس XL", "name_en": "Frontal Surgery Apron - Male - 0.35 mm Pb - Size XL", "gender": "Male", "gender_ar": "رجالي", "thickness": "0.35 mm Pb", "size": "XL", "price_sar": 1425.0, "uom": "EACH"}, {"code": "FSD-F-0.35-XL", "category": "Frontal Surgery", "category_ar": "مريول جراحي أمامي (Frontal Surgery Drop)", "name_ar": "مريول جراحي أمامي (Frontal Surgery Drop) - نسائي - سمك 0.35 mm Pb - مقاس XL", "name_en": "Frontal Surgery Apron - Female - 0.35 mm Pb - Size XL", "gender": "Female", "gender_ar": "نسائي", "thickness": "0.35 mm Pb", "size": "XL", "price_sar": 1425.0, "uom": "EACH"}, {"code": "FSD-M-0.35-XXL", "category": "Frontal Surgery", "category_ar": "مريول جراحي أمامي (Frontal Surgery Drop)", "name_ar": "مريول جراحي أمامي (Frontal Surgery Drop) - رجالي - سمك 0.35 mm Pb - مقاس XXL", "name_en": "Frontal Surgery Apron - Male - 0.35 mm Pb - Size XXL", "gender": "Male", "gender_ar": "رجالي", "thickness": "0.35 mm Pb", "size": "XXL", "price_sar": 1596.0, "uom": "EACH"}, {"code": "FSD-F-0.35-XXL", "category": "Frontal Surgery", "category_ar": "مريول جراحي أمامي (Frontal Surgery Drop)", "name_ar": "مريول جراحي أمامي (Frontal Surgery Drop) - نسائي - سمك 0.35 mm Pb - مقاس XXL", "name_en": "Frontal Surgery Apron - Female - 0.35 mm Pb - Size XXL", "gender": "Female", "gender_ar": "نسائي", "thickness": "0.35 mm Pb", "size": "XXL", "price_sar": 1596.0, "uom": "EACH"}]}, "Frontal": {"category_ar": "مريول حماية أمامي (Frontal Vest)", "genders": ["Female", "Male"], "thicknesses": ["0.35 mm Pb", "0.50 mm Pb"], "sizes": ["L", "M", "S", "XL", "XS", "XXL"], "items": [{"code": "FVP-M-0.50-XS", "category": "Frontal", "category_ar": "مريول حماية أمامي (Frontal Vest)", "name_ar": "مريول حماية أمامي (Frontal Vest) - رجالي - سمك 0.50 mm Pb - مقاس XS", "name_en": "Frontal Apron - Male - 0.50 mm Pb - Size XS", "gender": "Male", "gender_ar": "رجالي", "thickness": "0.50 mm Pb", "size": "XS", "price_sar": 1938.0, "uom": "EACH"}, {"code": "FVP-F-0.50-XS", "category": "Frontal", "category_ar": "مريول حماية أمامي (Frontal Vest)", "name_ar": "مريول حماية أمامي (Frontal Vest) - نسائي - سمك 0.50 mm Pb - مقاس XS", "name_en": "Frontal Apron - Female - 0.50 mm Pb - Size XS", "gender": "Female", "gender_ar": "نسائي", "thickness": "0.50 mm Pb", "size": "XS", "price_sar": 1938.0, "uom": "EACH"}, {"code": "FVP-M-0.50-S", "category": "Frontal", "category_ar": "مريول حماية أمامي (Frontal Vest)", "name_ar": "مريول حماية أمامي (Frontal Vest) - رجالي - سمك 0.50 mm Pb - مقاس S", "name_en": "Frontal Apron - Male - 0.50 mm Pb - Size S", "gender": "Male", "gender_ar": "رجالي", "thickness": "0.50 mm Pb", "size": "S", "price_sar": 1938.0, "uom": "EACH"}, {"code": "FVP-F-0.50-S", "category": "Frontal", "category_ar": "مريول حماية أمامي (Frontal Vest)", "name_ar": "مريول حماية أمامي (Frontal Vest) - نسائي - سمك 0.50 mm Pb - مقاس S", "name_en": "Frontal Apron - Female - 0.50 mm Pb - Size S", "gender": "Female", "gender_ar": "نسائي", "thickness": "0.50 mm Pb", "size": "S", "price_sar": 1938.0, "uom": "EACH"}, {"code": "FVP-M-0.50-M", "category": "Frontal", "category_ar": "مريول حماية أمامي (Frontal Vest)", "name_ar": "مريول حماية أمامي (Frontal Vest) - رجالي - سمك 0.50 mm Pb - مقاس M", "name_en": "Frontal Apron - Male - 0.50 mm Pb - Size M", "gender": "Male", "gender_ar": "رجالي", "thickness": "0.50 mm Pb", "size": "M", "price_sar": 1938.0, "uom": "EACH"}, {"code": "FVP-F-0.50-M", "category": "Frontal", "category_ar": "مريول حماية أمامي (Frontal Vest)", "name_ar": "مريول حماية أمامي (Frontal Vest) - نسائي - سمك 0.50 mm Pb - مقاس M", "name_en": "Frontal Apron - Female - 0.50 mm Pb - Size M", "gender": "Female", "gender_ar": "نسائي", "thickness": "0.50 mm Pb", "size": "M", "price_sar": 1938.0, "uom": "EACH"}, {"code": "FVP-M-0.50-L", "category": "Frontal", "category_ar": "مريول حماية أمامي (Frontal Vest)", "name_ar": "مريول حماية أمامي (Frontal Vest) - رجالي - سمك 0.50 mm Pb - مقاس L", "name_en": "Frontal Apron - Male - 0.50 mm Pb - Size L", "gender": "Male", "gender_ar": "رجالي", "thickness": "0.50 mm Pb", "size": "L", "price_sar": 1938.0, "uom": "EACH"}, {"code": "FVP-F-0.50-L", "category": "Frontal", "category_ar": "مريول حماية أمامي (Frontal Vest)", "name_ar": "مريول حماية أمامي (Frontal Vest) - نسائي - سمك 0.50 mm Pb - مقاس L", "name_en": "Frontal Apron - Female - 0.50 mm Pb - Size L", "gender": "Female", "gender_ar": "نسائي", "thickness": "0.50 mm Pb", "size": "L", "price_sar": 1938.0, "uom": "EACH"}, {"code": "FVP-M-0.50-XL", "category": "Frontal", "category_ar": "مريول حماية أمامي (Frontal Vest)", "name_ar": "مريول حماية أمامي (Frontal Vest) - رجالي - سمك 0.50 mm Pb - مقاس XL", "name_en": "Frontal Apron - Male - 0.50 mm Pb - Size XL", "gender": "Male", "gender_ar": "رجالي", "thickness": "0.50 mm Pb", "size": "XL", "price_sar": 1938.0, "uom": "EACH"}, {"code": "FVP-F-0.50-XL", "category": "Frontal", "category_ar": "مريول حماية أمامي (Frontal Vest)", "name_ar": "مريول حماية أمامي (Frontal Vest) - نسائي - سمك 0.50 mm Pb - مقاس XL", "name_en": "Frontal Apron - Female - 0.50 mm Pb - Size XL", "gender": "Female", "gender_ar": "نسائي", "thickness": "0.50 mm Pb", "size": "XL", "price_sar": 1938.0, "uom": "EACH"}, {"code": "FVP-M-0.50-XXL", "category": "Frontal", "category_ar": "مريول حماية أمامي (Frontal Vest)", "name_ar": "مريول حماية أمامي (Frontal Vest) - رجالي - سمك 0.50 mm Pb - مقاس XXL", "name_en": "Frontal Apron - Male - 0.50 mm Pb - Size XXL", "gender": "Male", "gender_ar": "رجالي", "thickness": "0.50 mm Pb", "size": "XXL", "price_sar": 2109.0, "uom": "EACH"}, {"code": "FVP-F-0.50-XXL", "category": "Frontal", "category_ar": "مريول حماية أمامي (Frontal Vest)", "name_ar": "مريول حماية أمامي (Frontal Vest) - نسائي - سمك 0.50 mm Pb - مقاس XXL", "name_en": "Frontal Apron - Female - 0.50 mm Pb - Size XXL", "gender": "Female", "gender_ar": "نسائي", "thickness": "0.50 mm Pb", "size": "XXL", "price_sar": 2109.0, "uom": "EACH"}, {"code": "FVP-M-0.35-XL", "category": "Frontal", "category_ar": "مريول حماية أمامي (Frontal Vest)", "name_ar": "مريول حماية أمامي (Frontal Vest) - رجالي - سمك 0.35 mm Pb - مقاس XL", "name_en": "Frontal Apron - Male - 0.35 mm Pb - Size XL", "gender": "Male", "gender_ar": "رجالي", "thickness": "0.35 mm Pb", "size": "XL", "price_sar": 1425.0, "uom": "EACH"}, {"code": "FVP-F-0.35-XL", "category": "Frontal", "category_ar": "مريول حماية أمامي (Frontal Vest)", "name_ar": "مريول حماية أمامي (Frontal Vest) - نسائي - سمك 0.35 mm Pb - مقاس XL", "name_en": "Frontal Apron - Female - 0.35 mm Pb - Size XL", "gender": "Female", "gender_ar": "نسائي", "thickness": "0.35 mm Pb", "size": "XL", "price_sar": 1425.0, "uom": "EACH"}, {"code": "FVP-M-0.35-XXL", "category": "Frontal", "category_ar": "مريول حماية أمامي (Frontal Vest)", "name_ar": "مريول حماية أمامي (Frontal Vest) - رجالي - سمك 0.35 mm Pb - مقاس XXL", "name_en": "Frontal Apron - Male - 0.35 mm Pb - Size XXL", "gender": "Male", "gender_ar": "رجالي", "thickness": "0.35 mm Pb", "size": "XXL", "price_sar": 1596.0, "uom": "EACH"}, {"code": "FVP-F-0.35-XXL", "category": "Frontal", "category_ar": "مريول حماية أمامي (Frontal Vest)", "name_ar": "مريول حماية أمامي (Frontal Vest) - نسائي - سمك 0.35 mm Pb - مقاس XXL", "name_en": "Frontal Apron - Female - 0.35 mm Pb - Size XXL", "gender": "Female", "gender_ar": "نسائي", "thickness": "0.35 mm Pb", "size": "XXL", "price_sar": 1596.0, "uom": "EACH"}]}, "Dental Apron": {"category_ar": "مريول أشعة الأسنان (Dental Apron)", "genders": ["Unisex"], "thicknesses": ["0.35 mm Pb"], "sizes": ["One Size"], "items": [{"code": "DRA", "category": "Dental Apron", "category_ar": "مريول أشعة الأسنان (Dental Apron)", "name_ar": "مريول أسنان وبانوراما للبالغين", "name_en": "Panoramic Dental Apron - Adult", "gender": "Unisex", "gender_ar": "للجنسين", "thickness": "0.35 mm Pb", "size": "One Size", "price_sar": 1596.0, "uom": "EACH"}, {"code": "DRV", "category": "Dental Apron", "category_ar": "مريول أشعة الأسنان (Dental Apron)", "name_ar": "مريول أسنان وبانوراما مع واقي غدة مدمج", "name_en": "Dental Apron with Integrated Thyroid Collar", "gender": "Unisex", "gender_ar": "للجنسين", "thickness": "0.35 mm Pb", "size": "One Size", "price_sar": 1596.0, "uom": "EACH"}, {"code": "DRP", "category": "Dental Apron", "category_ar": "مريول أشعة الأسنان (Dental Apron)", "name_ar": "مريول أسنان وبانوراما للأطفال", "name_en": "Panoramic Dental Apron - Pediatric", "gender": "Unisex", "gender_ar": "للجنسين", "thickness": "0.35 mm Pb", "size": "One Size", "price_sar": 1083.0, "uom": "EACH"}]}, "Accessories": {"category_ar": "إكسسوارات الوقاية من الإشعاع (Accessories)", "genders": ["Unisex"], "thicknesses": ["0.50 mm Pb"], "sizes": ["L", "M", "One Size", "S"], "items": [{"code": "SLV-L", "category": "Accessories", "category_ar": "إكسسوارات الوقاية من الإشعاع (Accessories)", "name_ar": "كم واقي من الإشعاع - ذراع يسار (Left Sleeve)", "name_en": "Lead Protection Sleeve - Left", "gender": "Unisex", "gender_ar": "للجنسين", "thickness": "0.50 mm Pb", "size": "L", "price_sar": 285.0, "uom": "EACH"}, {"code": "SLV-R", "category": "Accessories", "category_ar": "إكسسوارات الوقاية من الإشعاع (Accessories)", "name_ar": "كم واقي من الإشعاع - ذراع يمين (Right Sleeve)", "name_en": "Lead Protection Sleeve - Right", "gender": "Unisex", "gender_ar": "للجنسين", "thickness": "0.50 mm Pb", "size": "One Size", "price_sar": 285.0, "uom": "EACH"}, {"code": "APW", "category": "Accessories", "category_ar": "إكسسوارات الوقاية من الإشعاع (Accessories)", "name_ar": "أجنحة وحزام تدعيم المريول (Apron Wings Support)", "name_en": "Apron Support Wings Belt", "gender": "Unisex", "gender_ar": "للجنسين", "thickness": "0.50 mm Pb", "size": "One Size", "price_sar": 285.0, "uom": "EACH"}, {"code": "TCV-S", "category": "Accessories", "category_ar": "إكسسوارات الوقاية من الإشعاع (Accessories)", "name_ar": "واقي الغدة الدرقية فيلكرو - مقاس S", "name_en": "Thyroid Collar (Velcro) - Small", "gender": "Unisex", "gender_ar": "للجنسين", "thickness": "0.50 mm Pb", "size": "S", "price_sar": 353.4, "uom": "EACH"}, {"code": "TCV-M", "category": "Accessories", "category_ar": "إكسسوارات الوقاية من الإشعاع (Accessories)", "name_ar": "واقي الغدة الدرقية فيلكرو - مقاس M", "name_en": "Thyroid Collar (Velcro) - Medium", "gender": "Unisex", "gender_ar": "للجنسين", "thickness": "0.50 mm Pb", "size": "M", "price_sar": 353.4, "uom": "EACH"}, {"code": "TCV-L", "category": "Accessories", "category_ar": "إكسسوارات الوقاية من الإشعاع (Accessories)", "name_ar": "واقي الغدة الدرقية فيلكرو - مقاس L", "name_en": "Thyroid Collar (Velcro) - Large", "gender": "Unisex", "gender_ar": "للجنسين", "thickness": "0.50 mm Pb", "size": "L", "price_sar": 353.4, "uom": "EACH"}, {"code": "TCM-S", "category": "Accessories", "category_ar": "إكسسوارات الوقاية من الإشعاع (Accessories)", "name_ar": "واقي الغدة الدرقية مغناطيسي - مقاس S", "name_en": "Thyroid Collar (Magnetic) - Small", "gender": "Unisex", "gender_ar": "للجنسين", "thickness": "0.50 mm Pb", "size": "S", "price_sar": 353.4, "uom": "EACH"}, {"code": "TCM-M", "category": "Accessories", "category_ar": "إكسسوارات الوقاية من الإشعاع (Accessories)", "name_ar": "واقي الغدة الدرقية مغناطيسي - مقاس M", "name_en": "Thyroid Collar (Magnetic) - Medium", "gender": "Unisex", "gender_ar": "للجنسين", "thickness": "0.50 mm Pb", "size": "M", "price_sar": 353.4, "uom": "EACH"}, {"code": "TCM-L", "category": "Accessories", "category_ar": "إكسسوارات الوقاية من الإشعاع (Accessories)", "name_ar": "واقي الغدة الدرقية مغناطيسي - مقاس L", "name_en": "Thyroid Collar (Magnetic) - Large", "gender": "Unisex", "gender_ar": "للجنسين", "thickness": "0.50 mm Pb", "size": "L", "price_sar": 353.4, "uom": "EACH"}, {"code": "CAP-S", "category": "Accessories", "category_ar": "إكسسوارات الوقاية من الإشعاع (Accessories)", "name_ar": "قبعة واقية من الإشعاع - قياسية", "name_en": "Radiation Protection Cap - Standard", "gender": "Unisex", "gender_ar": "للجنسين", "thickness": "0.50 mm Pb", "size": "S", "price_sar": 427.5, "uom": "EACH"}, {"code": "CAP-V", "category": "Accessories", "category_ar": "إكسسوارات الوقاية من الإشعاع (Accessories)", "name_ar": "قبعة واقية من الإشعاع - شريط فيلكرو", "name_en": "Radiation Protection Cap - Velcro", "gender": "Unisex", "gender_ar": "للجنسين", "thickness": "0.50 mm Pb", "size": "One Size", "price_sar": 427.5, "uom": "EACH"}, {"code": "BSB", "category": "Accessories", "category_ar": "إكسسوارات الوقاية من الإشعاع (Accessories)", "name_ar": "حزام تدعيم الظهر المرن (Back Support)", "name_en": "Back Support Belt for Aprons", "gender": "Unisex", "gender_ar": "للجنسين", "thickness": "0.50 mm Pb", "size": "One Size", "price_sar": 142.5, "uom": "EACH"}, {"code": "SUS", "category": "Accessories", "category_ar": "إكسسوارات الوقاية من الإشعاع (Accessories)", "name_ar": "حمّالات مريول مرنة قابلة للتعديل", "name_en": "Adjustable Apron Suspenders", "gender": "Unisex", "gender_ar": "للجنسين", "thickness": "0.50 mm Pb", "size": "One Size", "price_sar": 142.5, "uom": "EACH"}, {"code": "BAG", "category": "Accessories", "category_ar": "إكسسوارات الوقاية من الإشعاع (Accessories)", "name_ar": "حقيبة مبطنة لحفظ ونقل المريول", "name_en": "Heavy-Duty Apron Storage Bag", "gender": "Unisex", "gender_ar": "للجنسين", "thickness": "0.50 mm Pb", "size": "One Size", "price_sar": 142.5, "uom": "EACH"}]}}, "total_items": 109, "items": [{"code": "VSF-M-0.50-XS", "category": "Full Overlap", "category_ar": "مريول تراكب كامل (Full Overlap)", "name_ar": "مريول تراكب كامل (Full Overlap) - رجالي - سمك 0.50 mm Pb - مقاس XS", "name_en": "Full Overlap Apron - Male - 0.50 mm Pb - Size XS", "gender": "Male", "gender_ar": "رجالي", "thickness": "0.50 mm Pb", "size": "XS", "price_sar": 2850.0, "uom": "EACH"}, {"code": "VSF-F-0.50-XS", "category": "Full Overlap", "category_ar": "مريول تراكب كامل (Full Overlap)", "name_ar": "مريول تراكب كامل (Full Overlap) - نسائي - سمك 0.50 mm Pb - مقاس XS", "name_en": "Full Overlap Apron - Female - 0.50 mm Pb - Size XS", "gender": "Female", "gender_ar": "نسائي", "thickness": "0.50 mm Pb", "size": "XS", "price_sar": 2850.0, "uom": "EACH"}, {"code": "VSF-M-0.50-S", "category": "Full Overlap", "category_ar": "مريول تراكب كامل (Full Overlap)", "name_ar": "مريول تراكب كامل (Full Overlap) - رجالي - سمك 0.50 mm Pb - مقاس S", "name_en": "Full Overlap Apron - Male - 0.50 mm Pb - Size S", "gender": "Male", "gender_ar": "رجالي", "thickness": "0.50 mm Pb", "size": "S", "price_sar": 2850.0, "uom": "EACH"}, {"code": "VSF-F-0.50-S", "category": "Full Overlap", "category_ar": "مريول تراكب كامل (Full Overlap)", "name_ar": "مريول تراكب كامل (Full Overlap) - نسائي - سمك 0.50 mm Pb - مقاس S", "name_en": "Full Overlap Apron - Female - 0.50 mm Pb - Size S", "gender": "Female", "gender_ar": "نسائي", "thickness": "0.50 mm Pb", "size": "S", "price_sar": 2850.0, "uom": "EACH"}, {"code": "VSF-M-0.50-M", "category": "Full Overlap", "category_ar": "مريول تراكب كامل (Full Overlap)", "name_ar": "مريول تراكب كامل (Full Overlap) - رجالي - سمك 0.50 mm Pb - مقاس M", "name_en": "Full Overlap Apron - Male - 0.50 mm Pb - Size M", "gender": "Male", "gender_ar": "رجالي", "thickness": "0.50 mm Pb", "size": "M", "price_sar": 2850.0, "uom": "EACH"}, {"code": "VSF-F-0.50-M", "category": "Full Overlap", "category_ar": "مريول تراكب كامل (Full Overlap)", "name_ar": "مريول تراكب كامل (Full Overlap) - نسائي - سمك 0.50 mm Pb - مقاس M", "name_en": "Full Overlap Apron - Female - 0.50 mm Pb - Size M", "gender": "Female", "gender_ar": "نسائي", "thickness": "0.50 mm Pb", "size": "M", "price_sar": 2850.0, "uom": "EACH"}, {"code": "VSF-M-0.50-L", "category": "Full Overlap", "category_ar": "مريول تراكب كامل (Full Overlap)", "name_ar": "مريول تراكب كامل (Full Overlap) - رجالي - سمك 0.50 mm Pb - مقاس L", "name_en": "Full Overlap Apron - Male - 0.50 mm Pb - Size L", "gender": "Male", "gender_ar": "رجالي", "thickness": "0.50 mm Pb", "size": "L", "price_sar": 2850.0, "uom": "EACH"}, {"code": "VSF-F-0.50-L", "category": "Full Overlap", "category_ar": "مريول تراكب كامل (Full Overlap)", "name_ar": "مريول تراكب كامل (Full Overlap) - نسائي - سمك 0.50 mm Pb - مقاس L", "name_en": "Full Overlap Apron - Female - 0.50 mm Pb - Size L", "gender": "Female", "gender_ar": "نسائي", "thickness": "0.50 mm Pb", "size": "L", "price_sar": 2850.0, "uom": "EACH"}, {"code": "VSF-M-0.50-XL", "category": "Full Overlap", "category_ar": "مريول تراكب كامل (Full Overlap)", "name_ar": "مريول تراكب كامل (Full Overlap) - رجالي - سمك 0.50 mm Pb - مقاس XL", "name_en": "Full Overlap Apron - Male - 0.50 mm Pb - Size XL", "gender": "Male", "gender_ar": "رجالي", "thickness": "0.50 mm Pb", "size": "XL", "price_sar": 2850.0, "uom": "EACH"}, {"code": "VSF-F-0.50-XL", "category": "Full Overlap", "category_ar": "مريول تراكب كامل (Full Overlap)", "name_ar": "مريول تراكب كامل (Full Overlap) - نسائي - سمك 0.50 mm Pb - مقاس XL", "name_en": "Full Overlap Apron - Female - 0.50 mm Pb - Size XL", "gender": "Female", "gender_ar": "نسائي", "thickness": "0.50 mm Pb", "size": "XL", "price_sar": 2850.0, "uom": "EACH"}, {"code": "VSF-M-0.50-XXL", "category": "Full Overlap", "category_ar": "مريول تراكب كامل (Full Overlap)", "name_ar": "مريول تراكب كامل (Full Overlap) - رجالي - سمك 0.50 mm Pb - مقاس XXL", "name_en": "Full Overlap Apron - Male - 0.50 mm Pb - Size XXL", "gender": "Male", "gender_ar": "رجالي", "thickness": "0.50 mm Pb", "size": "XXL", "price_sar": 3135.0, "uom": "EACH"}, {"code": "VSF-F-0.50-XXL", "category": "Full Overlap", "category_ar": "مريول تراكب كامل (Full Overlap)", "name_ar": "مريول تراكب كامل (Full Overlap) - نسائي - سمك 0.50 mm Pb - مقاس XXL", "name_en": "Full Overlap Apron - Female - 0.50 mm Pb - Size XXL", "gender": "Female", "gender_ar": "نسائي", "thickness": "0.50 mm Pb", "size": "XXL", "price_sar": 3135.0, "uom": "EACH"}, {"code": "VSR-M-0.50-XS", "category": "Reverse", "category_ar": "مريول حماية معكوس (Reverse)", "name_ar": "مريول حماية معكوس (Reverse) - رجالي - سمك 0.50 mm Pb - مقاس XS", "name_en": "Reverse Apron - Male - 0.50 mm Pb - Size XS", "gender": "Male", "gender_ar": "رجالي", "thickness": "0.50 mm Pb", "size": "XS", "price_sar": 2850.0, "uom": "EACH"}, {"code": "VSR-F-0.50-XS", "category": "Reverse", "category_ar": "مريول حماية معكوس (Reverse)", "name_ar": "مريول حماية معكوس (Reverse) - نسائي - سمك 0.50 mm Pb - مقاس XS", "name_en": "Reverse Apron - Female - 0.50 mm Pb - Size XS", "gender": "Female", "gender_ar": "نسائي", "thickness": "0.50 mm Pb", "size": "XS", "price_sar": 2850.0, "uom": "EACH"}, {"code": "VSR-M-0.50-S", "category": "Reverse", "category_ar": "مريول حماية معكوس (Reverse)", "name_ar": "مريول حماية معكوس (Reverse) - رجالي - سمك 0.50 mm Pb - مقاس S", "name_en": "Reverse Apron - Male - 0.50 mm Pb - Size S", "gender": "Male", "gender_ar": "رجالي", "thickness": "0.50 mm Pb", "size": "S", "price_sar": 2850.0, "uom": "EACH"}, {"code": "VSR-F-0.50-S", "category": "Reverse", "category_ar": "مريول حماية معكوس (Reverse)", "name_ar": "مريول حماية معكوس (Reverse) - نسائي - سمك 0.50 mm Pb - مقاس S", "name_en": "Reverse Apron - Female - 0.50 mm Pb - Size S", "gender": "Female", "gender_ar": "نسائي", "thickness": "0.50 mm Pb", "size": "S", "price_sar": 2850.0, "uom": "EACH"}, {"code": "VSR-M-0.50-M", "category": "Reverse", "category_ar": "مريول حماية معكوس (Reverse)", "name_ar": "مريول حماية معكوس (Reverse) - رجالي - سمك 0.50 mm Pb - مقاس M", "name_en": "Reverse Apron - Male - 0.50 mm Pb - Size M", "gender": "Male", "gender_ar": "رجالي", "thickness": "0.50 mm Pb", "size": "M", "price_sar": 2850.0, "uom": "EACH"}, {"code": "VSR-F-0.50-M", "category": "Reverse", "category_ar": "مريول حماية معكوس (Reverse)", "name_ar": "مريول حماية معكوس (Reverse) - نسائي - سمك 0.50 mm Pb - مقاس M", "name_en": "Reverse Apron - Female - 0.50 mm Pb - Size M", "gender": "Female", "gender_ar": "نسائي", "thickness": "0.50 mm Pb", "size": "M", "price_sar": 2850.0, "uom": "EACH"}, {"code": "VSR-M-0.50-L", "category": "Reverse", "category_ar": "مريول حماية معكوس (Reverse)", "name_ar": "مريول حماية معكوس (Reverse) - رجالي - سمك 0.50 mm Pb - مقاس L", "name_en": "Reverse Apron - Male - 0.50 mm Pb - Size L", "gender": "Male", "gender_ar": "رجالي", "thickness": "0.50 mm Pb", "size": "L", "price_sar": 2850.0, "uom": "EACH"}, {"code": "VSR-F-0.50-L", "category": "Reverse", "category_ar": "مريول حماية معكوس (Reverse)", "name_ar": "مريول حماية معكوس (Reverse) - نسائي - سمك 0.50 mm Pb - مقاس L", "name_en": "Reverse Apron - Female - 0.50 mm Pb - Size L", "gender": "Female", "gender_ar": "نسائي", "thickness": "0.50 mm Pb", "size": "L", "price_sar": 2850.0, "uom": "EACH"}, {"code": "VSR-M-0.50-XL", "category": "Reverse", "category_ar": "مريول حماية معكوس (Reverse)", "name_ar": "مريول حماية معكوس (Reverse) - رجالي - سمك 0.50 mm Pb - مقاس XL", "name_en": "Reverse Apron - Male - 0.50 mm Pb - Size XL", "gender": "Male", "gender_ar": "رجالي", "thickness": "0.50 mm Pb", "size": "XL", "price_sar": 2850.0, "uom": "EACH"}, {"code": "VSR-F-0.50-XL", "category": "Reverse", "category_ar": "مريول حماية معكوس (Reverse)", "name_ar": "مريول حماية معكوس (Reverse) - نسائي - سمك 0.50 mm Pb - مقاس XL", "name_en": "Reverse Apron - Female - 0.50 mm Pb - Size XL", "gender": "Female", "gender_ar": "نسائي", "thickness": "0.50 mm Pb", "size": "XL", "price_sar": 2850.0, "uom": "EACH"}, {"code": "VSR-M-0.50-XXL", "category": "Reverse", "category_ar": "مريول حماية معكوس (Reverse)", "name_ar": "مريول حماية معكوس (Reverse) - رجالي - سمك 0.50 mm Pb - مقاس XXL", "name_en": "Reverse Apron - Male - 0.50 mm Pb - Size XXL", "gender": "Male", "gender_ar": "رجالي", "thickness": "0.50 mm Pb", "size": "XXL", "price_sar": 3135.0, "uom": "EACH"}, {"code": "VSR-F-0.50-XXL", "category": "Reverse", "category_ar": "مريول حماية معكوس (Reverse)", "name_ar": "مريول حماية معكوس (Reverse) - نسائي - سمك 0.50 mm Pb - مقاس XXL", "name_en": "Reverse Apron - Female - 0.50 mm Pb - Size XXL", "gender": "Female", "gender_ar": "نسائي", "thickness": "0.50 mm Pb", "size": "XXL", "price_sar": 3135.0, "uom": "EACH"}, {"code": "VSZ-M-0.50-XS", "category": "Zipper", "category_ar": "مريول سحاب أمامي (Zipper)", "name_ar": "مريول سحاب أمامي (Zipper) - رجالي - سمك 0.50 mm Pb - مقاس XS", "name_en": "Zipper Apron - Male - 0.50 mm Pb - Size XS", "gender": "Male", "gender_ar": "رجالي", "thickness": "0.50 mm Pb", "size": "XS", "price_sar": 2850.0, "uom": "EACH"}, {"code": "VSZ-F-0.50-XS", "category": "Zipper", "category_ar": "مريول سحاب أمامي (Zipper)", "name_ar": "مريول سحاب أمامي (Zipper) - نسائي - سمك 0.50 mm Pb - مقاس XS", "name_en": "Zipper Apron - Female - 0.50 mm Pb - Size XS", "gender": "Female", "gender_ar": "نسائي", "thickness": "0.50 mm Pb", "size": "XS", "price_sar": 2850.0, "uom": "EACH"}, {"code": "VSZ-M-0.50-S", "category": "Zipper", "category_ar": "مريول سحاب أمامي (Zipper)", "name_ar": "مريول سحاب أمامي (Zipper) - رجالي - سمك 0.50 mm Pb - مقاس S", "name_en": "Zipper Apron - Male - 0.50 mm Pb - Size S", "gender": "Male", "gender_ar": "رجالي", "thickness": "0.50 mm Pb", "size": "S", "price_sar": 2850.0, "uom": "EACH"}, {"code": "VSZ-F-0.50-S", "category": "Zipper", "category_ar": "مريول سحاب أمامي (Zipper)", "name_ar": "مريول سحاب أمامي (Zipper) - نسائي - سمك 0.50 mm Pb - مقاس S", "name_en": "Zipper Apron - Female - 0.50 mm Pb - Size S", "gender": "Female", "gender_ar": "نسائي", "thickness": "0.50 mm Pb", "size": "S", "price_sar": 2850.0, "uom": "EACH"}, {"code": "VSZ-M-0.50-M", "category": "Zipper", "category_ar": "مريول سحاب أمامي (Zipper)", "name_ar": "مريول سحاب أمامي (Zipper) - رجالي - سمك 0.50 mm Pb - مقاس M", "name_en": "Zipper Apron - Male - 0.50 mm Pb - Size M", "gender": "Male", "gender_ar": "رجالي", "thickness": "0.50 mm Pb", "size": "M", "price_sar": 2850.0, "uom": "EACH"}, {"code": "VSZ-F-0.50-M", "category": "Zipper", "category_ar": "مريول سحاب أمامي (Zipper)", "name_ar": "مريول سحاب أمامي (Zipper) - نسائي - سمك 0.50 mm Pb - مقاس M", "name_en": "Zipper Apron - Female - 0.50 mm Pb - Size M", "gender": "Female", "gender_ar": "نسائي", "thickness": "0.50 mm Pb", "size": "M", "price_sar": 2850.0, "uom": "EACH"}, {"code": "VSZ-M-0.50-L", "category": "Zipper", "category_ar": "مريول سحاب أمامي (Zipper)", "name_ar": "مريول سحاب أمامي (Zipper) - رجالي - سمك 0.50 mm Pb - مقاس L", "name_en": "Zipper Apron - Male - 0.50 mm Pb - Size L", "gender": "Male", "gender_ar": "رجالي", "thickness": "0.50 mm Pb", "size": "L", "price_sar": 2850.0, "uom": "EACH"}, {"code": "VSZ-F-0.50-L", "category": "Zipper", "category_ar": "مريول سحاب أمامي (Zipper)", "name_ar": "مريول سحاب أمامي (Zipper) - نسائي - سمك 0.50 mm Pb - مقاس L", "name_en": "Zipper Apron - Female - 0.50 mm Pb - Size L", "gender": "Female", "gender_ar": "نسائي", "thickness": "0.50 mm Pb", "size": "L", "price_sar": 2850.0, "uom": "EACH"}, {"code": "VSZ-M-0.50-XL", "category": "Zipper", "category_ar": "مريول سحاب أمامي (Zipper)", "name_ar": "مريول سحاب أمامي (Zipper) - رجالي - سمك 0.50 mm Pb - مقاس XL", "name_en": "Zipper Apron - Male - 0.50 mm Pb - Size XL", "gender": "Male", "gender_ar": "رجالي", "thickness": "0.50 mm Pb", "size": "XL", "price_sar": 2850.0, "uom": "EACH"}, {"code": "VSZ-F-0.50-XL", "category": "Zipper", "category_ar": "مريول سحاب أمامي (Zipper)", "name_ar": "مريول سحاب أمامي (Zipper) - نسائي - سمك 0.50 mm Pb - مقاس XL", "name_en": "Zipper Apron - Female - 0.50 mm Pb - Size XL", "gender": "Female", "gender_ar": "نسائي", "thickness": "0.50 mm Pb", "size": "XL", "price_sar": 2850.0, "uom": "EACH"}, {"code": "VSZ-M-0.50-XXL", "category": "Zipper", "category_ar": "مريول سحاب أمامي (Zipper)", "name_ar": "مريول سحاب أمامي (Zipper) - رجالي - سمك 0.50 mm Pb - مقاس XXL", "name_en": "Zipper Apron - Male - 0.50 mm Pb - Size XXL", "gender": "Male", "gender_ar": "رجالي", "thickness": "0.50 mm Pb", "size": "XXL", "price_sar": 3135.0, "uom": "EACH"}, {"code": "VSZ-F-0.50-XXL", "category": "Zipper", "category_ar": "مريول سحاب أمامي (Zipper)", "name_ar": "مريول سحاب أمامي (Zipper) - نسائي - سمك 0.50 mm Pb - مقاس XXL", "name_en": "Zipper Apron - Female - 0.50 mm Pb - Size XXL", "gender": "Female", "gender_ar": "نسائي", "thickness": "0.50 mm Pb", "size": "XXL", "price_sar": 3135.0, "uom": "EACH"}, {"code": "FWF-M-0.50-XS", "category": "Full Wraparound Overlap", "category_ar": "مريول حماية شاملة تراكبية (Full Wraparound Overlap)", "name_ar": "مريول حماية شاملة تراكبية (Full Wraparound Overlap) - رجالي - سمك 0.50 mm Pb - مقاس XS", "name_en": "Full Wraparound Overlap Apron - Male - 0.50 mm Pb - Size XS", "gender": "Male", "gender_ar": "رجالي", "thickness": "0.50 mm Pb", "size": "XS", "price_sar": 2850.0, "uom": "EACH"}, {"code": "FWF-F-0.50-XS", "category": "Full Wraparound Overlap", "category_ar": "مريول حماية شاملة تراكبية (Full Wraparound Overlap)", "name_ar": "مريول حماية شاملة تراكبية (Full Wraparound Overlap) - نسائي - سمك 0.50 mm Pb - مقاس XS", "name_en": "Full Wraparound Overlap Apron - Female - 0.50 mm Pb - Size XS", "gender": "Female", "gender_ar": "نسائي", "thickness": "0.50 mm Pb", "size": "XS", "price_sar": 2850.0, "uom": "EACH"}, {"code": "FWF-M-0.50-S", "category": "Full Wraparound Overlap", "category_ar": "مريول حماية شاملة تراكبية (Full Wraparound Overlap)", "name_ar": "مريول حماية شاملة تراكبية (Full Wraparound Overlap) - رجالي - سمك 0.50 mm Pb - مقاس S", "name_en": "Full Wraparound Overlap Apron - Male - 0.50 mm Pb - Size S", "gender": "Male", "gender_ar": "رجالي", "thickness": "0.50 mm Pb", "size": "S", "price_sar": 2850.0, "uom": "EACH"}, {"code": "FWF-F-0.50-S", "category": "Full Wraparound Overlap", "category_ar": "مريول حماية شاملة تراكبية (Full Wraparound Overlap)", "name_ar": "مريول حماية شاملة تراكبية (Full Wraparound Overlap) - نسائي - سمك 0.50 mm Pb - مقاس S", "name_en": "Full Wraparound Overlap Apron - Female - 0.50 mm Pb - Size S", "gender": "Female", "gender_ar": "نسائي", "thickness": "0.50 mm Pb", "size": "S", "price_sar": 2850.0, "uom": "EACH"}, {"code": "FWF-M-0.50-M", "category": "Full Wraparound Overlap", "category_ar": "مريول حماية شاملة تراكبية (Full Wraparound Overlap)", "name_ar": "مريول حماية شاملة تراكبية (Full Wraparound Overlap) - رجالي - سمك 0.50 mm Pb - مقاس M", "name_en": "Full Wraparound Overlap Apron - Male - 0.50 mm Pb - Size M", "gender": "Male", "gender_ar": "رجالي", "thickness": "0.50 mm Pb", "size": "M", "price_sar": 2850.0, "uom": "EACH"}, {"code": "FWF-F-0.50-M", "category": "Full Wraparound Overlap", "category_ar": "مريول حماية شاملة تراكبية (Full Wraparound Overlap)", "name_ar": "مريول حماية شاملة تراكبية (Full Wraparound Overlap) - نسائي - سمك 0.50 mm Pb - مقاس M", "name_en": "Full Wraparound Overlap Apron - Female - 0.50 mm Pb - Size M", "gender": "Female", "gender_ar": "نسائي", "thickness": "0.50 mm Pb", "size": "M", "price_sar": 2850.0, "uom": "EACH"}, {"code": "FWF-M-0.50-L", "category": "Full Wraparound Overlap", "category_ar": "مريول حماية شاملة تراكبية (Full Wraparound Overlap)", "name_ar": "مريول حماية شاملة تراكبية (Full Wraparound Overlap) - رجالي - سمك 0.50 mm Pb - مقاس L", "name_en": "Full Wraparound Overlap Apron - Male - 0.50 mm Pb - Size L", "gender": "Male", "gender_ar": "رجالي", "thickness": "0.50 mm Pb", "size": "L", "price_sar": 2850.0, "uom": "EACH"}, {"code": "FWF-F-0.50-L", "category": "Full Wraparound Overlap", "category_ar": "مريول حماية شاملة تراكبية (Full Wraparound Overlap)", "name_ar": "مريول حماية شاملة تراكبية (Full Wraparound Overlap) - نسائي - سمك 0.50 mm Pb - مقاس L", "name_en": "Full Wraparound Overlap Apron - Female - 0.50 mm Pb - Size L", "gender": "Female", "gender_ar": "نسائي", "thickness": "0.50 mm Pb", "size": "L", "price_sar": 2850.0, "uom": "EACH"}, {"code": "FWF-M-0.50-XL", "category": "Full Wraparound Overlap", "category_ar": "مريول حماية شاملة تراكبية (Full Wraparound Overlap)", "name_ar": "مريول حماية شاملة تراكبية (Full Wraparound Overlap) - رجالي - سمك 0.50 mm Pb - مقاس XL", "name_en": "Full Wraparound Overlap Apron - Male - 0.50 mm Pb - Size XL", "gender": "Male", "gender_ar": "رجالي", "thickness": "0.50 mm Pb", "size": "XL", "price_sar": 2850.0, "uom": "EACH"}, {"code": "FWF-F-0.50-XL", "category": "Full Wraparound Overlap", "category_ar": "مريول حماية شاملة تراكبية (Full Wraparound Overlap)", "name_ar": "مريول حماية شاملة تراكبية (Full Wraparound Overlap) - نسائي - سمك 0.50 mm Pb - مقاس XL", "name_en": "Full Wraparound Overlap Apron - Female - 0.50 mm Pb - Size XL", "gender": "Female", "gender_ar": "نسائي", "thickness": "0.50 mm Pb", "size": "XL", "price_sar": 2850.0, "uom": "EACH"}, {"code": "FWF-M-0.50-XXL", "category": "Full Wraparound Overlap", "category_ar": "مريول حماية شاملة تراكبية (Full Wraparound Overlap)", "name_ar": "مريول حماية شاملة تراكبية (Full Wraparound Overlap) - رجالي - سمك 0.50 mm Pb - مقاس XXL", "name_en": "Full Wraparound Overlap Apron - Male - 0.50 mm Pb - Size XXL", "gender": "Male", "gender_ar": "رجالي", "thickness": "0.50 mm Pb", "size": "XXL", "price_sar": 3135.0, "uom": "EACH"}, {"code": "FWF-F-0.50-XXL", "category": "Full Wraparound Overlap", "category_ar": "مريول حماية شاملة تراكبية (Full Wraparound Overlap)", "name_ar": "مريول حماية شاملة تراكبية (Full Wraparound Overlap) - نسائي - سمك 0.50 mm Pb - مقاس XXL", "name_en": "Full Wraparound Overlap Apron - Female - 0.50 mm Pb - Size XXL", "gender": "Female", "gender_ar": "نسائي", "thickness": "0.50 mm Pb", "size": "XXL", "price_sar": 3135.0, "uom": "EACH"}, {"code": "FWR-M-0.50-XS", "category": "Full Wraparound Release", "category_ar": "مريول حماية شاملة فك سريع (Full Wraparound Release)", "name_ar": "مريول حماية شاملة فك سريع (Full Wraparound Release) - رجالي - سمك 0.50 mm Pb - مقاس XS", "name_en": "Full Wraparound Release Apron - Male - 0.50 mm Pb - Size XS", "gender": "Male", "gender_ar": "رجالي", "thickness": "0.50 mm Pb", "size": "XS", "price_sar": 2850.0, "uom": "EACH"}, {"code": "FWR-F-0.50-XS", "category": "Full Wraparound Release", "category_ar": "مريول حماية شاملة فك سريع (Full Wraparound Release)", "name_ar": "مريول حماية شاملة فك سريع (Full Wraparound Release) - نسائي - سمك 0.50 mm Pb - مقاس XS", "name_en": "Full Wraparound Release Apron - Female - 0.50 mm Pb - Size XS", "gender": "Female", "gender_ar": "نسائي", "thickness": "0.50 mm Pb", "size": "XS", "price_sar": 2850.0, "uom": "EACH"}, {"code": "FWR-M-0.50-S", "category": "Full Wraparound Release", "category_ar": "مريول حماية شاملة فك سريع (Full Wraparound Release)", "name_ar": "مريول حماية شاملة فك سريع (Full Wraparound Release) - رجالي - سمك 0.50 mm Pb - مقاس S", "name_en": "Full Wraparound Release Apron - Male - 0.50 mm Pb - Size S", "gender": "Male", "gender_ar": "رجالي", "thickness": "0.50 mm Pb", "size": "S", "price_sar": 2850.0, "uom": "EACH"}, {"code": "FWR-F-0.50-S", "category": "Full Wraparound Release", "category_ar": "مريول حماية شاملة فك سريع (Full Wraparound Release)", "name_ar": "مريول حماية شاملة فك سريع (Full Wraparound Release) - نسائي - سمك 0.50 mm Pb - مقاس S", "name_en": "Full Wraparound Release Apron - Female - 0.50 mm Pb - Size S", "gender": "Female", "gender_ar": "نسائي", "thickness": "0.50 mm Pb", "size": "S", "price_sar": 2850.0, "uom": "EACH"}, {"code": "FWR-M-0.50-M", "category": "Full Wraparound Release", "category_ar": "مريول حماية شاملة فك سريع (Full Wraparound Release)", "name_ar": "مريول حماية شاملة فك سريع (Full Wraparound Release) - رجالي - سمك 0.50 mm Pb - مقاس M", "name_en": "Full Wraparound Release Apron - Male - 0.50 mm Pb - Size M", "gender": "Male", "gender_ar": "رجالي", "thickness": "0.50 mm Pb", "size": "M", "price_sar": 2850.0, "uom": "EACH"}, {"code": "FWR-F-0.50-M", "category": "Full Wraparound Release", "category_ar": "مريول حماية شاملة فك سريع (Full Wraparound Release)", "name_ar": "مريول حماية شاملة فك سريع (Full Wraparound Release) - نسائي - سمك 0.50 mm Pb - مقاس M", "name_en": "Full Wraparound Release Apron - Female - 0.50 mm Pb - Size M", "gender": "Female", "gender_ar": "نسائي", "thickness": "0.50 mm Pb", "size": "M", "price_sar": 2850.0, "uom": "EACH"}, {"code": "FWR-M-0.50-L", "category": "Full Wraparound Release", "category_ar": "مريول حماية شاملة فك سريع (Full Wraparound Release)", "name_ar": "مريول حماية شاملة فك سريع (Full Wraparound Release) - رجالي - سمك 0.50 mm Pb - مقاس L", "name_en": "Full Wraparound Release Apron - Male - 0.50 mm Pb - Size L", "gender": "Male", "gender_ar": "رجالي", "thickness": "0.50 mm Pb", "size": "L", "price_sar": 2850.0, "uom": "EACH"}, {"code": "FWR-F-0.50-L", "category": "Full Wraparound Release", "category_ar": "مريول حماية شاملة فك سريع (Full Wraparound Release)", "name_ar": "مريول حماية شاملة فك سريع (Full Wraparound Release) - نسائي - سمك 0.50 mm Pb - مقاس L", "name_en": "Full Wraparound Release Apron - Female - 0.50 mm Pb - Size L", "gender": "Female", "gender_ar": "نسائي", "thickness": "0.50 mm Pb", "size": "L", "price_sar": 2850.0, "uom": "EACH"}, {"code": "FWR-M-0.50-XL", "category": "Full Wraparound Release", "category_ar": "مريول حماية شاملة فك سريع (Full Wraparound Release)", "name_ar": "مريول حماية شاملة فك سريع (Full Wraparound Release) - رجالي - سمك 0.50 mm Pb - مقاس XL", "name_en": "Full Wraparound Release Apron - Male - 0.50 mm Pb - Size XL", "gender": "Male", "gender_ar": "رجالي", "thickness": "0.50 mm Pb", "size": "XL", "price_sar": 2850.0, "uom": "EACH"}, {"code": "FWR-F-0.50-XL", "category": "Full Wraparound Release", "category_ar": "مريول حماية شاملة فك سريع (Full Wraparound Release)", "name_ar": "مريول حماية شاملة فك سريع (Full Wraparound Release) - نسائي - سمك 0.50 mm Pb - مقاس XL", "name_en": "Full Wraparound Release Apron - Female - 0.50 mm Pb - Size XL", "gender": "Female", "gender_ar": "نسائي", "thickness": "0.50 mm Pb", "size": "XL", "price_sar": 2850.0, "uom": "EACH"}, {"code": "FWR-M-0.50-XXL", "category": "Full Wraparound Release", "category_ar": "مريول حماية شاملة فك سريع (Full Wraparound Release)", "name_ar": "مريول حماية شاملة فك سريع (Full Wraparound Release) - رجالي - سمك 0.50 mm Pb - مقاس XXL", "name_en": "Full Wraparound Release Apron - Male - 0.50 mm Pb - Size XXL", "gender": "Male", "gender_ar": "رجالي", "thickness": "0.50 mm Pb", "size": "XXL", "price_sar": 3135.0, "uom": "EACH"}, {"code": "FWR-F-0.50-XXL", "category": "Full Wraparound Release", "category_ar": "مريول حماية شاملة فك سريع (Full Wraparound Release)", "name_ar": "مريول حماية شاملة فك سريع (Full Wraparound Release) - نسائي - سمك 0.50 mm Pb - مقاس XXL", "name_en": "Full Wraparound Release Apron - Female - 0.50 mm Pb - Size XXL", "gender": "Female", "gender_ar": "نسائي", "thickness": "0.50 mm Pb", "size": "XXL", "price_sar": 3135.0, "uom": "EACH"}, {"code": "FSD-M-0.50-XS", "category": "Frontal Surgery", "category_ar": "مريول جراحي أمامي (Frontal Surgery Drop)", "name_ar": "مريول جراحي أمامي (Frontal Surgery Drop) - رجالي - سمك 0.50 mm Pb - مقاس XS", "name_en": "Frontal Surgery Apron - Male - 0.50 mm Pb - Size XS", "gender": "Male", "gender_ar": "رجالي", "thickness": "0.50 mm Pb", "size": "XS", "price_sar": 1938.0, "uom": "EACH"}, {"code": "FSD-F-0.50-XS", "category": "Frontal Surgery", "category_ar": "مريول جراحي أمامي (Frontal Surgery Drop)", "name_ar": "مريول جراحي أمامي (Frontal Surgery Drop) - نسائي - سمك 0.50 mm Pb - مقاس XS", "name_en": "Frontal Surgery Apron - Female - 0.50 mm Pb - Size XS", "gender": "Female", "gender_ar": "نسائي", "thickness": "0.50 mm Pb", "size": "XS", "price_sar": 1938.0, "uom": "EACH"}, {"code": "FSD-M-0.50-S", "category": "Frontal Surgery", "category_ar": "مريول جراحي أمامي (Frontal Surgery Drop)", "name_ar": "مريول جراحي أمامي (Frontal Surgery Drop) - رجالي - سمك 0.50 mm Pb - مقاس S", "name_en": "Frontal Surgery Apron - Male - 0.50 mm Pb - Size S", "gender": "Male", "gender_ar": "رجالي", "thickness": "0.50 mm Pb", "size": "S", "price_sar": 1938.0, "uom": "EACH"}, {"code": "FSD-F-0.50-S", "category": "Frontal Surgery", "category_ar": "مريول جراحي أمامي (Frontal Surgery Drop)", "name_ar": "مريول جراحي أمامي (Frontal Surgery Drop) - نسائي - سمك 0.50 mm Pb - مقاس S", "name_en": "Frontal Surgery Apron - Female - 0.50 mm Pb - Size S", "gender": "Female", "gender_ar": "نسائي", "thickness": "0.50 mm Pb", "size": "S", "price_sar": 1938.0, "uom": "EACH"}, {"code": "FSD-M-0.50-M", "category": "Frontal Surgery", "category_ar": "مريول جراحي أمامي (Frontal Surgery Drop)", "name_ar": "مريول جراحي أمامي (Frontal Surgery Drop) - رجالي - سمك 0.50 mm Pb - مقاس M", "name_en": "Frontal Surgery Apron - Male - 0.50 mm Pb - Size M", "gender": "Male", "gender_ar": "رجالي", "thickness": "0.50 mm Pb", "size": "M", "price_sar": 1938.0, "uom": "EACH"}, {"code": "FSD-F-0.50-M", "category": "Frontal Surgery", "category_ar": "مريول جراحي أمامي (Frontal Surgery Drop)", "name_ar": "مريول جراحي أمامي (Frontal Surgery Drop) - نسائي - سمك 0.50 mm Pb - مقاس M", "name_en": "Frontal Surgery Apron - Female - 0.50 mm Pb - Size M", "gender": "Female", "gender_ar": "نسائي", "thickness": "0.50 mm Pb", "size": "M", "price_sar": 1938.0, "uom": "EACH"}, {"code": "FSD-M-0.50-L", "category": "Frontal Surgery", "category_ar": "مريول جراحي أمامي (Frontal Surgery Drop)", "name_ar": "مريول جراحي أمامي (Frontal Surgery Drop) - رجالي - سمك 0.50 mm Pb - مقاس L", "name_en": "Frontal Surgery Apron - Male - 0.50 mm Pb - Size L", "gender": "Male", "gender_ar": "رجالي", "thickness": "0.50 mm Pb", "size": "L", "price_sar": 1938.0, "uom": "EACH"}, {"code": "FSD-F-0.50-L", "category": "Frontal Surgery", "category_ar": "مريول جراحي أمامي (Frontal Surgery Drop)", "name_ar": "مريول جراحي أمامي (Frontal Surgery Drop) - نسائي - سمك 0.50 mm Pb - مقاس L", "name_en": "Frontal Surgery Apron - Female - 0.50 mm Pb - Size L", "gender": "Female", "gender_ar": "نسائي", "thickness": "0.50 mm Pb", "size": "L", "price_sar": 1938.0, "uom": "EACH"}, {"code": "FSD-M-0.50-XL", "category": "Frontal Surgery", "category_ar": "مريول جراحي أمامي (Frontal Surgery Drop)", "name_ar": "مريول جراحي أمامي (Frontal Surgery Drop) - رجالي - سمك 0.50 mm Pb - مقاس XL", "name_en": "Frontal Surgery Apron - Male - 0.50 mm Pb - Size XL", "gender": "Male", "gender_ar": "رجالي", "thickness": "0.50 mm Pb", "size": "XL", "price_sar": 1938.0, "uom": "EACH"}, {"code": "FSD-F-0.50-XL", "category": "Frontal Surgery", "category_ar": "مريول جراحي أمامي (Frontal Surgery Drop)", "name_ar": "مريول جراحي أمامي (Frontal Surgery Drop) - نسائي - سمك 0.50 mm Pb - مقاس XL", "name_en": "Frontal Surgery Apron - Female - 0.50 mm Pb - Size XL", "gender": "Female", "gender_ar": "نسائي", "thickness": "0.50 mm Pb", "size": "XL", "price_sar": 1938.0, "uom": "EACH"}, {"code": "FSD-M-0.50-XXL", "category": "Frontal Surgery", "category_ar": "مريول جراحي أمامي (Frontal Surgery Drop)", "name_ar": "مريول جراحي أمامي (Frontal Surgery Drop) - رجالي - سمك 0.50 mm Pb - مقاس XXL", "name_en": "Frontal Surgery Apron - Male - 0.50 mm Pb - Size XXL", "gender": "Male", "gender_ar": "رجالي", "thickness": "0.50 mm Pb", "size": "XXL", "price_sar": 2109.0, "uom": "EACH"}, {"code": "FSD-F-0.50-XXL", "category": "Frontal Surgery", "category_ar": "مريول جراحي أمامي (Frontal Surgery Drop)", "name_ar": "مريول جراحي أمامي (Frontal Surgery Drop) - نسائي - سمك 0.50 mm Pb - مقاس XXL", "name_en": "Frontal Surgery Apron - Female - 0.50 mm Pb - Size XXL", "gender": "Female", "gender_ar": "نسائي", "thickness": "0.50 mm Pb", "size": "XXL", "price_sar": 2109.0, "uom": "EACH"}, {"code": "FSD-M-0.35-XL", "category": "Frontal Surgery", "category_ar": "مريول جراحي أمامي (Frontal Surgery Drop)", "name_ar": "مريول جراحي أمامي (Frontal Surgery Drop) - رجالي - سمك 0.35 mm Pb - مقاس XL", "name_en": "Frontal Surgery Apron - Male - 0.35 mm Pb - Size XL", "gender": "Male", "gender_ar": "رجالي", "thickness": "0.35 mm Pb", "size": "XL", "price_sar": 1425.0, "uom": "EACH"}, {"code": "FSD-F-0.35-XL", "category": "Frontal Surgery", "category_ar": "مريول جراحي أمامي (Frontal Surgery Drop)", "name_ar": "مريول جراحي أمامي (Frontal Surgery Drop) - نسائي - سمك 0.35 mm Pb - مقاس XL", "name_en": "Frontal Surgery Apron - Female - 0.35 mm Pb - Size XL", "gender": "Female", "gender_ar": "نسائي", "thickness": "0.35 mm Pb", "size": "XL", "price_sar": 1425.0, "uom": "EACH"}, {"code": "FSD-M-0.35-XXL", "category": "Frontal Surgery", "category_ar": "مريول جراحي أمامي (Frontal Surgery Drop)", "name_ar": "مريول جراحي أمامي (Frontal Surgery Drop) - رجالي - سمك 0.35 mm Pb - مقاس XXL", "name_en": "Frontal Surgery Apron - Male - 0.35 mm Pb - Size XXL", "gender": "Male", "gender_ar": "رجالي", "thickness": "0.35 mm Pb", "size": "XXL", "price_sar": 1596.0, "uom": "EACH"}, {"code": "FSD-F-0.35-XXL", "category": "Frontal Surgery", "category_ar": "مريول جراحي أمامي (Frontal Surgery Drop)", "name_ar": "مريول جراحي أمامي (Frontal Surgery Drop) - نسائي - سمك 0.35 mm Pb - مقاس XXL", "name_en": "Frontal Surgery Apron - Female - 0.35 mm Pb - Size XXL", "gender": "Female", "gender_ar": "نسائي", "thickness": "0.35 mm Pb", "size": "XXL", "price_sar": 1596.0, "uom": "EACH"}, {"code": "FVP-M-0.50-XS", "category": "Frontal", "category_ar": "مريول حماية أمامي (Frontal Vest)", "name_ar": "مريول حماية أمامي (Frontal Vest) - رجالي - سمك 0.50 mm Pb - مقاس XS", "name_en": "Frontal Apron - Male - 0.50 mm Pb - Size XS", "gender": "Male", "gender_ar": "رجالي", "thickness": "0.50 mm Pb", "size": "XS", "price_sar": 1938.0, "uom": "EACH"}, {"code": "FVP-F-0.50-XS", "category": "Frontal", "category_ar": "مريول حماية أمامي (Frontal Vest)", "name_ar": "مريول حماية أمامي (Frontal Vest) - نسائي - سمك 0.50 mm Pb - مقاس XS", "name_en": "Frontal Apron - Female - 0.50 mm Pb - Size XS", "gender": "Female", "gender_ar": "نسائي", "thickness": "0.50 mm Pb", "size": "XS", "price_sar": 1938.0, "uom": "EACH"}, {"code": "FVP-M-0.50-S", "category": "Frontal", "category_ar": "مريول حماية أمامي (Frontal Vest)", "name_ar": "مريول حماية أمامي (Frontal Vest) - رجالي - سمك 0.50 mm Pb - مقاس S", "name_en": "Frontal Apron - Male - 0.50 mm Pb - Size S", "gender": "Male", "gender_ar": "رجالي", "thickness": "0.50 mm Pb", "size": "S", "price_sar": 1938.0, "uom": "EACH"}, {"code": "FVP-F-0.50-S", "category": "Frontal", "category_ar": "مريول حماية أمامي (Frontal Vest)", "name_ar": "مريول حماية أمامي (Frontal Vest) - نسائي - سمك 0.50 mm Pb - مقاس S", "name_en": "Frontal Apron - Female - 0.50 mm Pb - Size S", "gender": "Female", "gender_ar": "نسائي", "thickness": "0.50 mm Pb", "size": "S", "price_sar": 1938.0, "uom": "EACH"}, {"code": "FVP-M-0.50-M", "category": "Frontal", "category_ar": "مريول حماية أمامي (Frontal Vest)", "name_ar": "مريول حماية أمامي (Frontal Vest) - رجالي - سمك 0.50 mm Pb - مقاس M", "name_en": "Frontal Apron - Male - 0.50 mm Pb - Size M", "gender": "Male", "gender_ar": "رجالي", "thickness": "0.50 mm Pb", "size": "M", "price_sar": 1938.0, "uom": "EACH"}, {"code": "FVP-F-0.50-M", "category": "Frontal", "category_ar": "مريول حماية أمامي (Frontal Vest)", "name_ar": "مريول حماية أمامي (Frontal Vest) - نسائي - سمك 0.50 mm Pb - مقاس M", "name_en": "Frontal Apron - Female - 0.50 mm Pb - Size M", "gender": "Female", "gender_ar": "نسائي", "thickness": "0.50 mm Pb", "size": "M", "price_sar": 1938.0, "uom": "EACH"}, {"code": "FVP-M-0.50-L", "category": "Frontal", "category_ar": "مريول حماية أمامي (Frontal Vest)", "name_ar": "مريول حماية أمامي (Frontal Vest) - رجالي - سمك 0.50 mm Pb - مقاس L", "name_en": "Frontal Apron - Male - 0.50 mm Pb - Size L", "gender": "Male", "gender_ar": "رجالي", "thickness": "0.50 mm Pb", "size": "L", "price_sar": 1938.0, "uom": "EACH"}, {"code": "FVP-F-0.50-L", "category": "Frontal", "category_ar": "مريول حماية أمامي (Frontal Vest)", "name_ar": "مريول حماية أمامي (Frontal Vest) - نسائي - سمك 0.50 mm Pb - مقاس L", "name_en": "Frontal Apron - Female - 0.50 mm Pb - Size L", "gender": "Female", "gender_ar": "نسائي", "thickness": "0.50 mm Pb", "size": "L", "price_sar": 1938.0, "uom": "EACH"}, {"code": "FVP-M-0.50-XL", "category": "Frontal", "category_ar": "مريول حماية أمامي (Frontal Vest)", "name_ar": "مريول حماية أمامي (Frontal Vest) - رجالي - سمك 0.50 mm Pb - مقاس XL", "name_en": "Frontal Apron - Male - 0.50 mm Pb - Size XL", "gender": "Male", "gender_ar": "رجالي", "thickness": "0.50 mm Pb", "size": "XL", "price_sar": 1938.0, "uom": "EACH"}, {"code": "FVP-F-0.50-XL", "category": "Frontal", "category_ar": "مريول حماية أمامي (Frontal Vest)", "name_ar": "مريول حماية أمامي (Frontal Vest) - نسائي - سمك 0.50 mm Pb - مقاس XL", "name_en": "Frontal Apron - Female - 0.50 mm Pb - Size XL", "gender": "Female", "gender_ar": "نسائي", "thickness": "0.50 mm Pb", "size": "XL", "price_sar": 1938.0, "uom": "EACH"}, {"code": "FVP-M-0.50-XXL", "category": "Frontal", "category_ar": "مريول حماية أمامي (Frontal Vest)", "name_ar": "مريول حماية أمامي (Frontal Vest) - رجالي - سمك 0.50 mm Pb - مقاس XXL", "name_en": "Frontal Apron - Male - 0.50 mm Pb - Size XXL", "gender": "Male", "gender_ar": "رجالي", "thickness": "0.50 mm Pb", "size": "XXL", "price_sar": 2109.0, "uom": "EACH"}, {"code": "FVP-F-0.50-XXL", "category": "Frontal", "category_ar": "مريول حماية أمامي (Frontal Vest)", "name_ar": "مريول حماية أمامي (Frontal Vest) - نسائي - سمك 0.50 mm Pb - مقاس XXL", "name_en": "Frontal Apron - Female - 0.50 mm Pb - Size XXL", "gender": "Female", "gender_ar": "نسائي", "thickness": "0.50 mm Pb", "size": "XXL", "price_sar": 2109.0, "uom": "EACH"}, {"code": "FVP-M-0.35-XL", "category": "Frontal", "category_ar": "مريول حماية أمامي (Frontal Vest)", "name_ar": "مريول حماية أمامي (Frontal Vest) - رجالي - سمك 0.35 mm Pb - مقاس XL", "name_en": "Frontal Apron - Male - 0.35 mm Pb - Size XL", "gender": "Male", "gender_ar": "رجالي", "thickness": "0.35 mm Pb", "size": "XL", "price_sar": 1425.0, "uom": "EACH"}, {"code": "FVP-F-0.35-XL", "category": "Frontal", "category_ar": "مريول حماية أمامي (Frontal Vest)", "name_ar": "مريول حماية أمامي (Frontal Vest) - نسائي - سمك 0.35 mm Pb - مقاس XL", "name_en": "Frontal Apron - Female - 0.35 mm Pb - Size XL", "gender": "Female", "gender_ar": "نسائي", "thickness": "0.35 mm Pb", "size": "XL", "price_sar": 1425.0, "uom": "EACH"}, {"code": "FVP-M-0.35-XXL", "category": "Frontal", "category_ar": "مريول حماية أمامي (Frontal Vest)", "name_ar": "مريول حماية أمامي (Frontal Vest) - رجالي - سمك 0.35 mm Pb - مقاس XXL", "name_en": "Frontal Apron - Male - 0.35 mm Pb - Size XXL", "gender": "Male", "gender_ar": "رجالي", "thickness": "0.35 mm Pb", "size": "XXL", "price_sar": 1596.0, "uom": "EACH"}, {"code": "FVP-F-0.35-XXL", "category": "Frontal", "category_ar": "مريول حماية أمامي (Frontal Vest)", "name_ar": "مريول حماية أمامي (Frontal Vest) - نسائي - سمك 0.35 mm Pb - مقاس XXL", "name_en": "Frontal Apron - Female - 0.35 mm Pb - Size XXL", "gender": "Female", "gender_ar": "نسائي", "thickness": "0.35 mm Pb", "size": "XXL", "price_sar": 1596.0, "uom": "EACH"}, {"code": "DRA", "category": "Dental Apron", "category_ar": "مريول أشعة الأسنان (Dental Apron)", "name_ar": "مريول أسنان وبانوراما للبالغين", "name_en": "Panoramic Dental Apron - Adult", "gender": "Unisex", "gender_ar": "للجنسين", "thickness": "0.35 mm Pb", "size": "One Size", "price_sar": 1596.0, "uom": "EACH"}, {"code": "DRV", "category": "Dental Apron", "category_ar": "مريول أشعة الأسنان (Dental Apron)", "name_ar": "مريول أسنان وبانوراما مع واقي غدة مدمج", "name_en": "Dental Apron with Integrated Thyroid Collar", "gender": "Unisex", "gender_ar": "للجنسين", "thickness": "0.35 mm Pb", "size": "One Size", "price_sar": 1596.0, "uom": "EACH"}, {"code": "DRP", "category": "Dental Apron", "category_ar": "مريول أشعة الأسنان (Dental Apron)", "name_ar": "مريول أسنان وبانوراما للأطفال", "name_en": "Panoramic Dental Apron - Pediatric", "gender": "Unisex", "gender_ar": "للجنسين", "thickness": "0.35 mm Pb", "size": "One Size", "price_sar": 1083.0, "uom": "EACH"}, {"code": "SLV-L", "category": "Accessories", "category_ar": "إكسسوارات الوقاية من الإشعاع (Accessories)", "name_ar": "كم واقي من الإشعاع - ذراع يسار (Left Sleeve)", "name_en": "Lead Protection Sleeve - Left", "gender": "Unisex", "gender_ar": "للجنسين", "thickness": "0.50 mm Pb", "size": "L", "price_sar": 285.0, "uom": "EACH"}, {"code": "SLV-R", "category": "Accessories", "category_ar": "إكسسوارات الوقاية من الإشعاع (Accessories)", "name_ar": "كم واقي من الإشعاع - ذراع يمين (Right Sleeve)", "name_en": "Lead Protection Sleeve - Right", "gender": "Unisex", "gender_ar": "للجنسين", "thickness": "0.50 mm Pb", "size": "One Size", "price_sar": 285.0, "uom": "EACH"}, {"code": "APW", "category": "Accessories", "category_ar": "إكسسوارات الوقاية من الإشعاع (Accessories)", "name_ar": "أجنحة وحزام تدعيم المريول (Apron Wings Support)", "name_en": "Apron Support Wings Belt", "gender": "Unisex", "gender_ar": "للجنسين", "thickness": "0.50 mm Pb", "size": "One Size", "price_sar": 285.0, "uom": "EACH"}, {"code": "TCV-S", "category": "Accessories", "category_ar": "إكسسوارات الوقاية من الإشعاع (Accessories)", "name_ar": "واقي الغدة الدرقية فيلكرو - مقاس S", "name_en": "Thyroid Collar (Velcro) - Small", "gender": "Unisex", "gender_ar": "للجنسين", "thickness": "0.50 mm Pb", "size": "S", "price_sar": 353.4, "uom": "EACH"}, {"code": "TCV-M", "category": "Accessories", "category_ar": "إكسسوارات الوقاية من الإشعاع (Accessories)", "name_ar": "واقي الغدة الدرقية فيلكرو - مقاس M", "name_en": "Thyroid Collar (Velcro) - Medium", "gender": "Unisex", "gender_ar": "للجنسين", "thickness": "0.50 mm Pb", "size": "M", "price_sar": 353.4, "uom": "EACH"}, {"code": "TCV-L", "category": "Accessories", "category_ar": "إكسسوارات الوقاية من الإشعاع (Accessories)", "name_ar": "واقي الغدة الدرقية فيلكرو - مقاس L", "name_en": "Thyroid Collar (Velcro) - Large", "gender": "Unisex", "gender_ar": "للجنسين", "thickness": "0.50 mm Pb", "size": "L", "price_sar": 353.4, "uom": "EACH"}, {"code": "TCM-S", "category": "Accessories", "category_ar": "إكسسوارات الوقاية من الإشعاع (Accessories)", "name_ar": "واقي الغدة الدرقية مغناطيسي - مقاس S", "name_en": "Thyroid Collar (Magnetic) - Small", "gender": "Unisex", "gender_ar": "للجنسين", "thickness": "0.50 mm Pb", "size": "S", "price_sar": 353.4, "uom": "EACH"}, {"code": "TCM-M", "category": "Accessories", "category_ar": "إكسسوارات الوقاية من الإشعاع (Accessories)", "name_ar": "واقي الغدة الدرقية مغناطيسي - مقاس M", "name_en": "Thyroid Collar (Magnetic) - Medium", "gender": "Unisex", "gender_ar": "للجنسين", "thickness": "0.50 mm Pb", "size": "M", "price_sar": 353.4, "uom": "EACH"}, {"code": "TCM-L", "category": "Accessories", "category_ar": "إكسسوارات الوقاية من الإشعاع (Accessories)", "name_ar": "واقي الغدة الدرقية مغناطيسي - مقاس L", "name_en": "Thyroid Collar (Magnetic) - Large", "gender": "Unisex", "gender_ar": "للجنسين", "thickness": "0.50 mm Pb", "size": "L", "price_sar": 353.4, "uom": "EACH"}, {"code": "CAP-S", "category": "Accessories", "category_ar": "إكسسوارات الوقاية من الإشعاع (Accessories)", "name_ar": "قبعة واقية من الإشعاع - قياسية", "name_en": "Radiation Protection Cap - Standard", "gender": "Unisex", "gender_ar": "للجنسين", "thickness": "0.50 mm Pb", "size": "S", "price_sar": 427.5, "uom": "EACH"}, {"code": "CAP-V", "category": "Accessories", "category_ar": "إكسسوارات الوقاية من الإشعاع (Accessories)", "name_ar": "قبعة واقية من الإشعاع - شريط فيلكرو", "name_en": "Radiation Protection Cap - Velcro", "gender": "Unisex", "gender_ar": "للجنسين", "thickness": "0.50 mm Pb", "size": "One Size", "price_sar": 427.5, "uom": "EACH"}, {"code": "BSB", "category": "Accessories", "category_ar": "إكسسوارات الوقاية من الإشعاع (Accessories)", "name_ar": "حزام تدعيم الظهر المرن (Back Support)", "name_en": "Back Support Belt for Aprons", "gender": "Unisex", "gender_ar": "للجنسين", "thickness": "0.50 mm Pb", "size": "One Size", "price_sar": 142.5, "uom": "EACH"}, {"code": "SUS", "category": "Accessories", "category_ar": "إكسسوارات الوقاية من الإشعاع (Accessories)", "name_ar": "حمّالات مريول مرنة قابلة للتعديل", "name_en": "Adjustable Apron Suspenders", "gender": "Unisex", "gender_ar": "للجنسين", "thickness": "0.50 mm Pb", "size": "One Size", "price_sar": 142.5, "uom": "EACH"}, {"code": "BAG", "category": "Accessories", "category_ar": "إكسسوارات الوقاية من الإشعاع (Accessories)", "name_ar": "حقيبة مبطنة لحفظ ونقل المريول", "name_en": "Heavy-Duty Apron Storage Bag", "gender": "Unisex", "gender_ar": "للجنسين", "thickness": "0.50 mm Pb", "size": "One Size", "price_sar": 142.5, "uom": "EACH"}]};
let currentSelection = {
  category: null,
  gender: null,
  thickness: null,
  size: null,
  matchedItem: null,
  qty: 1,
  embroidery: "",
  logoFilename: null,
  logoUrl: null
};

let cart = [];
const VAT_RATE = 0.15;

const I18N = {
  ar: {
    headerBrandTitle: "GulfRay® | شركة سقالة حلول الوقاية",
    headerBrandSubtitle: "مصنع لإنتاج Radiation Protection Aprons وحلول الوقاية من الأشعة",
    btnLangToggle: "🌐 English",
    txtHeaderCart: "🛒 طلب الشراء",
    txtAdminBtn: "⚙️ تحديث الأسعار (Admin)",
    heroTitle: "حلول ومواد الحماية المتقدمة من الإشعاع الطبي",
    heroDesc: "مصنع وطني متخصص في إنتاج مآزر الرصاص الخفيفة وعالية الحماية وحلول تدريع غرف الأشعة، بأعلى درجات الراحة والتوازن الهيكلي للأطباء والكوادر الطبية.",
    kpiLabelCat: "الفئات المعتمدة",
    kpiCategories: "9 فئات رئيسية",
    kpiLabelItems: "الموديلات والأصناف",
    kpiItemsCount: "109 أصناف مسجلة",
    kpiLabelLead: "مستويات الرصاص المكافئ",
    kpiLabelPrice: "قائمة الأسعار الرسمية",
    kpiPriceVal: "ريال سعودي (غير شامل VAT)",
    tabConfigTxt: "✨ مُشكّل المريول التفاعلي (Configurator)",
    tabCatalogTxt: "📊 جدول وتصفح كافة الأصناف (Catalog Explorer)",
    step1Title: "اختر فئة المريول أو الإكسسوار (Product Category)",
    step2Title: "التصميم والجنس (Gender / Cut)",
    step3Title: "سمك الرصاص المكافئ للحماية (Lead Equivalence)",
    step4Title: "المقاس (Size)",
    step5Title: "التخصيص الفاخر وإرفاق الشعار (Customization) - اختياري",
    lblEmbroidery: "🧵 تطريز مخصص على المريول (اسم الطبيب أو اسم القسم):",
    lblLogo: "📎 إرفاق شعار المستشفى / المركز الطبي (Hospital Logo):",
    btnUploadLogo: "📤 اختر ملف الشعار من جهازك",
    logoNone: "لم يتم إرفاق ملف بعد",
    summaryCardTitle: "ملخص الصنف المختار",
    summaryPriceLbl: "السعر الرسمي المعتمد للصنف",
    summaryCurrencyLbl: "ريال سعودي (غير شامل VAT)",
    qtyLabel: "الكمية المطلوبة (Quantity)",
    btnAddToCartTxt: "🛒 إضافة إلى طلب عرض السعر",
    txtComplianceBadge: "✓ منتجات مصنعة محلياً ومعتمدة وفق مواصفات CE و ISO للحماية الإشعاعية.",
    searchPlaceholder: "🔍 ابحث برقم الكود، الفئة، أو المقاس...",
    optAllCategories: "جميع الفئات (All Categories)",
    thCode: "الكود (Item Code)",
    thCategory: "الفئة (Category)",
    thSpecs: "النوع والمواصفة",
    thSize: "المقاس",
    thThickness: "السمك Pb",
    thPrice: "السعر (SAR)",
    thAction: "إجراء",
    cartModalTitle: "📋 تفاصيل طلب الشراء / عرض السعر (RFQ)",
    lblSubtotal: "المجموع الفرعي (Subtotal):",
    lblVat: "ضريبة القيمة المضافة 15% (VAT):",
    lblGrandTotal: "الإجمالي النهائي شامل الضريبة:",
    hdrCustomerDetails: "👤 بيانات العميل وجهة الشراء",
    lblCustName: "اسم المسؤول / الطبيب: *",
    lblCustOrg: "اسم المستشفى / المركز الطبي: *",
    lblCustCity: "المدينة: *",
    lblCustPhone: "رقم الجوال / الواتساب: *",
    lblCustEmail: "البريد الإلكتروني للعميل: *",
    lblPaymentMethod: "طريقة السداد المعتمدة لدى جهتكم: *",
    optBankTransfer: "تحويل بنكي رسمي (Bank Transfer)",
    optLpo: "أمر شراء حكومي / تعميد ودفع آجل للمستشفيات (LPO / Credit Term)",
    optCod: "نقداً / شبكة عند التوريد (Cash / Card on Delivery)",
    lblCustNotes: "ملاحظات إضافية أو شروط خاصة:",
    txtOrderNotice: "📬 عند الضغط على 'إرسال طلب الشراء'، سيتم توثيق الطلب وإرسال نسخة كاملة وفورية إلى إدارة مبيعات GulfRay (asaeed@ims-medical.com, tarek@Ims-medical.com, atharwat@ims-medical.com) بالإضافة إلى نسخة إلى إيميلك المسجل.",
    txtSubmitBtn: "✉️ اعتماد وإرسال طلب الشراء الرسمي",
    txtPrintBtn: "📄 طباعة / PDF فوري",
    adminModalTitle: "⚙️ لوحة تحديث قائمة الأسعار (Admin)",
    adminModalDesc: "يمكنك هنا رفع ملف GulfRay price list.xlsx الجديد ليقوم النظام بتحديث الأسعار فورياً محلياً وبشكل آمن تماماً.",
    lblAdminPin: "الرمز السري للإدارة (PIN Code):",
    lblAdminFile: "اختر ملف الإكسل المحدث (.xlsx):",
    txtAdminUploadBtn: "🔄 تحديث وتطبيق الأسعار الجديدة",
    currencySymbol: "ر.س",
    cartEmptyMsg: "سلة طلب الشراء فارغة حالياً.",
    addedSuccess: "✓ تمت الإضافة بنجاح إلى الطلب!"
  },
  en: {
    headerBrandTitle: "GulfRay® | Siqalah Shielding Solutions",
    headerBrandSubtitle: "Manufacturer of Radiation Protection Aprons & Radiation Shielding Solutions",
    btnLangToggle: "🌐 العربية",
    txtHeaderCart: "🛒 Purchase Order",
    txtAdminBtn: "⚙️ Update Prices (Admin)",
    heroTitle: "Advanced Core Material & Radiation Shielding Solutions",
    heroDesc: "A specialized national factory producing lightweight, high-protection lead aprons and medical X-ray shielding solutions engineered for optimal weight distribution and doctor comfort.",
    kpiLabelCat: "Approved Categories",
    kpiCategories: "9 Main Categories",
    kpiLabelItems: "Registered SKUs",
    kpiItemsCount: "109 Products",
    kpiLabelLead: "Lead Equivalence",
    kpiLabelPrice: "Official Price List",
    kpiPriceVal: "SAR (Excl. 15% VAT)",
    tabConfigTxt: "✨ Interactive Apron Configurator",
    tabCatalogTxt: "📊 Catalog & Price Explorer",
    step1Title: "Select Apron or Accessory Category",
    step2Title: "Design & Gender Cut",
    step3Title: "Lead Protection Equivalence (mm Pb)",
    step4Title: "Size",
    step5Title: "Custom Embroidery & Logo (Optional)",
    lblEmbroidery: "🧵 Custom Embroidery (Doctor's Name / Dept):",
    lblLogo: "📎 Attach Hospital / Clinic Logo File:",
    btnUploadLogo: "📤 Choose Logo File",
    logoNone: "No logo attached yet",
    summaryCardTitle: "Selected Item Summary",
    summaryPriceLbl: "Approved Official Unit Price",
    summaryCurrencyLbl: "SAR (Excl. 15% VAT)",
    qtyLabel: "Requested Quantity",
    btnAddToCartTxt: "🛒 Add to RFQ Quotation",
    txtComplianceBadge: "✓ Locally manufactured & certified compliant with CE and ISO 13485 radiation protection standards.",
    searchPlaceholder: "🔍 Search by item code, category, or size...",
    optAllCategories: "All Categories",
    thCode: "Item Code",
    thCategory: "Category",
    thSpecs: "Description & Specs",
    thSize: "Size",
    thThickness: "Lead Pb",
    thPrice: "Price (SAR)",
    thAction: "Action",
    cartModalTitle: "📋 Quotation / Purchase Order Request (RFQ)",
    lblSubtotal: "Subtotal:",
    lblVat: "Value Added Tax 15% (VAT):",
    lblGrandTotal: "Grand Total (Incl. VAT):",
    hdrCustomerDetails: "👤 Client & Procurement Details",
    lblCustName: "Doctor / Contact Name: *",
    lblCustOrg: "Hospital / Medical Center: *",
    lblCustCity: "City: *",
    lblCustPhone: "Mobile / WhatsApp: *",
    lblCustEmail: "Client Email: *",
    lblPaymentMethod: "Approved Payment Term: *",
    optBankTransfer: "Official Bank Transfer",
    optLpo: "Hospital Purchase Order / Credit Term (LPO)",
    optCod: "Cash / Card on Delivery (COD)",
    lblCustNotes: "Additional Notes or Delivery Instructions:",
    txtOrderNotice: "📬 Submitting will dispatch an official RFQ copy to GulfRay Sales Management (asaeed@ims-medical.com, tarek@Ims-medical.com, atharwat@ims-medical.com) and an automatic confirmation copy to your email.",
    txtSubmitBtn: "✉️ Submit Official Purchase Order",
    txtPrintBtn: "📄 Instant Print / PDF",
    adminModalTitle: "⚙️ Update Price List (Admin)",
    adminModalDesc: "Upload updated GulfRay price list.xlsx to instantly update the pricing engine with local verification.",
    lblAdminPin: "Admin Security PIN:",
    lblAdminFile: "Select Updated Excel File (.xlsx):",
    txtAdminUploadBtn: "🔄 Apply New Price List",
    currencySymbol: "SAR",
    cartEmptyMsg: "The purchase order cart is currently empty.",
    addedSuccess: "✓ Successfully added to order!"
  }
};

// -------------------------------------------------------------
// Initialization & Language Switching
// -------------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
  const savedLang = null;
  if (savedLang === "en" || savedLang === "ar") {
    currentLang = savedLang;
  }
  applyLanguage(currentLang);
  loadCatalog();
  loadCartFromStorage();
});

function toggleLanguage() {
  currentLang = currentLang === "ar" ? "en" : "ar";
  localStorage.setItem("gulfray_lang", currentLang);
  applyLanguage(currentLang);
  if (catalogData) {
    renderCategoryPills();
    selectCategory(currentSelection.category || catalogData.categories[0]);
    populateCatalogTableFilter();
    renderCatalogTable();
  }
  renderCartModal();
}

function applyLanguage(lang) {
  const t = I18N[lang];
  document.documentElement.lang = lang;
  document.body.dir = lang === "ar" ? "rtl" : "ltr";

  // Update text content of mapped IDs
  for (const [id, text] of Object.entries(t)) {
    const el = document.getElementById(id);
    if (el) {
      if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
        el.placeholder = text;
      } else {
        el.textContent = text;
      }
    }
  }

  const searchInput = document.getElementById("catalogSearchInput");
  if (searchInput) searchInput.placeholder = t.searchPlaceholder;

  updateCartBadge();
}

// -------------------------------------------------------------
// Catalog Loader
// -------------------------------------------------------------

async function loadCatalog() {
  try {
    const res = await fetch("/api/catalog?t=" + new Date().getTime());
    if (!res.ok) throw new Error("Failed to load catalog data");
    catalogData = await res.json();

    const t = I18N[currentLang];
    const catEl = document.getElementById("kpiCategories");
    const itemsEl = document.getElementById("kpiItemsCount");
    if (catEl) catEl.textContent = `${catalogData.categories.length} ${currentLang === 'ar' ? 'فئات رئيسية' : 'Categories'}`;
    if (itemsEl) itemsEl.textContent = `${catalogData.total_items} ${currentLang === 'ar' ? 'أصناف مسجلة' : 'Registered SKUs'}`;

    renderCategoryPills();
    populateCatalogTableFilter();
    renderCatalogTable();

    if (catalogData.categories.length > 0) {
      selectCategory(currentSelection.category || catalogData.categories[0]);
    }
  } catch (err) {
    console.error("Error loading catalog:", err);
    setTimeout(loadCatalog, 1200);
  }
}

// -------------------------------------------------------------
// Configurator Selection Logic
// -------------------------------------------------------------

function renderCategoryPills() {
  const container = document.getElementById("categoryPillsContainer");
  container.innerHTML = "";

  catalogData.categories.forEach(cat => {
    const info = catalogData.tree[cat];
    const pill = document.createElement("div");
    pill.className = "category-pill";
    pill.dataset.category = cat;
    const catName = currentLang === "ar" ? (info.category_ar || cat) : cat;
    pill.innerHTML = `
      <span class="cat-name">${catName}</span>
      <small style="font-size: 11px; opacity: 0.85;">${cat}</small>
    `;
    pill.onclick = () => selectCategory(cat);
    container.appendChild(pill);
  });
}

function selectCategory(category) {
  currentSelection.category = category;
  
  document.querySelectorAll(".category-pill").forEach(p => {
    p.classList.toggle("active", p.dataset.category === category);
  });

  const catTree = catalogData.tree[category];
  if (!catTree) return;

  renderGenderPills(catTree.genders);
  renderThicknessPills(catTree.thicknesses);
  renderSizePills(catTree.sizes);
  evaluateItemMatch();
}

function renderGenderPills(genders) {
  const container = document.getElementById("genderPillsContainer");
  const section = document.getElementById("stepGenderSection");
  container.innerHTML = "";

  if (genders.length === 1 && genders[0] === "Unisex") {
    currentSelection.gender = "Unisex";
    section.style.display = "none";
    return;
  }

  section.style.display = "block";
  genders.forEach(g => {
    const pill = document.createElement("div");
    pill.className = "spec-pill";
    pill.dataset.gender = g;
    let label = g;
    if (currentLang === "ar") {
      label = g === "Male" ? "رجالي 👨 (Male)" : (g === "Female" ? "نسائي 👩 (Female)" : "للجنسين ⚡ (Unisex)");
    } else {
      label = g === "Male" ? "Male 👨" : (g === "Female" ? "Female 👩" : "Unisex ⚡");
    }
    pill.innerHTML = `<span>${label}</span>`;
    pill.onclick = () => selectGender(g);
    container.appendChild(pill);
  });

  selectGender(genders[0]);
}

function selectGender(g) {
  currentSelection.gender = g;
  document.querySelectorAll("#genderPillsContainer .spec-pill").forEach(p => {
    p.classList.toggle("active", p.dataset.gender === g);
  });
  evaluateItemMatch();
}

function renderThicknessPills(thicknesses) {
  const container = document.getElementById("thicknessPillsContainer");
  const section = document.getElementById("stepThicknessSection");
  container.innerHTML = "";

  if (thicknesses.length === 1 && (thicknesses[0] === "-" || thicknesses[0] === "Standard")) {
    currentSelection.thickness = thicknesses[0];
    section.style.display = "none";
    return;
  }

  section.style.display = "block";
  thicknesses.forEach(th => {
    const pill = document.createElement("div");
    pill.className = "spec-pill";
    pill.dataset.thickness = th;
    const isStandard = th.includes("0.50");
    const tag = currentLang === "ar"
      ? (isStandard ? " [المعياري الأعلى حماية]" : " [خفيف الوزن للجراحة]")
      : (isStandard ? " [Standard Max Protection]" : " [Lightweight Surgical]");
    pill.innerHTML = `<span>${th}</span> <small style="color: var(--teal-primary); font-weight: bold;">${tag}</small>`;
    pill.onclick = () => selectThickness(th);
    container.appendChild(pill);
  });

  const preferred = thicknesses.find(t => t.includes("0.50")) || thicknesses[0];
  selectThickness(preferred);
}

function selectThickness(th) {
  currentSelection.thickness = th;
  document.querySelectorAll("#thicknessPillsContainer .spec-pill").forEach(p => {
    p.classList.toggle("active", p.dataset.thickness === th);
  });
  evaluateItemMatch();
}

function renderSizePills(sizes) {
  const container = document.getElementById("sizePillsContainer");
  const section = document.getElementById("stepSizeSection");
  container.innerHTML = "";

  if (sizes.length === 1 && (sizes[0] === "-" || sizes[0] === "One Size")) {
    currentSelection.size = sizes[0];
    section.style.display = "none";
    return;
  }

  section.style.display = "block";
  sizes.forEach(sz => {
    const pill = document.createElement("div");
    pill.className = "spec-pill size-pill";
    pill.dataset.size = sz;
    pill.textContent = sz;
    pill.onclick = () => selectSize(sz);
    container.appendChild(pill);
  });

  const preferred = sizes.includes("L") ? "L" : (sizes.includes("M") ? "M" : sizes[0]);
  selectSize(preferred);
}

function selectSize(sz) {
  currentSelection.size = sz;
  document.querySelectorAll("#sizePillsContainer .spec-pill").forEach(p => {
    p.classList.toggle("active", p.dataset.size === sz);
  });
  evaluateItemMatch();
}

// -------------------------------------------------------------
// Matching & Live Price Evaluation
// -------------------------------------------------------------

function evaluateItemMatch() {
  if (!catalogData) return;

  const cat = currentSelection.category;
  const g = currentSelection.gender;
  const th = currentSelection.thickness;
  const sz = currentSelection.size;

  let candidates = catalogData.items.filter(it => it.category === cat);

  if (g) {
    candidates = candidates.filter(it => it.gender.toLowerCase() === g.toLowerCase() || it.gender === "Unisex");
  }
  if (th && th !== "-") {
    candidates = candidates.filter(it => it.thickness === th || it.thickness === "-");
  }
  if (sz && sz !== "-") {
    candidates = candidates.filter(it => it.size === sz || it.size === "One Size");
  }

  const matched = candidates.length > 0 ? candidates[0] : null;
  currentSelection.matchedItem = matched;

  const codeEl = document.getElementById("summaryItemCode");
  const nameEl = document.getElementById("summaryItemName");
  const specsEl = document.getElementById("summarySpecsDetails");
  const priceEl = document.getElementById("summaryItemPrice");
  const addBtn = document.getElementById("btnAddToCart");

  const sym = I18N[currentLang].currencySymbol;

  if (matched) {
    codeEl.textContent = matched.code;
    nameEl.textContent = currentLang === "ar" ? matched.name_ar : matched.name_en;
    specsEl.textContent = currentLang === "ar"
      ? `الفئة: ${matched.category_ar} | المقاس: ${matched.size} | السمك: ${matched.thickness} | الجنس: ${matched.gender_ar}`
      : `Category: ${matched.category} | Size: ${matched.size} | Lead: ${matched.thickness} | Cut: ${matched.gender}`;
    
    priceEl.textContent = matched.price_sar.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    addBtn.disabled = false;
    addBtn.style.opacity = "1";
    
    const totFormatted = (matched.price_sar * currentSelection.qty).toLocaleString("en-US", { minimumFractionDigits: 2 });
    addBtn.innerHTML = `<span>${I18N[currentLang].btnAddToCartTxt} (${totFormatted} ${sym})</span>`;
  } else {
    codeEl.textContent = "N/A";
    nameEl.textContent = currentLang === "ar" ? "المواصفة غير متوفرة بقائمة الأسعار." : "Specification not available in price list.";
    specsEl.textContent = currentLang === "ar" ? "يرجى تجربة مقاس أو سمك مختلف." : "Please select an alternate size or thickness.";
    priceEl.textContent = "0.00";
    addBtn.disabled = true;
    addBtn.style.opacity = "0.5";
  }
}

function changeQty(delta) {
  const input = document.getElementById("itemQtyInput");
  let val = parseInt(input.value) || 1;
  val = Math.max(1, Math.min(500, val + delta));
  input.value = val;
  currentSelection.qty = val;
  evaluateItemMatch();
}

function validateQty(input) {
  let val = parseInt(input.value) || 1;
  val = Math.max(1, Math.min(500, val));
  input.value = val;
  currentSelection.qty = val;
  evaluateItemMatch();
}

async function handleLogoUpload(input) {
  if (!input.files || input.files.length === 0) return;
  const file = input.files[0];
  const statusEl = document.getElementById("logoUploadStatus");
  const previewContainer = document.getElementById("logoPreviewContainer");
  const previewImg = document.getElementById("logoPreviewImg");

  statusEl.textContent = currentLang === "ar" ? "⏳ جارٍ رفع الشعار..." : "⏳ Uploading logo...";
  statusEl.style.color = "var(--teal-primary)";

  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await fetch("/api/upload-logo", {
      method: "POST",
      body: formData
    });

    if (!res.ok) throw new Error("Upload failed");
    const data = await res.json();

    currentSelection.logoFilename = data.filename;
    currentSelection.logoUrl = data.url;

    statusEl.textContent = `✓ ${file.name}`;
    statusEl.style.color = "#10b981";

    if (file.type.startsWith("image/")) {
      previewImg.src = data.url;
      previewContainer.style.display = "block";
    }
  } catch (err) {
    statusEl.textContent = currentLang === "ar" ? "❌ خطأ أثناء الرفع" : "❌ Upload error";
    statusEl.style.color = "#ef4444";
  }
}

// -------------------------------------------------------------
// Cart Management
// -------------------------------------------------------------

function addItemToCart() {
  const matched = currentSelection.matchedItem;
  if (!matched) return;

  const embroidery = document.getElementById("customEmbroideryInput").value.trim();

  const cartItem = {
    code: matched.code,
    name_ar: matched.name_ar,
    name_en: matched.name_en,
    category: matched.category,
    gender: matched.gender,
    gender_ar: matched.gender_ar,
    thickness: matched.thickness,
    size: matched.size,
    price_sar: matched.price_sar,
    qty: currentSelection.qty,
    embroidery: embroidery,
    custom_logo: currentSelection.logoFilename || ""
  };

  const existingIdx = cart.findIndex(it => 
    it.code === cartItem.code && it.embroidery === cartItem.embroidery
  );

  if (existingIdx >= 0) {
    cart[existingIdx].qty += cartItem.qty;
  } else {
    cart.push(cartItem);
  }

  saveCartToStorage();
  updateCartBadge();

  const btn = document.getElementById("btnAddToCart");
  const originalHtml = btn.innerHTML;
  btn.innerHTML = `<span>${I18N[currentLang].addedSuccess}</span>`;
  btn.style.background = "#10b981";

  setTimeout(() => {
    btn.innerHTML = originalHtml;
    btn.style.background = "";
  }, 1200);
}

function updateCartBadge() {
  const totalCount = cart.reduce((sum, it) => sum + it.qty, 0);
  const subtotal = cart.reduce((sum, it) => sum + (it.price_sar * it.qty), 0);
  const sym = I18N[currentLang].currencySymbol;

  document.getElementById("cartBadge").textContent = totalCount;
  document.getElementById("cartHeaderTotal").textContent = `${subtotal.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${sym}`;
}

function saveCartToStorage() {
  localStorage.setItem("gulfray_cart", JSON.stringify(cart));
}

function loadCartFromStorage() {
  try {
    const saved = localStorage.getItem("gulfray_cart");
    if (saved) cart = JSON.parse(saved);
  } catch (e) {
    cart = [];
  }
  updateCartBadge();
}

function openCartModal() {
  renderCartModal();
  document.getElementById("cartModal").classList.add("active");
}

function closeCartModal() {
  document.getElementById("cartModal").classList.remove("active");
}

function renderCartModal() {
  const container = document.getElementById("cartItemsContainer");
  container.innerHTML = "";
  const sym = I18N[currentLang].currencySymbol;

  if (cart.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 40px 10px; color: var(--silver-text);">
        <div style="font-size: 40px; margin-bottom: 10px;">🛒</div>
        <b>${I18N[currentLang].cartEmptyMsg}</b>
      </div>
    `;
    document.getElementById("cartSubtotal").textContent = `0.00 ${sym}`;
    document.getElementById("cartVat").textContent = `0.00 ${sym}`;
    document.getElementById("cartGrandTotal").textContent = `0.00 ${sym}`;
    document.getElementById("btnSubmitOrder").disabled = true;
    return;
  }

  document.getElementById("btnSubmitOrder").disabled = false;

  let subtotal = 0;
  cart.forEach((it, idx) => {
    const itemTotal = it.price_sar * it.qty;
    subtotal += itemTotal;
    const title = currentLang === "ar" ? it.name_ar : (it.name_en || it.name_ar);

    const row = document.createElement("div");
    row.className = "cart-item-row";
    row.innerHTML = `
      <div class="cart-item-info">
        <b>${title}</b>
        <div class="cart-item-meta">
          ${currentLang === "ar" ? "الكود:" : "Code:"} <span style="font-family: monospace; font-weight: bold; color: var(--teal-primary);">${it.code}</span> | 
          ${currentLang === "ar" ? "الكمية:" : "Qty:"} <b>${it.qty}</b> | 
          ${it.price_sar.toLocaleString("en-US", { minimumFractionDigits: 2 })} ${sym}
        </div>
        ${it.embroidery ? `<div style="font-size: 12px; color: var(--teal-dark); margin-top: 3px;">🧵 ${it.embroidery}</div>` : ""}
      </div>
      <div style="display: flex; align-items: center; gap: 14px;">
        <span class="cart-item-price">${itemTotal.toLocaleString("en-US", { minimumFractionDigits: 2 })} ${sym}</span>
        <button class="btn-remove-item" onclick="removeCartItem(${idx})" title="Remove">🗑️</button>
      </div>
    `;
    container.appendChild(row);
  });

  const vat = subtotal * VAT_RATE;
  const grandTotal = subtotal + vat;

  document.getElementById("cartSubtotal").textContent = `${subtotal.toLocaleString("en-US", { minimumFractionDigits: 2 })} ${sym}`;
  document.getElementById("cartVat").textContent = `${vat.toLocaleString("en-US", { minimumFractionDigits: 2 })} ${sym}`;
  document.getElementById("cartGrandTotal").textContent = `${grandTotal.toLocaleString("en-US", { minimumFractionDigits: 2 })} ${sym}`;
}

function removeCartItem(idx) {
  cart.splice(idx, 1);
  saveCartToStorage();
  updateCartBadge();
  renderCartModal();
}

// -------------------------------------------------------------
// Final Order Submission
// -------------------------------------------------------------

async function submitFinalOrder(e) {
  e.preventDefault();

  if (cart.length === 0) {
    alert(I18N[currentLang].cartEmptyMsg);
    return;
  }

  const submitBtn = document.getElementById("btnSubmitOrder");
  const originalHtml = submitBtn.innerHTML;
  submitBtn.disabled = true;
  submitBtn.innerHTML = currentLang === "ar" ? "⏳ جارٍ إرسال وتوثيق الطلب..." : "⏳ Submitting official order...";

  const customerData = {
    name: document.getElementById("custName").value.trim(),
    organization: document.getElementById("custOrg").value.trim(),
    city: document.getElementById("custCity").value.trim(),
    phone: document.getElementById("custPhone").value.trim(),
    email: document.getElementById("custEmail").value.trim(),
    payment_method: document.getElementById("custPaymentMethod").value,
    notes: document.getElementById("custNotes").value.trim()
  };

  const payload = {
    customer: customerData,
    items: cart,
    logo_filename: currentSelection.logoFilename,
    honeypot: document.getElementById("custHoneypot") ? document.getElementById("custHoneypot").value : ""
  };

  try {
    const res = await fetch("/api/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.detail || "Order submission failed");
    }
    const result = await res.json();

    const successMsg = currentLang === "ar"
      ? `✓ تم اعتماد وتوثيق طلب الشراء بنجاح!\n\nرقم المرجع: ${result.order_id}\n${result.message}`
      : `✓ Purchase order successfully registered!\n\nReference Ref: ${result.order_id}\n${result.message}`;
    alert(successMsg);

    buildPrintableQuotation(result.order_id, customerData, cart, result.financials);

    cart = [];
    saveCartToStorage();
    updateCartBadge();
    closeCartModal();
  } catch (err) {
    alert((currentLang === "ar" ? "حدث خطأ: " : "Error: ") + err.message);
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalHtml;
  }
}

// -------------------------------------------------------------
// Printable Official Quotation Generator
// -------------------------------------------------------------

function triggerQuotationPrint() {
  if (cart.length === 0) {
    alert(I18N[currentLang].cartEmptyMsg);
    return;
  }

  const customerData = {
    name: document.getElementById("custName").value.trim() || (currentLang === "ar" ? "العميل المحترم" : "Valued Client"),
    organization: document.getElementById("custOrg").value.trim() || (currentLang === "ar" ? "المستشفى / الجهة الطالبة" : "Hospital / Healthcare Center"),
    city: document.getElementById("custCity").value.trim() || "-",
    phone: document.getElementById("custPhone").value.trim() || "-",
    email: document.getElementById("custEmail").value.trim() || "-",
    payment_method: document.getElementById("custPaymentMethod").value,
    notes: document.getElementById("custNotes").value.trim()
  };

  const subtotal = cart.reduce((sum, it) => sum + (it.price_sar * it.qty), 0);
  const vat = subtotal * VAT_RATE;
  const grandTotal = subtotal + vat;

  const quoteId = `GR-RFQ-${new Date().toISOString().slice(0,10).replace(/-/g,'')}-${Math.floor(1000 + Math.random() * 9000)}`;

  buildPrintableQuotation(quoteId, customerData, cart, {
    subtotal: subtotal,
    vat: vat,
    grand_total: grandTotal
  });

  window.print();
}

function buildPrintableQuotation(quoteId, customer, items, fin) {
  const printArea = document.getElementById("printArea");
  const today = new Date().toLocaleDateString(currentLang === "ar" ? "ar-SA" : "en-US", { year: "numeric", month: "long", day: "numeric" });
  const isAr = currentLang === "ar";
  const sym = isAr ? "ر.س" : "SAR";

  let itemsHtml = "";
  items.forEach((it, idx) => {
    const total = it.price_sar * it.qty;
    const title = isAr ? it.name_ar : (it.name_en || it.name_ar);
    itemsHtml += `
      <tr style="border-bottom: 1px solid #cbd5e1; font-size: 13px;">
        <td style="padding: 10px; text-align: center;">${idx + 1}</td>
        <td style="padding: 10px;">
          <b>${title}</b>
          <div style="font-size: 11px; color: #475569;">${isAr ? 'كود الصنف:' : 'Code:'} <span style="font-family: monospace; font-weight: bold;">${it.code}</span> | ${it.gender_ar} - ${it.size} - ${it.thickness}</div>
          ${it.embroidery ? `<div style="font-size: 11px; color: #0d9488;">${isAr ? 'التطريز:' : 'Embroidery:'} ${it.embroidery}</div>` : ""}
        </td>
        <td style="padding: 10px; text-align: center; font-weight: bold;">${it.qty}</td>
        <td style="padding: 10px; text-align: ${isAr ? 'right' : 'left'};">${it.price_sar.toLocaleString("en-US", { minimumFractionDigits: 2 })}</td>
        <td style="padding: 10px; text-align: ${isAr ? 'right' : 'left'}; font-weight: bold;">${total.toLocaleString("en-US", { minimumFractionDigits: 2 })}</td>
      </tr>
    `;
  });

  printArea.innerHTML = `
    <div style="max-width: 800px; margin: 0 auto; background: #fff; padding: 25px; border: 1.5px solid #0d9488; font-family: ${isAr ? "'Cairo', sans-serif" : "'Inter', sans-serif"}; direction: ${isAr ? 'rtl' : 'ltr'}; text-align: ${isAr ? 'right' : 'left'};">
      
      <!-- Quotation Header with Official Logo -->
      <table style="width: 100%; border-bottom: 3px solid #0f766e; padding-bottom: 15px; margin-bottom: 20px;">
        <tr>
          <td style="vertical-align: middle; width: 85px;">
            <img src="/images/gulfray_logo_transparent.png" alt="GulfRay Logo" style="height: 75px; width: auto;">
          </td>
          <td style="vertical-align: middle; padding-${isAr ? 'right' : 'left'}: 15px;">
            <div style="font-size: 22px; font-weight: 900; color: #042f2e;">${isAr ? 'GulfRay® | شركة سقالة حلول الوقاية' : 'GulfRay® | Siqalah Shielding Solutions'}</div>
            <div style="font-size: 12px; color: #0d9488; font-weight: 700;">${isAr ? 'مصنع لإنتاج Radiation Protection Aprons وحلول الوقاية من الأشعة' : 'Manufacturer of Radiation Protection Aprons & Radiation Shielding Solutions'}</div>
            <div style="font-size: 11px; color: #64748b; margin-top: 3px;">${isAr ? 'المملكة العربية السعودية • سجل تجاري معتمد • ترخيص هيئة الغذاء والدواء' : 'Kingdom of Saudi Arabia • SFDA Licensed • CE & ISO 13485 Certified'}</div>
          </td>
          <td style="text-align: ${isAr ? 'left' : 'right'}; vertical-align: middle;">
            <div style="border: 2px solid #0d9488; background: #f0fdfa; padding: 8px 16px; border-radius: 8px; display: inline-block; text-align: center;">
              <div style="font-size: 13px; font-weight: 800; color: #0f766e;">${isAr ? 'عرض سعر رسمي / RFQ' : 'Official RFQ Quotation'}</div>
              <div style="font-size: 12px; font-family: monospace; font-weight: bold; color: #042f2e; margin-top: 3px;">${quoteId}</div>
            </div>
          </td>
        </tr>
      </table>

      <!-- Meta info -->
      <table style="width: 100%; margin-bottom: 20px; font-size: 13px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 10px;">
        <tr>
          <td style="padding: 6px;"><b>${isAr ? 'تاريخ العرض:' : 'Date:'}</b> ${today}</td>
          <td style="padding: 6px;"><b>${isAr ? 'المستشفى / الجهة:' : 'Entity / Hospital:'}</b> <span style="font-weight: bold; color: #042f2e;">${customer.organization}</span></td>
        </tr>
        <tr>
          <td style="padding: 6px;"><b>${isAr ? 'اسم المسؤول:' : 'Contact Person:'}</b> ${customer.name}</td>
          <td style="padding: 6px;"><b>${isAr ? 'المدينة:' : 'City:'}</b> ${customer.city}</td>
        </tr>
        <tr>
          <td style="padding: 6px;"><b>${isAr ? 'رقم الجوال:' : 'Mobile:'}</b> <span dir="ltr">${customer.phone}</span></td>
          <td style="padding: 6px;"><b>${isAr ? 'طريقة السداد:' : 'Payment Method:'}</b> ${customer.payment_method}</td>
        </tr>
      </table>

      <!-- Line Items -->
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; border: 1px solid #cbd5e1;">
        <thead>
          <tr style="background-color: #042f2e; color: #fff; font-size: 13px;">
            <th style="padding: 8px; width: 30px; text-align: center;">#</th>
            <th style="padding: 8px; text-align: ${isAr ? 'right' : 'left'};">${isAr ? 'الصنف والمواصفات' : 'Product & Specs'}</th>
            <th style="padding: 8px; width: 60px; text-align: center;">${isAr ? 'الكمية' : 'Qty'}</th>
            <th style="padding: 8px; width: 110px; text-align: ${isAr ? 'right' : 'left'};">${isAr ? 'سعر الوحدة' : 'Unit Price'} (${sym})</th>
            <th style="padding: 8px; width: 120px; text-align: ${isAr ? 'right' : 'left'};">${isAr ? 'الإجمالي' : 'Total'} (${sym})</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHtml}
        </tbody>
      </table>

      <!-- Totals -->
      <table style="width: 50%; margin-${isAr ? 'right' : 'left'}: auto; margin-bottom: 25px; font-size: 13px; border-collapse: collapse;">
        <tr>
          <td style="padding: 6px 0; color: #475569;">${isAr ? 'المجموع الفرعي:' : 'Subtotal:'}</td>
          <td style="padding: 6px 0; text-align: ${isAr ? 'left' : 'right'}; font-weight: bold;">${fin.subtotal.toLocaleString("en-US", { minimumFractionDigits: 2 })} ${sym}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #475569;">${isAr ? 'ضريبة القيمة المضافة 15% (VAT):' : 'VAT (15%):'}</td>
          <td style="padding: 6px 0; text-align: ${isAr ? 'left' : 'right'}; font-weight: bold;">${fin.vat.toLocaleString("en-US", { minimumFractionDigits: 2 })} ${sym}</td>
        </tr>
        <tr style="border-top: 2px solid #0f766e;">
          <td style="padding: 8px 0; font-size: 15px; font-weight: 900; color: #042f2e;">${isAr ? 'الإجمالي النهائي شامل الضريبة:' : 'Grand Total (Incl. VAT):'}</td>
          <td style="padding: 8px 0; text-align: ${isAr ? 'left' : 'right'}; font-size: 17px; font-weight: 900; color: #0d9488;">${fin.grand_total.toLocaleString("en-US", { minimumFractionDigits: 2 })} ${sym}</td>
        </tr>
      </table>

      <!-- Official Terms & Stamps -->
      <div style="font-size: 11px; color: #64748b; line-height: 1.6; border-top: 1px solid #cbd5e1; padding-top: 12px; margin-bottom: 30px;">
        • ${isAr ? 'الأسعار سارية المفعول لمدة 30 يوماً من تاريخ إصدار هذا العرض.' : 'Quotation valid for 30 days from date of issue.'}<br>
        • ${isAr ? 'مآزر GulfRay مطابقة للمواصفات العالمية للحماية الإشعاعية (CE & ISO 13485 Compliant).' : 'GulfRay aprons comply with global radiation safety standards (CE & ISO 13485).'}<br>
        • ${isAr ? 'الضمان: ضمان تصنيعي شامل لمدة سنتين من تاريخ التوريد.' : 'Warranty: 2 years comprehensive manufacturer warranty.'}
      </div>

      <table style="width: 100%; text-align: center; font-size: 13px;">
        <tr>
          <td style="width: 50%;">
            <b>${isAr ? 'شركة سقالة حلول الوقاية - GulfRay' : 'GulfRay - Siqalah Shielding Solutions'}</b><br><br>
            <div style="border-bottom: 1px dashed #94a3b8; width: 160px; margin: 0 auto; height: 35px;"></div>
            <small style="color: #64748b;">${isAr ? 'الختم والتوقيع المعتمد' : 'Authorized Signature & Stamp'}</small>
          </td>
          <td style="width: 50%;">
            <b>${isAr ? 'اعتماد المستشفى / العميل' : 'Client / Hospital Acceptance'}</b><br><br>
            <div style="border-bottom: 1px dashed #94a3b8; width: 160px; margin: 0 auto; height: 35px;"></div>
            <small style="color: #64748b;">${isAr ? 'توقيع واستلام أمر الشراء' : 'Purchase Order Signature'}</small>
          </td>
        </tr>
      </table>

    </div>
  `;
}

// -------------------------------------------------------------
// Catalog Explorer Table View
// -------------------------------------------------------------

function switchView(mode) {
  const viewConfig = document.getElementById("viewConfig");
  const viewCatalog = document.getElementById("viewCatalog");
  const tabConfig = document.getElementById("tabBtnConfig");
  const tabCatalog = document.getElementById("tabBtnCatalog");

  if (mode === "config") {
    viewConfig.style.display = "grid";
    viewCatalog.style.display = "none";
    tabConfig.classList.add("active");
    tabCatalog.classList.remove("active");
  } else {
    viewConfig.style.display = "none";
    viewCatalog.style.display = "block";
    tabConfig.classList.remove("active");
    tabCatalog.classList.add("active");
    renderCatalogTable();
  }
}

function populateCatalogTableFilter() {
  const select = document.getElementById("catalogCategoryFilter");
  select.innerHTML = `<option value="">${I18N[currentLang].optAllCategories}</option>`;
  catalogData.categories.forEach(cat => {
    const opt = document.createElement("option");
    opt.value = cat;
    opt.textContent = `${currentLang === 'ar' ? (catalogData.tree[cat].category_ar || cat) : cat} (${cat})`;
    select.appendChild(opt);
  });
}

function filterCatalogTable() {
  renderCatalogTable();
}

function renderCatalogTable() {
  if (!catalogData) return;
  const tbody = document.getElementById("catalogTableBody");
  tbody.innerHTML = "";

  const search = document.getElementById("catalogSearchInput").value.toLowerCase().trim();
  const selectedCat = document.getElementById("catalogCategoryFilter").value;

  let items = catalogData.items;

  if (selectedCat) {
    items = items.filter(it => it.category === selectedCat);
  }

  if (search) {
    items = items.filter(it => 
      it.code.toLowerCase().includes(search) ||
      it.name_ar.toLowerCase().includes(search) ||
      it.name_en.toLowerCase().includes(search) ||
      it.category.toLowerCase().includes(search) ||
      it.size.toLowerCase().includes(search)
    );
  }

  if (items.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; padding: 25px; color: var(--silver-text);">${currentLang === 'ar' ? 'لا توجد أصناف مطابقة للبحث.' : 'No items match your search.'}</td></tr>`;
    return;
  }

  items.forEach(it => {
    const tr = document.createElement("tr");
    tr.style.borderBottom = "1px solid var(--silver-border)";
    const catName = currentLang === "ar" ? it.category_ar : it.category;
    const genderName = currentLang === "ar" ? it.gender_ar : it.gender;
    const isAr = currentLang === "ar";
    
    tr.innerHTML = `
      <td style="padding: 10px; font-family: monospace; font-weight: bold; color: var(--teal-primary);">${it.code}</td>
      <td style="padding: 10px;">${catName}</td>
      <td style="padding: 10px;">${genderName}</td>
      <td style="padding: 10px; font-family: monospace;">${it.size}</td>
      <td style="padding: 10px;">${it.thickness}</td>
      <td style="padding: 10px; text-align: ${isAr ? 'left' : 'right'}; font-weight: bold;">${it.price_sar.toLocaleString("en-US", { minimumFractionDigits: 2 })}</td>
      <td style="padding: 10px; text-align: center;">
        <button onclick="addCatalogItemDirectly('${it.code}')" style="background: var(--teal-deep); color: #fff; border: none; padding: 6px 12px; border-radius: 6px; font-size: 12px; font-weight: bold; cursor: pointer;">
          + ${currentLang === 'ar' ? 'إضافة' : 'Add'}
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function addCatalogItemDirectly(code) {
  const item = catalogData.items.find(it => it.code === code);
  if (!item) return;

  const cartItem = {
    code: item.code,
    name_ar: item.name_ar,
    name_en: item.name_en,
    category: item.category,
    gender: item.gender,
    gender_ar: item.gender_ar,
    thickness: item.thickness,
    size: item.size,
    price_sar: item.price_sar,
    qty: 1,
    embroidery: "",
    custom_logo: ""
  };

  const existingIdx = cart.findIndex(it => it.code === cartItem.code && !it.embroidery);
  if (existingIdx >= 0) {
    cart[existingIdx].qty += 1;
  } else {
    cart.push(cartItem);
  }

  saveCartToStorage();
  updateCartBadge();
  const title = currentLang === "ar" ? item.name_ar : (item.name_en || item.name_ar);
  alert(`${I18N[currentLang].addedSuccess}\n(${title})`);
}

// -------------------------------------------------------------
// Admin Dashboard (Price List & Dynamic Email Management)
// -------------------------------------------------------------
let currentAdminPin = "";
let adminSettingsCache = null;

function openAdminModal() {
  currentAdminPin = "";
  document.getElementById("adminPinInput").value = "";
  document.getElementById("adminPinError").style.display = "none";
  document.getElementById("adminPinStage").style.display = "block";
  document.getElementById("adminPanelStage").style.display = "none";
  document.getElementById("adminUpdateMessage").style.display = "none";
  document.getElementById("adminModal").classList.add("active");
}

function closeAdminModal() {
  document.getElementById("adminModal").classList.remove("active");
}

async function verifyAdminPin() {
  const pinInput = document.getElementById("adminPinInput");
  const pin = pinInput.value.trim();
  const errEl = document.getElementById("adminPinError");

  if (!pin) {
    errEl.textContent = currentLang === "ar" ? "يرجى كتابة الرمز السري." : "Please enter PIN.";
    errEl.style.display = "block";
    return;
  }

  try {
    const res = await fetch("/api/admin/get-settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pin: pin })
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.detail || "Invalid PIN");
    }

    currentAdminPin = pin;
    adminSettingsCache = data;

    // Populate UI
    const emails = data.notification_emails || [];
    document.getElementById("adminEmailsTextarea").value = emails.join("\n");

    const smtp = data.smtp || {};
    document.getElementById("smtpEnabledCheck").checked = smtp.enabled || false;
    document.getElementById("smtpHostInput").value = smtp.host || "smtp.office365.com";
    document.getElementById("smtpUserInput").value = smtp.user || "";
    document.getElementById("smtpPassInput").value = "";

    // Show Panel Stage
    document.getElementById("adminPinStage").style.display = "none";
    document.getElementById("adminPanelStage").style.display = "block";
    switchAdminTab("emails");
  } catch (err) {
    errEl.textContent = err.message;
    errEl.style.display = "block";
  }
}

function switchAdminTab(tab) {
  const tabs = ["emails", "price", "smtp"];
  tabs.forEach(t => {
    const btn = document.getElementById(`adminTabBtn${t.charAt(0).toUpperCase() + t.slice(1)}`);
    const content = document.getElementById(`adminTab${t.charAt(0).toUpperCase() + t.slice(1)}`);
    if (btn) btn.classList.toggle("active", t === tab);
    if (content) content.style.display = t === tab ? "block" : "none";
  });
  document.getElementById("adminUpdateMessage").style.display = "none";
}

async function saveAdminEmails() {
  const text = document.getElementById("adminEmailsTextarea").value;
  const emails = text.split("\n").map(e => e.trim()).filter(e => e && e.includes("@"));
  const msgEl = document.getElementById("adminUpdateMessage");

  if (emails.length === 0) {
    alert(currentLang === "ar" ? "يرجى كتابة إيميل واحد صالح على الأقل." : "Please enter at least one valid email.");
    return;
  }

  try {
    const res = await fetch("/api/admin/save-settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        pin: currentAdminPin,
        notification_emails: emails,
        smtp_enabled: document.getElementById("smtpEnabledCheck").checked,
        smtp_host: document.getElementById("smtpHostInput").value.trim(),
        smtp_user: document.getElementById("smtpUserInput").value.trim()
      })
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.detail || "Failed to save");

    msgEl.style.background = "#dcfce7";
    msgEl.style.color = "#15803d";
    msgEl.innerHTML = `✓ ${data.message}`;
    msgEl.style.display = "block";
  } catch (err) {
    msgEl.style.background = "#fee2e2";
    msgEl.style.color = "#b91c1c";
    msgEl.innerHTML = `❌ ${err.message}`;
    msgEl.style.display = "block";
  }
}

async function saveSmtpSettings() {
  const text = document.getElementById("adminEmailsTextarea").value;
  const emails = text.split("\n").map(e => e.trim()).filter(e => e && e.includes("@"));
  const msgEl = document.getElementById("adminUpdateMessage");

  const payload = {
    pin: currentAdminPin,
    notification_emails: emails,
    smtp_enabled: document.getElementById("smtpEnabledCheck").checked,
    smtp_host: document.getElementById("smtpHostInput").value.trim(),
    smtp_user: document.getElementById("smtpUserInput").value.trim(),
    smtp_password: document.getElementById("smtpPassInput").value
  };

  try {
    const res = await fetch("/api/admin/save-settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.detail || "Failed to save");

    msgEl.style.background = "#dcfce7";
    msgEl.style.color = "#15803d";
    msgEl.innerHTML = `✓ تم حفظ إعدادات البريد بنجاح!`;
    msgEl.style.display = "block";
  } catch (err) {
    msgEl.style.background = "#fee2e2";
    msgEl.style.color = "#b91c1c";
    msgEl.innerHTML = `❌ ${err.message}`;
    msgEl.style.display = "block";
  }
}

async function testSmtpConnection() {
  const msgEl = document.getElementById("adminUpdateMessage");
  msgEl.style.background = "#e0f2fe";
  msgEl.style.color = "#0369a1";
  msgEl.innerHTML = "⏳ جارٍ إرسال رسالة اختبارية إلى كافة الإيميلات المسجلة...";
  msgEl.style.display = "block";

  try {
    const res = await fetch("/api/admin/send-test-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pin: currentAdminPin })
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.message || data.detail || "فشل الاتصال");
    }

    msgEl.style.background = "#dcfce7";
    msgEl.style.color = "#15803d";
    msgEl.innerHTML = `✓ ${data.message}`;
  } catch (err) {
    msgEl.style.background = "#fee2e2";
    msgEl.style.color = "#b91c1c";
    msgEl.innerHTML = `❌ ${err.message}`;
  }
}

async function submitPriceListUpdate(e) {
  e.preventDefault();
  const fileInput = document.getElementById("adminExcelFileInput");
  const msgEl = document.getElementById("adminUpdateMessage");
  const submitBtn = document.getElementById("btnAdminUploadSubmit");

  if (!fileInput.files || fileInput.files.length === 0) {
    alert(currentLang === "ar" ? "يرجى اختيار ملف الإكسل" : "Please select an Excel file");
    return;
  }

  const formData = new FormData();
  formData.append("pin", currentAdminPin);
  formData.append("file", fileInput.files[0]);

  submitBtn.disabled = true;
  submitBtn.textContent = currentLang === "ar" ? "⏳ جارٍ الفحص والتحديث محلياً..." : "⏳ Verifying and updating locally...";
  msgEl.style.display = "none";

  try {
    const res = await fetch("/api/admin/upload-pricelist", {
      method: "POST",
      body: formData
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.detail || "Update failed");
    }

    msgEl.style.background = "#dcfce7";
    msgEl.style.color = "#15803d";
    msgEl.innerHTML = `✓ ${data.message}`;
    msgEl.style.display = "block";

    await loadCatalog();
  } catch (err) {
    msgEl.style.background = "#fee2e2";
    msgEl.style.color = "#b91c1c";
    msgEl.innerHTML = `❌ ${err.message}`;
    msgEl.style.display = "block";
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = I18N[currentLang].txtAdminUploadBtn;
  }
}
