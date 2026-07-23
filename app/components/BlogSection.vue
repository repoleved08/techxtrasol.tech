<script setup>

const props = defineProps(['title', 'posts'])

</script>

<template>

  <section class="bs-container bs-mt-lg" id="blog">

    <header class="flex items-center justify-between">

      <h2 v-if="title" class="bs-h2">{{ title }}</h2>

      <a href="/blog" class="bs-btn !bg-transparent hidden md:inline-block">
        View All Articles
      </a>

    </header>

    <div class="bs-mt-md grid md:grid-cols-3 gap-6">

      <article
        v-for="(post, idx) in posts"
        :key="idx"
        class="group p-6 md:p-8 rounded-xl bg-bs-surface-2 border border-bs-surface-3 flex flex-col gap-4 hover:bg-bs-surface-3 hover:border-transparent transition-all duration-300"
      >

        <!-- Category -->
        <span class="text-xs uppercase tracking-widest font-semibold text-bs-foreground-dark">
          {{ post.category }}
        </span>

        <!-- Title -->
        <h3 class="bs-h3 group-hover:text-bs-foreground-light transition-colors duration-300">
          {{ post.title }}
        </h3>

        <!-- Excerpt -->
        <p class="text-sm text-bs-foreground-dark leading-relaxed flex-1">
          {{ post.excerpt }}
        </p>

        <!-- Meta -->
        <div class="flex items-center justify-between text-xs text-bs-foreground-dark/60 pt-4 border-t border-bs-surface-3">

          <time :datetime="post.date">{{ new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }}</time>

          <span>{{ post.read_time }}</span>

        </div>

      </article>

    </div>

    <!-- Mobile view all link -->
    <div class="md:hidden mt-6 text-center">
      <a href="/blog" class="bs-btn !bg-transparent">
        View All Articles
      </a>
    </div>

  </section>

</template>
