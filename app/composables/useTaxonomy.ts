import type { Category, Technology, Industry } from '~/types'
import type { Database } from '~/types/supabase'

export function useTaxonomy() {
  const supabase = useSupabase()

  // Categories
  async function getCategories(): Promise<Category[]> {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('sort_order', { ascending: true })

    if (error) throw error
    return data || []
  }

  async function getCategoryBySlug(slug: string): Promise<Category | null> {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('slug', slug)
      .single()

    if (error) return null
    return data
  }

  async function createCategory(cat: Database['public']['Tables']['categories']['Insert']) {
    const { data, error } = await supabase
      .from('categories')
      .insert(cat)
      .select()
      .single()

    if (error) throw error
    return data
  }

  async function updateCategory(id: string, updates: Database['public']['Tables']['categories']['Update']) {
    const { data, error } = await supabase
      .from('categories')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  }

  async function deleteCategory(id: string) {
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id)

    if (error) throw error
  }

  // Technologies
  async function getTechnologies(): Promise<Technology[]> {
    const { data, error } = await supabase
      .from('technologies')
      .select('*')
      .order('name', { ascending: true })

    if (error) throw error
    return data || []
  }

  async function getTechnologiesByCategory(category: string): Promise<Technology[]> {
    const { data, error } = await supabase
      .from('technologies')
      .select('*')
      .eq('category', category)
      .order('name', { ascending: true })

    if (error) throw error
    return data || []
  }

  async function createTechnology(tech: Database['public']['Tables']['technologies']['Insert']) {
    const { data, error } = await supabase
      .from('technologies')
      .insert(tech)
      .select()
      .single()

    if (error) throw error
    return data
  }

  async function updateTechnology(id: string, updates: Database['public']['Tables']['technologies']['Update']) {
    const { data, error } = await supabase
      .from('technologies')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  }

  async function deleteTechnology(id: string) {
    const { error } = await supabase
      .from('technologies')
      .delete()
      .eq('id', id)

    if (error) throw error
  }

  // Industries
  async function getIndustries(): Promise<Industry[]> {
    const { data, error } = await supabase
      .from('industries')
      .select('*')
      .order('name', { ascending: true })

    if (error) throw error
    return data || []
  }

  async function getIndustryBySlug(slug: string): Promise<Industry | null> {
    const { data, error } = await supabase
      .from('industries')
      .select('*')
      .eq('slug', slug)
      .single()

    if (error) return null
    return data
  }

  async function createIndustry(ind: Database['public']['Tables']['industries']['Insert']) {
    const { data, error } = await supabase
      .from('industries')
      .insert(ind)
      .select()
      .single()

    if (error) throw error
    return data
  }

  async function updateIndustry(id: string, updates: Database['public']['Tables']['industries']['Update']) {
    const { data, error } = await supabase
      .from('industries')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  }

  async function deleteIndustry(id: string) {
    const { error } = await supabase
      .from('industries')
      .delete()
      .eq('id', id)

    if (error) throw error
  }

  return {
    getCategories,
    getCategoryBySlug,
    createCategory,
    updateCategory,
    deleteCategory,
    getTechnologies,
    getTechnologiesByCategory,
    createTechnology,
    updateTechnology,
    deleteTechnology,
    getIndustries,
    getIndustryBySlug,
    createIndustry,
    updateIndustry,
    deleteIndustry,
  }
}
