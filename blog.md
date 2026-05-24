# neko233-com Blog

This repository has two jobs:

1. `README.md` is the GitHub account profile surface.
2. `site/` is the static personal blog source for Cloudflare Pages and Workers.

The blog is intentionally static: no build step, no database, no server runtime required. Cloudflare can deploy it directly from this repository.

## Repository Layout

```txt
README.md                         GitHub profile README
blog.md                           Blog deployment and operating guide
site/index.html                   Static blog home page
site/styles.css                   Blog styles and animations
site/app.js                       Small client-side interactions
site/posts/hello-edge.html        Example post
site/posts/profile-and-blog-split.html Example post
site/feed.xml                     RSS feed
site/sitemap.xml                  Search engine sitemap
site/robots.txt                   Crawler rules
site/404.html                     Static not-found page
site/site.webmanifest             Web app metadata
site/_headers                     Cloudflare Pages headers
wrangler.toml                     Cloudflare Workers static assets config
.github/workflows/                GitHub profile animation automation
assets/                           README visual assets
```

## Cloudflare Pages Deployment

Use this mode when you want Cloudflare to deploy the static blog from GitHub automatically.

Recommended settings:

```txt
Framework preset    None
Build command       leave empty
Build output        site
Root directory      /
Production branch   main
```

Steps:

1. Open Cloudflare Dashboard.
2. Go to `Workers & Pages`.
3. Create a Pages project.
4. Connect the `neko233-com/neko233-com` GitHub repository.
5. Use the settings above.
6. Deploy.
7. Add a custom domain if needed, for example `neko233.com`.

Pages will serve `site/index.html` as the blog home page.

Cloudflare Pages also reads these static support files:

```txt
site/_headers      security and cache headers
site/404.html      not-found page
site/robots.txt    crawler rules
site/sitemap.xml   indexable URL list
site/feed.xml      RSS feed
```

## Cloudflare Workers Deployment

Use this mode when you want to serve the same static files through Workers static assets.

Install Wrangler locally:

```bash
npm install -g wrangler
```

Login:

```bash
wrangler login
```

Preview locally:

```bash
wrangler dev
```

Deploy:

```bash
wrangler deploy
```

The Worker reads static assets from `site/` using `wrangler.toml`. Missing routes use the static `404.html` page because `not_found_handling` is set to `404-page`.

## Writing Posts

Create posts as static HTML files inside `site/posts/`.

Post rules:

```txt
Use lowercase kebab-case filenames.
Keep each post standalone and link it from site/index.html.
Use absolute or root-relative links for shared assets.
Keep code examples inside pre/code blocks.
Do not put GitHub profile-only badges inside blog posts.
```

Example:

```txt
site/posts/cloudflare-pages-notes.html
```

Then add it to the article list in `site/index.html`.

Also update:

```txt
site/feed.xml
site/sitemap.xml
```

## GitHub Profile Rules

For the GitHub account profile:

```txt
Repository name must match the GitHub username: neko233-com
The profile content must stay in README.md
README.md should explain the account, not the Cloudflare blog deployment
Use blog.md for operational blog documentation
Keep profile animation assets in assets/
Keep generated contribution visuals in profile-3d-contrib/ and output branch
```

To show unlocked achievements from private work:

1. Open GitHub profile settings.
2. Enable private contribution visibility.
3. Keep private contribution counts visible on the profile.

GitHub may show achievement messaging such as:

```txt
You unlocked new achievements from private contributions. Show them by including private contributions in your profile settings.
```

## Source Of Truth

This repository is the source for both surfaces:

```txt
GitHub reads README.md
Cloudflare Pages reads site/
Cloudflare Workers reads site/ through wrangler.toml
```

Keep those boundaries explicit so profile changes do not break the deployed blog.
