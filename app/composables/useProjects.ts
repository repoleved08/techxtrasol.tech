import type { Project, ProjectFilters, PaginatedResponse } from '~/types'

export function useProjects() {
  const supabase = useSupabase()

  const emptyResult = (page: number, perPage: number): PaginatedResponse<Project> => ({
    data: [],
    total: 0,
    page,
    per_page: perPage,
    total_pages: 0,
  })

  async function getLinkedProjectIds(
    table: 'project_categories' | 'project_technologies' | 'project_industries',
    linkColumn: string,
    id: string,
  ): Promise<string[] | null> {
    const { data, error } = await supabase
      .from(table)
      .select('project_id')
      .eq(linkColumn, id)

    if (error) throw error
    return (data || []).map(row => row.project_id)
  }

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

    if (filters.category) {
      const { data: category } = await supabase
        .from('categories')
        .select('id')
        .eq('slug', filters.category)
        .maybeSingle()

      if (!category) return emptyResult(page, perPage)

      const projectIds = await getLinkedProjectIds('project_categories', 'category_id', category.id)
      if (projectIds.length === 0) return emptyResult(page, perPage)
      query = query.in('id', projectIds)
    }

    if (filters.technology) {
      const { data: tech } = await supabase
        .from('technologies')
        .select('id')
        .eq('slug', filters.technology)
        .maybeSingle()

      if (!tech) return emptyResult(page, perPage)

      const projectIds = await getLinkedProjectIds('project_technologies', 'technology_id', tech.id)
      if (projectIds.length === 0) return emptyResult(page, perPage)
      query = query.in('id', projectIds)
    }

    if (filters.industry) {
      const { data: industry } = await supabase
        .from('industries')
        .select('id')
        .eq('slug', filters.industry)
        .maybeSingle()

      if (!industry) return emptyResult(page, perPage)

      const projectIds = await getLinkedProjectIds('project_industries', 'industry_id', industry.id)
      if (projectIds.length === 0) return emptyResult(page, perPage)
      query = query.in('id', projectIds)
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
