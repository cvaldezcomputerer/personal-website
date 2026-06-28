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
  Bricolage Grotesque (headings), Hanken Grotesk (body), IBM Plex Mono (code).
  Do not introduce other families casually.
- **Color:** no purple / lavender, no purple-to-blue gradients, no gradients at
  all. One accent only: sage green (`--color-accent`). Everything else is warm
  neutrals.
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

"Warm modern, grown up." Warm off-white ground, one sage-green accent, soft
contained cards, line icons. Restrained and professional. This is brand
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
- **Sessions are disabled** (`session: { driver: sessionDrivers.null() }` in
  `astro.config.mjs`). The static site uses no `Astro.session`, so we avoid the
  `SESSION` KV namespace the adapter would otherwise require at deploy.
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

## Workflow

- **Never commit for the owner.** He writes his own commit messages and runs git
  himself. A brief note that it is a good time to commit is fine.
- **Never take screenshots without asking first.**
