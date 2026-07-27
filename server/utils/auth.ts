import { createClient } from '@supabase/supabase-js'

const COOKIE_PREFIX = 'sb-ytakvlhdrfmktkputzjg'

export function getSupabaseSession(event: any, config: any) {
  const cookieHeader = event.node.req.headers.cookie || ''

  // Find the session cookie — Supabase module sets sb-{ref}.{N}=base64-{json}
  // Match both sb-{ref}= and sb-{ref}.1= patterns
  const sessionCookie = cookieHeader.split(';').find(c => {
    const trimmed = c.trim()
    return trimmed.startsWith(`${COOKIE_PREFIX}=`) || trimmed.startsWith(`${COOKIE_PREFIX}.`)
  })

  if (!sessionCookie) return null

  try {
    const rawValue = sessionCookie.split('=').slice(1).join('=')
    const decoded = decodeURIComponent(rawValue)

    // Strip base64- prefix and decode
    const base64 = decoded.startsWith('base64-') ? decoded.slice(7) : decoded
    const json = JSON.parse(Buffer.from(base64, 'base64').toString('utf-8'))

    return json.access_token ? json : null
  } catch {
    return null
  }
}

export async function verifySupabaseSession(event: any) {
  const config = useRuntimeConfig()
  const session = getSupabaseSession(event, config)

  if (!session) return null

  const supabase = createClient(config.public.supabase.url, config.public.supabase.key)
  const { data: { user }, error } = await supabase.auth.getUser(session.access_token)

  if (error || !user) return null

  return { user, supabase }
}
