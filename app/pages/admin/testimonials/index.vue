<script setup>
definePageMeta({ middleware: 'auth-admin', layout: 'admin' })

const { getAllTestimonials, deleteTestimonial } = useTestimonials()

const items = ref([])
const loading = ref(true)

onMounted(async () => {
  try { items.value = await getAllTestimonials() }
  finally { loading.value = false }
})

async function handleDelete(id) {
  if (!confirm('Delete this testimonial?')) return
  await deleteTestimonial(id)
  items.value = items.value.filter(i => i.id !== id)
}

async function togglePublished(item) {
  const supabase = useSupabase()
  await supabase.from('testimonials').update({ published: !item.published }).eq('id', item.id)
  item.published = !item.published
}
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold text-bs-foreground-light">Testimonials</h1>
        <p class="text-sm text-bs-foreground-dark mt-1">Client testimonials and reviews</p>
      </div>
      <a href="/admin/testimonials/new" class="bs-btn inline-flex items-center gap-2">
        <Icon name="lucide:plus" class="w-4 h-4" /> New Testimonial
      </a>
    </div>

    <div v-if="loading" class="flex items-center justify-center py-20">
      <div class="w-8 h-8 border-2 border-bs-accent border-t-transparent rounded-full animate-spin" />
    </div>

    <div v-else-if="items.length === 0" class="text-center py-20 bg-bs-surface-1 border border-bs-surface-3/50 rounded-xl">
      <Icon name="lucide:quote" class="w-16 h-16 text-bs-surface-3 mx-auto mb-4" />
      <p class="text-bs-foreground-dark mb-4">No testimonials yet</p>
      <a href="/admin/testimonials/new" class="bs-btn-sm">Add First Testimonial</a>
    </div>

    <div v-else class="space-y-3">
      <div v-for="item in items" :key="item.id"
        class="flex items-center gap-4 p-4 bg-bs-surface-1 border border-bs-surface-3/50 rounded-xl hover:border-bs-surface-3 transition-colors transition-transform transition-opacity">
        <div class="w-10 h-10 rounded-full bg-bs-accent/20 flex items-center justify-center text-bs-accent font-bold text-sm shrink-0">
          {{ (item.client_name || '?').charAt(0) }}
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium text-bs-foreground-light truncate">{{ item.client_name }}</p>
          <p class="text-xs text-bs-foreground-dark truncate">{{ item.client_title }}{{ item.client_company ? ` · ${item.client_company}` : '' }}</p>
          <p class="text-xs text-bs-foreground-dark/60 mt-1 line-clamp-1">"{{ item.quote }}"</p>
        </div>
        <div class="flex items-center gap-2 shrink-0">
          <button @click="togglePublished(item)"
            class="text-xs px-2 py-0.5 rounded-full transition-colors"
            :class="item.published ? 'bg-green-400/10 text-green-400' : 'bg-bs-surface-3/50 text-bs-foreground-dark'">
            {{ item.published ? 'Published' : 'Draft' }}
          </button>
          <span v-if="item.rating" class="text-xs text-amber-400">{{ item.rating }}/5</span>
          <a :href="`/admin/testimonials/${item.id}`" class="p-1.5 rounded-lg text-bs-foreground-dark hover:text-bs-accent hover:bg-bs-accent/10 transition-colors transition-transform transition-opacity">
            <Icon name="lucide:pencil" class="w-4 h-4" />
          </a>
          <button @click="handleDelete(item.id)" class="p-1.5 rounded-lg text-bs-foreground-dark hover:text-red-400 hover:bg-red-400/10 transition-colors transition-transform transition-opacity">
            <Icon name="lucide:trash-2" class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
