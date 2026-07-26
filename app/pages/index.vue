<script setup>
import clients from '../data/clients.json'
import faq from '../data/faq.json'
import services from '../data/services.json'
import home from '../data/home.json'
import global_settings from '../data/global_settings.json'
import newsletter from '../data/newsletter.json'
import testimonials from '../data/testimonials.json'
import team from '../data/team.json'
import tech_stack from '../data/tech_stack.json'
import process from '../data/process.json'
import why_choose from '../data/why_choose.json'
import blog from '../data/blog.json'
import stats from '../data/stats.json'

const { getPublishedCaseStudies } = useCaseStudies()
const { getFeaturedProjects } = useProjects()
const { getFeaturedTemplates } = useUiTemplates()
const { getPublishedGallery } = useGallery()

const caseStudiesData = ref([])
const featuredProjects = ref([])
const uiTemplates = ref([])
const galleryItems = ref([])

onMounted(async () => {
  const [cs, proj, templates, gallery] = await Promise.all([
    getPublishedCaseStudies(4),
    getFeaturedProjects(6),
    getFeaturedTemplates(),
    getPublishedGallery(),
  ])
  caseStudiesData.value = cs
  featuredProjects.value = proj
  uiTemplates.value = templates
  galleryItems.value = gallery
})

useSeoMeta({
  title: 'TechXtrasol — Software Engineering Company in Kenya',
  ogTitle: 'TechXtrasol — Software Engineering Company',
  description: 'TechXtrasol is a software engineering company that designs, builds, deploys, and supports mission-critical digital systems for businesses in Kenya, Africa, and globally. Custom software, ERP systems, web apps, mobile apps, cloud solutions, and AI.',
  ogDescription: 'Software engineering company building mission-critical digital systems for businesses in Kenya and globally.',
  ogImage: '/1200x630.jpg',
  twitterCard: 'summary_large_image',
  keywords: 'software development company Kenya, software development Africa, custom software Kenya, Laravel developers Kenya, Vue.js development, Nuxt development, mobile app development Kenya, enterprise software, ERP development, HR system development, AI software company, cloud consulting Kenya, digital transformation, software engineering Kenya',
})

useHead({
  htmlAttrs: { lang: 'en' },
  link: [
    { rel: 'canonical', href: 'https://techxtrasol.tech' },
  ],
})

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'TechXtrasol',
  url: 'https://techxtrasol.tech',
  logo: 'https://techxtrasol.tech/icons/logo.svg',
  description: 'Software engineering company building mission-critical digital systems for businesses in Kenya, Africa, and globally.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Nairobi',
    addressCountry: 'KE',
  },
  sameAs: [
    'https://www.linkedin.com/company/techxtrasol',
    'https://github.com/techxtrasol',
    'https://x.com/techxtrasol',
  ],
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'TechXtrasol',
  url: 'https://techxtrasol.tech',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://techxtrasol.tech/search?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'TechXtrasol',
  image: 'https://techxtrasol.tech/icons/logo.svg',
  url: 'https://techxtrasol.tech',
  telephone: '+254794312108',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Nairobi',
    addressRegion: 'Nairobi County',
    addressCountry: 'KE',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: -1.2921,
    longitude: 36.8219,
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '08:00',
    closes: '18:00',
  },
  priceRange: '$$',
}

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(organizationSchema),
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(websiteSchema),
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(localBusinessSchema),
    },
  ],
})
</script>

<template>

  <HeroSection
    :content="home.hero_content"
    :settings="global_settings"
    :title="home.hero_title"
  />

  <StatsSection
    :stats="stats"
    :title="home.stats_title"
  />

  <ServicesCarousel
    :services="services"
    :title="home.services_title"
  />

  <TrustSection />

  <WhyChooseSection
    :items="why_choose"
    :title="home.why_choose_title"
  />

  <ProjectsSection :title="home.projects_title || 'Our Work'">
    <div class="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <CardProject
        v-for="project in featuredProjects"
        :key="project.id"
        :project="project"
      />
    </div>
  </ProjectsSection>

  <CaseStudiesSection
    :caseStudies="caseStudiesData"
    :title="home.case_studies_title"
  />

  <GallerySection
    v-if="galleryItems.length"
    :items="galleryItems"
    title="Our Design Work"
  />

  <UiShowcase
    v-if="uiTemplates.length"
    :templates="uiTemplates"
    title="Premium UI Templates"
  />

  <ProcessSection
    :steps="process"
    :title="home.process_title"
  />

  <ClientsSection
    :clients="clients"
    :title="home.clients_title"
  />

  <QuoteSection
    :cite="home.quote_cite"
    :content="home.quote_content"
    :image="home.quote_image"
    :role="home.quote_role"
  />

  <TechStackSection
    :stack="tech_stack"
    :title="home.tech_stack_title"
  />

  <TeamSection
    :team="team"
    :title="home.team_title"
  />

  <TestimonialsSection
    :testimonials="testimonials"
    :title="home.testimonials_title"
  />

  <BlogSection
    :posts="blog"
    :title="home.blog_title"
  />

  <FaqSection
    :faq="faq"
    :title="home.faq_title"
  />

  <NewsletterSection :newsletter="newsletter" />

</template>
