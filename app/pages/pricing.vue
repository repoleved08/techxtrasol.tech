<script setup>
import pricing from '../data/pricing.json'

useSeoMeta({
  title: 'Pricing — Web Development, Maintenance & Social Media | TechXtrasol',
  ogTitle: 'TechXtrasol Pricing — Web Development & Digital Services',
  description: 'Transparent pricing for custom web development (from KES 45,000), website maintenance (from KES 5,000/mo), and social media management (from KES 25,000/mo). Choose the plan that fits your business in Kenya.',
  ogDescription: 'Transparent pricing for web development, website maintenance, and social media management in Kenya.',
  ogImage: '/content-images/blog-default-og.jpg',
  twitterCard: 'summary_large_image',
  keywords: 'web development pricing Kenya, website cost Kenya, software development prices, maintenance plan Kenya, social media management pricing, Laravel development cost, website packages Kenya',
})

useHead({
  link: [
    { rel: 'canonical', href: 'https://techxtrasol.tech/pricing' },
  ],
})

const pricingSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'TechXtrasol Pricing',
  description: 'Transparent pricing for web development, website maintenance, and social media management.',
  url: 'https://techxtrasol.tech/pricing',
  provider: {
    '@type': 'Organization',
    name: 'TechXtrasol',
    url: 'https://techxtrasol.tech',
  },
}

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(pricingSchema),
    },
  ],
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
