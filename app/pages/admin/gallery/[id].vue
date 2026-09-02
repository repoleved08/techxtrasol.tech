<script setup>
definePageMeta({ middleware: 'auth-admin', layout: 'admin' })

const route = useRoute()
const router = useRouter()
const itemId = route.params.id
const isNew = computed(() => itemId === 'new')

const { getAllGallery, createGalleryItem, updateGalleryItem } = useGallery()

const form = reactive({
  title: '',
  description: '',
  image_url: '',
  category: 'design',
  project_name: '',
  client_name: '',
  featured: false,
  published: false,
  sort_order: 0,
})

const loading = ref(!isNew.value)
const saving = ref(false)

const categories = [
  { value: 'design', label: 'Graphic Design' },
  { value: 'branding', label: 'Branding' },
  { value: 'social-media', label: 'Social Media' },
  { value: 'ui-ux', label: 'UI/UX Design' },
  { value: 'print', label: 'Print Design' },
  { value: 'canva', label: 'Canva' },
  { value: 'photoshop', label: 'Photoshop' },
  { value: 'illustrator', label: 'Illustrator' },
]

onMounted(async () => {
  if (!isNew.value) {
    try {
      const all = await getAllGallery()
      const item = all.find(x => x.id === itemId)
      if (!item) { router.push('/admin/gallery'); return }
      Object.assign(form, {
        title: item.title,
        description: item.description || '',
        image_url: item.image_url,
        category: item.category || 'design',
        project_name: item.project_name || '',
        client_name: item.client_name || '',
        featured: item.featured,
        published: item.published,
        sort_order: item.sort_order,
      })
    }
    finally {
      loading.value = false
    }
  }
})

async function handleSave() {
  saving.value = true
  try {
    if (isNew.value) {
      await createGalleryItem({ ...form })
    } else {
      await updateGalleryItem(itemId, { ...form })
    }
    router.push('/admin/gallery')
  }
  finally {
    saving.value = false
  }
}
</script>

<template>
  <div class="max-w-4xl">
    <div class="flex items-center gap-4 mb-6">
      <a href="/admin/gallery" class="p-2 rounded-lg text-bs-foreground-dark hover:text-bs-foreground-light hover:bg-bs-surface-3/50 transition-colors transition-transform transition-opacity">
        <Icon name="lucide:arrow-left" class="w-5 h-5" />
      </a>
      <div>
        <h1 class="text-2xl font-bold text-bs-foreground-light">{{ isNew ? 'New Design' : 'Edit Design' }}</h1>
        <p class="text-sm text-bs-foreground-dark mt-1">{{ isNew ? 'Add a design to your gallery' : 'Update design details' }}</p>
      </div>
    </div>

    <div v-if="loading" class="flex items-center justify-center py-20">
      <div class="w-8 h-8 border-2 border-bs-accent border-t-transparent rounded-full animate-spin" />
    </div>

    <form v-else @submit.prevent="handleSave" class="space-y-6">
      <!-- Image -->
      <div class="bg-bs-surface-1 border border-bs-surface-3/50 rounded-xl p-6">
        <ImageUpload v-model="form.image_url" label="Design Image" folder="gallery" />
      </div>

      <!-- Details -->
      <div class="bg-bs-surface-1 border border-bs-surface-3/50 rounded-xl p-6">
        <h2 class="text-lg font-semibold text-bs-foreground-light mb-4">Details</h2>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-bs-foreground-dark mb-1.5">Title</label>
            <input v-model="form.title" class="w-full px-4 py-2.5 rounded-lg bg-bs-surface-0 border border-bs-surface-3/50 text-bs-foreground-light text-sm focus:outline-none focus:border-bs-accent transition-colors" />
          </div>
          <div>
            <label class="block text-sm font-medium text-bs-foreground-dark mb-1.5">Description</label>
            <textarea v-model="form.description" rows="3" class="w-full px-4 py-2.5 rounded-lg bg-bs-surface-0 border border-bs-surface-3/50 text-bs-foreground-light text-sm focus:outline-none focus:border-bs-accent transition-colors resize-y" />
          </div>
          <div class="grid sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-bs-foreground-dark mb-1.5">Category</label>
              <select v-model="form.category" class="w-full px-4 py-2.5 rounded-lg bg-bs-surface-0 border border-bs-surface-3/50 text-bs-foreground-light text-sm focus:outline-none focus:border-bs-accent transition-colors">
                <option v-for="cat in categories" :key="cat.value" :value="cat.value">{{ cat.label }}</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-bs-foreground-dark mb-1.5">Sort Order</label>
              <input v-model.number="form.sort_order" type="number" class="w-full px-4 py-2.5 rounded-lg bg-bs-surface-0 border border-bs-surface-3/50 text-bs-foreground-light text-sm focus:outline-none focus:border-bs-accent transition-colors" />
            </div>
          </div>
          <div class="grid sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-bs-foreground-dark mb-1.5">Project Name</label>
              <input v-model="form.project_name" placeholder="Optional" class="w-full px-4 py-2.5 rounded-lg bg-bs-surface-0 border border-bs-surface-3/50 text-bs-foreground-light text-sm focus:outline-none focus:border-bs-accent transition-colors" />
            </div>
            <div>
              <label class="block text-sm font-medium text-bs-foreground-dark mb-1.5">Client Name</label>
              <input v-model="form.client_name" placeholder="Optional" class="w-full px-4 py-2.5 rounded-lg bg-bs-surface-0 border border-bs-surface-3/50 text-bs-foreground-light text-sm focus:outline-none focus:border-bs-accent transition-colors" />
            </div>
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
          {{ saving ? 'Saving...' : (isNew ? 'Add Design' : 'Save Changes') }}
        </button>
        <a href="/admin/gallery" class="px-4 py-2.5 rounded-lg text-sm font-medium text-bs-foreground-dark hover:text-bs-foreground-light hover:bg-bs-surface-3/50 transition-colors transition-transform transition-opacity">
          Cancel
        </a>
      </div>
    </form>
  </div>
</template>
