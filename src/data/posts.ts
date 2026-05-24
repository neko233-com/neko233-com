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
      title: "游戏和 Agent，我实际在用什么",
      description: "可乐鸡翅（neko233）聊两条工作线各自的技术栈。",
      excerpt: "HybridCLR、YooAsset、UniTask 那套，加上 Agent 线平时接的东西。",
      content: `
      <p class="lede">可乐鸡翅，neko233，技术负责人。</p>
      <p>
        工作分成两条线，互不掺和：<strong>游戏</strong>和<strong>Agent</strong>。
        下面是我平时真正在用的，不是从简历里抄来的清单。
      </p>
      <h2>游戏这边</h2>
      <p>
        Unity 客户端，热更走 HybridCLR，资源 YooAsset，异步 UniTask。
        角色动画 Spine 4.3，布料 Magic Cloth，镜头 Cinemachine——都是项目里实打实用过的。
        服务端 Go/Kotlin，gRPC、Redis、MySQL、Kafka 那套，在游戏公司扛过多年的线上。
      </p>
      <h2>Agent 这边</h2>
      <p>
        接 LLM API，写 Tool，需要检索就上 RAG，复杂流程会用到 MCP。
        最终得能进业务，日志、权限、出错怎么办，都得想清楚，不能做完 Demo 就撤。
      </p>
      <p>更完整的分类在首页往下翻「技术栈」。</p>
    `,
    },
    en: {
      title: "Games and Agent: what I actually use",
      description: "Ke Le Ji Chi (neko233) on the two work tracks and their stacks.",
      excerpt: "HybridCLR, YooAsset, UniTask — plus what the Agent track runs on.",
      content: `
      <p class="lede">Ke Le Ji Chi, neko233, tech lead.</p>
      <p>
        Two tracks that don't mix: <strong>games</strong> and <strong>Agent</strong>.
        This is what I actually use — not a resume keyword dump.
      </p>
      <h2>Games</h2>
      <p>
        Unity clients, HybridCLR hot-update, YooAsset, UniTask.
        Spine 4.3, Magic Cloth, Cinemachine — all used in real projects.
        Server side Go/Kotlin, gRPC, Redis, MySQL, Kafka — years of production in games.
      </p>
      <h2>Agent</h2>
      <p>
        LLM APIs, tools, RAG when retrieval matters, MCP for heavier flows.
        Has to survive in business systems: logging, permissions, failure paths — not demo-and-done.
      </p>
      <p>Full breakdown on the homepage under stacks.</p>
    `,
    },
  },
  {
    slug: "hello-edge",
    date: "2026-05-24",
    zh: {
      title: "博客搭好了",
      description: "neko233 博客上线说明：Vite + Cloudflare Pages。",
      excerpt: "GitHub 名片和博客塞在一个仓库里，构建产物扔 dist。",
      content: `
      <p class="lede">博客上线了，跑在 Cloudflare Edge。</p>
      <p>
        同一个仓库：<code>README.md</code> 给 GitHub 主页看，<code>src/</code> 构建出博客。
        构建就一条命令 <code>npm run build</code>，输出 <code>dist/</code>，Pages 直接部署。
      </p>
      <p>Workers 也配了，想用静态资产模式可以切过去。具体部署步骤写 <code>blog.md</code> 里了。</p>
    `,
    },
    en: {
      title: "Blog is live",
      description: "Launch notes: Vite + Cloudflare Pages.",
      excerpt: "GitHub profile and blog in one repo, build output goes to dist.",
      content: `
      <p class="lede">Blog is up on Cloudflare Edge.</p>
      <p>
        One repo: <code>README.md</code> for the GitHub profile, <code>src/</code> builds the blog.
        <code>npm run build</code> → <code>dist/</code>, Pages picks it up.
      </p>
      <p>Workers config is there too if you want the static assets path. Details in <code>blog.md</code>.</p>
    `,
    },
  },
  {
    slug: "profile-and-blog-split",
    date: "2026-05-24",
    zh: {
      title: "为什么名片和博客放一个仓库",
      description: "neko233 解释 GitHub 名片和博客怎么共存的。",
      excerpt: "README 负责好看，博客负责内容和搜索。",
      content: `
      <p class="lede">一个仓库，两个用处。</p>
      <p>
        <code>README.md</code> 是 GitHub 特殊名片，打开主页第一眼看到的。
        博客是另一回事：文章、RSS、SEO，给搜索引擎和读者用的。
      </p>
      <p>
        代码在 <code>src/</code>，Vite 构建，中英文各一套路由。
        首页那个 Live2D 是我觉得好看加上去的，没有别的原因。
      </p>
    `,
    },
    en: {
      title: "Why profile and blog share one repo",
      description: "How the GitHub profile card and blog coexist.",
      excerpt: "README for looks, blog for content and search.",
      content: `
      <p class="lede">One repo, two jobs.</p>
      <p>
        <code>README.md</code> is the GitHub profile card — first thing visitors see.
        The blog is separate: posts, RSS, SEO for readers and search engines.
      </p>
      <p>
        Code lives in <code>src/</code>, Vite build, zh/en routes.
        Live2D on the homepage is there because it looks good. That's it.
      </p>
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
