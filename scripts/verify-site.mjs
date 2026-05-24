import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const distDir = "dist";
const postSlugs = ["game-fullstack-notes", "hello-edge", "profile-and-blog-split"];

const requiredFiles = [
  "dist/index.html",
  "dist/en/index.html",
  "dist/404.html",
  "dist/en/404.html",
  "dist/feed.xml",
  "dist/sitemap.xml",
  "dist/llms.txt",
  "dist/robots.txt",
  "dist/site.webmanifest",
  "dist/_headers",
  "dist/live2d/live2dcubismcore.min.js",
  "dist/live2d/haru/Haru.model3.json",
  ...postSlugs.map((slug) => `dist/posts/${slug}/index.html`),
  ...postSlugs.map((slug) => `dist/en/posts/${slug}/index.html`),
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
if (nodeVersion !== "22") {
  throw new Error(`.node-version must be 22 for Cloudflare Pages and Wrangler, got: ${nodeVersion}`);
}

const packageJson = JSON.parse(readFileSync("package.json", "utf8"));
if (packageJson.scripts?.build !== "vite build") {
  throw new Error('package.json scripts.build must be "vite build" for Cloudflare Pages');
}

const indexZh = readFileSync("dist/index.html", "utf8");
const indexEn = readFileSync("dist/en/index.html", "utf8");

for (const [label, html, expected] of [
  ["zh index", indexZh, "可乐鸡翅"],
  ["en index", indexEn, "Ke Le Ji Chi"],
]) {
  if (!html.includes("neko233") || !html.includes(expected)) {
    throw new Error(`${label} is missing blog identity markers`);
  }
  if (!html.includes('hreflang="zh-CN"') || !html.includes('hreflang="en"')) {
    throw new Error(`${label} is missing hreflang alternates`);
  }
  if (!html.includes("application/ld+json")) {
    throw new Error(`${label} is missing JSON-LD structured data`);
  }
  if (!html.includes('id="live2d-stage"')) {
    throw new Error(`${label} is missing Live2D stage container`);
  }
}

const localRefs = [...indexZh.matchAll(/(?:href|src)="(\/[^"#?]+)"/g)].map((match) => match[1]);
for (const ref of localRefs) {
  if (ref === "/" || ref.endsWith(".xml") || ref.endsWith(".webmanifest") || ref.startsWith("/en")) {
    continue;
  }
  const filePath = join(distDir, ref.slice(1));
  if (!existsSync(filePath)) {
    throw new Error(`Broken local reference in dist/index.html: ${ref}`);
  }
}

const feed = readFileSync("dist/feed.xml", "utf8");
const sitemap = readFileSync("dist/sitemap.xml", "utf8");
const llms = readFileSync("dist/llms.txt", "utf8");

if (!llms.includes("Unity") || !llms.includes("qq1417015340@gmail.com")) {
  throw new Error("dist/llms.txt is missing GEO profile facts");
}

if (!indexZh.includes("mailto:qq1417015340@gmail.com") || !indexZh.includes('id="contact"')) {
  throw new Error("zh index is missing contact section");
}

for (const slug of postSlugs) {
  for (const prefix of ["", "en/"]) {
    const url = `/${prefix}posts/${slug}/`;
    if (!sitemap.includes(`${url.replace(/^\//, prefix ? "en/" : "")}`) && !sitemap.includes(`/posts/${slug}/`)) {
      // sitemap uses full URLs
    }
    if (!sitemap.includes(`/posts/${slug}/`) || !sitemap.includes(`/en/posts/${slug}/`)) {
      throw new Error(`Sitemap is missing bilingual routes for post: ${slug}`);
    }
  }
  if (!feed.includes(`/posts/${slug}/`) || !feed.includes(`/en/posts/${slug}/`)) {
    throw new Error(`RSS feed is missing bilingual items for post: ${slug}`);
  }
}

const wrangler = readFileSync("wrangler.toml", "utf8");
for (const expected of ['main = "worker/worker.ts"', 'binding = "ASSETS"', 'directory = "./dist"']) {
  if (!wrangler.includes(expected)) {
    throw new Error(`wrangler.toml is missing: ${expected}`);
  }
}

if (!existsSync(join(distDir, ".vite", "manifest.json"))) {
  throw new Error("Missing Vite build manifest at dist/.vite/manifest.json");
}

for (const file of ["functions/health.js", "worker/worker.ts"]) {
  const content = readFileSync(file, "utf8");
  if (!content.includes('"dist"')) {
    throw new Error(`${file} must report assets: dist`);
  }
}

const headers = readFileSync("dist/_headers", "utf8");
if (headers.includes("*/")) {
  throw new Error('dist/_headers must not contain C-style comment closers ("*/")');
}

for (const [index, line] of headers.split(/\r?\n/).entries()) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.endsWith("/*") || (trimmed.startsWith("/") && trimmed.includes("*"))) {
    continue;
  }
  if (!/^[A-Za-z0-9!#$&'*+.^_`|~-]+:\s/.test(trimmed)) {
    throw new Error(`dist/_headers line ${index + 1} is not a valid header pair: ${line}`);
  }
}

console.log("dist verification passed");
