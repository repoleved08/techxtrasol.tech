<script setup>
const route = useRoute()
const slug = route.params.slug

const { getProjectBySlug, getRelatedProjects } = useProjects()
const { getCaseStudyByProjectId } = useCaseStudies()

const project = ref(null)
const relatedProjects = ref([])
const caseStudy = ref(null)
const loading = ref(true)

onMounted(async () => {
  try {
    project.value = await getProjectBySlug(slug)
    if (project.value) {
      const [related, cs] = await Promise.all([
        getRelatedProjects(slug, 3),
        getCaseStudyByProjectId(project.value.id),
      ])
      relatedProjects.value = related
      caseStudy.value = cs
    }
  }
  finally {
    loading.value = false
  }
})

useHead({
  title: () => project.value?.seo_title || project.value?.title ? `${project.value.title} | TechXtrasol` : 'Project | TechXtrasol',
  meta: [
    { name: 'description', content: () => project.value?.seo_description || project.value?.short_description || '' },
    { property: 'og:title', content: () => project.value?.seo_title || project.value?.title || '' },
    { property: 'og:description', content: () => project.value?.seo_description || project.value?.short_description || '' },
    { property: 'og:image', content: () => project.value?.featured_image || '/1200x630.jpg' },
  ],
})

useSeoMeta({
  ogTitle: () => project.value?.seo_title || project.value?.title || '',
  ogDescription: () => project.value?.seo_description || project.value?.short_description || '',
  ogImage: () => project.value?.featured_image || '/1200x630.jpg',
})

useSchemaOrg(() => {
  if (!project.value) return []
  return [
    {
      '@type': 'SoftwareApplication',
      name: project.value.title,
      description: project.value.short_description,
      applicationCategory: 'BusinessApplication',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'KES' },
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
    <div v-else-if="!project" class="bs-container py-20 text-center">
      <h1 class="bs-h1 mb-4">Project Not Found</h1>
      <p class="bs-body-text mb-8">The project you're looking for doesn't exist or has been removed.</p>
      <a href="/projects" class="bs-btn">View All Projects</a>
    </div>

    <template v-else>
      <!-- Hero -->
      <section class="bs-container pt-12 pb-12">
        <div class="max-w-4xl">
          <!-- Breadcrumbs -->
          <nav class="flex items-center gap-2 text-sm text-bs-foreground-dark mb-6">
            <a href="/" class="hover:text-bs-foreground-light transition-colors">Home</a>
            <span>/</span>
            <a href="/projects" class="hover:text-bs-foreground-light transition-colors">Projects</a>
            <span>/</span>
            <span class="text-bs-foreground-light">{{ project.title }}</span>
          </nav>

          <div class="flex items-center gap-3 mb-4">
            <span v-if="project.featured" class="text-xs px-2.5 py-1 rounded-full bg-bs-accent/10 text-bs-accent font-medium">Featured</span>
            <span v-if="project.client_industry" class="text-xs px-2.5 py-1 rounded-full bg-bs-surface-3/50 text-bs-foreground-dark">{{ project.client_industry }}</span>
          </div>

          <h1 class="bs-h1 mb-4">{{ project.title }}</h1>
          <p class="bs-body-text text-lg">{{ project.short_description }}</p>

          <!-- Quick stats -->
          <div class="flex flex-wrap gap-6 mt-8">
            <div v-if="project.client_name">
              <p class="text-xs text-bs-foreground-dark uppercase tracking-wider mb-1">Client</p>
              <p class="text-sm font-medium text-bs-foreground-light">{{ project.client_name }}</p>
            </div>
            <div v-if="project.duration">
              <p class="text-xs text-bs-foreground-dark uppercase tracking-wider mb-1">Duration</p>
              <p class="text-sm font-medium text-bs-foreground-light">{{ project.duration }}</p>
            </div>
            <div v-if="project.completion_date">
              <p class="text-xs text-bs-foreground-dark uppercase tracking-wider mb-1">Completed</p>
              <p class="text-sm font-medium text-bs-foreground-light">{{ new Date(project.completion_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Featured image -->
      <section v-if="project.featured_image" class="bs-container pb-12">
        <div class="rounded-xl overflow-hidden border border-bs-surface-3/50">
          <img :src="project.featured_image" :alt="project.title" class="w-full h-auto" loading="lazy" />
        </div>
      </section>

      <!-- Content -->
      <section class="bs-container pb-16">
        <div class="grid lg:grid-cols-3 gap-12">
          <!-- Main content -->
          <div class="lg:col-span-2 space-y-12">
            <!-- Challenge -->
            <div v-if="project.challenge">
              <h2 class="text-xl font-bold text-bs-foreground-light mb-4">The Challenge</h2>
              <p class="bs-body-text">{{ project.challenge }}</p>
            </div>

            <!-- Solution -->
            <div v-if="project.solution">
              <h2 class="text-xl font-bold text-bs-foreground-light mb-4">Our Solution</h2>
              <p class="bs-body-text">{{ project.solution }}</p>
            </div>

            <!-- Outcome -->
            <div v-if="project.outcome">
              <h2 class="text-xl font-bold text-bs-foreground-light mb-4">The Outcome</h2>
              <p class="bs-body-text">{{ project.outcome }}</p>
            </div>

            <!-- Full description -->
            <div v-if="project.full_description">
              <h2 class="text-xl font-bold text-bs-foreground-light mb-4">Project Overview</h2>
              <div class="bs-body-text prose prose-invert max-w-none">{{ project.full_description }}</div>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="space-y-6">
            <!-- Technologies -->
            <div v-if="project.technologies?.length" class="bg-bs-surface-1 border border-bs-surface-3/50 rounded-xl p-5">
              <h3 class="font-semibold text-bs-foreground-light mb-3">Technologies</h3>
              <div class="flex flex-wrap gap-2">
                <span v-for="tech in project.technologies" :key="tech" class="text-xs px-3 py-1 rounded-full bg-bs-accent/10 text-bs-accent">
                  {{ tech }}
                </span>
              </div>
            </div>

            <!-- Services -->
            <div v-if="project.services?.length" class="bg-bs-surface-1 border border-bs-surface-3/50 rounded-xl p-5">
              <h3 class="font-semibold text-bs-foreground-light mb-3">Services</h3>
              <div class="space-y-2">
                <p v-for="svc in project.services" :key="svc" class="text-sm text-bs-foreground-dark">{{ svc }}</p>
              </div>
            </div>

            <!-- Links -->
            <div class="bg-bs-surface-1 border border-bs-surface-3/50 rounded-xl p-5 space-y-3">
              <h3 class="font-semibold text-bs-foreground-light mb-3">Links</h3>
              <a v-if="project.project_url" :href="project.project_url" target="_blank" rel="noopener" class="flex items-center gap-2 text-sm text-bs-accent hover:underline">
                <Icon name="lucide:external-link" class="w-4 h-4" />
                Visit Live Site
              </a>
              <a v-if="project.github_url" :href="project.github_url" target="_blank" rel="noopener" class="flex items-center gap-2 text-sm text-bs-foreground-dark hover:text-bs-foreground-light transition-colors">
                <Icon name="lucide:github" class="w-4 h-4" />
                View on GitHub
              </a>
            </div>

            <!-- CTA -->
            <div class="bg-bs-surface-1 border border-bs-surface-3/50 rounded-xl p-5">
              <h3 class="font-semibold text-bs-foreground-light mb-2">Similar Project in Mind?</h3>
              <p class="text-sm text-bs-foreground-dark mb-4">Let's discuss how we can build something great together.</p>
              <button type="button" class="w-full bs-btn text-sm" @click="useDialogOpen">
                Start a Conversation
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Related Projects -->
      <section v-if="relatedProjects.length" class="bs-container pb-20">
        <h2 class="text-xl font-bold text-bs-foreground-light mb-8">Related Projects</h2>
        <div class="grid md:grid-cols-3 gap-6">
          <NuxtLink
            v-for="rp in relatedProjects"
            :key="rp.id"
            :to="`/projects/${rp.slug}`"
            class="group bg-bs-surface-1 border border-bs-surface-3/50 rounded-xl overflow-hidden hover:border-bs-accent/30 transition-all duration-300"
          >
            <div class="h-36 bg-bs-surface-3/50 overflow-hidden">
              <img v-if="rp.featured_image" :src="rp.featured_image" :alt="rp.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
            </div>
            <div class="p-4">
              <h3 class="font-semibold text-bs-foreground-light text-sm group-hover:text-bs-accent transition-colors">{{ rp.title }}</h3>
              <p class="text-xs text-bs-foreground-dark mt-1 line-clamp-2">{{ rp.short_description }}</p>
            </div>
          </NuxtLink>
        </div>
      </section>
    </template>
  </div>
</template>
