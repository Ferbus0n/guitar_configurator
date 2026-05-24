import * as THREE from "./assets/vendor/three.module.min.js";
import { OrbitControls } from "./assets/vendor/OrbitControls.js";
import { GLTFLoader } from "./assets/vendor/GLTFLoader.js";

const root = document.querySelector("[data-guitar-configurator]");

if (root) {
  initConfigurator(root);
}

function initConfigurator(app) {
  const canvas = app.querySelector("[data-guitar-canvas]");
  const status = app.querySelector("[data-model-status]");
  const quoteStatus = app.querySelector("[data-quote-status]");
  const summary = app.querySelector("[data-config-summary]");
  const jsonOutput = app.querySelector("[data-config-json]");
  const quoteButton = app.querySelector("[data-request-quote]");
  const resetButton = app.querySelector("[data-reset-view]");
  const copy = JSON.parse(app.dataset.copy || "{}");
  const contactPath = app.dataset.contactPath || "es/contacto/";

  const config = {
    version: "ramos-configurator-v1",
    language: app.dataset.lang || "es",
    asset: new URL("./assets/models/configurator/ramos-modular-guitar.gltf", import.meta.url).href,
    finish: "natural",
    bodyColor: "#7b1914",
    neckColor: "#b77a3d",
    hardwareColor: "chrome",
    bridge: "hardtail",
    pickups: "humbucker",
    tuners: "modern",
  };

  window.ramosConfiguratorState = config;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;
  renderer.shadowMap.enabled = true;

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x070707, 6, 13);

  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 80);
  camera.position.set(0.1, 0.75, 6.2);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.enablePan = true;
  controls.minDistance = 3.4;
  controls.maxDistance = 9;
  controls.target.set(0, 0.85, 0.04);
  controls.autoRotate = true;
  controls.autoRotateSpeed = 0.45;

  const guitar = new THREE.Group();
  guitar.name = "Ramos configurable guitar";
  scene.add(guitar);

  const pieces = new Map();
  const baseMaterials = new Map();
  const textureCache = new Map();

  addLights(scene);
  addStage(scene);
  loadGuitar();
  bindControls();
  resize();
  render();

  function loadGuitar() {
    const loader = new GLTFLoader();
    loader.load(
      config.asset,
      (gltf) => {
        guitar.clear();
        guitar.add(gltf.scene);
        gltf.scene.position.set(0, -0.82, 0);
        gltf.scene.rotation.z = -0.055;
        gltf.scene.scale.setScalar(0.92);
        collectPieces(gltf.scene);
        applyConfig();
        setStatus(copy.loaded || "GLTF modular loaded.");
      },
      undefined,
      () => {
        guitar.clear();
        guitar.add(createFallbackGuitar());
        collectPieces(guitar);
        applyConfig();
        setStatus(copy.fallback || "Using simplified fallback model.");
      }
    );
  }

  function collectPieces(object) {
    pieces.clear();
    baseMaterials.clear();
    object.traverse((child) => {
      if (!child.isMesh) return;
      child.castShadow = true;
      child.receiveShadow = true;
      child.material = child.material.clone();
      baseMaterials.set(child.uuid, child.material);
      const piece = child.userData.piece || child.name;
      if (!pieces.has(piece)) pieces.set(piece, []);
      pieces.get(piece).push(child);
      if (child.userData.defaultVisible === false) child.visible = false;
    });
  }

  function addLights(targetScene) {
    targetScene.add(new THREE.HemisphereLight(0xfff0d3, 0x080808, 2.2));

    const key = new THREE.DirectionalLight(0xffe2a5, 3.4);
    key.position.set(-3.5, 4.5, 5);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    targetScene.add(key);

    const rim = new THREE.DirectionalLight(0x9bc6ff, 1.25);
    rim.position.set(3.5, 2.4, -4);
    targetScene.add(rim);
  }

  function addStage(targetScene) {
    const floor = new THREE.Mesh(
      new THREE.CircleGeometry(2.45, 96),
      new THREE.MeshStandardMaterial({
        color: 0x0c0c0c,
        metalness: 0.15,
        roughness: 0.8,
        transparent: true,
        opacity: 0.72,
      })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -2.28;
    floor.receiveShadow = true;
    targetScene.add(floor);

    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(1.85, 0.006, 10, 160),
      new THREE.MeshBasicMaterial({ color: 0xc8a45d, transparent: true, opacity: 0.34 })
    );
    ring.rotation.x = Math.PI / 2;
    ring.position.y = -2.25;
    targetScene.add(ring);
  }

  function createFallbackGuitar() {
    const fallback = new THREE.Group();
    const body = new THREE.Mesh(
      new THREE.BoxGeometry(1.45, 1.75, 0.28),
      new THREE.MeshStandardMaterial({ color: 0x7b1914, roughness: 0.42 })
    );
    body.name = "body";
    body.userData.piece = "body";
    body.position.set(0, -0.72, 0);
    fallback.add(body);

    const neck = new THREE.Mesh(
      new THREE.BoxGeometry(0.32, 2.5, 0.13),
      new THREE.MeshStandardMaterial({ color: 0xb77a3d, roughness: 0.55 })
    );
    neck.name = "neck";
    neck.userData.piece = "neck";
    neck.position.set(0, 1.35, 0.06);
    fallback.add(neck);
    return fallback;
  }

  function bindControls() {
    app.querySelectorAll("[data-config-key]").forEach((control) => {
      const key = control.dataset.configKey;
      const value = control.dataset.configValue;
      const eventName = control.matches("input[type='color']") ? "input" : "change";

      if (control.tagName === "BUTTON") {
        control.addEventListener("click", () => {
          config[key] = value;
          if (key === "finish" && value !== "custom") {
            const preset = finishPresets[value];
            if (preset?.bodyColor) {
              config.bodyColor = preset.bodyColor;
              syncColorInput("bodyColor", config.bodyColor);
            }
          }
          applyConfig();
        });
        return;
      }

      control.addEventListener(eventName, () => {
        config[key] = control.value;
        if (key === "bodyColor") config.finish = "custom";
        applyConfig();
      });
    });

    quoteButton?.addEventListener("click", () => {
      saveConfiguration();
      quoteButton.href = `${contactPath}?config=3d`;
      if (quoteStatus) quoteStatus.textContent = copy.saved || "Configuration saved.";
    });

    resetButton?.addEventListener("click", () => {
      camera.position.set(0.1, 0.75, 6.2);
      controls.target.set(0, 0.85, 0.04);
      controls.autoRotate = true;
      controls.update();
    });

    window.addEventListener("resize", resize);
  }

  function applyConfig() {
    applyVisibility();
    applyMaterials();
    updateControls();
    updateSummary();
    saveConfiguration();
  }

  function applyVisibility() {
    setPiece("bridge_hardtail", config.bridge === "hardtail");
    setPiece("bridge_tremolo", config.bridge === "tremolo");

    setPiece("pickup_humbucker", config.pickups === "humbucker");
    setPiece("pickup_single", config.pickups === "single");
    setPiece("pickup_active", config.pickups === "active");

    setPiece("tuner_modern", config.tuners === "modern");
    setPiece("tuner_locking", config.tuners === "locking");
    setPiece("tuner_vintage", config.tuners === "vintage");
  }

  function setPiece(piece, visible) {
    pieces.get(piece)?.forEach((mesh) => {
      mesh.visible = visible;
    });
  }

  function applyMaterials() {
    const bodyMaterial = createBodyMaterial();
    pieces.get("body")?.forEach((mesh) => {
      mesh.material = bodyMaterial;
    });

    const neckMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(config.neckColor),
      map: getTexture(`neck-${config.neckColor}`, () => createWoodTexture(config.neckColor, "#3c2414")),
      metalness: 0.02,
      roughness: 0.58,
    });
    pieces.get("neck")?.forEach((mesh) => {
      mesh.material = neckMaterial;
    });

    const hardwareMaterial = createHardwareMaterial(config.hardwareColor);
    ["bridge_hardtail", "bridge_tremolo", "bridge_details", "tuner_modern", "tuner_locking", "tuner_vintage", "frets", "strings"].forEach((piece) => {
      pieces.get(piece)?.forEach((mesh) => {
        mesh.material = hardwareMaterial;
      });
    });

    const pickupMaterial = new THREE.MeshStandardMaterial({
      color: config.pickups === "active" ? 0x050505 : config.hardwareColor === "gold" ? 0x221705 : 0x101010,
      metalness: 0.25,
      roughness: 0.34,
    });
    ["pickup_humbucker", "pickup_single", "pickup_active"].forEach((piece) => {
      pieces.get(piece)?.forEach((mesh) => {
        mesh.material = pickupMaterial;
      });
    });
  }

  function createBodyMaterial() {
    const preset = finishPresets[config.finish] || finishPresets.custom;
    const color = preset.bodyColor || config.bodyColor;
    const map =
      preset.texture === "sunburst"
        ? getTexture("sunburst", createSunburstTexture)
        : preset.texture === "wood"
          ? getTexture(`wood-${color}`, () => createWoodTexture(color, "#211107"))
          : null;

    return new THREE.MeshPhysicalMaterial({
      color: map ? 0xffffff : new THREE.Color(color),
      map,
      metalness: 0.1,
      roughness: preset.roughness,
      clearcoat: preset.clearcoat,
      clearcoatRoughness: 0.22,
    });
  }

  function createHardwareMaterial(value) {
    const colors = {
      chrome: 0xd9d7d0,
      black: 0x080808,
      gold: 0xd8b15b,
    };
    return new THREE.MeshStandardMaterial({
      color: colors[value] || colors.chrome,
      metalness: 0.88,
      roughness: value === "black" ? 0.3 : 0.18,
    });
  }

  function getTexture(key, factory) {
    if (!textureCache.has(key)) {
      const texture = factory();
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(1.2, 1.2);
      textureCache.set(key, texture);
    }
    return textureCache.get(key);
  }

  function createWoodTexture(baseColor, grainColor) {
    const canvasTexture = document.createElement("canvas");
    canvasTexture.width = 512;
    canvasTexture.height = 512;
    const ctx = canvasTexture.getContext("2d");
    ctx.fillStyle = baseColor;
    ctx.fillRect(0, 0, 512, 512);
    for (let y = 0; y < 512; y += 1) {
      const wave = Math.sin(y * 0.045) * 18 + Math.sin(y * 0.017) * 28;
      ctx.strokeStyle = y % 22 < 10 ? "rgba(255,255,255,0.055)" : grainColor;
      ctx.globalAlpha = y % 17 === 0 ? 0.35 : 0.16;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.bezierCurveTo(170, y + wave, 320, y - wave, 512, y + wave * 0.4);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
    return new THREE.CanvasTexture(canvasTexture);
  }

  function createSunburstTexture() {
    const canvasTexture = document.createElement("canvas");
    canvasTexture.width = 512;
    canvasTexture.height = 512;
    const ctx = canvasTexture.getContext("2d");
    const gradient = ctx.createRadialGradient(256, 210, 24, 256, 256, 360);
    gradient.addColorStop(0, "#f0b45c");
    gradient.addColorStop(0.42, "#9d2a1c");
    gradient.addColorStop(0.72, "#32110c");
    gradient.addColorStop(1, "#060403");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 512);
    return new THREE.CanvasTexture(canvasTexture);
  }

  function updateControls() {
    app.querySelectorAll("[data-config-key]").forEach((control) => {
      const key = control.dataset.configKey;
      if (control.tagName === "BUTTON") {
        control.classList.toggle("is-active", control.dataset.configValue === config[key]);
        return;
      }
      if (control.value !== config[key]) control.value = config[key];
    });
  }

  function syncColorInput(key, value) {
    const input = app.querySelector(`input[data-config-key="${key}"]`);
    if (input) input.value = value;
  }

  function updateSummary() {
    const data = buildConfiguration();
    if (summary) {
      summary.innerHTML = Object.entries(copy.summary || {})
        .map(([key, label]) => `<li><span>${label}</span><strong>${humanValue(data.selections[key])}</strong></li>`)
        .join("");
    }
    if (jsonOutput) {
      jsonOutput.textContent = JSON.stringify(data, null, 2);
    }
  }

  function humanValue(value) {
    return copy.values?.[value] || value;
  }

  function buildConfiguration() {
    return {
      version: config.version,
      language: config.language,
      asset: config.asset,
      generatedAt: new Date().toISOString(),
      selections: {
        finish: config.finish,
        bodyColor: config.bodyColor,
        neckColor: config.neckColor,
        hardwareColor: config.hardwareColor,
        bridge: config.bridge,
        pickups: config.pickups,
        tuners: config.tuners,
      },
    };
  }

  function saveConfiguration() {
    const data = buildConfiguration();
    window.ramosConfiguratorJSON = data;
    localStorage.setItem("ramosGuitarConfiguration", JSON.stringify(data, null, 2));
  }

  function setStatus(message) {
    if (status) status.textContent = message;
  }

  function resize() {
    const rect = canvas.getBoundingClientRect();
    const width = Math.max(1, Math.floor(rect.width));
    const height = Math.max(1, Math.floor(rect.height));
    camera.aspect = width / height;
    camera.position.z = width < 580 ? 7.4 : 6.2;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
  }

  function render() {
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }
}

const finishPresets = {
  natural: { bodyColor: "#8f4d24", texture: "wood", roughness: 0.48, clearcoat: 0.32 },
  black: { bodyColor: "#050505", texture: null, roughness: 0.33, clearcoat: 0.68 },
  red: { bodyColor: "#8f1713", texture: null, roughness: 0.36, clearcoat: 0.7 },
  sunburst: { bodyColor: "#b23b1f", texture: "sunburst", roughness: 0.4, clearcoat: 0.74 },
  custom: { texture: null, roughness: 0.38, clearcoat: 0.62 },
};
