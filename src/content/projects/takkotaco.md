---
name: Takko Town English Guide
nameJa: 田子町 英語ガイド
tagline: A full-stack English guide and classroom game platform I built for the town where I teach.
taglineJa: 青森のにんにくの町のための、フルスタックの英語ガイド兼ゲームプラットフォーム。
cardImage: ../../assets/images/takkotaco.png
url: https://takkotaco.com
stack: [Astro, Cloudflare Workers, Durable Objects, D1, KV, WebSockets, Leaflet, TypeScript]
highlights:
  - Real-time multiplayer games and classroom tools used by real students on slow Chromebooks.
  - Edge-first stack (Workers, Durable Objects, D1) with stateful WebSocket game rooms, running on the free tier.
role: Solo designer and developer
timeframe: 2024 - present
featured: true
order: 1
---

## Overview

Takko Town English Guide started because my town had almost no English presence online. Search for "Takko-machi English" and the first result was a page that looked like it had been run through Google Translate and never touched again. I wanted something that worked as a real English guide to where I live, and that could also double as a classroom platform my students could actually use day-to-day.

It has grown into a pretty broad project: a bilingual town guide, classroom games and tools, a page dedicated to preserving the local dialect (Takko-ben), a map of the area's shrines, and a shared vocabulary database that ties it all together.

<figure aria-label="Takko Town English Guide screenshot placeholder" style="background:var(--color-surface-2);border:1px solid var(--color-border);border-radius:var(--radius-md);aspect-ratio:16/9;display:flex;align-items:center;justify-content:center;color:var(--color-text-muted);font-family:var(--font-mono);font-size:var(--text-sm);margin-block:var(--space-5);">screenshot coming soon</figure>

## Architecture

The stack is Astro deployed as a Cloudflare Worker. The priorities from the start were: lightweight enough for school Chromebooks and slow rural internet, and cheap enough to run indefinitely without paying for a server.

- **Real-time game rooms** run on Cloudflare Durable Objects. Each room is a single stateful object that holds game state and coordinates players over WebSockets, which keeps turn order and scoring consistent without any traditional server infrastructure.
- A **Cloudflare Worker** handles the API layer: live weather, leaderboards, a "where are you from?" tracker I use at the start of class, and a feedback widget that pipes student messages directly to a Discord channel.
- **D1** (SQLite at the edge) backs leaderboards and feedback. **KV** handles sessions.
- A central **vocabulary database** is the backbone of the interactive side. Every game and tool that involves vocabulary pulls from the same source, so adding a new word means it shows up everywhere automatically.

The whole stack runs on Cloudflare's free tier. I have not needed to pay for any of it.

## Favorite parts

**Train timer.** Train timers exist, but I built mine to behave exactly the way I want for classroom use. Small things matter when you are using it every lesson.

**Vocab sheet maker.** Generates printable vocabulary sheets from the database. My workflow for adding a new word is quick enough that I do it on a whim, and it feeds everything else on the site automatically.

**SVG letter system.** A custom system for displaying stylized letters used across the games. I learned more about SVG building this than I expected.

**Takko-ben page.** A daily word from the local dialect. The dialect is fading with the older generation and I wanted some kind of record of it, written by someone who actually lives here rather than scraped from a database.

**Shrines page.** A Leaflet map of the area's shrines, written in real English. Not a translation, just described from scratch.

**Feedback to Discord.** A feedback widget on the games that posts student messages to a Discord channel. I added it mostly as an experiment and it turned out to be genuinely useful. Students actually use it.

<figure aria-label="Classroom games screenshot placeholder" style="background:var(--color-surface-2);border:1px solid var(--color-border);border-radius:var(--radius-md);aspect-ratio:16/9;display:flex;align-items:center;justify-content:center;color:var(--color-text-muted);font-family:var(--font-mono);font-size:var(--text-sm);margin-block:var(--space-5);">games screenshot coming soon</figure>

## What I took away

Designing games that are actually usable in a classroom is harder than it sounds. Students are on slow Chromebooks, the wifi is unreliable, and you have three minutes to explain the rules before the lesson moves on. Simpler is almost always better, and you find out fast what actually works.

The free tier of Cloudflare covers everything here. Workers, Durable Objects, D1, KV: none of it costs anything at this scale. I came in thinking I would eventually need to pay for a real server and I still have not.

SVG and SVG animations are more powerful than I gave them credit for. I used them for game elements, UI components, and things I would have reached for images or canvas for before. They also scale perfectly on any screen, which matters on a classroom projector.

Google's TTS and the Web Audio API let me add voice reading and custom sound generation, including some sounds that ended up resembling Mii voices more than I planned. Free, no external service needed.

The centralized vocabulary database was the best architectural call I made. Keeping everything in one place means new features are fast to build and the content stays consistent across the whole site.

Optimizing for slow computers and slow internet is not a constraint I would have imposed on myself otherwise, but it made the whole site meaningfully better. Performance became something I actually cared about.
