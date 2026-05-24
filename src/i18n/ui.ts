import type { Locale } from "./locale";

type UiCopy = Record<Locale, string>;

export const ui = {
  navPosts: { zh: "文章", en: "Posts" } satisfies UiCopy,
  navAbout: { zh: "关于", en: "About" } satisfies UiCopy,
  navRepos: { zh: "仓库", en: "Repos" } satisfies UiCopy,
  navGithub: { zh: "GitHub", en: "GitHub" } satisfies UiCopy,
  read: { zh: "阅读", en: "Read" } satisfies UiCopy,
  backHome: { zh: "返回首页", en: "Back home" } satisfies UiCopy,
  rss: { zh: "RSS", en: "RSS" } satisfies UiCopy,
  langSwitch: { zh: "English", en: "中文" } satisfies UiCopy,
  langAria: { zh: "切换到英文", en: "Switch to Chinese" } satisfies UiCopy,
  heroEyebrow: {
    zh: "可乐鸡翅 · 个人站",
    en: "Ke Le Ji Chi · personal site",
  } satisfies UiCopy,
  heroCtaPosts: { zh: "阅读文章", en: "Read posts" } satisfies UiCopy,
  heroCtaGithub: { zh: "GitHub 主页", en: "GitHub profile" } satisfies UiCopy,
  tickerRole: { zh: "岗位", en: "Role" } satisfies UiCopy,
  tickerFocus: { zh: "当前方向", en: "Current focus" } satisfies UiCopy,
  tickerStack: { zh: "技术栈", en: "Stack" } satisfies UiCopy,
  aboutEyebrow: { zh: "关于我", en: "About" } satisfies UiCopy,
  aboutTitle: { zh: "写代码的 · 带过人的", en: "Writes code · Led teams" } satisfies UiCopy,
  reposEyebrow: { zh: "GitHub 仓库", en: "GitHub repos" } satisfies UiCopy,
  reposTitle: { zh: "GitHub 上的东西", en: "Stuff on GitHub" } satisfies UiCopy,
  postsEyebrow: { zh: "文章", en: "Posts" } satisfies UiCopy,
  postsTitle: { zh: "最新文章", en: "Latest posts" } satisfies UiCopy,
  stackEyebrow: { zh: "工程栈", en: "Engineering" } satisfies UiCopy,
  stackTitle: {
    zh: "能构建，能部署，能跑。",
    en: "Build. Deploy. Run.",
  } satisfies UiCopy,
  notFoundTitle: { zh: "信号丢失", en: "Signal lost" } satisfies UiCopy,
  notFoundBody: {
    zh: "Edge 路由存在，但页面不存在。",
    en: "The edge route exists, but this page does not.",
  } satisfies UiCopy,
  notFoundCta: { zh: "返回首页", en: "Return home" } satisfies UiCopy,
  viewRepo: { zh: "查看仓库", en: "View repo" } satisfies UiCopy,
} as const;

export function t(key: keyof typeof ui, locale: Locale): string {
  return ui[key][locale];
}
