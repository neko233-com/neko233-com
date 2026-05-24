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
    slug: "game-fullstack-notes",
    date: "2026-05-24",
    zh: {
      title: "从游戏全栈到 Web：我实际在写什么",
      description: "neko233（可乐鸡翅）聊 Unity + Go/Kotlin 游戏全栈经历，以及现在在 Web / Edge 上交付的东西。",
      excerpt: "不是转型故事会，是我现在还在维护的技术栈和仓库。",
      content: `
      <p class="lede">可乐鸡翅，全栈，现任技术负责人。</p>
      <p>
        游戏行业那几年，主要干两件事：<code>Unity</code> 客户端，和 <code>Go</code> + <code>Kotlin</code> 分布式后端。
        带过人，扛过线上，也写过不少工具库。
      </p>
      <p>
        现在在 Web 侧继续写能进生产的东西：静态站、Edge 部署、调度系统、配置迁移、证书自动化。
        博客会同步 GitHub 仓库里的真实代码，不吹概念。
      </p>
      <h2>我常用的硬技能</h2>
      <ul>
        <li>客户端：Unity、TypeScript 前端、Live2D 动效（这个站首页就有）。</li>
        <li>后端：Go、Kotlin、分布式任务调度、配置版本迁移。</li>
        <li>交付：Vite 构建、Cloudflare Pages/Workers、无数据库静态站。</li>
      </ul>
      <p>下面「仓库」和「文章」都是我在维护的东西，点开就能看代码。</p>
    `,
    },
    en: {
      title: "From game full-stack to web: what I actually ship",
      description: "neko233 (Ke Le Ji Chi) on Unity + Go/Kotlin game work and what's in production on the web now.",
      excerpt: "Not a career essay — the stacks and repos I still maintain.",
      content: `
      <p class="lede">Ke Le Ji Chi. Full-stack. Current tech lead.</p>
      <p>
        In games I spent years on <code>Unity</code> clients and <code>Go</code> + <code>Kotlin</code> distributed backends.
        Led teams, ran production, shipped tooling.
      </p>
      <p>
        On the web I keep building things that go live: static sites, edge deploys, schedulers, config migration, cert automation.
        This blog tracks real GitHub repos — no buzzword tours.
      </p>
      <h2>Hard skills I use</h2>
      <ul>
        <li>Client: Unity, TypeScript frontends, Live2D motion (yes, on this site's homepage).</li>
        <li>Backend: Go, Kotlin, distributed job mesh, config migration.</li>
        <li>Delivery: Vite builds, Cloudflare Pages/Workers, static sites without a database.</li>
      </ul>
      <p>Repos and posts below are things I actually maintain. Code is one click away.</p>
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
      <p class="lede">neko233（可乐鸡翅）的双语博客，跑在 Cloudflare Edge 上。</p>
      <p>
        仓库分两块：<code>README.md</code> 是 GitHub 名片；
        <code>src/</code> → <code>dist/</code> 是博客。
      </p>
      <p>
        构建命令 <code>npm run build</code>，输出 <code>dist/</code>，Pages 直接部署。
        Workers 静态资产模式也留着，想用就用。
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
      <p class="lede">Bilingual blog for neko233 (Ke Le Ji Chi), deployed on Cloudflare Edge.</p>
      <p>
        Two surfaces in one repo: <code>README.md</code> for the GitHub profile,
        <code>src/</code> → <code>dist/</code> for the blog.
      </p>
      <p>
        Build with <code>npm run build</code>, publish <code>dist/</code> on Pages.
        Workers static assets stay optional.
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
      <p class="lede">一个仓库，两个入口，各干各的。</p>
      <p>
        <code>README.md</code> 给 GitHub 主页看，视觉向；
        博客给搜索引擎和读者，放技术内容和仓库说明。
      </p>
      <p>
        Vite 8 + TypeScript 构建静态 <code>dist/</code>，中英文路由分开，SEO / GEO 都照顾到。
        首页还塞了个 Live2D 看板娘，因为好看。
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
      <p class="lede">One repo, two entry points, separate jobs.</p>
      <p>
        <code>README.md</code> is the GitHub profile — visual, minimal.
        The blog is for readers and search engines — repos, notes, tech content.
      </p>
      <p>
        Built with Vite 8 + TypeScript into static <code>dist/</code>, with zh/en routes for SEO and GEO.
        Homepage has a Live2D character because it looks good.
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
