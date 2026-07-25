export interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  icon: string | null
  sort_order: number
  created_at: string
}

export interface Technology {
  id: string
  name: string
  slug: string
  category: string
  color: string | null
  icon: string | null
  website_url: string | null
  created_at: string
}

export interface Industry {
  id: string
  name: string
  slug: string
  description: string | null
  icon: string | null
  created_at: string
}

export interface Project {
  id: string
  slug: string
  title: string
  short_description: string
  full_description: string | null
  client_name: string | null
  client_industry: string | null
  project_url: string | null
  github_url: string | null
  featured_image: string | null
  gallery: string[]
  technologies: string[]
  services: string[]
  challenge: string | null
  solution: string | null
  outcome: string | null
  duration: string | null
  completion_date: string | null
  featured: boolean
  published: boolean
  seo_title: string | null
  seo_description: string | null
  created_at: string
  updated_at: string
}

export interface ProjectWithRelations extends Project {
  categories?: Category[]
  related_technologies?: Industry[]
  industries?: Industry[]
}

export interface CaseStudy {
  id: string
  slug: string
  project_id: string | null
  title: string
  introduction: string | null
  business_problem: string | null
  objectives: string[]
  approach: string | null
  implementation: string | null
  results: string[]
  lessons: string | null
  conclusion: string | null
  featured_image: string | null
  seo_title: string | null
  seo_description: string | null
  published: boolean
  created_at: string
}

export interface CaseStudyWithRelations extends CaseStudy {
  project?: Project | null
}

export interface Testimonial {
  id: string
  client_name: string
  client_title: string | null
  client_company: string | null
  client_logo: string | null
  client_avatar: string | null
  quote: string
  rating: number
  project_id: string | null
  featured: boolean
  published: boolean
  created_at: string
}

export interface Service {
  id: string
  slug: string
  title: string
  short_description: string | null
  full_description: string | null
  icon: string | null
  features: string[]
  benefits: string[]
  process: string[]
  technologies: string[]
  featured_image: string | null
  seo_title: string | null
  seo_description: string | null
  sort_order: number
  published: boolean
  created_at: string
  updated_at: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  description: string
  content: string
  date: string
  category: string
  read_time: string
  image: string
  created_at: string
}

export interface AdminUser {
  id: string
  kinde_id: string
  email: string
  name: string | null
  role: string
  created_at: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  per_page: number
  total_pages: number
}

export interface ProjectFilters {
  search?: string
  category?: string
  technology?: string
  industry?: string
  featured?: boolean
  page?: number
  per_page?: number
}
