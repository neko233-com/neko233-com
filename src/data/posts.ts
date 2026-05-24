import type { Locale } from "../i18n/locale";

export interface PostContent {
  title: string;
  description: string;
  excerpt: string;
  content: string;
}

export interface Post {
  slug: string;
  date: string;
  zh: PostContent;
  en: PostContent;
}

export const posts: Post[] = [
  {
    slug: "agent-business-landing",
    date: "2026-05-24",
    zh: {
      title: "从游戏全栈到 Agent 业务落地",
      description:
        "neko233（可乐鸡翅）介绍从 Unity + Go/Kotlin 游戏全栈，转向 Agent 配合业务落地的技术路径。",
      excerpt: "技术负责人视角：如何把 Agent 嵌入真实业务流程，而不是停留在 Demo。",
      content: `
      <p class="lede">我是 neko233（可乐鸡翅），全栈开发工程师，现任技术负责人。</p>
      <p>
        当前主攻 <strong>Agent 配合业务落地</strong>：把模型能力、工具调用、流程编排与现有业务系统连接起来，
        让 AI 成为可交付、可观测、可维护的产品能力，而不是独立演示。
      </p>
      <p>
        在此之前，我在游戏行业担任资深全栈工程师与技术负责人，长期负责
        <code>Unity</code> 客户端，以及基于 <code>Go</code> + <code>Kotlin</code> 的大型分布式后端服务。
      </p>
      <h2>我如何理解 Agent 落地</h2>
      <ul>
        <li>业务优先：从真实流程、真实数据、真实 SLA 出发设计 Agent 能力边界。</li>
        <li>工程化：把 Prompt、工具、权限、日志、回退策略纳入标准工程流程。</li>
        <li>可验证：每个 Agent 流程都应有明确输入输出与失败处理路径。</li>
      </ul>
      <p>这个博客会持续记录 GitHub 仓库实践、Agent 工程化经验，以及全栈架构笔记。</p>
    `,
    },
    en: {
      title: "From game full-stack to Agent-driven delivery",
      description:
        "neko233 (Ke Le Ji Chi) on moving from Unity + Go/Kotlin game full-stack work to Agent-driven business delivery.",
      excerpt: "A tech-lead view on embedding Agents into real workflows instead of demo-only AI.",
      content: `
      <p class="lede">I am neko233 (Ke Le Ji Chi), a full-stack engineer and current tech lead.</p>
      <p>
        My current focus is <strong>Agent-driven business delivery</strong>: connecting model capabilities, tool use,
        orchestration, and existing product systems so AI becomes shippable, observable, and maintainable.
      </p>
      <p>
        Before this, I worked as a senior full-stack engineer and tech lead in the game industry, owning
        <code>Unity</code> client systems and large distributed backends built with <code>Go</code> and <code>Kotlin</code>.
      </p>
      <h2>How I think about Agent delivery</h2>
      <ul>
        <li>Business first: define Agent boundaries from real workflows, data, and SLAs.</li>
        <li>Engineering discipline: prompts, tools, permissions, logs, and fallback paths belong in normal delivery.</li>
        <li>Verification: every Agent flow needs explicit inputs, outputs, and failure handling.</li>
      </ul>
      <p>This blog documents GitHub repos, Agent engineering practice, and full-stack architecture notes.</p>
    `,
    },
  },
  {
    slug: "hello-edge",
    date: "2026-05-24",
    zh: {
      title: "博客上线：Cloudflare Edge 中文站",
      description: "neko233 中文博客首次上线说明：Vite 8 + Cloudflare Pages 静态发布。",
      excerpt: "同一仓库兼顾 GitHub 特殊名片与 Cloudflare Pages 双语博客。",
      content: `
      <p class="lede">这是 neko233（可乐鸡翅）的双语博客，部署在 Cloudflare Edge。</p>
      <p>
        仓库边界清晰：<code>README.md</code> 负责 GitHub 名片展示；
        <code>src/</code> 与 <code>dist/</code> 负责博客构建与发布。
      </p>
      <p>
        Cloudflare Pages 使用 <code>npm run build</code> 构建并发布 <code>dist/</code>，
        同时保留 Workers 静态资产模式作为可选部署路径。
      </p>
      <pre><code>source: src/
build: npm run build
output: dist/
profile: README.md
guide: blog.md</code></pre>
    `,
    },
    en: {
      title: "Blog launch on Cloudflare Edge",
      description: "Launch notes for the neko233 bilingual blog on Vite 8 and Cloudflare Pages.",
      excerpt: "One repository serves both the GitHub profile card and the Cloudflare Pages blog.",
      content: `
      <p class="lede">This is the bilingual blog of neko233 (Ke Le Ji Chi), deployed on Cloudflare Edge.</p>
      <p>
        The repository boundary is explicit: <code>README.md</code> powers the GitHub profile card,
        while <code>src/</code> and <code>dist/</code> power blog build and deployment.
      </p>
      <p>
        Cloudflare Pages builds with <code>npm run build</code> and publishes <code>dist/</code>,
        while Workers static assets remain an optional deployment path.
      </p>
      <pre><code>source: src/
build: npm run build
output: dist/
profile: README.md
guide: blog.md</code></pre>
    `,
    },
  },
  {
    slug: "profile-and-blog-split",
    date: "2026-05-24",
    zh: {
      title: "GitHub 名片与博客如何拆分",
      description: "neko233 说明同一仓库如何同时服务 GitHub Profile 与 Cloudflare 双语博客。",
      excerpt: "一个仓库、两个公开面：名片负责展示，博客负责内容与 SEO/GEO。",
      content: `
      <p class="lede">这个仓库有两个公开面，但职责分离。</p>
      <p>
        <code>README.md</code> 面向 GitHub 账号主页，强调视觉展示与公开信号；
        博客面向搜索引擎与 AI 检索，记录仓库实践与个人技术路径。
      </p>
      <p>
        博客采用 Vite 8 + Rolldown + TypeScript 构建，输出静态 <code>dist/</code>，
        并生成中文与英文路由，便于 SEO / GEO 优化。
      </p>
      <pre><code>GitHub 名片: README.md
双语博客: src/ → dist/
运维文档: blog.md
Workers: wrangler.toml</code></pre>
    `,
    },
    en: {
      title: "Splitting the GitHub profile from the blog",
      description: "How neko233 keeps the GitHub profile card and Cloudflare blog separate in one repository.",
      excerpt: "One repository, two public surfaces: profile for display, blog for content and SEO/GEO.",
      content: `
      <p class="lede">This repository has two public surfaces with separate responsibilities.</p>
      <p>
        <code>README.md</code> serves the GitHub account profile with visual signals,
        while the blog serves search engines and AI retrieval with repo practice and career context.
      </p>
      <p>
        The blog is built with Vite 8 + Rolldown + TypeScript into static <code>dist/</code>,
        with separate Chinese and English routes for SEO and GEO.
      </p>
      <pre><code>GitHub profile: README.md
Bilingual blog: src/ → dist/
Ops guide: blog.md
Workers: wrangler.toml</code></pre>
    `,
    },
  },
];

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}

export function getSortedPosts(): Post[] {
  return [...posts].sort((a, b) => b.date.localeCompare(a.date));
}

export function getPostContent(post: Post, locale: Locale): PostContent {
  return post[locale];
}
