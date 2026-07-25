import { getKindeClient } from '@nuxtjs/kinde/server'
import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const kinde = getKindeClient()
  const isAuthenticated = await kinde.isAuthenticated()

  if (!isAuthenticated) {
    throw createError({ statusCode: 401, statusMessage: 'Not authenticated' })
  }

  const profile = await kinde.getUserProfile()
  const config = useRuntimeConfig()

  const supabase = createClient(
    config.public.supabaseUrl,
    config.public.supabaseKey,
  )

  // Check if user already exists
  const { data: existing } = await supabase
    .from('admin_users')
    .select('*')
    .eq('kinde_id', profile.id)
    .single()

  if (existing) {
    return { user: existing, isNew: false }
  }

  // Create new admin user
  const { data: newUser, error } = await supabase
    .from('admin_users')
    .insert({
      kinde_id: profile.id,
      email: profile.email,
      name: `${profile.given_name || ''} ${profile.family_name || ''}`.trim() || profile.email,
      role: 'admin',
    })
    .select()
    .single()

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message })
  }

  return { user: newUser, isNew: true }
})
