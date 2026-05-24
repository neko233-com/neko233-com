import type { Locale } from "../i18n/locale";

const profileCopy = {
  zh: {
    role: "全栈开发工程师",
    title: "技术负责人",
    headline: "Agent 配合业务落地 · 全栈工程实践",
    summary:
      "neko233（可乐鸡翅）是一名全栈开发工程师，现任技术负责人，主攻 Agent 与业务系统落地。博客记录 GitHub 开源仓库、工程实践与 AI 协作开发经验。",
    currentFocus:
      "当前专注 Agent 配合业务落地：把 LLM、工具链与自动化流程嵌入真实产品流程，提升交付效率与系统可靠性。",
    previousExperience:
      "此前是游戏行业资深全栈工程师，长期负责 Unity 游戏客户端，以及基于 Go + Kotlin 的大型分布式后端服务，担任技术负责人。",
    expertise: [
      "Agent 业务落地",
      "全栈架构",
      "Unity 游戏客户端",
      "Go / Kotlin 分布式后端",
      "Cloudflare Edge 部署",
      "TypeScript / Vite",
    ],
    keywords: [
      "neko233",
      "可乐鸡翅",
      "全栈开发工程师",
      "技术负责人",
      "Agent 业务落地",
      "Unity",
      "Go",
      "Kotlin",
      "分布式后端",
      "游戏行业",
      "GitHub 开源",
    ],
    tickerRole: "技术负责人",
    tickerFocus: "Agent 业务落地",
    tickerStack: "Unity · Go · Kotlin · TS",
    terminalLines: [
      "github profile reads README.md",
      "vite build emits dist/",
      "cloudflare pages deploys dist/",
      "bilingual zh/en routes for SEO + GEO",
    ],
  },
  en: {
    role: "Full-stack Engineer",
    title: "Tech Lead",
    headline: "Agent-driven delivery · Full-stack engineering",
    summary:
      "neko233 (Ke Le Ji Chi) is a full-stack engineer and tech lead focused on Agent-driven business delivery. This blog documents GitHub repositories, engineering practice, and AI-assisted development.",
    currentFocus:
      "Currently focused on Agent-driven business delivery: embedding LLMs, toolchains, and automation into real product workflows to improve delivery speed and reliability.",
    previousExperience:
      "Previously a senior full-stack engineer in the game industry, leading Unity client development and large-scale distributed backends built with Go and Kotlin as tech lead.",
    expertise: [
      "Agent business delivery",
      "Full-stack architecture",
      "Unity game client",
      "Go / Kotlin distributed backend",
      "Cloudflare Edge deployment",
      "TypeScript / Vite",
    ],
    keywords: [
      "neko233",
      "Ke Le Ji Chi",
      "full-stack engineer",
      "tech lead",
      "Agent delivery",
      "Unity",
      "Go",
      "Kotlin",
      "distributed backend",
      "game industry",
      "GitHub open source",
    ],
    tickerRole: "Tech Lead",
    tickerFocus: "Agent delivery",
    tickerStack: "Unity · Go · Kotlin · TS",
    terminalLines: [
      "github profile reads README.md",
      "vite build emits dist/",
      "cloudflare pages deploys dist/",
      "bilingual zh/en routes for SEO + GEO",
    ],
  },
} as const;

export function getProfile(locale: Locale) {
  return profileCopy[locale];
}
