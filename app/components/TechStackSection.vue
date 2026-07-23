<script setup>

const props = defineProps(['title', 'stack'])

const categories = computed(() => {
  const cats = {}
  props.stack.forEach(item => {
    if (!cats[item.category]) cats[item.category] = []
    cats[item.category].push(item)
  })
  return cats
})

</script>

<template>

  <section class="bs-container bs-mt-lg" id="tech-stack">

    <h2 v-if="title" class="bs-h2 text-center md:text-left">{{ title }}</h2>

    <div class="bs-mt-md">

      <div v-for="(items, category) in categories" :key="category" class="mb-8 last:mb-0">

        <!-- Category label -->
        <span class="text-xs uppercase tracking-widest font-semibold text-bs-foreground-dark mb-4 block">
          {{ category }}
        </span>

        <!-- Tech items -->
        <div class="flex flex-wrap gap-3">

          <span
            v-for="(item, idx) in items"
            :key="idx"
            class="group px-5 py-3 rounded-lg bg-bs-surface-2 border border-bs-surface-3 text-sm font-medium text-bs-foreground-dark hover:bg-bs-surface-3 hover:text-bs-foreground-light hover:border-transparent transition-all duration-300"
          >
            {{ item.name }}
          </span>

        </div>

      </div>

    </div>

  </section>

</template>
