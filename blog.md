# neko233-com Blog

This repository has two jobs:

1. `README.md` is the GitHub account profile surface.
2. `src/` is the Vite 8 + TypeScript blog source; Cloudflare Pages deploys the built `dist/` output.

The blog is static: no database, no server runtime required at request time. Cloudflare builds and deploys from this repository.

## Repository Layout

```txt
README.md                         GitHub profile README
AGENTS.md                         Agent and product spec
blog.md                           Blog deployment and operating guide
src/                              Vite blog source (TypeScript)
public/                           Static assets copied into dist/
dist/                             Vite build output (generated)
worker/worker.ts                  Cloudflare Worker entry
functions/health.js               Cloudflare Pages /health function
package.json                      npm scripts and dependencies
wrangler.toml                     Cloudflare Workers static assets config
.github/workflows/                GitHub profile animation automation
assets/                           README visual assets
```

## Cloudflare Pages Deployment

Use this mode when you want Cloudflare to build and deploy the blog from GitHub automatically.

Recommended settings:

```txt
Framework preset    Vite
Build command       npm run build
Build output        dist
Root directory      /
Production branch   main
Node version        20
```

Steps:

1. Open Cloudflare Dashboard.
2. Go to `Workers & Pages`.
3. Create a Pages project.
4. Connect the `neko233-com/neko233-com` GitHub repository.
5. Use the settings above.
6. Deploy.
7. Add a custom domain if needed, for example `neko233.com`.

Pages will serve `dist/index.html` as the blog home page.

Cloudflare Pages also reads these static support files from `dist/`:

```txt
dist/_headers       security and cache headers
dist/404.html       not-found page
dist/robots.txt     crawler rules
dist/sitemap.xml    indexable URL list
dist/feed.xml       RSS feed
functions/health.js /health endpoint
```

## Local Commands

```bash
npm install
npm run dev
npm run build
npm run verify
npm run preview
npx wrangler pages deploy dist --project-name neko233-com
```

## Cloudflare Workers Deployment

Use this mode when you want to serve the same static files through Workers static assets.

For the Cloudflare Dashboard screen shown during `Create Worker`, use:

```txt
Project name      neko233-com
Build command     npm run build
Deploy command    npx wrangler deploy
Root directory    /
```

If Cloudflare asks whether the project uses third-party build tooling, keep it enabled. This repository has a `package.json` so Cloudflare can install dependencies and run the deployment command reliably.

Install Wrangler locally:

```bash
npm install
```

Login:

```bash
npx wrangler login
```

Preview locally:

```bash
npm run build
npx wrangler dev
```

Deploy:

```bash
npm run build
npm run worker:deploy
```

The Worker entry is `worker/worker.ts`. It serves static assets from `dist/` through the `ASSETS` binding configured in `wrangler.toml`. Missing routes use the static `404.html` page because `not_found_handling` is set to `404-page`.

The health check route is:

```txt
/health
```

## Writing Posts

Posts are data-driven TypeScript objects in `src/data/posts.ts`.

Post rules:

```txt
Use lowercase kebab-case slugs.
Keep each post content as an HTML fragment in posts.ts.
Run npm run build so the post appears in dist/, RSS, and sitemap.
Do not put GitHub profile-only badges inside blog posts.
```

After adding a post:

```bash
npm run build
npm run verify
```

The build generates:

```txt
dist/posts/<slug>/index.html
dist/feed.xml
dist/sitemap.xml
dist/index.html post list
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

## Source Of Truth

This repository is the source for both surfaces:

```txt
GitHub reads README.md
Cloudflare Pages builds src/ into dist/
Cloudflare Workers reads dist/ through wrangler.toml
AGENTS.md defines the product spec for both surfaces
```

Keep those boundaries explicit so profile changes do not break the deployed blog.
