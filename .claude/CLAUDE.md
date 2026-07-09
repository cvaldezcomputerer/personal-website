# Cristian Valdez - personal site

Personal resume site + technical blog for Cristian Valdez. It is a credibility
amplifier for his move into cloud infrastructure / IT support: a scannable
resume up front, with deep project case studies and technical writing
underneath (the kind too technical for his bloggydoggy blog). Live at
https://cristianvaldez.jp.

## Design rules - avoiding "AI slop" is the #1 priority

The owner cares a lot about the site NOT looking AI-generated. Treat avoiding
AI-slop tells as a first-class constraint, above convenience. Specific tells to
avoid (researched):

- **Fonts:** never Inter / Roboto / Geist as the workhorse, and never the
  giveaway combo Space Grotesk + Instrument Serif + Geist. This site uses
  Mona Sans (headings), Hanken Grotesk (body), IBM Plex Mono (code). Do not
  introduce other families casually.
- **Color:** no purple / lavender, no purple-to-blue gradients, no gradients at
  all. One accent only: sage green (`--color-accent`). Everything else is warm
  neutrals. The brand mark is the クリス name-seal (hanko), rendered in that same
  sage - not a second hue. (A red+indigo two-hue scheme was tried during the 2026
  hanko rebrand and rejected: the owner prefers the single sage accent.)
- **Dark mode:** ship light + dark, system-aware, with a toggle. Light is the
  default. Never a permanent dark theme (the single most common AI tell). Keep
  text high-contrast in both themes.
- **Shadows / effects:** flat, soft, neutral shadows. No colored glows, no
  decorative blur.
- **Layout:** left-aligned, content-driven sections. No centered "Build the
  future" hero in a generic sans, no badge above the H1, no rows of identical
  icon-on-top feature cards, no "1 2 3" step strips, no fake stat banners, no
  colored top/left card borders, no icon-card grids. Use one layout primitive
  and repeat it. Project cards must be substantive.
- **Spacing:** use the space / radius scales with deliberate hierarchy, not a
  uniform 16px-radius / 24px-padding on everything.
- **Imagery:** real assets only. Cristian's real headshot, real screenshots of
  his projects. No stock "team at a laptop", no plastic AI illustrations.
- **Copy:** specific and concrete, in his voice. No hedging ("may help"), no
  superlatives ("best-in-class", "cutting-edge").
- **Motion:** restrained and purposeful, with easing. No fade-in on everything.

Other firm rules:

- **No em dashes** in prose / UI copy / meta / alt text. Use hyphens, commas,
  colons, parentheses, or rephrase. (The owner reads em dashes as an AI tell.)
  Fine only as a title separator ("Page - Site") and in code comments.
- **No emojis** in site chrome.
- **Prefer SVG.** Inline-SVG via `src/components/Icon.astro` (Lucide line
  paths); no icon webfont / CDN.
- **Give elements clear definition.** Group content into contained surfaces (a
  panel / card / strip with its own background, border, radius). Nothing floats
  in open space.

## Visual identity

"Warm modern, grown up." Warm off-white ground, one sage-green accent (also the
color of the クリス name-seal / hanko brand mark), soft contained cards, line
icons. Restrained and professional. This is brand
continuity with the owner's other sites (takkotaco.com, bloggydoggy.com) but
calmer and more grown-up. Note: warm cream backgrounds are themselves an
AI-default, so ours is a deliberate continuity choice, kept distinctive through
type, layout, and real content.

## Tech stack

- Astro 7 (static by default), `@astrojs/cloudflare` v14 adapter, deployed on
  Cloudflare **Workers**.
- TypeScript strict. Plain CSS with custom properties. No Tailwind, no UI
  library.
- `@astrojs/mdx` (blog), `@astrojs/rss`, `@astrojs/sitemap`. Fonts self-hosted
  via Fontsource.
- npm. Dev `npm run dev`, build `npm run build`, deploy `npm run deploy`.
- Path alias `~/*` -> `src/*`.

## Commands & local dev

| Command | Action |
| :-- | :-- |
| `npm run dev` | Dev server at `localhost:4321` (run in a real terminal, see gotcha) |
| `npm run check` | Type + content check (keep at 0/0/0) |
| `npm run build` | Build to `./dist/` |
| `npm run deploy` | Build, then `wrangler deploy --config dist/client/wrangler.json` |

**Dev-server gotcha:** running `npm run dev` headless / non-TTY triggers an
upstream Astro bug (its JSON logger calls `process`, absent in the Cloudflare
workerd dev runtime), so every route 500s with "process is not defined". It
works in a normal interactive terminal. To preview a build without the dev
runtime: `npm run build`, then serve `dist/client` with any static server.

## Where the content lives (edit these)

- **Resume / About / skills / experience:** `src/data/resume.ts`. Bilingual:
  `contact` is language-neutral, the rest is `resume[lang]` (en/ja side by side).
  Phone number is deliberately omitted from the public site.
- **UI strings (chrome):** `src/i18n/ui.ts` (`ui[lang]`). Author-written JA.
- **Project case studies:** `src/content/projects/*.md`. Frontmatter feeds the
  homepage cards (incl. `nameJa` / `taglineJa` / `cardImage`) and the
  `/projects/[id]` page; the body is the write-up. Drafts need Cristian's review.
- **Blog posts:** `src/content/blog/*.md` (set `draft: true` to hide). RSS at
  `/rss.xml`. Posts + full case-study bodies are English-only for now.
- **Design tokens / global CSS:** `src/styles/global.css` (never hardcode color).
- **Homepage:** `src/components/Home.astro` (split-sidebar, rendered by
  `src/pages/index.astro` en + `src/pages/ja/index.astro` ja).

## Tokens - single source of truth

All design values live as CSS custom properties in `src/styles/global.css`:
color (palette -> semantic -> dark remap), space, radius, shadow, transition,
font, type scale. NEVER hardcode a color; always use a token so dark mode flips
it for free. Do not redefine `--color-*` per page; add shared values to
`global.css`.

Dark mode is a token remap under `html[data-theme="dark"]`, set before first
paint by `src/components/ThemeScript.astro` (honors the saved choice, else
`prefers-color-scheme`). Every component reads tokens via `var()`, so the chrome
flips automatically.

## Astro CSS scoping - read before writing component CSS

Astro scopes styles by adding a `data-astro-cid-*` attribute to elements and
appending it to selectors. A child component's root element carries only THAT
component's scope, never the parent's, and JS-built nodes
(`createElement` / `innerHTML`) carry no scope at all. So a parent's scoped rule
targeting a child component's element (or a class passed via a `class` prop)
silently does not apply.

Fixes, narrowest that fits: (1) `:global(.x)` in the parent for one-off
placement; (2) style it inside the component; (3) cross the boundary with a CSS
custom property; (4) wrap in a parent-rendered `<div>`. The tell: a
margin/color/display rule on a component class has no effect - it is almost
always this.

## Cloudflare deploy

- Hosted as a Cloudflare **Worker** (not Pages), like the sister sites. Build
  `astro build`, deploy `wrangler deploy --config dist/client/wrangler.json`
  (`npm run deploy` does both). The site is fully static, so the adapter emits
  the generated wrangler config under `dist/client/`, not `dist/server/` (which
  is empty); a future SSR route would move it to `dist/server/`.
- **Sessions are inert** (`session: { driver: sessionDrivers.lruCache() }` in
  `astro.config.mjs`). The static site uses no `Astro.session`, so this avoids
  the `SESSION` KV namespace the adapter would otherwise require at deploy. Use
  `lruCache` specifically: the simpler `memory` / `null` drivers exist at runtime
  but are absent from the `sessionDrivers` TS types, so they fail `astro check`.
- **Never add `nodejs_compat`** to `wrangler.jsonc` compatibility_flags. With
  adapter v14 + Astro 7 it breaks the build-time SSG render and every page
  builds as the literal string "[object Object]". unenv inlines Node polyfills
  at build, so runtime does not need the flag.
- Runtime bindings / secrets: `import { env } from 'cloudflare:workers'`. Type
  them by hand in `src/env.d.ts` (see the warning there about workers-types DOM
  pollution).
- Domain: cristianvaldez.jp, registered at star-domain.jp. To serve from
  Workers: add the domain to Cloudflare, point its nameservers (in the
  star-domain.jp panel) at Cloudflare's, then attach it as a Workers custom
  domain.

## SEO

Every page renders through a layout that includes `src/components/Seo.astro`
(canonical, Open Graph, Twitter, JSON-LD Person schema). Set a unique title +
description per page. `site` must stay set in `astro.config.mjs`. The sitemap is
auto-generated; dev/preview pages go in `NOINDEX_ROUTES` (astro.config) AND get
a noindex meta AND go in `public/robots.txt`.

## Status

- **Built:** scaffold + build config; tokens + dark mode (ThemeScript);
  self-hosted fonts; Icon / Seo / Nav / Footer; projects collection + 2 case
  studies; blog (index, post, RSS); robots.txt, 404, sitemap, hanko favicon,
  JSON-LD. `astro check` is 0/0/0.
- **Homepage redesign (split sidebar):** two-column layout - sticky left
  sidebar (クリス hanko monogram, name, role, tagline, scroll-spy TOC, socials) and a
  scrolling right column (About, Projects with screenshots, smaller projects,
  Experience, Skills, Education). Writing link + language/theme toggles sit in a
  top-right bar in the content column. Inspired by brittanychiang.com, our own
  type/color/light-default. Positioning broadened to "IT & Web Development".
- **EN/JA i18n:** Astro i18n (`/` = en, `/ja` = ja, default not prefixed).
  `BaseLayout` takes `lang` + `bare` (homepage supplies its own `<main>`, skips
  the top Nav/Footer). JA scoped to homepage + chrome; inner pages stay English.
- **Repo:** https://github.com/cvaldezcomputerer/personal-website (public,
  `main`). Auto-deploy on push via Cloudflare Workers Builds (worker named
  `personal-website`).
- **LIVE** at https://cristianvaldez.jp (and `/ja/`), HTTPS, both locales 200,
  served from Cloudflare's Tokyo edge. Custom domain attached.
- **About photo** is the rice-planting candid (`cristian-rice-planting.jpg`),
  zoomed 1.35x on Cristian; its green background also resolved the old
  dark-mode headshot issue.
- **Smaller projects** section added (Mercari Chrome extension -> published Web
  Store listing; ZMK Totem config). Spanish (conversational) added to languages.

## TODO

- [ ] **Fill in real content** - resume tweaks and real blog posts. Replace the
  placeholder `welcome` post. (The two case studies are now written; see below.)
- [ ] **Screenshot upgrades (optional)** - all 5 feature shots are in as of
  2026-07-07, taken headlessly (Playwright, light mode, 2x DPR) from the live
  sites at owner's request as drafts; he may want to reshoot or art-direct any
  of them. Remaining nice-to-have: a short GIF of the multiplayer class race
  for the Takko games major (needs two devices / two contexts). Source
  projects live on this machine: `../dog_site/dog_SITE` = takkotaco.com,
  `../astro/takko blog` = bloggydoggy.com (folder names are inverted; `site:`
  in astro.config is authoritative).
- [ ] **Regenerate `public/favicon.ico`** - the SVG favicon is the new クリス
  hanko, but the legacy `.ico` fallback (auto-requested at `/favicon.ico`) is
  still the old green CV tile. Rasterize the hanko to a multi-size `.ico` (sharp /
  ImageMagick) so old browsers match.
- [ ] **OG share image** - branded 1200x630 `public/og/default.png` via sharp;
  `Seo.astro` already emits image tags when an `image` is passed. Wire a default.
- [ ] **Accessibility sweep + Lighthouse** - landmarks, heading order, contrast,
  focus, labels. Full Lighthouse run against the deployed site.
- [ ] **Print styles for the new homepage** - the split-sidebar home dropped
  `.site-header`/`.site-footer`; review the one-page resume PDF against it.
- [ ] **More personal feel** - especially the blog. Bring 2-3 directions first.
- [ ] **JA for inner pages** - blog + full case studies are English-only; the
  `/ja` home links to the EN versions. Translate per-post with a flag if wanted.
- [ ] **`www` subdomain** (optional) - add `www.cristianvaldez.jp` as a second
  Worker custom domain (or a redirect) if wanted; apex works now.
- [ ] **Internal pages** - `/specimen` (style guide) is noindex; keep or delete.
- [ ] **Uncommitted:** `.claude/settings.json` (harness permission state) is
  modified but intentionally left out of commits - decide commit vs gitignore.

### Done this session (2026-07-07)

Filled in the 5 remaining screenshot placeholders on the two case-study pages
with real, headless-captured shots from the live sites (Playwright, light
mode, 2x DPR, at owner's request, as drafts he can reshoot/redirect later).
Takko: games grid (scrolled to the card row) and worksheet maker (with a real
category selected so the preview sheet shows illustrated words, not an empty
page) for the majors; homepage hero and the open feedback panel for the
minors. Bloggy: a populated post gallery (4 polaroid photos) for its one
remaining minor. All wired through `astro:assets` `<Image>` (not raw `<img>`),
so they get build-time webp optimization; a `.major-shot`/`.minor-shot`
`:global()` rule replaced the old `.ph` placeholder styling in both pages.
Assets live in `src/assets/images/{takkotaco,bloggydoggy}/`. `astro check`
0/0/0, build clean.

### Done this session (2026-07-06)

Settled the case-study feature hierarchy (owner decisions: map demoted to a
small live minor; multiplayer race folded into the games major as an honest
"newest experiment" since it is lightly tested and the planned AWS project will
be its expansion; inline-Explain trick approved) and replaced showcase
placeholders with live artifacts. Takko (`takkotaco.astro`): majors are now
games-toolkit (incl. multiplayer beat) + vocab pipeline; minors lead with the
SVG letter system drawn live (`src/components/takkotaco/StrokeWord.astro` +
`src/data/letter-strokes.ts`, both ported from dog_SITE; draws on scroll,
click to replay) then the map (JapanMap, now small); train timer cut to an
"and more" line; Takko-ben is text-only. Bloggy (`bloggydoggy.astro`): both
majors are live demos - `bloggydoggy/LangDemo.astro` (real rice-planting
paragraph in all 3 modes) and `bloggydoggy/QuizDemo.astro` (real quiz
component, canned votes, One Piece question; follows the LangDemo toggle via a
`bd-demo:lang` event, mirroring the blog). Ported `bloggydoggy/Explain.astro`
(used inline on "testing ground" in the overview, called out in Playful
details) and `bloggydoggy/PressToLight.astro` (4th Playful tile, photos copied
to `src/assets/images/bloggydoggy/`, style grid now 2x2). Likes minor is
text-only. `astro check` 0/0/0, build clean.

### Done this session (2026-07-01)

Rebuilt the project case studies. Moved off the shared `[slug].astro` template
(deleted) to two bespoke pages: `src/pages/projects/takkotaco.astro` and
`bloggydoggy.astro`. Card metadata still comes from the `projects` content
collection; the `.md` bodies are now trimmed to frontmatter-only (a comment
points to the `.astro` page). Each page has an "at a glance" panel (Problem / My
role / Status / Impact / Stack) and a features section using a **major (editorial
+ big media) / minor (compact alternating rows)** split. Feature screenshots are
placeholder `.ph` tiles for now (see TODO).

Two real artifacts embedded live from the source sites: Takko renders the actual
Geolonia prefecture SVG map (`src/components/JapanMap.astro`, display-only,
GFDL - kept `src/assets/japan-map/License.txt`, attribute Geolonia). Bloggy has a
"Playful details" section with the ported garlic Loader (`src/components/
bloggydoggy/{Loader,Logo}.astro`, real SVG+JS, remapped `--text`->`--color-text`
and the dot radius to 50%) plus two animated WebPs (spinning mug, camera sticker)
served from `public/projects/bloggydoggy/` so sharp does not strip the animation.

Also: swapped the homepage card images for fresh **light-mode** screenshots
(`src/assets/images/{takkotaco,bloggydoggy}.png`, 1280x800); fixed the JET link
in `resume.ts` (about) and pointed the games link to `takkotaco.com/game/`;
dropped Leaflet/shrines from the Takko write-up (map feature is the SVG origin
map, not Leaflet); restyled the project "Visit site" CTA as a quiet underlined
link (was a solid button). NOTE: `tsconfig.json` was NOT touched (owner asked;
confirmed clean via git).

### Done this session (2026-06-28)

Homepage split-sidebar redesign + EN/JA i18n; broadened positioning; smaller
projects + Spanish; relocated chrome controls; git repo created + pushed;
deployed to Cloudflare Workers + custom domain live; sessions made inert
(lruCache, no SESSION KV); fixed `npm ci` lockfile (@emnapi devDeps), deploy
config path (`dist/client/wrangler.json`), worker-name consistency; swapped +
zoomed the About photo; slimmed the public README (ops moved here).

## Workflow

- **Never commit for the owner.** He writes his own commit messages and runs git
  himself. A brief note that it is a good time to commit is fine. (Exception this
  setup phase: he asked me to create + push the repo.)
- **Never take screenshots without asking first.**
