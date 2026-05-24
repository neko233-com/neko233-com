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
      zh: "就是这个站。GitHub 名片 + 博客，一个仓库搞定。",
      en: "This site. GitHub profile + blog, one repo.",
    },
    url: "https://github.com/neko233-com/neko233-com",
    language: "TypeScript",
    highlight: true,
  },
  {
    name: "agent-skill-paper-reference",
    description: {
      zh: "查论文、对引用的 Agent 小工具，研究向开发用的。",
      en: "Agent tool for paper search and citation checks.",
    },
    url: "https://github.com/neko233-com/agent-skill-paper-reference",
    language: "TypeScript",
    highlight: true,
  },
  {
    name: "SchedulerMeshServer233",
    description: {
      zh: "分布式任务调度，游戏后端那套东西延伸出来的。",
      en: "Distributed job scheduling — grew out of game backend work.",
    },
    url: "https://github.com/neko233-com/SchedulerMeshServer233",
    language: "HTML",
    highlight: true,
  },
  {
    name: "config-migrate-go",
    description: {
      zh: "Go 服务升级时迁移配置文件，版本迭代用。",
      en: "Migrate Go configs when server versions bump.",
    },
    url: "https://github.com/neko233-com/config-migrate-go",
    language: "Go",
  },
  {
    name: "acme-go",
    description: {
      zh: "Go 写的 ACME 证书工具，自动化部署证书用。",
      en: "Go ACME cert tool for automated deploys.",
    },
    url: "https://github.com/neko233-com/acme-go",
    language: "Go",
  },
  {
    name: "config233-go",
    description: {
      zh: "Go 配置管理的一些实验和工具。",
      en: "Go config tooling experiments.",
    },
    url: "https://github.com/neko233-com/config233-go",
    language: "Go",
  },
  {
    name: "ssh-gui-by-neko233",
    description: {
      zh: "自己用的 SSH GUI，日常连服务器方便点。",
      en: "Personal SSH GUI for daily server connections.",
    },
    url: "https://github.com/neko233-com/ssh-gui-by-neko233",
  },
  {
    name: "astro-blog-starter-template",
    description: {
      zh: "Astro 博客模板，搭静态站用的 starter。",
      en: "Astro blog starter for static sites.",
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
