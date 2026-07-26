import { verifySupabaseSession } from '~~/server/utils/auth'

export default defineEventHandler(async (event) => {
  const session = await verifySupabaseSession(event)

  if (!session) {
    return { isAdmin: false, user: null }
  }

  const { user, supabase } = session

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
})
