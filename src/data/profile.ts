import type { Locale } from "../i18n/locale";

const profileCopy = {
  zh: {
    role: "全栈开发",
    title: "技术负责人",
    headline: "Unity / Go / Kotlin 出身，现在在 Web 上写能上线的代码",
    summary:
      "我是 neko233，外号可乐鸡翅。带团队、扛线上、写客户端也写后端。这个站放仓库、踩坑记录，还有 Live2D 看板娘和改 UI 改到上头时的二次元审美残留。",
    currentFocus:
      "Web 全栈 + 分布式：TypeScript、Vite、Cloudflare Edge。能构建、能部署、能维护，不整 PPT 工程。",
    previousExperience:
      "游戏行业干了很多年：Unity 客户端，Go + Kotlin 分布式后端，技术负责人。大 DAU、大表、线上故障都见过。",
    expertise: [
      "Unity 客户端",
      "Go / Kotlin 后端",
      "分布式调度",
      "TypeScript / Vite",
      "Cloudflare Edge",
      "Live2D / 前端动效",
    ],
    keywords: [
      "neko233",
      "可乐鸡翅",
      "全栈开发",
      "技术负责人",
      "Unity",
      "Go",
      "Kotlin",
      "分布式后端",
      "游戏开发",
      "Live2D",
      "GitHub 开源",
    ],
    tickerRole: "技术负责人",
    tickerFocus: "Web 全栈 · Edge",
    tickerStack: "Unity · Go · Kotlin · TS",
    terminalLines: [
      "unity client: shipped",
      "go/kotlin backend: distributed mesh",
      "vite build → dist/",
      "cloudflare edge: live",
    ],
  },
  en: {
    role: "Full-stack dev",
    title: "Tech lead",
    headline: "Game-industry full-stack. Now shipping on the web.",
    summary:
      "I'm neko233 (Ke Le Ji Chi). I lead teams, run production systems, and still write code myself. This site is my repos, war stories, Live2D on the homepage, and the anime-flavored UI experiments I can't stop tweaking.",
    currentFocus:
      "Web full-stack and distributed systems: TypeScript, Vite, Cloudflare Edge. Build it, deploy it, keep it running.",
    previousExperience:
      "Years in games: Unity clients, Go + Kotlin distributed backends, tech lead. High traffic, big tables, real incidents.",
    expertise: [
      "Unity client",
      "Go / Kotlin backend",
      "Distributed scheduling",
      "TypeScript / Vite",
      "Cloudflare Edge",
      "Live2D / motion UI",
    ],
    keywords: [
      "neko233",
      "Ke Le Ji Chi",
      "full-stack engineer",
      "tech lead",
      "Unity",
      "Go",
      "Kotlin",
      "distributed backend",
      "game development",
      "Live2D",
      "GitHub open source",
    ],
    tickerRole: "Tech lead",
    tickerFocus: "Web · Edge",
    tickerStack: "Unity · Go · Kotlin · TS",
    terminalLines: [
      "unity client: shipped",
      "go/kotlin backend: distributed mesh",
      "vite build → dist/",
      "cloudflare edge: live",
    ],
  },
} as const;

export function getProfile(locale: Locale) {
  return profileCopy[locale];
}
