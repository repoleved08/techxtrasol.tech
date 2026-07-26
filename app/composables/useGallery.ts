import type { Database } from '~/types/supabase'
import type { GalleryItem } from '~/types'

export function useGallery() {
  const supabase = useSupabase()

  async function getAllGallery(): Promise<GalleryItem[]> {
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false })

    if (error) throw error
    return (data || []) as GalleryItem[]
  }

  async function getPublishedGallery(): Promise<GalleryItem[]> {
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .eq('published', true)
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false })

    if (error) throw error
    return (data || []) as GalleryItem[]
  }

  async function getFeaturedGallery(): Promise<GalleryItem[]> {
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .eq('published', true)
      .eq('featured', true)
      .order('sort_order', { ascending: true })

    if (error) throw error
    return (data || []) as GalleryItem[]
  }

  async function createGalleryItem(item: Database['public']['Tables']['gallery']['Insert']) {
    const { data, error } = await supabase
      .from('gallery')
      .insert(item)
      .select()
      .single()

    if (error) throw error
    return data
  }

  async function updateGalleryItem(id: string, updates: Database['public']['Tables']['gallery']['Update']) {
    const { data, error } = await supabase
      .from('gallery')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  }

  async function deleteGalleryItem(id: string) {
    const { error } = await supabase
      .from('gallery')
      .delete()
      .eq('id', id)

    if (error) throw error
  }

  async function togglePublish(id: string, published: boolean) {
    const { error } = await supabase
      .from('gallery')
      .update({ published })
      .eq('id', id)

    if (error) throw error
  }

  async function toggleFeatured(id: string, featured: boolean) {
    const { error } = await supabase
      .from('gallery')
      .update({ featured })
      .eq('id', id)

    if (error) throw error
  }

  return {
    getAllGallery,
    getPublishedGallery,
    getFeaturedGallery,
    createGalleryItem,
    updateGalleryItem,
    deleteGalleryItem,
    togglePublish,
    toggleFeatured,
  }
}
