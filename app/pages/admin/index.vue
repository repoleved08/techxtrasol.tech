<script setup>
definePageMeta({ middleware: 'auth-admin', layout: 'admin' })

const { getAllProjects } = useProjects()
const { getAllCaseStudies } = useCaseStudies()
const { getAllPosts } = useSupabaseBlog()
const { getAllServices } = useServices()

const projects = ref([])
const caseStudies = ref([])
const posts = ref([])
const services = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    const [p, cs, b, s] = await Promise.all([
      getAllProjects(),
      getAllCaseStudies(),
      getAllPosts(),
      getAllServices(),
    ])
    projects.value = p
    caseStudies.value = cs
    posts.value = b
    services.value = s
  }
  finally {
    loading.value = false
  }
})

const stats = computed(() => [
  { name: 'Total Projects', value: projects.value.length, icon: 'lucide:briefcase', color: 'text-blue-400', bg: 'bg-blue-400/10' },
  { name: 'Published Projects', value: projects.value.filter(p => p.published).length, icon: 'lucide:check-circle', color: 'text-green-400', bg: 'bg-green-400/10' },
  { name: 'Case Studies', value: caseStudies.value.length, icon: 'lucide:file-text', color: 'text-purple-400', bg: 'bg-purple-400/10' },
  { name: 'Blog Posts', value: posts.value.length, icon: 'lucide:pencil', color: 'text-orange-400', bg: 'bg-orange-400/10' },
  { name: 'Services', value: services.value.length, icon: 'lucide:cog', color: 'text-cyan-400', bg: 'bg-cyan-400/10' },
  { name: 'Drafts', value: projects.value.filter(p => !p.published).length + caseStudies.value.filter(c => !c.published).length, icon: 'lucide:file-edit', color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
])

const recentProjects = computed(() =>
  [...projects.value]
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 5),
)

const recentPosts = computed(() =>
  [...posts.value]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5),
)
</script>

<template>
  <div>
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-bs-foreground-light">Dashboard</h1>
      <p class="text-bs-foreground-dark mt-1">Welcome back, {{ $auth?.user?.given_name || 'Admin' }}</p>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex items-center justify-center py-20">
      <div class="w-8 h-8 border-2 border-bs-accent border-t-transparent rounded-full animate-spin" />
    </div>

    <template v-else>
      <!-- Stats grid -->
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <div
          v-for="stat in stats"
          :key="stat.name"
          class="bg-bs-surface-1 border border-bs-surface-3/50 rounded-xl p-4"
        >
          <div class="flex items-center gap-3 mb-3">
            <div :class="[stat.bg, stat.color, 'w-10 h-10 rounded-lg flex items-center justify-center']">
              <Icon :name="stat.icon" class="w-5 h-5" />
            </div>
          </div>
          <p class="text-2xl font-bold text-bs-foreground-light">{{ stat.value }}</p>
          <p class="text-xs text-bs-foreground-dark mt-1">{{ stat.name }}</p>
        </div>
      </div>

      <div class="grid lg:grid-cols-2 gap-6">
        <!-- Recent Projects -->
        <div class="bg-bs-surface-1 border border-bs-surface-3/50 rounded-xl overflow-hidden">
          <div class="flex items-center justify-between px-6 py-4 border-b border-bs-surface-3/50">
            <h2 class="font-semibold text-bs-foreground-light">Recent Projects</h2>
            <a href="/admin/projects" class="text-sm text-bs-accent hover:underline">View All</a>
          </div>
          <div class="divide-y divide-bs-surface-3/50">
            <div
              v-for="project in recentProjects"
              :key="project.id"
              class="flex items-center gap-4 px-6 py-3 hover:bg-bs-surface-3/20 transition-colors"
            >
              <div class="min-w-0 flex-1">
                <p class="text-sm font-medium text-bs-foreground-light truncate">{{ project.title }}</p>
                <p class="text-xs text-bs-foreground-dark">{{ project.client_name || 'No client' }}</p>
              </div>
              <span
                class="shrink-0 text-xs px-2 py-0.5 rounded-full"
                :class="project.published ? 'bg-green-400/10 text-green-400' : 'bg-yellow-400/10 text-yellow-400'"
              >
                {{ project.published ? 'Published' : 'Draft' }}
              </span>
            </div>
            <div v-if="recentProjects.length === 0" class="px-6 py-8 text-center text-bs-foreground-dark text-sm">
              No projects yet. Create your first project.
            </div>
          </div>
        </div>

        <!-- Recent Blog Posts -->
        <div class="bg-bs-surface-1 border border-bs-surface-3/50 rounded-xl overflow-hidden">
          <div class="flex items-center justify-between px-6 py-4 border-b border-bs-surface-3/50">
            <h2 class="font-semibold text-bs-foreground-light">Recent Blog Posts</h2>
            <a href="/admin/blog" class="text-sm text-bs-accent hover:underline">View All</a>
          </div>
          <div class="divide-y divide-bs-surface-3/50">
            <div
              v-for="post in recentPosts"
              :key="post.id"
              class="flex items-center gap-4 px-6 py-3 hover:bg-bs-surface-3/20 transition-colors"
            >
              <div class="min-w-0 flex-1">
                <p class="text-sm font-medium text-bs-foreground-light truncate">{{ post.title }}</p>
                <p class="text-xs text-bs-foreground-dark">{{ post.category }}</p>
              </div>
              <span class="shrink-0 text-xs text-bs-foreground-dark">{{ post.date }}</span>
            </div>
            <div v-if="recentPosts.length === 0" class="px-6 py-8 text-center text-bs-foreground-dark text-sm">
              No blog posts yet.
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
