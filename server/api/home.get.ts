import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async () => {
  const config = useRuntimeConfig().public.supabase
  const supabase = createClient(config.url, config.key)

  const [
    { data: caseStudies },
    { data: featuredProjects },
    { data: uiTemplates },
    { data: galleryItems },
  ] = await Promise.all([
    supabase.from('case_studies').select('*').eq('published', true).limit(4),
    supabase.from('projects').select('*').eq('published', true).eq('featured', true).order('completion_date', { ascending: false }).limit(6),
    supabase.from('ui_templates').select('*').eq('featured', true),
    supabase.from('gallery').select('*').eq('published', true),
  ])

  return {
    caseStudies: caseStudies || [],
    featuredProjects: featuredProjects || [],
    uiTemplates: uiTemplates || [],
    galleryItems: galleryItems || [],
  }
})