import { verifySupabaseSession } from '~~/server/utils/auth'

export default defineNuxtRouteMiddleware(async (to) => {
  // Server-side: check Supabase session cookie
  if (import.meta.server) {
    const event = useRequestEvent()
    if (!event) return navigateTo('/')

    const session = await verifySupabaseSession(event)

    if (!session) {
      return navigateTo('/')
    }

    // Check admin status using the authenticated client
    try {
      const { data: adminUser } = await session.supabase
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
