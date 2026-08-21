---
name: grilling
description: Grill the user relentlessly about a plan, decision, or idea until every branch is resolved. Use before building any new page, section, component, or case study, when the user wants to stress-test their thinking, or on any 'grill' trigger phrase.
---

Interview the user relentlessly until you reach a shared understanding. Map this as a **design tree**: every decision branches into the decisions that hang off it.

Work the tree in **rounds**. The **frontier** is every decision whose prerequisites are already settled: the questions you can ask _now_ without guessing at answers you haven't heard yet. Ask the whole frontier in one round: number each question and give your recommended answer. Then wait for the user's answers before the next round.

Each question should be formatted like so:

```
❓ **Q1** - **<question title>**: <question body, might be multiple paragraphs, including multiple choices>

➡️ <your recommended answer>
```

Each round the user answers reshapes the tree: settled decisions push the frontier outward and unblock questions that depended on them. Recompute the frontier and ask the next round. A question whose answer depends on another question still open in this round belongs to a _later_ round, not this one.

Finding _facts_ is your job, never the user's. When a frontier question needs a fact from the environment (does this token already exist, what does `resume.ts` already say about that job, which pages are already noindexed), go look it up. Don't block on it: a running lookup is an unsettled prerequisite, so only the questions downstream of it wait; ask the rest of the frontier now. The _decisions_ are the user's: put each to them and wait.

The session is done when the frontier is empty: every branch of the design tree visited, nothing left silently assumed. Do not act on it until the user confirms you have reached a shared understanding.

## In this repo

**Visual and style questions go through `AskUserQuestion` with previews**, not through the text format above. A round can mix the two: put the layout/look questions in an `AskUserQuestion` call with ASCII or code previews per option, and keep the rest as numbered text questions. When the answer is "show me what these look like as real pages", that is no longer a question, it is the `prototype` skill.

This is a **credibility site**, not a playground: a resume up front for people deciding whether to hire Cristian, with case studies and technical writing underneath. Every question here is downstream of that, and of the one standing constraint in `.claude/CLAUDE.md`: it must not look AI-generated.

**Questions worth asking on almost anything new here**, so they never get silently assumed:

- Who is it for: a recruiter skimming for thirty seconds, or someone already interested and reading deeply? Those two want opposite things from the same section.
- Which AI-slop tells does the proposed shape flirt with? Name them out loud. A centered hero, a badge over the H1, a row of identical icon-cards, a "1 2 3" step strip, and a fake stat banner are all things this site has already decided against. If the idea is one of them, that is a question, not a detail.
- Does it need Japanese? JA currently covers the homepage and chrome only (`src/i18n/ui.ts`, `resume[lang]`); blog posts and full case-study bodies are English. Adding JA to an inner page is a scope decision with a maintenance tail.
- Where does the content actually live: `src/data/resume.ts`, `src/i18n/ui.ts`, a `src/content/projects/*.md` frontmatter block, a blog post, or hardcoded in a component? Getting this wrong is the most common rework here.
- Does it reuse the existing layout primitive, or introduce a new one? The design rules say pick one and repeat it, so a new primitive needs a reason.
- Is it a new route? Then it needs its own title and description, and either a place in the sitemap or noindex in all three places (`NOINDEX_ROUTES`, the meta tag, `robots.txt`).
- Does it stay static? Anything needing a request at runtime moves the adapter's output from `dist/client/` to `dist/server/` and changes the deploy config path. Worth knowing before, not after.
- Does it need a real asset (screenshot, photo, diagram)? Real assets only, and screenshots need the owner's say-so first.
