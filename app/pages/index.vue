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

const { data: caseStudiesData } = await useAsyncData('case-studies', () => getPublishedCaseStudies(4))
const { data: featuredProjects } = await useAsyncData('featured-projects', () => getFeaturedProjects(6))
const { data: uiTemplates } = await useAsyncData('ui-templates', () => getFeaturedTemplates())
const { data: galleryItems } = await useAsyncData('gallery-items', () => getPublishedGallery())

useSeoMeta({
  title: 'TechXtrasol — Software Engineering in Kenya',
  ogTitle: 'TechXtrasol — Software Engineering',
  description: 'TechXtrasol designs, builds, deploys, and supports mission-critical digital systems for businesses in Kenya, Africa, and globally.',
  ogDescription: 'Software engineering company building digital systems in Kenya.',
  ogImage: 'https://www.techxtrasol.tech/content-images/blog-default-og.jpg',
  twitterCard: 'summary_large_image',
})

useHead({
  htmlAttrs: { lang: 'en' },
  link: [
    { rel: 'canonical', href: 'https://www.techxtrasol.tech' },
  ],
})

useSchemaOrg([
  {
    '@type': 'ProfessionalService',
    name: 'TechXtrasol',
    image: 'https://www.techxtrasol.tech/icons/logo.svg',
    url: 'https://www.techxtrasol.tech',
    telephone: '+254794312108',
    email: 'hello@techxtrasol.tech',
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
    hasMap: 'https://maps.google.com/?q=Westlands,Nairobi,Kenya',
    areaServed: [
      { '@type': 'Country', name: 'Kenya' },
      { '@type': 'Country', name: 'East Africa' },
      { '@type': 'Place', name: 'Africa' },
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+254794312108',
      contactType: 'sales',
      areaServed: 'KE',
      availableLanguage: ['en', 'sw'],
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '08:00',
      closes: '18:00',
    },
    priceRange: '$$',
    sameAs: [
      'https://www.linkedin.com/company/techxtrasol',
      'https://github.com/techxtrasol',
      'https://x.com/techxtrasol',
    ],
    department: [
      {
        '@type': 'ProfessionalService',
        name: 'TechXtrasol Mombasa',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Mombasa',
          addressRegion: 'Mombasa County',
          addressCountry: 'KE',
        },
        telephone: '+254794312108',
      },
    ],
  },
  {
    '@type': 'FAQPage',
    mainEntity: faq.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  },
  ...testimonials.map((t, index) => ({
    '@type': 'Review',
    name: `TechXtrasol Client Review — ${t.handle}`,
    reviewBody: t.quote,
    itemReviewed: {
      '@type': 'ProfessionalService',
      name: 'TechXtrasol',
      url: 'https://www.techxtrasol.tech',
    },
    author: {
      '@type': 'Person',
      name: t.handle,
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: 5,
      bestRating: 5,
      worstRating: 1,
    },
    identifier: `review-${index}`,
  })),
])
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
