export interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  excerpt: string;
  content: string;
}

export const posts: Post[] = [
  {
    slug: "hello-edge",
    title: "Hello from the edge",
    description:
      "A first note from the neko233（可乐鸡翅）Cloudflare edge blog.",
    date: "2026-05-24",
    excerpt:
      "A first note about using one repository as both GitHub profile and Cloudflare blog source.",
    content: `
      <p class="lede">This blog belongs to neko233（可乐鸡翅） and is served from the same repository that powers the GitHub profile card.</p>
      <p>
        The boundary is simple: GitHub renders <code>README.md</code>, while Cloudflare serves the Vite-built static site in
        <code>dist/</code>. The profile can stay animated and data-rich without mixing deployment notes into the account page.
      </p>
      <p>
        Cloudflare Pages builds with <code>npm run build</code> and deploys <code>dist/</code>. Cloudflare Workers can serve the same output through
        static assets using <code>wrangler.toml</code>.
      </p>
      <pre><code>source: src/
build: npm run build
output: dist/
profile: README.md
guide: blog.md</code></pre>
    `,
  },
  {
    slug: "profile-and-blog-split",
    title: "Profile and blog split",
    description:
      "How neko233 keeps GitHub profile animation and Cloudflare blog deployment separate in one repository.",
    date: "2026-05-24",
    excerpt:
      "One repository can serve a GitHub profile and a Cloudflare static blog when the boundaries are explicit.",
    content: `
      <p class="lede">The repository has two public surfaces, but each surface has one job.</p>
      <p>
        <code>README.md</code> belongs to the GitHub account profile. It can be animated, badge-heavy, and optimized for quick profile scanning.
      </p>
      <p>
        <code>src/</code> and <code>dist/</code> belong to Cloudflare. Vite 8 with Rolldown bundles TypeScript into deployable static assets, so Pages can publish from GitHub and Workers can serve the same output.
      </p>
      <pre><code>GitHub profile: README.md
Cloudflare source: src/ → dist/
Operating guide: blog.md
Workers config: wrangler.toml</code></pre>
      <p>
        Keeping this split visible avoids accidental coupling. Profile changes should not break the blog, and blog deployment details should not crowd the GitHub profile.
      </p>
    `,
  },
];

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}

export function getSortedPosts(): Post[] {
  return [...posts].sort((a, b) => b.date.localeCompare(a.date));
}
