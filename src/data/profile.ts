import type { Locale } from "../i18n/locale";

const profileCopy = {
  zh: {
    role: "全栈开发工程师",
    title: "技术负责人",
    headline: "游戏 & AI Agent · 两个独立方向",
    summary:
      "你好，我是 neko233（可乐鸡翅），全栈开发工程师、技术负责人。博客记录项目实践与开发笔记，主线是游戏和 AI Agent，两条线独立并行。",
    doingNow:
      "一边做 Unity 游戏客户端与 Go/Kotlin 后端相关项目，一边做 AI Agent 工具链与业务落地。仓库和文章都会按「游戏 / Agent」分开更新。",
    gameDirection:
      "游戏线：Unity 客户端为主，热更新走 HybridCLR，资源管理用 YooAsset，异步流程用 UniTask。动画侧用 Cinemachine、Animator、Spine 4.3、Magic Cloth 等；服务端是 Go/Kotlin 分布式架构。",
    agentDirection:
      "Agent 线：LLM + Tool Calling + 流程编排，把 Agent 能力嵌进真实业务流程。强调工程化——权限、日志、Eval、回退策略，而不是 Demo。与游戏线分开维护。",
    previousExperience:
      "游戏行业多年：Unity 全栈 → 技术负责人，负责客户端、分布式后端与团队交付。",
    expertise: [
      "HybridCLR",
      "YooAsset",
      "UniTask",
      "Spine 4.3",
      "Go / Kotlin",
      "AI Agent",
      "Cloudflare Edge",
    ],
    keywords: [
      "neko233",
      "可乐鸡翅",
      "Unity",
      "HybridCLR",
      "YooAsset",
      "UniTask",
      "Spine",
      "Magic Cloth",
      "游戏开发",
      "AI Agent",
      "Go",
      "Kotlin",
    ],
  },
  en: {
    role: "Full-stack Engineer",
    title: "Tech Lead",
    headline: "Games & AI Agent · two separate tracks",
    summary:
      "Hi, I'm neko233 (Ke Le Ji Chi), full-stack engineer and tech lead. This blog documents practice notes across two independent tracks: games and AI Agent.",
    doingNow:
      "Unity game clients and Go/Kotlin backends on one side; AI Agent tooling and business delivery on the other. Repos and posts are split by track.",
    gameDirection:
      "Games: Unity clients with HybridCLR hot-update, YooAsset resources, UniTask async. Animation stack includes Cinemachine, Animator, Spine 4.3, Magic Cloth. Server side: Go/Kotlin distributed systems.",
    agentDirection:
      "AI Agent: LLMs, tool calling, and workflow orchestration embedded in real business flows — with permissions, logging, eval, and fallbacks. Maintained separately from the games track.",
    previousExperience:
      "Years in games: Unity full-stack to tech lead — clients, distributed backends, and team delivery.",
    expertise: [
      "HybridCLR",
      "YooAsset",
      "UniTask",
      "Spine 4.3",
      "Go / Kotlin",
      "AI Agent",
      "Cloudflare Edge",
    ],
    keywords: [
      "neko233",
      "Ke Le Ji Chi",
      "Unity",
      "HybridCLR",
      "YooAsset",
      "UniTask",
      "Spine",
      "Magic Cloth",
      "game development",
      "AI Agent",
      "Go",
      "Kotlin",
    ],
  },
} as const;

export function getProfile(locale: Locale) {
  return profileCopy[locale];
}
