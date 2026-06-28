// @ts-check
import { defineConfig, sessionDrivers } from 'astro/config';
import { fileURLToPath } from 'node:url';

import cloudflare from '@astrojs/cloudflare';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// Pages that stay reachable by URL but must NOT appear in the sitemap (they
// also carry a noindex meta via the layout). Keep in sync with public/robots.txt.
const NOINDEX_ROUTES = ['/specimen'];

// https://astro.build/config
export default defineConfig({
  site: 'https://cristianvaldez.jp',
  // English at the root (/), Japanese under /ja. The default locale is not
  // prefixed, so existing URLs are unchanged; only /ja is added.
  i18n: {
    locales: ['en', 'ja'],
    defaultLocale: 'en',
    routing: { prefixDefaultLocale: false },
  },
  // This is a static resume + blog: nothing uses Astro.session. The Cloudflare
  // adapter otherwise auto-enables KV-backed sessions and would require a
  // `SESSION` KV namespace binding at deploy. The null driver (pure JS, fine on
  // workerd) disables session storage and drops that binding, so no KV
  // namespace is needed. Swap in a real driver here if sessions are ever used.
  session: { driver: sessionDrivers.null() },
  adapter: cloudflare({
    // Optimize images at build time with sharp; serve any on-demand images
    // as-is so we don't need the paid Cloudflare Images binding. Matches the
    // sister sites (takkotaco / takko-blog).
    imageService: { build: 'compile', runtime: 'passthrough' },
  }),
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => {
        const path = new URL(page).pathname.replace(/\/+$/, '') || '/';
        return !NOINDEX_ROUTES.includes(path);
      },
    }),
  ],
  vite: {
    resolve: {
      // "~/..." -> "src/...". Use for cross-folder imports instead of long
      // relative paths.
      alias: { '~': fileURLToPath(new URL('./src', import.meta.url)) },
    },
  },
});
