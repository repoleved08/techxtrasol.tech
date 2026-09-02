<script setup>
definePageMeta({ middleware: 'auth-admin', layout: 'admin' })

const { getCategories, createCategory, updateCategory, deleteCategory } = useTaxonomy()

const items = ref([])
const loading = ref(true)
const showForm = ref(false)
const form = reactive({ name: '', slug: '', description: '', icon: '' })
const editId = ref(null)

onMounted(async () => {
  try { items.value = await getCategories() }
  finally { loading.value = false }
})

function openNew() {
  editId.value = null
  Object.assign(form, { name: '', slug: '', description: '', icon: '' })
  showForm.value = true
}

function openEdit(item) {
  editId.value = item.id
  Object.assign(form, { name: item.name, slug: item.slug, description: item.description || '', icon: item.icon || '' })
  showForm.value = true
}

function generateSlug() {
  form.slug = form.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

async function handleSave() {
  if (editId.value) await updateCategory(editId.value, { ...form })
  else await createCategory({ ...form })
  items.value = await getCategories()
  showForm.value = false
}

async function handleDelete(id) {
  if (!confirm('Delete this category?')) return
  await deleteCategory(id)
  items.value = items.value.filter(i => i.id !== id)
}
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold text-bs-foreground-light">Categories</h1>
        <p class="text-sm text-bs-foreground-dark mt-1">Project and content categories</p>
      </div>
      <button @click="openNew" class="bs-btn inline-flex items-center gap-2">
        <Icon name="lucide:plus" class="w-4 h-4" /> New Category
      </button>
    </div>

    <div v-if="loading" class="flex items-center justify-center py-20">
      <div class="w-8 h-8 border-2 border-bs-accent border-t-transparent rounded-full animate-spin" />
    </div>

    <!-- Inline form -->
    <div v-if="showForm" class="bg-bs-surface-1 border border-bs-surface-3/50 rounded-xl p-6 mb-6">
      <h2 class="text-sm font-semibold text-bs-foreground-light mb-3">{{ editId ? 'Edit' : 'New' }} Category</h2>
      <form @submit.prevent="handleSave" class="space-y-3">
        <div class="grid sm:grid-cols-2 gap-3">
          <input v-model="form.name" @blur="!form.slug && generateSlug()" placeholder="Name" required class="px-4 py-2.5 rounded-lg bg-bs-surface-0 border border-bs-surface-3/50 text-bs-foreground-light text-sm focus:outline-none focus:border-bs-accent transition-colors" />
          <input v-model="form.slug" placeholder="Slug" class="px-4 py-2.5 rounded-lg bg-bs-surface-0 border border-bs-surface-3/50 text-bs-foreground-light text-sm focus:outline-none focus:border-bs-accent transition-colors" />
        </div>
        <div class="grid sm:grid-cols-2 gap-3">
          <input v-model="form.description" placeholder="Description (optional)" class="px-4 py-2.5 rounded-lg bg-bs-surface-0 border border-bs-surface-3/50 text-bs-foreground-light text-sm focus:outline-none focus:border-bs-accent transition-colors" />
          <input v-model="form.icon" placeholder="Icon name (optional)" class="px-4 py-2.5 rounded-lg bg-bs-surface-0 border border-bs-surface-3/50 text-bs-foreground-light text-sm focus:outline-none focus:border-bs-accent transition-colors" />
        </div>
        <div class="flex gap-2">
          <button type="submit" class="px-4 py-2 rounded-lg bg-bs-accent text-white text-sm font-medium hover:bg-bs-accent/90 transition-colors">Save</button>
          <button type="button" @click="showForm = false" class="px-4 py-2 rounded-lg bg-bs-surface-3/50 text-bs-foreground-dark text-sm hover:text-bs-foreground-light transition-colors">Cancel</button>
        </div>
      </form>
    </div>

    <div v-if="!loading && items.length === 0 && !showForm" class="text-center py-20 bg-bs-surface-1 border border-bs-surface-3/50 rounded-xl">
      <Icon name="lucide:tag" class="w-16 h-16 text-bs-surface-3 mx-auto mb-4" />
      <p class="text-bs-foreground-dark mb-4">No categories yet</p>
      <button @click="openNew" class="bs-btn-sm">Create First Category</button>
    </div>

    <div v-else class="bg-bs-surface-1 border border-bs-surface-3/50 rounded-xl overflow-hidden">
      <div v-for="item in items" :key="item.id" class="flex items-center gap-4 px-5 py-3 border-b border-bs-surface-3/30 last:border-0 hover:bg-bs-surface-2/50 transition-colors">
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium text-bs-foreground-light">{{ item.name }}</p>
          <p class="text-xs text-bs-foreground-dark">{{ item.slug }}</p>
        </div>
        <div class="flex items-center gap-1">
          <button @click="openEdit(item)" class="p-1.5 rounded-lg text-bs-foreground-dark hover:text-bs-accent hover:bg-bs-accent/10 transition-colors transition-transform transition-opacity">
            <Icon name="lucide:pencil" class="w-4 h-4" />
          </button>
          <button @click="handleDelete(item.id)" class="p-1.5 rounded-lg text-bs-foreground-dark hover:text-red-400 hover:bg-red-400/10 transition-colors transition-transform transition-opacity">
            <Icon name="lucide:trash-2" class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
