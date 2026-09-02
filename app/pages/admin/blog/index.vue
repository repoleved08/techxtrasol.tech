<script setup>
definePageMeta({ middleware: 'auth-admin', layout: 'admin' })

const { getAllPosts, deletePost } = useSupabaseBlog()

const posts = ref([])
const loading = ref(true)
const search = ref('')

async function loadPosts() {
  loading.value = true
  try {
    posts.value = await getAllPosts()
  }
  finally {
    loading.value = false
  }
}

onMounted(loadPosts)

const filteredPosts = computed(() => {
  if (!search.value) return posts.value
  const q = search.value.toLowerCase()
  return posts.value.filter(p => p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q))
})

async function handleDelete(id) {
  if (!confirm('Are you sure you want to delete this blog post?')) return
  await deletePost(id)
  await loadPosts()
}
</script>

<template>
  <div>
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div>
        <h1 class="text-2xl font-bold text-bs-foreground-light">Blog Posts</h1>
        <p class="text-sm text-bs-foreground-dark mt-1">Manage your blog content</p>
      </div>
      <a href="/admin/blog/new" class="bs-btn inline-flex items-center gap-2">
        <Icon name="lucide:plus" class="w-4 h-4" />
        New Post
      </a>
    </div>

    <!-- Search -->
    <div class="relative mb-6">
      <Icon name="lucide:search" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-bs-foreground-dark" />
      <input
        v-model="search"
        type="text"
        placeholder="Search posts..."
        class="w-full max-w-md pl-10 pr-4 py-2.5 rounded-lg bg-bs-surface-1 border border-bs-surface-3/50 text-bs-foreground-light text-sm placeholder:text-bs-foreground-dark focus:outline-none focus:border-bs-accent transition-colors"
      />
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
              <th class="text-left px-6 py-3 font-medium text-bs-foreground-dark">Title</th>
              <th class="text-left px-6 py-3 font-medium text-bs-foreground-dark hidden md:table-cell">Category</th>
              <th class="text-left px-6 py-3 font-medium text-bs-foreground-dark hidden lg:table-cell">Date</th>
              <th class="text-right px-6 py-3 font-medium text-bs-foreground-dark">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-bs-surface-3/50">
            <tr
              v-for="post in filteredPosts"
              :key="post.id"
              class="hover:bg-bs-surface-3/20 transition-colors"
            >
              <td class="px-6 py-4">
                <p class="font-medium text-bs-foreground-light">{{ post.title }}</p>
                <p class="text-xs text-bs-foreground-dark truncate max-w-md">{{ post.description }}</p>
              </td>
              <td class="px-6 py-4 hidden md:table-cell">
                <span class="text-xs px-2 py-0.5 rounded-full bg-bs-accent/10 text-bs-accent">{{ post.category }}</span>
              </td>
              <td class="px-6 py-4 text-bs-foreground-dark hidden lg:table-cell">{{ post.date }}</td>
              <td class="px-6 py-4">
                <div class="flex items-center justify-end gap-2">
                  <a
                    :href="`/admin/blog/${post.id}`"
                    class="p-1.5 rounded-lg text-bs-foreground-dark hover:text-bs-foreground-light hover:bg-bs-surface-3/50 transition-colors transition-transform transition-opacity"
                    title="Edit"
                  >
                    <Icon name="lucide:pencil" class="w-4 h-4" />
                  </a>
                  <button
                    class="p-1.5 rounded-lg text-bs-foreground-dark hover:text-red-400 hover:bg-red-500/10 transition-colors transition-transform transition-opacity"
                    title="Delete"
                    @click="handleDelete(post.id)"
                  >
                    <Icon name="lucide:trash-2" class="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="filteredPosts.length === 0">
              <td colspan="4" class="px-6 py-12 text-center text-bs-foreground-dark">
                No blog posts found.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
