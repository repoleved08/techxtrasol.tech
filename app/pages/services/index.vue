<script setup>
const { getPublishedServices } = useServices()

const services = ref([])
const loading = ref(true)

useHead({
  title: 'Our Services | TechXtrasol',
  meta: [
    { name: 'description', content: 'Software engineering services — custom software, web development, mobile apps, ERP, CRM, cloud solutions, AI, and UI/UX design for businesses in Kenya.' },
  ],
})

useSeoMeta({
  ogTitle: 'Our Services | TechXtrasol',
  ogDescription: 'Software engineering services for businesses in Kenya and beyond.',
  ogImage: 'https://www.techxtrasol.tech/content-images/blog-default-og.jpg',
})

onMounted(async () => {
  try {
    services.value = await getPublishedServices()
  }
  finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="bs-mt-lg">
    <!-- Hero -->
    <section class="bs-container pt-12 pb-8">
      <div class="max-w-3xl">
        <h1 class="bs-h1">Our Services</h1>
        <p class="bs-body-text mt-4">
          End-to-end software engineering services designed to solve complex business challenges and drive measurable growth.
        </p>
      </div>
    </section>

    <!-- Loading -->
    <section v-if="loading" class="bs-container py-20">
      <div class="flex items-center justify-center">
        <div class="w-8 h-8 border-2 border-bs-accent border-t-transparent rounded-full animate-spin" />
      </div>
    </section>

    <!-- Services grid -->
    <section v-else class="bs-container pb-20">
      <div class="grid md:grid-cols-2 gap-6">
        <NuxtLink
          v-for="service in services"
          :key="service.id"
          :to="`/services/${service.slug}`"
          class="group bg-bs-surface-1 border border-bs-surface-3/50 rounded-xl p-6 hover:border-bs-accent/30 transition-all duration-300"
        >
          <h2 class="text-lg font-bold text-bs-foreground-light mb-2 group-hover:text-bs-accent transition-colors">{{ service.title }}</h2>
          <p class="text-sm text-bs-foreground-dark mb-4">{{ service.short_description }}</p>
          <div class="flex flex-wrap gap-1 mb-4">
            <span v-for="f in (service.features || []).slice(0, 4)" :key="f" class="text-xs px-2 py-0.5 rounded-full bg-bs-surface-3/50 text-bs-foreground-dark">
              {{ f }}
            </span>
          </div>
          <div class="flex items-center gap-2 text-sm text-bs-accent font-medium">
            Learn More
            <Icon name="lucide:arrow-right" class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>
