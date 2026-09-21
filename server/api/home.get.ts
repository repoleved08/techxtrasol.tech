import { useCaseStudies } from '~/composables/useCaseStudies'
import { useProjects } from '~/composables/useProjects'
import { useUiTemplates } from '~/composables/useUiTemplates'
import { useGallery } from '~/composables/useGallery'

export default defineEventHandler(async () => {
  const { getPublishedCaseStudies } = useCaseStudies()
  const { getFeaturedProjects } = useProjects()
  const { getFeaturedTemplates } = useUiTemplates()
  const { getPublishedGallery } = useGallery()

  const [caseStudies, featuredProjects, uiTemplates, galleryItems] = await Promise.all([
    getPublishedCaseStudies(4),
    getFeaturedProjects(6),
    getFeaturedTemplates(),
    getPublishedGallery(),
  ])

  return { caseStudies, featuredProjects, uiTemplates, galleryItems }
})