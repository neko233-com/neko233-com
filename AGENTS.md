# AGENTS.md

## Mission

This repository is both:

1. The GitHub special profile card for `neko233-com`.
2. The source repository for the `neko233-com` personal blog deployed by Cloudflare Pages.

Both surfaces must keep clear ownership boundaries.

## Product Spec

### GitHub Profile Surface

- `README.md` is the only GitHub profile entry point.
- The repository name must match the GitHub username: `neko233-com`.
- Profile-only animation assets live in `assets/`.
- Generated profile contribution visuals live in `profile-3d-contrib/` or the GitHub Actions `output` branch.
- Do not move Cloudflare build instructions into the main profile flow; link to `blog.md` instead.
- Keep the private-contribution achievement note in `README.md`.

### Blog Surface

- The blog is a Vite 8 + Rolldown + TypeScript application.
- Blog source code lives under `src/`.
- Static public files live under `public/`.
- Vite builds the blog into `dist/`.
- Cloudflare Pages must deploy `dist/`.
- `blog.md` is the operating guide for deployment and writing posts.
- The blog must remain usable without a database or external API.

### Cloudflare Pages Contract

Cloudflare Pages settings:

```txt
Framework preset    Vite
Build command       npm run build
Build output        dist
Deploy command      leave empty
Root directory      /
Production branch   main
Node version        22
```

Important:

- **Do not** set `Deploy command` to `npx wrangler deploy` on a Pages project.
- Pages publishes `dist/` automatically after `npm run build` succeeds.
- `npx wrangler deploy` is only for optional Workers deployment (see below) and requires Node.js 22+.

Required commands:

```bash
npm install
npm run build
npm run verify
npm run preview
npx wrangler pages deploy dist --project-name neko233-com
```

### Workers Contract

Workers support is optional and must not break Pages.

- Worker entry lives at `worker/worker.ts`.
- Worker assets are served from `dist/`.
- `wrangler.toml` must point to `dist/` for assets.
- Worker deployment command:

```bash
npm run build
npm run worker:deploy
```

## Validation Spec

Before pushing, run:

```bash
npm run validate
```

`validate` runs build, verify, and typecheck. This matches the Cloudflare Pages CI contract.

Optional Workers check:

```bash
npm run validate:worker
```

`validate:worker` additionally runs `wrangler deploy --dry-run` and requires Node.js 22+.

When Pages-specific deployment is being changed, also run:

```bash
npm run pages:deploy
```

Note: current Wrangler versions no longer accept `--dry-run` for `wrangler pages deploy`.

If a command cannot run because it requires authentication or Cloudflare account access, document the exact limitation in the final response.

## Development Rules

- Use npm, not pnpm or yarn.
- Keep TypeScript strict.
- Prefer Vite-native static generation and plain browser APIs.
- Do not add a database, server framework, or client router unless the spec changes.
- Keep generated build output out of Git unless Cloudflare requires otherwise.
- Keep `node_modules/`, `dist/`, and `.wrangler/` ignored.
- Add or update tests/verification scripts when changing build structure.

## Content Rules

- Posts are data-driven from TypeScript objects.
- Every published post must appear in:
  - the homepage list
  - generated RSS
  - generated sitemap
- The blog must include:
  - homepage
  - post pages
  - RSS feed
  - sitemap
  - robots.txt
  - 404 page
  - `/health` endpoint for Pages Functions and Workers
