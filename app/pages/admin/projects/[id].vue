<script setup>
definePageMeta({ middleware: 'auth.admin', layout: 'admin' })

const route = useRoute()
const router = useRouter()
const projectId = route.params.id

const { getAllProjects, updateProject } = useProjects()
const { getCategories, getTechnologies, getIndustries } = useTaxonomy()

const form = reactive({
  title: '',
  slug: '',
  short_description: '',
  full_description: '',
  client_name: '',
  client_industry: '',
  project_url: '',
  github_url: '',
  featured_image: '',
  gallery: [],
  challenge: '',
  solution: '',
  outcome: '',
  duration: '',
  completion_date: '',
  featured: false,
  published: false,
  seo_title: '',
  seo_description: '',
})

const categories = ref([])
const technologies = ref([])
const industries = ref([])
const selectedCategories = ref([])
const selectedTechnologies = ref([])
const loading = ref(true)
const saving = ref(false)

onMounted(async () => {
  try {
    const [allProjects, cats, techs, inds] = await Promise.all([
      getAllProjects(),
      getCategories(),
      getTechnologies(),
      getIndustries(),
    ])
    categories.value = cats
    technologies.value = techs
    industries.value = inds

    const project = allProjects.find(p => p.id === projectId)
    if (!project) {
      router.push('/admin/projects')
      return
    }

    Object.assign(form, {
      title: project.title,
      slug: project.slug,
      short_description: project.short_description,
      full_description: project.full_description || '',
      client_name: project.client_name || '',
      client_industry: project.client_industry || '',
      project_url: project.project_url || '',
      github_url: project.github_url || '',
      featured_image: project.featured_image || '',
      gallery: project.gallery || [],
      challenge: project.challenge || '',
      solution: project.solution || '',
      outcome: project.outcome || '',
      duration: project.duration || '',
      completion_date: project.completion_date || '',
      featured: project.featured,
      published: project.published,
      seo_title: project.seo_title || '',
      seo_description: project.seo_description || '',
    })
  }
  finally {
    loading.value = false
  }
})

function generateSlug() {
  form.slug = form.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

async function handleSave() {
  saving.value = true
  try {
    await updateProject(projectId, { ...form })
    router.push('/admin/projects')
  }
  finally {
    saving.value = false
  }
}
</script>

<template>
  <div class="max-w-4xl">
    <div class="flex items-center gap-4 mb-6">
      <a href="/admin/projects" class="p-2 rounded-lg text-bs-foreground-dark hover:text-bs-foreground-light hover:bg-bs-surface-3/50 transition-all">
        <Icon name="lucide:arrow-left" class="w-5 h-5" />
      </a>
      <div>
        <h1 class="text-2xl font-bold text-bs-foreground-light">Edit Project</h1>
        <p class="text-sm text-bs-foreground-dark mt-1">Update project details</p>
      </div>
    </div>

    <div v-if="loading" class="flex items-center justify-center py-20">
      <div class="w-8 h-8 border-2 border-bs-accent border-t-transparent rounded-full animate-spin" />
    </div>

    <form v-else @submit.prevent="handleSave" class="space-y-6">
      <!-- Basic Info -->
      <div class="bg-bs-surface-1 border border-bs-surface-3/50 rounded-xl p-6">
        <h2 class="text-lg font-semibold text-bs-foreground-light mb-4">Basic Information</h2>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-bs-foreground-dark mb-1.5">Title</label>
            <input v-model="form.title" @blur="!form.slug && generateSlug()" class="w-full px-4 py-2.5 rounded-lg bg-bs-surface-0 border border-bs-surface-3/50 text-bs-foreground-light text-sm focus:outline-none focus:border-bs-accent transition-colors" />
          </div>
          <div>
            <label class="block text-sm font-medium text-bs-foreground-dark mb-1.5">Slug</label>
            <input v-model="form.slug" class="w-full px-4 py-2.5 rounded-lg bg-bs-surface-0 border border-bs-surface-3/50 text-bs-foreground-light text-sm focus:outline-none focus:border-bs-accent transition-colors" />
          </div>
          <div>
            <label class="block text-sm font-medium text-bs-foreground-dark mb-1.5">Short Description</label>
            <textarea v-model="form.short_description" rows="2" class="w-full px-4 py-2.5 rounded-lg bg-bs-surface-0 border border-bs-surface-3/50 text-bs-foreground-light text-sm focus:outline-none focus:border-bs-accent transition-colors resize-none" />
          </div>
          <div>
            <label class="block text-sm font-medium text-bs-foreground-dark mb-1.5">Full Description</label>
            <textarea v-model="form.full_description" rows="6" class="w-full px-4 py-2.5 rounded-lg bg-bs-surface-0 border border-bs-surface-3/50 text-bs-foreground-light text-sm focus:outline-none focus:border-bs-accent transition-colors resize-y" />
          </div>
        </div>
      </div>

      <!-- Client & Dates -->
      <div class="bg-bs-surface-1 border border-bs-surface-3/50 rounded-xl p-6">
        <h2 class="text-lg font-semibold text-bs-foreground-light mb-4">Client & Timeline</h2>
        <div class="grid sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-bs-foreground-dark mb-1.5">Client Name</label>
            <input v-model="form.client_name" class="w-full px-4 py-2.5 rounded-lg bg-bs-surface-0 border border-bs-surface-3/50 text-bs-foreground-light text-sm focus:outline-none focus:border-bs-accent transition-colors" />
          </div>
          <div>
            <label class="block text-sm font-medium text-bs-foreground-dark mb-1.5">Client Industry</label>
            <input v-model="form.client_industry" class="w-full px-4 py-2.5 rounded-lg bg-bs-surface-0 border border-bs-surface-3/50 text-bs-foreground-light text-sm focus:outline-none focus:border-bs-accent transition-colors" />
          </div>
          <div>
            <label class="block text-sm font-medium text-bs-foreground-dark mb-1.5">Duration</label>
            <input v-model="form.duration" placeholder="e.g., 12 weeks" class="w-full px-4 py-2.5 rounded-lg bg-bs-surface-0 border border-bs-surface-3/50 text-bs-foreground-light text-sm focus:outline-none focus:border-bs-accent transition-colors" />
          </div>
          <div>
            <label class="block text-sm font-medium text-bs-foreground-dark mb-1.5">Completion Date</label>
            <input v-model="form.completion_date" type="date" class="w-full px-4 py-2.5 rounded-lg bg-bs-surface-0 border border-bs-surface-3/50 text-bs-foreground-light text-sm focus:outline-none focus:border-bs-accent transition-colors" />
          </div>
        </div>
      </div>

      <!-- Links & Media -->
      <div class="bg-bs-surface-1 border border-bs-surface-3/50 rounded-xl p-6">
        <h2 class="text-lg font-semibold text-bs-foreground-light mb-4">Links & Media</h2>
        <div class="space-y-4">
          <div class="grid sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-bs-foreground-dark mb-1.5">Project URL</label>
              <input v-model="form.project_url" class="w-full px-4 py-2.5 rounded-lg bg-bs-surface-0 border border-bs-surface-3/50 text-bs-foreground-light text-sm focus:outline-none focus:border-bs-accent transition-colors" />
            </div>
            <div>
              <label class="block text-sm font-medium text-bs-foreground-dark mb-1.5">GitHub URL</label>
              <input v-model="form.github_url" class="w-full px-4 py-2.5 rounded-lg bg-bs-surface-0 border border-bs-surface-3/50 text-bs-foreground-light text-sm focus:outline-none focus:border-bs-accent transition-colors" />
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-bs-foreground-dark mb-1.5">Featured Image URL</label>
            <input v-model="form.featured_image" class="w-full px-4 py-2.5 rounded-lg bg-bs-surface-0 border border-bs-surface-3/50 text-bs-foreground-light text-sm focus:outline-none focus:border-bs-accent transition-colors" />
          </div>
        </div>
      </div>

      <!-- Results & Outcome -->
      <div class="bg-bs-surface-1 border border-bs-surface-3/50 rounded-xl p-6">
        <h2 class="text-lg font-semibold text-bs-foreground-light mb-4">Results & Outcome</h2>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-bs-foreground-dark mb-1.5">Business Challenge</label>
            <textarea v-model="form.challenge" rows="3" class="w-full px-4 py-2.5 rounded-lg bg-bs-surface-0 border border-bs-surface-3/50 text-bs-foreground-light text-sm focus:outline-none focus:border-bs-accent transition-colors resize-y" />
          </div>
          <div>
            <label class="block text-sm font-medium text-bs-foreground-dark mb-1.5">Solution</label>
            <textarea v-model="form.solution" rows="3" class="w-full px-4 py-2.5 rounded-lg bg-bs-surface-0 border border-bs-surface-3/50 text-bs-foreground-light text-sm focus:outline-none focus:border-bs-accent transition-colors resize-y" />
          </div>
          <div>
            <label class="block text-sm font-medium text-bs-foreground-dark mb-1.5">Outcome</label>
            <textarea v-model="form.outcome" rows="3" class="w-full px-4 py-2.5 rounded-lg bg-bs-surface-0 border border-bs-surface-3/50 text-bs-foreground-light text-sm focus:outline-none focus:border-bs-accent transition-colors resize-y" />
          </div>
        </div>
      </div>

      <!-- SEO -->
      <div class="bg-bs-surface-1 border border-bs-surface-3/50 rounded-xl p-6">
        <h2 class="text-lg font-semibold text-bs-foreground-light mb-4">SEO</h2>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-bs-foreground-dark mb-1.5">SEO Title</label>
            <input v-model="form.seo_title" class="w-full px-4 py-2.5 rounded-lg bg-bs-surface-0 border border-bs-surface-3/50 text-bs-foreground-light text-sm focus:outline-none focus:border-bs-accent transition-colors" />
          </div>
          <div>
            <label class="block text-sm font-medium text-bs-foreground-dark mb-1.5">SEO Description</label>
            <textarea v-model="form.seo_description" rows="2" class="w-full px-4 py-2.5 rounded-lg bg-bs-surface-0 border border-bs-surface-3/50 text-bs-foreground-light text-sm focus:outline-none focus:border-bs-accent transition-colors resize-none" />
          </div>
        </div>
      </div>

      <!-- Publishing -->
      <div class="bg-bs-surface-1 border border-bs-surface-3/50 rounded-xl p-6">
        <div class="flex items-center gap-6">
          <label class="flex items-center gap-3 cursor-pointer">
            <input v-model="form.published" type="checkbox" class="w-4 h-4 rounded border-bs-surface-3 text-bs-accent focus:ring-bs-accent" />
            <span class="text-sm font-medium text-bs-foreground-light">Published</span>
          </label>
          <label class="flex items-center gap-3 cursor-pointer">
            <input v-model="form.featured" type="checkbox" class="w-4 h-4 rounded border-bs-surface-3 text-bs-accent focus:ring-bs-accent" />
            <span class="text-sm font-medium text-bs-foreground-light">Featured</span>
          </label>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex items-center gap-3">
        <button type="submit" :disabled="saving" class="bs-btn inline-flex items-center gap-2">
          <Icon v-if="saving" name="lucide:loader-2" class="w-4 h-4 animate-spin" />
          {{ saving ? 'Saving...' : 'Save Changes' }}
        </button>
        <a href="/admin/projects" class="px-4 py-2.5 rounded-lg text-sm font-medium text-bs-foreground-dark hover:text-bs-foreground-light hover:bg-bs-surface-3/50 transition-all">
          Cancel
        </a>
      </div>
    </form>
  </div>
</template>
