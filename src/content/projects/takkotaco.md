---
name: Takko Town English Guide
nameJa: 田子町 英語ガイド
tagline: A full-stack English guide and game platform for a small garlic-farming town in Aomori.
taglineJa: 青森のにんにくの町のための、フルスタックの英語ガイド兼ゲームプラットフォーム。
cardImage: ../../assets/images/takkotaco.png
url: https://takkotaco.com
stack: [Astro, Cloudflare Workers, Durable Objects, D1, WebSockets, Leaflet, TypeScript]
highlights:
  - Real-time multiplayer games, a GIS map of the town, and in-browser face detection.
  - Cloudflare Workers and Durable Objects backend with WebSocket-based, stateful game rooms.
role: Solo designer and developer
timeframe: 2024 - present
featured: true
order: 1
---

## Overview

Takko Town English Guide (takkotaco.com) is an unofficial English website for Takko Machi, a small garlic-farming town in Aomori where I taught English on the JET Programme. The town had almost no English presence online, so I built a place that works as both a real English guide to the town and a sandbox for classroom games my students could actually use.

## What it does

- **English learning:** vocabulary games, letter-writing practice, a real-time multiplayer drawing game, classroom timers, and quiz tools, all built for the proficiency range I was teaching.
- **Town guide:** local shrines, the Takko-ben dialect with a daily dialect word, and live local weather.
- Bilingual throughout, since the audience is Japanese students and their teachers.

## Architecture

The site is built with Astro and deployed as a Cloudflare Worker. Static content is pre-rendered, and the interactive pieces run at the edge:

- **Real-time multiplayer** runs on Cloudflare Durable Objects. Each game room is a single stateful object that holds the room state and coordinates players over WebSockets, which keeps turn order and scoring consistent without standing up a traditional server.
- A small **Worker** proxies live weather and a few other APIs.
- **D1** (SQLite at the edge) backs the feedback widget, and KV handles sessions.
- A token-based design system drives a full light and dark theme, and a shared layout gives every page a baseline SEO setup (sitemap, Open Graph, JSON-LD) for free.

## What I took away

- Durable Objects are the right primitive for small-scale real-time multiplayer: one object per room makes state easy to reason about.
- An edge-first stack (Workers, D1, KV) stays fast and runs at essentially no cost.
- Designing for a bilingual, mixed-proficiency audience forced me to keep the UI text short and the interactions obvious, which made the whole site better.
