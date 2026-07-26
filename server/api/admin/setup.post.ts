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
    throw createError({ statusCode: 401, statusMessage: 'Not authenticated' })
  }

  const cookieValue = tokenCookie.split('=').slice(1).join('=')
  const parsed = JSON.parse(decodeURIComponent(cookieValue))
  const { data: { user }, error: authError } = await supabase.auth.getUser(parsed.access_token)

  if (authError || !user) {
    throw createError({ statusCode: 401, statusMessage: 'Not authenticated' })
  }

  // Check if user already exists
  const { data: existing } = await supabase
    .from('admin_users')
    .select('*')
    .eq('auth_id', user.id)
    .single()

  if (existing) {
    return { user: existing, isNew: false }
  }

  // Create new admin user
  const { data: newUser, error } = await supabase
    .from('admin_users')
    .insert({
      auth_id: user.id,
      email: user.email || '',
      name: user.user_metadata?.full_name || user.email || '',
      role: 'admin',
    })
    .select()
    .single()

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message })
  }

  return { user: newUser, isNew: true }
})
