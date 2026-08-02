<script setup>
const route = useRoute()

const { data, error } = await useFetch(`/api/blog/${route.params.slug}`)

if (error.value || !data.value?.post) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found' })
}

const post = computed(() => data.value.post)
const renderedContent = computed(() => data.value.html || '')

const siteUrl = 'https://techxtrasol.tech'
const postUrl = computed(() => siteUrl + route.path)

const DEFAULT_OG_IMAGE = siteUrl + '/content-images/blog-default-og.jpg'
const supportedSocialFormats = ['jpg', 'jpeg', 'png', 'webp', 'gif']

const ogImage = computed(() => {
  const image = post.value?.image
  if (!image) return DEFAULT_OG_IMAGE
  const ext = image.split('.').pop()?.toLowerCase() || ''
  if (image.startsWith('http') && supportedSocialFormats.includes(ext)) {
    return image
  }
  if (!image.startsWith('http') && supportedSocialFormats.includes(ext)) {
    return siteUrl + image
  }
  return DEFAULT_OG_IMAGE
})

useSeoMeta({
  title: () => post.value ? post.value.title + ' — TechXtrasol Blog' : 'Blog Post',
  ogTitle: () => post.value?.title,
  description: () => post.value?.description,
  ogDescription: () => post.value?.description,
  ogImage: () => ogImage.value,
  ogUrl: () => postUrl.value,
  ogType: 'article',
  ogSiteName: 'TechXtrasol',
  twitterCard: 'summary_large_image',
  twitterImage: () => ogImage.value,
  twitterTitle: () => post.value?.title,
  twitterDescription: () => post.value?.description,
})

useHead({
  link: [
    { rel: 'canonical', href: siteUrl + route.path },
  ],
})

useSchemaOrg(computed(() => {
  if (!post.value) return []
  const authorName = post.value.author || 'TechXtrasol'
  const articleSchema = {
    '@type': 'Article',
    headline: post.value.title,
    description: post.value.description,
    image: ogImage.value,
    datePublished: post.value.date || post.value.created_at,
    dateModified: post.value.created_at,
    author: { '@type': 'Person', name: authorName },
    publisher: {
      '@type': 'Organization',
      name: 'TechXtrasol',
      logo: {
        '@type': 'ImageObject',
        url: siteUrl + '/icons/logo.svg',
      },
    },
    mainEntityOfPage: postUrl.value,
    articleSection: post.value.category || undefined,
    inLanguage: 'en',
  }
  const breadcrumbSchema = {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: siteUrl + '/blog' },
      { '@type': 'ListItem', position: 3, name: post.value.title, item: postUrl.value },
    ],
  }
  return [articleSchema, breadcrumbSchema]
}))

const copied = ref(false)
const copyTimer = ref(null)

async function copyLink() {
  try {
    await navigator.clipboard.writeText(postUrl.value)
    copied.value = true
    clearTimeout(copyTimer.value)
    copyTimer.value = setTimeout(() => (copied.value = false), 2000)
  }
  catch {
    copied.value = false
  }
}

const shareText = computed(() => post.value ? `"${post.value.title}" — read on TechXtrasol Blog` : 'TechXtrasol Blog')
const encodedUrl = computed(() => encodeURIComponent(postUrl.value))
const encodedText = computed(() => encodeURIComponent(shareText.value))

const shareLinks = computed(() => [
  {
    label: 'Share on X',
    href: `https://twitter.com/intent/tweet?text=${encodedText.value}&url=${encodedUrl.value}`,
    icon: 'twitter',
  },
  {
    label: 'Share on Discord',
    href: null,
    action: copyLink,
    icon: 'discord',
    copyLabel: 'Copy to share on Discord',
  },
  {
    label: 'Share on Telegram',
    href: `https://t.me/share/url?url=${encodedUrl.value}&text=${encodedText.value}`,
    icon: 'telegram',
  },
  {
    label: 'Share on LinkedIn',
    href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl.value}`,
    icon: 'linkedin',
  },
  {
    label: 'Share on WhatsApp',
    href: `https://api.whatsapp.com/send?text=${encodedText.value}%20${encodedUrl.value}`,
    icon: 'whatsapp',
  },
  {
    label: 'Share on Facebook',
    href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl.value}`,
    icon: 'facebook',
  },
])
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
        <span v-if="post.author" class="text-xs text-bs-foreground-dark/60">By {{ post.author }}</span>
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

    <!-- Share -->
    <div class="mt-6 border-t border-bs-surface-3 pt-6 flex flex-col gap-3">
      <div class="flex items-center gap-3">
        <span class="text-sm font-medium text-bs-foreground-light">Share this article</span>
      </div>
      <div class="flex flex-wrap items-center gap-2.5">
        <button
          @click="copyLink"
          class="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-bs-accent text-white text-sm font-medium hover:bg-bs-accent/90 transition-all duration-300"
          :aria-label="copied ? 'Link copied' : 'Copy link'"
        >
          <Icon v-if="copied" name="lucide:check" class="w-4 h-4" />
          <Icon v-else name="lucide:link" class="w-4 h-4" />
          {{ copied ? 'Copied!' : 'Copy link' }}
        </button>

        <a
          v-for="share in shareLinks"
          :key="share.icon"
          v-bind="share.href ? { href: share.href, target: '_blank', rel: 'noopener noreferrer' } : {}"
          :href="share.href || undefined"
          @click="share.action ? share.action() : undefined"
          class="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-bs-surface-1 border border-bs-surface-3 text-sm text-bs-foreground-dark hover:text-bs-accent hover:border-bs-accent/40 transition-all duration-300"
          :aria-label="share.label"
        >
          <Icon :name="`bs-icon:${share.icon}`" class="w-4 h-4" />
          <span class="hidden sm:inline">{{ share.action ? share.copyLabel : share.label.split(' on ')[1] }}</span>
        </a>
      </div>
    </div>

  </article>

</template>
