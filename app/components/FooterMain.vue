<script setup>

const props = defineProps(['settings'])

const sortedNav = computed(() =>
  [...(props.settings?.nav || [])].sort((a, b) => a.title.localeCompare(b.title))
)

const sortedSocialLinks = computed(() =>
  [...(props.settings?.social_links || [])].sort((a, b) => a.title.localeCompare(b.title))
)

</script>

<template>

  <footer
    class="@container my-24 font-semibold text-bs-foreground-dark [&_a]:hover:text-bs-foreground-light [&_a]:transition-color [&_a]:duration-150"
    id="contact">

    <!-- Wrapper -->
    <div class="relative bs-container overflow-hidden rounded-2xl">

      <!-- Background image — Nairobi -->
      <img
        src="/wallpapers/nairobi_wh10.jpg"
        alt=""
        class="absolute inset-0 w-full h-full object-cover opacity-25"
        loading="lazy"
      />

      <!-- Overlay -->
      <div class="absolute inset-0 bg-bs-surface-1/70 backdrop-blur-[2px]"></div>

      <!-- Content -->
      <div class="relative z-10 p-6 md:p-16 grid md:grid-cols-2 gap-8">

        <!-- Left col -->
        <div class="w-max flex flex-col gap-8 md:gap-0 justify-between text-bs-foreground-light">

          <!-- Logo -->
          <a class="flex group" href="#top" aria-label="Back to top">

            <img src="/icons/logo.svg" alt="Techxtrasol" class="h-8 w-auto" />

          </a>

          <!-- CTA title -->
          <h2 class="bs-h3">{{ settings.demo.title }}</h2>

          <!-- CTA Button -->
          <button type="button" class="min-w-32 bs-btn block bg-bs-surface-3" @click="useDialogOpen">

            {{ settings.demo.cta }}

          </button>

        </div>

        <!-- Right col -->
        <div class="flex gap-10 md:gap-2 lg:gap-20 md:justify-end [&_a]:block md:[&_a]:px-5 [&_a]:py-2">

          <!-- Nav -->
          <nav class="flex flex-col">

            <a v-for="item in sortedNav" :key="item.title" :href="item.link">
              {{ item.title }}
            </a>

          </nav>

          <!-- Social links -->
          <nav class="flex flex-col">

            <a v-for="item in sortedSocialLinks" :key="item.title" :href="item.link" target="_blank" rel="noopener noreferrer">
              {{ item.title }}
            </a>

          </nav>

        </div>

      </div>

    </div>

    <!-- Colophon -->
    <aside class="bs-container">

      <nav class="flex gap-4 justify-center pt-16 md:pt-24 text-xs">

        <span>&copy; {{ new Date().getFullYear() }} Techxtrasol. All rights reserved.</span>

        <nuxt-link to="/credits">about / credits</nuxt-link>

      </nav>

    </aside>

  </footer>

</template>
