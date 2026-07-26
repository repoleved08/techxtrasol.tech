<script setup>
definePageMeta({ middleware: 'auth-admin', layout: 'admin' })

const route = useRoute()
const router = useRouter()
const studyId = route.params.id
const isNew = computed(() => studyId === 'new')

const { getAllCaseStudies, createCaseStudy, updateCaseStudy } = useCaseStudies()
const { getAllProjects } = useProjects()

const form = reactive({
  slug: '',
  title: '',
  introduction: '',
  business_problem: '',
  objectives: [],
  approach: '',
  implementation: '',
  results: [],
  lessons: '',
  conclusion: '',
  featured_image: '',
  seo_title: '',
  seo_description: '',
  published: false,
  project_id: '',
})

const projects = ref([])
const loading = ref(!isNew.value)
const saving = ref(false)
const newObjective = ref('')
const newResult = ref('')

onMounted(async () => {
  try {
    const allProjects = await getAllProjects()
    projects.value = allProjects

    if (!isNew.value) {
      const allStudies = await getAllCaseStudies()
      const study = allStudies.find(s => s.id === studyId)
      if (!study) {
        router.push('/admin/case-studies')
        return
      }

      Object.assign(form, {
        slug: study.slug,
        title: study.title,
        introduction: study.introduction || '',
        business_problem: study.business_problem || '',
        objectives: study.objectives || [],
        approach: study.approach || '',
        implementation: study.implementation || '',
        results: study.results || [],
        lessons: study.lessons || '',
        conclusion: study.conclusion || '',
        featured_image: study.featured_image || '',
        seo_title: study.seo_title || '',
        seo_description: study.seo_description || '',
        published: study.published,
        project_id: study.project_id || '',
      })
    }
  }
  finally {
    loading.value = false
  }
})

function addObjective() {
  if (newObjective.value.trim()) {
    form.objectives.push(newObjective.value.trim())
    newObjective.value = ''
  }
}

function removeObjective(i) {
  form.objectives.splice(i, 1)
}

function addResult() {
  if (newResult.value.trim()) {
    form.results.push(newResult.value.trim())
    newResult.value = ''
  }
}

function removeResult(i) {
  form.results.splice(i, 1)
}

async function handleSave() {
  saving.value = true
  try {
    if (isNew.value) {
      await createCaseStudy({ ...form })
    } else {
      await updateCaseStudy(studyId, { ...form })
    }
    router.push('/admin/case-studies')
  }
  finally {
    saving.value = false
  }
}
</script>

<template>
  <div class="max-w-4xl">
    <div class="flex items-center gap-4 mb-6">
      <a href="/admin/case-studies" class="p-2 rounded-lg text-bs-foreground-dark hover:text-bs-foreground-light hover:bg-bs-surface-3/50 transition-all">
        <Icon name="lucide:arrow-left" class="w-5 h-5" />
      </a>
      <div>
        <h1 class="text-2xl font-bold text-bs-foreground-light">{{ isNew ? 'New Case Study' : 'Edit Case Study' }}</h1>
        <p class="text-sm text-bs-foreground-dark mt-1">{{ isNew ? 'Create a new case study' : 'Update case study details' }}</p>
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
          <div class="grid sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-bs-foreground-dark mb-1.5">Title</label>
              <input v-model="form.title" class="w-full px-4 py-2.5 rounded-lg bg-bs-surface-0 border border-bs-surface-3/50 text-bs-foreground-light text-sm focus:outline-none focus:border-bs-accent transition-colors" />
            </div>
            <div>
              <label class="block text-sm font-medium text-bs-foreground-dark mb-1.5">Slug</label>
              <input v-model="form.slug" class="w-full px-4 py-2.5 rounded-lg bg-bs-surface-0 border border-bs-surface-3/50 text-bs-foreground-light text-sm focus:outline-none focus:border-bs-accent transition-colors" />
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-bs-foreground-dark mb-1.5">Introduction</label>
            <textarea v-model="form.introduction" rows="3" class="w-full px-4 py-2.5 rounded-lg bg-bs-surface-0 border border-bs-surface-3/50 text-bs-foreground-light text-sm focus:outline-none focus:border-bs-accent transition-colors resize-y" />
          </div>
          <div>
            <label class="block text-sm font-medium text-bs-foreground-dark mb-1.5">Featured Image URL</label>
            <input v-model="form.featured_image" class="w-full px-4 py-2.5 rounded-lg bg-bs-surface-0 border border-bs-surface-3/50 text-bs-foreground-light text-sm focus:outline-none focus:border-bs-accent transition-colors" />
          </div>
        </div>
      </div>

      <!-- Problem & Approach -->
      <div class="bg-bs-surface-1 border border-bs-surface-3/50 rounded-xl p-6">
        <h2 class="text-lg font-semibold text-bs-foreground-light mb-4">Problem & Approach</h2>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-bs-foreground-dark mb-1.5">Business Problem</label>
            <textarea v-model="form.business_problem" rows="4" class="w-full px-4 py-2.5 rounded-lg bg-bs-surface-0 border border-bs-surface-3/50 text-bs-foreground-light text-sm focus:outline-none focus:border-bs-accent transition-colors resize-y" />
          </div>
          <div>
            <label class="block text-sm font-medium text-bs-foreground-dark mb-1.5">Objectives</label>
            <div class="flex flex-wrap gap-2 mb-2">
              <span v-for="(obj, i) in form.objectives" :key="i" class="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-bs-accent/10 text-bs-accent text-sm">
                {{ obj }}
                <button type="button" @click="removeObjective(i)" class="hover:text-red-400">&times;</button>
              </span>
            </div>
            <div class="flex gap-2">
              <input v-model="newObjective" @keydown.enter.prevent="addObjective" placeholder="Add objective..." class="flex-1 px-4 py-2 rounded-lg bg-bs-surface-0 border border-bs-surface-3/50 text-bs-foreground-light text-sm focus:outline-none focus:border-bs-accent transition-colors" />
              <button type="button" @click="addObjective" class="px-4 py-2 rounded-lg bg-bs-surface-3/50 text-bs-foreground-dark hover:text-bs-foreground-light text-sm transition-colors">Add</button>
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-bs-foreground-dark mb-1.5">Approach</label>
            <textarea v-model="form.approach" rows="4" class="w-full px-4 py-2.5 rounded-lg bg-bs-surface-0 border border-bs-surface-3/50 text-bs-foreground-light text-sm focus:outline-none focus:border-bs-accent transition-colors resize-y" />
          </div>
          <div>
            <label class="block text-sm font-medium text-bs-foreground-dark mb-1.5">Implementation</label>
            <textarea v-model="form.implementation" rows="4" class="w-full px-4 py-2.5 rounded-lg bg-bs-surface-0 border border-bs-surface-3/50 text-bs-foreground-light text-sm focus:outline-none focus:border-bs-accent transition-colors resize-y" />
          </div>
        </div>
      </div>

      <!-- Results & Conclusion -->
      <div class="bg-bs-surface-1 border border-bs-surface-3/50 rounded-xl p-6">
        <h2 class="text-lg font-semibold text-bs-foreground-light mb-4">Results & Conclusion</h2>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-bs-foreground-dark mb-1.5">Results</label>
            <div class="flex flex-wrap gap-2 mb-2">
              <span v-for="(res, i) in form.results" :key="i" class="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-400/10 text-green-400 text-sm">
                {{ res }}
                <button type="button" @click="removeResult(i)" class="hover:text-red-400">&times;</button>
              </span>
            </div>
            <div class="flex gap-2">
              <input v-model="newResult" @keydown.enter.prevent="addResult" placeholder="Add result..." class="flex-1 px-4 py-2 rounded-lg bg-bs-surface-0 border border-bs-surface-3/50 text-bs-foreground-light text-sm focus:outline-none focus:border-bs-accent transition-colors" />
              <button type="button" @click="addResult" class="px-4 py-2 rounded-lg bg-bs-surface-3/50 text-bs-foreground-dark hover:text-bs-foreground-light text-sm transition-colors">Add</button>
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-bs-foreground-dark mb-1.5">Lessons Learned</label>
            <textarea v-model="form.lessons" rows="3" class="w-full px-4 py-2.5 rounded-lg bg-bs-surface-0 border border-bs-surface-3/50 text-bs-foreground-light text-sm focus:outline-none focus:border-bs-accent transition-colors resize-y" />
          </div>
          <div>
            <label class="block text-sm font-medium text-bs-foreground-dark mb-1.5">Conclusion</label>
            <textarea v-model="form.conclusion" rows="3" class="w-full px-4 py-2.5 rounded-lg bg-bs-surface-0 border border-bs-surface-3/50 text-bs-foreground-light text-sm focus:outline-none focus:border-bs-accent transition-colors resize-y" />
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
        <label class="flex items-center gap-3 cursor-pointer">
          <input v-model="form.published" type="checkbox" class="w-4 h-4 rounded border-bs-surface-3 text-bs-accent focus:ring-bs-accent" />
          <span class="text-sm font-medium text-bs-foreground-light">Published</span>
        </label>
      </div>

      <!-- Actions -->
      <div class="flex items-center gap-3">
        <button type="submit" :disabled="saving" class="bs-btn inline-flex items-center gap-2">
          <Icon v-if="saving" name="lucide:loader-2" class="w-4 h-4 animate-spin" />
          {{ saving ? 'Saving...' : (isNew ? 'Create Case Study' : 'Save Changes') }}
        </button>
        <a href="/admin/case-studies" class="px-4 py-2.5 rounded-lg text-sm font-medium text-bs-foreground-dark hover:text-bs-foreground-light hover:bg-bs-surface-3/50 transition-all">
          Cancel
        </a>
      </div>
    </form>
  </div>
</template>
