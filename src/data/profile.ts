import type { Locale } from "../i18n/locale";

const profileCopy = {
  zh: {
    role: "全栈开发工程师",
    title: "技术负责人",
    headline: "游戏 & AI Agent · 两个独立方向",
    summary:
      "你好，我是 neko233，也叫可乐鸡翅。博客记录我的项目和开发笔记，主要围绕游戏和 AI Agent 两个方向，彼此独立、并行推进。",
    doingNow:
      "同时在推进游戏相关开发，以及 AI Agent 工具与业务落地。GitHub 仓库和文章会按这两个方向分别更新。",
    gameDirection:
      "游戏方向：Unity 客户端、游戏全栈与分布式后端（Go / Kotlin）。此前在游戏行业多年，从客户端到服务端、开发到技术负责都有涉及。",
    agentDirection:
      "AI Agent 方向：把 LLM、工具调用和流程编排用到真实业务里，做可交付、可维护的 Agent 能力。与游戏方向独立，有单独的项目和仓库。",
    previousExperience:
      "此前在游戏行业担任全栈工程师与技术负责人，负责 Unity 客户端与 Go + Kotlin 分布式后端。",
    expertise: [
      "Unity 客户端",
      "Go / Kotlin 后端",
      "游戏全栈",
      "AI Agent",
      "TypeScript / Vite",
      "Live2D 动效",
    ],
    keywords: [
      "neko233",
      "可乐鸡翅",
      "游戏开发",
      "AI Agent",
      "Unity",
      "Go",
      "Kotlin",
      "全栈开发",
      "技术负责人",
    ],
  },
  en: {
    role: "Full-stack Engineer",
    title: "Tech Lead",
    headline: "Games & AI Agent · two separate tracks",
    summary:
      "Hi, I'm neko233 (Ke Le Ji Chi). This blog covers my projects and notes across two independent tracks: games and AI Agent.",
    doingNow:
      "Working on game-related development and AI Agent tooling/delivery in parallel. Repos and posts are organized under these two tracks.",
    gameDirection:
      "Games: Unity clients, game full-stack, and distributed backends (Go / Kotlin). Years in the game industry — client to server, engineer to tech lead.",
    agentDirection:
      "AI Agent: LLMs, tool use, and workflow orchestration in real business contexts — shippable, maintainable Agent capabilities. Separate from the games track, with its own projects and repos.",
    previousExperience:
      "Previously a full-stack engineer and tech lead in the game industry, working on Unity clients and Go + Kotlin distributed backends.",
    expertise: [
      "Unity client",
      "Go / Kotlin backend",
      "Game full-stack",
      "AI Agent",
      "TypeScript / Vite",
      "Live2D motion",
    ],
    keywords: [
      "neko233",
      "Ke Le Ji Chi",
      "game development",
      "AI Agent",
      "Unity",
      "Go",
      "Kotlin",
      "full-stack engineer",
      "tech lead",
    ],
  },
} as const;

export function getProfile(locale: Locale) {
  return profileCopy[locale];
}
