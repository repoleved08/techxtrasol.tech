<script setup>
const props = defineProps(['caseStudy'])
</script>

<template>
  <NuxtLink
    :to="`/case-studies/${caseStudy.slug}`"
    class="group block bg-bs-surface-1 border border-bs-surface-3/50 rounded-xl overflow-hidden hover:border-bs-accent/30 transition-all duration-300"
  >
    <div v-if="caseStudy.featured_image" class="h-56 bg-bs-surface-3/50 overflow-hidden">
      <img
        :src="caseStudy.featured_image"
        :alt="caseStudy.title"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
      />
    </div>
    <div class="p-6">
      <h3 class="text-lg font-bold text-bs-foreground-light mb-2 group-hover:text-bs-accent transition-colors">
        {{ caseStudy.title }}
      </h3>
      <p class="text-sm text-bs-foreground-dark line-clamp-3 mb-4">
        {{ caseStudy.introduction }}
      </p>
      <span class="inline-flex items-center gap-1.5 text-sm text-bs-accent font-medium">
        Read Case Study
        <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 16 16" fill="none">
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </span>
    </div>
  </NuxtLink>
</template>
