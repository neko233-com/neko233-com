---
name: github-actions
description: Maintain GitHub Actions workflows for the neko233-com profile and blog repository. Use when changing .github/workflows, GitHub profile animation automation, Cloudflare Pages CI/deploy workflows, or action/runtime versions in this repo.
---

# GitHub Actions

Follow `AGENTS.md` first. Keep profile automation separate from the Cloudflare Pages blog contract.

## Runtime Defaults

- Prefer the latest Node.js LTS for GitHub Actions work. Current project preference: Node.js 24 LTS.
- Prefer action versions that run on Node.js 24, such as `actions/checkout@v6` or newer when available.
- If a third-party action still emits Node runtime deprecation warnings, first check for a maintained newer release. If none exists, set `FORCE_JAVASCRIPT_ACTIONS_TO_NODE24=true` and document the limitation.

## Profile Animation Workflows

- Treat contribution snake and 3D contribution profile generation as optional profile asset generation, not as tests.
- Do not add daily or scheduled runs for profile animation generation unless explicitly requested.
- Prefer `workflow_dispatch` for profile animation refreshes.
- If generated assets need to be committed, generate all assets in one job and push once to avoid non-fast-forward races.
- Avoid multiple parallel jobs that each push to `main`.

## Blog And Pages Workflows

- Use npm, not pnpm or yarn.
- For Pages validation, run `npm run validate`; it includes build, verify, and typecheck.
- Do not configure Pages deploy command as `npx wrangler deploy`.
- Keep Pages output as `dist/` and Node version compatible with the repository and Cloudflare contract.

## Before Pushing

- Inspect workflow diffs directly.
- Run `npm run validate` when changing blog build, Pages CI, source code, or deployment behavior.
- For profile-only workflow changes, workflow syntax review is sufficient unless an action-specific local validator is available.
