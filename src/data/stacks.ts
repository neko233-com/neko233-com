import type { Locale } from "../i18n/locale";

export type StackTrack = "game" | "agent" | "infra";

export interface StackCategory {
  id: string;
  track: StackTrack;
  title: Record<Locale, string>;
  items: readonly string[];
}

export const stackCategories: StackCategory[] = [
  {
    id: "unity-core",
    track: "game",
    title: { zh: "Unity 核心", en: "Unity Core" },
    items: ["Unity", "HybridCLR", "YooAsset", "UniTask", "URP", "Addressables"],
  },
  {
    id: "unity-animation",
    track: "game",
    title: { zh: "动画 & 表现", en: "Animation & VFX" },
    items: ["Cinemachine", "Animator", "Spine 4.3", "Magic Cloth", "Timeline", "DOTween", "Shader Graph"],
  },
  {
    id: "unity-client",
    track: "game",
    title: { zh: "客户端工程", en: "Client Engineering" },
    items: ["UI Toolkit / UGUI", "对象池", "热更新", "资源分包", "性能分析", "多平台发布"],
  },
  {
    id: "game-backend",
    track: "game",
    title: { zh: "游戏后端", en: "Game Backend" },
    items: ["Go", "Kotlin", "gRPC", "Protobuf", "Redis", "MySQL", "Kafka", "Docker"],
  },
  {
    id: "game-infra",
    track: "game",
    title: { zh: "服务端 & 运维", en: "Server & Ops" },
    items: ["分布式调度", "配置迁移", "ACME 证书", "Nacos", "Jenkins", "Linux"],
  },
  {
    id: "agent-core",
    track: "agent",
    title: { zh: "Agent 核心", en: "Agent Core" },
    items: ["LLM API", "Tool Calling", "RAG", "Prompt Engineering", "MCP", "Multi-Agent"],
  },
  {
    id: "agent-engineering",
    track: "agent",
    title: { zh: "Agent 工程化", en: "Agent Engineering" },
    items: ["Workflow 编排", "权限 & 审计", "Eval & 回归", "Observability", "Fallback 策略"],
  },
  {
    id: "agent-stack",
    track: "agent",
    title: { zh: "Agent 技术栈", en: "Agent Stack" },
    items: ["TypeScript", "Python", "Cursor Skills", "OpenAI / Claude API", "向量检索", "文档解析"],
  },
  {
    id: "web-edge",
    track: "infra",
    title: { zh: "Web & Edge", en: "Web & Edge" },
    items: ["TypeScript", "Vite", "Cloudflare Pages", "Workers", "SSG", "Wrangler"],
  },
  {
    id: "web-ui",
    track: "infra",
    title: { zh: "前端 & 动效", en: "Frontend & Motion" },
    items: ["Live2D", "Canvas 动效", "SEO / RSS", "i18n", "RSS / Sitemap"],
  },
];

export function getStacksByTrack(track: StackTrack): StackCategory[] {
  return stackCategories.filter((category) => category.track === track);
}

export function getStackTitle(category: StackCategory, locale: Locale): string {
  return category.title[locale];
}

export function allStackKeywords(): string[] {
  return [...new Set(stackCategories.flatMap((category) => category.items))];
}
