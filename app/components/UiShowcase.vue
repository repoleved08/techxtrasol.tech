<script setup>
const props = defineProps(['title', 'templates'])
</script>

<template>
  <section class="bs-container bs-mt-lg" id="ui-templates">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <div class="flex items-center gap-3">
          <h2 v-if="title" class="bs-h2 text-center md:text-left">{{ title }}</h2>
          <span class="text-xs font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full bg-amber-400/10 text-amber-400 border border-amber-400/20">PRO</span>
        </div>
        <p class="text-bs-foreground-dark mt-2 text-sm md:text-base">Premium, production-ready landing pages built with modern frameworks. Purchase, customize, and deploy.</p>
      </div>
    </div>

    <div class="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="tpl in templates"
        :key="tpl.id"
        class="group relative flex flex-col bg-bs-surface-0 border border-bs-surface-3 rounded-xl overflow-hidden transition-all duration-500 ease-bs-spring hover:border-amber-400/40 hover:shadow-[0_0_40px_rgba(251,191,36,0.08)]"
      >
        <!-- Preview image -->
        <div class="relative h-48 overflow-hidden bg-bs-surface-2">
          <img
            v-if="tpl.preview_image"
            :src="tpl.preview_image"
            :alt="tpl.title"
            class="w-full h-full object-cover transition-transform duration-700 ease-bs-spring group-hover:scale-110"
            loading="lazy"
          />
          <div v-else class="w-full h-full flex items-center justify-center">
            <Icon name="lucide:layout-template" class="w-12 h-12 text-bs-surface-3" />
          </div>
          <div class="absolute inset-0 bg-gradient-to-t from-bs-surface-0 via-bs-surface-0/40 to-transparent" />
          <!-- PRO badge -->
          <div class="absolute top-3 left-3">
            <span class="inline-flex items-center gap-1 text-[10px] uppercase tracking-widest font-semibold px-2 py-0.5 rounded-full bg-amber-400 text-black">
              <svg class="w-2.5 h-2.5" viewBox="0 0 10 10" fill="currentColor"><polygon points="5,0 6.5,3.5 10,3.5 7.2,6 8.2,10 5,7.5 1.8,10 2.8,6 0,3.5 3.5,3.5"/></svg>
              PRO
            </span>
          </div>
          <!-- Demo link -->
          <a v-if="tpl.demo_url" :href="tpl.demo_url" target="_blank" rel="noopener noreferrer"
            class="absolute top-3 right-3 p-2 rounded-lg bg-black/40 backdrop-blur-sm text-white/80 hover:text-white hover:bg-black/60 transition-all opacity-0 group-hover:opacity-100">
            <Icon name="lucide:external-link" class="w-4 h-4" />
          </a>
        </div>

        <!-- Content -->
        <div class="flex flex-col flex-1 p-5 gap-3">
          <div class="flex items-center gap-2">
            <span class="text-xs px-2 py-0.5 rounded-full bg-bs-surface-3/50 text-bs-foreground-dark capitalize">{{ tpl.category?.replace('-', ' ') }}</span>
          </div>
          <h3 class="font-display font-semibold text-lg text-bs-foreground-light leading-tight group-hover:text-amber-400 transition-colors duration-300">
            {{ tpl.title }}
          </h3>
          <p class="text-sm text-bs-foreground-dark leading-relaxed line-clamp-2 flex-1">
            {{ tpl.description }}
          </p>
          <!-- Tech stack -->
          <div v-if="tpl.tech_stack?.length" class="flex flex-wrap gap-1.5">
            <span
              v-for="tech in tpl.tech_stack.slice(0, 4)"
              :key="tech"
              class="text-[10px] px-2 py-0.5 rounded-full bg-bs-accent/8 text-bs-accent/80 border border-bs-accent/15"
            >
              {{ tech }}
            </span>
          </div>
          <!-- Price + CTA -->
          <div class="flex items-center justify-between pt-3 border-t border-bs-surface-3/50 mt-1">
            <span class="font-display font-bold text-lg text-amber-400">{{ tpl.price || 'Free' }}</span>
            <a v-if="tpl.demo_url" :href="tpl.demo_url" target="_blank" rel="noopener noreferrer"
              class="inline-flex items-center gap-1.5 text-xs font-medium text-bs-foreground-dark hover:text-amber-400 transition-colors">
              Live Demo
              <svg class="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
