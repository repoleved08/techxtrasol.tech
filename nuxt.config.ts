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
  
  sourcemap: {
    server: false,
    client: false
  },

  nitro: {
    preset: 'github-pages',
    storage: {
      redis: {
        driver: 'memory'
      }
    },
    compressPublicAssets: true,
    minify: false
  },

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1'
    }
  },

  ssr: true,
  
  build: {
    transpile: ['@nuxt/ui']
  },

  components: {
    global: true,
    dirs: ['~/components']
  },

  css: ['~/assets/css/main.css'],

  routeRules: {
    '/': { prerender: true, headers: { 'cache-control': 's-maxage=3600' } }
  },

  devtools: {
    enabled: false
  },

  compatibilityDate: '2025-01-15',
  
  vite: {
    vue: {
      template: {
        compilerOptions: {
          isCustomElement: (tag) => false
        }
      }
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

