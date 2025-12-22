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
  
  ssr: false,
  
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
