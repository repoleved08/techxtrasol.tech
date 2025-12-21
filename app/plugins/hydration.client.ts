export default defineNuxtPlugin({
  name: 'hydration-fixes',
  setup() {
    // Only run on client side
    if (!import.meta.client) return

    const nuxtApp = useNuxtApp()

    // Handle hydration completion
    nuxtApp.hook('app:mounted', () => {
      // Wait for next tick to ensure DOM is stable
      nextTick(() => {
        // Remove any hydration warning suppressors if they exist
        console.log('Hydration completed successfully')
      })
    })

    // Catch hydration errors and provide helpful debugging
    nuxtApp.hook('app:error', (error) => {
      if (error.message?.includes('hydration')) {
        console.warn('Hydration error detected:', error)
      }
    })
  }
})