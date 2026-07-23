<script setup>

const props = defineProps(['settings', 'title', 'content'])

</script>

<template>

  <section class="bs-container py-6 flex flex-col lg:flex-row items-center">

    <!-- Content -->
    <div class="flex flex-col gap-6 lg:max-w-xl w-full py-16">

      <!-- Title -->
      <h1 class="bs-h1" v-html="title" />

      <!-- Content -->
      <div
        class="bs-body-text xl:text-xl flex flex-col gap-4 [&_p]:last:text-bs-foreground-dark"
        v-html="content"
      />

      <!-- CTAs -->
      <div class="flex flex-wrap gap-4 mt-2">

        <button
          type="button"
          class="bs-btn self-start"
          @click="useDialogOpen"
        >
          {{ settings.demo.cta }}
        </button>

        <a
          href="/#services"
          class="bs-btn !bg-transparent self-start"
        >
          Explore Services
        </a>

      </div>

      <!-- Trust indicators -->
      <div class="flex flex-wrap gap-6 mt-4 text-sm text-bs-foreground-dark font-medium">
        <span class="flex items-center gap-2">
          <Icon name="bs-icon:check" size="16" /> Free consultation
        </span>
        <span class="flex items-center gap-2">
          <Icon name="bs-icon:check" size="16" /> On-time delivery
        </span>
        <span class="flex items-center gap-2">
          <Icon name="bs-icon:check" size="16" /> Full source code ownership
        </span>
      </div>

    </div>

    <!-- Image -->
    <figure class="flex place-content-center -mt-20 lg:mt-0">

      <NuxtImg
        fit="contain"
        format="avif"
        width="1290"
        height="1000"
        quality="90"
        src="/hero-screens.png"
        alt="Screens showing phone, tablet and desktop views of software built by Techxtrasol"
        loading="eager"
      />

    </figure>

  </section>

</template>
