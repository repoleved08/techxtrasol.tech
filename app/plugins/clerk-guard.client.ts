export default defineNuxtPlugin(() => {
  // This plugin only runs on client-side to prevent SSR issues
  const config = useRuntimeConfig()
  
  // Only initialize Clerk if we have the required keys
  if (!config.public.clerkPublishableKey) {
    console.warn('Clerk publishable key not found - authentication features will be disabled')
  }
})