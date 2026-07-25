<script setup>
const route = useRoute()
const slug = route.params.slug

const { getServiceBySlug } = useServices()
const { getPublishedProjects } = useProjects()

const service = ref(null)
const relatedProjects = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    service.value = await getServiceBySlug(slug)
    if (service.value) {
      const result = await getPublishedProjects({ per_page: 3 })
      relatedProjects.value = result.data
    }
  }
  finally {
    loading.value = false
  }
})

useHead({
  title: () => service.value ? `${service.value.title} | TechXtrasol` : 'Service | TechXtrasol',
  meta: [
    { name: 'description', content: () => service.value?.seo_description || service.value?.short_description || '' },
  ],
})

useSeoMeta({
  ogTitle: () => service.value?.seo_title || service.value?.title || '',
  ogDescription: () => service.value?.seo_description || service.value?.short_description || '',
  ogImage: () => service.value?.featured_image || '/1200x630.jpg',
})

useSchemaOrg(() => {
  if (!service.value) return []
  return [
    {
      '@type': 'Service',
      name: service.value.title,
      description: service.value.short_description,
      provider: { '@type': 'Organization', name: 'TechXtrasol', url: 'https://techxtrasol.tech' },
      areaServed: { '@type': 'Country', name: 'Kenya' },
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
    <div v-else-if="!service" class="bs-container py-20 text-center">
      <h1 class="bs-h1 mb-4">Service Not Found</h1>
      <p class="bs-body-text mb-8">The service you're looking for doesn't exist.</p>
      <a href="/services" class="bs-btn">View All Services</a>
    </div>

    <template v-else>
      <!-- Hero -->
      <section class="bs-container pt-12 pb-12">
        <div class="max-w-3xl">
          <nav class="flex items-center gap-2 text-sm text-bs-foreground-dark mb-6">
            <a href="/" class="hover:text-bs-foreground-light transition-colors">Home</a>
            <span>/</span>
            <a href="/services" class="hover:text-bs-foreground-light transition-colors">Services</a>
            <span>/</span>
            <span class="text-bs-foreground-light">{{ service.title }}</span>
          </nav>

          <h1 class="bs-h1 mb-4">{{ service.title }}</h1>
          <p class="bs-body-text text-lg">{{ service.short_description }}</p>

          <button type="button" class="bs-btn mt-8" @click="useDialogOpen">
            Get Started
          </button>
        </div>
      </section>

      <!-- Image -->
      <section v-if="service.featured_image" class="bs-container pb-12">
        <div class="rounded-xl overflow-hidden border border-bs-surface-3/50">
          <img :src="service.featured_image" :alt="service.title" class="w-full h-auto" loading="lazy" />
        </div>
      </section>

      <!-- Features -->
      <section v-if="service.features?.length" class="bs-container pb-16">
        <h2 class="text-xl font-bold text-bs-foreground-light mb-8">What We Deliver</h2>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div v-for="feature in service.features" :key="feature" class="bg-bs-surface-1 border border-bs-surface-3/50 rounded-xl p-5">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-lg bg-bs-accent/10 flex items-center justify-center shrink-0">
                <Icon name="lucide:check" class="w-4 h-4 text-bs-accent" />
              </div>
              <p class="text-sm font-medium text-bs-foreground-light">{{ feature }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Benefits -->
      <section v-if="service.benefits?.length" class="bs-container pb-16">
        <h2 class="text-xl font-bold text-bs-foreground-light mb-8">Why Choose This Service</h2>
        <div class="grid sm:grid-cols-2 gap-4">
          <div v-for="benefit in service.benefits" :key="benefit" class="flex items-start gap-3">
            <Icon name="lucide:star" class="w-5 h-5 text-bs-accent shrink-0 mt-0.5" />
            <p class="bs-body-text">{{ benefit }}</p>
          </div>
        </div>
      </section>

      <!-- Full description -->
      <section v-if="service.full_description" class="bs-container pb-16">
        <div class="max-w-3xl">
          <h2 class="text-xl font-bold text-bs-foreground-light mb-4">About This Service</h2>
          <div class="bs-body-text prose prose-invert max-w-none">{{ service.full_description }}</div>
        </div>
      </section>

      <!-- CTA -->
      <section class="bs-container pb-20">
        <div class="bg-bs-surface-1 border border-bs-surface-3/50 rounded-xl p-8 md:p-12 text-center">
          <h2 class="text-2xl font-bold text-bs-foreground-light mb-3">Ready to Build?</h2>
          <p class="text-bs-foreground-dark mb-6 max-w-lg mx-auto">
            Let's discuss your project requirements and engineering needs. No commitment required.
          </p>
          <button type="button" class="bs-btn" @click="useDialogOpen">
            Start a Conversation
          </button>
        </div>
      </section>
    </template>
  </div>
</template>
