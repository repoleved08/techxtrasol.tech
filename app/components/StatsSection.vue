<script setup>

const props = defineProps(['title', 'stats'])

const counters = ref((props.stats || []).map(stat => ({
    ...stat,
    current: parseInt(stat.number) || 0,
    target: parseInt(stat.number) || 0,
    animated: false,
})))

const animateCounters = () => {
  counters.value.forEach(stat => {
    if (stat.animated) return
    stat.animated = true
    const duration = 2000
    const start = performance.now()
    const target = stat.target

    const step = (timestamp) => {
      const progress = Math.min((timestamp - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      stat.current = Math.floor(eased * target)
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  })
}

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters()
        observer.disconnect()
      }
    })
  }, { threshold: 0.3 })

  const el = document.getElementById('stats-section')
  if (el) observer.observe(el)
})

</script>

<template>

  <section class="bs-container bs-mt-lg" id="stats-section">

    <h2 v-if="title" class="bs-h2 text-center">{{ title }}</h2>

    <div class="bs-mt-md grid grid-cols-2 lg:grid-cols-4 gap-6">

      <div
        v-for="(stat, idx) in counters"
        :key="idx"
        class="text-center p-6 md:p-10 rounded-xl bg-bs-surface-2 border border-bs-surface-3 flex flex-col items-center gap-2 hover:bg-bs-surface-3 transition-colors duration-300"
      >
        <span class="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-bs-foreground-light">
          {{ stat.current }}{{ stat.suffix }}
        </span>
        <span class="text-sm md:text-base text-bs-foreground-dark font-medium">
          {{ stat.label }}
        </span>
      </div>

    </div>

  </section>

</template>
