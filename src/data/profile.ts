import type { Locale } from "../i18n/locale";

const profileCopy = {
  zh: {
    role: "全栈开发工程师",
    title: "技术负责人",
    headline: "全栈开发工程师 · 技术负责人",
    summary:
      "你好，我是 neko233，也叫可乐鸡翅。这个博客用来记录我在做的项目、开发笔记，以及 GitHub 上的开源仓库。",
    doingNow:
      "目前在维护个人博客、GitHub 开源项目，以及几个 Web 和后端相关的 side project。日常会写代码、做构建部署，也会整理踩坑记录发到文章里。",
    businessDirection:
      "业务方向主要是 Web 产品与业务系统开发：从需求沟通、方案设计到开发上线，关注功能能否稳定跑在生产环境。",
    techDirection:
      "技术方向以前在游戏行业做 Unity 客户端和 Go/Kotlin 分布式后端；现在在 Web 侧用 TypeScript、Vite，部署走 Cloudflare Edge，也会做一些 Live2D 前端动效。",
    previousExperience:
      "此前在游戏行业担任全栈工程师与技术负责人，负责 Unity 客户端与 Go + Kotlin 分布式后端。",
    expertise: [
      "Unity 客户端",
      "Go / Kotlin 后端",
      "TypeScript / Vite",
      "Cloudflare Edge",
      "分布式调度",
      "Live2D 动效",
    ],
    keywords: [
      "neko233",
      "可乐鸡翅",
      "个人博客",
      "全栈开发",
      "技术负责人",
      "Unity",
      "Go",
      "Kotlin",
      "Web 开发",
      "Live2D",
    ],
  },
  en: {
    role: "Full-stack Engineer",
    title: "Tech Lead",
    headline: "Full-stack Engineer · Tech Lead",
    summary:
      "Hi, I'm neko233 (Ke Le Ji Chi). This blog tracks my projects, dev notes, and open-source repos on GitHub.",
    doingNow:
      "Currently maintaining this blog, GitHub repos, and a few web/backend side projects. Day to day: coding, build/deploy, and writing up lessons learned.",
    businessDirection:
      "Business focus: web products and business systems — from requirements and design through development to production rollout.",
    techDirection:
      "Technical focus: previously Unity clients and Go/Kotlin distributed backends in games; now TypeScript/Vite on the web, Cloudflare Edge deploys, and Live2D UI motion.",
    previousExperience:
      "Previously a full-stack engineer and tech lead in the game industry, working on Unity clients and Go + Kotlin distributed backends.",
    expertise: [
      "Unity client",
      "Go / Kotlin backend",
      "TypeScript / Vite",
      "Cloudflare Edge",
      "Distributed scheduling",
      "Live2D motion",
    ],
    keywords: [
      "neko233",
      "Ke Le Ji Chi",
      "personal blog",
      "full-stack engineer",
      "tech lead",
      "Unity",
      "Go",
      "Kotlin",
      "web development",
      "Live2D",
    ],
  },
} as const;

export function getProfile(locale: Locale) {
  return profileCopy[locale];
}
