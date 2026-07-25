<script setup>
definePageMeta({ middleware: 'auth-admin', layout: 'admin' })

const { getAllProjects, deleteProject, togglePublish, toggleFeatured } = useProjects()

const projects = ref([])
const loading = ref(true)
const search = ref('')
const filterStatus = ref('all')

async function loadProjects() {
  loading.value = true
  try {
    projects.value = await getAllProjects()
  }
  finally {
    loading.value = false
  }
}

onMounted(loadProjects)

const filteredProjects = computed(() => {
  let result = projects.value
  if (search.value) {
    const q = search.value.toLowerCase()
    result = result.filter(p => p.title.toLowerCase().includes(q) || p.client_name?.toLowerCase().includes(q))
  }
  if (filterStatus.value === 'published') result = result.filter(p => p.published)
  if (filterStatus.value === 'draft') result = result.filter(p => !p.published)
  if (filterStatus.value === 'featured') result = result.filter(p => p.featured)
  return result
})

async function handleDelete(id) {
  if (!confirm('Are you sure you want to delete this project?')) return
  await deleteProject(id)
  await loadProjects()
}

async function handleTogglePublish(id, current) {
  await togglePublish(id, !current)
  await loadProjects()
}

async function handleToggleFeatured(id, current) {
  await toggleFeatured(id, !current)
  await loadProjects()
}

function formatDate(d) {
  if (!d) return '—'
  return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}
</script>

<template>
  <div>
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div>
        <h1 class="text-2xl font-bold text-bs-foreground-light">Projects</h1>
        <p class="text-sm text-bs-foreground-dark mt-1">Manage your project portfolio</p>
      </div>
      <a href="/admin/projects/new" class="bs-btn inline-flex items-center gap-2">
        <Icon name="lucide:plus" class="w-4 h-4" />
        New Project
      </a>
    </div>

    <!-- Filters -->
    <div class="flex flex-col sm:flex-row gap-3 mb-6">
      <div class="relative flex-1">
        <Icon name="lucide:search" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-bs-foreground-dark" />
        <input
          v-model="search"
          type="text"
          placeholder="Search projects..."
          class="w-full pl-10 pr-4 py-2.5 rounded-lg bg-bs-surface-1 border border-bs-surface-3/50 text-bs-foreground-light text-sm placeholder:text-bs-foreground-dark focus:outline-none focus:border-bs-accent transition-colors"
        />
      </div>
      <select
        v-model="filterStatus"
        class="px-4 py-2.5 rounded-lg bg-bs-surface-1 border border-bs-surface-3/50 text-bs-foreground-light text-sm focus:outline-none focus:border-bs-accent transition-colors"
      >
        <option value="all">All Status</option>
        <option value="published">Published</option>
        <option value="draft">Drafts</option>
        <option value="featured">Featured</option>
      </select>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex items-center justify-center py-20">
      <div class="w-8 h-8 border-2 border-bs-accent border-t-transparent rounded-full animate-spin" />
    </div>

    <!-- Table -->
    <div v-else class="bg-bs-surface-1 border border-bs-surface-3/50 rounded-xl overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-bs-surface-3/50">
              <th class="text-left px-6 py-3 font-medium text-bs-foreground-dark">Project</th>
              <th class="text-left px-6 py-3 font-medium text-bs-foreground-dark hidden md:table-cell">Client</th>
              <th class="text-left px-6 py-3 font-medium text-bs-foreground-dark hidden lg:table-cell">Date</th>
              <th class="text-left px-6 py-3 font-medium text-bs-foreground-dark">Status</th>
              <th class="text-right px-6 py-3 font-medium text-bs-foreground-dark">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-bs-surface-3/50">
            <tr
              v-for="project in filteredProjects"
              :key="project.id"
              class="hover:bg-bs-surface-3/20 transition-colors"
            >
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div v-if="project.featured_image" class="w-10 h-10 rounded-lg bg-bs-surface-3/50 overflow-hidden shrink-0">
                    <img :src="project.featured_image" :alt="project.title" class="w-full h-full object-cover" />
                  </div>
                  <div class="min-w-0">
                    <p class="font-medium text-bs-foreground-light truncate">{{ project.title }}</p>
                    <p class="text-xs text-bs-foreground-dark truncate max-w-xs">{{ project.short_description }}</p>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 text-bs-foreground-dark hidden md:table-cell">{{ project.client_name || '—' }}</td>
              <td class="px-6 py-4 text-bs-foreground-dark hidden lg:table-cell">{{ formatDate(project.completion_date) }}</td>
              <td class="px-6 py-4">
                <div class="flex items-center gap-2">
                  <button
                    class="text-xs px-2 py-0.5 rounded-full transition-colors"
                    :class="project.published ? 'bg-green-400/10 text-green-400 hover:bg-green-400/20' : 'bg-yellow-400/10 text-yellow-400 hover:bg-yellow-400/20'"
                    @click="handleTogglePublish(project.id, project.published)"
                  >
                    {{ project.published ? 'Published' : 'Draft' }}
                  </button>
                  <button
                    v-if="project.featured"
                    class="text-xs px-2 py-0.5 rounded-full bg-bs-accent/10 text-bs-accent"
                  >
                    Featured
                  </button>
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center justify-end gap-2">
                  <a
                    :href="`/admin/projects/${project.id}`"
                    class="p-1.5 rounded-lg text-bs-foreground-dark hover:text-bs-foreground-light hover:bg-bs-surface-3/50 transition-all"
                    title="Edit"
                  >
                    <Icon name="lucide:pencil" class="w-4 h-4" />
                  </a>
                  <button
                    class="p-1.5 rounded-lg text-bs-foreground-dark hover:text-red-400 hover:bg-red-500/10 transition-all"
                    title="Delete"
                    @click="handleDelete(project.id)"
                  >
                    <Icon name="lucide:trash-2" class="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="filteredProjects.length === 0">
              <td colspan="5" class="px-6 py-12 text-center text-bs-foreground-dark">
                No projects found.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
