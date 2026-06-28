---
name: Bloggy Doggy
nameJa: Bloggy Doggy
tagline: An edge-first personal blog with a custom API and trilingual content, built without a frontend framework.
taglineJa: フレームワークを使わずに構築した、独自APIと多言語対応のエッジファーストな個人ブログ。
cardImage: ../../assets/images/bloggydoggy.png
url: https://bloggydoggy.com
stack: [Astro, Cloudflare Workers, D1, Web Components, TypeScript]
highlights:
  - Custom REST API on Cloudflare Workers and D1 powering likes and quiz features.
  - Framework-free Web Components and an i18n system spanning English, Simple English, and Japanese.
role: Solo designer and developer
timeframe: 2024 - present
featured: true
order: 2
---

## Overview

Bloggy Doggy (bloggydoggy.com) is an edge-first personal blog. It started as a place to post photography and write, and it turned into a testing ground for adding interactive features without reaching for a frontend framework.

## What it does

- Photography-led posts with a clean, fast reading experience.
- A likes feature and small quizzes, backed by my own API rather than a third-party plugin.
- **Trilingual content:** English, Simple English, and Japanese, so the same post is readable for native speakers, learners, and Japanese readers.

## Architecture

- **Astro**, deployed as a Cloudflare Worker.
- A custom **REST API on Cloudflare Workers with D1** stores likes and quiz data. Owning the API end to end made those features easy to shape exactly how I wanted.
- Interactivity is built with native **Web Components**, no framework. Each interactive island is a custom element, which keeps the JavaScript footprint small and the markup portable.
- An **i18n system** swaps content across the three language modes from a single source.

## What I took away

- You can get a long way with platform primitives: Web Components for interactivity, D1 for storage, and Workers for the API.
- Writing for Simple English alongside full English pushed me to make the copy clearer everywhere.
- Running my own API instead of a plugin meant the likes and quiz features behaved exactly the way I designed them.
