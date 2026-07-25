import type { Service } from '~/types'
import type { Database } from '~/types/supabase'

export function useServices() {
  const supabase = useSupabase()

  async function getPublishedServices(): Promise<Service[]> {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('published', true)
      .order('sort_order', { ascending: true })

    if (error) throw error
    return data || []
  }

  async function getServiceBySlug(slug: string): Promise<Service | null> {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single()

    if (error) return null
    return data
  }

  async function getAllServices(): Promise<Service[]> {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('sort_order', { ascending: true })

    if (error) throw error
    return data || []
  }

  async function createService(service: Database['public']['Tables']['services']['Insert']) {
    const { data, error } = await supabase
      .from('services')
      .insert(service)
      .select()
      .single()

    if (error) throw error
    return data
  }

  async function updateService(id: string, updates: Database['public']['Tables']['services']['Update']) {
    const { data, error } = await supabase
      .from('services')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  }

  async function deleteService(id: string) {
    const { error } = await supabase
      .from('services')
      .delete()
      .eq('id', id)

    if (error) throw error
  }

  return {
    getPublishedServices,
    getServiceBySlug,
    getAllServices,
    createService,
    updateService,
    deleteService,
  }
}
