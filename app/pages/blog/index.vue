<script setup>

useSeoMeta({
  title: 'Blog — Software Engineering Insights & Tutorials | TechXtrasol',
  ogTitle: 'TechXtrasol Blog — Software Engineering Insights',
  description: 'Technical articles, tutorials, and insights from the TechXtrasol engineering team. Learn about Laravel, Vue, Nuxt, Go, AI, cloud, DevOps, and software architecture.',
  ogDescription: 'Technical articles and software engineering insights from the TechXtrasol team.',
  ogImage: 'https://techxtrasol.tech/content-images/blog-default-og.jpg',
  twitterCard: 'summary_large_image',
  keywords: 'software engineering blog, Laravel tutorial, Vue.js tutorial, Nuxt tutorial, Go programming, AI tutorials, cloud computing, DevOps, cybersecurity, software architecture',
})

useHead({
  link: [
    { rel: 'canonical', href: 'https://techxtrasol.tech/blog' },
  ],
})

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

const { getAllPosts } = useSupabaseBlog()

const { data: posts } = await useAsyncData('blog-list', () => getAllPosts())

const categories = computed(() => ['All', ...new Set((posts.value || []).map(p => p.category))])
const activeCategory = ref('All')

const filteredPosts = computed(() => {
  if (!posts.value) return []
  if (activeCategory.value === 'All') return posts.value
  return posts.value.filter(p => p.category === activeCategory.value)
})
</script>

<template>

  <section class="w-full max-w-5xl mx-auto bs-mt-md px-5 md:px-8 lg:px-12 py-10 md:py-16 flex flex-col gap-8">

    <!-- Title -->
    <h1 class="bs-h1">Engineering Insights</h1>

    <!-- Intro -->
    <p class="text-lg text-bs-foreground-dark max-w-3xl">
      Articles, tutorials, and insights from our engineering team. We write about software architecture, development best practices, cloud infrastructure, and digital transformation strategies.
    </p>

    <!-- Categories -->
    <div class="flex flex-wrap gap-2 mt-2">
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

    <!-- Articles grid -->
    <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">

      <article
        v-for="post in filteredPosts"
        :key="post.id"
        class="group p-6 rounded-xl bg-bs-surface-1 border border-bs-surface-3 flex flex-col gap-4 hover:bg-bs-surface-3/50 hover:border-transparent transition-all duration-300"
      >

        <div class="flex items-center gap-3">
          <span class="text-xs uppercase tracking-widest font-semibold px-3 py-1 rounded-full bg-bs-accent/10 text-bs-accent border border-bs-accent/20">
            {{ post.category }}
          </span>
        </div>

        <h2 class="text-xl md:text-2xl font-display font-medium text-balance group-hover:text-bs-foreground-light transition-colors duration-300">
          <NuxtLink :to="'/blog/' + post.slug">{{ post.title }}</NuxtLink>
        </h2>

        <p class="text-sm text-bs-foreground-dark leading-relaxed flex-1">
          {{ post.description }}
        </p>

        <div class="flex items-center justify-between text-xs text-bs-foreground-dark/60 pt-4 border-t border-bs-surface-3">
          <time :datetime="post.date">{{ new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }}</time>
          <span v-if="post.author" class="hidden sm:inline">By {{ post.author }}</span>
          <span>{{ post.read_time }}</span>
        </div>

      </article>

    </div>

  </section>

</template>
