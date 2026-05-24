import type { Locale } from "../i18n/locale";

export const siteConfig = {
  name: "neko233",
  nameZh: "可乐鸡翅",
  url: "https://neko233.com",
  github: "https://github.com/neko233-com",
  githubProfile: "https://github.com/neko233-com/neko233-com",
  themeColor: "#05070d",
} as const;

const localized = {
  zh: {
    tagline: "全栈 · 技术负责人",
    description:
      "neko233（可乐鸡翅）的个人站：Unity / Go / Kotlin 出身，现在在 Web 和 Edge 上写能上线的代码。仓库、踩坑、Live2D 动效，都在这里。",
    author: "neko233（可乐鸡翅）",
    blogLabel: "中文博客",
  },
  en: {
    tagline: "Full-stack · Tech lead",
    description:
      "neko233 (Ke Le Ji Chi): game-industry full-stack background, now shipping on the web and Cloudflare Edge. Repos, notes, Live2D UI experiments.",
    author: "neko233 (Ke Le Ji Chi)",
    blogLabel: "Bilingual Blog",
  },
} as const;

export function siteDisplayName(locale: Locale = "zh"): string {
  return locale === "zh"
    ? `${siteConfig.name} · ${siteConfig.nameZh}`
    : `${siteConfig.name} · Ke Le Ji Chi`;
}

export function siteDescription(locale: Locale): string {
  return localized[locale].description;
}

export function siteTagline(locale: Locale): string {
  return localized[locale].tagline;
}

export function siteAuthor(locale: Locale): string {
  return localized[locale].author;
}

export function siteBlogLabel(locale: Locale): string {
  return localized[locale].blogLabel;
}

export function sitePageTitle(locale: Locale): string {
  return `${siteConfig.name} | ${locale === "zh" ? siteConfig.nameZh : "Ke Le Ji Chi"}`;
}
