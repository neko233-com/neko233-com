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
    zh: "个人博客",
    en: "Personal blog",
  } satisfies UiCopy,
  heroCtaStacks: { zh: "看技术栈", en: "Stacks" } satisfies UiCopy,
  heroCtaPosts: { zh: "看文章", en: "Posts" } satisfies UiCopy,
  heroCtaContact: { zh: "联系我", en: "Contact" } satisfies UiCopy,
  heroCtaGithub: { zh: "GitHub", en: "GitHub" } satisfies UiCopy,
  aboutEyebrow: { zh: "关于", en: "About" } satisfies UiCopy,
  aboutTitle: { zh: "两条线", en: "Two tracks" } satisfies UiCopy,
  doingNowTitle: { zh: "最近在忙", en: "Lately" } satisfies UiCopy,
  gameTitle: { zh: "游戏", en: "Games" } satisfies UiCopy,
  agentTitle: { zh: "Agent", en: "Agent" } satisfies UiCopy,
  stacksEyebrow: { zh: "技术栈", en: "Stacks" } satisfies UiCopy,
  stacksTitle: { zh: "平时在用的", en: "What I actually use" } satisfies UiCopy,
  gameStackTitle: { zh: "游戏", en: "Games" } satisfies UiCopy,
  agentStackTitle: { zh: "Agent", en: "Agent" } satisfies UiCopy,
  infraStackTitle: { zh: "Web 相关", en: "Web" } satisfies UiCopy,
  reposEyebrow: { zh: "仓库", en: "Repos" } satisfies UiCopy,
  reposTitle: { zh: "GitHub 上的项目", en: "GitHub projects" } satisfies UiCopy,
  postsEyebrow: { zh: "文章", en: "Posts" } satisfies UiCopy,
  postsTitle: { zh: "最近写的", en: "Recent posts" } satisfies UiCopy,
  contactEyebrow: { zh: "联系", en: "Contact" } satisfies UiCopy,
  contactTitle: { zh: "找我聊", en: "Say hi" } satisfies UiCopy,
  contactBody: {
    zh: "合作、技术交流、或者单纯想聊聊，发邮件就行。",
    en: "Collaboration, tech chat, or just saying hi — email works.",
  } satisfies UiCopy,
  contactEmailLabel: { zh: "邮箱", en: "Email" } satisfies UiCopy,
  notFoundTitle: { zh: "页面不存在", en: "Page not found" } satisfies UiCopy,
  notFoundBody: {
    zh: "没有这个页面，返回首页看看吧。",
    en: "No page here. Head back home.",
  } satisfies UiCopy,
  notFoundCta: { zh: "返回首页", en: "Back home" } satisfies UiCopy,
  viewRepo: { zh: "打开", en: "Open" } satisfies UiCopy,
} as const;

export function t(key: keyof typeof ui, locale: Locale): string {
  return ui[key][locale];
}
