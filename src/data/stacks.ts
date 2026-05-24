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
    title: { zh: "客户端其他", en: "Client misc" },
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
    title: { zh: "服务端运维", en: "Server & ops" },
    items: ["分布式调度", "配置迁移", "ACME 证书", "Nacos", "Jenkins", "Linux"],
  },
  {
    id: "agent-core",
    track: "agent",
    title: { zh: "Agent 基础", en: "Agent basics" },
    items: ["LLM API", "Tool Calling", "RAG", "Prompt", "MCP"],
  },
  {
    id: "agent-engineering",
    track: "agent",
    title: { zh: "上线要想清楚的", en: "Before production" },
    items: ["流程编排", "权限控制", "测试回归", "日志监控", "出错兜底"],
  },
  {
    id: "agent-stack",
    track: "agent",
    title: { zh: "语言和工具", en: "Languages & tools" },
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
    items: ["Live2D", "Canvas 动效", "SEO", "i18n", "RSS / Sitemap"],
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
