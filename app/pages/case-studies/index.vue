<script setup>
const { getPublishedCaseStudies } = useCaseStudies()

const caseStudies = ref([])
const loading = ref(true)

useHead({
  title: 'Case Studies | TechXtrasol',
  meta: [
    { name: 'description', content: 'In-depth case studies showing how we solve complex business problems with software engineering — from architecture to deployment.' },
  ],
})

useSeoMeta({
  ogTitle: 'Case Studies | TechXtrasol',
  ogDescription: 'In-depth case studies showing how we solve complex business problems with software engineering.',
  ogImage: '/content-images/blog-default-og.jpg',
})

onMounted(async () => {
  try {
    caseStudies.value = await getPublishedCaseStudies(20)
  }
  finally {
    loading.value = false
  }
})

useSchemaOrg([
  {
    '@type': 'CollectionPage',
    name: 'Case Studies',
    description: 'In-depth case studies by TechXtrasol.',
    url: 'https://techxtrasol.tech/case-studies',
  },
])
</script>

<template>
  <div class="bs-mt-lg">
    <!-- Hero -->
    <section class="bs-container pt-12 pb-8">
      <div class="max-w-3xl">
        <h1 class="bs-h1">Case Studies</h1>
        <p class="bs-body-text mt-4">
          Deep dives into how we approach complex business challenges — from discovery and architecture to implementation and measurable results.
        </p>
      </div>
    </section>

    <!-- Loading -->
    <section v-if="loading" class="bs-container py-20">
      <div class="flex items-center justify-center">
        <div class="w-8 h-8 border-2 border-bs-accent border-t-transparent rounded-full animate-spin" />
      </div>
    </section>

    <!-- Case studies -->
    <section v-else class="bs-container pb-20">
      <div class="grid md:grid-cols-2 gap-6">
        <NuxtLink
          v-for="cs in caseStudies"
          :key="cs.id"
          :to="`/case-studies/${cs.slug}`"
          class="group bg-bs-surface-1 border border-bs-surface-3/50 rounded-xl overflow-hidden hover:border-bs-accent/30 transition-all duration-300"
        >
          <div v-if="cs.featured_image" class="h-48 bg-bs-surface-3/50 overflow-hidden">
            <img :src="cs.featured_image" :alt="cs.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
          </div>
          <div class="p-6">
            <h2 class="text-lg font-bold text-bs-foreground-light mb-2 group-hover:text-bs-accent transition-colors">{{ cs.title }}</h2>
            <p class="text-sm text-bs-foreground-dark line-clamp-3 mb-4">{{ cs.introduction }}</p>
            <div class="flex items-center gap-2 text-sm text-bs-accent font-medium">
              Read Case Study
              <Icon name="lucide:arrow-right" class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </NuxtLink>
      </div>

      <div v-if="caseStudies.length === 0" class="text-center py-20">
        <Icon name="lucide:file-text" class="w-16 h-16 text-bs-surface-3 mx-auto mb-4" />
        <p class="text-bs-foreground-dark">No case studies published yet. Check back soon.</p>
      </div>
    </section>
  </div>
</template>
