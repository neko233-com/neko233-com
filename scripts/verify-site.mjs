import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const requiredFiles = [
  "site/index.html",
  "site/404.html",
  "site/styles.css",
  "site/app.js",
  "site/feed.xml",
  "site/sitemap.xml",
  "site/robots.txt",
  "site/posts/hello-edge.html",
  "site/posts/profile-and-blog-split.html",
  "wrangler.toml",
  "src/worker.js",
];

for (const file of requiredFiles) {
  if (!existsSync(file)) {
    throw new Error(`Missing required file: ${file}`);
  }
}

const index = readFileSync("site/index.html", "utf8");
const localRefs = [...index.matchAll(/(?:href|src)="(\/[^"#?]+)"/g)].map((match) => match[1]);

for (const ref of localRefs) {
  if (ref === "/") {
    continue;
  }

  const filePath = join("site", ref.slice(1));
  if (!existsSync(filePath)) {
    throw new Error(`Broken local reference in site/index.html: ${ref}`);
  }
}

const wrangler = readFileSync("wrangler.toml", "utf8");

for (const expected of ['main = "src/worker.js"', 'binding = "ASSETS"', 'directory = "./site"']) {
  if (!wrangler.includes(expected)) {
    throw new Error(`wrangler.toml is missing: ${expected}`);
  }
}

console.log("site verification passed");
