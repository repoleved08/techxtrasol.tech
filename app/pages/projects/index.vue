<script setup>
const { getPublishedProjects } = useProjects()
const { getCategories } = useTaxonomy()

const projects = ref([])
const categories = ref([])
const loading = ref(true)
const search = ref('')
const activeCategory = ref('')
const currentPage = ref(1)
const totalPages = ref(1)

useHead({
  title: 'Our Projects | TechXtrasol',
  meta: [
    { name: 'description', content: 'Explore our portfolio of software engineering projects — ERP systems, CRM platforms, mobile apps, and custom solutions built for businesses across Kenya and beyond.' },
  ],
})

useSeoMeta({
  ogTitle: 'Our Projects | TechXtrasol',
  ogDescription: 'Explore our portfolio of software engineering projects built for businesses across Kenya and beyond.',
  ogImage: '/content-images/blog-default-og.jpg',
})

async function loadProjects(page = 1) {
  loading.value = true
  try {
    const result = await getPublishedProjects({
      search: search.value || undefined,
      category: activeCategory.value || undefined,
      page,
      per_page: 12,
    })
    projects.value = result.data
    totalPages.value = result.total_pages
    currentPage.value = result.page
  }
  finally {
    loading.value = false
  }
}

onMounted(async () => {
  categories.value = await getCategories()
  await loadProjects()
})

let searchTimeout = null

function handleSearch() {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => loadProjects(), 300)
}

function setCategory(slug) {
  activeCategory.value = activeCategory.value === slug ? '' : slug
  loadProjects(1)
}

function goToPage(page) {
  loadProjects(page)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

useSchemaOrg([
  {
    '@type': 'CollectionPage',
    name: 'Our Projects',
    description: 'Portfolio of software engineering projects by TechXtrasol.',
    url: 'https://techxtrasol.tech/projects',
  },
])
</script>

<template>
  <div class="bs-mt-lg">
    <!-- Hero -->
    <section class="bs-container pt-12 pb-8">
      <div class="max-w-3xl">
        <h1 class="bs-h1">Our Projects</h1>
        <p class="bs-body-text mt-4">
          From enterprise ERP systems to mobile-first consumer apps — every project represents a partnership built on trust, engineering excellence, and measurable results.
        </p>
      </div>
    </section>

    <!-- Filters -->
    <section class="bs-container pb-8">
      <div class="flex flex-col md:flex-row gap-4 items-start md:items-center">
        <!-- Search -->
        <div class="relative flex-1 max-w-md">
          <Icon name="lucide:search" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-bs-foreground-dark" />
          <input
            v-model="search"
            type="text"
            placeholder="Search projects..."
            class="w-full pl-10 pr-4 py-2.5 rounded-lg bg-bs-surface-1 border border-bs-surface-3/50 text-bs-foreground-light text-sm placeholder:text-bs-foreground-dark focus:outline-none focus:border-bs-accent transition-colors"
            @input="handleSearch"
          />
        </div>

        <!-- Category pills -->
        <div class="flex flex-wrap gap-2">
          <button
            v-for="cat in categories"
            :key="cat.slug"
            class="px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200"
            :class="activeCategory === cat.slug ? 'bg-bs-accent text-white' : 'bg-bs-surface-1 border border-bs-surface-3/50 text-bs-foreground-dark hover:text-bs-foreground-light hover:border-bs-surface-3'"
            @click="setCategory(cat.slug)"
          >
            {{ cat.name }}
          </button>
        </div>
      </div>
    </section>

    <!-- Loading -->
    <section v-if="loading" class="bs-container py-20">
      <div class="flex items-center justify-center">
        <div class="w-8 h-8 border-2 border-bs-accent border-t-transparent rounded-full animate-spin" />
      </div>
    </section>

    <!-- Projects grid -->
    <section v-else class="bs-container pb-20">
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <NuxtLink
          v-for="project in projects"
          :key="project.id"
          :to="`/projects/${project.slug}`"
          class="group bg-bs-surface-1 border border-bs-surface-3/50 rounded-xl overflow-hidden hover:border-bs-accent/30 transition-all duration-300"
        >
          <!-- Image -->
          <div class="h-48 bg-bs-surface-3/50 overflow-hidden">
            <img
              v-if="project.featured_image"
              :src="project.featured_image"
              :alt="project.title"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div v-else class="w-full h-full flex items-center justify-center">
              <Icon name="lucide:briefcase" class="w-12 h-12 text-bs-surface-3" />
            </div>
          </div>

          <!-- Content -->
          <div class="p-5">
            <div class="flex items-center gap-2 mb-2">
              <span v-if="project.featured" class="text-xs px-2 py-0.5 rounded-full bg-bs-accent/10 text-bs-accent">Featured</span>
              <span v-if="project.client_name" class="text-xs text-bs-foreground-dark">{{ project.client_name }}</span>
            </div>
            <h3 class="font-semibold text-bs-foreground-light mb-2 group-hover:text-bs-accent transition-colors">{{ project.title }}</h3>
            <p class="text-sm text-bs-foreground-dark line-clamp-2 mb-3">{{ project.short_description }}</p>
            <div class="flex flex-wrap gap-1">
              <span
                v-for="tech in (project.technologies || []).slice(0, 4)"
                :key="tech"
                class="text-xs px-2 py-0.5 rounded-full bg-bs-surface-3/50 text-bs-foreground-dark"
              >
                {{ tech }}
              </span>
            </div>
          </div>
        </NuxtLink>
      </div>

      <!-- Empty state -->
      <div v-if="projects.length === 0" class="text-center py-20">
        <Icon name="lucide:briefcase" class="w-16 h-16 text-bs-surface-3 mx-auto mb-4" />
        <p class="text-bs-foreground-dark">No projects found. Check back soon.</p>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="flex items-center justify-center gap-2 mt-12">
        <button
          v-for="page in totalPages"
          :key="page"
          class="w-10 h-10 rounded-lg text-sm font-medium transition-all"
          :class="currentPage === page ? 'bg-bs-accent text-white' : 'bg-bs-surface-1 border border-bs-surface-3/50 text-bs-foreground-dark hover:text-bs-foreground-light'"
          @click="goToPage(page)"
        >
          {{ page }}
        </button>
      </div>
    </section>
  </div>
</template>
