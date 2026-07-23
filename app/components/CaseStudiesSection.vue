<script setup>

const props = defineProps(['title', 'caseStudies'])

</script>

<template>

  <section class="bs-container bs-mt-lg" id="case-studies">

    <!-- Header -->
    <h2 v-if="title" class="bs-h2 text-center md:text-left">{{ title }}</h2>

    <!-- Featured case study (first) -->
    <div class="bs-mt-md">

      <CardCaseStudy v-if="caseStudies[0]" :caseStudy="caseStudies[0]" />

    </div>

    <!-- Case studies grid -->
    <div class="mt-8 grid lg:grid-cols-2 gap-8">

      <CardCaseStudy
        v-for="(cs, idx) in caseStudies.slice(1)"
        :key="idx"
        :caseStudy="cs"
      />

    </div>

  </section>

</template>
