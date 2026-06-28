# cristianvaldez.jp

Personal resume site + technical blog for Cristian Valdez (cloud infrastructure / IT support, based in Aomori, Japan). A scannable resume up front, with deep project case studies and technical writing underneath.

Conventions, design rules, and the **first-priority anti-AI-slop rules** live in [.claude/CLAUDE.md](.claude/CLAUDE.md) - read it before changing anything.

## Stack

Astro 7 (static) - `@astrojs/cloudflare` v14 (deploy as a Cloudflare **Worker**) - TypeScript strict - plain CSS with design tokens (no Tailwind, no UI lib) - MDX, RSS, sitemap - fonts self-hosted via Fontsource. Heading font **Mona Sans**, body **Hanken Grotesk**, mono **IBM Plex Mono**. One accent: sage green `#3F7A52`. Light + dark (system-aware, toggle).

## Commands

| Command | Action |
| :-- | :-- |
| `npm run dev` | Dev server at `localhost:4321` (run in a real terminal, see gotcha below) |
| `npm run check` | Type + content check (keep this at 0/0/0) |
| `npm run build` | Build to `./dist/` |
| `npm run deploy` | Build, then `wrangler deploy --config dist/client/wrangler.json` |

**Dev-server gotcha:** running `npm run dev` headless / non-TTY triggers an upstream Astro bug (its JSON logger calls `process`, which does not exist in the Cloudflare workerd dev runtime), so every route 500s with "process is not defined". It works in a normal interactive terminal. To preview a build without the dev runtime: `npm run build` then serve `dist/client` with any static server.

## Where the content lives (edit these)

- **Resume:** `src/data/resume.ts` (profile, experience, skills, credentials). Phone number is deliberately omitted from the public site.
- **Project case studies:** `src/content/projects/*.md` (frontmatter feeds the homepage cards + the `/projects/[slug]` page; body is the write-up). Current drafts need Cristian's review for accuracy.
- **Blog posts:** `src/content/blog/*.md` (set `draft: true` to hide). RSS at `/rss.xml`.
- **Design tokens / global CSS:** `src/styles/global.css` (single source of truth, never hardcode colors).

## Status

**Done:** scaffold + build config; design tokens + dark mode (ThemeScript); self-hosted fonts; Icon / Seo / Nav (theme toggle) / Footer; projects collection + 2 case studies; blog (index, post, RSS); robots.txt, 404, sitemap, CV favicon, JSON-LD. `astro check` is 0/0/0.

**Homepage redesign (split sidebar):** the home page (`src/components/Home.astro`, rendered by `src/pages/index.astro` + `src/pages/ja/index.astro`) is a two-column layout: a sticky left sidebar (CV monogram, name, role, tagline, scroll-spy table-of-contents nav, socials, language + theme toggles) and a scrolling right column (About, Projects with screenshots, Experience, Skills, Education). Inspired by brittanychiang.com but with our own type/color/light-default. Positioning broadened from cloud/infra to general "IT & Web Development".

**EN/JA i18n:** Astro i18n (`/` = en, `/ja` = ja, default not prefixed). UI strings in `src/i18n/ui.ts`; bilingual resume copy in `src/data/resume.ts` (`resume[lang]`); project card text via `nameJa`/`taglineJa` frontmatter. Author-written JA, scoped to homepage + chrome. Blog posts and full case-study bodies stay English for now (links from the JA home point at the EN pages). `BaseLayout` takes `lang` + `bare` (the homepage supplies its own `<main>` and skips the top Nav/Footer).

## TODO

- [ ] **Fill in real content** - resume tweaks (`src/data/resume.ts`), the two case studies (`src/content/projects/*.md`), real blog posts. Replace the placeholder `welcome` post.
- [ ] **OG share image** - generate a branded 1200x630 `public/og/default.png` (name + title on the sage/cream) with sharp. `Seo.astro` already emits image tags when an `image` is passed; wire a default.
- [ ] **Accessibility sweep + Lighthouse** - landmarks, heading order, contrast, focus, labels. Full Lighthouse best run against the deployed site.
- [ ] **Headshot in dark mode** - the studio-white background reads as a light block on dark; replace or remove the background (`src/assets/images/cristian.png`).
- [ ] **More personal feel** - especially the blog (per feedback; the resume page can stay restrained). Bring 2-3 directions before building.
- [ ] **Deploy** (needs Cloudflare account):
  - [x] `git init` + push to GitHub: https://github.com/cvaldezcomputerer/personal-website (public, `main`).
  - [ ] Add `cristianvaldez.jp` to Cloudflare; change nameservers at star-domain.jp to Cloudflare's; attach as a Workers custom domain.
  - [ ] Connect the repo in Cloudflare **Workers Builds** (build `npm run build`, deploy `wrangler deploy --config dist/client/wrangler.json`). Note: a fully-static build emits the generated config under `dist/client/`, not `dist/server/`.
  - [x] **`SESSION` KV binding** - not needed; sessions are disabled via the null driver in `astro.config.mjs` (static site uses no `Astro.session`).
  - [ ] Sort the `SESSION` KV binding the adapter wants (create a KV namespace bound as `SESSION`, or disable sessions).
- [ ] **Print styles for the new homepage** - the split-sidebar home no longer has `.site-header`/`.site-footer`; print currently hides `.no-print` chrome and the TOC, but the one-page resume PDF should be reviewed against the new layout.
- [ ] **JA for inner pages** - blog posts + full case-study bodies are still English-only; the `/ja` home links to the EN versions. Translate per-post with a flag when wanted.
- [ ] **Internal pages** - `/specimen` (style guide) is noindex; delete or keep as a reference.

## Notes for a fresh session

- Project memory (who the user is, decisions, anti-slop rules) is in the per-project memory store and auto-loaded via `MEMORY.md`.
- Never commit for the user. Never take screenshots without asking. No em dashes in prose/copy.
