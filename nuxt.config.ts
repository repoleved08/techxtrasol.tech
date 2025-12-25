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
  
  ssr: true,
  
  clerk: {
    appearance: {
      theme: dark,
    },
  },

  devtools: {
    enabled: true,
  },

  css: ["~/assets/css/main.css"],

  routeRules: {
    "/docs": { redirect: "/docs/getting-started" },
    // Prerender static pages for SEO - these won't need Clerk on server
    "/": { prerender: true },
    "/pricing": { prerender: true },
    "/blog": { prerender: true },
    "/changelog": { prerender: true },
    // Docs pages should be prerendered for SEO
    "/docs/**": { prerender: true },
    // Blog posts should be prerendered
    "/blog/**": { prerender: true },
    // Auth pages need client-side rendering
    "/login": { ssr: false },
    "/signup": { ssr: false },
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
    // Private keys (only available on server-side)
    clerkSecretKey: process.env.NUXT_CLERK_SECRET_KEY || '',
    // Public keys (exposed to client-side)
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://techxtrasol.tech',
      clerkPublishableKey: process.env.NUXT_PUBLIC_CLERK_PUBLISHABLE_KEY || '',
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
