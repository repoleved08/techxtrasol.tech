<script setup>
definePageMeta({ middleware: 'auth-admin', layout: 'admin' })

const route = useRoute()
const router = useRouter()
const postId = route.params.id
const isNew = computed(() => postId === 'new')

const { getAllPosts, createPost, updatePost } = useSupabaseBlog()

const form = reactive({
  title: '',
  slug: '',
  description: '',
  content: '',
  date: '',
  category: '',
  read_time: '',
  image: '',
})

const loading = ref(!isNew.value)
const saving = ref(false)

onMounted(async () => {
  if (!isNew.value) {
    try {
      const posts = await getAllPosts()
      const post = posts.find(p => p.id === postId)
      if (!post) {
        router.push('/admin/blog')
        return
      }
      Object.assign(form, {
        title: post.title,
        slug: post.slug,
        description: post.description,
        content: post.content,
        date: post.date,
        category: post.category,
        read_time: post.read_time,
        image: post.image,
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
      await createPost({ ...form })
    } else {
      await updatePost(postId, { ...form })
    }
    router.push('/admin/blog')
  }
  finally {
    saving.value = false
  }
}
</script>

<template>
  <div class="max-w-4xl">
    <div class="flex items-center gap-4 mb-6">
      <a href="/admin/blog" class="p-2 rounded-lg text-bs-foreground-dark hover:text-bs-foreground-light hover:bg-bs-surface-3/50 transition-all">
        <Icon name="lucide:arrow-left" class="w-5 h-5" />
      </a>
      <div>
        <h1 class="text-2xl font-bold text-bs-foreground-light">{{ isNew ? 'New Blog Post' : 'Edit Blog Post' }}</h1>
        <p class="text-sm text-bs-foreground-dark mt-1">{{ isNew ? 'Write a new blog post' : 'Update post content' }}</p>
      </div>
    </div>

    <div v-if="loading" class="flex items-center justify-center py-20">
      <div class="w-8 h-8 border-2 border-bs-accent border-t-transparent rounded-full animate-spin" />
    </div>

    <form v-else @submit.prevent="handleSave" class="space-y-6">
      <!-- Basic Info -->
      <div class="bg-bs-surface-1 border border-bs-surface-3/50 rounded-xl p-6">
        <h2 class="text-lg font-semibold text-bs-foreground-light mb-4">Post Details</h2>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-bs-foreground-dark mb-1.5">Title</label>
            <input v-model="form.title" class="w-full px-4 py-2.5 rounded-lg bg-bs-surface-0 border border-bs-surface-3/50 text-bs-foreground-light text-sm focus:outline-none focus:border-bs-accent transition-colors" />
          </div>
          <div class="grid sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-bs-foreground-dark mb-1.5">Slug</label>
              <input v-model="form.slug" class="w-full px-4 py-2.5 rounded-lg bg-bs-surface-0 border border-bs-surface-3/50 text-bs-foreground-light text-sm focus:outline-none focus:border-bs-accent transition-colors" />
            </div>
            <div>
              <label class="block text-sm font-medium text-bs-foreground-dark mb-1.5">Category</label>
              <input v-model="form.category" class="w-full px-4 py-2.5 rounded-lg bg-bs-surface-0 border border-bs-surface-3/50 text-bs-foreground-light text-sm focus:outline-none focus:border-bs-accent transition-colors" />
            </div>
          </div>
          <div class="grid sm:grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-medium text-bs-foreground-dark mb-1.5">Date</label>
              <input v-model="form.date" type="date" class="w-full px-4 py-2.5 rounded-lg bg-bs-surface-0 border border-bs-surface-3/50 text-bs-foreground-light text-sm focus:outline-none focus:border-bs-accent transition-colors" />
            </div>
            <div>
              <label class="block text-sm font-medium text-bs-foreground-dark mb-1.5">Read Time</label>
              <input v-model="form.read_time" placeholder="e.g., 8 min read" class="w-full px-4 py-2.5 rounded-lg bg-bs-surface-0 border border-bs-surface-3/50 text-bs-foreground-light text-sm focus:outline-none focus:border-bs-accent transition-colors" />
            </div>
            <div>
              <label class="block text-sm font-medium text-bs-foreground-dark mb-1.5">Image URL</label>
              <input v-model="form.image" class="w-full px-4 py-2.5 rounded-lg bg-bs-surface-0 border border-bs-surface-3/50 text-bs-foreground-light text-sm focus:outline-none focus:border-bs-accent transition-colors" />
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-bs-foreground-dark mb-1.5">Description</label>
            <textarea v-model="form.description" rows="2" class="w-full px-4 py-2.5 rounded-lg bg-bs-surface-0 border border-bs-surface-3/50 text-bs-foreground-light text-sm focus:outline-none focus:border-bs-accent transition-colors resize-none" />
          </div>
        </div>
      </div>

      <!-- Content -->
      <div class="bg-bs-surface-1 border border-bs-surface-3/50 rounded-xl p-6">
        <h2 class="text-lg font-semibold text-bs-foreground-light mb-4">Content (Markdown)</h2>
        <textarea
          v-model="form.content"
          rows="20"
          class="w-full px-4 py-2.5 rounded-lg bg-bs-surface-0 border border-bs-surface-3/50 text-bs-foreground-light text-sm font-mono focus:outline-none focus:border-bs-accent transition-colors resize-y"
          placeholder="Write your blog post content in Markdown..."
        />
      </div>

      <!-- Actions -->
      <div class="flex items-center gap-3">
        <button type="submit" :disabled="saving" class="bs-btn inline-flex items-center gap-2">
          <Icon v-if="saving" name="lucide:loader-2" class="w-4 h-4 animate-spin" />
          {{ saving ? 'Saving...' : (isNew ? 'Create Post' : 'Save Changes') }}
        </button>
        <a href="/admin/blog" class="px-4 py-2.5 rounded-lg text-sm font-medium text-bs-foreground-dark hover:text-bs-foreground-light hover:bg-bs-surface-3/50 transition-all">
          Cancel
        </a>
      </div>
    </form>
  </div>
</template>
