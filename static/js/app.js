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

// Current Live Configurator State
let currentConfig = {
  category: "Full Overlap",
  core_material: "UM",
  thickness: "0.50 mm Pb",
  collection: "Saudi Editions",
  color: "Saudi Green",
  color_hex: "#006C35",
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
  loadSavedBasket();
  renderCollectionsGrid("all");
  renderStyleOptions();
  renderCoreOptions();
  renderLeadOptions();
  renderColorSwatches();
  renderGenderOptions();
  renderSizeOptions();
  updateLiveSummary();
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
  document.getElementById("sumValColor").innerText = currentConfig.color.split('(')[0];
  document.getElementById("sumValFit").innerText = `${currentConfig.gender} · ${currentConfig.size}`;
  document.getElementById("sumValQty").innerText = `${currentConfig.qty} ${currentLang === 'ar' ? 'قطعة' : 'Unit(s)'}`;
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
// RFQ Basket Management
// ==========================================================================
function loadSavedBasket() {
  try {
    const saved = localStorage.getItem("gulfray_rfq_basket");
    if (saved) {
      rfqBasket = JSON.parse(saved);
      updateBasketCount();
    }
  } catch (e) {
    rfqBasket = [];
  }
}

function saveBasket() {
  try {
    localStorage.setItem("gulfray_rfq_basket", JSON.stringify(rfqBasket));
  } catch (e) {}
  updateBasketCount();
}

function updateBasketCount() {
  const total = rfqBasket.reduce((sum, it) => sum + (it.qty || 1), 0);
  document.getElementById("headerCartCount").innerText = total;
}

function addItemToRfq() {
  const catObj = CATALOG_DATA.categories.find(c => c.id === currentConfig.category) || CATALOG_DATA.categories[0];
  const embroideryVal = document.getElementById("inputEmbroidery").value.trim();

  const item = {
    category: currentConfig.category,
    name_en: catObj.name_en,
    name_ar: catObj.name_ar,
    code: catObj.code,
    core_material: `${currentConfig.core_material} Core`,
    collection: currentConfig.collection,
    color: currentConfig.color,
    thickness: currentConfig.thickness,
    size: currentConfig.size,
    gender: currentConfig.gender,
    qty: currentConfig.qty,
    embroidery: embroideryVal,
    custom_logo: uploadedLogoFilename ? "Attached" : ""
  };

  rfqBasket.push(item);
  saveBasket();

  // Visual Feedback animation
  const btn = document.querySelector(".btn-add-rfq");
  btn.style.background = "linear-gradient(135deg, #10B981 0%, #059669 100%)";
  const origText = document.getElementById("btnAddRfqText").innerText;
  document.getElementById("btnAddRfqText").innerText = currentLang === "ar" ? "✓ تم الإضافة إلى سلة الاستفسار!" : "✓ Added to RFQ Basket!";

  setTimeout(() => {
    btn.style.background = "";
    document.getElementById("btnAddRfqText").innerText = origText;
  }, 1800);
}

function openRfqModal() {
  renderBasketTable();
  document.getElementById("rfqSuccessBox").style.display = "none";
  document.getElementById("rfqCustomerForm").style.display = "grid";
  document.getElementById("rfqModalOverlay").classList.add("open");
}

function closeRfqModal() {
  document.getElementById("rfqModalOverlay").classList.remove("open");
}

function renderBasketTable() {
  const tbody = document.getElementById("basketTableBody");
  if (!tbody) return;

  if (rfqBasket.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="5" style="text-align: center; padding: 30px; color: var(--slate-400);">
          ${currentLang === 'ar' ? 'سلة الاستفسار فارغة حالياً. أضف مواصفات من أداة التخصيص بالأسفل.' : 'Your RFQ basket is currently empty. Configure garments below.'}
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = rfqBasket.map((it, idx) => {
    const name = currentLang === "ar" ? it.name_ar : it.name_en;
    const customTxt = it.embroidery ? `🧵 ${it.embroidery}` : (currentLang === 'ar' ? 'قياسي' : 'Standard');
    return `
      <tr>
        <td style="text-align: center; color: var(--slate-500); font-weight: bold;">${idx + 1}</td>
        <td>
          <b style="color: var(--slate-900); font-size: 0.95rem;">${name}</b>
          <div style="font-size: 0.78rem; color: var(--slate-600); margin-top: 3px;">
            <b>${it.core_material}</b> · ${it.thickness} · ${it.color.split('(')[0]} · Size: ${it.size} (${it.gender})
          </div>
        </td>
        <td style="font-size: 0.8rem; color: var(--saudi-green); font-weight: 600;">${customTxt}</td>
        <td style="text-align: center; font-weight: 800; font-size: 1rem; color: var(--slate-900);">${it.qty}</td>
        <td style="text-align: center;">
          <button type="button" class="basket-item-del-btn" onclick="removeBasketItem(${idx})">
            ${currentLang === 'ar' ? 'حذف' : 'Remove'}
          </button>
        </td>
      </tr>
    `;
  }).join("");
}

function removeBasketItem(idx) {
  rfqBasket.splice(idx, 1);
  saveBasket();
  renderBasketTable();
}

// ==========================================================================
// Handle RFQ Form Submission
// ==========================================================================
async function handleRfqSubmit(e) {
  e.preventDefault();

  if (rfqBasket.length === 0) {
    alert(currentLang === "ar" ? "يرجى إضافة صنف واحد على الأقل إلى السلة." : "Please add at least one garment specification to the RFQ basket.");
    return;
  }

  const submitBtn = document.getElementById("btnSubmitRfq");
  submitBtn.disabled = true;
  submitBtn.innerText = currentLang === "ar" ? "جاري إرسال الطلب..." : "Submitting RFQ...";

  const customerData = {
    organization: document.getElementById("custOrg").value.trim(),
    name: document.getElementById("custName").value.trim(),
    city: document.getElementById("custCity").value.trim(),
    phone: document.getElementById("custPhone").value.trim(),
    email: document.getElementById("custEmail").value.trim(),
    notes: document.getElementById("custNotes").value.trim()
  };

  const payload = {
    customer: customerData,
    items: rfqBasket,
    logo_filename: uploadedLogoFilename,
    honeypot: document.getElementById("rfqHoneypot").value
  };

  try {
    const res = await fetch("/api/rfq", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    if (data.success) {
      document.getElementById("succRefNo").innerText = data.rfq_id;
      document.getElementById("rfqCustomerForm").style.display = "none";
      document.getElementById("rfqSuccessBox").style.display = "block";

      // Clear basket after successful dispatch
      rfqBasket = [];
      saveBasket();
      renderBasketTable();
    } else {
      alert(data.detail || (currentLang === 'ar' ? "فشل إرسال الطلب" : "Submission failed"));
    }
  } catch (err) {
    alert(currentLang === "ar" ? "حدث خطأ أثناء الاتصال بالسيرفر. يرجى المحاولة مرة أخرى." : "Error communicating with server. Please try again.");
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerText = currentLang === "ar" ? "🚀 إرسال طلب عرض السعر الرسمي" : "🚀 Submit Request for Quotation (RFQ)";
  }
}

function resetConfigurator() {
  document.getElementById("inputEmbroidery").value = "";
  document.getElementById("fileLogoUpload").value = "";
  document.getElementById("logoUploadIndicator").innerText = currentLang === "ar" ? "لم يتم إرفاق ملف" : "No file chosen";
  uploadedLogoFilename = null;
  currentConfig.qty = 1;
  document.getElementById("qtyDisplay").innerText = 1;
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

  // Nav
  document.getElementById("navLinkMaterials").innerText = isAr ? "دليل المواد الواقية" : "Core Materials";
  document.getElementById("navLinkCollections").innerText = isAr ? "المجموعات والسدو" : "Saudi Collections";
  document.getElementById("navLinkBuilder").innerText = isAr ? "مُنشئ عرض السعر" : "RFQ Configurator";
  document.getElementById("navLinkCompliance").innerText = isAr ? "الاعتمادات والجودة" : "Certifications";
  document.getElementById("navLinkWorkflow").innerText = isAr ? "آلية العمل" : "Working with Us";

  // Hero
  document.getElementById("heroBadge").innerHTML = isAr ? 
    "<span>🛡️ حماية بمعايير عالمية وصناعة سعودية · Protection with Identity</span>" : 
    "<span>🛡️ Protection with Identity · حماية بمعايير عالمية وصناعة سعودية</span>";
  
  document.getElementById("heroTitle").innerHTML = isAr ?
    "حماية أخف وزناً وخالية من الرصاص <span class='highlight-green'>صُنعت بفخر</span> في <span class='highlight-lavender'>المملكة</span>." :
    "Lighter, Lead-Free <span class='highlight-green'>Radiation Protection</span> Tailored in the <span class='highlight-lavender'>Kingdom</span>.";

  document.getElementById("heroSubtitle").innerText = isAr ?
    "أول مصنع سعودي متخصص في إنتاج ملابس وإكسسوارات الوقاية من الإشعاع الطبي. مصمم بمواد واقية خالية من الرصاص ومختبرة بالحزمة العريضة، مع لمسات تطريز السدو التراثي وخيارات المقاسات الخاصة للمستشفيات." :
    "Saudi Arabia's premier medical manufacturer of lightweight, certified radiation protection aprons. Engineered with broad-beam verified lead-free cores, bespoke Saudi Sadu heritage embroidery, and custom hospital sizing.";

  document.getElementById("btnHeroRfq").innerHTML = isAr ? "<span>✨ تخصيص وطلب عرض السعر (RFQ)</span>" : "<span>✨ Configure & Request Quotation (RFQ)</span>";
  document.getElementById("btnHeroMaterials").innerHTML = isAr ? "<span>🔬 استعراض دليل المواد الواقية</span>" : "<span>🔬 Explore Core Materials Guide</span>";

  // Materials Guide
  document.getElementById("materialsTag").innerText = isAr ? "03 · دليل المواد الواقية المتقدمة" : "03 · PROTECTIVE CORE MATERIALS";
  document.getElementById("materialsTitle").innerText = isAr ? "ثلاث مواد خالية من الرصاص. معيار أمان واحد." : "Three Lead-Free Cores. One Standard of Safety.";
  document.getElementById("materialsDesc").innerText = isAr ?
    "مستوحى من أعلى المعايير الطبية العالمية، يوفر GulfRay ثلاث مواد واقية خالية تماماً من الرصاص السام ومطابقة للمواصفات الدولية، ومحددة بالسمك المكافئ الصريح (mm Pb-eq)." :
    "Inspired by leading global shielding science, GulfRay offers three verified lead-free attenuation cores. All three are 100% toxic-lead-free, compliant with international standards, and specified in true mm lead equivalence (Pb-eq).";

  document.getElementById("umBadge").innerText = isAr ? "UM · الأخف وزناً على الإطلاق" : "UM · Ultra-Lightest";
  document.getElementById("umSub").innerText = isAr ? "أخف بنسبة 28% من الرصاص التقليدي" : "About 28% lighter than traditional lead";
  document.getElementById("nplBadge").innerText = isAr ? "NPL · معتمد بالحزمة العريضة" : "NPL · Broad-Beam UK Verified";
  document.getElementById("nplSub").innerText = isAr ? "المعيار الذهبي بهندسة الحزمة العريضة" : "Broad-beam gold-standard geometry";
  document.getElementById("mlBadge").innerText = isAr ? "ML · الخيار الاقتصادي الأعلى قيمة" : "ML · Most Economical";
  document.getElementById("mlSub").innerText = isAr ? "أعلى كفاءة لميزانيات المستشفيات الكبيرة" : "Accessible price for larger departments";

  // RFQ Builder Section
  document.getElementById("rfqTag").innerText = isAr ? "نظام طلب عروض الأسعار التفاعلي" : "INTERACTIVE B2B SPECIFIER";
  document.getElementById("rfqTitle").innerText = isAr ? "مُنشئ مواصفات عرض السعر المخصص" : "Bespoke RFQ Configurator";
  document.getElementById("rfqDesc").innerText = isAr ?
    "حدد موديل الرداء الطبي، نوع المادة الواقية، سمك الحماية، تطريز السدو، وشعار المستشفى. الموقع لا يحتوي على أي أسعار؛ مواصفاتك المعتمدة تُرسل فوراً إلى فريق المبيعات الهندسي." :
    "Select your garment style, core material, lead thickness, bespoke Saudi embroidery, and hospital logo. Zero financial calculations; your custom specification is dispatched directly to our medical sales team.";

  document.getElementById("step1Title").innerText = isAr ? "1. الموديل والشكل الطبي" : "1. Garment Style & Format";
  document.getElementById("step2Title").innerText = isAr ? "2. نوع المادة الواقية الخالية من الرصاص" : "2. Protective Core Material";
  document.getElementById("step3Title").innerText = isAr ? "3. سمك الرصاص المكافئ (Pb-eq)" : "3. Lead Equivalence (Pb-eq)";
  document.getElementById("step4Title").innerText = isAr ? "4. اللون، القماش ونقشة السدو" : "4. Fabric Color & Pattern";
  document.getElementById("step5Title").innerText = isAr ? "5. المقاس والجنس" : "5. Sizing & Cut";
  document.getElementById("step6Title").innerText = isAr ? "6. التخصيص الفاخر (اختياري)" : "6. Bespoke Personalization (Optional)";

  document.getElementById("lblEmbroidery").innerText = isAr ? "🧵 اسم الطبيب أو القسم للتطريز:" : "🧵 Embroidered Physician or Department Name:";
  document.getElementById("lblLogo").innerText = isAr ? "📎 إرفاق شعار المستشفى / المركز الطبي:" : "📎 Upload Hospital / Healthcare Center Logo:";
  document.getElementById("lblQuantity").innerText = isAr ? "الكمية المطلوبة (بالقطعة):" : "Quantity (Units):";
  document.getElementById("btnAddRfqText").innerText = isAr ? "➕ إضافة هذه المواصفات إلى سلة الاستفسار" : "➕ Add Configuration to RFQ Basket";
  document.getElementById("btnViewRfqNow").innerText = isAr ? "مراجعة وإرسال سلة عرض السعر (RFQ) →" : "Review & Submit RFQ Basket →";

  // Modal
  document.getElementById("modalRfqTitle").innerText = isAr ? "طلب عرض السعر الرسمي (RFQ)" : "Official Request for Quotation (RFQ)";
  document.getElementById("modalPolicyTitle").innerText = isAr ? "ℹ️ سياسة التوريد بدون أسعار:" : "ℹ️ Procurement Policy Note:";
  document.getElementById("modalPolicyDesc").innerText = isAr ? 
    " هذا النظام مخصص لإصدار وتوثيق المواصفات الفنية لطلبات عروض الأسعار. سيقوم فريق مبيعات GulfRay بإرسال عرض السعر المالي المعتمد شاملاً خصومات الكميات ومدة التوريد." :
    " This portal generates certified technical RFQs. Official commercial quotations with institutional volume discounts and delivery timelines will be officially dispatched by GulfRay sales engineers.";

  document.getElementById("btnSubmitRfq").innerText = isAr ? "🚀 إرسال طلب عرض السعر الرسمي" : "🚀 Submit Request for Quotation (RFQ)";
}
