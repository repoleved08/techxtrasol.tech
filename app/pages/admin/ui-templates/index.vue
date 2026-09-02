<script setup>
definePageMeta({ middleware: 'auth-admin', layout: 'admin' })

const { getAllTemplates, deleteTemplate, togglePublish, toggleFeatured } = useUiTemplates()

const templates = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    templates.value = await getAllTemplates()
  }
  finally {
    loading.value = false
  }
})

async function handleDelete(id) {
  if (!confirm('Delete this template?')) return
  await deleteTemplate(id)
  templates.value = templates.value.filter(t => t.id !== id)
}

async function handleTogglePublish(t) {
  await togglePublish(t.id, !t.published)
  t.published = !t.published
}

async function handleToggleFeatured(t) {
  await toggleFeatured(t.id, !t.featured)
  t.featured = !t.featured
}
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold text-bs-foreground-light">UI Templates</h1>
        <p class="text-sm text-bs-foreground-dark mt-1">Manage premium landing pages and UI kits</p>
      </div>
      <a href="/admin/ui-templates/new" class="bs-btn inline-flex items-center gap-2">
        <Icon name="lucide:plus" class="w-4 h-4" />
        New Template
      </a>
    </div>

    <div v-if="loading" class="flex items-center justify-center py-20">
      <div class="w-8 h-8 border-2 border-bs-accent border-t-transparent rounded-full animate-spin" />
    </div>

    <div v-else-if="templates.length === 0" class="text-center py-20 bg-bs-surface-1 border border-bs-surface-3/50 rounded-xl">
      <Icon name="lucide:layout-template" class="w-16 h-16 text-bs-surface-3 mx-auto mb-4" />
      <p class="text-bs-foreground-dark mb-4">No templates yet</p>
      <a href="/admin/ui-templates/new" class="bs-btn-sm">Create Your First Template</a>
    </div>

    <div v-else class="bg-bs-surface-1 border border-bs-surface-3/50 rounded-xl overflow-hidden">
      <table class="w-full text-left">
        <thead>
          <tr class="border-b border-bs-surface-3/50">
            <th class="px-5 py-3 text-xs font-semibold text-bs-foreground-dark uppercase tracking-wider">Template</th>
            <th class="px-5 py-3 text-xs font-semibold text-bs-foreground-dark uppercase tracking-wider hidden md:table-cell">Category</th>
            <th class="px-5 py-3 text-xs font-semibold text-bs-foreground-dark uppercase tracking-wider hidden sm:table-cell">Price</th>
            <th class="px-5 py-3 text-xs font-semibold text-bs-foreground-dark uppercase tracking-wider">Status</th>
            <th class="px-5 py-3 text-xs font-semibold text-bs-foreground-dark uppercase tracking-wider text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="t in templates" :key="t.id" class="border-b border-bs-surface-3/30 hover:bg-bs-surface-2/50 transition-colors">
            <td class="px-5 py-4">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-lg bg-bs-surface-3/50 overflow-hidden shrink-0">
                  <img v-if="t.preview_image" :src="t.preview_image" :alt="t.title" class="w-full h-full object-cover" />
                  <div v-else class="w-full h-full flex items-center justify-center">
                    <Icon name="lucide:layout-template" class="w-5 h-5 text-bs-surface-3" />
                  </div>
                </div>
                <div class="min-w-0">
                  <p class="text-sm font-medium text-bs-foreground-light truncate">{{ t.title }}</p>
                  <p class="text-xs text-bs-foreground-dark truncate">{{ t.slug }}</p>
                </div>
              </div>
            </td>
            <td class="px-5 py-4 hidden md:table-cell">
              <span class="text-xs px-2 py-0.5 rounded-full bg-bs-surface-3/50 text-bs-foreground-dark">{{ t.category }}</span>
            </td>
            <td class="px-5 py-4 hidden sm:table-cell">
              <span class="text-sm text-bs-foreground-light">{{ t.price || 'Free' }}</span>
            </td>
            <td class="px-5 py-4">
              <div class="flex items-center gap-2">
                <button @click="handleTogglePublish(t)"
                  class="text-xs px-2 py-0.5 rounded-full transition-colors"
                  :class="t.published ? 'bg-green-400/10 text-green-400' : 'bg-bs-surface-3/50 text-bs-foreground-dark'">
                  {{ t.published ? 'Published' : 'Draft' }}
                </button>
                <button v-if="t.featured" @click="handleToggleFeatured(t)"
                  class="text-xs px-2 py-0.5 rounded-full bg-bs-accent/10 text-bs-accent">
                  Featured
                </button>
              </div>
            </td>
            <td class="px-5 py-4">
              <div class="flex items-center justify-end gap-1">
                <button v-if="!t.featured" @click="handleToggleFeatured(t)"
                  class="p-1.5 rounded-lg text-bs-foreground-dark hover:text-yellow-400 hover:bg-yellow-400/10 transition-colors transition-transform transition-opacity" title="Feature">
                  <Icon name="lucide:star" class="w-4 h-4" />
                </button>
                <button v-else @click="handleToggleFeatured(t)"
                  class="p-1.5 rounded-lg text-yellow-400 hover:text-bs-foreground-dark hover:bg-bs-surface-3/50 transition-colors transition-transform transition-opacity" title="Unfeature">
                  <Icon name="lucide:star-off" class="w-4 h-4" />
                </button>
                <a :href="`/admin/ui-templates/${t.id}`"
                  class="p-1.5 rounded-lg text-bs-foreground-dark hover:text-bs-accent hover:bg-bs-accent/10 transition-colors transition-transform transition-opacity" title="Edit">
                  <Icon name="lucide:pencil" class="w-4 h-4" />
                </a>
                <button @click="handleDelete(t.id)"
                  class="p-1.5 rounded-lg text-bs-foreground-dark hover:text-red-400 hover:bg-red-400/10 transition-colors transition-transform transition-opacity" title="Delete">
                  <Icon name="lucide:trash-2" class="w-4 h-4" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
