import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const distDir = "dist";

const requiredFiles = [
  "dist/index.html",
  "dist/404.html",
  "dist/feed.xml",
  "dist/sitemap.xml",
  "dist/robots.txt",
  "dist/site.webmanifest",
  "dist/_headers",
  "dist/posts/hello-edge/index.html",
  "dist/posts/profile-and-blog-split/index.html",
  ".node-version",
  "wrangler.toml",
  "worker/worker.ts",
  "functions/health.js",
  "AGENTS.md",
  "blog.md",
  "package.json",
  "vite.config.ts",
];

for (const file of requiredFiles) {
  if (!existsSync(file)) {
    throw new Error(`Missing required file: ${file}`);
  }
}

const nodeVersion = readFileSync(".node-version", "utf8").trim();
if (nodeVersion !== "20") {
  throw new Error(`.node-version must be 20 for Cloudflare Pages, got: ${nodeVersion}`);
}

const packageJson = JSON.parse(readFileSync("package.json", "utf8"));
if (packageJson.scripts?.build !== "vite build") {
  throw new Error('package.json scripts.build must be "vite build" for Cloudflare Pages');
}

const index = readFileSync("dist/index.html", "utf8");
const localRefs = [...index.matchAll(/(?:href|src)="(\/[^"#?]+)"/g)].map((match) => match[1]);

for (const ref of localRefs) {
  if (ref === "/" || ref.endsWith(".xml") || ref.endsWith(".webmanifest")) {
    continue;
  }

  const filePath = join(distDir, ref.slice(1));
  if (!existsSync(filePath)) {
    throw new Error(`Broken local reference in dist/index.html: ${ref}`);
  }
}

for (const expected of ["neko233", "可乐鸡翅"]) {
  if (!index.includes(expected)) {
    throw new Error(`dist/index.html is missing blog identity: ${expected}`);
  }
}

const feed = readFileSync("dist/feed.xml", "utf8");
const sitemap = readFileSync("dist/sitemap.xml", "utf8");

if (!feed.includes("<title>neko233</title>")) {
  throw new Error("RSS feed channel title must be neko233");
}

for (const slug of ["hello-edge", "profile-and-blog-split"]) {
  const url = `/posts/${slug}/`;
  if (!feed.includes(url)) {
    throw new Error(`RSS feed is missing post: ${slug}`);
  }
  if (!sitemap.includes(url)) {
    throw new Error(`Sitemap is missing post: ${slug}`);
  }
}

const wrangler = readFileSync("wrangler.toml", "utf8");

for (const expected of ['main = "worker/worker.ts"', 'binding = "ASSETS"', 'directory = "./dist"']) {
  if (!wrangler.includes(expected)) {
    throw new Error(`wrangler.toml is missing: ${expected}`);
  }
}

const manifestPath = join(distDir, ".vite", "manifest.json");
if (!existsSync(manifestPath)) {
  throw new Error("Missing Vite build manifest at dist/.vite/manifest.json");
}

const health = readFileSync("functions/health.js", "utf8");
if (!health.includes('"dist"')) {
  throw new Error("functions/health.js must report assets: dist");
}

const workerHealth = readFileSync("worker/worker.ts", "utf8");
if (!workerHealth.includes('"dist"')) {
  throw new Error("worker/worker.ts must report assets: dist");
}

console.log("dist verification passed");
