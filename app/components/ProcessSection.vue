<script setup>

const props = defineProps(['title', 'steps'])

</script>

<template>

  <section class="relative bs-container bs-mt-lg" id="process">

    <!-- Background image -->
    <NuxtImg
      src="/content-images/blackspike-wallpaper-02.avif"
      alt="Decorative background image"
      format="avif"
      class="absolute inset-0 w-full h-full object-cover rounded-2xl opacity-40"
      loading="lazy"
    />

    <!-- Overlay -->
    <div class="absolute inset-0 rounded-2xl bg-bs-surface-1/60 backdrop-blur-[2px]"></div>

    <!-- Content -->
    <div class="relative z-10 p-6 md:p-12">

      <h2 v-if="title" class="bs-h2 text-center md:text-left">{{ title }}</h2>

      <div class="bs-mt-md grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        <article
          v-for="(step, idx) in steps"
          :key="idx"
          class="group relative p-6 md:p-10 rounded-xl bg-bs-surface-0/60 backdrop-blur-sm border border-bs-surface-3 flex flex-col gap-4 hover:bg-bs-surface-0/80 hover:border-bs-foreground-dark/20 transition-colors transition-transform transition-opacity duration-300"
        >

          <!-- Step number -->
          <div class="flex items-center gap-3">

            <span class="text-4xl md:text-5xl font-display font-medium text-bs-foreground-light/10 group-hover:text-bs-foreground-light/20 transition-colors duration-300">
              {{ step.step }}
            </span>

          </div>

          <!-- Title -->
          <h3 class="bs-h3 group-hover:text-bs-foreground-light transition-colors duration-300">
            {{ step.title }}
          </h3>

          <!-- Description -->
          <p class="text-bs-foreground-dark leading-relaxed flex-1">
            {{ step.description }}
          </p>

          <!-- Details -->
          <div v-if="step.details" class="flex flex-wrap gap-2 pt-2 border-t border-bs-surface-3">
            <span v-for="(detail, dIdx) in step.details" :key="dIdx"
              class="text-xs px-2 py-1 rounded bg-bs-surface-3/50 text-bs-foreground-dark/70">
              {{ detail }}
            </span>
          </div>

        </article>

      </div>

    </div>

  </section>

</template>
