import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  if (!config.supabase?.serviceKey) {
    throw createError({ statusCode: 500, message: 'Service key not configured' })
  }

  const supabase = createClient(
    config.public.supabase.url,
    config.supabase.serviceKey,
  )

  // List all auth users via admin API
  const { data: { users }, error } = await supabase.auth.admin.listUsers()

  if (error) {
    throw createError({ statusCode: 500, message: error.message })
  }

  // Get admin_users to cross-reference
  const { data: admins } = await supabase
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
