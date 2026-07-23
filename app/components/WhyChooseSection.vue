<script setup>

const props = defineProps(['title', 'items'])

</script>

<template>

  <section class="bs-container bs-mt-lg" id="why-choose">

    <h2 v-if="title" class="bs-h2 text-center md:text-left">{{ title }}</h2>

    <div class="bs-mt-md grid md:grid-cols-2 lg:grid-cols-3 gap-6">

      <article
        v-for="(item, idx) in items"
        :key="idx"
        class="group p-6 md:p-10 rounded-xl bg-bs-surface-2 border border-bs-surface-3 flex flex-col gap-4 hover:bg-bs-surface-3 hover:border-transparent transition-all duration-300"
      >

        <!-- Number -->
        <span class="text-xs uppercase tracking-widest font-semibold text-bs-foreground-dark">
          0{{ idx + 1 }}
        </span>

        <!-- Title -->
        <h3 class="bs-h3 group-hover:text-bs-foreground-light transition-colors duration-300">
          {{ item.title }}
        </h3>

        <!-- Description -->
        <p class="text-bs-foreground-dark leading-relaxed">
          {{ item.description }}
        </p>

      </article>

    </div>

  </section>

</template>
