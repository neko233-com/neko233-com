import type { Plugin } from "vite";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { getPostBySlug, getSortedPosts } from "../data/posts";
import { locales, type Locale } from "../i18n/locale";
import { renderLlmsTxt } from "../lib/seo";
import {
  readManifest,
  render404Page,
  renderFeed,
  renderHomePage,
  renderPostPage,
  renderSitemap,
  type AssetRefs,
} from "./render-pages";

const devAssets: AssetRefs = {
  css: "",
  js: "/src/main.ts",
};

function writeOutput(path: string, html: string): string {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, html, "utf8");
  return path;
}

function resolveLocaleFromPath(pathname: string): { locale: Locale; rest: string } | null {
  if (pathname === "/" || pathname === "/index.html") {
    return { locale: "zh", rest: "/" };
  }

  if (pathname === "/en" || pathname === "/en/" || pathname === "/en/index.html") {
    return { locale: "en", rest: "/" };
  }

  const enPostMatch = pathname.match(/^\/en\/posts\/([^/]+)\/?$/);
  if (enPostMatch) {
    return { locale: "en", rest: `/posts/${enPostMatch[1]}/` };
  }

  const zhPostMatch = pathname.match(/^\/posts\/([^/]+)\/?$/);
  if (zhPostMatch) {
    return { locale: "zh", rest: `/posts/${zhPostMatch[1]}/` };
  }

  if (pathname === "/404.html") {
    return { locale: "zh", rest: "/404.html" };
  }

  if (pathname === "/en/404.html") {
    return { locale: "en", rest: "/404.html" };
  }

  return null;
}

function renderResolvedPage(locale: Locale, rest: string, assets: AssetRefs): string | null {
  if (rest === "/") {
    return renderHomePage(locale, assets);
  }

  const postMatch = rest.match(/^\/posts\/([^/]+)\/?$/);
  if (postMatch) {
    const post = getPostBySlug(postMatch[1]);
    if (!post) {
      return null;
    }
    return renderPostPage(post, locale, assets);
  }

  if (rest === "/404.html") {
    return render404Page(locale, assets);
  }

  return null;
}

function emitLocaleBuildOutputs(distDir: string, assets: AssetRefs): void {
  writeOutput(join(distDir, "index.html"), renderHomePage("zh", assets));
  writeOutput(join(distDir, "en", "index.html"), renderHomePage("en", assets));

  for (const post of getSortedPosts()) {
    writeOutput(
      join(distDir, "posts", post.slug, "index.html"),
      renderPostPage(post, "zh", assets),
    );
    writeOutput(
      join(distDir, "en", "posts", post.slug, "index.html"),
      renderPostPage(post, "en", assets),
    );
  }

  writeOutput(join(distDir, "404.html"), render404Page("zh", assets));
  writeOutput(join(distDir, "en", "404.html"), render404Page("en", assets));
  writeOutput(join(distDir, "feed.xml"), renderFeed());
  writeOutput(join(distDir, "sitemap.xml"), renderSitemap());
  writeOutput(join(distDir, "llms.txt"), renderLlmsTxt());
}

export function staticSitePlugin(): Plugin {
  return {
    name: "neko233-static-site",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const pathname = req.url?.split("?")[0] ?? "";
        const resolved = resolveLocaleFromPath(pathname);

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

        if (pathname === "/llms.txt") {
          res.setHeader("Content-Type", "text/plain; charset=utf-8");
          res.end(renderLlmsTxt());
          return;
        }

        if (!resolved) {
          next();
          return;
        }

        const html = renderResolvedPage(resolved.locale, resolved.rest, devAssets);
        if (!html) {
          next();
          return;
        }

        res.setHeader("Content-Type", "text/html; charset=utf-8");
        res.end(html);
      });
    },
    closeBundle() {
      const distDir = join(process.cwd(), "dist");
      const assets = readManifest(distDir);
      emitLocaleBuildOutputs(distDir, assets);
    },
  };
}

export { locales };
