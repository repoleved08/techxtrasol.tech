<script setup>

const props = defineProps(['settings'])

const sortedSocialLinks = computed(() =>
  [...(props.settings?.social_links || [])].sort((a, b) => a.title.localeCompare(b.title))
)

const services = [
  'Custom Software',
  'Web Development',
  'Mobile Apps',
  'Enterprise Systems',
  'Cloud Solutions',
  'AI Solutions',
]

const resources = [
  { title: 'Blog', link: '/blog' },
  { title: 'Pricing', link: '/pricing' },
  { title: 'About', link: '/about' },
  { title: 'FAQ', link: '/#faq' },
]

</script>

<template>

  <footer
    class="@container my-24 font-semibold text-bs-foreground-dark [&_a]:hover:text-bs-foreground-light [&_a]:transition-color [&_a]:duration-150"
    id="contact">

    <!-- Wrapper -->
    <div class="relative bs-container overflow-hidden rounded-2xl">

      <!-- Background image — Nairobi -->
      <div
        class="absolute inset-0 w-full h-full object-cover opacity-25 bg-cover bg-center"
        style="background-image: url('/wallpapers/nairobi_wh10.jpg'); background-size: cover; background-position: center;"
        aria-hidden="true"
      />

      <!-- Overlay -->
      <div class="absolute inset-0 bg-bs-surface-1/70 backdrop-blur-[2px]"></div>

      <!-- Content -->
      <div class="relative z-10 p-6 md:p-16 grid md:grid-cols-2 lg:grid-cols-4 gap-8">

        <!-- Company -->
        <div class="flex flex-col gap-6">

          <!-- Logo -->
          <a class="flex group" href="#top" aria-label="Back to top">
            <Icon name="bs-icon:logo" alt="TechXtrasol" class="h-8 w-auto text-bs-foreground-light" />
          </a>

          <!-- Description -->
          <p class="text-sm text-bs-foreground-dark leading-relaxed">
            Software engineering company building mission-critical digital systems for businesses in Kenya, Africa, and globally.
          </p>

          <!-- Social links -->
          <nav class="flex gap-4">
            <a v-for="item in sortedSocialLinks" :key="item.title" :href="item.link" target="_blank" rel="noopener noreferrer"
              class="text-bs-foreground-dark/60 hover:text-bs-foreground-light transition-colors duration-300">
              {{ item.title }}
            </a>
          </nav>

        </div>

        <!-- Services -->
        <div class="flex flex-col gap-4">

          <h3 class="text-sm font-semibold text-bs-foreground-light uppercase tracking-wider">Services</h3>

          <nav class="flex flex-col gap-2">
            <span v-for="service in services" :key="service" class="text-sm text-bs-foreground-dark">
              {{ service }}
            </span>
          </nav>

        </div>

        <!-- Resources -->
        <div class="flex flex-col gap-4">

          <h3 class="text-sm font-semibold text-bs-foreground-light uppercase tracking-wider">Resources</h3>

          <nav class="flex flex-col gap-2">
            <nuxt-link v-for="item in resources" :key="item.title" :to="item.link" class="text-sm">
              {{ item.title }}
            </nuxt-link>
          </nav>

        </div>

        <!-- CTA -->
        <div class="flex flex-col gap-4">

          <h3 class="text-sm font-semibold text-bs-foreground-light uppercase tracking-wider">Get in Touch</h3>

          <p class="text-sm text-bs-foreground-dark leading-relaxed">
            {{ settings?.demo?.title || 'Free consultation' }}
          </p>

          <button type="button" class="min-w-32 bs-btn block bg-bs-surface-3 text-sm" @click="useDialogOpen">
            {{ settings?.demo?.cta || 'Get Started' }}
          </button>

          <div class="flex flex-col gap-1 mt-2">
            <span class="text-xs text-bs-foreground-dark/60">Nairobi, Kenya</span>
            <span class="text-xs text-bs-foreground-dark/60">Mombasa, Kenya</span>
          </div>

        </div>

      </div>

    </div>

    <!-- Colophon -->
    <aside class="bs-container">

      <nav class="flex gap-4 justify-center pt-16 md:pt-24 text-xs">

        <span>&copy; 2026 TechXtrasol. All rights reserved.</span>

      </nav>

    </aside>

  </footer>

</template>
