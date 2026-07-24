<script setup>

const trustItems = [
  {
    icon: 'bs-icon:check',
    title: 'Clean Architecture',
    description: 'SOLID principles, design patterns, and industry best practices.'
  },
  {
    icon: 'bs-icon:check',
    title: 'Security-First',
    description: 'Authentication, encryption, and regular security audits built in.'
  },
  {
    icon: 'bs-icon:check',
    title: 'Scalable Systems',
    description: 'Engineered for growth from day one. No rewrites needed.'
  },
  {
    icon: 'bs-icon:check',
    title: 'Agile Delivery',
    description: 'Weekly sprints, code reviews, and continuous integration.'
  },
  {
    icon: 'bs-icon:check',
    title: 'Performance Optimized',
    description: 'Fast-loading applications optimized for Core Web Vitals.'
  },
  {
    icon: 'bs-icon:check',
    title: 'Long-Term Support',
    description: 'Ongoing maintenance and dedicated support after launch.'
  }
]

</script>

<template>

  <section class="bs-container bs-mt-lg">

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

      <article
        v-for="(item, idx) in trustItems"
        :key="idx"
        class="group flex items-start gap-4 p-5 rounded-xl bg-bs-surface-2 border border-bs-surface-3 hover:border-bs-accent/30 transition-all duration-300"
      >

        <!-- Icon -->
        <div class="w-10 h-10 rounded-lg bg-bs-accent/10 flex items-center justify-center shrink-0">
          <Icon :name="item.icon" class="w-5 h-5 text-bs-accent" />
        </div>

        <!-- Content -->
        <div>
          <h3 class="text-sm font-semibold text-bs-foreground-light mb-1">
            {{ item.title }}
          </h3>
          <p class="text-xs text-bs-foreground-dark leading-relaxed">
            {{ item.description }}
          </p>
        </div>

      </article>

    </div>

  </section>

</template>
