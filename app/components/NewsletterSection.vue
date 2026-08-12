<script setup>

const props = defineProps(['newsletter'])

</script>

<template>

  <aside class="@container bs-container bs-mt-lg text-center" id="newsletter">

    <!-- Wrapper -->
    <div class="p-6 md:py-16 relative rounded-xl overflow-hidden flex justify-center isolate w-full h-full">

      <!-- BG image -->
      <NuxtImg
        src="/hero-image.jpg"
        alt=""
        format="avif"
        :height="1080"
        :width="1920"
        loading="lazy"
        class="rounded-xl overflow-hidden w-full h-full object-cover object-left absolute inset-0 opacity-50" />

      <!-- Content -->
      <div class="z-10 p-6 md:p-10 lg:p-20 rounded-xl md:max-w-lg flex flex-col gap-6 bg-bs-surface-0/95 h-full">

        <!-- Title -->
        <h2 class="bs-h2" v-html="newsletter.title" />

        <!-- Intro -->
        <div class="bs-body-text flex-grow" v-html="newsletter.content" />

        <!-- CTA -->
        <button type="button" class="bs-btn form-input px-4 py-3" @click="useDialogOpen">

          {{ newsletter.cta }}

        </button>

      </div>

    </div>

  </aside>

</template>
