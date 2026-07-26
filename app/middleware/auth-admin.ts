import { verifySupabaseSession } from '~~/server/utils/auth'
import { createClient } from '@supabase/supabase-js'

export default defineNuxtRouteMiddleware(async (to) => {
  // Server-side: check Supabase session cookie
  if (import.meta.server) {
    const event = useRequestEvent()
    if (!event) return navigateTo('/')

    const session = await verifySupabaseSession(event)

    if (!session) {
      return navigateTo('/')
    }

    // Check admin status, auto-create if first user
    try {
      const config = useRuntimeConfig()
      const supabase = createClient(config.public.supabaseUrl, config.public.supabaseKey)

      const { data: adminUser } = await supabase
        .from('admin_users')
        .select('id')
        .eq('auth_id', session.user.id)
        .single()

      if (!adminUser) {
        await supabase.from('admin_users').insert({
          auth_id: session.user.id,
          email: session.user.email || '',
          name: session.user.user_metadata?.full_name || session.user.email || '',
          role: 'admin',
        })
      }
    }
    catch {
      // If Supabase check fails, still allow through (auth is valid)
    }
    return
  }

  // Client-side: use useSupabaseUser() from Supabase module
  const user = useSupabaseUser()
  if (!user.value) return navigateTo('/')

  const { checkAdminStatus, setupAdmin } = useAdmin()
  const authorized = await checkAdminStatus()
  if (!authorized) {
    try { await setupAdmin() }
    catch { /* ignore */ }
  }
})
