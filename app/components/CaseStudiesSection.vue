<script setup>
const props = defineProps(['title', 'caseStudies'])
</script>

<template>
  <section class="bs-container bs-mt-lg" id="case-studies">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <h2 v-if="title" class="bs-h2 text-center md:text-left">{{ title }}</h2>
      <NuxtLink to="/case-studies" class="bs-btn-sm !bg-transparent !border-bs-surface-3/50 hover:!border-bs-accent hover:!text-bs-accent">
        View All
        <svg class="w-4 h-4 ml-1" viewBox="0 0 16 16" fill="none">
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </NuxtLink>
    </div>

    <!-- Featured case study (first) — horizontal layout -->
    <div class="bs-mt-md">
      <CardCaseStudy v-if="caseStudies[0]" :caseStudy="caseStudies[0]" :featured="true" />
    </div>

    <!-- Case studies grid -->
    <div class="mt-8 grid lg:grid-cols-2 gap-8">
      <CardCaseStudy
        v-for="(cs, idx) in caseStudies.slice(1)"
        :key="cs.id || idx"
        :caseStudy="cs"
      />
    </div>
  </section>
</template>
