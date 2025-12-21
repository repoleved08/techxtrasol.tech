export default defineAppConfig({
  ui: {
    colors: {
      primary: 'green',
      neutral: 'slate'
    }
  },
  // Add app-level constants that need to be consistent across SSR/client
  app: {
    name: 'Nuxt Starter Template',
    version: '1.0.0'
  }
})
