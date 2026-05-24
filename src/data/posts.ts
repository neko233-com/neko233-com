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
      title: "游戏 & Agent 两条线：我的技术栈",
      description: "neko233（可乐鸡翅）介绍游戏线与 AI Agent 线的独立技术栈，含 HybridCLR、YooAsset、UniTask 等。",
      excerpt: "游戏线与 Agent 线并行，附完整技术栈。",
      content: `
      <p class="lede">我是 neko233（可乐鸡翅），全栈开发工程师，现任技术负责人。</p>
      <p>
        博客有两条独立主线：<strong>游戏</strong> 和 <strong>AI Agent</strong>。
        游戏线以 Unity 为核心；Agent 线专注 LLM 工具链与业务落地。
      </p>
      <h2>游戏线 · Unity 技术栈</h2>
      <ul>
        <li>核心：Unity、HybridCLR、YooAsset、UniTask、URP</li>
        <li>动画：Cinemachine、Animator、Spine 4.3、Magic Cloth、Timeline、DOTween</li>
        <li>后端：Go / Kotlin、gRPC、Redis、MySQL、Kafka</li>
      </ul>
      <h2>Agent 线</h2>
      <ul>
        <li>LLM API、Tool Calling、RAG、MCP、Workflow 编排</li>
        <li>工程化：权限、日志、Eval、Fallback</li>
      </ul>
      <p>首页「技术栈」区块有完整分类列表。</p>
    `,
    },
    en: {
      title: "Games & Agent: my two tech tracks",
      description: "neko233 (Ke Le Ji Chi) on independent games and AI Agent stacks including HybridCLR, YooAsset, UniTask.",
      excerpt: "Two parallel tracks with full stack breakdown.",
      content: `
      <p class="lede">I'm neko233 (Ke Le Ji Chi), full-stack engineer and tech lead.</p>
      <p>
        Two independent tracks: <strong>Games</strong> and <strong>AI Agent</strong>.
        Games center on Unity; Agent focuses on LLM tooling and business delivery.
      </p>
      <h2>Games · Unity stack</h2>
      <ul>
        <li>Core: Unity, HybridCLR, YooAsset, UniTask, URP</li>
        <li>Animation: Cinemachine, Animator, Spine 4.3, Magic Cloth, Timeline, DOTween</li>
        <li>Backend: Go / Kotlin, gRPC, Redis, MySQL, Kafka</li>
      </ul>
      <h2>AI Agent</h2>
      <ul>
        <li>LLM APIs, tool calling, RAG, MCP, workflow orchestration</li>
        <li>Engineering: permissions, logging, eval, fallbacks</li>
      </ul>
      <p>See the homepage stacks section for the full categorized list.</p>
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
        首页还放了个 Live2D 角色。
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
