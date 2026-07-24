<script setup>

const props = defineProps(['title', 'testimonials'])

</script>

<template>

  <section class="bs-container bs-mt-lg">

    <!-- Title -->
    <h2 v-if="title" class="bs-h2 text-center md:text-left">{{ title }}</h2>

    <!-- Testimonials -->
    <div class="group bs-mt-md grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 place-content-center gap-4">

      <blockquote
        v-for="(item, idx) in testimonials"
        :key="idx"
        :class="[
          'group-hover:opacity-75 hover:opacity-100 duration-300 p-3 md:p-5 flex flex-col gap-3 justify-between border rounded-md bg-bs-surface-2 border-bs-surface-3 transition-all grid-flow-dense',
          (item.content || item.quote || '').length > 100 ? 'lg:col-span-2' : ''
        ]"
      >
        <!-- Text -->
        <p
          v-html="item.content || item.quote"
          :class="[
            'text-sm lg:text-lg',
            (item.content || item.quote || '').length > 100 ? 'line-clamp-4 lg:line-clamp-none' : ''
          ]"
        ></p>

        <!-- Cite -->
        <cite class="not-italic text-bs-foreground-dark text-sm font-semibold">{{ item.name || item.handle }}</cite>

      </blockquote>

    </div>

  </section>

</template>
