// ==========================================================================
// GulfRay® Medical - Radiation Protection Aprons & Shielding
// Interactive RFQ & Material Guide Engine (BurMed + Saudi Sadu Heritage)
// ==========================================================================

let currentLang = "en"; // "en" (default) or "ar"
let rfqBasket = [];
let uploadedLogoFilename = null;

// Pre-baked Full Catalog (0ms offline load, zero prices)
const CATALOG_DATA = {
  categories: [
    {
      id: "Full Overlap",
      name_en: "Full Overlap (Vest & Skirt)",
      name_ar: "مريول تراكب كامل (سترة وتنورة)",
      code: "VSF-0.5",
      format_en: "Vest + Skirt",
      format_ar: "طقم سترة وتنورة",
      desc_en: "Overlapping front & back 360° protection. Weight distributed evenly across shoulders and hips.",
      desc_ar: "حماية شاملة 360 درجة مع توزيع الوزن هندسياً بين الكتفين والخصر لتخفيف الإجهاد.",
      image: "/images/saudi_green_apron.jpg",
      lead_options: ["0.50 mm Pb"],
      genders: ["Male", "Female"],
      sizes: ["XS", "S", "M", "L", "XL", "XXL", "Custom"]
    },
    {
      id: "Reverse",
      name_en: "Reverse Apron (Vest & Skirt)",
      name_ar: "مريول حماية معكوس (سترة وتنورة)",
      code: "VSR-0.5",
      format_en: "Vest + Skirt",
      format_ar: "طقم سترة وتنورة",
      desc_en: "Reverse closure allowing superior flexibility and lumbar support in interventional suites.",
      desc_ar: "إغلاق معكوس يمنح مرونة حركة استثنائية مع دعامة أسفل الظهر للأشعة التداخلية.",
      image: "/images/vest_skirt_style.jpg",
      lead_options: ["0.50 mm Pb"],
      genders: ["Male", "Female"],
      sizes: ["XS", "S", "M", "L", "XL", "XXL", "Custom"]
    },
    {
      id: "Zipper",
      name_en: "Zipper Front (Vest & Skirt)",
      name_ar: "مريول سحاب أمامي (سترة وتنورة)",
      code: "VSZ-0.5",
      format_en: "Vest + Skirt",
      format_ar: "طقم سترة وتنورة",
      desc_en: "Heavy-duty zipper front closure for swift donning, coupled with complete internal overlap shielding.",
      desc_ar: "سحاب أمامي متين لسرعة وسهولة الارتداء والخلع مع تراكب واقٍ كامل بالداخل.",
      image: "/images/clinical_procedure.jpg",
      lead_options: ["0.50 mm Pb"],
      genders: ["Male", "Female"],
      sizes: ["XS", "S", "M", "L", "XL", "XXL", "Custom"]
    },
    {
      id: "Full Wraparound Overlap",
      name_en: "Full Wraparound Overlap (One-Piece)",
      name_ar: "مريول حماية شاملة تراكبية (قطعة واحدة)",
      code: "FWF-0.5",
      format_en: "Full Apron",
      format_ar: "مريول كامل متصل",
      desc_en: "Single-piece full wrap garment designed for maximum 360° protection with padded Velcro fastening.",
      desc_ar: "مريول كامل متصل قطعة واحدة يوفر حماية محيطية كاملة مع حزام تثبيت عريض مبطن.",
      image: "/images/full_wrap_style.jpg",
      lead_options: ["0.50 mm Pb"],
      genders: ["Male", "Female"],
      sizes: ["XS", "S", "M", "L", "XL", "XXL", "Custom"]
    },
    {
      id: "Full Wraparound Release",
      name_en: "Full Wraparound Quick Release",
      name_ar: "مريول حماية شاملة فك سريع",
      code: "FWR-0.5",
      format_en: "Full Apron",
      format_ar: "مريول كامل متصل",
      desc_en: "Quick-release mechanisms allowing sterile OR team removal without breaking surgical scrub.",
      desc_ar: "أنظمة فك سريعة تتيح نزع المريول في غرف العمليات دون المساس بالتعقيم الجراحي.",
      image: "/images/full_apron_format.jpg",
      lead_options: ["0.50 mm Pb"],
      genders: ["Male", "Female"],
      sizes: ["XS", "S", "M", "L", "XL", "XXL", "Custom"]
    },
    {
      id: "Frontal Surgery",
      name_en: "Frontal Surgery Drop-Off Apron",
      name_ar: "مريول جراحي أمامي سهل الإسقاط",
      code: "FSD-0.5",
      format_en: "Frontal Apron",
      format_ar: "مريول أمامي جراحي",
      desc_en: "Sterile-field drop design allowing surgeons to drop the apron from underneath sterile gowns.",
      desc_ar: "تصميم جراحي متطور يسمح للجراح بإسقاط ونزع المريول من تحت الرداء الجراحي المعقم.",
      image: "/images/in_use_surgical.jpg",
      lead_options: ["0.35 mm Pb", "0.50 mm Pb"],
      genders: ["Male", "Female"],
      sizes: ["XS", "S", "M", "L", "XL", "XXL", "Custom"]
    },
    {
      id: "Frontal",
      name_en: "Classic Frontal Protection Vest",
      name_ar: "مريول حماية أمامي كلاسيكي",
      code: "FVP-0.5",
      format_en: "Frontal Apron",
      format_ar: "مريول أمامي خفيف",
      desc_en: "Lightweight frontal radiation apron with cross-back straps for open ventilation.",
      desc_ar: "مريول أمامي خفيف الوزن مع أحزمة ظهر متقاطعة توفر أقصى تهوية وراحة أثناء الفحص.",
      image: "/images/in_use_doctor.jpg",
      lead_options: ["0.35 mm Pb", "0.50 mm Pb"],
      genders: ["Male", "Female"],
      sizes: ["XS", "S", "M", "L", "XL", "XXL", "Custom"]
    },
    {
      id: "Dental Apron",
      name_en: "Panoramic & Dental Shielding Apron",
      name_ar: "مريول أشعة الأسنان والبانوراما",
      code: "DRA",
      format_en: "Dental Shield",
      format_ar: "واقي مراكز الأسنان",
      desc_en: "Patient protective aprons for dental radiography and panoramic imaging with thyroid collars.",
      desc_ar: "مريول واقٍ للمرضى في عيادات الأسنان ومراكز البانوراما مع واقي غدة درقية متكامل.",
      image: "/images/hero_medical.jpg",
      lead_options: ["0.35 mm Pb"],
      genders: ["Unisex"],
      sizes: ["Adult (One Size)", "Pediatric (Children)"]
    },
    {
      id: "Accessories",
      name_en: "Shielding Accessories (Thyroid, Sleeves, Belts)",
      name_ar: "إكسسوارات الوقاية (واقي الغدة، الأكمام، الأحزمة)",
      code: "TCV",
      format_en: "Accessories",
      format_ar: "إكسسوارات وملحقات",
      desc_en: "Magnetic & Velcro thyroid collars, protective sleeves, and ergonomic lumbar support belts.",
      desc_ar: "واقيات الغدة الدرقية مغناطيسية وفيلكرو، أكمام الوقاية للذراعين، وأحزمة دعم الظهر.",
      image: "/images/patterns_sadu.jpg",
      lead_options: ["0.50 mm Pb"],
      genders: ["Unisex"],
      sizes: ["S", "M", "L", "One Size"]
    }
  ],

  core_materials: [
    {
      id: "UM",
      name_en: "UM (Ultra-Lightest)",
      name_ar: "ألترا لايت (UM - الأخف وزناً)",
      density: "2.60 kg/m²",
      thickness: "0.66 mm",
      badge_en: "28% Lighter than Lead",
      badge_ar: "أخف بنسبة 28%",
      standard: "ASTM F2547-18"
    },
    {
      id: "NPL",
      name_en: "NPL (Broad-Beam UK Verified)",
      name_ar: "إن بي إل (NPL - معتمد بريطانياً)",
      density: "2.83 kg/m²",
      thickness: "0.71 mm",
      badge_en: "Broad-Beam Tested",
      badge_ar: "معتمد بالحزمة العريضة",
      standard: "BS EN 61331-1:2014"
    },
    {
      id: "ML",
      name_en: "ML (Most Economical Lead-Free)",
      name_ar: "إم إل (ML - اقتصادي خالٍ من الرصاص)",
      density: "3.60 kg/m²",
      thickness: "0.96 mm",
      badge_en: "Best Value for Tenders",
      badge_ar: "الأعلى قيمة للمستشفيات",
      standard: "GBZ/T 147-2020"
    }
  ],

  collections: [
    {
      id: "saudi_green",
      category: "saudi",
      name_en: "Saudi Green (إصدار المملكة - أخضر)",
      name_ar: "الأخضر السعودي (إصدارات المملكة)",
      hex: "#006C35",
      image: "/images/saudi_green_apron.jpg",
      tag_en: "Collection 02 · Saudi Editions",
      tag_ar: "المجموعة الثانية · إصدارات المملكة",
      desc_en: "Deep official Saudi Green paired with warm ivory and restrained gold trim.",
      desc_ar: "الأخضر السعودي الرسمي موشح بلمسات العاج والذهب الهادئ."
    },
    {
      id: "saudi_lavender",
      category: "saudi",
      name_en: "Saudi Lavender (إصدار المملكة - لافندر)",
      name_ar: "اللافندر السعودي (إصدارات المملكة)",
      hex: "#684F8C",
      image: "/images/saudi_lavender_apron.jpg",
      tag_en: "Collection 02 · Saudi Editions",
      tag_ar: "المجموعة الثانية · إصدارات المملكة",
      desc_en: "Contemporary Saudi lavender, expressing modern cultural elegance in surgical suites.",
      desc_ar: "لون اللافندر السعودي المعاصر، يعكس روح التجدد والأناقة في غرف العمليات."
    },
    {
      id: "sadu_trim",
      category: "sadu",
      name_en: "Sadu Heritage Trim (تطريز السدو التراثي)",
      name_ar: "تطريز السدو التراثي السعودي",
      hex: "#8B263E",
      image: "/images/patterns_sadu.jpg",
      tag_en: "Collection 04 · Patterns",
      tag_ar: "المجموعة الرابعة · تطريز السدو",
      desc_en: "Intricate geometric Saudi Sadu motifs woven into high-performance medical fabric.",
      desc_ar: "نقوش وزخارف السدو الهندسية محاكة بدقة متناهية على الرداء الطبي."
    },
    {
      id: "royal_navy",
      category: "classics",
      name_en: "Royal Navy Blue (أزرق ملكي كحلي)",
      name_ar: "أزرق ملكي كحلي",
      hex: "#1B2A4A",
      image: "/images/vest_skirt_format.jpg",
      tag_en: "Collection 01 · Signature",
      tag_ar: "المجموعة الأولى · كلاسيكيات الخليج",
      desc_en: "Executive clinical navy blue for premier cardiology and radiology suites.",
      desc_ar: "الكحلي الملكي المعتمد في أرقى مراكز قسطرة القلب ومستشفيات المملكة."
    },
    {
      id: "surgical_teal",
      category: "classics",
      name_en: "Medical Surgical Teal (تيل جراحي)",
      name_ar: "تيل جراحي معتمد",
      hex: "#0D9488",
      image: "/images/full_wrap_style.jpg",
      tag_en: "Collection 01 · Signature",
      tag_ar: "المجموعة الأولى · كلاسيكيات الخليج",
      desc_en: "Classic surgical operating room teal with antimicrobial dirt-repellent finish.",
      desc_ar: "اللون الجراحي الكلاسيكي لغرف العمليات مع معالجة مقاومة للسوائل والبكتيريا."
    },
    {
      id: "charcoal_slate",
      category: "classics",
      name_en: "Charcoal Slate (رمادي حجري)",
      name_ar: "رمادي حجري فاخر",
      hex: "#374151",
      image: "/images/full_apron_format.jpg",
      tag_en: "Collection 01 · Signature",
      tag_ar: "المجموعة الأولى · كلاسيكيات الخليج",
      desc_en: "Modern neutral charcoal slate offering restrained clinical authority.",
      desc_ar: "رمادي حجري حديث يوفر مظهراً تقنياً وقوراً ومقاوماً للاتساخ."
    }
  ]
};

// ==========================================================================
// 2027 Outer Fabric & Colour Reference Dataset (Official Catalogue Spec)
// ==========================================================================
const FABRIC_REFERENCE = {
  solid_colors: [
    { code: 'F-01', hex: '#1D253A', name_en: 'Navy', name_ar: 'كحلي · أزرق ليلي عميق', rgb: '29 37 58', cmyk: '50 36 0 77', used_in: 'GR-01, GR-02, MM-01, TU-01, SC-03, SC-05V/S, SC-09, SC-12V/S' },
    { code: 'F-02', hex: '#1B6F80', name_en: 'Signature Teal', name_ar: 'تركوازي جلف راي · لون الهوية', rgb: '27 111 128', cmyk: '79 13 0 50', used_in: 'GR-01, GR-02, TU-03' },
    { code: 'F-03', hex: '#173832', name_en: 'Deep Teal Green', name_ar: 'أخضر بترولي داكن', rgb: '23 56 50', cmyk: '59 0 11 78', used_in: 'BS-01, SC-01, SC-04V/S, SC-07, SC-10V/S' },
    { code: 'F-04', hex: '#234A3C', name_en: 'Emerald Green', name_ar: 'أخضر زمردي · أخضر غني', rgb: '35 74 60', cmyk: '53 0 19 71', used_in: 'GR-05, GR-08, GR-10, GR-11' },
    { code: 'F-05', hex: '#9AA08E', name_en: 'Sage', name_ar: 'أخضر مريمية · أخضر رمادي هادئ', rgb: '154 160 142', cmyk: '4 0 11 37', used_in: 'BS-03, MM-03' },
    { code: 'F-06', hex: '#657E82', name_en: 'Slate Teal', name_ar: 'رمادي بترولي · أزرق رمادي مطفأ', rgb: '101 126 130', cmyk: '22 3 0 49', used_in: 'SS-03' },
    { code: 'F-07', hex: '#5A6D8E', name_en: 'Slate Blue', name_ar: 'أزرق أردوازي · أزرق رمادي متوسط', rgb: '90 109 142', cmyk: '37 23 0 44', used_in: 'SC-03' },
    { code: 'F-08', hex: '#1F4E9E', name_en: 'Cobalt Blue', name_ar: 'أزرق كوبالتي · أزرق ملكي ساطع', rgb: '31 78 158', cmyk: '80 51 0 38', used_in: 'GR-04' },
    { code: 'F-09', hex: '#A887AD', name_en: 'Lavender', name_ar: 'خزامى · بنفسجي فاتح ناعم', rgb: '168 135 173', cmyk: '3 22 0 32', used_in: 'GR-06, BS-02, MM-03, SC-02, SC-06V/S' },
    { code: 'F-10', hex: '#573649', name_en: 'Aubergine', name_ar: 'باذنجاني · بنفسجي داكن عميق', rgb: '87 54 73', cmyk: '0 38 16 66', used_in: 'GR-06, BS-02' },
    { code: 'F-11', hex: '#5A2332', name_en: 'Burgundy', name_ar: 'عنابي · أحمر نبيذي داكن', rgb: '90 35 50', cmyk: '0 61 44 65', used_in: 'GR-03, GR-07, SC-02, SC-06V/S' },
    { code: 'F-12', hex: '#9A1A22', name_en: 'Gulf Red', name_ar: 'أحمر خليجي · أحمر قرمزي قوي', rgb: '154 26 34', cmyk: '0 83 78 40', used_in: 'GR-08, GR-09, GR-10, GR-11' },
    { code: 'F-13', hex: '#E26C5F', name_en: 'Coral', name_ar: 'مرجاني · برتقالي وردي دافئ', rgb: '226 108 95', cmyk: '0 52 58 11', used_in: 'GR-01, GR-03, SS-02, SC-05V/S' },
    { code: 'F-14', hex: '#B56F74', name_en: 'Dusty Rose', name_ar: 'وردي ترابي · وردي مطفأ', rgb: '181 111 116', cmyk: '0 39 36 29', used_in: 'MM-02, SC-08, SC-11V/S' },
    { code: 'F-15', hex: '#C3938F', name_en: 'Blush Pink', name_ar: 'وردي فاتح · وردي باهت ناعم', rgb: '195 147 143', cmyk: '0 25 27 24', used_in: 'GR-07' },
    { code: 'F-16', hex: '#D58F39', name_en: 'Ochre', name_ar: 'مغرة · أصفر ذهبي ترابي', rgb: '213 143 57', cmyk: '0 33 73 16', used_in: 'SS-01' },
    { code: 'F-17', hex: '#F5BA4F', name_en: 'Sunflower Yellow', name_ar: 'أصفر عبّاد الشمس', rgb: '245 186 79', cmyk: '0 24 68 4', used_in: 'GR-04' },
    { code: 'F-18', hex: '#412821', name_en: 'Chocolate Brown', name_ar: 'بني شوكولاتة · بني داكن', rgb: '65 40 33', cmyk: '0 38 49 75', used_in: 'SS-01' },
    { code: 'F-19', hex: '#D3B599', name_en: 'Sand', name_ar: 'رملي · بيج صحراوي دافئ', rgb: '211 181 153', cmyk: '0 14 27 17', used_in: 'GR-01, GR-02' },
    { code: 'F-20', hex: '#B8A391', name_en: 'Taupe Stone', name_ar: 'بيج حجري · رملي محايد', rgb: '184 163 145', cmyk: '0 11 21 28', used_in: 'SS-03, SC-04V/S' },
    { code: 'F-21', hex: '#C5BBB2', name_en: 'Stone Grey', name_ar: 'رمادي حجري · رمادي دافئ', rgb: '197 187 178', cmyk: '0 5 10 23', used_in: 'GR-04' },
    { code: 'F-22', hex: '#B5B3B0', name_en: 'Pearl Grey', name_ar: 'رمادي لؤلؤي · رمادي فاتح بارد', rgb: '181 179 176', cmyk: '0 1 3 29', used_in: 'GR-09' },
    { code: 'F-23', hex: '#E7D8C9', name_en: 'Ivory', name_ar: 'عاجي · أبيض كريمي ناعم', rgb: '231 216 201', cmyk: '0 6 13 9', used_in: 'GR-05, GR-06, GR-07, GR-08, GR-10, GR-11, BS-03' },
    { code: 'F-24', hex: '#3A393C', name_en: 'Charcoal', name_ar: 'رمادي فحمي · رمادي داكن', rgb: '58 57 60', cmyk: '3 5 0 76', used_in: 'GR-03, MM-02, TU-02' },
    { code: 'F-25', hex: '#1F1E1B', name_en: 'Black', name_ar: 'أسود · أسود كلاسيكي', rgb: '31 30 27', cmyk: '0 3 13 88', used_in: 'GR-08, GR-10, TU-03' }
  ],
  printed_fabrics: [
    { code: 'P08', name_en: 'Sunflower', name_ar: 'عبّاد الشمس', desc_en: 'Sunflower blossoms on cream base', desc_ar: 'زهور عبّاد الشمس على أرضية كريمية', image: '/images/fabrics/P08_sunflower.jpg', used_in: 'SS-01' },
    { code: 'P17', name_en: 'Eucalyptus', name_ar: 'أوراق الكينا', desc_en: 'Green branches on crisp white base', desc_ar: 'أغصان خضراء على أرضية بيضاء', image: '/images/fabrics/P17_eucalyptus.jpg', used_in: 'BS-01, SC-07, SC-10V/S' },
    { code: 'P18', name_en: 'Spring Flora', name_ar: 'زهور الربيع', desc_en: 'Pink & blue delicate watercolour flowers', desc_ar: 'زهور مائية وردية وزرقاء رقيقة', image: '/images/fabrics/P18_spring_flora.jpg', used_in: 'SS-02, SC-11V/S' },
    { code: 'P19', name_en: 'Abstract Botanical', name_ar: 'نباتات تجريدية', desc_en: 'Warm tonal botanical brushstrokes', desc_ar: 'ضربات فرشاة نباتية بدرجات دافئة', image: '/images/fabrics/P19_abstract_botanical.jpg', used_in: 'SS-03' },
    { code: 'P20', name_en: 'Watercolour Wave', name_ar: 'أمواج مائية', desc_en: 'Gentle undulating watercolour waves', desc_ar: 'خطوط متموجة انسيابية بألوان مائية', image: '/images/fabrics/P20_watercolour_wave.jpg', used_in: 'MM-03' },
    { code: 'P21', name_en: 'Lavender Sketch', name_ar: 'رسم الخزامى', desc_en: 'Hand-sketched purple lavender botanicals', desc_ar: 'زهور بنفسجية مرسومة باليد', image: '/images/fabrics/P21_lavender_sketch.jpg', used_in: 'BS-02' },
    { code: 'P22', name_en: 'Micro Floral', name_ar: 'زهور دقيقة', desc_en: 'Subtle miniature floral print on light ground', desc_ar: 'زهور صغيرة ناعمة على أرضية فاتحة', image: '/images/fabrics/P22_micro_floral.jpg', used_in: 'BS-03' },
    { code: 'P23', name_en: 'Geometric Lattice', name_ar: 'شبكة هندسية', desc_en: 'Refined repeated pink lattice geometric motif', desc_ar: 'نقش هندسي متكرر بلون وردي', image: '/images/fabrics/P23_geometric_lattice.jpg', used_in: 'MM-02, SC-08' },
    { code: 'P40', name_en: 'Blue Camo', name_ar: 'تمويه أزرق', desc_en: 'Contemporary multi-tonal navy tactical camo', desc_ar: 'تمويه تكتيكي بدرجات الكحلي والأزرق', image: '/images/fabrics/P40_blue_camo.jpg', used_in: 'TU-01' },
    { code: 'P41', name_en: 'Grey Digital Camo', name_ar: 'تمويه رقمي رمادي', desc_en: 'Modern geometric grey & black digital pixel camo', desc_ar: 'مربعات تمويه رقمي بالرمادي والأسود', image: '/images/fabrics/P41_grey_digital_camo.jpg', used_in: 'TU-02' },
    { code: 'P68', name_en: 'Teal Abstract', name_ar: 'تجريدي بترولي', desc_en: 'High-contrast teal & black abstract shapes', desc_ar: 'أشكال تجريدية بالتركوازي والأسود', image: '/images/fabrics/P68_teal_abstract.jpg', used_in: 'MM-01, TU-03, SC-09, SC-12V/S' }
  ],
  trims: [
    { code: 'T-01', hex: '#1F1E1B', name_en: 'Black binding tape', name_ar: 'شريط حواف أسود', type_en: 'Edge binding', type_ar: 'تحديد الحواف', used_in: 'All garments except GR-07, GR-09' },
    { code: 'T-02', hex: '#5A2332', name_en: 'Burgundy binding tape', name_ar: 'شريط حواف عنابي', type_en: 'Edge binding', type_ar: 'تحديد الحواف', used_in: 'GR-07' },
    { code: 'T-03', hex: '#9A1A22', name_en: 'Red binding tape', name_ar: 'شريط حواف أحمر', type_en: 'Edge binding', type_ar: 'تحديد الحواف', used_in: 'GR-09' },
    { code: 'T-04', hex: '#C9AE7C', name_en: 'Gold piping', name_ar: 'قيطان ذهبي', type_en: 'Piping between panels', type_ar: 'قيطان بين القطع', used_in: 'GR-05, GR-06' },
    { code: 'T-05', hex: '#E7D8C9', name_en: 'Ivory piping', name_ar: 'قيطان عاجي', type_en: 'Piping between panels', type_ar: 'قيطان بين القطع', used_in: 'GR-07, GR-09' },
    { code: 'T-06', hex: '#1F1E1B', name_en: 'Black webbing & Velcro', name_ar: 'أحزمة سوداء وفيلكرو', type_en: 'Belts and closures', type_ar: 'الأحزمة والإغلاقات', used_in: 'All garments' }
  ]
};


// Current Live Configurator State
let currentConfig = {
  category: "Full Overlap",
  core_material: "UM",
  thickness: "0.50 mm Pb",
  collection: "Saudi Editions",
  color: "Saudi Green",
  color_hex: "#006C35",
  fabric_mode: "presets", // "presets" or "custom_codes"
  fabric_code: "F-04",
  fabric_name: "Emerald Green",
  pattern_code: "None",
  pattern_name: "Solid (No Print)",
  trim_code: "T-01",
  trim_name: "Black binding tape",
  gender: "Male",
  size: "L",
  qty: 1,
  embroidery: "",
  logo_filename: null
};

// ==========================================================================
// Initialization
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get("lang") === "ar") {
    currentLang = "ar";
    document.documentElement.setAttribute("dir", "rtl");
    document.documentElement.setAttribute("lang", "ar");
    const langBtn = document.getElementById("btnLangToggle");
    if (langBtn) langBtn.innerHTML = "<span>🌐 English</span>";
    applyTranslations();
  }

    renderCollectionsGrid("all");
  renderStyleOptions();
  renderCoreOptions();
  renderLeadOptions();
  renderColorSwatches();
  renderGenderOptions();
  renderSizeOptions();
  renderFabricsGrid("all");
  renderCustomSolidChips();
  renderCustomPrintChips();
  renderCustomTrimChips();
  updateLiveSummary();

  // Initialize 3D 360° Apron Studio Visualizer
  if (typeof initApron3DViewer === "function") {
    initApron3DViewer("apron3DCanvas", "apron3DViewportBox");
    if (typeof updateApron3DModel === "function") {
      updateApron3DModel(currentConfig);
    }
  }



  // Smooth scroll to URL hash on load
  if (window.location.hash) {
    setTimeout(() => {
      const target = document.querySelector(window.location.hash);
      if (target) target.scrollIntoView({ behavior: "instant", block: "start" });
    }, 100);
  }
});

// ==========================================================================
// Render Configurator Options
// ==========================================================================
function renderStyleOptions() {
  const container = document.getElementById("styleOptionsGrid");
  if (!container) return;

  container.innerHTML = CATALOG_DATA.categories.map(cat => {
    const isSelected = cat.id === currentConfig.category;
    const name = currentLang === "ar" ? cat.name_ar : cat.name_en;
    const format = currentLang === "ar" ? cat.format_ar : cat.format_en;
    return `
      <div class="option-card-radio ${isSelected ? 'selected' : ''}" onclick="selectCategory('${cat.id}')">
        <span class="opt-title">${name}</span>
        <span class="opt-desc">🏷️ ${format} · ${cat.code}</span>
      </div>
    `;
  }).join("");
}

function renderCoreOptions() {
  const container = document.getElementById("coreOptionsGrid");
  if (!container) return;

  container.innerHTML = CATALOG_DATA.core_materials.map(core => {
    const isSelected = core.id === currentConfig.core_material;
    const name = currentLang === "ar" ? core.name_ar : core.name_en;
    const badge = currentLang === "ar" ? core.badge_ar : core.badge_en;
    return `
      <div class="core-radio-card ${isSelected ? 'selected' : ''}" onclick="selectCoreMaterial('${core.id}')">
        <div class="core-radio-title">${core.id} Core</div>
        <div style="font-size: 0.8rem; color: var(--slate-700); margin: 4px 0;">${name}</div>
        <span class="core-radio-badge">✓ ${badge}</span>
      </div>
    `;
  }).join("");
}

function renderLeadOptions() {
  const container = document.getElementById("leadOptionsGrid");
  if (!container) return;

  const currentCatObj = CATALOG_DATA.categories.find(c => c.id === currentConfig.category) || CATALOG_DATA.categories[0];
  const options = currentCatObj.lead_options;

  if (!options.includes(currentConfig.thickness)) {
    currentConfig.thickness = options[0];
  }

  container.innerHTML = options.map(thick => {
    const isSelected = thick === currentConfig.thickness;
    return `
      <div class="option-card-radio ${isSelected ? 'selected' : ''}" onclick="selectLead('${thick}')">
        <span class="opt-title">${thick}</span>
        <span class="opt-desc">${thick === '0.50 mm Pb' ? (currentLang === 'ar' ? 'حماية تداخلية كاملة' : 'Full Interventional') : (currentLang === 'ar' ? 'حماية أمامية خفيفة' : 'Lightweight Frontal')}</span>
      </div>
    `;
  }).join("");
}

function renderColorSwatches() {
  const container = document.getElementById("colorSwatchesGrid");
  if (!container) return;

  container.innerHTML = CATALOG_DATA.collections.map(col => {
    const isSelected = col.name_en.includes(currentConfig.color);
    const name = currentLang === "ar" ? col.name_ar : col.name_en;
    return `
      <div class="color-option-btn ${isSelected ? 'selected' : ''}" onclick="selectColor('${col.id}', '${col.name_en}', '${col.hex}', '${col.tag_en}')">
        <span class="swatch-circle" style="background-color: ${col.hex};"></span>
        <span class="swatch-name">${name.split('(')[0]}</span>
      </div>
    `;
  }).join("");
}

function renderGenderOptions() {
  const container = document.getElementById("genderOptionsGrid");
  if (!container) return;

  const currentCatObj = CATALOG_DATA.categories.find(c => c.id === currentConfig.category) || CATALOG_DATA.categories[0];
  const genders = currentCatObj.genders;

  if (!genders.includes(currentConfig.gender)) {
    currentConfig.gender = genders[0];
  }

  container.innerHTML = genders.map(g => {
    const isSelected = g === currentConfig.gender;
    const label = g === "Male" ? (currentLang === "ar" ? "رجالي (Male)" : "Male") :
                  g === "Female" ? (currentLang === "ar" ? "نسائي (Female)" : "Female") :
                  (currentLang === "ar" ? "للجنسين (Unisex)" : "Unisex");
    return `
      <div class="option-card-radio ${isSelected ? 'selected' : ''}" onclick="selectGender('${g}')">
        <span class="opt-title">${label}</span>
      </div>
    `;
  }).join("");
}

function renderSizeOptions() {
  const container = document.getElementById("sizeOptionsGrid");
  if (!container) return;

  const currentCatObj = CATALOG_DATA.categories.find(c => c.id === currentConfig.category) || CATALOG_DATA.categories[0];
  const sizes = currentCatObj.sizes;

  if (!sizes.includes(currentConfig.size)) {
    currentConfig.size = sizes.includes("L") ? "L" : sizes[0];
  }

  container.innerHTML = sizes.map(s => {
    const isSelected = s === currentConfig.size;
    return `
      <div class="option-card-radio ${isSelected ? 'selected' : ''}" style="text-align: center; padding: 10px;" onclick="selectSize('${s}')">
        <span class="opt-title" style="margin: 0;">${s}</span>
      </div>
    `;
  }).join("");
}

// ==========================================================================
// Selection Actions
// ==========================================================================
function selectCategory(catId) {
  currentConfig.category = catId;
  const catObj = CATALOG_DATA.categories.find(c => c.id === catId);
  if (catObj && catObj.image) {
    document.getElementById("summaryImg").src = catObj.image;
  }
  renderStyleOptions();
  renderLeadOptions();
  renderGenderOptions();
  renderSizeOptions();
  updateLiveSummary();
}

function selectCoreMaterial(coreId) {
  currentConfig.core_material = coreId;
  renderCoreOptions();
  updateLiveSummary();

  // Scroll to configurator if clicked from materials guide section
  const el = document.getElementById("rfq-builder");
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
}

function selectLead(thick) {
  currentConfig.thickness = thick;
  renderLeadOptions();
  updateLiveSummary();
}

function selectColor(colId, nameEn, hex, tagEn) {
  currentConfig.fabric_mode = "presets";
  currentConfig.pattern_code = "None"; // Clear pattern on preset selection
  currentConfig.color = nameEn;
  currentConfig.color_hex = hex;
  currentConfig.collection = tagEn;

  const colObj = CATALOG_DATA.collections.find(c => c.id === colId);
  if (colObj && colObj.image) {
    document.getElementById("summaryImg").src = colObj.image;
  }

  renderColorSwatches();
  updateLiveSummary();
}

function selectGender(g) {
  currentConfig.gender = g;
  renderGenderOptions();
  updateLiveSummary();
}

function selectSize(s) {
  currentConfig.size = s;
  renderSizeOptions();
  updateLiveSummary();
}

function adjustQty(delta) {
  let q = currentConfig.qty + delta;
  if (q < 1) q = 1;
  if (q > 500) q = 500;
  currentConfig.qty = q;
  document.getElementById("qtyDisplay").innerText = q;
  updateLiveSummary();
}

// ==========================================================================
// Logo Upload Handling
// ==========================================================================
async function handleLogoUpload(input) {
  if (!input.files || !input.files[0]) return;
  const file = input.files[0];
  const indicator = document.getElementById("logoUploadIndicator");
  indicator.innerText = currentLang === "ar" ? "جاري الرفع..." : "Uploading...";

  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await fetch("/api/upload-logo", {
      method: "POST",
      body: formData
    });
    const data = await res.json();
    if (data.success) {
      uploadedLogoFilename = data.filename;
      currentConfig.logo_filename = data.filename;
      indicator.innerText = `✓ ${file.name} (${currentLang === 'ar' ? 'تم الإرفاق بنجاح' : 'Attached'})`;
      indicator.style.color = "var(--saudi-green)";
    } else {
      indicator.innerText = data.detail || (currentLang === 'ar' ? "فشل الرفع" : "Upload failed");
      indicator.style.color = "#EF4444";
    }
  } catch (err) {
    indicator.innerText = currentLang === "ar" ? "تعذر رفع الشعار" : "Upload error";
    indicator.style.color = "#EF4444";
  }
}

// ==========================================================================
// Live Summary Update (Zero Prices)
// ==========================================================================
function updateLiveSummary() {
  const catObj = CATALOG_DATA.categories.find(c => c.id === currentConfig.category) || CATALOG_DATA.categories[0];
  
  const title = currentLang === "ar" ? catObj.name_ar : catObj.name_en;
  const format = currentLang === "ar" ? catObj.format_ar : catObj.format_en;
  
  document.getElementById("summaryTitle").innerText = title;
  document.getElementById("summaryCategoryBadge").innerText = format;
  
  document.getElementById("sumValCore").innerText = `${currentConfig.core_material} Core`;
  document.getElementById("sumValThick").innerText = currentConfig.thickness;
  if (currentConfig.fabric_mode === "custom_codes") {
    document.getElementById("sumValColor").innerText = `${currentConfig.fabric_code} + ${currentConfig.pattern_code}`;
  } else {
    document.getElementById("sumValColor").innerText = currentConfig.color.split('(')[0];
  }
  document.getElementById("sumValFit").innerText = `${currentConfig.gender} · ${currentConfig.size}`;
  const qtyEl = document.getElementById("sumValQty");
  if (qtyEl) qtyEl.innerText = `${currentConfig.qty} ${currentLang === 'ar' ? 'قطعة' : 'Unit(s)'}`;


  // Live 3D Model Update
  if (typeof updateApron3DModel === "function") {
    updateApron3DModel(currentConfig);
  }
}

// ==========================================================================
// Collections Grid Filter
// ==========================================================================
function renderCollectionsGrid(categoryFilter) {
  const container = document.getElementById("collectionsGrid");
  if (!container) return;

  const items = categoryFilter === "all" ? 
    CATALOG_DATA.collections : 
    CATALOG_DATA.collections.filter(c => c.category === categoryFilter);

  container.innerHTML = items.map(col => {
    const name = currentLang === "ar" ? col.name_ar : col.name_en;
    const tag = currentLang === "ar" ? col.tag_ar : col.tag_en;
    const desc = currentLang === "ar" ? col.desc_ar : col.desc_en;
    return `
      <div class="collection-card">
        <div class="collection-card-img-wrap">
          <img src="${col.image}" alt="${name}" class="collection-card-img">
          <span class="color-swatch-badge" style="background-color: ${col.hex};"></span>
        </div>
        <div class="collection-card-body">
          <span class="collection-card-tag">${tag}</span>
          <h4 class="collection-card-title">${name}</h4>
          <p class="collection-card-desc">${desc}</p>
          <button type="button" class="btn-select-fabric" onclick="selectColorAndConfigure('${col.id}', '${col.name_en}', '${col.hex}', '${col.tag_en}')">
            ${currentLang === 'ar' ? 'اختيار هذه الخامة للـ RFQ →' : 'Select for RFQ Configurator →'}
          </button>
        </div>
      </div>
    `;
  }).join("");
}

function filterCollections(cat) {
  document.querySelectorAll(".collection-tab-btn").forEach(btn => btn.classList.remove("active"));
  if (cat === "all") document.getElementById("tabAll").classList.add("active");
  if (cat === "saudi") document.getElementById("tabSaudi").classList.add("active");
  if (cat === "sadu") document.getElementById("tabSadu").classList.add("active");
  if (cat === "classics") document.getElementById("tabClassics").classList.add("active");
  renderCollectionsGrid(cat);
}

function selectColorAndConfigure(colId, nameEn, hex, tagEn) {
  selectColor(colId, nameEn, hex, tagEn);
  const el = document.getElementById("rfq-builder");
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

// ==========================================================================
// Clinical Specification Sheet Actions (Local Presentation Mode)
// ==========================================================================
function printSpecSheet() {
  window.print();
}

function copyModelSpecs() {
  const isAr = currentLang === "ar";
  const catObj = CATALOG_DATA.categories.find(c => c.id === currentConfig.category) || CATALOG_DATA.categories[0];
  const modelName = isAr ? catObj.name_ar : catObj.name_en;
  const specsText = isAr 
    ? `🛡️ بطاقة مواصفات ملابس الوقاية من الأشعة - GulfRay®
--------------------------------------------------
الموديل: ${modelName} (${catObj.code})
مادة الوقاية: ${currentConfig.core_material} Core (خالٍ من الرصاص 100%)
سمك الرصاص المكافئ: ${currentConfig.thickness}
اللون / النقشة: ${currentConfig.color}
المقاس والقصة: ${currentConfig.size} (${currentConfig.gender})
المعايير والاعتمادات: IEC 61331-1:2014 · ASTM F2547 · NPL UK
المصنع: مصنع شركة سقالة حلول الوقاية - الرياض، المملكة العربية السعودية
للتواصل المباشر: +966 56 241 4524 | operations@gulfray.com.sa`
    : `🛡️ GulfRay® Radiation Protection Specification Sheet
--------------------------------------------------
Model: ${modelName} (${catObj.code})
Protective Core: ${currentConfig.core_material} Core (100% Lead-Free)
Lead Equivalence: ${currentConfig.thickness}
Color / Pattern: ${currentConfig.color}
Size & Fit: ${currentConfig.size} (${currentConfig.gender})
Accreditation: IEC 61331-1:2014 · ASTM F2547 · NPL UK Verified
Manufacturer: GulfRay® Radiation Protection Facility - Riyadh, Saudi Arabia
Direct Contact: +966 56 241 4524 | operations@gulfray.com.sa`;

  navigator.clipboard.writeText(specsText).then(() => {
    showToast(isAr ? "✓ تم نسخ بطاقة المواصفات بنجاح!" : "✓ Specification sheet copied to clipboard!");
  }).catch(() => {
    showToast(isAr ? "تم إعداد المواصفات" : "Specs ready");
  });
}

function inquireWhatsApp() {
  const isAr = currentLang === "ar";
  const catObj = CATALOG_DATA.categories.find(c => c.id === currentConfig.category) || CATALOG_DATA.categories[0];
  const modelName = isAr ? catObj.name_ar : catObj.name_en;
  const msg = isAr
    ? `السلام عليكم ورحمة الله،
أود الاستفسار من مصنع GulfRay عن الموديل التالي:
- الموديل: ${modelName} (${catObj.code})
- مادة الوقاية: ${currentConfig.core_material} Core
- سمك الرصاص: ${currentConfig.thickness}
- اللون: ${currentConfig.color}
- المقاس: ${currentConfig.size} (${currentConfig.gender})`
    : `Hello GulfRay Medical Factory,
I would like to inquire about the following garment specification:
- Model: ${modelName} (${catObj.code})
- Core: ${currentConfig.core_material} Core
- Lead Equiv: ${currentConfig.thickness}
- Color/Pattern: ${currentConfig.color}
- Size: ${currentConfig.size} (${currentConfig.gender})`;

  const encoded = encodeURIComponent(msg);
  window.open(`https://wa.me/966562414524?text=${encoded}`, '_blank');
}

function showToast(message) {
  let toast = document.getElementById("toastNotification");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toastNotification";
    toast.className = "toast-notification";
    document.body.appendChild(toast);
  }
  toast.innerText = message;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 2800);
}

function resetConfigurator() {
  document.getElementById("inputEmbroidery").value = "";
  if (document.getElementById("fileLogoUpload")) document.getElementById("fileLogoUpload").value = "";
  if (document.getElementById("logoUploadIndicator")) document.getElementById("logoUploadIndicator").innerText = currentLang === "ar" ? "لم يتم إرفاق ملف" : "No file chosen";
  uploadedLogoFilename = null;
  currentConfig.qty = 1;
  updateLiveSummary();
}

// ==========================================================================
// Full Bilingual Toggle System
// ==========================================================================
function toggleLanguage() {
  currentLang = currentLang === "en" ? "ar" : "en";
  document.documentElement.setAttribute("dir", currentLang === "ar" ? "rtl" : "ltr");
  document.documentElement.setAttribute("lang", currentLang);

  const langBtn = document.getElementById("btnLangToggle");
  langBtn.innerHTML = currentLang === "ar" ? "<span>🌐 English</span>" : "<span>🌐 العربية</span>";

  // Translate all text nodes
  applyTranslations();

  // Re-render components with translated names
  renderStyleOptions();
  renderCoreOptions();
  renderLeadOptions();
  renderColorSwatches();
  renderGenderOptions();
  renderSizeOptions();
  renderCollectionsGrid("all");
  updateLiveSummary();
  renderBasketTable();
}

function applyTranslations() {
  const isAr = currentLang === "ar";
  const setText = (id, text) => { const el = document.getElementById(id); if (el) el.innerText = text; };
  const setHtml = (id, html) => { const el = document.getElementById(id); if (el) el.innerHTML = html; };

  // Nav
  setText("navLinkMaterials", isAr ? "دليل المواد الواقية" : "Core Materials");
  setText("navLinkFactory", isAr ? "المصنع السعودي" : "Saudi Factory");
  setText("navLinkCollections", isAr ? "المجموعات والسدو" : "Saudi Collections");
  setText("navLinkFabrics", isAr ? "أكواد الأقمشة 2027" : "Fabric Codes");
  setText("navLinkBuilder", isAr ? "🔄 استوديو المنتجات 360°" : "🔄 3D Product Studio");
  setText("navLinkCompliance", isAr ? "الاعتمادات والجودة" : "Certifications");
  setText("navLinkWorkflow", isAr ? "آلية العمل" : "Working with Us");

  // Factory Section
  setText("factoryTag", isAr ? "صناعة وطنية سعودية · أول مصنع مرخص" : "NATIONAL MANUFACTURING FACILITY · أول مصنع وطني مرخص");
  setText("factoryTitle", isAr ? "مصنع جلف راي للوقاية من الأشعة الطبية" : "The GulfRay® Radiation Protection Facility");
  setText("factoryDesc", isAr ? 
    "أول مصنع وطني مرخص في المملكة العربية السعودية متخصص في تصنيع وتطوير ملابس وحلول الوقاية من الأشعة لكبرى المستشفيات والمراكز الجراحية." : 
    "Headquartered in the Kingdom of Saudi Arabia, GulfRay® operates the first national licensed manufacturing plant dedicated to certified clinical radiation shielding garments.");
  setText("factoryBannerTitle", isAr ? "تصنيع متطور في بيئة معقمة مع فحص إشعاعي شامل 100%" : "State-of-the-Art Clean Manufacturing & Radiographic QC Testing");
  setText("factoryBannerDesc", isAr ? 
    "يجمع مصنعنا بالرياض بين القص الليزري الآلي فائق الدقة، ومعالجة مصفوفة الحماية الثلاثية الخالية من الرصاص، والفحص الإشعاعي الفردي لكل رداء قبل التوريد." : 
    "Our Riyadh facility combines automated laser precision cutting, tri-element lead-free core vulcanization, and 100% radiographic attenuation verification for every garment delivered.");
  setText("pillar1Title", isAr ? "قص ليزري آلي فائق الدقة" : "Automated Laser Cutting");
  setText("pillar1Desc", isAr ? "أنظمة قص بالليزر محوسبة تضمن قياسات سريرية دقيقة بالمليمتر، مع أطراف محكمة تمنع التنسيل وتمنح راحة حركية أثناء العمليات الطويلة." : "Computerized CNC laser cutting lines ensure millimeter-accurate clinical garment fits, chemically sealed hems that prevent edge fraying.");
  setText("pillar2Title", isAr ? "مصفوفة حماية خالية من الرصاص" : "Tri-Element Lead-Free Cores");
  setText("pillar2Desc", isAr ? "دمج سبائك الأنتيمون والبزموت والتنغستن مع بوليمرات مرنة لتوفير وزن أخف بنسبة 28% مع أمان تام وخلو 100% من الرصاص السام." : "Custom polymer vulcanization fusing Antimony, Bismuth, and Tungsten micro-particulates. Delivers 28% lighter weight than traditional lead vinyl.");
  setText("pillar3Title", isAr ? "فحص إشعاعي شامل 100%" : "100% Radiographic Verification");
  setText("pillar3Desc", isAr ? "كل مريول يصنع في المصنع يخضع لاختبار توهين الأشعة بالحزمة العريضة وفق المعايير البريطانية والأوروبية IEC 61331-1 قبل التغليف والتوريد." : "Every manufactured garment undergoes comprehensive broad-beam X-ray attenuation verification calibrated to UK NPL and IEC 61331-1 standards.");
  setText("pillar4Title", isAr ? "مختبر التطريز وشعارات المستشفيات" : "Digital Embroidery & Crest Lab");
  setText("pillar4Desc", isAr ? "تطريز إلكتروني عالي الدقة لأسماء الأطباء، وشعارات المستشفيات، وبطاقة سمك الرصاص المعتمدة بخيوط ذهبية وفضية مقاومة للغسيل والتعقيم." : "High-precision multi-head computerized embroidery for physician names, hospital department crests, and permanent Pb-equivalence identification badges.");

  // Product Studio Section & Spec Sheet Actions
  setText("rfqTag", isAr ? "استوديو المنتجات والمواصفات السريرية ثلاثي الأبعاد" : "INTERACTIVE 3D PRODUCT STUDIO · استوديو المنتجات ثلاثي الأبعاد");
  setText("rfqTitle", isAr ? "مستكشف المنتجات والمواصفات ثلاثي الأبعاد 360°" : "3D Clinical Product & Specification Explorer");
  setText("rfqDesc", isAr ? 
    "استكشف موديلات جلف راي الطبية، واختر نوع مادة الحماية، وسمك الرصاص، وجرب ألوان ونقشات كتالوج 2027 مع معاينة دوران حية 360° وبطاقة مواصفات سريرية جاهزة للطباعة والمشاركة." : 
    "Inspect GulfRay's certified radiation protection garments, lightweight lead-free cores, and the official 2027 fabric and motif palette in real-time 360° rotation with full specification sheets.");
  setText("specBadgeTitle", isAr ? "بطاقة مواصفات سريرية معتمدة من GulfRay®" : "Official GulfRay® Clinical Specification");
  setText("specBadgeDesc", isAr ? "صُنع في الرياض، المملكة العربية السعودية وفق معايير IEC 61331-1:2014 و ASTM F2547." : "Engineered to IEC 61331-1:2014 & ASTM F2547 standards in Riyadh, Saudi Arabia.");
  setText("lblPrintSpec", isAr ? "طباعة بطاقة المواصفات الفنية" : "Print Technical Spec Sheet");
  setText("lblCopySpec", isAr ? "نسخ تفاصيل المواصفات" : "Copy Specifications");
  setText("lblWhatsAppSpec", isAr ? "واتساب المصنع المباشر" : "Direct Factory WhatsApp");

  // Hero
  setHtml("heroBadge", isAr ? 
    "<span>🛡️ حماية بمعايير عالمية وصناعة سعودية · Protection with Identity</span>" : 
    "<span>🛡️ Protection with Identity · حماية بمعايير عالمية وصناعة سعودية</span>");
  
  setHtml("heroTitle", isAr ?
    "حماية أخف وزناً وخالية من الرصاص <span class='highlight-green'>صُنعت بفخر</span> في <span class='highlight-lavender'>المملكة</span>." :
    "Lighter, Lead-Free <span class='highlight-green'>Radiation Protection</span> Tailored in the <span class='highlight-lavender'>Kingdom</span>.");

  setText("heroSubtitle", isAr ?
    "أول مصنع سعودي متخصص في إنتاج ملابس وإكسسوارات الوقاية من الإشعاع الطبي. مصمم بمواد واقية خالية من الرصاص ومختبرة بالحزمة العريضة، مع لمسات تطريز السدو التراثي وخيارات المقاسات الخاصة للمستشفيات." :
    "Saudi Arabia's premier medical manufacturer of lightweight, certified radiation protection aprons. Engineered with broad-beam verified lead-free cores, bespoke Saudi Sadu heritage embroidery, and custom hospital sizing.");

  setHtml("btnHero3DPrimary", isAr ? "<span>🔄 استوديو المنتجات ثلاثي الأبعاد 360°</span>" : "<span>🔄 360° Product Studio · استوديو المنتجات</span>");
  setHtml("btnHeroFactory", isAr ? "<span>🏭 جولة في المصنع السعودي</span>" : "<span>🏭 Saudi Factory Tour · جولة المصنع</span>");
  setHtml("btnHeroMaterials", isAr ? "<span>🔬 استعراض دليل المواد الواقية</span>" : "<span>🔬 Explore Core Materials Guide</span>");

  // Materials Guide
  setText("materialsTag", isAr ? "03 · دليل المواد الواقية المتقدمة" : "03 · PROTECTIVE CORE MATERIALS");
  setText("materialsTitle", isAr ? "ثلاث مواد خالية من الرصاص. معيار أمان واحد." : "Three Lead-Free Cores. One Standard of Safety.");
  setText("materialsDesc", isAr ?
    "مستوحى من أعلى المعايير الطبية العالمية، يوفر GulfRay ثلاث مواد واقية خالية تماماً من الرصاص السام ومطابقة للمواصفات الدولية، ومحددة بالسمك المكافئ الصريح (mm Pb-eq)." :
    "Inspired by leading global shielding science, GulfRay offers three verified lead-free attenuation cores. All three are 100% toxic-lead-free, compliant with international standards, and specified in true mm lead equivalence (Pb-eq).");

  setText("umBadge", isAr ? "UM · الأخف وزناً على الإطلاق" : "UM · Ultra-Lightest");
  setText("umSub", isAr ? "أخف بنسبة 28% من الرصاص التقليدي" : "About 28% lighter than traditional lead");
  setText("nplBadge", isAr ? "NPL · معتمد بالحزمة العريضة" : "NPL · Broad-Beam UK Verified");
  setText("nplSub", isAr ? "المعيار الذهبي بهندسة الحزمة العريضة" : "Broad-beam gold-standard geometry");
  setText("mlBadge", isAr ? "ML · الخيار الاقتصادي الأعلى قيمة" : "ML · Most Economical");
  setText("mlSub", isAr ? "أعلى كفاءة لميزانيات المستشفيات الكبيرة" : "Accessible price for larger departments");

  // Product Studio Steps
  setText("step1Title", isAr ? "1. الموديل والشكل السريري" : "1. Garment Style & Clinical Format");
  setText("step2Title", isAr ? "2. نوع المادة الواقية الخالية من الرصاص" : "2. Protective Core Material");
  setText("step3Title", isAr ? "3. سمك الرصاص المكافئ (Pb-eq)" : "3. Lead Equivalence (Pb-eq)");
  setText("step4Title", isAr ? "4. اللون، القماش ونقشة الكتالوج" : "4. Fabric Color & Pattern");
  setText("step5Title", isAr ? "5. المقاس والجنس" : "5. Sizing & Cut");

  // Navigation
  if (document.getElementById("navLinkFabrics")) setText("navLinkFabrics", isAr ? "دليل الأقمشة 2027" : "Fabric Codes");

  // 2027 Fabric Reference Section
  if (document.getElementById("fabricsTag")) setText("fabricsTag", isAr ? "دليل الإنتاج المعتمد 2027 · مواصفات الأقمشة والنقشات" : "2027 PRODUCTION REFERENCE · FABRIC SPECIFICATIONS");
  if (document.getElementById("fabricsTitle")) setText("fabricsTitle", isAr ? "الدليل المرجعي لألوان ونقشات وأشرطة أردية GulfRay" : "Outer Fabric, Print & Trim Colour Reference");
  if (document.getElementById("fabricsDesc")) setText("fabricsDesc", isAr ? 
    "جميع ألوان الأقمشة الخارجية والنقشات والأشرطة المعتمدة في كتالوج 2027 مع أكواد التصنيع الدقيقة (F-01 إلى F-25، P08 إلى P68، T-01 إلى T-06). يمكن للعملاء والجهات الطالبة تحديد الأكواد المطلوبة بدقة هندسية تامة." :
    "Every outer-shell colour, print, and trim used across the official 2027 catalogue. Browse verified HEX codes, physical textile swatches, and factory codes (F-01 to F-25, P08 to P68, T-01 to T-06) for bespoke hospital orders.");

  if (document.getElementById("tabFabAll")) setText("tabFabAll", isAr ? "كافة العينات (42)" : "All Swatches (42)");
  if (document.getElementById("tabFabSolids")) setText("tabFabSolids", isAr ? "🎨 ألوان سادة · F-01 إلى F-25 (25)" : "🎨 Solid Colours · F-01 to F-25 (25)");
  if (document.getElementById("tabFabPrints")) setText("tabFabPrints", isAr ? "🖼️ أقمشة مطبوعة · P08 إلى P68 (11)" : "🖼️ Printed Fabrics · P08 to P68 (11)");
  if (document.getElementById("tabFabTrims")) setText("tabFabTrims", isAr ? "🧵 أشرطة وقيطان · T-01 إلى T-06 (6)" : "🧵 Trims & Piping · T-01 to T-06 (6)");

  if (document.getElementById("txtModePresets")) setText("txtModePresets", isAr ? "🌟 مجموعات الكتالوج الجاهزة" : "🌟 Catalog Pre-Set Editions");
  if (document.getElementById("txtModeCustom")) setText("txtModeCustom", isAr ? "🎯 تخصيص حر بأكواد 2027 (F · P · T)" : "🎯 Custom 2027 Fabric Codes (F · P · T)");
  if (document.getElementById("lblSolidFabTitle")) setText("lblSolidFabTitle", isAr ? "🎨 قماش الرداء الخارجي الأساسي (F-01 إلى F-25):" : "🎨 Primary Outer Fabric (F-01 to F-25):");
  if (document.getElementById("lblPrintFabTitle")) setText("lblPrintFabTitle", isAr ? "🖼️ النقشة المطبوعة الإضافية (اختياري):" : "🖼️ Printed Pattern Accent (Optional):");
  if (document.getElementById("lblTrimFabTitle")) setText("lblTrimFabTitle", isAr ? "🧵 شريط الحواف والقيطان (T-01 إلى T-06):" : "🧵 Edge Trim & Piping (T-01 to T-06):");

  // Re-render fabric grids with translated names
  renderFabricsGrid(currentFabricFilter);
  if (currentConfig.fabric_mode === "custom_codes") {
    renderCustomSolidChips();
    renderCustomPrintChips();
    renderCustomTrimChips();
  }

  // Collection Tabs
  if (document.getElementById("tabAll")) setText("tabAll", isAr ? "كافة المجموعات" : "All Collections");
  if (document.getElementById("tabSaudi")) setText("tabSaudi", isAr ? "المجموعات السعودية" : "Saudi Editions");
  if (document.getElementById("tabSadu")) setText("tabSadu", isAr ? "🧵 نقشات السدو التراثية" : "🧵 Sadu & Geometric Patterns");
  if (document.getElementById("tabClassics")) setText("tabClassics", isAr ? "⚓ الألوان الكلاسيكية" : "⚓ Signature & Solid Colors");

  // Hero Proof Metrics & Showcase
  if (document.getElementById("heroCardBadgeTag")) {
    setText("heroCardBadgeTag", isAr ? "🛡️ معرض المنتجات الحقيقية للمصنع" : "🛡️ OFFICIAL PRODUCT SHOWCASE");
  }
  if (document.getElementById("heroM1Title")) {
    setText("heroM1Title", isAr ? "أخف وزناً بنسبة 28%" : "28% Lighter Weight");
    setText("heroM1Sub", isAr ? "حشوة UM خالية من الرصاص (2.60 kg/m²)" : "Lead-Free UM Core (2.60 kg/m²)");
  }
  if (document.getElementById("heroM2Title")) {
    setText("heroM2Title", isAr ? "اختبار الحزمة العريضة" : "Broad-Beam Verified");
    setText("heroM2Sub", isAr ? "المختبر الفيزيائي الوطني البريطاني NPL" : "UK National Physical Laboratory (NPL)");
  }
  if (document.getElementById("heroM3Title")) {
    setText("heroM3Title", isAr ? "100% غير سام وآمن" : "100% Non-Toxic");
    setText("heroM3Sub", isAr ? "مطابق لمواصفات SGS REACH 234 SVHC" : "SGS REACH 234 SVHC Certified");
  }
  // 3D Visualizer Translations
  if (document.getElementById("tab3DMode")) setText("tab3DMode", isAr ? "🔄 استوديو ثلاثي الأبعاد 360°" : "🔄 3D 360° Studio");
  if (document.getElementById("tabPhotoMode")) setText("tabPhotoMode", isAr ? "📷 صورة الكتالوج" : "📷 Photo");
  if (document.getElementById("txtDragHint")) setText("txtDragHint", isAr ? "🔄 اسحب للتدوير 360 درجة" : "🔄 Drag 360° to Rotate");
  if (document.getElementById("lblAngleFront")) setText("lblAngleFront", isAr ? "أمامي 0°" : "Front 0°");
  if (document.getElementById("lblAngleQuarter")) setText("lblAngleQuarter", isAr ? "زاوية 45°" : "Angle 45°");
  if (document.getElementById("lblAngleSide")) setText("lblAngleSide", isAr ? "جانبي 90°" : "Side 90°");
  if (document.getElementById("lblAngleBack")) setText("lblAngleBack", isAr ? "الظهر 180°" : "Back 180°");
  if (document.getElementById("lbl3DAutoSpin")) setText("lbl3DAutoSpin", isAr ? "🔄 دوران تلقائي" : "🔄 Auto-Spin");

  if (document.getElementById("heroM4Title")) {
    setText("heroM4Title", isAr ? "مصنع وطني سعودي" : "Saudi National Manufacturer");
    setText("heroM4Sub", isAr ? "أول مصنع مرخص في المملكة" : "Kingdom of Saudi Arabia Factory");
  }
}

// Interactive Real Garment Showcase Switcher (Hero Section)
let currentHeroGarment = "green";
function switchHeroGarment(type) {
  currentHeroGarment = type;
  const imgEl = document.getElementById("heroMainImg");
  const titleEl = document.getElementById("heroBadgeCardTitle");
  const subEl = document.getElementById("heroBadgeCardSubtitle");
  const buttons = document.querySelectorAll(".hero-swatch-btn");

  buttons.forEach(btn => btn.classList.remove("active"));
  const isAr = currentLang === "ar";

  if (type === "green") {
    if (buttons[0]) buttons[0].classList.add("active");
    if (imgEl) imgEl.src = "/images/saudi_green_apron.jpg";
    if (titleEl) titleEl.innerText = isAr ? "المجموعات السعودية · المجموعة 02 (الأخضر السعودي)" : "Saudi Editions · Collection 02 (Saudi Green)";
    if (subEl) subEl.innerText = isAr ? "رداء استوديو حقيقي · حشوة UM فائقة الخفة بدون رصاص · تطريز سدو" : "Real Studio Garment · Lead-Free UM Core · Sadu Accents";
  } else if (type === "lavender") {
    if (buttons[1]) buttons[1].classList.add("active");
    if (imgEl) imgEl.src = "/images/saudi_lavender_apron.jpg";
    if (titleEl) titleEl.innerText = isAr ? "المجموعات السعودية · الخزامى السعودي الفاخر" : "Saudi Editions · Royal Saudi Lavender";
    if (subEl) subEl.innerText = isAr ? "رداء استوديو حقيقي · حشوة NPL المعتمدة · تطريز ذهبي دقيق" : "Real Studio Garment · Broad-Beam NPL Core · Gold Trim";
  } else if (type === "vest") {
    if (buttons[2]) buttons[2].classList.add("active");
    if (imgEl) imgEl.src = "/images/vest_skirt_format.jpg";
    if (titleEl) titleEl.innerText = isAr ? "طقم سترة وتنورة مريول تراكب كامل (GR-05V/S)" : "Full Overlap Vest & Skirt Set (GR-05V/S)";
    if (subEl) subEl.innerText = isAr ? "توزيع هندسي متوازن للوزن بين الكتفين والخصر 360°" : "360° Wrap Protection · Lumbar Weight Distribution";
  }
}


// ==========================================================================
// 2027 Outer Fabric Reference Guide
// ==========================================================================
let currentFabricFilter = "all";

function filterFabrics(filterType) {
  currentFabricFilter = filterType;
  const tabs = {
    all: "tabFabAll",
    solids: "tabFabSolids",
    prints: "tabFabPrints",
    trims: "tabFabTrims"
  };
  Object.values(tabs).forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.remove("active");
  });
  if (tabs[filterType]) {
    const activeEl = document.getElementById(tabs[filterType]);
    if (activeEl) activeEl.classList.add("active");
  }
  renderFabricsGrid(filterType);
}

function renderFabricsGrid(filterType) {
  const container = document.getElementById("fabricsGrid");
  if (!container) return;

  let items = [];
  const isAr = currentLang === "ar";

  if (filterType === "all" || filterType === "solids") {
    FABRIC_REFERENCE.solid_colors.forEach(item => {
      items.push({
        type: "solid",
        code: item.code,
        name: isAr ? item.name_ar : item.name_en,
        sub: `HEX: ${item.hex} · RGB: ${item.rgb}`,
        hex: item.hex,
        image: null,
        used: item.used_in,
        selectText: isAr ? `اختيار كود ${item.code} للتصنيع ←` : `Select ${item.code} for RFQ →`
      });
    });
  }

  if (filterType === "all" || filterType === "prints") {
    FABRIC_REFERENCE.printed_fabrics.forEach(item => {
      items.push({
        type: "print",
        code: item.code,
        name: isAr ? item.name_ar : item.name_en,
        sub: isAr ? item.desc_ar : item.desc_en,
        hex: null,
        image: item.image,
        used: item.used_in,
        selectText: isAr ? `اختيار نقشة ${item.code} ←` : `Select Print ${item.code} →`
      });
    });
  }

  if (filterType === "all" || filterType === "trims") {
    FABRIC_REFERENCE.trims.forEach(item => {
      items.push({
        type: "trim",
        code: item.code,
        name: isAr ? item.name_ar : item.name_en,
        sub: isAr ? item.type_ar : item.type_en,
        hex: item.hex,
        image: null,
        used: item.used_in,
        selectText: isAr ? `اختيار ${item.code} كشريط حواف ←` : `Select Trim ${item.code} →`
      });
    });
  }

  container.innerHTML = items.map(it => {
    let previewHtml = "";
    if (it.image) {
      previewHtml = `
        <div class="fabric-card-preview">
          <img src="${it.image}" alt="${it.name}">
          <span class="fabric-badge-code">${it.code}</span>
        </div>
      `;
    } else {
      previewHtml = `
        <div class="fabric-card-preview" style="background-color: ${it.hex};">
          <span class="fabric-badge-code">${it.code}</span>
          <span class="fabric-card-hex-pill">${it.hex}</span>
        </div>
      `;
    }

    return `
      <div class="fabric-card">
        ${previewHtml}
        <div class="fabric-card-body">
          <div class="fabric-card-title">${it.name}</div>
          <div class="fabric-card-sub">${it.sub}</div>
          <div class="fabric-card-meta">
            <b>${isAr ? 'المنتجات المطابقة:' : 'Used in:'}</b> ${it.used}
          </div>
          <button type="button" class="fabric-select-btn" onclick="selectFabricFromGuide('${it.type}', '${it.code}')">
            ${it.selectText}
          </button>
        </div>
      </div>
    `;
  }).join("");
}

function selectFabricFromGuide(type, code) {
  setFabricMode("custom_codes");
  if (type === "solid") {
    selectCustomSolid(code);
  } else if (type === "print") {
    selectCustomPrint(code);
  } else if (type === "trim") {
    selectCustomTrim(code);
  }
  const el = document.getElementById("rfq-builder");
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

// ==========================================================================
// Custom 2027 Fabric Builder (Step 4)
// ==========================================================================
function setFabricMode(mode) {
  currentConfig.fabric_mode = mode;
  const btnPresets = document.getElementById("btnModePresets");
  const btnCustom = document.getElementById("btnModeCustom");
  const gridPresets = document.getElementById("colorSwatchesGrid");
  const boxCustom = document.getElementById("customFabricBuilder");

  if (mode === "presets") {
    if (btnPresets) btnPresets.classList.add("active");
    if (btnCustom) btnCustom.classList.remove("active");
    if (gridPresets) gridPresets.style.display = "grid";
    if (boxCustom) boxCustom.style.display = "none";
    currentConfig.collection = "Saudi Editions";
    currentConfig.color = "Saudi Green";
  } else {
    if (btnPresets) btnPresets.classList.remove("active");
    if (btnCustom) btnCustom.classList.add("active");
    if (gridPresets) gridPresets.style.display = "none";
    if (boxCustom) boxCustom.style.display = "block";
    renderCustomSolidChips();
    renderCustomPrintChips();
    renderCustomTrimChips();
    currentConfig.collection = `Custom Spec: ${currentConfig.fabric_code} · ${currentConfig.pattern_code}`;
    currentConfig.color = `${currentConfig.fabric_code} (${currentConfig.fabric_name})`;
  }
  updateLiveSummary();
}

function renderCustomSolidChips() {
  const container = document.getElementById("solidsChipGrid");
  if (!container) return;

  container.innerHTML = FABRIC_REFERENCE.solid_colors.map(col => {
    const isSel = col.code === currentConfig.fabric_code;
    return `
      <div class="solid-chip-item ${isSel ? 'selected' : ''}" style="background-color: ${col.hex};" onclick="selectCustomSolid('${col.code}')" title="${col.code} · ${col.name_en} (${col.hex})">
        <span class="solid-chip-code">${col.code}</span>
      </div>
    `;
  }).join("");

  const solidObj = FABRIC_REFERENCE.solid_colors.find(c => c.code === currentConfig.fabric_code) || FABRIC_REFERENCE.solid_colors[3];
  const isAr = currentLang === "ar";
  const labelEl = document.getElementById("selectedSolidBadge");
  if (labelEl) {
    labelEl.innerText = `${solidObj.code} · ${isAr ? solidObj.name_ar : solidObj.name_en} (${solidObj.hex})`;
  }
}

function selectCustomSolid(code) {
  const solidObj = FABRIC_REFERENCE.solid_colors.find(c => c.code === code);
  if (!solidObj) return;

  currentConfig.fabric_mode = "custom_codes";
  currentConfig.fabric_code = solidObj.code;
  currentConfig.fabric_name = currentLang === "ar" ? solidObj.name_ar : solidObj.name_en;
  currentConfig.fabric_hex = solidObj.hex;
  currentConfig.color = `${solidObj.code} (${solidObj.name_en})`;
  currentConfig.color_hex = solidObj.hex;
  currentConfig.pattern_code = "None"; // Clear pattern so solid color renders on 3D!
  currentConfig.pattern_name = currentLang === "ar" ? "سادة" : "Solid";
  currentConfig.collection = `Custom Spec: ${solidObj.code} (Solid)`;

  renderCustomSolidChips();
  renderCustomPrintChips(); // Refresh print chips to show None selected
  updateLiveSummary();
}

function renderCustomPrintChips() {
  const container = document.getElementById("printsChipGrid");
  if (!container) return;

  const isAr = currentLang === "ar";
  const items = [
    { code: "None", name: isAr ? "سادة بدون نقشة" : "Solid (No Print)", image: null }
  ].concat(FABRIC_REFERENCE.printed_fabrics.map(p => ({
    code: p.code,
    name: isAr ? p.name_ar : p.name_en,
    image: p.image
  })));

  container.innerHTML = items.map(it => {
    const isSel = it.code === currentConfig.pattern_code;
    let thumb = it.image ? 
      `<img src="${it.image}" alt="${it.name}" class="print-chip-thumb">` :
      `<div class="print-chip-thumb" style="display: flex; align-items: center; justify-content: center; font-size: 0.72rem; color: var(--slate-500); background: #e2e8f0;">🚫 Solid</div>`;

    return `
      <div class="print-chip-item ${isSel ? 'selected' : ''}" onclick="selectCustomPrint('${it.code}')">
        ${thumb}
        <div class="print-chip-desc">
          <span>${it.code}</span>
          <small style="font-weight: 500; color: var(--slate-600);">${it.name.split('(')[0]}</small>
        </div>
      </div>
    `;
  }).join("");

  const labelEl = document.getElementById("selectedPrintBadge");
  if (labelEl) {
    if (currentConfig.pattern_code === "None") {
      labelEl.innerText = isAr ? "سادة بدون نقشة" : "Solid (No Print)";
    } else {
      const pObj = FABRIC_REFERENCE.printed_fabrics.find(p => p.code === currentConfig.pattern_code);
      labelEl.innerText = pObj ? `${pObj.code} · ${isAr ? pObj.name_ar : pObj.name_en}` : currentConfig.pattern_code;
    }
  }
}

function selectCustomPrint(code) {
  currentConfig.fabric_mode = "custom_codes";
  currentConfig.pattern_code = code;
  if (code === "None") {
    currentConfig.pattern_name = currentLang === "ar" ? "سادة" : "Solid";
  } else {
    const pObj = FABRIC_REFERENCE.printed_fabrics.find(p => p.code === code);
    currentConfig.pattern_name = pObj ? (currentLang === "ar" ? pObj.name_ar : pObj.name_en) : code;
  }
  currentConfig.collection = `Custom Spec: ${currentConfig.fabric_code} · ${currentConfig.pattern_code}`;

  renderCustomPrintChips();
  updateLiveSummary();
}

function renderCustomTrimChips() {
  const container = document.getElementById("trimsChipGrid");
  if (!container) return;

  const isAr = currentLang === "ar";
  container.innerHTML = FABRIC_REFERENCE.trims.map(trim => {
    const isSel = trim.code === currentConfig.trim_code;
    const name = isAr ? trim.name_ar : trim.name_en;
    return `
      <div class="trim-chip-item ${isSel ? 'selected' : ''}" onclick="selectCustomTrim('${trim.code}')">
        <span class="trim-dot" style="background-color: ${trim.hex};"></span>
        <span><b>${trim.code}</b> · ${name}</span>
      </div>
    `;
  }).join("");

  const labelEl = document.getElementById("selectedTrimBadge");
  if (labelEl) {
    const tObj = FABRIC_REFERENCE.trims.find(t => t.code === currentConfig.trim_code) || FABRIC_REFERENCE.trims[0];
    labelEl.innerText = `${tObj.code} · ${isAr ? tObj.name_ar : tObj.name_en}`;
  }
}

function selectCustomTrim(code) {
  const tObj = FABRIC_REFERENCE.trims.find(t => t.code === code);
  if (!tObj) return;

  currentConfig.trim_code = tObj.code;
  currentConfig.trim_name = currentLang === "ar" ? tObj.name_ar : tObj.name_en;

  renderCustomTrimChips();
  updateLiveSummary();
}
