<script setup>

useSeoMeta({
  title: 'About Us — TechXtrasol Software Development Company Kenya',
  ogTitle: 'About TechXtrasol — Software Development Company Kenya',
  description: 'TechXtrasol is a custom software development company based in Nairobi and Mombasa, Kenya. We build web applications, mobile apps, and enterprise systems for businesses across Africa.',
  ogDescription: 'TechXtrasol — custom software development company in Nairobi and Mombasa, Kenya.',
  ogImage: '/1200x630.jpg',
  twitterCard: 'summary_large_image',
  keywords: 'about TechXtrasol, software company Kenya, tech company Nairobi, developers Kenya, web development company Mombasa, IT company Kenya',
})

useHead({
  link: [
    { rel: 'canonical', href: 'https://techxtrasol.tech/about' },
  ],
})

const aboutSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'About TechXtrasol',
  description: 'TechXtrasol is a custom software development company based in Nairobi and Mombasa, Kenya.',
  url: 'https://techxtrasol.tech/about',
  mainEntity: {
    '@type': 'Organization',
    name: 'TechXtrasol',
    url: 'https://techxtrasol.tech',
    description: 'Custom software development company building web applications, mobile apps, and enterprise systems.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Nairobi',
      addressCountry: 'KE',
    },
  },
}

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(aboutSchema),
    },
  ],
})
</script>

<template>

  <section class="max-w-[92vw] lg:max-w-4xl mx-auto bs-mt-md px-5 py-8 md:p-20 flex flex-col gap-12 border rounded-md bg-bs-surface-2 border-bs-surface-3">

    <!-- Title -->
    <div class="flex flex-col gap-4">
      <h1 class="bs-h1">About Techxtrasol</h1>
      <p class="text-lg text-bs-foreground-dark leading-relaxed">
        Techxtrasol is a modern software development company headquartered in <strong class="text-bs-foreground-light">Nairobi</strong> with operations in <strong class="text-bs-foreground-light">Mombasa</strong>, Kenya. We build custom software that helps businesses digitize their operations, automate workflows, and scale with confidence.
      </p>
    </div>

    <!-- Mission -->
    <div class="flex flex-col gap-4">
      <h2 class="bs-h3">Our Mission</h2>
      <p class="text-bs-foreground-dark leading-relaxed">
        We believe every business deserves access to world-class technology. From startups in Nairobi's tech hub to enterprises across East Africa, we deliver software solutions that compete on a global scale — built with modern tools, thoughtful design, and a deep understanding of local markets.
      </p>
    </div>

    <!-- What we do -->
    <div class="flex flex-col gap-4">
      <h2 class="bs-h3">What We Do</h2>
      <p class="text-bs-foreground-dark leading-relaxed">
        From custom websites and mobile apps to enterprise systems, SaaS platforms, and cloud infrastructure, we design, build, and deploy software that solves real business problems. We work with startups, SMEs, NGOs, schools, financial institutions, healthcare providers, and government agencies across Kenya and internationally.
      </p>
    </div>

    <!-- Locations -->
    <div class="flex flex-col gap-4">
      <h2 class="bs-h3">Where We're Based</h2>
      <div class="grid sm:grid-cols-2 gap-6">
        <div class="p-6 rounded-xl bg-bs-surface-1 border border-bs-surface-3 flex flex-col gap-2">
          <span class="text-xs uppercase tracking-widest font-semibold text-bs-foreground-dark">Headquarters</span>
          <span class="text-lg font-medium text-bs-foreground-light">Nairobi, Kenya</span>
          <p class="text-sm text-bs-foreground-dark">Westlands Business District</p>
        </div>
        <div class="p-6 rounded-xl bg-bs-surface-1 border border-bs-surface-3 flex flex-col gap-2">
          <span class="text-xs uppercase tracking-widest font-semibold text-bs-foreground-dark">Regional Office</span>
          <span class="text-lg font-medium text-bs-foreground-light">Mombasa, Kenya</span>
          <p class="text-sm text-bs-foreground-dark">Nyali Business Center</p>
        </div>
      </div>
    </div>

    <!-- Team preview -->
    <div class="flex flex-col gap-4">
      <h2 class="bs-h3">Our Team</h2>
      <p class="text-bs-foreground-dark leading-relaxed">
        A focused team of developers, designers, project managers, and strategists based in Kenya. We combine deep technical expertise with a business-first mindset — shipping software that works, scales, and delivers measurable results.
      </p>
    </div>

    <!-- Contact -->
    <div class="flex flex-col gap-4">
      <h2 class="bs-h3">Get in Touch</h2>
      <p class="text-bs-foreground-dark leading-relaxed">
        Have a project in mind? We'd love to hear about it. Whether you're in Nairobi, Mombasa, or anywhere in the world — book a free consultation and let's discuss how we can help bring your vision to life.
      </p>
    </div>

  </section>

</template>
