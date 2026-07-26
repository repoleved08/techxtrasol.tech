<script setup>
definePageMeta({ middleware: 'auth-admin', layout: 'admin' })

const route = useRoute()
const router = useRouter()
const itemId = route.params.id
const isNew = computed(() => itemId === 'new')

const { getAllTestimonials, createTestimonial, updateTestimonial } = useTestimonials()

const form = reactive({
  client_name: '',
  client_title: '',
  client_company: '',
  client_avatar: '',
  quote: '',
  rating: 5,
  featured: false,
  published: false,
})

const loading = ref(!isNew.value)
const saving = ref(false)

onMounted(async () => {
  if (!isNew.value) {
    try {
      const all = await getAllTestimonials()
      const item = all.find(x => x.id === itemId)
      if (!item) { router.push('/admin/testimonials'); return }
      Object.assign(form, {
        client_name: item.client_name,
        client_title: item.client_title || '',
        client_company: item.client_company || '',
        client_avatar: item.client_avatar || '',
        quote: item.quote,
        rating: item.rating || 5,
        featured: item.featured,
        published: item.published,
      })
    }
    finally { loading.value = false }
  }
})

async function handleSave() {
  saving.value = true
  try {
    if (isNew.value) await createTestimonial({ ...form })
    else await updateTestimonial(itemId, { ...form })
    router.push('/admin/testimonials')
  }
  finally { saving.value = false }
}
</script>

<template>
  <div class="max-w-3xl">
    <div class="flex items-center gap-4 mb-6">
      <a href="/admin/testimonials" class="p-2 rounded-lg text-bs-foreground-dark hover:text-bs-foreground-light hover:bg-bs-surface-3/50 transition-all">
        <Icon name="lucide:arrow-left" class="w-5 h-5" />
      </a>
      <div>
        <h1 class="text-2xl font-bold text-bs-foreground-light">{{ isNew ? 'New Testimonial' : 'Edit Testimonial' }}</h1>
      </div>
    </div>

    <div v-if="loading" class="flex items-center justify-center py-20">
      <div class="w-8 h-8 border-2 border-bs-accent border-t-transparent rounded-full animate-spin" />
    </div>

    <form v-else @submit.prevent="handleSave" class="space-y-6">
      <div class="bg-bs-surface-1 border border-bs-surface-3/50 rounded-xl p-6 space-y-4">
        <div class="grid sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-bs-foreground-dark mb-1.5">Client Name</label>
            <input v-model="form.client_name" required class="w-full px-4 py-2.5 rounded-lg bg-bs-surface-0 border border-bs-surface-3/50 text-bs-foreground-light text-sm focus:outline-none focus:border-bs-accent transition-colors" />
          </div>
          <div>
            <label class="block text-sm font-medium text-bs-foreground-dark mb-1.5">Client Title</label>
            <input v-model="form.client_title" placeholder="e.g., CEO" class="w-full px-4 py-2.5 rounded-lg bg-bs-surface-0 border border-bs-surface-3/50 text-bs-foreground-light text-sm focus:outline-none focus:border-bs-accent transition-colors" />
          </div>
        </div>
        <div class="grid sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-bs-foreground-dark mb-1.5">Company</label>
            <input v-model="form.client_company" class="w-full px-4 py-2.5 rounded-lg bg-bs-surface-0 border border-bs-surface-3/50 text-bs-foreground-light text-sm focus:outline-none focus:border-bs-accent transition-colors" />
          </div>
          <div>
            <label class="block text-sm font-medium text-bs-foreground-dark mb-1.5">Rating (1-5)</label>
            <input v-model.number="form.rating" type="number" min="1" max="5" class="w-full px-4 py-2.5 rounded-lg bg-bs-surface-0 border border-bs-surface-3/50 text-bs-foreground-light text-sm focus:outline-none focus:border-bs-accent transition-colors" />
          </div>
        </div>
        <ImageUpload v-model="form.client_avatar" label="Client Photo" folder="testimonials" />
        <div>
          <label class="block text-sm font-medium text-bs-foreground-dark mb-1.5">Quote</label>
          <textarea v-model="form.quote" rows="4" required class="w-full px-4 py-2.5 rounded-lg bg-bs-surface-0 border border-bs-surface-3/50 text-bs-foreground-light text-sm focus:outline-none focus:border-bs-accent transition-colors resize-y" />
        </div>
      </div>

      <div class="bg-bs-surface-1 border border-bs-surface-3/50 rounded-xl p-6 flex items-center gap-6">
        <label class="flex items-center gap-3 cursor-pointer">
          <input v-model="form.published" type="checkbox" class="w-4 h-4 rounded border-bs-surface-3 text-bs-accent focus:ring-bs-accent" />
          <span class="text-sm font-medium text-bs-foreground-light">Published</span>
        </label>
        <label class="flex items-center gap-3 cursor-pointer">
          <input v-model="form.featured" type="checkbox" class="w-4 h-4 rounded border-bs-surface-3 text-bs-accent focus:ring-bs-accent" />
          <span class="text-sm font-medium text-bs-foreground-light">Featured</span>
        </label>
      </div>

      <div class="flex items-center gap-3">
        <button type="submit" :disabled="saving" class="bs-btn inline-flex items-center gap-2">
          <Icon v-if="saving" name="lucide:loader-2" class="w-4 h-4 animate-spin" />
          {{ saving ? 'Saving...' : (isNew ? 'Create' : 'Save Changes') }}
        </button>
        <a href="/admin/testimonials" class="px-4 py-2.5 rounded-lg text-sm font-medium text-bs-foreground-dark hover:text-bs-foreground-light hover:bg-bs-surface-3/50 transition-all">Cancel</a>
      </div>
    </form>
  </div>
</template>
