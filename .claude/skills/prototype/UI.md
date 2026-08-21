# UI Prototype

Generate **several radically different variants** of a page or component, rendered on one route, switchable from a floating bottom bar. The user flips between them in the browser, picks one (or steals bits from each), then the rest get thrown away.

If the question is about an interaction's behaviour rather than what something looks like, this is the wrong branch. Use [LOGIC.md](LOGIC.md).

## When this is the right shape

- "What should the Experience section look like?"
- "I want to see a few options for the project card before you build it."
- "Try a different layout for the blog index."
- "How should a case study's feature rows sit on the page?"
- Any time the alternative is the user picking between three descriptions in their head.

## Two sub-shapes: strongly prefer sub-shape A

A UI prototype is much easier to judge when it is **butting up against the rest of the site**: real sidebar, real tokens, real dark mode, real resume text, real project screenshots. A bare throwaway route is a vacuum where every variant looks fine. Default to sub-shape A whenever there is a plausible existing page to host the variants.

### Sub-shape A: variants inside an existing page (preferred)

The route already exists. The realistic hosts here:

- `src/components/Home.astro`, rendered by `src/pages/index.astro`. This is where most questions live, and it is where the split-sidebar layout can actually push back on a variant.
- `src/pages/projects/takkotaco.astro` or `bloggydoggy.astro`, for anything about how a case study reads.
- `src/pages/blog/[slug].astro` or `blog/index.astro`, for post chrome.
- `src/pages/specimen.astro`, the noindex style guide. Right host for a component with no natural home yet, and it is already excluded from search, so nothing leaks.

Variants swap only the rendered subtree. Everything else stays: the layout, the content collection query, the theme script, the language toggle.

### Sub-shape B: a new throwaway route (last resort)

`src/pages/_prototype-<name>.astro`. The leading underscore keeps Astro from building it as a page, so it cannot ship by accident. While you are working, you need a temporary un-underscored twin to actually see it: create it, and delete it in the same pass as the rest. Use this only when nothing existing can host the variants.

## The Astro constraint that shapes everything here

**This site is static.** Every page is prerendered at build time, so `Astro.url.searchParams` is meaningless: it is evaluated once during the build and baked in. A server-read `?variant=` param does not work.

So: **render every variant into the page, then show one with client-side JS.** Read the param in a client `<script>` from `location.search`, set an attribute on a wrapper, and let CSS pick. The param stays shareable and reload-stable because the script reads it on load.

```astro
---
// prototype: three takes on the experience section
import VariantA from '~/components/prototypes/ExperienceA.astro';
import VariantB from '~/components/prototypes/ExperienceB.astro';
import VariantC from '~/components/prototypes/ExperienceC.astro';
---

<div id="proto-root" data-variant="A">
  <div data-proto="A"><VariantA {...props} /></div>
  <div data-proto="B"><VariantB {...props} /></div>
  <div data-proto="C"><VariantC {...props} /></div>
</div>

<style>
  #proto-root [data-proto] { display: none; }
  #proto-root[data-variant='A'] [data-proto='A'],
  #proto-root[data-variant='B'] [data-proto='B'],
  #proto-root[data-variant='C'] [data-proto='C'] { display: block; }
</style>
```

Two scoping traps apply here (the full rule is in `.claude/CLAUDE.md`):

- The wrapper `<div>`s above are written in the page template, so they carry the page's `data-astro-cid-*` and the scoped CSS matches. **If you build the switcher bar with `document.createElement`, it gets no cid and the page's scoped CSS will not reach it.** Either write the bar in the template and only toggle it from JS, or sample the cid off an existing element and set it on what you create.
- A variant that is its own component only carries **its own** cid. Styling `.experience-row` from the page will silently do nothing. Style inside the variant component, or use an anchored `:global()`.

## Running it

`npm run dev` has to be started **in a real interactive terminal**. Launched headless or non-TTY it hits the upstream Astro logger bug and every route 500s with "process is not defined", which looks exactly like a broken prototype and is not one. Ask the owner to start it, or build and serve `dist/client` with a static server instead.

## Process

### 1. State the question and pick N

Default to **3 variants**, cap at 5. Write the plan in one line as a comment at the top of the host page:

> Three takes on the Experience section, switchable via `?variant=`, on the existing homepage route.

### 2. Generate radically different variants

Variants must be **structurally different**: different layout, different information hierarchy, different primary affordance. Three tweaked card grids is wallpaper, not a prototype. If two come out similar, redo one with an explicit constraint ("this one does not use a grid at all").

Each variant still uses the tokens, so dark mode works while the user is judging it. Testing a design that breaks the moment the theme flips teaches nothing.

Put variant components in `src/components/prototypes/`, named so the throwaway status is obvious.

### 3. Build the floating switcher

A fixed bar at the bottom-centre with three pieces: left arrow (wraps), the current variant key plus its name (`B (timeline layout)`), right arrow (wraps).

- Clicking updates `location.search` via `history.replaceState` and re-sets `data-variant`, so the variant is shareable and survives reload.
- Left and right arrow keys also cycle. Skip that when an `<input>`, `<textarea>`, or `[contenteditable]` has focus.
- Visually distinct from the page, so it reads as scaffolding rather than as part of the design being judged.
- Gate the whole bar on `import.meta.env.DEV` so a stray merge cannot ship it.

### 4. Hand it over

Give the user the URL and the variant keys. The useful feedback is almost always **"I want the heading from B with the layout from C"**, which is the actual design.

### 5. Fold in the winner and delete the rest

Rewrite the winning variant properly into the real page, then remove `src/components/prototypes/`, the switcher, and any throwaway route in the same pass. Run `npm run check` afterwards (target 0/0/0) to catch imports left pointing at deleted files, then `npm run build`.

## Anti-patterns

- **Variants that differ only in color or copy.** That is a tweak. Real variants disagree about structure.
- **A shared `BaseLayout` between variants.** A shared sidebar is fine; a shared layout defeats the point. Each variant should be free to throw out the layout.
- **Testing with lorem ipsum.** Use the real strings from `src/data/resume.ts` and the real project text. This site's whole argument is that the content is specific, and specific content is longer and more ragged than filler. Check the Japanese homepage too: JA runs much shorter in some places and wraps differently.
- **Judging in one theme only.** Flip dark mode before deciding. Half the variants that look best in light mode fall apart in dark.
- **Placeholder boxes where the screenshots go.** A grey rectangle flatters every layout equally. Use the real images in `src/assets/images/`, through `astro:assets` `<Image>` as the real page would.
- **Forgetting who is looking.** At least one variant should be judged on the thirty-second skim, not the careful read.
- **Promoting prototype code straight to production.** It was written with no error handling and no Japanese. Rewrite it when it lands.
