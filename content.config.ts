import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: 'page',
      source: '10.blog/**/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        category: z.string(),
        tags: z.array(z.string()),
        createdAt: z.date(),
        updatedAt: z.date(),
        thumbnail: z.string().optional(),
        noindex: z.boolean().default(false),
        draft: z.boolean().default(false),
      })
    }),
    news: defineCollection({
      type: 'page',
      source: '100.news/**/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        category: z.string(),
        tags: z.array(z.string()),
        createdAt: z.date(),
        updatedAt: z.date(),
        thumbnail: z.string().optional(),
        draft: z.boolean().default(false),
        noindex: z.boolean().default(false),
      })
    }),
    docs: defineCollection({
      type: 'page',
      source: '0.docs/**/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        category: z.string(),
        createdAt: z.date(),
        updatedAt: z.date(),
        draft: z.boolean().default(false),
      })
    }),
    pages: defineCollection({
      type: 'page',
      source: '*.md',
      schema: z.object({
        title: z.string().optional(),
        description: z.string().optional(),
      })
    })
  }
})
