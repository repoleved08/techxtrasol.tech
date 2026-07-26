<script setup>
definePageMeta({ middleware: 'auth-admin', layout: 'admin' })

const { getAllGallery, deleteGalleryItem, togglePublish, toggleFeatured } = useGallery()

const items = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    items.value = await getAllGallery()
  }
  finally {
    loading.value = false
  }
})

async function handleDelete(id) {
  if (!confirm('Delete this gallery item?')) return
  await deleteGalleryItem(id)
  items.value = items.value.filter(i => i.id !== id)
}

async function handleTogglePublish(item) {
  await togglePublish(item.id, !item.published)
  item.published = !item.published
}

async function handleToggleFeatured(item) {
  await toggleFeatured(item.id, !item.featured)
  item.featured = !item.featured
}
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold text-bs-foreground-light">Design Gallery</h1>
        <p class="text-sm text-bs-foreground-dark mt-1">Showcase your Canva, Photoshop, and design work</p>
      </div>
      <a href="/admin/gallery/new" class="bs-btn inline-flex items-center gap-2">
        <Icon name="lucide:plus" class="w-4 h-4" />
        New Design
      </a>
    </div>

    <div v-if="loading" class="flex items-center justify-center py-20">
      <div class="w-8 h-8 border-2 border-bs-accent border-t-transparent rounded-full animate-spin" />
    </div>

    <div v-else-if="items.length === 0" class="text-center py-20 bg-bs-surface-1 border border-bs-surface-3/50 rounded-xl">
      <Icon name="lucide:image" class="w-16 h-16 text-bs-surface-3 mx-auto mb-4" />
      <p class="text-bs-foreground-dark mb-4">No designs yet</p>
      <a href="/admin/gallery/new" class="bs-btn-sm">Upload Your First Design</a>
    </div>

    <div v-else class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <div v-for="item in items" :key="item.id"
        class="group bg-bs-surface-1 border border-bs-surface-3/50 rounded-xl overflow-hidden hover:border-bs-accent/30 transition-all">
        <!-- Image -->
        <div class="relative h-44 bg-bs-surface-3/30 overflow-hidden">
          <img :src="item.image_url" :alt="item.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
          <!-- Status badges -->
          <div class="absolute top-2 left-2 flex gap-1.5">
            <span v-if="item.published" class="text-[10px] px-1.5 py-0.5 rounded-full bg-green-400/90 text-black font-semibold">Live</span>
            <span v-else class="text-[10px] px-1.5 py-0.5 rounded-full bg-bs-surface-3/80 text-white font-semibold">Draft</span>
            <span v-if="item.featured" class="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-400/90 text-black font-semibold">Featured</span>
          </div>
          <!-- Actions overlay -->
          <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <a :href="`/admin/gallery/${item.id}`"
              class="p-2 rounded-lg bg-bs-surface-1 text-bs-foreground-light hover:bg-bs-surface-3 transition-colors">
              <Icon name="lucide:pencil" class="w-4 h-4" />
            </a>
            <button @click="handleTogglePublish(item)"
              class="p-2 rounded-lg bg-bs-surface-1 text-bs-foreground-light hover:bg-bs-surface-3 transition-colors">
              <Icon :name="item.published ? 'lucide:eye-off' : 'lucide:eye'" class="w-4 h-4" />
            </button>
            <button @click="handleToggleFeatured(item)"
              class="p-2 rounded-lg bg-bs-surface-1 hover:bg-bs-surface-3 transition-colors"
              :class="item.featured ? 'text-yellow-400' : 'text-bs-foreground-light'">
              <Icon :name="item.featured ? 'lucide:star-off' : 'lucide:star'" class="w-4 h-4" />
            </button>
            <button @click="handleDelete(item.id)"
              class="p-2 rounded-lg bg-bs-surface-1 text-red-400 hover:bg-red-500/20 transition-colors">
              <Icon name="lucide:trash-2" class="w-4 h-4" />
            </button>
          </div>
        </div>
        <!-- Info -->
        <div class="p-3">
          <h3 class="text-sm font-medium text-bs-foreground-light truncate">{{ item.title }}</h3>
          <div class="flex items-center gap-2 mt-1">
            <span class="text-[10px] px-1.5 py-0.5 rounded-full bg-bs-surface-3/50 text-bs-foreground-dark capitalize">{{ item.category }}</span>
            <span v-if="item.client_name" class="text-[10px] text-bs-foreground-dark truncate">{{ item.client_name }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
