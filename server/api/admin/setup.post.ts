import { verifySupabaseSession } from '~~/server/utils/auth'

export default defineEventHandler(async (event) => {
  const session = await verifySupabaseSession(event)

  if (!session) {
    throw createError({ statusCode: 401, statusMessage: 'Not authenticated' })
  }

  const { user, supabase } = session

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
