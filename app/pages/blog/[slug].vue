<script setup>
const route = useRoute()

const { data: post } = await useAsyncData('blog-' + route.params.slug, () =>
  queryCollection('blog').path('/blog/' + route.params.slug).first()
)

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found' })
}

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

  <article v-if="post" class="max-w-[92vw] lg:max-w-3xl mx-auto bs-mt-md px-5 py-8 md:p-20 flex flex-col gap-6 border rounded-md bg-bs-surface-2 border-bs-surface-3">

    <!-- Back link -->
    <NuxtLink to="/blog" class="text-sm text-bs-accent hover:underline">&larr; Back to Blog</NuxtLink>

    <!-- Meta -->
    <div class="flex items-center gap-3">
      <span class="text-xs uppercase tracking-widest font-semibold px-3 py-1 rounded-full bg-bs-accent/10 text-bs-accent border border-bs-accent/20">
        {{ post.category }}
      </span>
      <time :datetime="post.date" class="text-xs text-bs-foreground-dark/60">
        {{ new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }}
      </time>
      <span class="text-xs text-bs-foreground-dark/60">{{ post.readTime }}</span>
    </div>

    <!-- Title -->
    <h1 class="bs-h1">{{ post.title }}</h1>

    <!-- Content -->
    <div class="prose prose-invert max-w-none bs-body-text">
      <ContentRenderer :value="post" />
    </div>

  </article>

</template>
