import fs from "node:fs";
import path from "node:path";
import * as THREE from "../assets/vendor/three.module.min.js";

const root = process.cwd();
const output = path.join(root, "assets", "models", "configurator", "ramos-modular-guitar.gltf");

const bufferParts = [];
const bufferViews = [];
const accessors = [];
const meshes = [];
const nodes = [];

const GL_ARRAY_BUFFER = 34962;
const GL_ELEMENT_ARRAY_BUFFER = 34963;
const COMPONENT_FLOAT = 5126;
const COMPONENT_UNSIGNED_SHORT = 5123;
const COMPONENT_UNSIGNED_INT = 5125;

const materials = [
  material("body_base", [0.42, 0.10, 0.07, 1], 0.15, 0.42),
  material("neck_base", [0.72, 0.48, 0.25, 1], 0.02, 0.55),
  material("fretboard_dark", [0.11, 0.075, 0.055, 1], 0.02, 0.64),
  material("hardware_chrome", [0.78, 0.76, 0.72, 1], 0.9, 0.22),
  material("pickup_black", [0.015, 0.015, 0.016, 1], 0.2, 0.38),
  material("string_steel", [0.86, 0.84, 0.78, 1], 0.78, 0.18),
  material("fretwire", [0.91, 0.78, 0.49, 1], 0.85, 0.2),
];

function material(name, color, metallic, roughness) {
  return {
    name,
    pbrMetallicRoughness: {
      baseColorFactor: color,
      metallicFactor: metallic,
      roughnessFactor: roughness,
    },
  };
}

function align4(buffer) {
  const remainder = buffer.length % 4;
  if (remainder === 0) return buffer;
  return Buffer.concat([buffer, Buffer.alloc(4 - remainder)]);
}

function addBufferView(buffer, target) {
  const offset = bufferParts.reduce((sum, part) => sum + part.length, 0);
  const aligned = align4(buffer);
  bufferParts.push(aligned);
  bufferViews.push({
    buffer: 0,
    byteOffset: offset,
    byteLength: buffer.length,
    target,
  });
  return bufferViews.length - 1;
}

function accessorMinMax(array, itemSize) {
  const min = Array(itemSize).fill(Number.POSITIVE_INFINITY);
  const max = Array(itemSize).fill(Number.NEGATIVE_INFINITY);
  for (let i = 0; i < array.length; i += itemSize) {
    for (let c = 0; c < itemSize; c += 1) {
      min[c] = Math.min(min[c], array[i + c]);
      max[c] = Math.max(max[c], array[i + c]);
    }
  }
  return { min, max };
}

function addAttributeAccessor(attribute, type) {
  const array = new Float32Array(attribute.array);
  const buffer = Buffer.from(array.buffer);
  const { min, max } = accessorMinMax(array, attribute.itemSize);
  const bufferView = addBufferView(buffer, GL_ARRAY_BUFFER);
  accessors.push({
    bufferView,
    componentType: COMPONENT_FLOAT,
    count: attribute.count,
    type,
    min,
    max,
  });
  return accessors.length - 1;
}

function addIndexAccessor(index) {
  const source = Array.from(index.array);
  const maxIndex = Math.max(...source);
  const TypedArray = maxIndex > 65535 ? Uint32Array : Uint16Array;
  const componentType = maxIndex > 65535 ? COMPONENT_UNSIGNED_INT : COMPONENT_UNSIGNED_SHORT;
  const array = new TypedArray(source);
  const buffer = Buffer.from(array.buffer);
  const bufferView = addBufferView(buffer, GL_ELEMENT_ARRAY_BUFFER);
  accessors.push({
    bufferView,
    componentType,
    count: array.length,
    type: "SCALAR",
    min: [Math.min(...source)],
    max: [maxIndex],
  });
  return accessors.length - 1;
}

function bake(geometry) {
  geometry.computeVertexNormals();
  geometry.computeBoundingBox();
  return geometry;
}

function addPiece(name, geometry, materialIndex, options = {}) {
  const baked = bake(geometry);
  const attributes = {
    POSITION: addAttributeAccessor(baked.getAttribute("position"), "VEC3"),
    NORMAL: addAttributeAccessor(baked.getAttribute("normal"), "VEC3"),
  };
  if (baked.getAttribute("uv")) {
    attributes.TEXCOORD_0 = addAttributeAccessor(baked.getAttribute("uv"), "VEC2");
  }

  const primitive = { attributes, material: materialIndex };
  if (baked.index) {
    primitive.indices = addIndexAccessor(baked.index);
  }

  meshes.push({ name, primitives: [primitive] });
  nodes.push({
    name,
    mesh: meshes.length - 1,
    extras: {
      piece: options.piece || name,
      defaultVisible: options.defaultVisible !== false,
    },
  });
}

function box(name, size, position, materialIndex, options = {}) {
  const geometry = new THREE.BoxGeometry(size[0], size[1], size[2]);
  geometry.translate(position[0], position[1], position[2]);
  addPiece(name, geometry, materialIndex, options);
}

function cylinder(name, radius, depth, position, rotation, materialIndex, options = {}) {
  const geometry = new THREE.CylinderGeometry(radius, radius, depth, 32);
  geometry.rotateX(rotation[0]);
  geometry.rotateY(rotation[1]);
  geometry.rotateZ(rotation[2]);
  geometry.translate(position[0], position[1], position[2]);
  addPiece(name, geometry, materialIndex, options);
}

function bodyGeometry() {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0.72);
  shape.bezierCurveTo(0.42, 0.72, 0.77, 0.42, 0.52, 0.18);
  shape.bezierCurveTo(0.89, 0.08, 0.92, -0.38, 0.66, -0.58);
  shape.bezierCurveTo(1.08, -0.78, 0.96, -1.58, 0.08, -1.76);
  shape.bezierCurveTo(-0.74, -1.69, -1.12, -1.02, -0.72, -0.58);
  shape.bezierCurveTo(-0.99, -0.38, -0.9, 0.05, -0.52, 0.16);
  shape.bezierCurveTo(-0.78, 0.45, -0.42, 0.72, 0, 0.72);

  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: 0.28,
    bevelEnabled: true,
    bevelSize: 0.038,
    bevelThickness: 0.038,
    bevelSegments: 8,
    curveSegments: 34,
  });
  geometry.translate(0, -0.16, -0.14);
  return geometry;
}

function headstockGeometry() {
  const shape = new THREE.Shape();
  shape.moveTo(-0.18, 2.84);
  shape.lineTo(0.28, 2.94);
  shape.lineTo(0.34, 3.64);
  shape.lineTo(0.08, 3.86);
  shape.lineTo(-0.33, 3.72);
  shape.lineTo(-0.27, 2.96);
  shape.lineTo(-0.18, 2.84);

  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: 0.16,
    bevelEnabled: true,
    bevelSize: 0.018,
    bevelThickness: 0.018,
    bevelSegments: 4,
  });
  geometry.translate(0, 0, -0.03);
  return geometry;
}

addPiece("body", bodyGeometry(), 0, { piece: "body" });
box("neck", [0.32, 2.35, 0.13], [0, 1.73, 0.035], 1, { piece: "neck" });
box("fretboard", [0.38, 2.28, 0.05], [0, 1.73, 0.13], 2, { piece: "neck" });
addPiece("headstock", headstockGeometry(), 1, { piece: "neck" });

box("bridge_hardtail", [0.72, 0.16, 0.08], [0, -1.0, 0.23], 3, { piece: "bridge_hardtail" });
box("bridge_tremolo", [0.8, 0.2, 0.075], [0, -1.0, 0.23], 3, { piece: "bridge_tremolo", defaultVisible: false });
cylinder("bridge_tremolo_arm", 0.012, 0.72, [0.47, -0.83, 0.31], [0.3, 0.35, -0.65], 3, {
  piece: "bridge_tremolo",
  defaultVisible: false,
});

box("pickup_neck_humbucker", [0.64, 0.19, 0.075], [0, 0.05, 0.24], 4, { piece: "pickup_humbucker" });
box("pickup_bridge_humbucker", [0.64, 0.19, 0.075], [0, -0.48, 0.24], 4, { piece: "pickup_humbucker" });
box("pickup_neck_single", [0.58, 0.1, 0.064], [0, 0.06, 0.25], 4, { piece: "pickup_single", defaultVisible: false });
box("pickup_middle_single", [0.58, 0.1, 0.064], [0, -0.22, 0.25], 4, { piece: "pickup_single", defaultVisible: false });
box("pickup_bridge_single", [0.58, 0.1, 0.064], [0, -0.5, 0.25], 4, { piece: "pickup_single", defaultVisible: false });
box("pickup_neck_active", [0.68, 0.2, 0.082], [0, 0.05, 0.252], 4, { piece: "pickup_active", defaultVisible: false });
box("pickup_bridge_active", [0.68, 0.2, 0.082], [0, -0.48, 0.252], 4, { piece: "pickup_active", defaultVisible: false });

for (let i = 0; i < 6; i += 1) {
  const x = -0.24 + i * 0.096;
  cylinder(`string_${i + 1}`, 0.004 + i * 0.0008, 4.22, [x, 1.02, 0.31], [0, 0, 0], 5, { piece: "strings" });
}

for (let i = 0; i < 18; i += 1) {
  const y = 0.67 + i * 0.116;
  box(`fret_${i + 1}`, [0.42 - i * 0.004, 0.012, 0.032], [0, y, 0.19], 6, { piece: "frets" });
}

for (let i = 0; i < 6; i += 1) {
  const side = i % 2 === 0 ? -1 : 1;
  const row = Math.floor(i / 2);
  const y = 3.08 + row * 0.24;
  cylinder(`tuner_modern_${i + 1}`, 0.04, 0.24, [side * 0.37, y, 0.07], [0, 0, Math.PI / 2], 3, { piece: "tuner_modern" });
  box(`tuner_locking_${i + 1}`, [0.12, 0.075, 0.075], [side * 0.39, y, 0.07], 3, {
    piece: "tuner_locking",
    defaultVisible: false,
  });
  cylinder(`tuner_vintage_${i + 1}`, 0.052, 0.16, [side * 0.38, y, 0.07], [0, 0, Math.PI / 2], 6, {
    piece: "tuner_vintage",
    defaultVisible: false,
  });
}

for (let i = 0; i < 6; i += 1) {
  box(`saddle_${i + 1}`, [0.064, 0.08, 0.046], [-0.24 + i * 0.096, -0.98, 0.29], 3, { piece: "bridge_details" });
}

const combinedBuffer = Buffer.concat(bufferParts);
const gltf = {
  asset: {
    version: "2.0",
    generator: "Ramos configurator simplified modular guitar",
    extras: {
      note: "Replace this file with production GLB/GLTF pieces when real scans or CAD exports are ready.",
      expectedPieces: ["body", "neck", "bridge", "pickups", "tuners", "strings", "frets"],
    },
  },
  scene: 0,
  scenes: [{ name: "Ramos modular guitar", nodes: nodes.map((_, index) => index) }],
  nodes,
  meshes,
  materials,
  buffers: [
    {
      uri: `data:application/octet-stream;base64,${combinedBuffer.toString("base64")}`,
      byteLength: combinedBuffer.length,
    },
  ],
  bufferViews,
  accessors,
};

fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(output, `${JSON.stringify(gltf)}\n`);
console.log(`Created ${path.relative(root, output)} with ${nodes.length} pieces.`);
