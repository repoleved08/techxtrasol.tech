<script setup>

const props = defineProps(['title', 'clients'])

</script>

<template>

  <section class="bs-container bs-mt-lg grid" id="industries">

    <!-- Title -->
    <h2 v-if="title" class="bs-h2 text-center" v-html="title" />

    <!-- Industry cards -->
    <div class="bs-mt-md grid grid-cols-2 md:grid-cols-4 place-content-center gap-4">

      <div
        v-for="(item, idx) in clients"
        :key="idx"
        class="group py-10 px-5 rounded-xl flex flex-col items-center text-center gap-3 bg-bs-surface-2/70 hover:bg-bs-surface-2 transition-colors duration-300"
      >

        <Icon
          :name="item.icon"
          size="32"
          class="opacity-60 group-hover:scale-[1.05] group-hover:-translate-y-1 group-hover:opacity-100 ease-bs-bounce transition-all duration-1000"
        />

        <span class="font-semibold text-sm">{{ item.title }}</span>

        <span class="text-xs text-bs-foreground-dark leading-relaxed hidden md:block">
          {{ item.description }}
        </span>

      </div>

    </div>

  </section>

</template>
