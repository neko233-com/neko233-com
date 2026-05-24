import type { Plugin } from "vite";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { getPostBySlug, getSortedPosts } from "../data/posts";
import { siteConfig, siteDisplayName } from "../data/site";
import { formatDisplayDate, formatRssDate } from "../lib/dates";
import { escapeHtml } from "../lib/html";

interface AssetRefs {
  css: string;
  js: string;
}

const devAssets: AssetRefs = {
  css: "",
  js: "/src/main.ts",
};

function assetHref(path: string): string {
  if (!path) {
    return "";
  }
  return path.startsWith("/") ? path : `/${path}`;
}

function readManifest(distDir: string): AssetRefs {
  const manifestPath = join(distDir, ".vite", "manifest.json");
  const manifest = JSON.parse(readFileSync(manifestPath, "utf8")) as Record<
    string,
    { file: string; css?: string[] }
  >;

  const entry = manifest["src/main.ts"];
  if (!entry) {
    throw new Error("Build manifest is missing src/main.ts entry.");
  }

  const css = entry.css?.[0] ?? "";
  const js = entry.file;

  return { css, js };
}

function writeOutput(path: string, html: string): void {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, html, "utf8");
}

function layout(options: {
  title: string;
  description: string;
  body: string;
  assets: AssetRefs;
  ogType?: "website" | "article";
  publishedTime?: string;
  path?: string;
}): string {
  const { title, description, body, assets, ogType = "website", publishedTime, path = "/" } = options;
  const canonical = `${siteConfig.url}${path}`;

  return `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="${escapeHtml(description)}" />
    <meta name="theme-color" content="${siteConfig.themeColor}" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:type" content="${ogType}" />
    <meta property="og:url" content="${canonical}" />
    ${publishedTime ? `<meta property="article:published_time" content="${publishedTime}" />` : ""}
    <meta name="twitter:card" content="summary_large_image" />
    <title>${escapeHtml(title)}</title>
    <link rel="alternate" type="application/rss+xml" title="${escapeHtml(siteDisplayName())} RSS" href="/feed.xml" />
    <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
    <link rel="manifest" href="/site.webmanifest" />
    ${assets.css ? `<link rel="stylesheet" href="${assetHref(assets.css)}" />` : ""}
  </head>
  <body>
    ${body}
    <script type="module" src="${assetHref(assets.js)}"></script>
  </body>
</html>`;
}

function renderHeader(active: "home" | "posts" | "post"): string {
  return `<header class="site-header" data-reveal>
      <a class="brand magnetic" href="/">
        <span class="brand-mark" aria-hidden="true"></span>
        <span class="brand-stack">
          <span class="brand-name">${siteConfig.name}</span>
          <span class="brand-zh">${siteConfig.nameZh}</span>
        </span>
      </a>
      <nav aria-label="Primary navigation">
        <a href="/#posts"${active === "posts" ? ' aria-current="page"' : ""}>Posts</a>
        <a href="/#edge">Edge</a>
        <a href="${siteConfig.github}">GitHub</a>
      </nav>
    </header>`;
}

function renderHomePage(assets: AssetRefs): string {
  const postRows = getSortedPosts()
    .map(
      (post, index) => `
          <article class="post-row tilt-card" data-reveal data-tilt style="--reveal-delay:${index * 90}ms">
            <time datetime="${post.date}">${formatDisplayDate(post.date)}</time>
            <div>
              <h3><a href="/posts/${post.slug}/">${escapeHtml(post.title)}</a></h3>
              <p>${escapeHtml(post.excerpt)}</p>
            </div>
            <a class="read-link magnetic" href="/posts/${post.slug}/" aria-label="Read ${escapeHtml(post.title)}">Read</a>
          </article>`,
    )
    .join("");

  const body = `
    ${renderHeader("home")}
    <canvas id="aurora-canvas" aria-hidden="true"></canvas>
    <div class="cursor-glow" aria-hidden="true"></div>
    <div class="noise-overlay" aria-hidden="true"></div>

    <main>
      <section class="hero" aria-labelledby="hero-title">
        <div class="hero-grid" aria-hidden="true" data-grid-warp>
          ${Array.from({ length: 12 }, () => "<span></span>").join("")}
        </div>
        <div class="orbital" aria-hidden="true">
          <span class="orbit orbit-a"></span>
          <span class="orbit orbit-b"></span>
          <span class="orbit orbit-c"></span>
          <span class="orbit-core"></span>
        </div>
        <div class="hero-copy" data-reveal>
          <p class="eyebrow">${siteConfig.nameZh} · Cloudflare Edge Blog</p>
          <h1 id="hero-title" data-scramble="${escapeHtml(siteConfig.name)}">${escapeHtml(siteConfig.name)}</h1>
          <p class="hero-subname" data-reveal>${siteConfig.nameZh}</p>
          <p class="lede">Notes from the edge: code, automation, systems, and the small details that make tools feel alive.</p>
          <div class="hero-actions">
            <a class="button primary magnetic" href="#posts">Read posts</a>
            <a class="button secondary magnetic" href="https://github.com/neko233-com">GitHub profile</a>
          </div>
        </div>
      </section>

      <section class="ticker" aria-label="Deployment signals">
        <div data-reveal style="--reveal-delay:60ms">
          <span>Build stack</span>
          <strong>Vite 8 + Rolldown</strong>
        </div>
        <div data-reveal style="--reveal-delay:120ms">
          <span>Deploy target</span>
          <strong>Cloudflare Pages</strong>
        </div>
        <div data-reveal style="--reveal-delay:180ms">
          <span>Build output</span>
          <strong>dist/</strong>
        </div>
      </section>

      <section class="section" id="posts" aria-labelledby="posts-title">
        <div class="section-heading" data-reveal>
          <p class="eyebrow">Logbook</p>
          <h2 id="posts-title">Latest Posts</h2>
        </div>
        <div class="post-list">
          ${postRows}
        </div>
      </section>

      <section class="section split" id="edge" aria-labelledby="edge-title">
        <div data-reveal>
          <p class="eyebrow">Source station</p>
          <h2 id="edge-title">One repository, two public surfaces.</h2>
        </div>
        <div class="terminal" data-reveal data-terminal>
          <p><span>$</span> github profile reads README.md</p>
          <p><span>$</span> vite build emits dist/</p>
          <p><span>$</span> cloudflare pages deploys dist/</p>
          <p><span>$</span> blog.md keeps the operating rules clear</p>
        </div>
      </section>
    </main>

    <footer class="footer">
      <span>${siteDisplayName()}</span>
      <span>
        <a href="/feed.xml">RSS</a>
        <a href="${siteConfig.github}/blob/main/blog.md">blog.md</a>
      </span>
    </footer>`;

  return layout({
    title: `${siteConfig.name} | ${siteConfig.nameZh}`,
    description: siteConfig.description,
    body,
    assets,
    path: "/",
  });
}

function renderPostPage(
  post: ReturnType<typeof getSortedPosts>[number],
  assets: AssetRefs,
): string {
  const body = `
    ${renderHeader("post")}
    <canvas id="aurora-canvas" aria-hidden="true" data-subtle></canvas>
    <div class="noise-overlay" aria-hidden="true"></div>

    <main class="section article">
      <article>
        <p class="eyebrow" data-reveal>${formatDisplayDate(post.date)}</p>
        <h1 data-reveal data-scramble="${escapeHtml(post.title)}">${escapeHtml(post.title)}</h1>
        ${post.content}
        <p data-reveal><a class="button secondary magnetic" href="/">Back to home</a></p>
      </article>
    </main>`;

  return layout({
    title: `${post.title} | ${siteConfig.name}`,
    description: post.description,
    body,
    assets,
    ogType: "article",
    publishedTime: post.date,
    path: `/posts/${post.slug}/`,
  });
}

function render404Page(assets: AssetRefs): string {
  const body = `
    <main class="section article not-found">
      <canvas id="aurora-canvas" aria-hidden="true" data-subtle></canvas>
      <section data-reveal>
        <p class="eyebrow">404</p>
        <h1 data-scramble="Signal lost.">Signal lost.</h1>
        <p class="lede">The edge route exists, but this page does not.</p>
        <p><a class="button primary magnetic" href="/">Return home</a></p>
      </section>
    </main>`;

  return layout({
    title: `404 | ${siteConfig.name}`,
    description: `Page not found on ${siteDisplayName()}.`,
    body,
    assets,
    path: "/404.html",
  });
}

function renderFeed(): string {
  const items = getSortedPosts()
    .map(
      (post) => `
    <item>
      <title>${escapeHtml(post.title)}</title>
      <link>${siteConfig.url}/posts/${post.slug}/</link>
      <guid>${siteConfig.url}/posts/${post.slug}/</guid>
      <pubDate>${formatRssDate(post.date)}</pubDate>
      <description>${escapeHtml(post.excerpt)}</description>
    </item>`,
    )
    .join("");

  const latest = getSortedPosts()[0];

  return `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeHtml(siteConfig.name)}</title>
    <link>${siteConfig.url}/</link>
    <description>${escapeHtml(siteConfig.description)}</description>
    <language>zh-CN</language>
    <lastBuildDate>${latest ? formatRssDate(latest.date) : formatRssDate("2026-05-24")}</lastBuildDate>
    <atom:link href="${siteConfig.url}/feed.xml" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;
}

function renderSitemap(): string {
  const urls = [
    `<url><loc>${siteConfig.url}/</loc></url>`,
    ...getSortedPosts().map(
      (post) =>
        `<url><loc>${siteConfig.url}/posts/${post.slug}/</loc><lastmod>${post.date}</lastmod></url>`,
    ),
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls.join("\n  ")}
</urlset>`;
}

export function staticSitePlugin(): Plugin {
  return {
    name: "neko233-static-site",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const pathname = req.url?.split("?")[0] ?? "";

        if (pathname === "/" || pathname === "/index.html") {
          res.setHeader("Content-Type", "text/html; charset=utf-8");
          res.end(renderHomePage(devAssets));
          return;
        }

        const postMatch = pathname.match(/^\/posts\/([^/]+)\/?$/);
        if (postMatch) {
          const post = getPostBySlug(postMatch[1]);
          if (post) {
            res.setHeader("Content-Type", "text/html; charset=utf-8");
            res.end(renderPostPage(post, devAssets));
            return;
          }
        }

        if (pathname === "/404.html") {
          res.setHeader("Content-Type", "text/html; charset=utf-8");
          res.end(render404Page(devAssets));
          return;
        }

        if (pathname === "/feed.xml") {
          res.setHeader("Content-Type", "application/xml; charset=utf-8");
          res.end(renderFeed());
          return;
        }

        if (pathname === "/sitemap.xml") {
          res.setHeader("Content-Type", "application/xml; charset=utf-8");
          res.end(renderSitemap());
          return;
        }

        next();
      });
    },
    closeBundle() {
      const distDir = join(process.cwd(), "dist");
      const assets = readManifest(distDir);

      writeOutput(join(distDir, "index.html"), renderHomePage(assets));

      for (const post of getSortedPosts()) {
        writeOutput(
          join(distDir, "posts", post.slug, "index.html"),
          renderPostPage(post, assets),
        );
      }

      writeOutput(join(distDir, "404.html"), render404Page(assets));
      writeOutput(join(distDir, "feed.xml"), renderFeed());
      writeOutput(join(distDir, "sitemap.xml"), renderSitemap());
    },
  };
}
