<script setup>
import team from '../data/team.json'

useSeoMeta({
  title: 'About Us — TechXtrasol Software Engineering Company Kenya',
  ogTitle: 'About TechXtrasol — Software Engineering Company Kenya',
  description: 'TechXtrasol is a software engineering company based in Nairobi and Mombasa, Kenya. We design, build, deploy, and support mission-critical digital systems for businesses across Africa and globally.',
  ogDescription: 'TechXtrasol — software engineering company in Nairobi and Mombasa, Kenya.',
  ogImage: 'https://www.techxtrasol.tech/content-images/blog-default-og.jpg',
  twitterCard: 'summary_large_image',
})

useHead({
  link: [
    { rel: 'canonical', href: 'https://www.techxtrasol.tech/about' },
  ],
})

const siteUrl = 'https://www.techxtrasol.tech'

const teamSchema = team.map(member => ({
  '@type': 'Person',
  name: member.name,
  jobTitle: member.role,
  description: member.bio,
  image: member.image.startsWith('http') ? member.image : siteUrl + member.image,
  worksFor: {
    '@type': 'Organization',
    name: 'TechXtrasol',
    url: siteUrl,
  },
  ...(member.linkedin && !member.linkedin.endsWith('/') ? { sameAs: [member.linkedin] } : {}),
}))

const breadcrumbSchema = {
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
    { '@type': 'ListItem', position: 2, name: 'About', item: siteUrl + '/about' },
  ],
}

useSchemaOrg([breadcrumbSchema, ...teamSchema])
</script>

<template>

  <section class="max-w-[92vw] lg:max-w-4xl mx-auto bs-mt-md px-5 py-8 md:p-20 flex flex-col gap-12 border rounded-md bg-bs-surface-2 border-bs-surface-3">

    <!-- Title -->
    <div class="flex flex-col gap-4">
      <h1 class="bs-h1">About TechXtrasol</h1>
      <p class="text-lg text-bs-foreground-dark leading-relaxed">
        TechXtrasol is a <strong class="text-bs-foreground-light">software engineering company</strong> headquartered in <strong class="text-bs-foreground-light">Nairobi</strong> with operations in <strong class="text-bs-foreground-light">Mombasa</strong>, Kenya. We design, build, deploy, and support mission-critical digital systems that help businesses digitize operations, automate workflows, and scale with confidence.
      </p>
    </div>

    <!-- Mission -->
    <div class="flex flex-col gap-4">
      <h2 class="bs-h3">Our Mission</h2>
      <p class="text-bs-foreground-dark leading-relaxed">
        We help startups, SMEs, enterprises, and organizations transform their operations through world-class software engineering, automation, cloud solutions, and intelligent digital products. We believe every business deserves access to technology that competes on a global scale.
      </p>
    </div>

    <!-- Vision -->
    <div class="flex flex-col gap-4">
      <h2 class="bs-h3">Our Vision</h2>
      <p class="text-bs-foreground-dark leading-relaxed">
        To become one of Africa's leading software engineering companies delivering innovative digital solutions trusted globally.
      </p>
    </div>

    <!-- Core Values -->
    <div class="flex flex-col gap-4">
      <h2 class="bs-h3">Core Values</h2>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <div v-for="value in ['Innovation', 'Excellence', 'Transparency', 'Long-term Partnerships', 'Security', 'Reliability', 'Continuous Learning']"
          :key="value"
          class="flex items-center gap-3 p-4 rounded-xl bg-bs-surface-1 border border-bs-surface-3">
          <span class="w-2 h-2 rounded-full bg-bs-accent shrink-0"></span>
          <span class="text-sm font-medium text-bs-foreground-light">{{ value }}</span>
        </div>
      </div>
    </div>

    <!-- What we do -->
    <div class="flex flex-col gap-4">
      <h2 class="bs-h3">What We Do</h2>
      <p class="text-bs-foreground-dark leading-relaxed">
        We are not simply a website development company. We are a software engineering company that builds business solutions from idea to deployment. From custom ERP systems and enterprise platforms to AI-powered solutions and cloud infrastructure, we solve business problems using technology.
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
        A focused team of software engineers, designers, project managers, and strategists based in Kenya. We combine deep technical expertise with a business-first mindset — engineering software that works, scales, and delivers measurable results.
      </p>
    </div>

    <!-- Contact -->
    <div class="flex flex-col gap-4">
      <h2 class="bs-h3">Get in Touch</h2>
      <p class="text-bs-foreground-dark leading-relaxed">
        Have a business challenge that needs a technical solution? We'd love to hear about it. Whether you're in Nairobi, Mombasa, or anywhere in the world — book a free consultation and let's discuss how we can engineer the right solution for your business.
      </p>
    </div>

  </section>

</template>
