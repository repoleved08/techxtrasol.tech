<script setup>
definePageMeta({ middleware: 'auth-admin', layout: 'admin' })

const { getAllServices, deleteService, updateService } = useServices()

const services = ref([])
const loading = ref(true)

async function loadServices() {
  loading.value = true
  try {
    services.value = await getAllServices()
  }
  finally {
    loading.value = false
  }
}

onMounted(loadServices)

async function handleDelete(id) {
  if (!confirm('Are you sure you want to delete this service?')) return
  await deleteService(id)
  await loadServices()
}

async function handleTogglePublish(id, published) {
  await updateService(id, { published: !published })
  await loadServices()
}
</script>

<template>
  <div>
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div>
        <h1 class="text-2xl font-bold text-bs-foreground-light">Services</h1>
        <p class="text-sm text-bs-foreground-dark mt-1">Manage your service offerings</p>
      </div>
      <a href="/admin/services/new" class="bs-btn inline-flex items-center gap-2">
        <Icon name="lucide:plus" class="w-4 h-4" />
        New Service
      </a>
    </div>

    <div v-if="loading" class="flex items-center justify-center py-20">
      <div class="w-8 h-8 border-2 border-bs-accent border-t-transparent rounded-full animate-spin" />
    </div>

    <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="service in services"
        :key="service.id"
        class="bg-bs-surface-1 border border-bs-surface-3/50 rounded-xl p-5 hover:border-bs-surface-3 transition-colors"
      >
        <div class="flex items-start justify-between gap-2 mb-3">
          <h3 class="font-semibold text-bs-foreground-light">{{ service.title }}</h3>
          <button
            class="shrink-0 text-xs px-2 py-0.5 rounded-full transition-colors"
            :class="service.published ? 'bg-green-400/10 text-green-400' : 'bg-yellow-400/10 text-yellow-400'"
            @click="handleTogglePublish(service.id, service.published)"
          >
            {{ service.published ? 'Live' : 'Draft' }}
          </button>
        </div>
        <p class="text-sm text-bs-foreground-dark mb-3 line-clamp-2">{{ service.short_description || 'No description' }}</p>
        <div class="flex flex-wrap gap-1 mb-4">
          <span v-for="f in (service.features || []).slice(0, 3)" :key="f" class="text-xs px-2 py-0.5 rounded-full bg-bs-surface-3/50 text-bs-foreground-dark">
            {{ f }}
          </span>
        </div>
        <div class="flex items-center gap-2">
          <a :href="`/admin/services/${service.id}`" class="flex-1 text-center px-3 py-1.5 rounded-lg text-xs font-medium bg-bs-surface-3/50 text-bs-foreground-dark hover:text-bs-foreground-light transition-colors">
            Edit
          </a>
          <button class="px-3 py-1.5 rounded-lg text-xs font-medium text-red-400 hover:bg-red-500/10 transition-colors" @click="handleDelete(service.id)">
            Delete
          </button>
        </div>
      </div>

      <div v-if="services.length === 0" class="col-span-full py-12 text-center text-bs-foreground-dark text-sm">
        No services yet.
      </div>
    </div>
  </div>
</template>
