---
name: Bloggy Doggy
nameJa: Bloggy Doggy
tagline: A personal blog with trilingual reading modes, custom interactive features, and no frontend framework.
taglineJa: フレームワークを使わずに構築した、独自APIと多言語対応のエッジファーストな個人ブログ。
cardImage: ../../assets/images/bloggydoggy.png
url: https://bloggydoggy.com
stack: [Astro, Cloudflare Workers, D1, Web Components, TypeScript]
highlights:
  - Custom REST API on Cloudflare Workers and D1 powering likes and quiz features.
  - Trilingual reading modes (English, Simple English, Japanese) controlled by the reader, not the URL.
role: Solo designer and developer
timeframe: 2024 - present
featured: true
order: 2
---

## Overview

Bloggy Doggy started as a place to post photography and write about what I'm doing, and it has turned into something I add to steadily. It is also a testing ground: a place to build interactive features I do not have a specific reason to build elsewhere, and to figure out what actually makes a reading experience good.

<figure aria-label="Bloggy Doggy screenshot placeholder" style="background:var(--color-surface-2);border:1px solid var(--color-border);border-radius:var(--radius-md);aspect-ratio:16/9;display:flex;align-items:center;justify-content:center;color:var(--color-text-muted);font-family:var(--font-mono);font-size:var(--text-sm);margin-block:var(--space-5);">screenshot coming soon</figure>

## What it does

Photography-led posts with a clean reading experience, plus a handful of interactive features I built from scratch because I wanted them to work a specific way.

**Trilingual reading modes.** The same post is readable in full English, Simple English, and Japanese. A toggle in the navbar lets the reader pick whichever mode works for them. This was more useful than translating entire separate pages, since my actual readers are a mix of native speakers, learners, and Japanese friends. The mode you pick sticks while you read.

**Custom gallery components.** Some posts end with a photo gallery. I wanted it to look a specific way and no generic solution did it, so I built the component myself.

**Quiz component.** Small quizzes backed by my own Cloudflare Workers and D1 API. The whole thing runs on the free tier.

**Likes.** Also backed by my own API rather than a plugin. Nothing complicated, but it does what I want.

## Architecture

- **Astro**, deployed as a Cloudflare Worker.
- A custom **REST API on Cloudflare Workers with D1** handles likes and quiz data. Owning the API meant these features behave exactly the way I designed them rather than whatever a plugin author decided.
- Interactivity is built with native **Web Components**, no framework. Each interactive piece is a custom element, which keeps the JavaScript footprint small and the markup easy to reason about.
- The i18n system swaps content across three language modes from a single source file, without creating separate pages or routes.

## What I took away

SVG animation is worth actually learning. I used it for [an illustration of my favorite mug](https://bloggydoggy.com) on one of the posts, and it opened up a whole category of things I would have done with images or video before. The result is smaller, scalable, and more interesting.

Image optimization was a recurring problem. At various points I was double-optimizing images without realizing it, or skipping it entirely and wondering why pages felt slow. Getting the pipeline right is not glamorous but it actually matters.

There is a constant tension between adding a feature and overloading the page. I added things I thought were fun that turned out to clutter the reading experience, and I pulled back things that mattered more than I expected. The blog is better for having gone through that a few times.
