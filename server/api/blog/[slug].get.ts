import { renderMarkdown } from '~~/server/utils/markdown'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')

  const config = useRuntimeConfig()
  const { createClient } = await import('@supabase/supabase-js')

  const supabase = createClient(
    config.public.supabase.url,
    config.public.supabase.key,
  )

  const { data: post, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error || !post) {
    throw createError({ statusCode: 404, statusMessage: 'Post not found' })
  }

  const html = await renderMarkdown(post.content || '')

  return { post, html }
})
