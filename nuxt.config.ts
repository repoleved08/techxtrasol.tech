// https://nuxt.com/docs/api/configuration/nuxt-config
import { dark } from "@clerk/themes";
export default defineNuxtConfig({
  modules: [
    "@nuxt/eslint",
    "@nuxt/image",
    "@nuxt/ui",
    "@nuxt/content",
    "@vueuse/nuxt",
    "nuxt-og-image",
    "@clerk/nuxt",
  ],
  clerk: {
    appearance: {
      theme: dark,
    },
    middleware: {
      exclude: [
        '/__nuxt_content/**',
        '/__nuxt_error',
        '/api/**',
      ]
    }
  },

  devtools: {
    enabled: true,
  },

  css: ["~/assets/css/main.css"],

  routeRules: {
    "/docs": { redirect: "/docs/getting-started", prerender: false },
    "/login": { prerender: false },
    "/signup": { prerender: false },
    "/__nuxt_content/**": { prerender: false },
    "/__nuxt_error": { prerender: false },
  },

  compatibilityDate: "2024-07-11",

  nitro: {
    prerender: {
      routes: ["/"],
      crawlLinks: false,
    },
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: "never",
        braceStyle: "1tbs",
      },
    },
  },
});
