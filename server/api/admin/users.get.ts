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
    .select('id')
    .eq('auth_id', user.id)
    .single()

  if (!adminUser) {
    throw createError({ statusCode: 403, statusMessage: 'Not an admin' })
  }

  const config = useRuntimeConfig()

  if (!config.supabaseServiceKey) {
    throw createError({ statusCode: 500, message: 'Service key not configured' })
  }

  const serviceSupabase = createClient(
    config.public.supabase.url,
    config.supabaseServiceKey,
  )

  // List all auth users via admin API
  const { data: { users }, error } = await serviceSupabase.auth.admin.listUsers()

  if (error) {
    throw createError({ statusCode: 500, message: error.message })
  }

  // Get admin_users to cross-reference
  const { data: admins } = await serviceSupabase
    .from('admin_users')
    .select('*')

  const adminMap = new Map((admins || []).map(a => [a.auth_id, a]))

  // Merge auth users with admin status
  const merged = (users || []).map(u => {
    const admin = adminMap.get(u.id)
    return {
      id: u.id,
      email: u.email,
      name: u.user_metadata?.full_name || u.user_metadata?.name || null,
      created_at: u.created_at,
      last_sign_in: u.last_sign_in_at,
      is_admin: !!admin,
      admin_id: admin?.id || null,
      admin_role: admin?.role || null,
    }
  })

  return merged
})