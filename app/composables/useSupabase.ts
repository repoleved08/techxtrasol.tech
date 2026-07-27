import { createClient } from '@supabase/supabase-js'
import type { Database } from '~/types/supabase'

let supabaseInstance: ReturnType<typeof createClient<Database>> | null = null

export function useSupabase() {
  if (supabaseInstance) return supabaseInstance

  const config = useRuntimeConfig()
  supabaseInstance = createClient<Database>(
    config.public.supabase.url,
    config.public.supabase.key,
  )

  return supabaseInstance
}
