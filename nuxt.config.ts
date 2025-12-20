// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  modules: [
    '@nuxt/eslint',
    '@nuxt/ui'
  ],

  nitro: {
    preset: 'github-pages'
  },

  experimental: {
    payloadExtraction: false
  },

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1'
    }
  },

  ssr: true,

  css: ['~/assets/css/main.css'],

  routeRules: {
    '/': { prerender: true }
  },

  devtools: {
    enabled: false
  },

  compatibilityDate: '2025-01-15',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})

