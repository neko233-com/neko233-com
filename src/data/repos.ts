import type { Locale } from "../i18n/locale";

export interface RepoItem {
  name: string;
  url: string;
  language?: string;
  highlight?: boolean;
  description: Record<Locale, string>;
}

export const repos: RepoItem[] = [
  {
    name: "neko233-com",
    description: {
      zh: "GitHub 特殊名片 + Cloudflare Pages 双语博客（Vite 8 + TypeScript）。",
      en: "GitHub profile card + Cloudflare Pages bilingual blog (Vite 8 + TypeScript).",
    },
    url: "https://github.com/neko233-com/neko233-com",
    language: "TypeScript",
    highlight: true,
  },
  {
    name: "agent-skill-paper-reference",
    description: {
      zh: "论文检索、引用核对的工作流工具，给研究型开发用。",
      en: "Paper search, citation, and verification workflow tooling.",
    },
    url: "https://github.com/neko233-com/agent-skill-paper-reference",
    language: "TypeScript",
    highlight: true,
  },
  {
    name: "SchedulerMeshServer233",
    description: {
      zh: "分布式调度任务 Mesh 系统，面向大规模任务编排与执行。",
      en: "Distributed scheduling mesh for large-scale job orchestration.",
    },
    url: "https://github.com/neko233-com/SchedulerMeshServer233",
    language: "HTML",
    highlight: true,
  },
  {
    name: "config-migrate-go",
    description: {
      zh: "Go 配置升级迁移库，用于服务端版本演进时的配置平滑迁移。",
      en: "Go config migration library for server version upgrades.",
    },
    url: "https://github.com/neko233-com/config-migrate-go",
    language: "Go",
  },
  {
    name: "acme-go",
    description: {
      zh: "使用 Go 编写的 ACME 证书工具，面向自动化部署场景。",
      en: "Go ACME certificate utility for automated deployment.",
    },
    url: "https://github.com/neko233-com/acme-go",
    language: "Go",
  },
  {
    name: "config233-go",
    description: {
      zh: "Go 配置管理相关实验与工具集合。",
      en: "Go configuration tooling experiments and utilities.",
    },
    url: "https://github.com/neko233-com/config233-go",
    language: "Go",
  },
  {
    name: "ssh-gui-by-neko233",
    description: {
      zh: "跨平台 SSH GUI 工具，面向日常运维与连接管理。",
      en: "Cross-platform SSH GUI for daily ops and connection management.",
    },
    url: "https://github.com/neko233-com/ssh-gui-by-neko233",
  },
  {
    name: "astro-blog-starter-template",
    description: {
      zh: "Astro 博客 starter 模板，用于快速搭建静态内容站点。",
      en: "Astro blog starter template for static content sites.",
    },
    url: "https://github.com/neko233-com/astro-blog-starter-template",
    language: "Astro",
  },
];

export function getHighlightedRepos(): RepoItem[] {
  return repos.filter((repo) => repo.highlight);
}

export function repoDescription(repo: RepoItem, locale: Locale): string {
  return repo.description[locale];
}
