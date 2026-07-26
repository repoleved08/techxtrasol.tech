<script setup>
const props = defineProps(['caseStudy', 'featured'])
</script>

<template>
  <NuxtLink
    :to="`/case-studies/${caseStudy.slug}`"
    class="group relative flex flex-col bg-bs-surface-0 border border-bs-surface-3 rounded-xl overflow-hidden transition-all duration-500 ease-bs-spring hover:border-bs-accent/40 hover:shadow-[0_0_40px_rgba(99,102,241,0.08)]"
    :class="featured ? 'lg:flex-row lg:h-[28rem]' : ''"
  >
    <!-- Image -->
    <div class="relative overflow-hidden" :class="featured ? 'lg:w-1/2 h-64 lg:h-full' : 'h-56'">
      <img
        v-if="caseStudy.featured_image"
        :src="caseStudy.featured_image"
        :alt="caseStudy.title"
        class="w-full h-full object-cover transition-transform duration-700 ease-bs-spring group-hover:scale-110"
        loading="lazy"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-bs-surface-0 via-bs-surface-0/40 to-transparent" :class="featured ? 'lg:bg-gradient-to-r lg:from-transparent lg:via-bs-surface-0/60 lg:to-bs-surface-0' : ''" />
    </div>

    <!-- Content -->
    <div class="flex flex-col flex-1 p-6 gap-4" :class="featured ? 'lg:p-10 lg:justify-center' : ''">
      <!-- Badge -->
      <div class="flex items-center gap-2">
        <span class="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-semibold px-2.5 py-1 rounded-full bg-bs-accent/10 text-bs-accent border border-bs-accent/20">
          <svg class="w-2.5 h-2.5" viewBox="0 0 10 10" fill="currentColor"><polygon points="5,0 6.5,3.5 10,3.5 7.2,6 8.2,10 5,7.5 1.8,10 2.8,6 0,3.5 3.5,3.5"/></svg>
          Case Study
        </span>
      </div>

      <!-- Title -->
      <h3 class="font-display font-semibold leading-tight group-hover:text-bs-accent transition-colors duration-300"
          :class="featured ? 'text-2xl lg:text-3xl' : 'text-lg'">
        {{ caseStudy.title }}
      </h3>

      <!-- Intro -->
      <p class="text-sm text-bs-foreground-dark leading-relaxed" :class="featured ? 'line-clamp-5 lg:text-base' : 'line-clamp-3'">
        {{ caseStudy.introduction }}
      </p>

      <!-- CTA -->
      <div class="flex items-center gap-2 mt-auto pt-2">
        <span class="inline-flex items-center gap-2 text-sm font-medium text-bs-accent group-hover:gap-3 transition-all duration-300">
          Read Case Study
          <svg class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>
      </div>
    </div>
  </NuxtLink>
</template>
