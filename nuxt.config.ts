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
    "nuxt-gtag",
  ],

  ssr: true,
  gtag: {
    id: 'G-SRF2JEZJBL'
  },

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
    // Prerender static pages for SEO (these won't use Clerk during build)
    "/": { prerender: true },
    "/pricing": { prerender: true },
    "/blog": { prerender: true },
    "/changelog": { prerender: true },
    "/docs/**": { prerender: true },
    "/blog/**": { prerender: true },
    // Auth pages need client-side rendering
    "/login": { ssr: false },
    "/signup": { ssr: false },
  },

  nitro: {
    prerender: {
      failOnError: false,
      // Skip auth routes during prerendering
      ignore: ["/login", "/signup"],
    },
    experimental: {
      wasm: true,
    },
  },

  icon: {
    serverBundle: {
      collections: ["lucide", "simple-icons"],
    },
  },

  runtimeConfig: {
    // Private keys (only available on server-side)
    clerkSecretKey: process.env.NUXT_CLERK_SECRET_KEY || "",
    // Public keys (exposed to client-side)
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || "https://techxtrasol.tech",
      clerkPublishableKey: process.env.NUXT_PUBLIC_CLERK_PUBLISHABLE_KEY || "",
    },
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
