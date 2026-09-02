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
    class="group relative flex flex-col bg-bs-surface-0 border border-bs-surface-3 rounded-xl overflow-hidden transition-colors transition-transform transition-opacity duration-500 ease-bs-spring hover:border-bs-accent/40 hover:shadow-[0_0_40px_rgba(99,102,241,0.08)]"
  >
    <!-- Image -->
    <div class="relative h-52 overflow-hidden">
      <img
        v-if="project.featured_image"
        :src="project.featured_image"
        :alt="project.title"
        class="w-full h-full object-cover transition-transform duration-700 ease-bs-spring group-hover:scale-110"
        loading="lazy"
      />
      <div v-else class="w-full h-full flex items-center justify-center bg-bs-surface-2">
        <Icon name="lucide:briefcase" class="w-12 h-12 text-bs-surface-3" />
      </div>
      <!-- Gradient overlay -->
      <div class="absolute inset-0 bg-gradient-to-t from-bs-surface-0 via-bs-surface-0/40 to-transparent" />
      <!-- Featured badge -->
      <div v-if="project.featured" class="absolute top-4 left-4 z-10">
        <span class="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-semibold px-2.5 py-1 rounded-full bg-bs-accent text-white">
          <svg class="w-2.5 h-2.5" viewBox="0 0 10 10" fill="currentColor"><polygon points="5,0 6.5,3.5 10,3.5 7.2,6 8.2,10 5,7.5 1.8,10 2.8,6 0,3.5 3.5,3.5"/></svg>
          Featured
        </span>
      </div>
    </div>

    <!-- Content -->
    <div class="flex flex-col flex-1 p-5 gap-3">
      <!-- Client + industry -->
      <div class="flex items-center gap-2">
        <span v-if="project.client_name" class="text-xs font-medium text-bs-accent">{{ project.client_name }}</span>
        <span v-if="project.client_name && project.client_industry" class="text-bs-surface-3">·</span>
        <span v-if="project.client_industry" class="text-xs text-bs-foreground-dark">{{ project.client_industry }}</span>
      </div>

      <!-- Title -->
      <h3 class="font-display font-semibold text-lg text-bs-foreground-light leading-tight group-hover:text-bs-accent transition-colors duration-300">
        {{ project.title }}
      </h3>

      <!-- Description -->
      <p class="text-sm text-bs-foreground-dark leading-relaxed line-clamp-2 flex-1">
        {{ project.short_description }}
      </p>

      <!-- Tech tags -->
      <div v-if="technologies.length" class="flex flex-wrap gap-1.5 mt-auto pt-1">
        <span
          v-for="tech in technologies.slice(0, 4)"
          :key="tech"
          class="text-[10px] px-2 py-0.5 rounded-full bg-bs-accent/8 text-bs-accent/80 border border-bs-accent/15"
        >
          {{ tech }}
        </span>
        <span v-if="technologies.length > 4" class="text-[10px] px-2 py-0.5 rounded-full bg-bs-surface-2 text-bs-foreground-dark">
          +{{ technologies.length - 4 }}
        </span>
      </div>

      <!-- Duration + arrow -->
      <div class="flex items-center justify-between pt-2 border-t border-bs-surface-3/50 mt-1">
        <span v-if="project.duration" class="text-xs text-bs-foreground-dark">{{ project.duration }}</span>
        <span class="ml-auto inline-flex items-center gap-1 text-xs font-medium text-bs-foreground-dark group-hover:text-bs-accent transition-colors duration-300">
          View Project
          <svg class="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" viewBox="0 0 14 14" fill="none">
            <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>
      </div>
    </div>
  </NuxtLink>
</template>
