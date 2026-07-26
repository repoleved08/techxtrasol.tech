import { verifySupabaseSession } from '~~/server/utils/auth'

export default defineEventHandler(async (event) => {
  const session = await verifySupabaseSession(event)

  if (!session) {
    throw createError({ statusCode: 401, statusMessage: 'Not authenticated' })
  }

  const { user, supabase } = session

  const { data: adminUser } = await supabase
    .from('admin_users')
    .select('*')
    .eq('auth_id', user.id)
    .single()

  if (!adminUser) {
    throw createError({ statusCode: 403, statusMessage: 'Not an admin' })
  }

  return { user: adminUser, isNew: false }
})
