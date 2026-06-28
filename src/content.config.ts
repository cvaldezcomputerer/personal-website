import { defineCollection } from 'astro:content';
import { z } from 'zod';
import { glob } from 'astro/loaders';

// Project case studies. Frontmatter feeds both the homepage cards and the
// /projects/[id] case-study page; the markdown body is the deep dive.
const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      tagline: z.string(),
      // Japanese card text (homepage cards are bilingual). The case-study body
      // stays English for now; these only feed the /ja homepage card.
      nameJa: z.string().optional(),
      taglineJa: z.string().optional(),
      url: z.url().optional(),
      repo: z.url().optional(),
      stack: z.array(z.string()),
      highlights: z.array(z.string()),
      role: z.string().optional(),
      timeframe: z.string().optional(),
      featured: z.boolean().default(false),
      order: z.number().default(99),
      heroImage: image().optional(),
      // Screenshot shown on the homepage project card.
      cardImage: image().optional(),
    }),
});

// Technical blog posts.
const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      tags: z.array(z.string()).default([]),
      draft: z.boolean().default(false),
      heroImage: image().optional(),
    }),
});

export const collections = { projects, blog };
