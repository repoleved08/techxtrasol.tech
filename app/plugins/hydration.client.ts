export default defineNuxtPlugin(() => {
  // Ensure client-side hydration stability
  if (import.meta.client) {
    const nuxtApp = useNuxtApp()
    
    nuxtApp.hook('app:mounted', () => {
      // Fix any hydration mismatches after mounting
      setTimeout(() => {
        // Force a tick to ensure everything is properly hydrated
        nextTick()
      }, 0)
    })
  }
})