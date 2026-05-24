import * as THREE from "./assets/vendor/three.module.min.js";

const canvas = document.querySelector("[data-ambient-3d]");

if (canvas) {
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    canvas,
    powerPreference: "high-performance",
  });

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
  camera.position.set(0, 0.35, 8);

  const pointer = new THREE.Vector2(0, 0);
  const group = new THREE.Group();
  scene.add(group);

  const gold = new THREE.MeshStandardMaterial({
    color: 0xc8a45d,
    metalness: 0.74,
    roughness: 0.28,
  });
  const dark = new THREE.MeshStandardMaterial({
    color: 0x1a1a1a,
    metalness: 0.52,
    roughness: 0.42,
  });
  const lineMat = new THREE.LineBasicMaterial({
    color: 0xe6cb83,
    transparent: true,
    opacity: 0.45,
  });

  const bodyShape = new THREE.Shape();
  bodyShape.moveTo(-2.3, -0.72);
  bodyShape.bezierCurveTo(-2.1, 0.45, -1.1, 1.08, -0.25, 0.72);
  bodyShape.bezierCurveTo(0.1, 1.05, 0.72, 1.05, 1.08, 0.64);
  bodyShape.bezierCurveTo(1.9, -0.1, 2.25, -0.7, 1.58, -1.02);
  bodyShape.bezierCurveTo(0.72, -1.45, -0.7, -1.34, -2.3, -0.72);

  const body = new THREE.Mesh(new THREE.ShapeGeometry(bodyShape, 48), dark);
  body.position.set(1.8, -0.1, -0.45);
  body.rotation.set(-0.18, -0.34, -0.18);
  body.scale.set(1.2, 1.2, 1.2);
  group.add(body);

  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(2.6, 0.008, 12, 120),
    new THREE.MeshBasicMaterial({ color: 0xc8a45d, transparent: true, opacity: 0.32 })
  );
  ring.position.set(1.7, -0.05, -0.58);
  ring.rotation.set(1.25, 0.1, -0.16);
  group.add(ring);

  for (let i = 0; i < 6; i += 1) {
    const y = -0.22 + i * 0.105;
    const geometry = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-4.7, y, 0),
      new THREE.Vector3(4.4, y + 0.04, -0.28),
    ]);
    const string = new THREE.Line(geometry, lineMat);
    string.rotation.z = -0.12;
    group.add(string);
  }

  const bridge = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.16, 0.08), gold);
  bridge.position.set(1.3, -0.2, 0.08);
  bridge.rotation.z = -0.12;
  group.add(bridge);

  const pickupOne = new THREE.Mesh(new THREE.BoxGeometry(0.58, 0.24, 0.08), dark);
  pickupOne.position.set(0.52, -0.1, 0.08);
  pickupOne.rotation.z = -0.12;
  group.add(pickupOne);

  const pickupTwo = pickupOne.clone();
  pickupTwo.position.set(-0.25, -0.02, 0.08);
  group.add(pickupTwo);

  const keyLight = new THREE.DirectionalLight(0xfff1c7, 1.6);
  keyLight.position.set(2.5, 4, 5);
  scene.add(keyLight);
  scene.add(new THREE.AmbientLight(0x9b8f78, 0.38));

  const resize = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.8));
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };

  window.addEventListener("resize", resize);
  window.addEventListener("pointermove", (event) => {
    pointer.x = (event.clientX / window.innerWidth - 0.5) * 2;
    pointer.y = (event.clientY / window.innerHeight - 0.5) * 2;
  });

  resize();

  const animate = () => {
    group.rotation.y += (pointer.x * 0.12 - group.rotation.y) * 0.035;
    group.rotation.x += (-pointer.y * 0.08 - group.rotation.x) * 0.035;
    group.rotation.z = Math.sin(performance.now() * 0.00035) * 0.018;
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  };

  animate();
}
