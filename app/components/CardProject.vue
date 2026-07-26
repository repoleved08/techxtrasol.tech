<script setup>
const props = defineProps(['project'])

const technologies = computed(() => {
  if (!props.project.technologies) return []
  if (Array.isArray(props.project.technologies)) return props.project.technologies
  try { return JSON.parse(props.project.technologies) } catch { return [] }
})
</script>

<template>
  <NuxtLink
    :to="`/projects/${project.slug}`"
    class="group block bg-bs-surface-1 border border-bs-surface-3/50 rounded-xl overflow-hidden hover:border-bs-accent/30 transition-all duration-300"
  >
    <div class="h-48 bg-bs-surface-3/50 overflow-hidden">
      <img
        v-if="project.featured_image"
        :src="project.featured_image"
        :alt="project.title"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
      />
      <div v-else class="w-full h-full flex items-center justify-center">
        <Icon name="lucide:briefcase" class="w-12 h-12 text-bs-surface-3" />
      </div>
    </div>
    <div class="p-5">
      <div class="flex items-center gap-2 mb-2">
        <span v-if="project.featured" class="text-xs px-2 py-0.5 rounded-full bg-bs-accent/10 text-bs-accent">Featured</span>
        <span v-if="project.client_name" class="text-xs text-bs-foreground-dark">{{ project.client_name }}</span>
      </div>
      <h3 class="font-semibold text-bs-foreground-light mb-2 group-hover:text-bs-accent transition-colors">{{ project.title }}</h3>
      <p class="text-sm text-bs-foreground-dark line-clamp-2 mb-3">{{ project.short_description }}</p>
      <div class="flex flex-wrap gap-1">
        <span
          v-for="tech in technologies.slice(0, 4)"
          :key="tech"
          class="text-xs px-2 py-0.5 rounded-full bg-bs-surface-3/50 text-bs-foreground-dark"
        >
          {{ tech }}
        </span>
      </div>
    </div>
  </NuxtLink>
</template>
