/// <reference types="astro/client" />

// Cloudflare bindings + secrets are accessed at runtime via
//   import { env } from 'cloudflare:workers'
// None are wired up yet. When you add one, declare it on the Env interface
// below, and wire the real binding in wrangler.jsonc (D1/KV/etc.) or in the
// Cloudflare project settings (secrets, never in the repo).
//
// IMPORTANT: type bindings BY HAND here. Do NOT commit wrangler's generated
// `worker-configuration.d.ts`, and do NOT add a global
//   /// <reference types="@cloudflare/workers-types" />
// Both redeclare the entire workerd runtime as globals (fetch, Response,
// Request, WebSocket, ...), which swaps out the standard DOM type lib and
// silently breaks browser-side scripts across the site. Pull any binding type
// via an inline import(...) type instead, e.g.
//   MY_DB: import('@cloudflare/workers-types').D1Database;
interface Env {}

declare module 'cloudflare:workers' {
  export const env: Env;
}
