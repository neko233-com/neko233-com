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
  "dist/posts/hello-edge/index.html",
  "dist/posts/profile-and-blog-split/index.html",
  "wrangler.toml",
  "worker/worker.ts",
  "functions/health.js",
  "AGENTS.md",
  "blog.md",
];

for (const file of requiredFiles) {
  if (!existsSync(file)) {
    throw new Error(`Missing required file: ${file}`);
  }
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

const feed = readFileSync("dist/feed.xml", "utf8");
const sitemap = readFileSync("dist/sitemap.xml", "utf8");

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

console.log("dist verification passed");
