// ==========================================================================
// GulfRay® Medical - Ultra-HD Photorealistic 360° Studio Turntable Engine
// Authentic 2027 Catalogue Studio Photography with Real-time 3D Foreshortening
// Automotive-Grade Real-Time Material & Pattern Synthesizer
// ==========================================================================

const apron3D = {
  initialized: false,
  container: null,
  stage: null,
  plane: null,
  img: null,
  pocketOverlay: null,
  embNameOverlay: null,
  embSpecOverlay: null,
  anglePill: null,
  hudFabricDot: null,
  hudFabricText: null,
  hudCoreText: null,
  
  // Real Studio Asset Pairs
  activeFrontSrc: '/images/studio360/fullwrap_green_front_framed.jpg',
  activeBackSrc: '/images/studio360/fullwrap_green_back_clean.jpg',
  activeFrontDisplay: '/images/studio360/fullwrap_green_front_framed.jpg',
  activeBackDisplay: '/images/studio360/fullwrap_green_back_clean.jpg',
  
  // Interaction & Turntable State
  currentAngle: 0,
  targetAngle: 0,
  isDragging: false,
  startX: 0,
  autoSpin: true,
  zoomLevel: 1.0,
  viewMode: '3d', // '3d' or 'photo'
  animId: null,
  
  // Caching
  tintCache: new Map(),
  currentConfig: null
};

// ==========================================================================
// 1. Initialization & DOM Setup
// ==========================================================================
function initApron3DViewer(canvasId, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  apron3D.container = container;

  // Cache elements
  apron3D.stage = document.getElementById('turntableStage');
  apron3D.plane = document.getElementById('mannequinPlane');
  apron3D.img = document.getElementById('apronStudioImg');
  apron3D.pocketOverlay = document.getElementById('pocketOverlay');
  apron3D.embNameOverlay = document.getElementById('embNameOverlay');
  apron3D.embSpecOverlay = document.getElementById('embSpecOverlay');
  apron3D.anglePill = document.getElementById('apron3DAnglePill');
  apron3D.hudFabricDot = document.getElementById('hudFabricDot');
  apron3D.hudFabricText = document.getElementById('hudFabricText');
  apron3D.hudCoreText = document.getElementById('hudCoreText');

  // Attach Mouse, Touch, & Wheel Zoom Listeners
  setupTurntableInteraction(container);

  apron3D.initialized = true;

  // Start Animation Loop
  if (!apron3D.animId) {
    apron3D.animId = requestAnimationFrame(turntableLoop);
  }

  // Initial render
  updateTurntableRender();
}

// ==========================================================================
// 2. Interaction: Drag, Touch, Wheel Zoom & Angle Controls
// ==========================================================================
function setupTurntableInteraction(container) {
  // Mouse Drag
  container.addEventListener('mousedown', (e) => {
    // Ignore clicks on control buttons
    if (e.target.closest('.apron-3d-controls') || e.target.closest('.apron-hud-overlay')) return;
    apron3D.isDragging = true;
    apron3D.autoSpin = false;
    updateSpinButtonState();
    apron3D.startX = e.clientX;
  });

  window.addEventListener('mousemove', (e) => {
    if (!apron3D.isDragging) return;
    const delta = e.clientX - apron3D.startX;
    apron3D.startX = e.clientX;
    apron3D.currentAngle += delta * 0.85;
    updateTurntableRender();
  });

  window.addEventListener('mouseup', () => {
    apron3D.isDragging = false;
  });

  // Touch Drag (Mobile / Tablets)
  container.addEventListener('touchstart', (e) => {
    if (e.target.closest('.apron-3d-controls') || e.target.closest('.apron-hud-overlay')) return;
    if (e.touches.length === 1) {
      apron3D.isDragging = true;
      apron3D.autoSpin = false;
      updateSpinButtonState();
      apron3D.startX = e.touches[0].clientX;
    }
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (!apron3D.isDragging || e.touches.length !== 1) return;
    const delta = e.touches[0].clientX - apron3D.startX;
    apron3D.startX = e.touches[0].clientX;
    apron3D.currentAngle += delta * 0.85;
    updateTurntableRender();
  }, { passive: true });

  window.addEventListener('touchend', () => {
    apron3D.isDragging = false;
  });

  // Mouse Wheel Smooth Zoom (Automotive Configurator Feature)
  container.addEventListener('wheel', (e) => {
    e.preventDefault();
    const delta = e.deltaY < 0 ? 0.08 : -0.08;
    zoomApron(delta);
  }, { passive: false });
}

// ==========================================================================
// 3. Render Loop & 3D Perspective Transformations
// ==========================================================================
function turntableLoop() {
  if (apron3D.autoSpin && !apron3D.isDragging) {
    apron3D.currentAngle += 0.38; // Smooth cinematic studio spin
    updateTurntableRender();
  }
  apron3D.animId = requestAnimationFrame(turntableLoop);
}

function updateTurntableRender() {
  if (!apron3D.stage || !apron3D.img) return;

  const normAngle = ((apron3D.currentAngle % 360) + 360) % 360;
  const rad = normAngle * Math.PI / 180;

  // Realistic 3D perspective foreshortening with anatomical mannequin depth
  const cosVal = Math.cos(rad);
  const absCos = Math.abs(cosVal);
  const scaleX = 0.38 + 0.62 * absCos; // Natural human profile depth at 90°
  const skewY = Math.sin(rad) * -3.2;
  const rotY = Math.sin(rad) * 16;

  // Front vs Back swap at 90° and 270°
  const isBack = (normAngle > 90 && normAngle < 270);
  const targetSrc = isBack ? apron3D.activeBackDisplay : apron3D.activeFrontDisplay;

  if (apron3D.img.getAttribute('src') !== targetSrc) {
    apron3D.img.src = targetSrc;
  }

  // Pocket Embroidery badge visibility & foreshortening
  if (apron3D.pocketOverlay) {
    apron3D.pocketOverlay.style.display = isBack ? 'none' : 'flex';
    if (!isBack) {
      apron3D.pocketOverlay.style.transform = `translate(-50%, -50%) scaleX(${scaleX}) skewY(${skewY}deg)`;
    }
  }

  // Apply 3D perspective + Zoom transform to turntable stage
  const zoom = apron3D.zoomLevel || 1.0;
  apron3D.stage.style.transform = `scale(${zoom}) scaleX(${scaleX}) rotateY(${rotY}deg) skewY(${skewY}deg)`;

  // Update Floor Shadow perspective
  const shadow = document.querySelector('.pedestal-floor-shadow');
  if (shadow) {
    const shadowScale = (0.75 + 0.25 * absCos) * zoom;
    shadow.style.transform = `translateX(-50%) scale(${shadowScale})`;
    shadow.style.opacity = `${0.35 + 0.15 * absCos}`;
  }

  // Update Angle HUD
  updateAnglePill(normAngle);
}

function updateAnglePill(normAngle) {
  const isAr = (typeof currentLang !== "undefined" && currentLang === "ar") ||
               (document.documentElement.getAttribute("dir") === "rtl");

  let desc = isAr ? "الواجهة الأمامية" : "Front View";
  if (normAngle >= 30 && normAngle < 65) {
    desc = isAr ? "زاوية 45° مجسمة" : "45° 3D Profile";
  } else if (normAngle >= 65 && normAngle < 125) {
    desc = isAr ? "الجانب الأيمن (90°)" : "Right Profile (90°)";
  } else if (normAngle >= 125 && normAngle < 235) {
    desc = isAr ? "حماية الظهر (180°)" : "Back Shielding (180°)";
  } else if (normAngle >= 235 && normAngle < 295) {
    desc = isAr ? "الجانب الأيسر (270°)" : "Left Profile (270°)";
  } else if (normAngle >= 295 && normAngle < 330) {
    desc = isAr ? "زاوية خلفية مجسمة" : "Three-Quarter View";
  }

  const degText = `${Math.round(normAngle)}° · ${desc}`;

  // Update Pill at top of switch bar
  const angleEl = apron3D.anglePill || document.getElementById('apron3DAnglePill');
  if (angleEl) angleEl.innerText = degText;

  // Update HUD text inside viewport
  const hudAngle = document.getElementById('hudAngleText');
  if (hudAngle) hudAngle.innerText = degText;

  // Update Snap Buttons active class
  updateActiveSnapButton(Math.round(normAngle));
}

function updateActiveSnapButton(deg) {
  ['btnAngleFront', 'btnAngleQuarter', 'btnAngleSide', 'btnAngleBack'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.remove('active');
  });

  if ((deg <= 15 || deg >= 345) && document.getElementById('btnAngleFront')) {
    document.getElementById('btnAngleFront').classList.add('active');
  } else if ((deg >= 35 && deg <= 60) && document.getElementById('btnAngleQuarter')) {
    document.getElementById('btnAngleQuarter').classList.add('active');
  } else if ((deg >= 75 && deg <= 105) && document.getElementById('btnAngleSide')) {
    document.getElementById('btnAngleSide').classList.add('active');
  } else if ((deg >= 165 && deg <= 195) && document.getElementById('btnAngleBack')) {
    document.getElementById('btnAngleBack').classList.add('active');
  }
}

// Snap Angle Controls
function setApronAngle(deg) {
  apron3D.autoSpin = false;
  updateSpinButtonState();
  apron3D.currentAngle = deg;
  updateTurntableRender();
}

function toggleApronAutoSpin() {
  apron3D.autoSpin = !apron3D.autoSpin;
  updateSpinButtonState();
}

function updateSpinButtonState() {
  const btn = document.getElementById("btn3DAutoSpin");
  if (!btn) return;
  if (apron3D.autoSpin) {
    btn.classList.add("active");
  } else {
    btn.classList.remove("active");
  }
}

// Zoom Controls (Car Configurator Feature)
function zoomApron(delta) {
  apron3D.zoomLevel = Math.min(2.1, Math.max(0.75, (apron3D.zoomLevel || 1.0) + delta));
  updateTurntableRender();
  updateZoomLabel();
}

function resetApronZoom() {
  apron3D.zoomLevel = 1.0;
  apron3D.currentAngle = 0;
  updateTurntableRender();
  updateZoomLabel();
}

function updateZoomLabel() {
  const lbl = document.getElementById('hudZoomLevel');
  if (lbl) {
    lbl.innerText = `${Math.round(apron3D.zoomLevel * 100)}%`;
  }
}

function togglePreviewMode(mode) {
  apron3D.viewMode = mode;
  const box3D = document.getElementById("apron3DViewportBox");
  const imgPhoto = document.getElementById("summaryImg");
  const btn3D = document.getElementById("btnViewMode3D");
  const btnPhoto = document.getElementById("btnViewModePhoto");

  if (mode === "3d") {
    if (box3D) box3D.style.display = "block";
    if (imgPhoto) imgPhoto.style.display = "none";
    if (btn3D) btn3D.classList.add("active");
    if (btnPhoto) btnPhoto.classList.remove("active");
  } else {
    if (box3D) box3D.style.display = "none";
    if (imgPhoto) imgPhoto.style.display = "block";
    if (btn3D) btn3D.classList.remove("active");
    if (btnPhoto) btnPhoto.classList.add("active");
  }
}

// ==========================================================================
// 4. Dynamic Model & Material Synthesizer
// ==========================================================================
function updateApron3DModel(config) {
  if (!config) return;
  apron3D.currentConfig = config;

  // 1. Garment Style & Real Base Studio Photography
  const cat = (config.category || "").toLowerCase();
  const col = (config.collection || "").toLowerCase();
  const colName = (config.color || "").toLowerCase();
  const isLavender = col.includes("lavender") || colName.includes("lavender") || (config.color_hex && config.color_hex.toLowerCase() === "#684f8c");
  const hasPattern = (config.pattern_code && config.pattern_code !== "None" && config.pattern_code !== "");

  let frontAsset = '/images/studio360/fullwrap_green_front_framed.jpg';
  let backAsset = '/images/studio360/fullwrap_green_back_clean.jpg';

  if (cat.includes("frontal")) {
    frontAsset = '/images/studio360/frontal_green_front_framed.jpg';
    backAsset = '/images/studio360/frontal_green_back_framed.jpg';
  } else if (cat.includes("vest") || cat.includes("skirt")) {
    frontAsset = '/images/studio360/vestskirt_green_front_framed.jpg';
    backAsset = '/images/studio360/vestskirt_green_back_framed.jpg';
  } else {
    frontAsset = '/images/studio360/fullwrap_green_front_framed.jpg';
    backAsset = '/images/studio360/fullwrap_green_back_clean.jpg';
  }

  apron3D.activeFrontSrc = frontAsset;
  apron3D.activeBackSrc = backAsset;

  // 2. Pattern Accent vs Solid Color Synthesizer
  const targetHex = (config.fabric_mode === "custom_codes" && config.fabric_hex) ? config.fabric_hex : config.color_hex;

  if (hasPattern) {
    // Look up pattern image URL (e.g. P68 -> /images/fabrics/P68_teal_abstract.jpg)
    const patternUrl = getPatternImageUrl(config.pattern_code);
    if (patternUrl) {
      applyPatternToAssets(frontAsset, backAsset, patternUrl);
    } else {
      apron3D.activeFrontDisplay = frontAsset;
      apron3D.activeBackDisplay = backAsset;
      updateTurntableRender();
    }
  } else if (isLavender) {
    // Authentic Lavender Studio Photography
    if (cat.includes("vest") || cat.includes("skirt")) {
      apron3D.activeFrontDisplay = '/images/studio360/vestskirt_lavender_front_framed.jpg';
      apron3D.activeBackDisplay = backAsset;
    } else {
      apron3D.activeFrontDisplay = '/images/studio360/fullwrap_lavender_front_framed.jpg';
      apron3D.activeBackDisplay = backAsset;
    }
    updateTurntableRender();
  } else if (targetHex && targetHex.toLowerCase() !== "#006c35" && targetHex.toLowerCase() !== "#234a3c") {
    // Authentic Solid Color Dynamic Tinting (F-01 to F-25)
    applyDynamicFabricTint(frontAsset, backAsset, targetHex);
  } else {
    // Default Official Saudi Green Studio
    apron3D.activeFrontDisplay = frontAsset;
    apron3D.activeBackDisplay = backAsset;
    updateTurntableRender();
  }

  // 3. Update HUD & Floating Pocket Certification Tag
  updateStudioHUD(config, targetHex, hasPattern);
}

// Pattern Lookup Helper
function getPatternImageUrl(patternCode) {
  if (!patternCode || patternCode === "None") return null;
  
  // Specific pattern dictionary
  const patternMap = {
    'P08': '/images/fabrics/P08_sunflower.jpg',
    'P17': '/images/fabrics/P17_eucalyptus.jpg',
    'P18': '/images/fabrics/P18_spring_flora.jpg',
    'P19': '/images/fabrics/P19_abstract_botanical.jpg',
    'P20': '/images/fabrics/P20_watercolour_wave.jpg',
    'P21': '/images/fabrics/P21_lavender_sketch.jpg',
    'P22': '/images/fabrics/P22_micro_floral.jpg',
    'P23': '/images/fabrics/P23_geometric_lattice.jpg',
    'P40': '/images/fabrics/P40_blue_camo.jpg',
    'P41': '/images/fabrics/P41_grey_digital_camo.jpg',
    'P68': '/images/fabrics/P68_teal_abstract.jpg'
  };

  if (patternMap[patternCode]) return patternMap[patternCode];

  // Fallback to FABRIC_REFERENCE if available
  if (typeof FABRIC_REFERENCE !== "undefined" && FABRIC_REFERENCE.printed_fabrics) {
    const found = FABRIC_REFERENCE.printed_fabrics.find(p => p.code === patternCode);
    if (found && found.image) return found.image;
  }

  return `/images/fabrics/${patternCode}_teal_abstract.jpg`;
}

// ==========================================================================
// 5. Pattern Compositor Engine (HTML5 Canvas)
// Wraps pattern seamlessly around 3D folds, shadows & contours
// ==========================================================================
function applyPatternToAssets(frontSrc, backSrc, patternUrl) {
  compositePatternOnSingleAsset(frontSrc, patternUrl, (frontDataUrl) => {
    apron3D.activeFrontDisplay = frontDataUrl;
    updateTurntableRender();
  });

  compositePatternOnSingleAsset(backSrc, patternUrl, (backDataUrl) => {
    apron3D.activeBackDisplay = backDataUrl;
    updateTurntableRender();
  });
}

function compositePatternOnSingleAsset(srcUrl, patternUrl, callback) {
  const cacheKey = `${srcUrl}__pattern__${patternUrl}`;
  if (apron3D.tintCache.has(cacheKey)) {
    callback(apron3D.tintCache.get(cacheKey));
    return;
  }

  const baseImg = new Image();
  baseImg.crossOrigin = "anonymous";
  baseImg.onload = () => {
    const patImg = new Image();
    patImg.crossOrigin = "anonymous";
    patImg.onload = () => {
      try {
        const c = document.createElement('canvas');
        c.width = baseImg.naturalWidth || 640;
        c.height = baseImg.naturalHeight || 800;
        const ctx = c.getContext('2d');
        ctx.drawImage(baseImg, 0, 0);

        const imgData = ctx.getImageData(0, 0, c.width, c.height);
        const data = imgData.data;

        // Create offscreen canvas for repeating pattern tile
        const patCanvas = document.createElement('canvas');
        patCanvas.width = c.width;
        patCanvas.height = c.height;
        const patCtx = patCanvas.getContext('2d');

        // Scale pattern tile to realistic garment scale (140px width per motif)
        const patW = patImg.naturalWidth || 200;
        const patH = patImg.naturalHeight || 200;
        const scale = 140 / patW;
        const scaledW = Math.max(90, Math.round(patW * scale));
        const scaledH = Math.max(90, Math.round(patH * scale));

        for (let x = 0; x < c.width; x += scaledW) {
          for (let y = 0; y < c.height; y += scaledH) {
            patCtx.drawImage(patImg, x, y, scaledW, scaledH);
          }
        }

        const patData = patCtx.getImageData(0, 0, c.width, c.height).data;

        // Composite pattern onto fabric mask
        const len = data.length;
        for (let i = 0; i < len; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          // Background is warm white/cream: r > 215 && g > 210 && b > 205
          const isBg = (r > 215 && g > 210 && b > 205);
          const lum = 0.299 * r + 0.587 * g + 0.114 * b;
          const isGreenFabric = (g > 25 && g > r * 1.02 && g > b * 1.02 && lum < 200);

          if (isGreenFabric && !isBg) {
            const pr = patData[i];
            const pg = patData[i + 1];
            const pb = patData[i + 2];

            // Luminance factor wraps pattern naturally across folds & shadows
            const lumFactor = Math.min(2.1, Math.max(0.18, lum / 55.0));
            data[i]     = Math.min(255, Math.max(0, Math.round(pr * lumFactor * 0.95)));
            data[i + 1] = Math.min(255, Math.max(0, Math.round(pg * lumFactor * 0.95)));
            data[i + 2] = Math.min(255, Math.max(0, Math.round(pb * lumFactor * 0.95)));
          }
        }

        ctx.putImageData(imgData, 0, 0);
        const resultUrl = c.toDataURL('image/jpeg', 0.92);
        apron3D.tintCache.set(cacheKey, resultUrl);
        callback(resultUrl);
      } catch (err) {
        console.warn("Pattern composite error:", err);
        callback(srcUrl);
      }
    };
    patImg.onerror = () => callback(srcUrl);
    patImg.src = patternUrl;
  };
  baseImg.onerror = () => callback(srcUrl);
  baseImg.src = srcUrl;
}

// ==========================================================================
// 6. Solid Color Tinting Engine (HTML5 Canvas)
// Preserves 100% of authentic folds, shadows, stitching, and pedestal
// ==========================================================================
function applyDynamicFabricTint(frontSrc, backSrc, hexColor) {
  tintSingleAsset(frontSrc, hexColor, (tintedFront) => {
    apron3D.activeFrontDisplay = tintedFront;
    updateTurntableRender();
  });

  tintSingleAsset(backSrc, hexColor, (tintedBack) => {
    apron3D.activeBackDisplay = tintedBack;
    updateTurntableRender();
  });
}

function tintSingleAsset(srcUrl, hexColor, callback) {
  const cacheKey = `${srcUrl}__color__${hexColor}`;
  if (apron3D.tintCache.has(cacheKey)) {
    callback(apron3D.tintCache.get(cacheKey));
    return;
  }

  const img = new Image();
  img.crossOrigin = "anonymous";
  img.onload = () => {
    try {
      const c = document.createElement('canvas');
      c.width = img.naturalWidth || 640;
      c.height = img.naturalHeight || 800;
      const ctx = c.getContext('2d');
      ctx.drawImage(img, 0, 0);

      const imgData = ctx.getImageData(0, 0, c.width, c.height);
      const data = imgData.data;

      const rgb = parseHexColor(hexColor);
      const maxTarget = Math.max(rgb.r, rgb.g, rgb.b, 1);
      const normR = rgb.r / maxTarget;
      const normG = rgb.g / maxTarget;
      const normB = rgb.b / maxTarget;
      const isDark = (rgb.r * 0.299 + rgb.g * 0.587 + rgb.b * 0.114) < 65;

      const len = data.length;
      for (let i = 0; i < len; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const lum = 0.299 * r + 0.587 * g + 0.114 * b;
        const isBg = (r > 215 && g > 210 && b > 205);

        // Green fabric mask
        if (g > 25 && g > r * 1.02 && g > b * 1.02 && lum < 200 && !isBg) {
          const lumFactor = lum / 65.0;
          if (isDark) {
            // For dark colors (Black, Charcoal, Navy), retain specular highlights
            data[i]     = Math.min(255, Math.max(0, Math.round(rgb.r * 0.35 + lumFactor * 22.0)));
            data[i + 1] = Math.min(255, Math.max(0, Math.round(rgb.g * 0.35 + lumFactor * 22.0)));
            data[i + 2] = Math.min(255, Math.max(0, Math.round(rgb.b * 0.35 + lumFactor * 22.0)));
          } else {
            data[i]     = Math.min(255, Math.max(0, Math.round(normR * lumFactor * rgb.r * 0.95)));
            data[i + 1] = Math.min(255, Math.max(0, Math.round(normG * lumFactor * rgb.g * 0.95)));
            data[i + 2] = Math.min(255, Math.max(0, Math.round(normB * lumFactor * rgb.b * 0.95)));
          }
        }
      }

      ctx.putImageData(imgData, 0, 0);
      const resultDataUrl = c.toDataURL('image/jpeg', 0.92);
      apron3D.tintCache.set(cacheKey, resultDataUrl);
      callback(resultDataUrl);
    } catch (e) {
      console.warn("Cloth tinting error, falling back to base photo:", e);
      callback(srcUrl);
    }
  };
  img.onerror = () => callback(srcUrl);
  img.src = srcUrl;
}

function parseHexColor(hex) {
  let c = (hex || '#006C35').replace('#', '');
  if (c.length === 3) c = c.split('').map(x => x + x).join('');
  const num = parseInt(c, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255
  };
}

// ==========================================================================
// 7. Interactive Live HUD & Pocket Certification Tag
// ==========================================================================
function updateStudioHUD(config, targetHex, hasPattern) {
  const isAr = (typeof currentLang !== "undefined" && currentLang === "ar") ||
               (document.documentElement.getAttribute("dir") === "rtl");

  // 1. Update Chest Pocket Tag
  if (apron3D.embNameOverlay) {
    const catObj = (typeof CATALOG_DATA !== "undefined" && CATALOG_DATA.categories) ? 
      CATALOG_DATA.categories.find(c => c.id === config.category) : null;
    apron3D.embNameOverlay.innerText = catObj ? (isAr ? catObj.name_ar.split('(')[0] : catObj.name_en.split('(')[0]) : "GULFRAY® SURGICAL";
  }
  if (apron3D.embSpecOverlay) {
    const thick = config.thickness || "0.50 mm Pb";
    const core = (config.core_material || "UM").split('(')[0].trim();
    apron3D.embSpecOverlay.innerText = `${thick} · ${core}`;
  }
  if (apron3D.pocketOverlay) {
    if (targetHex && targetHex !== '#006C35') {
      apron3D.pocketOverlay.style.background = targetHex;
    } else {
      apron3D.pocketOverlay.style.background = 'rgba(0, 77, 37, 0.92)';
    }
  }

  // 2. Update In-Viewport HUD Overlay
  const hudFabricDot = document.getElementById('hudFabricDot');
  const hudFabricText = document.getElementById('hudFabricText');
  const hudCoreText = document.getElementById('hudCoreText');

  if (hudFabricText) {
    if (hasPattern) {
      hudFabricText.innerText = `${config.pattern_code} · ${config.pattern_name || 'Teal Abstract'}`;
    } else if (config.fabric_code) {
      hudFabricText.innerText = `${config.fabric_code} · ${config.fabric_name || config.color}`;
    } else {
      hudFabricText.innerText = config.color || "Saudi Green";
    }
  }

  if (hudFabricDot) {
    if (hasPattern) {
      const pUrl = getPatternImageUrl(config.pattern_code);
      hudFabricDot.style.backgroundImage = `url(${pUrl})`;
      hudFabricDot.style.backgroundSize = "cover";
    } else {
      hudFabricDot.style.backgroundImage = "none";
      hudFabricDot.style.backgroundColor = targetHex || "#006C35";
    }
  }

  if (hudCoreText) {
    const core = config.core_material || "UM (Ultra-Lightest)";
    const thick = config.thickness || "0.50 mm Pb";
    hudCoreText.innerText = `${core.split('(')[0]} · ${thick}`;
  }
}
