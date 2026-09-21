import { useState, useRuntimeConfig } from '#imports'

let clientPromise: Promise<import('@supabase/supabase-js').SupabaseClient> | null = null
let restoring = false

export const useAuthUser = () => useState<Record<string, unknown> | null>('supabase_user', () => null)

export const useAuthSession = () => useState<Record<string, unknown> | null>('supabase_session', () => null)

async function restoreSession(client: import('@supabase/supabase-js').SupabaseClient) {
  if (restoring) return client
  restoring = true
  try {
    const session = useAuthSession()
    const user = useAuthUser()
    const { data } = await client.auth.getSession()
    if (data.session) {
      session.value = data.session
      user.value = data.session.user
    }
    client.auth.onAuthStateChange((_, next) => {
      if (JSON.stringify(session.value) !== JSON.stringify(next)) {
        session.value = next
        user.value = next?.user ?? null
      }
    })
  } finally {
    restoring = false
  }
  return client
}

export function ensureSupabaseClient() {
  if (!clientPromise) {
    clientPromise = (async () => {
      const config = useRuntimeConfig().public.supabase
      const { createBrowserClient } = await import('@supabase/ssr')
      const client = createBrowserClient(config.url, config.key, {
        cookieOptions: { name: config.cookiePrefix || 'sb-auth-token' },
        isSingleton: true,
      })
      return await restoreSession(client)
    })()
  }
  return clientPromise
}