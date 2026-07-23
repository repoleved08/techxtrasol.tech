<script setup>
import pricing from '../data/pricing.json'

useSeoMeta({
  title: 'Pricing — TechXtrasol',
  ogTitle: 'TechXtrasol Pricing',
  description: 'Transparent pricing for web development, website maintenance, and social media management. Choose the plan that fits your business.',
  ogDescription: 'Transparent pricing for web development, website maintenance, and social media management.',
})
</script>

<template>

  <section class="bs-mt-lg">

    <!-- Header -->
    <div class="bs-container text-center max-w-3xl mx-auto">
      <h1 class="text-4xl sm:text-5xl font-bold tracking-tight text-bs-foreground-light">
        {{ pricing.title }}
      </h1>
      <p class="bs-body mt-4 text-bs-foreground-dark/70 text-lg">{{ pricing.subtitle }}</p>
    </div>

    <PricingSection :data="pricing" />

  </section>

</template>
