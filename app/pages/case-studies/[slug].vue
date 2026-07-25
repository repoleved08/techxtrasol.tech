<script setup>
const route = useRoute()
const slug = route.params.slug

const { getCaseStudyBySlug, getRelatedCaseStudies } = useCaseStudies()

const study = ref(null)
const relatedStudies = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    study.value = await getCaseStudyBySlug(slug)
    if (study.value) {
      relatedStudies.value = await getRelatedCaseStudies(slug, 3)
    }
  }
  finally {
    loading.value = false
  }
})

useHead({
  title: () => study.value?.seo_title || study.value?.title ? `${study.value.title} | TechXtrasol` : 'Case Study | TechXtrasol',
  meta: [
    { name: 'description', content: () => study.value?.seo_description || study.value?.introduction || '' },
  ],
})

useSeoMeta({
  ogTitle: () => study.value?.seo_title || study.value?.title || '',
  ogDescription: () => study.value?.seo_description || study.value?.introduction || '',
  ogImage: () => study.value?.featured_image || '/1200x630.jpg',
})

useSchemaOrg(() => {
  if (!study.value) return []
  return [
    {
      '@type': 'Article',
      headline: study.value.title,
      description: study.value.introduction,
      datePublished: study.value.created_at,
      author: { '@type': 'Organization', name: 'TechXtrasol' },
    },
  ]
})
</script>

<template>
  <div class="bs-mt-lg">
    <!-- Loading -->
    <div v-if="loading" class="bs-container py-20">
      <div class="flex items-center justify-center">
        <div class="w-8 h-8 border-2 border-bs-accent border-t-transparent rounded-full animate-spin" />
      </div>
    </div>

    <!-- Not found -->
    <div v-else-if="!study" class="bs-container py-20 text-center">
      <h1 class="bs-h1 mb-4">Case Study Not Found</h1>
      <p class="bs-body-text mb-8">The case study you're looking for doesn't exist or has been removed.</p>
      <a href="/case-studies" class="bs-btn">View All Case Studies</a>
    </div>

    <template v-else>
      <!-- Hero -->
      <section class="bs-container pt-12 pb-12">
        <div class="max-w-4xl">
          <nav class="flex items-center gap-2 text-sm text-bs-foreground-dark mb-6">
            <a href="/" class="hover:text-bs-foreground-light transition-colors">Home</a>
            <span>/</span>
            <a href="/case-studies" class="hover:text-bs-foreground-light transition-colors">Case Studies</a>
            <span>/</span>
            <span class="text-bs-foreground-light">{{ study.title }}</span>
          </nav>

          <h1 class="bs-h1 mb-4">{{ study.title }}</h1>
          <p class="bs-body-text text-lg">{{ study.introduction }}</p>
        </div>
      </section>

      <!-- Image -->
      <section v-if="study.featured_image" class="bs-container pb-12">
        <div class="rounded-xl overflow-hidden border border-bs-surface-3/50">
          <img :src="study.featured_image" :alt="study.title" class="w-full h-auto" loading="lazy" />
        </div>
      </section>

      <!-- Content -->
      <section class="bs-container pb-16">
        <div class="max-w-4xl mx-auto space-y-12">
          <!-- Business Problem -->
          <div v-if="study.business_problem">
            <h2 class="text-xl font-bold text-bs-foreground-light mb-4">Business Problem</h2>
            <p class="bs-body-text">{{ study.business_problem }}</p>
          </div>

          <!-- Objectives -->
          <div v-if="study.objectives?.length">
            <h2 class="text-xl font-bold text-bs-foreground-light mb-4">Objectives</h2>
            <ul class="space-y-3">
              <li v-for="(obj, i) in study.objectives" :key="i" class="flex items-start gap-3">
                <Icon name="lucide:target" class="w-5 h-5 text-bs-accent shrink-0 mt-0.5" />
                <span class="bs-body-text">{{ obj }}</span>
              </li>
            </ul>
          </div>

          <!-- Approach -->
          <div v-if="study.approach">
            <h2 class="text-xl font-bold text-bs-foreground-light mb-4">Our Approach</h2>
            <p class="bs-body-text">{{ study.approach }}</p>
          </div>

          <!-- Implementation -->
          <div v-if="study.implementation">
            <h2 class="text-xl font-bold text-bs-foreground-light mb-4">Implementation</h2>
            <p class="bs-body-text">{{ study.implementation }}</p>
          </div>

          <!-- Results -->
          <div v-if="study.results?.length">
            <h2 class="text-xl font-bold text-bs-foreground-light mb-4">Results</h2>
            <div class="grid sm:grid-cols-2 gap-4">
              <div v-for="(result, i) in study.results" :key="i" class="bg-bs-surface-1 border border-bs-surface-3/50 rounded-xl p-4">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-lg bg-green-400/10 flex items-center justify-center">
                    <Icon name="lucide:check-circle" class="w-4 h-4 text-green-400" />
                  </div>
                  <p class="text-sm font-medium text-bs-foreground-light">{{ result }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Lessons -->
          <div v-if="study.lessons">
            <h2 class="text-xl font-bold text-bs-foreground-light mb-4">Lessons Learned</h2>
            <p class="bs-body-text">{{ study.lessons }}</p>
          </div>

          <!-- Conclusion -->
          <div v-if="study.conclusion">
            <h2 class="text-xl font-bold text-bs-foreground-light mb-4">Conclusion</h2>
            <p class="bs-body-text">{{ study.conclusion }}</p>
          </div>

          <!-- Related Project -->
          <div v-if="study.project" class="bg-bs-surface-1 border border-bs-surface-3/50 rounded-xl p-6">
            <p class="text-xs text-bs-foreground-dark uppercase tracking-wider mb-2">Related Project</p>
            <NuxtLink :to="`/projects/${study.project.slug}`" class="group">
              <h3 class="font-semibold text-bs-foreground-light group-hover:text-bs-accent transition-colors">{{ study.project.title }}</h3>
              <p class="text-sm text-bs-foreground-dark mt-1">{{ study.project.short_description }}</p>
            </NuxtLink>
          </div>

          <!-- CTA -->
          <div class="bg-bs-surface-1 border border-bs-surface-3/50 rounded-xl p-8 text-center">
            <h3 class="text-xl font-bold text-bs-foreground-light mb-2">Facing a Similar Challenge?</h3>
            <p class="text-bs-foreground-dark mb-6">Let's discuss how we can engineer a solution for your business.</p>
            <button type="button" class="bs-btn" @click="useDialogOpen">
              Start a Conversation
            </button>
          </div>
        </div>
      </section>

      <!-- Related Case Studies -->
      <section v-if="relatedStudies.length" class="bs-container pb-20">
        <h2 class="text-xl font-bold text-bs-foreground-light mb-8">More Case Studies</h2>
        <div class="grid md:grid-cols-3 gap-6">
          <NuxtLink
            v-for="rs in relatedStudies"
            :key="rs.id"
            :to="`/case-studies/${rs.slug}`"
            class="group bg-bs-surface-1 border border-bs-surface-3/50 rounded-xl overflow-hidden hover:border-bs-accent/30 transition-all duration-300"
          >
            <div class="h-36 bg-bs-surface-3/50 overflow-hidden">
              <img v-if="rs.featured_image" :src="rs.featured_image" :alt="rs.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
            </div>
            <div class="p-4">
              <h3 class="font-semibold text-bs-foreground-light text-sm group-hover:text-bs-accent transition-colors">{{ rs.title }}</h3>
            </div>
          </NuxtLink>
        </div>
      </section>
    </template>
  </div>
</template>
