import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      source: 'blog/**',
      type: 'page',
      schema: z.object({
        date: z.string(),
        category: z.string(),
        readTime: z.string(),
        image: z.string(),
      }),
    }),
  },
})
