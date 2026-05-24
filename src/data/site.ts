import type { Locale } from "../i18n/locale";

export const siteConfig = {
  name: "neko233",
  nameZh: "可乐鸡翅",
  url: "https://neko233.com",
  github: "https://github.com/neko233-com",
  githubProfile: "https://github.com/neko233-com/neko233-com",
  email: "qq1417015340@gmail.com",
  themeColor: "#161025",
} as const;

const localized = {
  zh: {
    tagline: "全栈开发工程师 · 技术负责人",
    description:
      "neko233（可乐鸡翅）的个人博客：记录正在做的项目、业务与技术方向，以及开发笔记与开源仓库。",
    author: "neko233（可乐鸡翅）",
    blogLabel: "个人博客",
  },
  en: {
    tagline: "Full-stack Engineer · Tech Lead",
    description:
      "Personal blog of neko233 (Ke Le Ji Chi): projects in progress, business and technical focus, dev notes, and open-source repos.",
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
