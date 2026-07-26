<script setup>
definePageMeta({ middleware: 'auth-admin', layout: 'admin' })

const route = useRoute()
const router = useRouter()
const templateId = route.params.id
const isNew = computed(() => templateId === 'new')

const { getAllTemplates, createTemplate, updateTemplate } = useUiTemplates()

const form = reactive({
  slug: '',
  title: '',
  description: '',
  price: '',
  price_amount: null,
  demo_url: '',
  preview_image: '',
  category: 'landing-page',
  features: [],
  tech_stack: [],
  featured: false,
  published: false,
})

const loading = ref(!isNew.value)
const saving = ref(false)
const newFeature = ref('')
const newTech = ref('')

const categories = [
  { value: 'landing-page', label: 'Landing Page' },
  { value: 'portfolio', label: 'Portfolio' },
  { value: 'saas', label: 'SaaS' },
  { value: 'ecommerce', label: 'E-Commerce' },
  { value: 'dashboard', label: 'Dashboard' },
  { value: 'ui-kit', label: 'UI Kit' },
]

onMounted(async () => {
  if (!isNew.value) {
    try {
      const all = await getAllTemplates()
      const t = all.find(x => x.id === templateId)
      if (!t) { router.push('/admin/ui-templates'); return }
      Object.assign(form, {
        slug: t.slug,
        title: t.title,
        description: t.description || '',
        price: t.price || '',
        price_amount: t.price_amount,
        demo_url: t.demo_url || '',
        preview_image: t.preview_image || '',
        category: t.category || 'landing-page',
        features: t.features || [],
        tech_stack: t.tech_stack || [],
        featured: t.featured,
        published: t.published,
      })
    }
    finally {
      loading.value = false
    }
  }
})

function generateSlug() {
  form.slug = form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

function addFeature() {
  if (newFeature.value.trim()) { form.features.push(newFeature.value.trim()); newFeature.value = '' }
}
function removeFeature(i) { form.features.splice(i, 1) }

function addTech() {
  if (newTech.value.trim()) { form.tech_stack.push(newTech.value.trim()); newTech.value = '' }
}
function removeTech(i) { form.tech_stack.splice(i, 1) }

async function handleSave() {
  saving.value = true
  try {
    if (isNew.value) {
      await createTemplate({ ...form })
    } else {
      await updateTemplate(templateId, { ...form })
    }
    router.push('/admin/ui-templates')
  }
  finally {
    saving.value = false
  }
}
</script>

<template>
  <div class="max-w-4xl">
    <div class="flex items-center gap-4 mb-6">
      <a href="/admin/ui-templates" class="p-2 rounded-lg text-bs-foreground-dark hover:text-bs-foreground-light hover:bg-bs-surface-3/50 transition-all">
        <Icon name="lucide:arrow-left" class="w-5 h-5" />
      </a>
      <div>
        <h1 class="text-2xl font-bold text-bs-foreground-light">{{ isNew ? 'New UI Template' : 'Edit UI Template' }}</h1>
        <p class="text-sm text-bs-foreground-dark mt-1">{{ isNew ? 'Add a premium landing page or UI kit' : 'Update template details' }}</p>
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
          <div class="grid sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-bs-foreground-dark mb-1.5">Slug</label>
              <input v-model="form.slug" class="w-full px-4 py-2.5 rounded-lg bg-bs-surface-0 border border-bs-surface-3/50 text-bs-foreground-light text-sm focus:outline-none focus:border-bs-accent transition-colors" />
            </div>
            <div>
              <label class="block text-sm font-medium text-bs-foreground-dark mb-1.5">Category</label>
              <select v-model="form.category" class="w-full px-4 py-2.5 rounded-lg bg-bs-surface-0 border border-bs-surface-3/50 text-bs-foreground-light text-sm focus:outline-none focus:border-bs-accent transition-colors">
                <option v-for="cat in categories" :key="cat.value" :value="cat.value">{{ cat.label }}</option>
              </select>
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-bs-foreground-dark mb-1.5">Description</label>
            <textarea v-model="form.description" rows="3" class="w-full px-4 py-2.5 rounded-lg bg-bs-surface-0 border border-bs-surface-3/50 text-bs-foreground-light text-sm focus:outline-none focus:border-bs-accent transition-colors resize-y" />
          </div>
        </div>
      </div>

      <!-- Pricing & Demo -->
      <div class="bg-bs-surface-1 border border-bs-surface-3/50 rounded-xl p-6">
        <h2 class="text-lg font-semibold text-bs-foreground-light mb-4">Pricing & Demo</h2>
        <div class="grid sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-bs-foreground-dark mb-1.5">Price (display)</label>
            <input v-model="form.price" placeholder="e.g., KES 15,000" class="w-full px-4 py-2.5 rounded-lg bg-bs-surface-0 border border-bs-surface-3/50 text-bs-foreground-light text-sm focus:outline-none focus:border-bs-accent transition-colors" />
          </div>
          <div>
            <label class="block text-sm font-medium text-bs-foreground-dark mb-1.5">Price (numeric, for sorting)</label>
            <input v-model.number="form.price_amount" type="number" class="w-full px-4 py-2.5 rounded-lg bg-bs-surface-0 border border-bs-surface-3/50 text-bs-foreground-light text-sm focus:outline-none focus:border-bs-accent transition-colors" />
          </div>
        </div>
        <div class="mt-4">
          <label class="block text-sm font-medium text-bs-foreground-dark mb-1.5">Demo URL</label>
          <input v-model="form.demo_url" placeholder="https://..." class="w-full px-4 py-2.5 rounded-lg bg-bs-surface-0 border border-bs-surface-3/50 text-bs-foreground-light text-sm focus:outline-none focus:border-bs-accent transition-colors" />
        </div>
      </div>

      <!-- Preview Image -->
      <div class="bg-bs-surface-1 border border-bs-surface-3/50 rounded-xl p-6">
        <ImageUpload v-model="form.preview_image" label="Preview Image" folder="ui-templates" />
      </div>

      <!-- Features -->
      <div class="bg-bs-surface-1 border border-bs-surface-3/50 rounded-xl p-6">
        <h2 class="text-lg font-semibold text-bs-foreground-light mb-4">Features</h2>
        <div class="flex flex-wrap gap-2 mb-3">
          <span v-for="(f, i) in form.features" :key="i" class="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-bs-accent/10 text-bs-accent text-sm">
            {{ f }}
            <button type="button" @click="removeFeature(i)" class="hover:text-red-400">&times;</button>
          </span>
        </div>
        <div class="flex gap-2">
          <input v-model="newFeature" @keydown.enter.prevent="addFeature" placeholder="Add feature..." class="flex-1 px-4 py-2 rounded-lg bg-bs-surface-0 border border-bs-surface-3/50 text-bs-foreground-light text-sm focus:outline-none focus:border-bs-accent transition-colors" />
          <button type="button" @click="addFeature" class="px-4 py-2 rounded-lg bg-bs-surface-3/50 text-bs-foreground-dark hover:text-bs-foreground-light text-sm transition-colors">Add</button>
        </div>
      </div>

      <!-- Tech Stack -->
      <div class="bg-bs-surface-1 border border-bs-surface-3/50 rounded-xl p-6">
        <h2 class="text-lg font-semibold text-bs-foreground-light mb-4">Tech Stack</h2>
        <div class="flex flex-wrap gap-2 mb-3">
          <span v-for="(t, i) in form.tech_stack" :key="i" class="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-400/10 text-green-400 text-sm">
            {{ t }}
            <button type="button" @click="removeTech(i)" class="hover:text-red-400">&times;</button>
          </span>
        </div>
        <div class="flex gap-2">
          <input v-model="newTech" @keydown.enter.prevent="addTech" placeholder="Add technology..." class="flex-1 px-4 py-2 rounded-lg bg-bs-surface-0 border border-bs-surface-3/50 text-bs-foreground-light text-sm focus:outline-none focus:border-bs-accent transition-colors" />
          <button type="button" @click="addTech" class="px-4 py-2 rounded-lg bg-bs-surface-3/50 text-bs-foreground-dark hover:text-bs-foreground-light text-sm transition-colors">Add</button>
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
          {{ saving ? 'Saving...' : (isNew ? 'Create Template' : 'Save Changes') }}
        </button>
        <a href="/admin/ui-templates" class="px-4 py-2.5 rounded-lg text-sm font-medium text-bs-foreground-dark hover:text-bs-foreground-light hover:bg-bs-surface-3/50 transition-all">
          Cancel
        </a>
      </div>
    </form>
  </div>
</template>
