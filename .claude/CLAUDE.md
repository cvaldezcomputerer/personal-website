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

Agents must start Astro in background mode:

```sh
astro dev --background
```

Manage that server with `astro dev status`, `astro dev logs`, and
`astro dev stop`. The `npm run dev` command below is for an interactive human
terminal.

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

## Astro documentation

Full documentation: https://docs.astro.build

Read the relevant official guide before changing these areas:

- Routing, dynamic routes, or middleware: https://docs.astro.build/en/guides/routing/
- Astro components: https://docs.astro.build/en/basics/astro-components/
- Framework components: https://docs.astro.build/en/guides/framework-components/
- Content collections: https://docs.astro.build/en/guides/content-collections/
- Styling or Tailwind: https://docs.astro.build/en/guides/styling/
- Internationalization: https://docs.astro.build/en/guides/internationalization/

## Where the content lives (edit these)

- **Resume / About / skills / experience:** `src/data/resume.ts`. Bilingual:
  `contact` is language-neutral, the rest is `resume[lang]` (en/ja side by side).
  Phone number is deliberately omitted from the public site.
- **UI strings (chrome):** `src/i18n/ui.ts` (`ui[lang]`). Author-written JA.
- **Project cards:** `src/content/projects/*.md`. These files contain
  frontmatter only, including `nameJa`, `taglineJa`, and `cardImage`.
- **Project case studies:** bespoke pages at
  `src/pages/projects/{takkotaco,bloggydoggy}.astro`. Their labelled pillar
  structure is intentional. Keep claims tied to shipped work: Takko's ABC race
  multiplayer is not a portfolio feature, and its live class quiz (Kabloo, a
  placeholder name) stays the Durable Objects architecture row, unnamed, until
  it launches. Re-verify counts (games, dialect entries, grammar points) against
  the takkotaco repo before editing.
- **Blog: hidden** (Oct 2026, the owner is not writing for now). Routes are
  `src/pages/_blog/` and `src/pages/_rss.xml.ts`; the underscore makes Astro
  skip them. Posts live in `src/content/blog/`. To unhide: drop the
  underscores, restore the Writing links (homepage topbar, `Nav.astro`, 404)
  and the RSS `<link>` in `BaseLayout.astro`, and replace the placeholder
  `welcome` post. Posts + full case-study bodies are English-only for now.
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
(canonical, Open Graph, Twitter, JSON-LD Person schema). The default share card
`public/og/default.png` repeats the headline, tagline, and photo as pixels, so
regenerate it when those change. Write internal links with a trailing slash
(`/projects/x/`, `/ja/`): the Worker 307-redirects the bare form. Set a unique title +
description per page. `site` must stay set in `astro.config.mjs`. The sitemap is
auto-generated; dev/preview pages go in `NOINDEX_ROUTES` (astro.config) AND get
a noindex meta AND go in `public/robots.txt`.

## TODO

- [ ] **Prose voice audit** - the case-study prose reads as AI-written in
  places. Two tells run through both pages: the "The benefit is X. The limit is
  Y." template repeated across every Architecture paragraph, and a constant
  "not X, but Y" antithesis habit. The concrete first-person passages are fine;
  it is the scaffolding that needs rewriting. There is no prose-writing skill in
  this repo (`writing-for-agents` governs agent docs only); the blog repo's
  `writing-fragments` / `writing-shape` / `writing-beats` are drafting
  processes, not audits.
- [ ] **Screenshot upgrades (optional)** - review the current real feature
  shots and reshoot only with the owner's approval. Face Catch includes the
  unidentifiable back of a coworker's head.
- [ ] **AWS SAA result** - exam due late Oct / early Nov 2026. On a pass, flip
  the credential in `resume.ts` (drop `inProgress`, add the Credly link) and
  update the headline / OG image if the positioning changes.
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

## Skills

All in `.claude/skills/<name>/SKILL.md`. Several are meant to fire on their own;
load them by name when they do not.

- **`grilling`**: before building any new page, section, or component, interview
  the owner until every branch of the decision is settled. Run it *before*
  scaffolding, not after. Its standing questions are this site's recurring ones
  (who is skimming, which AI-slop tell is this flirting with, does it need JA,
  where does the content actually live). `/grill-me` invokes it on demand.
- **`prototype`**: when the answer is "show me a few options", build the variants
  instead of describing them. The UI branch renders several takes on one route
  with a switcher; the logic branch is a single clickable HTML file. On a mostly
  static site the UI branch is nearly always the right one.
- **`diagnosing-bugs`**: for anything broken, throwing, failing, slow, or
  silently not applying. Phase 0 is this repo's known silent failure modes (the
  `nodejs_compat` render bug, the headless dev server, CSS scoping, the session
  driver), and it refuses to hypothesise before a feedback loop goes red.
- **`writing-for-agents`**: for editing this file or any `SKILL.md`. It governs
  documents an agent executes, never site copy.

## Workflow

- **Never commit for the owner.** He writes his own commit messages and runs git
  himself. A brief note that it is a good time to commit is fine. (Exception this
  setup phase: he asked me to create + push the repo.)
