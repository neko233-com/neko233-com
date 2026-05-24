import type { Locale } from "./locale";

type UiCopy = Record<Locale, string>;

export const ui = {
  navPosts: { zh: "文章", en: "Posts" } satisfies UiCopy,
  navAbout: { zh: "关于", en: "About" } satisfies UiCopy,
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
  heroCtaPosts: { zh: "看文章", en: "Read posts" } satisfies UiCopy,
  heroCtaContact: { zh: "联系我", en: "Contact" } satisfies UiCopy,
  heroCtaGithub: { zh: "GitHub", en: "GitHub" } satisfies UiCopy,
  aboutEyebrow: { zh: "关于我", en: "About" } satisfies UiCopy,
  aboutTitle: { zh: "我在做的与方向", en: "What I do & focus" } satisfies UiCopy,
  doingNowTitle: { zh: "现在在做的", en: "Currently working on" } satisfies UiCopy,
  businessTitle: { zh: "业务方向", en: "Business focus" } satisfies UiCopy,
  techTitle: { zh: "技术方向", en: "Technical focus" } satisfies UiCopy,
  reposEyebrow: { zh: "开源", en: "Open source" } satisfies UiCopy,
  reposTitle: { zh: "GitHub 仓库", en: "GitHub repos" } satisfies UiCopy,
  postsEyebrow: { zh: "博客", en: "Blog" } satisfies UiCopy,
  postsTitle: { zh: "最新文章", en: "Latest posts" } satisfies UiCopy,
  contactEyebrow: { zh: "联系", en: "Contact" } satisfies UiCopy,
  contactTitle: { zh: "欢迎交流", en: "Get in touch" } satisfies UiCopy,
  contactBody: {
    zh: "有合作、交流或技术问题，欢迎发邮件。",
    en: "For collaboration, questions, or just saying hi — email works best.",
  } satisfies UiCopy,
  contactEmailLabel: { zh: "邮箱", en: "Email" } satisfies UiCopy,
  notFoundTitle: { zh: "页面不存在", en: "Page not found" } satisfies UiCopy,
  notFoundBody: {
    zh: "这个地址没有对应的内容。",
    en: "There is no content at this address.",
  } satisfies UiCopy,
  notFoundCta: { zh: "返回首页", en: "Back home" } satisfies UiCopy,
  viewRepo: { zh: "查看", en: "View" } satisfies UiCopy,
} as const;

export function t(key: keyof typeof ui, locale: Locale): string {
  return ui[key][locale];
}
