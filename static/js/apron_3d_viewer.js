// ==========================================================================
// GulfRay® Medical - Interactive 360° 3D Apron Turntable Visualizer
// Real-time procedural 3D mannequin & garment engine with Three.js
// ==========================================================================

let apron3D = {
  initialized: false,
  scene: null,
  camera: null,
  renderer: null,
  modelGroup: null,
  garmentGroup: null,
  mannequinGroup: null,
  pocketMesh: null,
  pocketTexture: null,
  pocketCanvas: null,
  pocketCtx: null,
  
  // Materials
  primaryMat: null,
  accentMat: null,
  trimMat: null,
  beltMat: null,
  mannequinMat: null,
  pedestalMat: null,
  
  // Meshes
  chestMesh: null,
  backShieldMesh: null,
  frontFlapMesh: null,
  leftShoulderMesh: null,
  rightShoulderMesh: null,
  collarMesh: null,
  pipeCollarMesh: null,
  beltMesh: null,
  buckleMesh: null,
  skirtMesh: null,
  skirtFlapMesh: null,
  zipperMesh: null,
  crossStrapsMesh: null,
  
  // Interaction State
  isDragging: false,
  prevMouseX: 0,
  prevMouseY: 0,
  targetRotY: 0,
  targetRotX: 0.05,
  autoSpin: true,
  viewMode: '3d', // '3d' or 'photo'
  
  // Pattern texture cache
  textureLoader: null,
  cachedTextures: {}
};

function initApron3DViewer(canvasId, containerId) {
  const container = document.getElementById(containerId);
  const canvas = document.getElementById(canvasId);
  if (!container || !canvas) return;

  const width = container.clientWidth || 380;
  const height = container.clientHeight || 440;

  // 1. Scene
  apron3D.scene = new THREE.Scene();

  // 2. Camera (Sculpted angle for full mannequin view)
  apron3D.camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
  apron3D.camera.position.set(0, -0.06, 5.0);

  // 3. Renderer with Antialiasing
  apron3D.renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true,
    powerPreference: "high-performance"
  });
  apron3D.renderer.setSize(width, height);
  apron3D.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  apron3D.renderer.shadowMap.enabled = true;
  apron3D.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  // 4. Studio 3-Point Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
  apron3D.scene.add(ambientLight);

  const keyLight = new THREE.DirectionalLight(0xffffff, 0.85);
  keyLight.position.set(3, 4, 3.5);
  keyLight.castShadow = true;
  apron3D.scene.add(keyLight);

  const fillLight = new THREE.DirectionalLight(0xe2e8f0, 0.45);
  fillLight.position.set(-3, 2, 2);
  apron3D.scene.add(fillLight);

  const rimLight = new THREE.DirectionalLight(0xc5a869, 0.65); // Saudi Gold rim
  rimLight.position.set(0, 3, -4);
  apron3D.scene.add(rimLight);

  // 5. Root Group
  apron3D.modelGroup = new THREE.Group();
  apron3D.scene.add(apron3D.modelGroup);

  apron3D.mannequinGroup = new THREE.Group();
  apron3D.modelGroup.add(apron3D.mannequinGroup);

  apron3D.garmentGroup = new THREE.Group();
  apron3D.modelGroup.add(apron3D.garmentGroup);

  apron3D.textureLoader = new THREE.TextureLoader();

  // 6. Build Pedestal Stand & Mannequin Body
  buildPedestalAndMannequin();

  // 7. Build Apron Garment Meshes
  buildApronMeshes();

  // 8. Event Listeners for 360 Drag & Touch
  setupInteractionEvents(container);

  apron3D.initialized = true;

  // 9. Initial configuration sync
  if (typeof currentConfig !== "undefined") {
    updateApron3DModel(currentConfig);
  }

  // 10. Immediate synchronous first frame render
  if (apron3D.renderer && apron3D.scene && apron3D.camera) {
    apron3D.renderer.render(apron3D.scene, apron3D.camera);
  }

  // 11. Start Animation Loop
  animate3D();
}

function buildPedestalAndMannequin() {
  // Pedestal Disk
  apron3D.pedestalMat = new THREE.MeshStandardMaterial({
    color: 0x1e293b,
    metalness: 0.8,
    roughness: 0.25
  });
  const baseGeo = new THREE.CylinderGeometry(0.72, 0.78, 0.06, 40);
  const base = new THREE.Mesh(baseGeo, apron3D.pedestalMat);
  base.position.y = -1.65;
  apron3D.mannequinGroup.add(base);

  // Gold Trim Ring around Base
  const ringGeo = new THREE.TorusGeometry(0.74, 0.015, 16, 48);
  const goldMat = new THREE.MeshStandardMaterial({ color: 0xc5a869, metalness: 0.9, roughness: 0.2 });
  const ring = new THREE.Mesh(ringGeo, goldMat);
  ring.rotation.x = Math.PI / 2;
  ring.position.y = -1.62;
  apron3D.mannequinGroup.add(ring);

  // Chrome / Gold Center Pole
  const poleGeo = new THREE.CylinderGeometry(0.035, 0.035, 0.85, 20);
  const pole = new THREE.Mesh(poleGeo, goldMat);
  pole.position.y = -1.22;
  apron3D.mannequinGroup.add(pole);

  // Mannequin Torso & Neck
  apron3D.mannequinMat = new THREE.MeshStandardMaterial({
    color: 0xf1f5f9,
    roughness: 0.35,
    metalness: 0.05
  });

  const neckGeo = new THREE.CylinderGeometry(0.18, 0.22, 0.35, 32);
  const neck = new THREE.Mesh(neckGeo, apron3D.mannequinMat);
  neck.position.y = 0.95;
  apron3D.mannequinGroup.add(neck);

  const headCapGeo = new THREE.SphereGeometry(0.18, 24, 16, 0, Math.PI * 2, 0, Math.PI * 0.5);
  const headCap = new THREE.Mesh(headCapGeo, apron3D.mannequinMat);
  headCap.position.y = 1.12;
  apron3D.mannequinGroup.add(headCap);
}

function buildApronMeshes() {
  // Materials
  apron3D.primaryMat = new THREE.MeshStandardMaterial({
    color: 0x006C35, // Saudi Green default
    roughness: 0.55,
    metalness: 0.06
  });

  apron3D.accentMat = new THREE.MeshStandardMaterial({
    color: 0xE7D8C9, // Warm Ivory default
    roughness: 0.6,
    metalness: 0.05
  });

  apron3D.trimMat = new THREE.MeshStandardMaterial({
    color: 0xc5a869, // Gold piping default
    metalness: 0.85,
    roughness: 0.25
  });

  apron3D.beltMat = new THREE.MeshStandardMaterial({
    color: 0x0f172a, // Black technical belt
    roughness: 0.85
  });

  // 1. Vest Torso Front (Anatomical curved front)
  const chestGeo = new THREE.CylinderGeometry(0.55, 0.48, 0.95, 36, 1, false, 0, Math.PI * 2);
  apron3D.chestMesh = new THREE.Mesh(chestGeo, apron3D.primaryMat);
  apron3D.chestMesh.position.y = 0.45;
  apron3D.garmentGroup.add(apron3D.chestMesh);

  // 2. Back Shielding Panel (360 spine & kidney protection)
  const backGeo = new THREE.CylinderGeometry(0.54, 0.47, 0.93, 36, 1, false, Math.PI * 0.75, Math.PI * 0.5);
  apron3D.backShieldMesh = new THREE.Mesh(backGeo, apron3D.primaryMat);
  apron3D.backShieldMesh.position.y = 0.45;
  apron3D.garmentGroup.add(apron3D.backShieldMesh);

  // 3. Ergonomic Shoulder Pads (Left & Right)
  const leftShoulderGeo = new THREE.BoxGeometry(0.38, 0.12, 0.38);
  apron3D.leftShoulderMesh = new THREE.Mesh(leftShoulderGeo, apron3D.primaryMat);
  apron3D.leftShoulderMesh.position.set(0.48, 0.88, 0);
  apron3D.leftShoulderMesh.rotation.z = -0.15;
  apron3D.garmentGroup.add(apron3D.leftShoulderMesh);

  const rightShoulderGeo = new THREE.BoxGeometry(0.38, 0.12, 0.38);
  apron3D.rightShoulderMesh = new THREE.Mesh(rightShoulderGeo, apron3D.primaryMat);
  apron3D.rightShoulderMesh.position.set(-0.48, 0.88, 0);
  apron3D.rightShoulderMesh.rotation.z = 0.15;
  apron3D.garmentGroup.add(apron3D.rightShoulderMesh);

  // 4. Iconic Contrast Side Flank Panels (GulfRay Signature Cut)
  // Right flank (+X side)
  const flapGeo = new THREE.CylinderGeometry(0.555, 0.485, 0.86, 20, 1, false, -Math.PI * 0.15, Math.PI * 0.30);
  apron3D.frontFlapMesh = new THREE.Mesh(flapGeo, apron3D.accentMat);
  apron3D.frontFlapMesh.position.y = 0.43;
  apron3D.garmentGroup.add(apron3D.frontFlapMesh);

  // Left flank (-X side)
  const flapLeftGeo = new THREE.CylinderGeometry(0.555, 0.485, 0.86, 20, 1, false, Math.PI * 0.85, Math.PI * 0.30);
  const flapLeftMesh = new THREE.Mesh(flapLeftGeo, apron3D.accentMat);
  flapLeftMesh.position.y = 0.43;
  apron3D.garmentGroup.add(flapLeftMesh);

  // 5. Thyroid Collar Shield (Detachable neck collar)
  const collarGeo = new THREE.TorusGeometry(0.26, 0.065, 16, 36, Math.PI * 1.5);
  apron3D.collarMesh = new THREE.Mesh(collarGeo, apron3D.primaryMat);
  apron3D.collarMesh.rotation.x = Math.PI / 2;
  apron3D.collarMesh.rotation.z = -Math.PI * 0.75;
  apron3D.collarMesh.position.set(0, 0.88, 0.05);
  apron3D.garmentGroup.add(apron3D.collarMesh);

  // 6. Gold Piping Line along Collar
  const pipeCollarGeo = new THREE.TorusGeometry(0.30, 0.012, 12, 36);
  apron3D.pipeCollarMesh = new THREE.Mesh(pipeCollarGeo, apron3D.trimMat);
  apron3D.pipeCollarMesh.rotation.x = Math.PI / 2;
  apron3D.pipeCollarMesh.position.y = 0.87;
  apron3D.garmentGroup.add(apron3D.pipeCollarMesh);

  // 7. Waist Lumbar Support Belt
  const beltGeo = new THREE.CylinderGeometry(0.495, 0.505, 0.14, 36);
  apron3D.beltMesh = new THREE.Mesh(beltGeo, apron3D.beltMat);
  apron3D.beltMesh.position.y = -0.04;
  apron3D.garmentGroup.add(apron3D.beltMesh);

  // Belt Buckle Clasp
  const buckleGeo = new THREE.BoxGeometry(0.16, 0.14, 0.05);
  apron3D.buckleMesh = new THREE.Mesh(buckleGeo, apron3D.trimMat);
  apron3D.buckleMesh.position.set(0, -0.04, 0.52);
  apron3D.garmentGroup.add(apron3D.buckleMesh);

  // 8. Lower Skirt / Full Apron Wrap
  const skirtGeo = new THREE.CylinderGeometry(0.51, 0.65, 1.05, 36, 1, false, 0, Math.PI * 2);
  apron3D.skirtMesh = new THREE.Mesh(skirtGeo, apron3D.primaryMat);
  apron3D.skirtMesh.position.y = -0.58;
  apron3D.garmentGroup.add(apron3D.skirtMesh);

  // Skirt Side Flank Accent Panels
  const skirtFlapGeo = new THREE.CylinderGeometry(0.515, 0.655, 1.02, 20, 1, false, -Math.PI * 0.15, Math.PI * 0.30);
  apron3D.skirtFlapMesh = new THREE.Mesh(skirtFlapGeo, apron3D.accentMat);
  apron3D.skirtFlapMesh.position.y = -0.58;
  apron3D.garmentGroup.add(apron3D.skirtFlapMesh);

  const skirtLeftFlapGeo = new THREE.CylinderGeometry(0.515, 0.655, 1.02, 20, 1, false, Math.PI * 0.85, Math.PI * 0.30);
  const skirtLeftFlapMesh = new THREE.Mesh(skirtLeftFlapGeo, apron3D.accentMat);
  skirtLeftFlapMesh.position.y = -0.58;
  apron3D.garmentGroup.add(skirtLeftFlapMesh);

  // 9. Chest Pocket with Live Custom Embroidery Texture
  buildEmbroideryPocket();
}

function buildEmbroideryPocket() {
  apron3D.pocketCanvas = document.createElement('canvas');
  apron3D.pocketCanvas.width = 256;
  apron3D.pocketCanvas.height = 170;
  apron3D.pocketCtx = apron3D.pocketCanvas.getContext('2d');

  apron3D.pocketTexture = new THREE.CanvasTexture(apron3D.pocketCanvas);
  apron3D.pocketTexture.anisotropy = 4;

  const pocketMat = new THREE.MeshStandardMaterial({
    map: apron3D.pocketTexture,
    roughness: 0.55,
    metalness: 0.05
  });

  const pocketGeo = new THREE.PlaneGeometry(0.24, 0.16);
  apron3D.pocketMesh = new THREE.Mesh(pocketGeo, pocketMat);
  apron3D.pocketMesh.position.set(-0.20, 0.38, 0.53);
  apron3D.pocketMesh.rotation.y = -0.22;
  apron3D.garmentGroup.add(apron3D.pocketMesh);

  renderPocketCanvas("Dr. Ahmed Saeed", "0.50 mm Pb");
}

function renderPocketCanvas(embroideryText, leadThickness) {
  if (!apron3D.pocketCtx) return;
  const ctx = apron3D.pocketCtx;

  // Background
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, 0, 256, 170);

  // Gold stitched border
  ctx.strokeStyle = '#c5a869';
  ctx.lineWidth = 5;
  ctx.strokeRect(5, 5, 246, 160);

  // Inner stitched dashed border
  ctx.setLineDash([4, 4]);
  ctx.strokeStyle = 'rgba(197, 168, 105, 0.6)';
  ctx.lineWidth = 2;
  ctx.strokeRect(10, 10, 236, 150);
  ctx.setLineDash([]);

  // GulfRay Crest & Logo
  ctx.fillStyle = '#c5a869';
  ctx.font = 'bold 20px "Segoe UI", Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('GulfRay®', 128, 44);

  // Embroidered text
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 15px "Segoe UI", Arial, sans-serif';
  const textToShow = embroideryText && embroideryText.trim() ? embroideryText.trim() : 'Radiation Protection';
  
  // Truncate long text cleanly
  const shortText = textToShow.length > 22 ? textToShow.substring(0, 20) + '..' : textToShow;
  ctx.fillText(shortText, 128, 88);

  // Lead equivalence badge
  ctx.fillStyle = '#10b981';
  ctx.font = 'bold 12px monospace';
  ctx.fillText(`🛡️ ${leadThickness || '0.50 mm Pb'} · Lead-Free`, 128, 126);

  ctx.fillStyle = '#94a3b8';
  ctx.font = '10px "Segoe UI", sans-serif';
  ctx.fillText('MADE IN SAUDI ARABIA', 128, 146);

  if (apron3D.pocketTexture) {
    apron3D.pocketTexture.needsUpdate = true;
  }
}

// ==========================================================================
// Update 3D Model dynamically on configuration change
// ==========================================================================
function updateApron3DModel(config) {
  if (!apron3D.initialized) return;

  // 1. Primary Color
  let primaryColorHex = config.color_hex || '#006C35';
  if (config.fabric_mode === "custom_codes" && config.fabric_hex) {
    primaryColorHex = config.fabric_hex;
  }
  apron3D.primaryMat.color.set(primaryColorHex);

  // 2. Accent Color or Printed Texture
  if (config.fabric_mode === "custom_codes" && config.pattern_code && config.pattern_code !== "None") {
    // Load printed fabric texture
    const pCode = config.pattern_code;
    const imgUrl = `/images/fabrics/${pCode}_${getPatternFilename(pCode)}.jpg`;
    loadPatternTexture(imgUrl, (texture) => {
      apron3D.accentMat.map = texture;
      apron3D.accentMat.color.set('#ffffff');
      apron3D.accentMat.needsUpdate = true;
    });
  } else if (config.collection && config.collection.includes("Lavender")) {
    apron3D.accentMat.map = null;
    apron3D.accentMat.color.set('#C5A869'); // Gold accent for lavender
    apron3D.accentMat.needsUpdate = true;
  } else {
    apron3D.accentMat.map = null;
    apron3D.accentMat.color.set('#E7D8C9'); // Warm Ivory default
    apron3D.accentMat.needsUpdate = true;
  }

  // 3. Trim / Piping Color
  let trimHex = '#c5a869'; // default gold
  if (config.trim_code === "T-01" || config.trim_code === "T-06") trimHex = '#1F1E1B';
  else if (config.trim_code === "T-02") trimHex = '#5A2332';
  else if (config.trim_code === "T-03") trimHex = '#9A1A22';
  else if (config.trim_code === "T-05") trimHex = '#E7D8C9';
  apron3D.trimMat.color.set(trimHex);

  // 4. Garment Cut & Style Features
  const isFrontal = config.category === "Frontal" || config.category === "Frontal Surgery";
  if (apron3D.backShieldMesh) {
    // Hide back shield if frontal apron to expose ergonomic criss-cross straps
    apron3D.backShieldMesh.visible = !isFrontal;
  }

  // 5. Gender & Size scale adjustments
  const isFemale = config.gender === "Female";
  const sizeScales = { "XS": 0.94, "S": 0.97, "M": 1.0, "L": 1.03, "XL": 1.06, "XXL": 1.1 };
  const scale = sizeScales[config.size] || 1.0;
  
  apron3D.garmentGroup.scale.set(
    isFemale ? scale * 0.96 : scale * 1.02,
    scale,
    isFemale ? scale * 0.97 : scale * 1.0
  );

  // 6. Custom Embroidery
  const embText = document.getElementById("inputEmbroidery") ? document.getElementById("inputEmbroidery").value : (config.embroidery || "");
  renderPocketCanvas(embText, config.thickness);
}

function getPatternFilename(code) {
  const map = {
    P08: "sunflower",
    P17: "eucalyptus",
    P18: "spring_flora",
    P19: "abstract_botanical",
    P20: "watercolour_wave",
    P21: "lavender_sketch",
    P22: "micro_floral",
    P23: "geometric_lattice",
    P40: "blue_camo",
    P41: "grey_digital_camo",
    P68: "teal_abstract"
  };
  return map[code] || "pattern";
}

function loadPatternTexture(url, callback) {
  if (apron3D.cachedTextures[url]) {
    callback(apron3D.cachedTextures[url]);
    return;
  }
  apron3D.textureLoader.load(url, (tex) => {
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(2, 2);
    apron3D.cachedTextures[url] = tex;
    callback(tex);
  }, undefined, () => {
    // On error, fallback to ivory
    apron3D.accentMat.color.set('#E7D8C9');
  });
}

// ==========================================================================
// Interaction Controls: Drag, Spin, Angle
// ==========================================================================
function setupInteractionEvents(container) {
  container.addEventListener('mousedown', onMouseDown);
  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mouseup', onMouseUp);

  container.addEventListener('touchstart', onTouchStart, { passive: false });
  window.addEventListener('touchmove', onTouchMove, { passive: false });
  window.addEventListener('touchend', onTouchEnd);

  // Wheel Zoom
  container.addEventListener('wheel', (e) => {
    e.preventDefault();
    if (!apron3D.camera) return;
    apron3D.camera.position.z += e.deltaY * 0.0025;
    apron3D.camera.position.z = Math.max(2.8, Math.min(5.5, apron3D.camera.position.z));
  }, { passive: false });
}

function onMouseDown(e) {
  apron3D.isDragging = true;
  apron3D.autoSpin = false;
  updateSpinButtonState();
  apron3D.prevMouseX = e.clientX;
  apron3D.prevMouseY = e.clientY;
}

function onMouseMove(e) {
  if (!apron3D.isDragging) return;
  const deltaX = e.clientX - apron3D.prevMouseX;
  const deltaY = e.clientY - apron3D.prevMouseY;
  apron3D.prevMouseX = e.clientX;
  apron3D.prevMouseY = e.clientY;

  apron3D.targetRotY += deltaX * 0.012;
  apron3D.targetRotX += deltaY * 0.005;
  apron3D.targetRotX = Math.max(-0.25, Math.min(0.40, apron3D.targetRotX));
}

function onMouseUp() {
  apron3D.isDragging = false;
}

function onTouchStart(e) {
  if (e.touches.length === 1) {
    apron3D.isDragging = true;
    apron3D.autoSpin = false;
    updateSpinButtonState();
    apron3D.prevMouseX = e.touches[0].clientX;
    apron3D.prevMouseY = e.touches[0].clientY;
  }
}

function onTouchMove(e) {
  if (!apron3D.isDragging || e.touches.length !== 1) return;
  const deltaX = e.touches[0].clientX - apron3D.prevMouseX;
  const deltaY = e.touches[0].clientY - apron3D.prevMouseY;
  apron3D.prevMouseX = e.touches[0].clientX;
  apron3D.prevMouseY = e.touches[0].clientY;

  apron3D.targetRotY += deltaX * 0.014;
  apron3D.targetRotX += deltaY * 0.005;
  apron3D.targetRotX = Math.max(-0.25, Math.min(0.40, apron3D.targetRotX));
  e.preventDefault();
}

function onTouchEnd() {
  apron3D.isDragging = false;
}

function setApronAngle(deg) {
  apron3D.autoSpin = false;
  updateSpinButtonState();
  apron3D.targetRotY = -deg * Math.PI / 180;
  apron3D.targetRotX = 0.05;
  if (apron3D.modelGroup) {
    apron3D.modelGroup.rotation.y = apron3D.targetRotY;
    apron3D.modelGroup.rotation.x = apron3D.targetRotX;
  }

  // Update active button
  ['btnAngleFront', 'btnAngleSide', 'btnAngleBack'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.remove('active');
  });
  if (deg === 0 && document.getElementById('btnAngleFront')) document.getElementById('btnAngleFront').classList.add('active');
  if (deg === 90 && document.getElementById('btnAngleSide')) document.getElementById('btnAngleSide').classList.add('active');
  if (deg === 180 && document.getElementById('btnAngleBack')) document.getElementById('btnAngleBack').classList.add('active');
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

// Animation Loop
function animate3D() {
  requestAnimationFrame(animate3D);

  if (apron3D.autoSpin) {
    apron3D.targetRotY += 0.006;
  }

  if (apron3D.modelGroup) {
    apron3D.modelGroup.rotation.y += (apron3D.targetRotY - apron3D.modelGroup.rotation.y) * 0.1;
    apron3D.modelGroup.rotation.x += (apron3D.targetRotX - apron3D.modelGroup.rotation.x) * 0.1;

    // Angle update badge
    const angleEl = document.getElementById("apron3DAnglePill");
    if (angleEl) {
      let deg = Math.round(((-apron3D.modelGroup.rotation.y * 180 / Math.PI) % 360 + 360) % 360);
      const isAr = (typeof currentLang !== "undefined" && currentLang === "ar") || (document.documentElement.getAttribute("dir") === "rtl");
      let desc = isAr ? "الواجهة الأمامية" : "Front View";
      if (deg > 45 && deg <= 135) desc = isAr ? "الجانب الأيمن" : "Right Profile";
      else if (deg > 135 && deg <= 225) desc = isAr ? "تغطية الظهر (360°)" : "Back Shielding (360°)";
      else if (deg > 225 && deg <= 315) desc = isAr ? "الجانب الأيسر" : "Left Profile";
      
      angleEl.innerText = `${deg}° · ${desc}`;
    }
  }

  if (apron3D.renderer && apron3D.scene && apron3D.camera) {
    apron3D.renderer.render(apron3D.scene, apron3D.camera);
  }
}
