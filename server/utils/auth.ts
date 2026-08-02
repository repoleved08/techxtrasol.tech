import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'

export function createSupabaseServerClient(event: any) {
  const config = useRuntimeConfig()

  return createServerClient(
    config.public.supabase.url,
    config.public.supabase.key,
    {
      cookieOptions: {
        name: config.public.supabase.cookiePrefix,
      },
      cookies: {
        getAll() {
          const cookieHeader = event.node.req.headers.cookie || ''
          return cookieHeader.split(';').map(c => {
            const [name, ...rest] = c.trim().split('=')
            return { name, value: decodeURIComponent(rest.join('=')) }
          }).filter(c => c.name)
        },
        setAll(cookiesToSet) {
          if (!event.node.res) return
          const existing = event.node.res.getHeader('set-cookie')
          const newCookies = cookiesToSet.map(({ name, value, options }) => {
            const parts = [`${name}=${encodeURIComponent(value)}`]
            if (options?.maxAge) parts.push(`Max-Age=${options.maxAge}`)
            if (options?.path) parts.push(`Path=${options.path}`)
            if (options?.domain) parts.push(`Domain=${options.domain}`)
            if (options?.sameSite) parts.push(`SameSite=${options.sameSite}`)
            if (options?.secure) parts.push('Secure')
            if (options?.httpOnly) parts.push('HttpOnly')
            return parts.join('; ')
          })
          const allCookies = [...(Array.isArray(existing) ? existing : existing ? [existing] : []), ...newCookies]
          event.node.res.setHeader('set-cookie', allCookies)
        },
      },
    },
  )
}

export async function verifySupabaseSession(event: any) {
  const supabase = createSupabaseServerClient(event)
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) return null

  return { user, supabase }
}
