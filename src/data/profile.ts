import type { Locale } from "../i18n/locale";

const profileCopy = {
  zh: {
    role: "全栈开发工程师",
    title: "技术负责人",
    headline: "做游戏，也做 Agent",
    summary:
      "我是 neko233，大家都叫我可乐鸡翅。写 Unity，也写 Go/Kotlin 后端，现在是技术负责人。这个博客记项目、踩坑，还有 GitHub 上开源的东西。",
    doingNow:
      "手上同时进行几件事：Unity 客户端和 Go/Kotlin 后端是一条线；LLM、Agent 工具是另一条。仓库和文章分开写，免得混在一起。",
    gameDirection:
      "Unity 这条线比较熟：HybridCLR 热更、YooAsset 管资源、UniTask 跑异步。动画常用 Cinemachine、Spine 4.3、Magic Cloth。服务端在游戏公司做过 Go/Kotlin 分布式，该上的都上过线。",
    agentDirection:
      "Agent 是另一条线：接 LLM、写 Tool、把流程串起来，要能进业务，不是 Demo 演示完就结束。和游戏项目分开维护。",
    previousExperience:
      "在游戏行业做了很多年，从 Unity 客户端写到分布式后端，后来带团队做技术负责人。",
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
    headline: "Games on one side, Agent on the other",
    summary:
      "I'm neko233 (Ke Le Ji Chi). I write Unity clients and Go/Kotlin backends, currently tech lead. This blog is project notes, war stories, and GitHub repos.",
    doingNow:
      "Unity clients + Go/Kotlin backends on one track; LLM and Agent tooling on another. Repos and posts stay separated so they don't mix.",
    gameDirection:
      "Games: HybridCLR hot-update, YooAsset, UniTask. Animation with Cinemachine, Spine 4.3, Magic Cloth. Server side is Go/Kotlin distributed — shipped to production in the game industry.",
    agentDirection:
      "Agent track: hook up LLMs, write tools, wire workflows that actually land in business systems — not demo-only. Kept separate from game projects.",
    previousExperience:
      "Many years in games — Unity client to distributed backend, later tech lead.",
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
