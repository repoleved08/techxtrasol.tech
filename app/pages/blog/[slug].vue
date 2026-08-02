<script setup>
const route = useRoute()

const { data, error } = await useFetch(`/api/blog/${route.params.slug}`)

if (error.value || !data.value?.post) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found' })
}

const post = computed(() => data.value.post)
const renderedContent = computed(() => data.value.html || '')

useSeoMeta({
  title: () => post.value ? post.value.title + ' — TechXtrasol Blog' : 'Blog Post',
  ogTitle: () => post.value?.title,
  description: () => post.value?.description,
  ogDescription: () => post.value?.description,
  ogImage: '/1200x630.jpg',
  twitterCard: 'summary_large_image',
})

useHead({
  link: [
    { rel: 'canonical', href: 'https://techxtrasol.tech' + route.path },
  ],
})
</script>

<template>

  <article v-if="post" class="w-full max-w-4xl mx-auto bs-mt-md px-5 md:px-8 lg:px-12 py-10 md:py-16 flex flex-col gap-8">

    <!-- Back link -->
    <NuxtLink to="/blog" class="text-sm text-bs-accent hover:underline w-fit">&larr; Back to Blog</NuxtLink>

    <!-- Header -->
    <header class="flex flex-col gap-5 border-b border-bs-surface-3 pb-8">

      <!-- Meta -->
      <div class="flex items-center gap-3">
        <span class="text-xs uppercase tracking-widest font-semibold px-3 py-1 rounded-full bg-bs-accent/10 text-bs-accent border border-bs-accent/20">
          {{ post.category }}
        </span>
        <time :datetime="post.date" class="text-xs text-bs-foreground-dark/60">
          {{ new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }}
        </time>
        <span class="text-xs text-bs-foreground-dark/60">{{ post.read_time }}</span>
      </div>

      <!-- Title -->
      <h1 class="bs-h1">{{ post.title }}</h1>

      <!-- Description -->
      <p class="text-lg text-bs-foreground-dark leading-relaxed">
        {{ post.description }}
      </p>

    </header>

    <!-- Content -->
    <div class="blog-content" v-html="renderedContent" />

  </article>

</template>
