<script setup>
const props = defineProps(['title'])
</script>

<template>
  <section class="bs-container bs-mt-lg" id="projects">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <h2 v-if="title" class="bs-h2 text-center md:text-left">{{ title }}</h2>
      <NuxtLink to="/projects" class="bs-btn-sm !bg-transparent !border-bs-surface-3/50 hover:!border-bs-accent hover:!text-bs-accent">
        View All
        <svg class="w-4 h-4 ml-1" viewBox="0 0 16 16" fill="none">
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </NuxtLink>
    </div>
    <slot />
  </section>
</template>
