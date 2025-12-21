// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  modules: [
    '@nuxt/eslint',
    '@nuxt/ui'
  ],

  experimental: {
    payloadExtraction: false,
    viewTransition: false
  },

  nitro: {
    preset: 'github-pages',
    storage: {
      redis: {
        driver: 'memory'
      }
    },
    compressPublicAssets: true
  },

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1'
    }
  },

  ssr: true,

  components: {
    global: true,
    dirs: ['~/components']
  },

  css: ['~/assets/css/main.css'],

  routeRules: {
    '/': { prerender: true }
  },

  // Suppress hydration mismatches in development
  debug: false,

  devtools: {
    enabled: false
  },

  compatibilityDate: '2025-01-15',

  vue: {
    compilerOptions: {
      isCustomElement: () => false
    }
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})

