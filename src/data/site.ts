import type { Locale } from "../i18n/locale";

export const siteConfig = {
  name: "neko233",
  nameZh: "可乐鸡翅",
  url: "https://neko233.com",
  github: "https://github.com/neko233-com",
  githubProfile: "https://github.com/neko233-com/neko233-com",
  email: "qq1417015340@gmail.com",
  themeColor: "#040c1c",
} as const;

const localized = {
  zh: {
    tagline: "全栈开发工程师 · 技术负责人",
    description:
      "neko233（可乐鸡翅）的博客：游戏和 Agent 两条线，记项目、踩坑、开源代码。",
    author: "neko233（可乐鸡翅）",
    blogLabel: "个人博客",
  },
  en: {
    tagline: "Full-stack Engineer · Tech Lead",
    description:
      "Blog of neko233 (Ke Le Ji Chi): games and Agent — projects, notes, open-source code.",
    author: "neko233 (Ke Le Ji Chi)",
    blogLabel: "Personal Blog",
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
