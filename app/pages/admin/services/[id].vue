<script setup>
definePageMeta({ middleware: 'auth.admin', layout: 'admin' })

const route = useRoute()
const router = useRouter()
const serviceId = route.params.id

const { getAllServices, updateService } = useServices()

const form = reactive({
  slug: '',
  title: '',
  short_description: '',
  full_description: '',
  icon: '',
  features: [],
  benefits: [],
  process: [],
  technologies: [],
  featured_image: '',
  seo_title: '',
  seo_description: '',
  sort_order: 0,
  published: false,
})

const loading = ref(true)
const saving = ref(false)
const newItem = ref('')
const newItemField = ref('features')

onMounted(async () => {
  try {
    const allServices = await getAllServices()
    const service = allServices.find(s => s.id === serviceId)
    if (!service) {
      router.push('/admin/services')
      return
    }
    Object.assign(form, {
      slug: service.slug,
      title: service.title,
      short_description: service.short_description || '',
      full_description: service.full_description || '',
      icon: service.icon || '',
      features: service.features || [],
      benefits: service.benefits || [],
      process: service.process || [],
      technologies: service.technologies || [],
      featured_image: service.featured_image || '',
      seo_title: service.seo_title || '',
      seo_description: service.seo_description || '',
      sort_order: service.sort_order,
      published: service.published,
    })
  }
  finally {
    loading.value = false
  }
})

function addItem() {
  if (newItem.value.trim()) {
    form[newItemField.value].push(newItem.value.trim())
    newItem.value = ''
  }
}

function removeItem(field, i) {
  form[field].splice(i, 1)
}

async function handleSave() {
  saving.value = true
  try {
    await updateService(serviceId, { ...form })
    router.push('/admin/services')
  }
  finally {
    saving.value = false
  }
}
</script>

<template>
  <div class="max-w-4xl">
    <div class="flex items-center gap-4 mb-6">
      <a href="/admin/services" class="p-2 rounded-lg text-bs-foreground-dark hover:text-bs-foreground-light hover:bg-bs-surface-3/50 transition-all">
        <Icon name="lucide:arrow-left" class="w-5 h-5" />
      </a>
      <div>
        <h1 class="text-2xl font-bold text-bs-foreground-light">Edit Service</h1>
        <p class="text-sm text-bs-foreground-dark mt-1">Update service details</p>
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
            <label class="block text-sm font-medium text-bs-foreground-dark mb-1.5">Short Description</label>
            <textarea v-model="form.short_description" rows="2" class="w-full px-4 py-2.5 rounded-lg bg-bs-surface-0 border border-bs-surface-3/50 text-bs-foreground-light text-sm focus:outline-none focus:border-bs-accent transition-colors resize-none" />
          </div>
          <div>
            <label class="block text-sm font-medium text-bs-foreground-dark mb-1.5">Full Description</label>
            <textarea v-model="form.full_description" rows="6" class="w-full px-4 py-2.5 rounded-lg bg-bs-surface-0 border border-bs-surface-3/50 text-bs-foreground-light text-sm focus:outline-none focus:border-bs-accent transition-colors resize-y" />
          </div>
          <div>
            <label class="block text-sm font-medium text-bs-foreground-dark mb-1.5">Featured Image URL</label>
            <input v-model="form.featured_image" class="w-full px-4 py-2.5 rounded-lg bg-bs-surface-0 border border-bs-surface-3/50 text-bs-foreground-light text-sm focus:outline-none focus:border-bs-accent transition-colors" />
          </div>
        </div>
      </div>

      <!-- Lists -->
      <div class="bg-bs-surface-1 border border-bs-surface-3/50 rounded-xl p-6">
        <h2 class="text-lg font-semibold text-bs-foreground-light mb-4">Features & Benefits</h2>
        <div class="space-y-4">
          <div v-for="field in ['features', 'benefits']" :key="field">
            <label class="block text-sm font-medium text-bs-foreground-dark mb-1.5 capitalize">{{ field }}</label>
            <div class="flex flex-wrap gap-2 mb-2">
              <span v-for="(item, i) in form[field]" :key="i" class="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-bs-accent/10 text-bs-accent text-sm">
                {{ item }}
                <button type="button" @click="removeItem(field, i)" class="hover:text-red-400">&times;</button>
              </span>
            </div>
            <div class="flex gap-2">
              <input v-model="newItem" @keydown.enter.prevent="newItemField = field; addItem()" :placeholder="`Add ${field.slice(0, -1)}...`" class="flex-1 px-4 py-2 rounded-lg bg-bs-surface-0 border border-bs-surface-3/50 text-bs-foreground-light text-sm focus:outline-none focus:border-bs-accent transition-colors" />
              <button type="button" @click="newItemField = field; addItem()" class="px-4 py-2 rounded-lg bg-bs-surface-3/50 text-bs-foreground-dark hover:text-bs-foreground-light text-sm transition-colors">Add</button>
            </div>
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
          <div class="flex items-center gap-2">
            <label class="text-sm font-medium text-bs-foreground-dark">Order:</label>
            <input v-model.number="form.sort_order" type="number" class="w-20 px-3 py-1.5 rounded-lg bg-bs-surface-0 border border-bs-surface-3/50 text-bs-foreground-light text-sm focus:outline-none focus:border-bs-accent transition-colors" />
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex items-center gap-3">
        <button type="submit" :disabled="saving" class="bs-btn inline-flex items-center gap-2">
          <Icon v-if="saving" name="lucide:loader-2" class="w-4 h-4 animate-spin" />
          {{ saving ? 'Saving...' : 'Save Changes' }}
        </button>
        <a href="/admin/services" class="px-4 py-2.5 rounded-lg text-sm font-medium text-bs-foreground-dark hover:text-bs-foreground-light hover:bg-bs-surface-3/50 transition-all">
          Cancel
        </a>
      </div>
    </form>
  </div>
</template>
