<script setup>
import pricing from '../data/pricing.json'

useSeoMeta({
  title: 'Pricing — Web Development, Maintenance & Social Media | TechXtrasol',
  ogTitle: 'TechXtrasol Pricing — Web Development & Digital Services',
  description: 'Transparent pricing for custom web development (from KES 45,000), website maintenance (from KES 5,000/mo), and social media management (from KES 25,000/mo). Choose the plan that fits your business in Kenya.',
  ogDescription: 'Transparent pricing for web development, website maintenance, and social media management in Kenya.',
  ogImage: 'https://techxtrasol.tech/content-images/blog-default-og.jpg',
  twitterCard: 'summary_large_image',
  keywords: 'web development pricing Kenya, website cost Kenya, software development prices, maintenance plan Kenya, social media management pricing, Laravel development cost, website packages Kenya',
})

useHead({
  link: [
    { rel: 'canonical', href: 'https://techxtrasol.tech/pricing' },
  ],
})

const siteUrl = 'https://techxtrasol.tech'

const toProductSchema = (plan, category) => ({
  '@type': 'Product',
  name: plan.name,
  description: plan.description,
  category,
  offers: {
    '@type': 'Offer',
    priceCurrency: 'KES',
    price: plan.price.replace(/[^0-9]/g, '').trim() || undefined,
    priceValidUntil: '2027-12-31',
    availability: 'https://schema.org/InStock',
    url: siteUrl + '/pricing',
    seller: { '@type': 'Organization', name: 'TechXtrasol', url: siteUrl },
  },
})

const offersSchema = [
  ...pricing.plans.map(plan => toProductSchema(plan, 'Web Development & Custom Software')),
  ...pricing.maintenance.plans.map(plan => toProductSchema(plan, 'System Maintenance & Support')),
  ...pricing.social_media.plans.map(plan => toProductSchema(plan, 'Digital Marketing & Growth')),
]

useSchemaOrg(offersSchema)
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
