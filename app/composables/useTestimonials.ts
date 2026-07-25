import type { Testimonial } from '~/types'
import type { Database } from '~/types/supabase'

export function useTestimonials() {
  const supabase = useSupabase()

  async function getPublishedTestimonials(): Promise<Testimonial[]> {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  }

  async function getFeaturedTestimonials(limit = 6): Promise<Testimonial[]> {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('published', true)
      .eq('featured', true)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) throw error
    return data || []
  }

  async function getAllTestimonials(): Promise<Testimonial[]> {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  }

  async function createTestimonial(testimonial: Database['public']['Tables']['testimonials']['Insert']) {
    const { data, error } = await supabase
      .from('testimonials')
      .insert(testimonial)
      .select()
      .single()

    if (error) throw error
    return data
  }

  async function updateTestimonial(id: string, updates: Database['public']['Tables']['testimonials']['Update']) {
    const { data, error } = await supabase
      .from('testimonials')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  }

  async function deleteTestimonial(id: string) {
    const { error } = await supabase
      .from('testimonials')
      .delete()
      .eq('id', id)

    if (error) throw error
  }

  return {
    getPublishedTestimonials,
    getFeaturedTestimonials,
    getAllTestimonials,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial,
  }
}
