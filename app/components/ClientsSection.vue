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
        class="group shimmer-card relative overflow-hidden py-10 px-5 rounded-xl flex flex-col items-center text-center gap-3 bg-bs-surface-2/70 hover:bg-bs-surface-2 transition-colors duration-300 border border-bs-surface-3 hover:border-bs-foreground-dark/20"
      >

        <!-- Shimmer overlay -->
        <div class="shimmer absolute inset-0 pointer-events-none"></div>

        <Icon
          :name="`bs-icon:${item.icon}`"
          size="32"
          class="opacity-70 group-hover:scale-[1.1] group-hover:-translate-y-1 group-hover:opacity-100 ease-bs-bounce transition-colors transition-transform transition-opacity duration-1000"
        />

        <span class="font-semibold text-sm relative z-10">{{ item.title }}</span>

        <span class="text-xs text-bs-foreground-dark leading-relaxed hidden md:block relative z-10">
          {{ item.content || item.description }}
        </span>

      </div>

    </div>

  </section>

</template>

<style scoped>
.shimmer-card {
  position: relative;
  overflow: hidden;
}

.shimmer {
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.03) 40%,
    rgba(255, 255, 255, 0.08) 50%,
    rgba(255, 255, 255, 0.03) 60%,
    transparent 100%
  );
  transition: none;
}

.shimmer-card:hover .shimmer {
  animation: shimmer-sweep 0.8s ease-out forwards;
}

@keyframes shimmer-sweep {
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
}
</style>
