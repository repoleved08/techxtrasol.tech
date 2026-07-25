import { getKindeClient } from '@nuxtjs/kinde/server'
import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const kinde = getKindeClient()
  const isAuthenticated = await kinde.isAuthenticated()

  if (!isAuthenticated) {
    return { isAdmin: false, user: null }
  }

  const profile = await kinde.getUserProfile()
  const config = useRuntimeConfig()

  const supabase = createClient(
    config.public.supabaseUrl,
    config.public.supabaseKey,
  )

  const { data: adminUser } = await supabase
    .from('admin_users')
    .select('*')
    .eq('kinde_id', profile.id)
    .single()

  return {
    isAdmin: !!adminUser,
    user: adminUser || null,
    kindeProfile: {
      id: profile.id,
      email: profile.email,
      given_name: profile.given_name,
      family_name: profile.family_name,
    },
  }
})
