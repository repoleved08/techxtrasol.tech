import type { BlogPost } from '~/types'

export function useSupabaseBlog() {
  const supabase = useSupabase()

  async function getAllPosts(): Promise<BlogPost[]> {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('date', { ascending: false })

    if (error) throw error
    return (data || []) as BlogPost[]
  }

  async function getPostBySlug(slug: string): Promise<BlogPost | null> {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .single()

    if (error) return null
    return data as BlogPost
  }

  async function createPost(post: Database['public']['Tables']['blog_posts']['Insert']) {
    const { data, error } = await supabase
      .from('blog_posts')
      .insert(post)
      .select()
      .single()

    if (error) throw error
    return data
  }

  async function updatePost(id: string, updates: Database['public']['Tables']['blog_posts']['Update']) {
    const { data, error } = await supabase
      .from('blog_posts')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  }

  async function deletePost(id: string) {
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id)

    if (error) throw error
  }

  return { getAllPosts, getPostBySlug, createPost, updatePost, deletePost }
}

import type { Database } from '~/types/supabase'
