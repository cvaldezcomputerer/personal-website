---
name: diagnosing-bugs
description: Diagnosis loop for hard bugs and performance regressions. Use when the user says "diagnose" or "debug this", or reports something broken, throwing, failing, slow, or silently not applying.
---

# Diagnosing Bugs

A discipline for hard bugs. Skip phases only when explicitly justified.

## Redact

This skill has you show commands, outputs, and captured artifacts. **Redact anything sensitive first**: write `<REDACTED>` in its place. `wrangler` output carries account identifiers and auth headers, and the deploy config names the Cloudflare account. Quote only the lines that carry the signal.

If the redacted output is not enough to diagnose the bug, say so and ask.

## Phase 0: Check the known tells first

This codebase has a small set of silent failure modes that account for most "I changed it and nothing happened" bugs. Spend two minutes here before building anything:

- **A CSS rule simply has no effect.** Astro scopes styles with a `data-astro-cid-*` attribute that only lands on elements the compiler rendered. A child component's root carries its **own** cid, not the parent's, so styling a component by class name from the page silently does nothing, and a class handed over via a `class` prop has the same problem. JS-built nodes carry no cid at all. Check this before anything else; it is almost always this.
- **Every page builds as the literal string "[object Object]".** Someone added `nodejs_compat` to `compatibility_flags` in `wrangler.jsonc`. With adapter v14 and Astro 7 that breaks the build-time SSG render. Remove the flag; unenv already inlines the polyfills at build.
- **Every route 500s with "process is not defined".** The dev server was started headless or non-TTY. That is an upstream Astro logger bug under the workerd dev runtime, not a bug in this site. Restart `npm run dev` in a real terminal, or build and serve `dist/client` statically.
- **The deploy fails asking for a `SESSION` KV namespace.** The inert session driver in `astro.config.mjs` got changed. It must stay `sessionDrivers.lruCache()`: `memory` and `null` exist at runtime but are missing from the TS types and fail `astro check`.
- **`astro check` reports new errors in files you never touched**, usually about DOM methods or casts. Something pulled the full `@cloudflare/workers-types` globals in and swapped out the DOM lib. See the warning in `src/env.d.ts`; bindings get typed by hand with inline `import(...)` types.
- **A color is right in light mode and wrong in dark.** A hardcoded value instead of a token. Dark mode here is purely a token remap under `html[data-theme="dark"]`, so anything that does not read `var(--color-*)` cannot flip.
- **A post or project is missing from a listing.** `draft: true` in its frontmatter, or the entry failing the zod schema in `src/content.config.ts`. `npm run check` reports content-collection errors, so run it before reading the page.
- **A JA page shows English.** Expected, not a bug: Japanese covers the homepage and chrome only. `src/i18n/ui.ts` and `resume[lang]` are translated; blog posts and full case-study bodies are not, and `/ja` links to the EN versions on purpose.
- **An animated image lost its animation, or a screenshot looks soft.** `sharp` strips animation during optimization, which is why the animated WebPs are served from `public/` instead of going through `astro:assets`. Anything static should go the other way: through `<Image>`, not a raw `<img>`.
- **A new page is missing from the sitemap, or a private one is in it.** The three places have to agree: `NOINDEX_ROUTES` in `astro.config.mjs`, the noindex meta on the page, and `public/robots.txt`.

If the symptom matches a tell, confirm it and fix it. If it does not, proceed to Phase 1 and do not force the match.

## Phase 1: Build a feedback loop

**This is the skill.** Everything else is mechanical. With a **tight** pass/fail signal that goes red on _this_ bug, you will find the cause. Without one, no amount of staring at code will save you.

Spend disproportionate effort here. Be aggressive, be creative, refuse to give up.

### Ways to construct one on this stack, in roughly this order

1. **`npm run check`** for anything about types, imports, or content frontmatter. It covers the zod schemas in `src/content.config.ts` as well as the `.astro` and `.ts` files, and the standing bar is 0/0/0, so any output at all is signal.
2. **`npm run build`** for anything that renders. This site is fully static, so the build **is** the render: a bug that only appears in the emitted HTML has no other home. Failures that never show up in `check` show up here.
3. **Assert on the built HTML.** After a build, `grep` inside `dist/client/`. This is the honest DOM loop for a static site and it is the one most bugs here deserve: `grep -c 'object Object' dist/client/index.html`, `grep -o '<title>[^<]*' dist/client/blog/index.html`, diff `dist/client/index.html` against `dist/client/ja/index.html`. Fast, deterministic, unattended.
4. **Serve `dist/client` with any static server** and curl it, when you need real HTTP (headers, redirects, 404 handling) without the dev runtime.
5. **`npm run dev` plus curl**, when the bug is dev-only or you need the unbuilt behaviour. Remember it must be started in a real terminal; if you cannot, that is a reason to prefer rungs 2 to 4, not a reason to give up.
6. **`npm run preview`** (wrangler dev over the real build) when the bug involves the adapter, the Worker, or headers. If it reproduces here but not in a plain static server, that difference **is** the finding.
7. **Import the module directly**: `node -e "import('./src/lib/format.ts')..."` or the same against `src/data/resume.ts` and `src/i18n/ui.ts`. Fastest loop available; use it whenever the bug is really about data, not markup.
8. **`curl -sI https://cristianvaldez.jp/...`** when the bug only reproduces in production. Compare the deployed asset against the one in your local `dist/client/`; a stale deploy looks exactly like a code bug.
9. **Differential loop.** The same component through `/` and `/ja/`, or the takkotaco case study against the bloggydoggy one, then diff the rendered HTML. Two near-identical pages where one works is the cheapest bisect available.
10. **Bisection.** If it appeared between two known-good states, automate the check and `git bisect run` it.

**Playwright is not a dependency here**, though it has been run through `npx` for screenshots. For a DOM-level bug, prefer asserting on the built HTML: this site ships almost no client JS, so the markup in `dist/client/` is very nearly the whole truth.

Build the right feedback loop and the bug is 90% fixed.

### Tighten the loop

Treat the loop as a product. Once you have _a_ loop:

- Faster? Assert on one built file instead of rebuilding and eyeballing. Hit the data module instead of the page.
- Sharper signal? Assert the specific symptom, not "the build succeeded".
- More deterministic? Pin the page, pin the locale, pin the theme.

A 30-second flaky loop is barely better than none. A 2-second deterministic one is a superpower.

### Non-deterministic bugs

The goal is not a clean repro but a **higher reproduction rate**. Loop the trigger 100 times, add stress, narrow the timing window. A 50% flake is debuggable; 1% is not, so keep raising the rate until it is.

### When you genuinely cannot build a loop

Stop and say so. List what you tried. Ask for the environment that reproduces it, a redacted artifact, or permission to add temporary instrumentation. Do **not** proceed to hypothesise without a loop.

### Completion criterion: a tight loop that goes red

Phase 1 is done when you can name **one command** you have **already run at least once** (show the invocation and its output, redacted) that is:

- [ ] **Red-capable**: it drives the actual bug code path and asserts the **user's exact symptom**, so it goes red now and green once fixed. Not "runs without erroring".
- [ ] **Deterministic**: same verdict every run.
- [ ] **Fast**: seconds, not minutes.
- [ ] **Runnable unattended**, without the user clicking anything.

If you catch yourself reading code to build a theory before this command exists, **stop: jumping to a hypothesis is the exact failure this skill prevents.** No red-capable command, no Phase 2.

## Phase 2: Reproduce and minimise

Run the loop. Watch it go red.

Confirm:

- [ ] The failure is the one the **user** described, not a different failure nearby. Wrong bug means wrong fix.
- [ ] It reproduces across multiple runs.
- [ ] You captured the exact symptom, so later phases can verify the fix addresses it.

Then shrink to the **smallest scenario that still goes red**. Cut sections, components, content entries, and props one at a time, re-running after each cut. A throwaway page on `/specimen` with one component on it, still reproducing, is worth more than the whole homepage. Done when removing any remaining element makes it go green.

A minimal repro shrinks the hypothesis space in Phase 3 and becomes the regression check in Phase 5. Do not proceed until you have reproduced **and** minimised.

## Phase 3: Hypothesise

Generate **3 to 5 ranked hypotheses** before testing any of them. Generating one anchors you on the first plausible idea.

Each must be **falsifiable**, stated with its prediction:

> "If X is the cause, then changing Y makes the bug disappear."

If you cannot state the prediction, it is a vibe. Discard or sharpen it.

**Show the ranked list to the user before testing.** He knows what he just changed, and re-ranks instantly. Cheap checkpoint, big time saver. Do not block on it if he is away.

## Phase 4: Instrument

Each probe maps to a specific prediction from Phase 3. **Change one variable at a time.**

- Prefer inspecting state at one point over ten scattered logs.
- On a static site, the highest-value probe is usually a `console.log` in an `.astro` frontmatter fence: it runs during the build and prints straight into the build output, showing you exactly what the page was handed.
- Other useful boundaries: the content collection query, the `lang` prop as it crosses into `BaseLayout`, and the theme script.
- Never log everything and grep.

**Tag every debug log** with a unique prefix, e.g. `[DEBUG-a4f2]`, so cleanup is a single grep. Untagged logs survive; tagged logs die.

**Perf branch.** For slowness, logs are usually wrong. Measure first: Lighthouse against the deployed site, or the network panel. On a content site the usual culprit is images, so check what the build actually emitted into `dist/client/_astro/` before suspecting the code. Fonts are the other one, and they are self-hosted here, so they are yours to fix. Establish a baseline, then bisect. Measure first, fix second.

## Phase 5: Fix, then lock it down

This repo has **no test runner**, so "write the regression test first" does not apply literally. The intent still does: pin the bug down so it cannot come back silently. In descending order of preference:

1. **Make it a type or schema error.** TypeScript is strict here and `npm run check` is held at 0/0/0, so anything the compiler can catch is caught on every run. For content bugs, tighten the zod schema in `src/content.config.ts`: that is the strongest lock available in this repo, and it validates every entry forever.
2. **Make the build fail.** If the bad state is only visible in the emitted HTML, a throwing check in the page's frontmatter turns a silent wrong render into a red build.
3. **Keep the repro script.** If the Phase 1 loop was a node script or a grep worth re-running, save it somewhere durable with a name that says what it checks, and mention it in `.claude/CLAUDE.md`.
4. **Write the tell into `.claude/CLAUDE.md`**: the symptom as observed, then the cause. That file already carries several of these (the `nodejs_compat` render bug, the headless dev server, the session driver), and they are there because no check could catch them. Add yours to Phase 0 above at the same time.

Then: watch the loop go red, apply the fix, watch it go green, and re-run against the original un-minimised scenario.

**If none of the four is possible, that is itself the finding.** Say so. A bug that cannot be pinned down anywhere is telling you something about the code's shape.

## Phase 6: Cleanup

Required before declaring done:

- [ ] Original repro no longer reproduces (re-run the Phase 1 loop)
- [ ] The bug is locked down per Phase 5, or its absence is stated
- [ ] All `[DEBUG-...]` instrumentation removed (grep the prefix)
- [ ] Throwaway pages, scripts, and harnesses deleted
- [ ] `npm run check` is back at 0/0/0 and `npm run build` is clean
- [ ] `git status` shows only files you meant to change
- [ ] The hypothesis that turned out correct is stated plainly, so the next person learns. Version control stays with the owner: say it is a good point to save the work, and let him write the message.
