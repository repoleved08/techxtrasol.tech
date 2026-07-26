import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const supabase = createClient(
    config.public.supabaseUrl,
    config.public.supabaseKey,
  )

  // Get user from Supabase session cookie
  const cookieHeader = event.node.req.headers.cookie || ''
  const tokenCookie = cookieHeader.split(';').find(c => c.trim().startsWith('sb-ytakvlhdrfmktkputzjg-auth-token'))

  if (!tokenCookie) {
    return { isAdmin: false, user: null }
  }

  try {
    const cookieValue = tokenCookie.split('=').slice(1).join('=')
    const parsed = JSON.parse(decodeURIComponent(cookieValue))
    const { data: { user }, error } = await supabase.auth.getUser(parsed.access_token)

    if (error || !user) {
      return { isAdmin: false, user: null }
    }

    const { data: adminUser } = await supabase
      .from('admin_users')
      .select('*')
      .eq('auth_id', user.id)
      .single()

    return {
      isAdmin: !!adminUser,
      user: adminUser || null,
      profile: {
        id: user.id,
        email: user.email,
        full_name: user.user_metadata?.full_name,
      },
    }
  }
  catch {
    return { isAdmin: false, user: null }
  }
})
