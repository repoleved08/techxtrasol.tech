import type { Project, ProjectFilters, PaginatedResponse } from '~/types'

export function useProjects() {
  const supabase = useSupabase()

  async function getPublishedProjects(filters: ProjectFilters = {}): Promise<PaginatedResponse<Project>> {
    const page = filters.page || 1
    const perPage = filters.per_page || 12
    const from = (page - 1) * perPage
    const to = from + perPage - 1

    let query = supabase
      .from('projects')
      .select('*', { count: 'exact' })
      .eq('published', true)
      .order('completion_date', { ascending: false })

    if (filters.search) {
      query = query.or(`title.ilike.%${filters.search}%,short_description.ilike.%${filters.search}%`)
    }

    if (filters.featured !== undefined) {
      query = query.eq('featured', filters.featured)
    }

    const { data, count, error } = await query.range(from, to)
    if (error) throw error

    return {
      data: data || [],
      total: count || 0,
      page,
      per_page: perPage,
      total_pages: Math.ceil((count || 0) / perPage),
    }
  }

  async function getProjectBySlug(slug: string): Promise<Project | null> {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single()

    if (error) return null
    return data
  }

  async function getFeaturedProjects(limit = 6): Promise<Project[]> {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('published', true)
      .eq('featured', true)
      .order('completion_date', { ascending: false })
      .limit(limit)

    if (error) throw error
    return data || []
  }

  async function getRelatedProjects(currentSlug: string, limit = 3): Promise<Project[]> {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('published', true)
      .neq('slug', currentSlug)
      .order('completion_date', { ascending: false })
      .limit(limit)

    if (error) throw error
    return data || []
  }

  async function getAllProjects(): Promise<Project[]> {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  }

  async function createProject(project: Database['public']['Tables']['projects']['Insert']) {
    const { data, error } = await supabase
      .from('projects')
      .insert(project)
      .select()
      .single()

    if (error) throw error
    return data
  }

  async function updateProject(id: string, updates: Database['public']['Tables']['projects']['Update']) {
    const { data, error } = await supabase
      .from('projects')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  }

  async function deleteProject(id: string) {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id)

    if (error) throw error
  }

  async function togglePublish(id: string, published: boolean) {
    return updateProject(id, { published })
  }

  async function toggleFeatured(id: string, featured: boolean) {
    return updateProject(id, { featured })
  }

  return {
    getPublishedProjects,
    getProjectBySlug,
    getFeaturedProjects,
    getRelatedProjects,
    getAllProjects,
    createProject,
    updateProject,
    deleteProject,
    togglePublish,
    toggleFeatured,
  }
}

import type { Database } from '~/types/supabase'
