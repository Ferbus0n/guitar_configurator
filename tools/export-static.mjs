import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const dist = path.join(root, "dist");
const exportName = "Ramos Guitars 3D preview";

function assertInsideRoot(target) {
  const relative = path.relative(root, target);
  if (relative.startsWith("..") || path.isAbsolute(relative)) {
    throw new Error(`Unsafe export target: ${target}`);
  }
}

function copyDirectory(source, target) {
  fs.mkdirSync(target, { recursive: true });
  for (const entry of fs.readdirSync(source, { withFileTypes: true })) {
    const sourcePath = path.join(source, entry.name);
    const targetPath = path.join(target, entry.name);
    if (entry.isDirectory()) {
      copyDirectory(sourcePath, targetPath);
    } else {
      fs.copyFileSync(sourcePath, targetPath);
    }
  }
}

function copyFile(name) {
  fs.copyFileSync(path.join(root, name), path.join(dist, name));
}

function splitUrl(value) {
  const match = value.match(/^([^?#]*)([?#].*)?$/);
  return {
    pathName: match?.[1] || value,
    suffix: match?.[2] || "",
  };
}

function relativeUrl(fromHtmlFile, absoluteUrl) {
  if (!absoluteUrl.startsWith("/") || absoluteUrl.startsWith("//")) return absoluteUrl;

  const { pathName, suffix } = splitUrl(absoluteUrl);
  const fromDir = path.posix.dirname(fromHtmlFile.split(path.sep).join(path.posix.sep));
  const target = pathName.replace(/^\/+/, "");
  if (!target) return `.${suffix || "/"}`;

  let relative = path.posix.relative(fromDir === "." ? "" : fromDir, target);
  if (!relative) relative = ".";
  if (!relative.startsWith(".") && !relative.startsWith("/")) relative = `./${relative}`;
  if (pathName.endsWith("/") && !relative.endsWith("/")) relative += "/";
  return `${relative}${suffix}`;
}

function makeHtmlPortable(filePath) {
  const fromRoot = path.relative(dist, filePath);
  const html = fs.readFileSync(filePath, "utf8");
  const portable = html.replace(
    /\b(href|src|action|value|data-contact-path)="\/(?!\/)([^"]*)"/g,
    (_, attr, value) => `${attr}="${relativeUrl(fromRoot, `/${value}`)}"`
  );
  fs.writeFileSync(filePath, portable, "utf8");
}

function walkHtml(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const filePath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkHtml(filePath);
    } else if (entry.name.endsWith(".html")) {
      makeHtmlPortable(filePath);
    }
  }
}

assertInsideRoot(dist);
fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist, { recursive: true });

for (const dir of ["assets", "ca", "en", "es"]) {
  copyDirectory(path.join(root, dir), path.join(dist, dir));
}

for (const file of [
  "index.html",
  "configurador.html",
  "styles.css",
  "script.js",
  "three-scene.js",
  "configurador.css",
  "configurador.js",
]) {
  copyFile(file);
}

walkHtml(dist);

fs.writeFileSync(path.join(dist, ".nojekyll"), "");

fs.writeFileSync(
  path.join(dist, "README_CLIENTE.md"),
  `# ${exportName}

Esta carpeta contiene una exportacion estatica de la web Ramos Custom Guitars con configurador 3D.

## Ver en local

Desde esta carpeta:

\`\`\`bash
python -m http.server 8080
\`\`\`

Despues abrir:

http://127.0.0.1:8080/es/configurador/

## Subir para cliente

Sube todo el contenido de esta carpeta a GitHub Pages o a la raiz de un hosting estatico.

Este export usa rutas relativas, asi que tambien funciona en GitHub Pages dentro de:

https://usuario.github.io/nombre-del-repo/

Rutas principales:

- /es/
- /es/configurador/
- /ca/configurador/
- /en/configurator/

Nota: la web usa rutas absolutas, por eso debe publicarse en la raiz del dominio o subdominio.
`
);

console.log(`Export ready: ${path.relative(root, dist)}`);
