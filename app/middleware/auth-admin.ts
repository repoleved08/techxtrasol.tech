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

    // Check admin status
    try {
      const config = useRuntimeConfig()
      const supabase = createClient(config.public.supabase.url, config.public.supabase.key)

      const { data: adminUser } = await supabase
        .from('admin_users')
        .select('id')
        .eq('auth_id', session.user.id)
        .single()

      if (!adminUser) {
        return navigateTo('/')
      }
    }
    catch {
      return navigateTo('/')
    }
    return
  }

  // Client-side: use useSupabaseUser() from Supabase module
  const user = useSupabaseUser()
  if (!user.value) return navigateTo('/')

  const { checkAdminStatus } = useAdmin()
  const authorized = await checkAdminStatus()
  if (!authorized) {
    return navigateTo('/')
  }
})
