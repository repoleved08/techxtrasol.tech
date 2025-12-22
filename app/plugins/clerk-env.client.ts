export default defineNuxtPlugin(() => {
  // Only run Clerk on client side to avoid SSR issues
  if (process.server) return

  // Clerk will be initialized on the client side where env vars are available
})