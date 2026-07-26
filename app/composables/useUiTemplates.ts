import type { Database } from '~/types/supabase'
import type { UiTemplate } from '~/types'

export function useUiTemplates() {
  const supabase = useSupabase()

  async function getAllTemplates(): Promise<UiTemplate[]> {
    const { data, error } = await supabase
      .from('ui_templates')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return (data || []) as UiTemplate[]
  }

  async function getPublishedTemplates(): Promise<UiTemplate[]> {
    const { data, error } = await supabase
      .from('ui_templates')
      .select('*')
      .eq('published', true)
      .order('featured', { ascending: false })
      .order('created_at', { ascending: false })

    if (error) throw error
    return (data || []) as UiTemplate[]
  }

  async function getFeaturedTemplates(): Promise<UiTemplate[]> {
    const { data, error } = await supabase
      .from('ui_templates')
      .select('*')
      .eq('published', true)
      .eq('featured', true)
      .order('created_at', { ascending: false })

    if (error) throw error
    return (data || []) as UiTemplate[]
  }

  async function createTemplate(template: Database['public']['Tables']['ui_templates']['Insert']) {
    const { data, error } = await supabase
      .from('ui_templates')
      .insert(template)
      .select()
      .single()

    if (error) throw error
    return data
  }

  async function updateTemplate(id: string, updates: Database['public']['Tables']['ui_templates']['Update']) {
    const { data, error } = await supabase
      .from('ui_templates')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  }

  async function deleteTemplate(id: string) {
    const { error } = await supabase
      .from('ui_templates')
      .delete()
      .eq('id', id)

    if (error) throw error
  }

  async function togglePublish(id: string, published: boolean) {
    const { error } = await supabase
      .from('ui_templates')
      .update({ published })
      .eq('id', id)

    if (error) throw error
  }

  async function toggleFeatured(id: string, featured: boolean) {
    const { error } = await supabase
      .from('ui_templates')
      .update({ featured })
      .eq('id', id)

    if (error) throw error
  }

  return {
    getAllTemplates,
    getPublishedTemplates,
    getFeaturedTemplates,
    createTemplate,
    updateTemplate,
    deleteTemplate,
    togglePublish,
    toggleFeatured,
  }
}
