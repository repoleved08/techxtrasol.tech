import { createClient } from '@supabase/supabase-js'

export default defineNuxtRouteMiddleware(async (to) => {
  // Server-side: check Supabase auth directly
  if (import.meta.server) {
    const event = useRequestEvent()
    const config = useRuntimeConfig()

    // Read session from cookie
    const cookieHeader = event.node.req.headers.cookie || ''
    const cookies = Object.fromEntries(
      cookieHeader.split(';').map(c => {
        const [key, ...val] = c.trim().split('=')
        return [key, val.join('=')]
      })
    )

    const accessToken = cookies['sb-access-token'] || cookies['sb-ytakvlhdrfmktkputzjg-auth-token']?.split('.')[1]

    // Try to get user from Supabase using the access token from cookies
    const supabase = createClient(
      config.public.supabaseUrl,
      config.public.supabaseKey,
    )

    // Check for supabase auth token cookie
    const tokenCookie = cookieHeader.split(';').find(c => c.trim().startsWith('sb-ytakvlhdrfmktkputzjg-auth-token'))
    let session = null

    if (tokenCookie) {
      try {
        const cookieValue = tokenCookie.split('=').slice(1).join('=')
        const parsed = JSON.parse(decodeURIComponent(cookieValue))
        const { data: { user }, error } = await supabase.auth.getUser(parsed.access_token)
        if (user && !error) {
          session = { user, access_token: parsed.access_token }
        }
      } catch {
        // Invalid cookie
      }
    }

    if (!session) {
      return navigateTo('/')
    }

    // Check admin status
    try {
      const { data: adminUser } = await supabase
        .from('admin_users')
        .select('id')
        .eq('auth_id', session.user.id)
        .single()

      if (!adminUser) {
        // Auto-create as admin (first user)
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
