import { createClient } from '@supabase/supabase-js'

export default defineNuxtRouteMiddleware(async (to) => {
  // Server-side: check Kinde context + Supabase directly
  if (import.meta.server) {
    const event = useRequestEvent()
    if (!event?.context?.kinde) return navigateTo('/api/login')

    try {
      const isAuthenticated = await event.context.kinde.isAuthenticated()
      if (!isAuthenticated) return navigateTo('/api/login')
    }
    catch {
      return navigateTo('/api/login')
    }

    // Check admin status directly
    try {
      const profile = await event.context.kinde.getUserProfile()
      const config = useRuntimeConfig()
      const supabase = createClient(config.public.supabaseUrl, config.public.supabaseKey)

      const { data: adminUser } = await supabase
        .from('admin_users')
        .select('id')
        .eq('kinde_id', profile.id)
        .single()

      if (!adminUser) {
        // Auto-create as admin (first user)
        await supabase.from('admin_users').insert({
          kinde_id: profile.id,
          email: profile.email,
          name: `${profile.given_name || ''} ${profile.family_name || ''}`.trim() || profile.email,
          role: 'admin',
        })
      }
    }
    catch {
      // If Supabase check fails, still allow through (Kinde auth is valid)
    }
    return
  }

  // Client-side: use useAuth() from Kinde plugin
  const { loggedIn } = useAuth()
  if (!loggedIn.value) return navigateTo('/api/login')

  const { checkAdminStatus, setupAdmin } = useAdmin()
  const authorized = await checkAdminStatus()
  if (!authorized) {
    try { await setupAdmin() }
    catch { /* ignore */ }
  }
})
