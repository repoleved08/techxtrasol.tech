import type { CaseStudy, CaseStudyWithRelations } from '~/types'
import type { Database } from '~/types/supabase'

export function useCaseStudies() {
  const supabase = useSupabase()

  async function getPublishedCaseStudies(limit = 10, offset = 0): Promise<CaseStudy[]> {
    const { data, error } = await supabase
      .from('case_studies')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (error) throw error
    return data || []
  }

  async function getCaseStudyBySlug(slug: string): Promise<CaseStudyWithRelations | null> {
    const { data, error } = await supabase
      .from('case_studies')
      .select('*, project:projects(*)')
      .eq('slug', slug)
      .eq('published', true)
      .single()

    if (error) return null
    return data as unknown as CaseStudyWithRelations
  }

  async function getCaseStudyByProjectId(projectId: string): Promise<CaseStudy | null> {
    const { data, error } = await supabase
      .from('case_studies')
      .select('*')
      .eq('project_id', projectId)
      .eq('published', true)
      .single()

    if (error) return null
    return data
  }

  async function getRelatedCaseStudies(currentSlug: string, limit = 3): Promise<CaseStudy[]> {
    const { data, error } = await supabase
      .from('case_studies')
      .select('*')
      .eq('published', true)
      .neq('slug', currentSlug)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) throw error
    return data || []
  }

  async function getAllCaseStudies(): Promise<CaseStudy[]> {
    const { data, error } = await supabase
      .from('case_studies')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  }

  async function createCaseStudy(study: Database['public']['Tables']['case_studies']['Insert']) {
    const { data, error } = await supabase
      .from('case_studies')
      .insert(study)
      .select()
      .single()

    if (error) throw error
    return data
  }

  async function updateCaseStudy(id: string, updates: Database['public']['Tables']['case_studies']['Update']) {
    const { data, error } = await supabase
      .from('case_studies')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  }

  async function deleteCaseStudy(id: string) {
    const { error } = await supabase
      .from('case_studies')
      .delete()
      .eq('id', id)

    if (error) throw error
  }

  async function togglePublish(id: string, published: boolean) {
    return updateCaseStudy(id, { published })
  }

  return {
    getPublishedCaseStudies,
    getCaseStudyBySlug,
    getCaseStudyByProjectId,
    getRelatedCaseStudies,
    getAllCaseStudies,
    createCaseStudy,
    updateCaseStudy,
    deleteCaseStudy,
    togglePublish,
  }
}
