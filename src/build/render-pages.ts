import { readFileSync } from "node:fs";
import { join } from "node:path";
import { getPostContent, getSortedPosts, type Post } from "../data/posts";
import { getProfile } from "../data/profile";
import { repoDescription, repos } from "../data/repos";
import {
  siteAuthor,
  siteConfig,
  siteDescription,
  siteDisplayName,
  sitePageTitle,
} from "../data/site";
import {
  alternateLocale,
  autoLocaleRedirectScript,
  homePath,
  localeHtmlLang,
  localeOgLocale,
  localePath,
  postPath,
  type Locale,
} from "../i18n/locale";
import { t } from "../i18n/ui";
import { formatDisplayDate, formatRssDate } from "../lib/dates";
import { escapeHtml } from "../lib/html";
import {
  renderBlogJsonLd,
  renderBlogPostingJsonLd,
  renderFaqJsonLd,
  renderPersonJsonLd,
  renderRepoListJsonLd,
  renderSeoKeywords,
  renderWebsiteJsonLd,
} from "../lib/seo";

export interface AssetRefs {
  css: string;
  js: string;
}

function assetHref(path: string): string {
  if (!path) {
    return "";
  }
  return path.startsWith("/") ? path : `/${path}`;
}

function canonicalUrl(locale: Locale, path: string): string {
  return `${siteConfig.url}${localePath(locale, path)}`;
}

function hreflangLinks(locale: Locale, path: string): string {
  const other = alternateLocale(locale);
  return `
    <link rel="canonical" href="${canonicalUrl(locale, path)}" />
    <link rel="alternate" hreflang="${localeHtmlLang[locale]}" href="${canonicalUrl(locale, path)}" />
    <link rel="alternate" hreflang="${localeHtmlLang[other]}" href="${canonicalUrl(other, path)}" />
    <link rel="alternate" hreflang="x-default" href="${canonicalUrl("zh", path)}" />`;
}

function layout(options: {
  locale: Locale;
  title: string;
  description: string;
  body: string;
  assets: AssetRefs;
  ogType?: "website" | "article";
  publishedTime?: string;
  path?: string;
  jsonLd?: string[];
}): string {
  const {
    locale,
    title,
    description,
    body,
    assets,
    ogType = "website",
    publishedTime,
    path = "/",
    jsonLd = [],
  } = options;

  return `<!doctype html>
<html lang="${localeHtmlLang[locale]}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="${escapeHtml(description)}" />
    <meta name="author" content="${escapeHtml(siteAuthor(locale))}" />
    <meta name="keywords" content="${renderSeoKeywords(locale)}" />
    <meta name="robots" content="index, follow, max-image-preview:large" />
    <meta name="theme-color" content="${siteConfig.themeColor}" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:type" content="${ogType}" />
    <meta property="og:locale" content="${localeOgLocale[locale]}" />
    <meta property="og:site_name" content="${escapeHtml(siteDisplayName(locale))}" />
    <meta property="og:url" content="${canonicalUrl(locale, path)}" />
    ${publishedTime ? `<meta property="article:published_time" content="${publishedTime}" />` : ""}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    <title>${escapeHtml(title)}</title>
    ${hreflangLinks(locale, path)}
    <link rel="alternate" type="application/rss+xml" title="${escapeHtml(siteDisplayName(locale))} RSS" href="/feed.xml" />
    <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
    <link rel="manifest" href="/site.webmanifest" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=M+PLUS+1p:wght@400;700;800&family=Noto+Sans+SC:wght@400;500;700&display=swap" rel="stylesheet" />
    ${assets.css ? `<link rel="stylesheet" href="${assetHref(assets.css)}" />` : ""}
    <script>${autoLocaleRedirectScript}</script>
    ${jsonLd.map((block) => `<script type="application/ld+json">${block}</script>`).join("\n    ")}
  </head>
  <body data-locale="${locale}">
    ${body}
    <script type="module" src="${assetHref(assets.js)}"></script>
  </body>
</html>`;
}

function renderLangSwitch(locale: Locale): string {
  const other = alternateLocale(locale);
  return `<button class="lang-switch magnetic" type="button" data-locale-target="${other}" aria-label="${escapeHtml(t("langAria", locale))}">${escapeHtml(t("langSwitch", locale))}</button>`;
}

function renderSakuraLayer(): string {
  return `<div class="sakura-layer" aria-hidden="true">${Array.from({ length: 16 }, (_, index) => {
    const left = 4 + (index * 6.1) % 92;
    const delay = (index * 0.85).toFixed(2);
    const duration = 12 + (index % 5) * 2;
    return `<span style="--petal-left:${left}%;--petal-delay:${delay}s;--petal-duration:${duration}s"></span>`;
  }).join("")}</div>`;
}

function renderHeader(locale: Locale, active: "home" | "posts" | "post"): string {
  const base = homePath(locale);
  return `<header class="site-header" data-reveal>
      <a class="brand magnetic" href="${base}">
        <span class="brand-mark" aria-hidden="true">✦</span>
        <span class="brand-stack">
          <span class="brand-name">${siteConfig.name}</span>
          <span class="brand-zh">${locale === "zh" ? siteConfig.nameZh : "Ke Le Ji Chi"}</span>
        </span>
      </a>
      <nav aria-label="Primary navigation">
        <a href="${base}#about">${t("navAbout", locale)}</a>
        <a href="${base}#posts"${active === "posts" ? ' aria-current="page"' : ""}>${t("navPosts", locale)}</a>
        <a href="${base}#repos">${t("navRepos", locale)}</a>
        <a href="${base}#contact">${t("navContact", locale)}</a>
        <a href="${siteConfig.github}">${t("navGithub", locale)}</a>
        ${renderLangSwitch(locale)}
      </nav>
    </header>`;
}

function renderRepoRows(locale: Locale): string {
  return repos
    .map(
      (repo, index) => `
          <article class="repo-row tilt-card" data-reveal data-tilt style="--reveal-delay:${index * 70}ms">
            <div class="repo-meta">
              <h3><a href="${repo.url}" rel="noopener noreferrer">${escapeHtml(repo.name)}</a></h3>
              ${repo.language ? `<span class="repo-lang">${escapeHtml(repo.language)}</span>` : ""}
            </div>
            <p>${escapeHtml(repoDescription(repo, locale))}</p>
            <a class="read-link magnetic" href="${repo.url}" rel="noopener noreferrer">${t("viewRepo", locale)}</a>
          </article>`,
    )
    .join("");
}

function renderPostRows(locale: Locale): string {
  return getSortedPosts()
    .map((post, index) => {
      const content = getPostContent(post, locale);
      return `
          <article class="post-row tilt-card" data-reveal data-tilt style="--reveal-delay:${index * 90}ms">
            <time datetime="${post.date}">${formatDisplayDate(post.date)}</time>
            <div>
              <h3><a href="${postPath(locale, post.slug)}">${escapeHtml(content.title)}</a></h3>
              <p>${escapeHtml(content.excerpt)}</p>
            </div>
            <a class="read-link magnetic" href="${postPath(locale, post.slug)}" aria-label="${escapeHtml(t("read", locale))} ${escapeHtml(content.title)}">${t("read", locale)}</a>
          </article>`;
    })
    .join("");
}

export function renderHomePage(locale: Locale, assets: AssetRefs): string {
  const profile = getProfile(locale);
  const base = homePath(locale);

  const body = `
    ${renderSakuraLayer()}
    ${renderHeader(locale, "home")}
    <canvas id="aurora-canvas" aria-hidden="true"></canvas>
    <div class="cursor-glow" aria-hidden="true"></div>
    <div class="anime-blob anime-blob-a" aria-hidden="true"></div>
    <div class="anime-blob anime-blob-b" aria-hidden="true"></div>

    <main>
      <section class="hero" aria-labelledby="hero-title">
        <div class="hero-layout">
          <div class="hero-copy panel-card" data-reveal>
            <p class="eyebrow">${t("heroEyebrow", locale)}</p>
            <h1 id="hero-title">${escapeHtml(siteConfig.name)}</h1>
            <p class="hero-subname">${locale === "zh" ? siteConfig.nameZh : "Ke Le Ji Chi"}</p>
            <p class="hero-role">${escapeHtml(profile.headline)}</p>
            <p class="hero-summary">${escapeHtml(profile.summary)}</p>
            <div class="hero-actions">
              <a class="button primary magnetic" href="${base}#posts">${t("heroCtaPosts", locale)}</a>
              <a class="button secondary magnetic" href="mailto:${siteConfig.email}">${t("heroCtaContact", locale)}</a>
              <a class="button ghost magnetic" href="${siteConfig.github}">${t("heroCtaGithub", locale)}</a>
            </div>
          </div>
          <div class="hero-stage" data-reveal style="--reveal-delay:120ms">
            <div class="hero-stage-frame panel-card">
              <span class="hero-stage-tag">Live2D</span>
              <div id="live2d-stage" class="live2d-stage" aria-label="${locale === "zh" ? "Live2D 角色展示" : "Live2D character display"}"></div>
            </div>
          </div>
        </div>
      </section>

      <section class="section" id="about" aria-labelledby="about-title">
        <div class="section-heading" data-reveal>
          <p class="eyebrow">${t("aboutEyebrow", locale)}</p>
          <h2 id="about-title">${t("aboutTitle", locale)}</h2>
        </div>
        <div class="about-grid">
          <article class="about-card panel-card" data-reveal>
            <h3>${t("doingNowTitle", locale)}</h3>
            <p>${escapeHtml(profile.doingNow)}</p>
          </article>
          <article class="about-card panel-card" data-reveal style="--reveal-delay:90ms">
            <h3>${t("businessTitle", locale)}</h3>
            <p>${escapeHtml(profile.businessDirection)}</p>
          </article>
          <article class="about-card panel-card" data-reveal style="--reveal-delay:180ms">
            <h3>${t("techTitle", locale)}</h3>
            <p>${escapeHtml(profile.techDirection)}</p>
          </article>
        </div>
        <div class="tag-strip" data-reveal style="--reveal-delay:240ms">
          ${profile.expertise.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}
        </div>
      </section>

      <section class="section" id="posts" aria-labelledby="posts-title">
        <div class="section-heading" data-reveal>
          <p class="eyebrow">${t("postsEyebrow", locale)}</p>
          <h2 id="posts-title">${t("postsTitle", locale)}</h2>
        </div>
        <div class="post-list">${renderPostRows(locale)}</div>
      </section>

      <section class="section" id="repos" aria-labelledby="repos-title">
        <div class="section-heading" data-reveal>
          <p class="eyebrow">${t("reposEyebrow", locale)}</p>
          <h2 id="repos-title">${t("reposTitle", locale)}</h2>
        </div>
        <div class="repo-list">${renderRepoRows(locale)}</div>
      </section>

      <section class="section contact-section" id="contact" aria-labelledby="contact-title">
        <div class="contact-card panel-card" data-reveal>
          <p class="eyebrow">${t("contactEyebrow", locale)}</p>
          <h2 id="contact-title">${t("contactTitle", locale)}</h2>
          <p class="contact-body">${escapeHtml(t("contactBody", locale))}</p>
          <div class="contact-line">
            <span>${t("contactEmailLabel", locale)}</span>
            <a class="contact-email magnetic" href="mailto:${siteConfig.email}">${siteConfig.email}</a>
          </div>
        </div>
      </section>
    </main>

    <footer class="footer">
      <span>${siteDisplayName(locale)}</span>
      <span class="footer-links">
        <a href="mailto:${siteConfig.email}">${siteConfig.email}</a>
        <a href="/feed.xml">${t("rss", locale)}</a>
        <a href="${siteConfig.githubProfile}/blob/main/blog.md">blog.md</a>
      </span>
    </footer>`;

  return layout({
    locale,
    title: sitePageTitle(locale),
    description: siteDescription(locale),
    body,
    assets,
    path: "/",
    jsonLd: [
      renderPersonJsonLd(locale),
      renderWebsiteJsonLd(locale),
      renderBlogJsonLd(locale),
      renderRepoListJsonLd(locale),
      renderFaqJsonLd(locale),
    ],
  });
}

export function renderPostPage(post: Post, locale: Locale, assets: AssetRefs): string {
  const content = getPostContent(post, locale);
  const body = `
    ${renderSakuraLayer()}
    ${renderHeader(locale, "post")}
    <canvas id="aurora-canvas" aria-hidden="true" data-subtle></canvas>

    <main class="section article">
      <article itemscope itemtype="https://schema.org/BlogPosting">
        <p class="eyebrow" data-reveal>${formatDisplayDate(post.date)}</p>
        <h1 itemprop="headline" data-reveal data-scramble="${escapeHtml(content.title)}">${escapeHtml(content.title)}</h1>
        <div itemprop="articleBody">${content.content}</div>
        <p data-reveal><a class="button secondary magnetic" href="${homePath(locale)}">${t("backHome", locale)}</a></p>
      </article>
    </main>`;

  return layout({
    locale,
    title: `${content.title} | ${siteConfig.name}`,
    description: content.description,
    body,
    assets,
    ogType: "article",
    publishedTime: post.date,
    path: `/posts/${post.slug}/`,
    jsonLd: [renderBlogPostingJsonLd(post, locale)],
  });
}

export function render404Page(locale: Locale, assets: AssetRefs): string {
  const body = `
    ${renderSakuraLayer()}
    ${renderHeader(locale, "home")}
    <main class="section article not-found">
      <canvas id="aurora-canvas" aria-hidden="true" data-subtle></canvas>
      <section data-reveal>
        <p class="eyebrow">404</p>
        <h1 data-scramble="${escapeHtml(t("notFoundTitle", locale))}">${escapeHtml(t("notFoundTitle", locale))}</h1>
        <p class="lede">${escapeHtml(t("notFoundBody", locale))}</p>
        <p><a class="button primary magnetic" href="${homePath(locale)}">${t("notFoundCta", locale)}</a></p>
      </section>
    </main>`;

  return layout({
    locale,
    title: `404 | ${siteConfig.name}`,
    description: t("notFoundBody", locale),
    body,
    assets,
    path: "/404.html",
  });
}

export function renderFeed(): string {
  const zhItems = getSortedPosts()
    .map((post) => {
      const content = getPostContent(post, "zh");
      return `
    <item>
      <title>${escapeHtml(content.title)}</title>
      <link>${siteConfig.url}${postPath("zh", post.slug)}</link>
      <guid>${siteConfig.url}${postPath("zh", post.slug)}</guid>
      <pubDate>${formatRssDate(post.date)}</pubDate>
      <description>${escapeHtml(content.excerpt)}</description>
    </item>`;
    })
    .join("");

  const enItems = getSortedPosts()
    .map((post) => {
      const content = getPostContent(post, "en");
      return `
    <item>
      <title>${escapeHtml(content.title)}</title>
      <link>${siteConfig.url}${postPath("en", post.slug)}</link>
      <guid>${siteConfig.url}${postPath("en", post.slug)}</guid>
      <pubDate>${formatRssDate(post.date)}</pubDate>
      <description>${escapeHtml(content.excerpt)}</description>
    </item>`;
    })
    .join("");

  const latest = getSortedPosts()[0];

  return `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeHtml(siteDisplayName("zh"))}</title>
    <link>${siteConfig.url}/</link>
    <description>${escapeHtml(siteDescription("zh"))}</description>
    <language>zh-CN</language>
    <lastBuildDate>${latest ? formatRssDate(latest.date) : formatRssDate("2026-05-24")}</lastBuildDate>
    <atom:link href="${siteConfig.url}/feed.xml" rel="self" type="application/rss+xml" />
    ${zhItems}
    ${enItems}
  </channel>
</rss>`;
}

export function renderSitemap(): string {
  const urls = [
    `<url><loc>${siteConfig.url}/</loc><xhtml:link rel="alternate" hreflang="zh-CN" href="${siteConfig.url}/" /><xhtml:link rel="alternate" hreflang="en" href="${siteConfig.url}/en/" /></url>`,
    `<url><loc>${siteConfig.url}/en/</loc><xhtml:link rel="alternate" hreflang="zh-CN" href="${siteConfig.url}/" /><xhtml:link rel="alternate" hreflang="en" href="${siteConfig.url}/en/" /></url>`,
    ...getSortedPosts().flatMap((post) => [
      `<url><loc>${siteConfig.url}${postPath("zh", post.slug)}</loc><lastmod>${post.date}</lastmod><xhtml:link rel="alternate" hreflang="zh-CN" href="${siteConfig.url}${postPath("zh", post.slug)}" /><xhtml:link rel="alternate" hreflang="en" href="${siteConfig.url}${postPath("en", post.slug)}" /></url>`,
      `<url><loc>${siteConfig.url}${postPath("en", post.slug)}</loc><lastmod>${post.date}</lastmod><xhtml:link rel="alternate" hreflang="zh-CN" href="${siteConfig.url}${postPath("zh", post.slug)}" /><xhtml:link rel="alternate" hreflang="en" href="${siteConfig.url}${postPath("en", post.slug)}" /></url>`,
    ]),
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
  ${urls.join("\n  ")}
</urlset>`;
}

export function readManifest(distDir: string): AssetRefs {
  const manifestPath = join(distDir, ".vite", "manifest.json");
  const manifest = JSON.parse(readFileSync(manifestPath, "utf8")) as Record<
    string,
    { file: string; css?: string[] }
  >;

  const entry = manifest["src/main.ts"];
  if (!entry) {
    throw new Error("Build manifest is missing src/main.ts entry.");
  }

  return {
    css: entry.css?.[0] ?? "",
    js: entry.file,
  };
}
