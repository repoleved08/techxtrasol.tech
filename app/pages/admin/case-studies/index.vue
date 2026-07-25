<script setup>
definePageMeta({ middleware: 'auth-admin', layout: 'admin' })

const { getAllCaseStudies, deleteCaseStudy, togglePublish } = useCaseStudies()

const caseStudies = ref([])
const loading = ref(true)
const search = ref('')

async function loadCaseStudies() {
  loading.value = true
  try {
    caseStudies.value = await getAllCaseStudies()
  }
  finally {
    loading.value = false
  }
}

onMounted(loadCaseStudies)

const filteredCaseStudies = computed(() => {
  if (!search.value) return caseStudies.value
  const q = search.value.toLowerCase()
  return caseStudies.value.filter(cs => cs.title.toLowerCase().includes(q))
})

async function handleDelete(id) {
  if (!confirm('Are you sure you want to delete this case study?')) return
  await deleteCaseStudy(id)
  await loadCaseStudies()
}

async function handleTogglePublish(id, current) {
  await togglePublish(id, !current)
  await loadCaseStudies()
}
</script>

<template>
  <div>
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div>
        <h1 class="text-2xl font-bold text-bs-foreground-light">Case Studies</h1>
        <p class="text-sm text-bs-foreground-dark mt-1">Manage your case studies</p>
      </div>
      <a href="/admin/case-studies/new" class="bs-btn inline-flex items-center gap-2">
        <Icon name="lucide:plus" class="w-4 h-4" />
        New Case Study
      </a>
    </div>

    <!-- Search -->
    <div class="relative mb-6">
      <Icon name="lucide:search" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-bs-foreground-dark" />
      <input
        v-model="search"
        type="text"
        placeholder="Search case studies..."
        class="w-full max-w-md pl-10 pr-4 py-2.5 rounded-lg bg-bs-surface-1 border border-bs-surface-3/50 text-bs-foreground-light text-sm placeholder:text-bs-foreground-dark focus:outline-none focus:border-bs-accent transition-colors"
      />
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex items-center justify-center py-20">
      <div class="w-8 h-8 border-2 border-bs-accent border-t-transparent rounded-full animate-spin" />
    </div>

    <!-- Grid -->
    <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="cs in filteredCaseStudies"
        :key="cs.id"
        class="bg-bs-surface-1 border border-bs-surface-3/50 rounded-xl overflow-hidden hover:border-bs-surface-3 transition-colors"
      >
        <div v-if="cs.featured_image" class="h-40 bg-bs-surface-3/50">
          <img :src="cs.featured_image" :alt="cs.title" class="w-full h-full object-cover" />
        </div>
        <div class="p-4">
          <div class="flex items-start justify-between gap-2 mb-2">
            <h3 class="font-semibold text-bs-foreground-light text-sm line-clamp-2">{{ cs.title }}</h3>
            <button
              class="shrink-0 text-xs px-2 py-0.5 rounded-full transition-colors"
              :class="cs.published ? 'bg-green-400/10 text-green-400' : 'bg-yellow-400/10 text-yellow-400'"
              @click="handleTogglePublish(cs.id, cs.published)"
            >
              {{ cs.published ? 'Live' : 'Draft' }}
            </button>
          </div>
          <p class="text-xs text-bs-foreground-dark line-clamp-2 mb-3">{{ cs.introduction || 'No introduction' }}</p>
          <div class="flex items-center gap-2">
            <a :href="`/admin/case-studies/${cs.id}`" class="flex-1 text-center px-3 py-1.5 rounded-lg text-xs font-medium bg-bs-surface-3/50 text-bs-foreground-dark hover:text-bs-foreground-light transition-colors">
              Edit
            </a>
            <button class="px-3 py-1.5 rounded-lg text-xs font-medium text-red-400 hover:bg-red-500/10 transition-colors" @click="handleDelete(cs.id)">
              Delete
            </button>
          </div>
        </div>
      </div>

      <div v-if="filteredCaseStudies.length === 0" class="col-span-full py-12 text-center text-bs-foreground-dark text-sm">
        No case studies found.
      </div>
    </div>
  </div>
</template>
