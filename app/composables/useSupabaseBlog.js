import { createClient } from '@supabase/supabase-js'

let supabaseInstance = null

function getSupabase() {
  if (supabaseInstance) return supabaseInstance
  const config = useRuntimeConfig()
  supabaseInstance = createClient(config.public.supabaseUrl, config.public.supabaseKey)
  return supabaseInstance
}

export function useSupabaseBlog() {
  const supabase = getSupabase()

  async function getAllPosts() {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('date', { ascending: false })

    if (error) throw error
    return data || []
  }

  async function getPostBySlug(slug) {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .single()

    if (error) throw error
    return data
  }

  return { getAllPosts, getPostBySlug }
}
