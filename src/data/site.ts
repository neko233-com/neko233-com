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
    tagline: "全栈开发工程师 · 技术负责人",
    description:
      "neko233（可乐鸡翅）的中文博客：记录 GitHub 开源仓库与工程实践。全栈开发工程师、技术负责人，主攻 Agent 业务落地，曾任游戏行业 Unity + Go/Kotlin 分布式后端资深全栈。",
    author: "neko233（可乐鸡翅）",
    blogLabel: "中文博客",
  },
  en: {
    tagline: "Full-stack Engineer · Tech Lead",
    description:
      "neko233 (Ke Le Ji Chi) bilingual blog documenting GitHub repos and engineering practice. Full-stack engineer and tech lead focused on Agent-driven business delivery; former senior game-industry full-stack engineer for Unity and Go/Kotlin distributed backends.",
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
