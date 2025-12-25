// https://nuxt.com/docs/api/configuration/nuxt-config
// import { dark } from "@clerk/themes";
export default defineNuxtConfig({
  modules: [
    "@nuxt/eslint",
    "@nuxt/image", 
    "@nuxt/ui",
    "@nuxt/content",
    "@vueuse/nuxt",
    "nuxt-og-image",
    // "@clerk/nuxt", // Temporarily disabled for deployment
  ],
  
  ssr: true,
  
  // clerk: {
  //   appearance: {
  //     theme: dark,
  //   },
  // },

  devtools: {
    enabled: true,
  },

  css: ["~/assets/css/main.css"],

  routeRules: {
    "/docs": { redirect: "/docs/getting-started" },
    // Prerender static pages for SEO
    "/": { prerender: true },
    "/pricing": { prerender: true },
    "/blog": { prerender: true },
    "/changelog": { prerender: true },
    // Docs pages should be prerendered for SEO
    "/docs/**": { prerender: true },
    // Blog posts should be prerendered
    "/blog/**": { prerender: true },
    // Auth pages - will add back when needed
    // "/login": { ssr: false },
    // "/signup": { ssr: false },
  },

  nitro: {
    prerender: {
      failOnError: false,
    },
    experimental: {
      wasm: true,
    },
  },

  icon: {
    serverBundle: {
      collections: ['lucide', 'simple-icons']
    }
  },

  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://techxtrasol.tech',
    }
  },

  compatibilityDate: "2024-07-11",

  eslint: {
    config: {
      stylistic: {
        commaDangle: "never",
        braceStyle: "1tbs",
      },
    },
  },
});
