<script setup>
definePageMeta({ middleware: 'auth-admin', layout: 'admin' })

const { getTechnologies, createTechnology, updateTechnology, deleteTechnology } = useTaxonomy()

const items = ref([])
const loading = ref(true)
const showForm = ref(false)
const form = reactive({ name: '', slug: '', category: 'frontend', color: '', icon: '', website_url: '' })
const editId = ref(null)

const techCategories = ['frontend', 'backend', 'mobile', 'database', 'devops', 'ai', 'design', 'other']

onMounted(async () => {
  try { items.value = await getTechnologies() }
  finally { loading.value = false }
})

function openNew() {
  editId.value = null
  Object.assign(form, { name: '', slug: '', category: 'frontend', color: '', icon: '', website_url: '' })
  showForm.value = true
}

function openEdit(item) {
  editId.value = item.id
  Object.assign(form, { name: item.name, slug: item.slug, category: item.category, color: item.color || '', icon: item.icon || '', website_url: item.website_url || '' })
  showForm.value = true
}

function generateSlug() {
  form.slug = form.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

async function handleSave() {
  if (editId.value) await updateTechnology(editId.value, { ...form })
  else await createTechnology({ ...form })
  items.value = await getTechnologies()
  showForm.value = false
}

async function handleDelete(id) {
  if (!confirm('Delete this technology?')) return
  await deleteTechnology(id)
  items.value = items.value.filter(i => i.id !== id)
}
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold text-bs-foreground-light">Technologies</h1>
        <p class="text-sm text-bs-foreground-dark mt-1">Tech stack items used in projects</p>
      </div>
      <button @click="openNew" class="bs-btn inline-flex items-center gap-2">
        <Icon name="lucide:plus" class="w-4 h-4" /> New Technology
      </button>
    </div>

    <div v-if="loading" class="flex items-center justify-center py-20">
      <div class="w-8 h-8 border-2 border-bs-accent border-t-transparent rounded-full animate-spin" />
    </div>

    <div v-if="showForm" class="bg-bs-surface-1 border border-bs-surface-3/50 rounded-xl p-6 mb-6">
      <h2 class="text-sm font-semibold text-bs-foreground-light mb-3">{{ editId ? 'Edit' : 'New' }} Technology</h2>
      <form @submit.prevent="handleSave" class="space-y-3">
        <div class="grid sm:grid-cols-2 gap-3">
          <input v-model="form.name" @blur="!form.slug && generateSlug()" placeholder="Name" required class="px-4 py-2.5 rounded-lg bg-bs-surface-0 border border-bs-surface-3/50 text-bs-foreground-light text-sm focus:outline-none focus:border-bs-accent transition-colors" />
          <input v-model="form.slug" placeholder="Slug" class="px-4 py-2.5 rounded-lg bg-bs-surface-0 border border-bs-surface-3/50 text-bs-foreground-light text-sm focus:outline-none focus:border-bs-accent transition-colors" />
        </div>
        <div class="grid sm:grid-cols-3 gap-3">
          <select v-model="form.category" class="px-4 py-2.5 rounded-lg bg-bs-surface-0 border border-bs-surface-3/50 text-bs-foreground-light text-sm focus:outline-none focus:border-bs-accent transition-colors">
            <option v-for="c in techCategories" :key="c" :value="c">{{ c }}</option>
          </select>
          <input v-model="form.color" placeholder="Color hex (optional)" class="px-4 py-2.5 rounded-lg bg-bs-surface-0 border border-bs-surface-3/50 text-bs-foreground-light text-sm focus:outline-none focus:border-bs-accent transition-colors" />
          <input v-model="form.website_url" placeholder="Website URL (optional)" class="px-4 py-2.5 rounded-lg bg-bs-surface-0 border border-bs-surface-3/50 text-bs-foreground-light text-sm focus:outline-none focus:border-bs-accent transition-colors" />
        </div>
        <div class="flex gap-2">
          <button type="submit" class="px-4 py-2 rounded-lg bg-bs-accent text-white text-sm font-medium hover:bg-bs-accent/90 transition-colors">Save</button>
          <button type="button" @click="showForm = false" class="px-4 py-2 rounded-lg bg-bs-surface-3/50 text-bs-foreground-dark text-sm hover:text-bs-foreground-light transition-colors">Cancel</button>
        </div>
      </form>
    </div>

    <div v-if="!loading && items.length === 0 && !showForm" class="text-center py-20 bg-bs-surface-1 border border-bs-surface-3/50 rounded-xl">
      <Icon name="lucide:cpu" class="w-16 h-16 text-bs-surface-3 mx-auto mb-4" />
      <p class="text-bs-foreground-dark mb-4">No technologies yet</p>
      <button @click="openNew" class="bs-btn-sm">Add First Technology</button>
    </div>

    <div v-else class="bg-bs-surface-1 border border-bs-surface-3/50 rounded-xl overflow-hidden">
      <div v-for="item in items" :key="item.id" class="flex items-center gap-4 px-5 py-3 border-b border-bs-surface-3/30 last:border-0 hover:bg-bs-surface-2/50 transition-colors">
        <div class="w-3 h-3 rounded-full shrink-0" :style="item.color ? { backgroundColor: item.color } : { backgroundColor: '#6366f1' }" />
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium text-bs-foreground-light">{{ item.name }}</p>
          <p class="text-xs text-bs-foreground-dark">{{ item.category }}</p>
        </div>
        <div class="flex items-center gap-1">
          <button @click="openEdit(item)" class="p-1.5 rounded-lg text-bs-foreground-dark hover:text-bs-accent hover:bg-bs-accent/10 transition-all">
            <Icon name="lucide:pencil" class="w-4 h-4" />
          </button>
          <button @click="handleDelete(item.id)" class="p-1.5 rounded-lg text-bs-foreground-dark hover:text-red-400 hover:bg-red-400/10 transition-all">
            <Icon name="lucide:trash-2" class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
