<script setup>
const props = defineProps(['title', 'items'])

const lightboxImage = ref(null)

function openLightbox(item) {
  lightboxImage.value = item
}

function closeLightbox() {
  lightboxImage.value = null
}
</script>

<template>
  <section class="bs-container bs-mt-lg" id="gallery">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h2 v-if="title" class="bs-h2 text-center md:text-left">{{ title }}</h2>
        <p class="text-bs-foreground-dark mt-2 text-sm md:text-base">Design work crafted in Canva, Photoshop, and Illustrator — from brand identities to social media campaigns.</p>
      </div>
    </div>

    <!-- Masonry-style grid -->
    <div class="mt-10 columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
      <div
        v-for="item in items"
        :key="item.id"
        class="group relative break-inside-avoid cursor-pointer overflow-hidden rounded-xl border border-bs-surface-3/50 hover:border-bs-accent/40 transition-colors transition-transform transition-opacity duration-300"
        @click="openLightbox(item)"
      >
        <img
          :src="item.image_url"
          :alt="item.title"
          class="w-full h-auto aspect-[4/3] object-cover transition-transform duration-500 ease-bs-spring group-hover:scale-105"
          loading="lazy"
        />
        <!-- Hover overlay -->
        <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div class="absolute bottom-0 left-0 right-0 p-4">
            <h3 class="text-sm font-semibold text-white leading-tight">{{ item.title }}</h3>
            <div class="flex items-center gap-2 mt-1">
              <span class="text-[10px] px-1.5 py-0.5 rounded-full bg-white/20 text-white/80 capitalize">{{ item.category?.replace('-', ' ') }}</span>
              <span v-if="item.client_name" class="text-[10px] text-white/60">{{ item.client_name }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Lightbox -->
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="lightboxImage" class="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4" @click.self="closeLightbox">
          <button @click="closeLightbox" aria-label="Close lightbox" class="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10">
            <svg class="w-6 h-6" viewBox="0 0 20 20" fill="none"><path d="M5 5l10 10M15 5L5 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
          </button>
          <img :src="lightboxImage.image_url" :alt="lightboxImage.title" class="max-w-full max-h-[85vh] object-contain rounded-lg" />
          <div class="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
            <h3 class="text-lg font-semibold text-white">{{ lightboxImage.title }}</h3>
            <div class="flex items-center justify-center gap-2 mt-1">
              <span class="text-xs px-2 py-0.5 rounded-full bg-white/20 text-white/80 capitalize">{{ lightboxImage.category?.replace('-', ' ') }}</span>
              <span v-if="lightboxImage.project_name" class="text-xs text-white/60">{{ lightboxImage.project_name }}</span>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
