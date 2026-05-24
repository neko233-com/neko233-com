import type { Locale } from "./locale";

type UiCopy = Record<Locale, string>;

export const ui = {
  navPosts: { zh: "文章", en: "Posts" } satisfies UiCopy,
  navAbout: { zh: "关于", en: "About" } satisfies UiCopy,
  navStacks: { zh: "技术栈", en: "Stacks" } satisfies UiCopy,
  navRepos: { zh: "仓库", en: "Repos" } satisfies UiCopy,
  navContact: { zh: "联系", en: "Contact" } satisfies UiCopy,
  navGithub: { zh: "GitHub", en: "GitHub" } satisfies UiCopy,
  read: { zh: "阅读", en: "Read" } satisfies UiCopy,
  backHome: { zh: "返回首页", en: "Back home" } satisfies UiCopy,
  rss: { zh: "RSS", en: "RSS" } satisfies UiCopy,
  langSwitch: { zh: "English", en: "中文" } satisfies UiCopy,
  langAria: { zh: "切换到英文", en: "Switch to Chinese" } satisfies UiCopy,
  heroEyebrow: {
    zh: "STATUS // 个人博客",
    en: "STATUS // PERSONAL BLOG",
  } satisfies UiCopy,
  heroCtaStacks: { zh: "技术栈", en: "Tech stacks" } satisfies UiCopy,
  heroCtaPosts: { zh: "看文章", en: "Read posts" } satisfies UiCopy,
  heroCtaContact: { zh: "联系我", en: "Contact" } satisfies UiCopy,
  heroCtaGithub: { zh: "GitHub", en: "GitHub" } satisfies UiCopy,
  aboutEyebrow: { zh: "PROFILE", en: "PROFILE" } satisfies UiCopy,
  aboutTitle: { zh: "两个方向", en: "Two tracks" } satisfies UiCopy,
  doingNowTitle: { zh: "现在在做的", en: "Currently working on" } satisfies UiCopy,
  gameTitle: { zh: "游戏方向", en: "Games" } satisfies UiCopy,
  agentTitle: { zh: "AI Agent 方向", en: "AI Agent" } satisfies UiCopy,
  stacksEyebrow: { zh: "SKILL MATRIX", en: "SKILL MATRIX" } satisfies UiCopy,
  stacksTitle: { zh: "技术栈", en: "Tech stacks" } satisfies UiCopy,
  gameStackTitle: { zh: "GAMES // 游戏", en: "GAMES" } satisfies UiCopy,
  agentStackTitle: { zh: "AI AGENT", en: "AI AGENT" } satisfies UiCopy,
  infraStackTitle: { zh: "WEB & EDGE", en: "WEB & EDGE" } satisfies UiCopy,
  reposEyebrow: { zh: "REPOS", en: "REPOS" } satisfies UiCopy,
  reposTitle: { zh: "GitHub 仓库", en: "GitHub repos" } satisfies UiCopy,
  postsEyebrow: { zh: "LOG", en: "LOG" } satisfies UiCopy,
  postsTitle: { zh: "最新文章", en: "Latest posts" } satisfies UiCopy,
  contactEyebrow: { zh: "CONTACT", en: "CONTACT" } satisfies UiCopy,
  contactTitle: { zh: "欢迎交流", en: "Get in touch" } satisfies UiCopy,
  contactBody: {
    zh: "有合作、交流或技术问题，欢迎发邮件。",
    en: "For collaboration, questions, or just saying hi — email works best.",
  } satisfies UiCopy,
  contactEmailLabel: { zh: "EMAIL", en: "EMAIL" } satisfies UiCopy,
  notFoundTitle: { zh: "LINK FAILED", en: "LINK FAILED" } satisfies UiCopy,
  notFoundBody: {
    zh: "目标节点不存在。",
    en: "Target node not found.",
  } satisfies UiCopy,
  notFoundCta: { zh: "返回首页", en: "Back home" } satisfies UiCopy,
  viewRepo: { zh: "查看", en: "View" } satisfies UiCopy,
} as const;

export function t(key: keyof typeof ui, locale: Locale): string {
  return ui[key][locale];
}
