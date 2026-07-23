<script setup>

import services from '../data/services.json'
import clients from '../data/clients.json'
import why_choose from '../data/why_choose.json'
import process from '../data/process.json'
import tech_stack from '../data/tech_stack.json'
import team from '../data/team.json'

useSeoMeta({
  title: 'About — Techxtrasol',
  ogTitle: 'About Techxtrasol',
  description: 'Learn about Techxtrasol — our team, our process, and the technologies we use to build custom software for businesses in Kenya and beyond.',
  ogDescription: 'Learn about Techxtrasol — our team, our process, and the technologies we use.',
})

</script>

<template>

  <section class="max-w-[92vw] lg:max-w-4xl mx-auto bs-mt-md px-5 py-8 md:p-20 flex flex-col gap-12 border rounded-md bg-bs-surface-2 border-bs-surface-3">

    <!-- Title -->
    <div class="flex flex-col gap-4">
      <h1 class="bs-h1">About Techxtrasol</h1>
      <p class="text-lg text-bs-foreground-dark leading-relaxed">
        We are a modern software development company based in Kenya. We build custom software that helps businesses digitize their operations, automate workflows, and scale with confidence. Our team combines deep technical expertise with a business-first mindset.
      </p>
    </div>

    <!-- What we do -->
    <div class="flex flex-col gap-4">
      <h2 class="bs-h3">What We Do</h2>
      <p class="text-bs-foreground-dark leading-relaxed">
        From custom websites and mobile apps to enterprise systems and cloud platforms, we design, build, and deploy software that solves real business problems. We work with startups, SMEs, NGOs, schools, financial institutions, and government agencies.
      </p>
    </div>

    <!-- Team preview -->
    <div class="flex flex-col gap-4">
      <h2 class="bs-h3">Our Team</h2>
      <p class="text-bs-foreground-dark leading-relaxed">
        A small, focused team of developers, designers, project managers, and strategists who care deeply about the quality of the software we ship.
      </p>
    </div>

    <!-- Contact -->
    <div class="flex flex-col gap-4">
      <h2 class="bs-h3">Get in Touch</h2>
      <p class="text-bs-foreground-dark leading-relaxed">
        Have a project in mind? We'd love to hear about it. Book a free consultation and let's discuss how we can help bring your vision to life.
      </p>
    </div>

  </section>

</template>
