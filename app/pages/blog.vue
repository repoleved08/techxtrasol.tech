<script setup>

useSeoMeta({
  title: 'Blog — Software Engineering Insights & Tutorials | TechXtrasol',
  ogTitle: 'TechXtrasol Blog — Software Engineering Insights',
  description: 'Technical articles, tutorials, and insights from the TechXtrasol engineering team. Learn about Laravel, Vue, Nuxt, Go, AI, cloud, DevOps, and software architecture.',
  ogDescription: 'Technical articles and software engineering insights from the TechXtrasol team.',
  ogImage: '/1200x630.jpg',
  twitterCard: 'summary_large_image',
  keywords: 'software engineering blog, Laravel tutorial, Vue.js tutorial, Nuxt tutorial, Go programming, AI tutorials, cloud computing, DevOps, cybersecurity, software architecture',
})

useHead({
  link: [
    { rel: 'canonical', href: 'https://techxtrasol.tech/blog' },
  ],
})

import blog from '../data/blog.json'

const blogSchema = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: 'TechXtrasol Blog',
  description: 'Technical articles and software engineering insights from the TechXtrasol team.',
  url: 'https://techxtrasol.tech/blog',
  publisher: {
    '@type': 'Organization',
    name: 'TechXtrasol',
    url: 'https://techxtrasol.tech',
  },
}

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(blogSchema),
    },
  ],
})

const categories = ['All', ...new Set(blog.map(p => p.category))]
const activeCategory = ref('All')

const filteredPosts = computed(() => {
  if (activeCategory.value === 'All') return blog
  return blog.filter(p => p.category === activeCategory.value)
})
</script>

<template>

  <section class="max-w-[92vw] lg:max-w-4xl mx-auto bs-mt-md px-5 py-8 md:p-20 flex flex-col gap-6 border rounded-md bg-bs-surface-2 border-bs-surface-3">

    <!-- Title -->
    <h1 class="bs-h1">Engineering Insights</h1>

    <!-- Intro -->
    <p class="text-lg text-bs-foreground-dark">
      Articles, tutorials, and insights from our engineering team. We write about software architecture, development best practices, cloud infrastructure, and digital transformation strategies.
    </p>

    <!-- Categories -->
    <div class="flex flex-wrap gap-2 bs-mt-md">
      <button
        v-for="cat in categories"
        :key="cat"
        @click="activeCategory = cat"
        class="px-4 py-2 text-sm rounded-lg transition-all duration-300"
        :class="activeCategory === cat
          ? 'bg-bs-accent text-white'
          : 'bg-bs-surface-1 text-bs-foreground-dark hover:bg-bs-surface-3 border border-bs-surface-3'"
      >
        {{ cat }}
      </button>
    </div>

    <!-- Articles -->
    <div class="bs-mt-md flex flex-col gap-6">

      <article
        v-for="(post, idx) in filteredPosts"
        :key="idx"
        class="group p-6 rounded-xl bg-bs-surface-1 border border-bs-surface-3 flex flex-col gap-4 hover:bg-bs-surface-3/50 hover:border-transparent transition-all duration-300"
      >

        <div class="flex items-center gap-3">
          <span class="text-xs uppercase tracking-widest font-semibold px-3 py-1 rounded-full bg-bs-accent/10 text-bs-accent border border-bs-accent/20">
            {{ post.category }}
          </span>
        </div>

        <h2 class="bs-h3 group-hover:text-bs-foreground-light transition-colors duration-300">
          {{ post.title }}
        </h2>

        <p class="text-bs-foreground-dark leading-relaxed">
          {{ post.excerpt }}
        </p>

        <div class="flex items-center justify-between text-xs text-bs-foreground-dark/60 pt-4 border-t border-bs-surface-3">
          <time :datetime="post.date">{{ new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }}</time>
          <span>{{ post.read_time }}</span>
        </div>

      </article>

    </div>

  </section>

</template>
