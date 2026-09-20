import { createClient } from '@supabase/supabase-js'
import { verifySupabaseSession } from '~~/server/utils/auth'

export default defineEventHandler(async (event) => {
  const session = await verifySupabaseSession(event)

  if (!session) {
    throw createError({ statusCode: 401, statusMessage: 'Not authenticated' })
  }

  const { user, supabase } = session

  const { data: adminUser } = await supabase
    .from('admin_users')
    .select('id, role')
    .eq('auth_id', user.id)
    .single()

  if (!adminUser) {
    throw createError({ statusCode: 403, statusMessage: 'Not an admin' })
  }

  const config = useRuntimeConfig()
  const body = await readBody(event)

  const { auth_id, action } = body || {}

  if (!auth_id || !action) {
    throw createError({ statusCode: 400, message: 'auth_id and action are required' })
  }

  if (action === 'remove_admin' && auth_id === user.id) {
    throw createError({ statusCode: 400, message: 'You cannot remove your own admin access' })
  }

  if (!config.supabaseServiceKey) {
    throw createError({ statusCode: 500, message: 'Service key not configured' })
  }

  const serviceSupabase = createClient(
    config.public.supabase.url,
    config.supabaseServiceKey,
  )

  if (action === 'make_admin') {
    // Get user info from auth
    const { data: { user: targetUser }, error: userError } = await serviceSupabase.auth.admin.getUserById(auth_id)
    if (userError || !targetUser) {
      throw createError({ statusCode: 404, message: 'User not found' })
    }

    // Insert into admin_users
    const { error } = await serviceSupabase
      .from('admin_users')
      .insert({
        auth_id: auth_id,
        email: targetUser.email,
        name: targetUser.user_metadata?.full_name || targetUser.user_metadata?.name || null,
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
    const { error } = await serviceSupabase
      .from('admin_users')
      .delete()
      .eq('auth_id', auth_id)

    if (error) throw createError({ statusCode: 500, message: error.message })

    return { success: true, message: 'Admin access removed' }
  }

  throw createError({ statusCode: 400, message: 'Invalid action' })
})