import { defineSitemapEventHandler } from '#imports'

export default defineSitemapEventHandler(async () => {
  const config = useRuntimeConfig()
  const { createClient } = await import('@supabase/supabase-js')

  const supabase = createClient(
    config.public.supabase.url,
    config.public.supabase.key,
  )

  const [blog, projects, caseStudies, services] = await Promise.all([
    supabase.from('blog_posts').select('slug,date,created_at'),
    supabase.from('projects').select('slug,updated_at,created_at').eq('published', true),
    supabase.from('case_studies').select('slug,created_at').eq('published', true),
    supabase.from('services').select('slug,updated_at,created_at').eq('published', true),
  ])

  const lastmod = (updated?: string | null, created?: string | null) =>
    updated || created || undefined

  return [
    ...(blog.data || []).map(p => ({
      loc: `/blog/${p.slug}`,
      lastmod: p.date || p.created_at,
      changefreq: 'monthly' as const,
      priority: 0.8 as const,
    })),
    ...(projects.data || []).map(p => ({
      loc: `/projects/${p.slug}`,
      lastmod: lastmod(p.updated_at, p.created_at),
      changefreq: 'monthly' as const,
      priority: 0.7 as const,
    })),
    ...(caseStudies.data || []).map(c => ({
      loc: `/case-studies/${c.slug}`,
      lastmod: c.created_at,
      changefreq: 'yearly' as const,
      priority: 0.6 as const,
    })),
    ...(services.data || []).map(s => ({
      loc: `/services/${s.slug}`,
      lastmod: lastmod(s.updated_at, s.created_at),
      changefreq: 'yearly' as const,
      priority: 0.6 as const,
    })),
  ]
})
