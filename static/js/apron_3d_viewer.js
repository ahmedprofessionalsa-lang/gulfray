// ==========================================================================
// GulfRay® Medical - Ultra-HD Photorealistic 360° Studio Turntable Engine
// Authentic 2027 Catalogue Studio Photography with Real-time 3D Foreshortening
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
  viewMode: '3d', // '3d' or 'photo'
  animId: null,
  
  // Caching
  tintCache: new Map(),
  currentConfig: null
};

// ==========================================================================
// Initialization
// ==========================================================================
function initApron3DViewer(canvasId, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  apron3D.container = container;

  // Build turntable DOM inside container if not already present
  ensureTurntableDOM(container);

  // Cache elements
  apron3D.stage = document.getElementById('turntableStage');
  apron3D.plane = document.getElementById('mannequinPlane');
  apron3D.img = document.getElementById('apronStudioImg');
  apron3D.pocketOverlay = document.getElementById('pocketOverlay');
  apron3D.embNameOverlay = document.getElementById('embNameOverlay');
  apron3D.embSpecOverlay = document.getElementById('embSpecOverlay');
  apron3D.anglePill = document.getElementById('apron3DAnglePill');

  // Attach Mouse & Touch Drag Listeners
  setupTurntableInteraction(container);

  apron3D.initialized = true;

  // Start Animation Loop
  if (!apron3D.animId) {
    apron3D.animId = requestAnimationFrame(turntableLoop);
  }

  // Initial render
  updateTurntableRender();
}

function ensureTurntableDOM(container) {
  // If stage already exists, nothing to do
  if (document.getElementById('turntableStage')) return;

  // Hide old canvas if present
  const oldCanvas = document.getElementById('apron3DCanvas');
  if (oldCanvas) {
    oldCanvas.style.display = 'none';
  }

  // Inject 3D Turntable Stage
  const stage = document.createElement('div');
  stage.id = 'turntableStage';
  stage.className = 'turntable-stage';
  stage.innerHTML = `
    <div class="mannequin-turntable-plane" id="mannequinPlane">
      <img id="apronStudioImg" class="turntable-mannequin-img" src="/images/studio360/fullwrap_green_front_framed.jpg" alt="GulfRay Real Studio Apron">
      <div class="pocket-embroidery-overlay" id="pocketOverlay">
        <span class="emb-gold-title" id="embNameOverlay">GULFRAY® SURGICAL</span>
        <span class="emb-gold-spec" id="embSpecOverlay">0.50 mm Pb · Ultra-Light</span>
      </div>
    </div>
  `;

  // Inject Floor Shadow
  const shadow = document.createElement('div');
  shadow.className = 'pedestal-floor-shadow';

  // Insert before controls
  const controls = container.querySelector('.apron-3d-controls');
  if (controls) {
    container.insertBefore(shadow, controls);
    container.insertBefore(stage, shadow);
  } else {
    container.appendChild(stage);
    container.appendChild(shadow);
  }
}

// ==========================================================================
// Interaction: Drag, Touch, Inertia & Angle Snapping
// ==========================================================================
function setupTurntableInteraction(container) {
  // Mouse Drag
  container.addEventListener('mousedown', (e) => {
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

  // Touch Drag
  container.addEventListener('touchstart', (e) => {
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
}

// Animation loop
function turntableLoop() {
  if (apron3D.autoSpin) {
    apron3D.currentAngle += 0.80;
    updateTurntableRender();
  }
  apron3D.animId = requestAnimationFrame(turntableLoop);
}

// 3D Perspective & Asset Update
function updateTurntableRender() {
  if (!apron3D.stage || !apron3D.img) return;

  const normAngle = ((apron3D.currentAngle % 360) + 360) % 360;
  const rad = normAngle * Math.PI / 180;

  // Realistic 3D perspective foreshortening with anatomical mannequin depth
  const cosVal = Math.cos(rad);
  const absCos = Math.abs(cosVal);
  const scaleX = 0.36 + 0.64 * absCos; // Natural human profile depth at 90°
  const skewY = Math.sin(rad) * -3.5;
  const rotY = Math.sin(rad) * 18;

  // Front vs Back swap at 90° and 270°
  const isBack = (normAngle > 90 && normAngle < 270);
  const targetSrc = isBack ? apron3D.activeBackDisplay : apron3D.activeFrontDisplay;

  if (apron3D.img.getAttribute('src') !== targetSrc) {
    apron3D.img.src = targetSrc;
  }

  // Pocket Embroidery foreshortening & back visibility
  if (apron3D.pocketOverlay) {
    apron3D.pocketOverlay.style.display = isBack ? 'none' : 'flex';
    if (!isBack) {
      apron3D.pocketOverlay.style.transform = `translate(-50%, -50%) scaleX(${scaleX}) skewY(${skewY}deg)`;
    }
  }

  // Apply 3D perspective transform
  apron3D.stage.style.transform = `scaleX(${scaleX}) rotateY(${rotY}deg) skewY(${skewY}deg)`;

  // Update Angle Pill
  updateAnglePill(normAngle);
}

function updateAnglePill(normAngle) {
  const angleEl = apron3D.anglePill || document.getElementById('apron3DAnglePill');
  if (!angleEl) return;

  const isAr = (typeof currentLang !== "undefined" && currentLang === "ar") ||
               (document.documentElement.getAttribute("dir") === "rtl");

  let desc = isAr ? "الواجهة الأمامية" : "Front View";
  if (normAngle >= 45 && normAngle < 135) {
    desc = isAr ? "الجانب الأيمن" : "Right Profile";
  } else if (normAngle >= 135 && normAngle < 225) {
    desc = isAr ? "حماية الظهر (360°)" : "Back Shielding (360°)";
  } else if (normAngle >= 225 && normAngle < 315) {
    desc = isAr ? "الجانب الأيسر" : "Left Profile";
  }

  angleEl.innerText = `${Math.round(normAngle)}° · ${desc}`;

  // Update Snap Buttons active class
  const rounded = Math.round(normAngle);
  updateActiveSnapButton(rounded);
}

function updateActiveSnapButton(deg) {
  ['btnAngleFront', 'btnAngleSide', 'btnAngleBack'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.remove('active');
  });

  if ((deg <= 10 || deg >= 350) && document.getElementById('btnAngleFront')) {
    document.getElementById('btnAngleFront').classList.add('active');
  } else if ((deg >= 80 && deg <= 100) && document.getElementById('btnAngleSide')) {
    document.getElementById('btnAngleSide').classList.add('active');
  } else if ((deg >= 170 && deg <= 190) && document.getElementById('btnAngleBack')) {
    document.getElementById('btnAngleBack').classList.add('active');
  }
}

// Snap Controls
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
// Dynamic Model Update on Configuration Change
// ==========================================================================
function updateApron3DModel(config) {
  if (!config) return;
  apron3D.currentConfig = config;

  // 1. Determine Garment Style & Real Studio Assets
  const cat = (config.category || "").toLowerCase();
  const col = (config.collection || "").toLowerCase();
  const colName = (config.color || "").toLowerCase();
  const isLavender = col.includes("lavender") || colName.includes("lavender") || (config.color_hex && config.color_hex.toLowerCase() === "#684f8c");
  const hasPattern = config.fabric_mode === "custom_codes" && config.pattern_code && config.pattern_code !== "None";

  let frontAsset = '/images/studio360/fullwrap_green_front_framed.jpg';
  let backAsset = '/images/studio360/fullwrap_green_back_clean.jpg';

  if (cat.includes("frontal")) {
    // Frontal Surgery Apron
    frontAsset = '/images/studio360/frontal_green_front_framed.jpg';
    backAsset = '/images/studio360/frontal_green_back_framed.jpg';
  } else if (cat.includes("vest") || cat.includes("skirt")) {
    // Vest & Skirt Style
    if (hasPattern) {
      frontAsset = '/images/studio360/vestskirt_pattern_front_framed.jpg';
      backAsset = '/images/studio360/vestskirt_pattern_back_framed.jpg';
    } else if (isLavender) {
      frontAsset = '/images/studio360/vestskirt_lavender_front_framed.jpg';
      backAsset = '/images/studio360/vestskirt_green_back_framed.jpg';
    } else {
      frontAsset = '/images/studio360/vestskirt_green_front_framed.jpg';
      backAsset = '/images/studio360/vestskirt_green_back_framed.jpg';
    }
  } else {
    // Full Overlap Wraparound (One-Piece)
    if (isLavender) {
      frontAsset = '/images/studio360/fullwrap_lavender_front_framed.jpg';
      backAsset = '/images/studio360/fullwrap_green_back_clean.jpg';
    } else {
      frontAsset = '/images/studio360/fullwrap_green_front_framed.jpg';
      backAsset = '/images/studio360/fullwrap_green_back_clean.jpg';
    }
  }

  apron3D.activeFrontSrc = frontAsset;
  apron3D.activeBackSrc = backAsset;

  // 2. Dynamic Color Tinting (for F-01 to F-25 and custom solid swatches)
  const isCustomSolid = (config.fabric_mode === "custom_codes" && (!config.pattern_code || config.pattern_code === "None")) ||
                        (!isLavender && config.color_hex && config.color_hex.toLowerCase() !== "#006c35" && config.color_hex.toLowerCase() !== "#234a3c");

  const targetHex = (config.fabric_mode === "custom_codes" && config.fabric_hex) ? config.fabric_hex : config.color_hex;

  if (isCustomSolid && targetHex && !hasPattern) {
    applyDynamicFabricTint(frontAsset, backAsset, targetHex);
  } else {
    apron3D.activeFrontDisplay = frontAsset;
    apron3D.activeBackDisplay = backAsset;
    updateTurntableRender();
  }

  // 3. Update Live Pocket Embroidery Overlay
  updatePocketEmbroideryOverlay(config, targetHex);
}

function updatePocketEmbroideryOverlay(config, targetHex) {
  const embInput = document.getElementById("inputEmbroidery");
  let text = embInput ? embInput.value.trim() : (config.embroidery || "");
  if (!text) {
    text = "GULFRAY® SURGICAL";
  }

  if (apron3D.embNameOverlay) {
    apron3D.embNameOverlay.innerText = text;
  }
  if (apron3D.embSpecOverlay) {
    const thick = config.thickness || "0.50 mm Pb";
    apron3D.embSpecOverlay.innerText = `${thick} · GulfRay`;
  }

  // Adjust pocket badge background to harmonize with garment
  if (apron3D.pocketOverlay) {
    if (targetHex && targetHex !== '#006C35') {
      apron3D.pocketOverlay.style.background = targetHex;
    } else {
      apron3D.pocketOverlay.style.background = 'rgba(0, 77, 37, 0.92)';
    }
  }
}

// ==========================================================================
// Ultra-Fast HTML5 Canvas Fabric Tinting Engine
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
  const cacheKey = `${srcUrl}__${hexColor}`;
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

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // Green fabric mask (Saudi Green)
        if (g > 35 && g > r * 1.05 && g > b * 1.05 && r < 185 && b < 185) {
          const lum = (r * 0.299 + g * 0.587 + b * 0.114) / 100.0;
          data[i]     = Math.min(255, Math.max(0, normR * lum * 120.0));
          data[i + 1] = Math.min(255, Math.max(0, normG * lum * 120.0));
          data[i + 2] = Math.min(255, Math.max(0, normB * lum * 120.0));
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
