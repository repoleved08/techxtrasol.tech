<script setup>
const props = defineProps(['template'])

const dialogEl = ref(null)

function open() {
  dialogEl.value?.showModal()
}

function close() {
  dialogEl.value?.close()
}

defineExpose({ open })
</script>

<template>
  <dialog ref="dialogEl"
    class="backdrop:bg-black/70 backdrop:backdrop-blur-sm bg-transparent p-0 m-auto max-w-3xl w-[95vw] rounded-2xl overflow-hidden"
    @click.self="close"
    @keydown.escape="close">

    <div class="bg-bs-surface-1 border border-bs-surface-3/50 rounded-2xl overflow-hidden max-h-[90vh] flex flex-col">

      <!-- Header -->
      <div class="flex items-center justify-between p-5 border-b border-bs-surface-3/50">
        <div class="flex items-center gap-3">
          <span class="text-[10px] uppercase tracking-widest font-semibold px-2 py-0.5 rounded-full bg-amber-400 text-black">PRO</span>
          <h2 class="text-lg font-bold text-bs-foreground-light">{{ template?.title }}</h2>
        </div>
        <button @click="close" class="p-2 rounded-lg text-bs-foreground-dark hover:text-bs-foreground-light hover:bg-bs-surface-3/50 transition-colors transition-transform transition-opacity">
          <svg class="w-5 h-5" viewBox="0 0 20 20" fill="none"><path d="M5 5l10 10M15 5L5 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
        </button>
      </div>

      <!-- Body -->
      <div class="overflow-y-auto p-5 space-y-5">

        <!-- Preview image -->
        <div v-if="template?.preview_image" class="rounded-xl overflow-hidden border border-bs-surface-3/50">
          <img :src="template.preview_image" :alt="template.title" class="w-full h-64 object-cover" />
        </div>

        <!-- Category + Price -->
        <div class="flex items-center gap-3">
          <span class="text-xs px-2.5 py-1 rounded-full bg-bs-surface-3/50 text-bs-foreground-dark capitalize">{{ template?.category?.replace('-', ' ') }}</span>
          <span class="font-bold text-xl text-amber-400">{{ template?.price || 'Free' }}</span>
        </div>

        <!-- Description -->
        <div>
          <h3 class="text-sm font-semibold text-bs-foreground-light mb-2">About This Template</h3>
          <p class="text-sm text-bs-foreground-dark leading-relaxed">{{ template?.description }}</p>
        </div>

        <!-- Features -->
        <div v-if="template?.features?.length">
          <h3 class="text-sm font-semibold text-bs-foreground-light mb-2">What's Included</h3>
          <ul class="grid sm:grid-cols-2 gap-2">
            <li v-for="(f, i) in template.features" :key="i" class="flex items-start gap-2 text-sm text-bs-foreground-dark">
              <svg class="w-4 h-4 text-bs-accent mt-0.5 shrink-0" viewBox="0 0 16 16" fill="none">
                <path d="M3 8.5L6.5 12L13 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              {{ f }}
            </li>
          </ul>
        </div>

        <!-- Tech stack -->
        <div v-if="template?.tech_stack?.length">
          <h3 class="text-sm font-semibold text-bs-foreground-light mb-2">Tech Stack</h3>
          <div class="flex flex-wrap gap-2">
            <span v-for="tech in template.tech_stack" :key="tech"
              class="text-xs px-2.5 py-1 rounded-full bg-bs-accent/10 text-bs-accent border border-bs-accent/20">
              {{ tech }}
            </span>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="flex items-center justify-between p-5 border-t border-bs-surface-3/50 bg-bs-surface-0/50">
        <button @click="close" class="px-4 py-2 rounded-lg text-sm font-medium text-bs-foreground-dark hover:text-bs-foreground-light hover:bg-bs-surface-3/50 transition-colors transition-transform transition-opacity">
          Close
        </button>
        <a v-if="template?.demo_url" :href="template.demo_url" target="_blank" rel="noopener noreferrer"
          class="bs-btn inline-flex items-center gap-2">
          Live Demo
          <svg class="w-4 h-4" viewBox="0 0 14 14" fill="none"><path d="M3 11l8-8M5 3h6v6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </a>
      </div>
    </div>
  </dialog>
</template>

<style scoped>
dialog::backdrop {
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
}
dialog[open] {
  animation: modal-in 0.3s ease;
}
@keyframes modal-in {
  from { opacity: 0; transform: scale(0.95) translateY(10px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}
</style>
