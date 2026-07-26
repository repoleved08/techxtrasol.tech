import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)

  const { auth_id, action } = body || {}

  if (!auth_id || !action) {
    throw createError({ statusCode: 400, message: 'auth_id and action are required' })
  }

  const supabase = createClient(
    config.public.supabase.url,
    config.supabase.serviceKey,
  )

  if (action === 'make_admin') {
    // Get user info from auth
    const { data: { user }, error: userError } = await supabase.auth.admin.getUserById(auth_id)
    if (userError || !user) {
      throw createError({ statusCode: 404, message: 'User not found' })
    }

    // Insert into admin_users
    const { error } = await supabase
      .from('admin_users')
      .insert({
        auth_id: auth_id,
        email: user.email,
        name: user.user_metadata?.full_name || user.user_metadata?.name || null,
        role: 'admin',
      })

    if (error) {
      if (error.code === '23505') {
        throw createError({ statusCode: 409, message: 'User is already an admin' })
      }
      throw createError({ statusCode: 500, message: error.message })
    }

    return { success: true, message: 'User promoted to admin' }
  }

  if (action === 'remove_admin') {
    const { error } = await supabase
      .from('admin_users')
      .delete()
      .eq('auth_id', auth_id)

    if (error) throw createError({ statusCode: 500, message: error.message })

    return { success: true, message: 'Admin access removed' }
  }

  throw createError({ statusCode: 400, message: 'Invalid action' })
})
