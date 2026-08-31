---
name: prototype
description: Build a throwaway prototype to answer a design question. Use when the user wants to see a few options for how a page, section, or component should look, or to sanity-check whether an interaction's state model feels right before building it.
---

# Prototype

A prototype is **throwaway code that answers a question**. The question decides the shape.

## Pick a branch

Identify which question is being answered, using the user's prompt, the surrounding code, or by asking:

- **"What should this look like?"** -> [UI.md](UI.md). Several radically different variants of a page, section, or component, rendered on one route, switchable from a floating bar.
- **"Does this behaviour feel right?"** -> [LOGIC.md](LOGIC.md). A single self-contained HTML file that pushes a state model (a scroll-spy, a theme and language pair interacting, a filter over the project list) through cases that are hard to reason about on paper.

The two branches produce very different artifacts, so getting this wrong wastes the whole prototype. A page or component question is UI; an interaction or data-shape question is logic. This site is mostly static, so **the UI branch is the usual answer**. If it is genuinely both, do UI first: seeing the screen usually settles half the behaviour questions for free.

## Rules that apply to both

1. **Throwaway from day one, and clearly marked.** Put the prototype next to what it is prototyping for, and name it so a casual reader can see it is not production. **Nothing under `public/`, ever**: everything there is copied verbatim into the deploy.
2. **Trivial to run.** UI variants live on a real route. A logic demo is one HTML file in the scratchpad that opens by double-click.
3. **No persistence.** State lives in memory. No `localStorage` unless persistence is the thing being questioned, and in particular do not touch the saved `theme` key that `ThemeScript.astro` reads before first paint: fake the theme instead.
4. **Skip the polish.** No error handling beyond what makes it runnable, no abstractions, no accessibility pass, and **no Japanese**. Write the English and leave `ui.ts` and `resume[ja]` alone; a prototype is not the place to decide JA wording.
5. **The site's design rules still apply to the variants themselves.** Use the tokens in `src/styles/global.css` rather than raw hex, so dark mode works while you are judging it, and stay inside the three fonts. A variant that reaches for a gradient, a fourth typeface, or a centered "build the future" hero is not exploring the design space, it is exploring a design this site has already rejected. The switcher bar is the one exception: it is deliberately not part of the design under evaluation.
6. **Capture the answer, then delete the rest.** Once a variant or a state model has won, fold it into the real code and remove the losers, the switcher, and any throwaway route in the same pass. Say in one line which option won and why, so the decision survives past the prototype. Prototype code left in `main` rots fast and confuses the next reader.
