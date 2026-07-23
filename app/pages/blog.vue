<script setup>

useSeoMeta({
  title: 'Blog — Techxtrasol',
  ogTitle: 'Blog — Techxtrasol',
  description: 'Technology articles, tutorials, and insights from the Techxtrasol team. Learn about software development, architecture, and digital transformation.',
  ogDescription: 'Technology articles, tutorials, and insights from the Techxtrasol team.',
})

import blog from '../data/blog.json'

</script>

<template>

  <section class="max-w-[92vw] lg:max-w-4xl mx-auto bs-mt-md px-5 py-8 md:p-20 flex flex-col gap-6 border rounded-md bg-bs-surface-2 border-bs-surface-3">

    <!-- Title -->
    <h1 class="bs-h1">Tech Insights</h1>

    <!-- Intro -->
    <p class="text-lg text-bs-foreground-dark">
      Articles, tutorials, and insights from our development team. We write about software architecture, development best practices, and digital transformation strategies.
    </p>

    <!-- Articles -->
    <div class="bs-mt-md flex flex-col gap-6">

      <article
        v-for="(post, idx) in blog"
        :key="idx"
        class="group p-6 rounded-xl bg-bs-surface-1 border border-bs-surface-3 flex flex-col gap-4 hover:bg-bs-surface-3/50 hover:border-transparent transition-all duration-300"
      >

        <span class="text-xs uppercase tracking-widest font-semibold text-bs-foreground-dark">
          {{ post.category }}
        </span>

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
