<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  title: { type: String, required: true },
  description: { type: String, required: false, default: 'TechXtrasol — Software Engineering Company' },
  colorMode: { type: String, required: false, default: 'dark' },
})

const bg = computed(() => props.colorMode === 'light' ? '#fafafa' : '#0f0f13')
const fg = computed(() => props.colorMode === 'light' ? '#111111' : '#f4f4f5')
const muted = computed(() => props.colorMode === 'light' ? '#52525b' : '#a1a1aa')
</script>

<template>
  <div class="h-full w-full flex relative overflow-hidden" :style="{ background: bg }">
    <!-- Accent glow -->
    <div class="absolute -right-24 -top-24 w-[420px] h-[420px] rounded-full" :style="{ background: 'radial-gradient(circle, rgba(99,102,241,0.35) 0%, transparent 70%)' }" />
    <div class="absolute -left-32 -bottom-32 w-[380px] h-[380px] rounded-full" :style="{ background: 'radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)' }" />

    <div class="flex flex-col justify-between w-full h-full px-16 py-14 relative">
      <!-- Brand -->
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-lg flex items-center justify-center" :style="{ background: '#6366f1' }">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="18" height="18" rx="4" stroke="#fff" stroke-width="2.5" />
            <path d="M8 12 L11 15 L16 9" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>
        <span class="text-3xl font-bold" :style="{ color: fg }">TechXtrasol</span>
      </div>

      <!-- Title & description -->
      <div class="flex flex-col gap-6">
        <h1
          class="text-[64px] font-bold leading-[1.15] tracking-tight"
          :style="{ color: fg, lineClamp: 3, textOverflow: 'ellipsis', textWrap: 'balance', display: 'block' }"
        >
          {{ title }}
        </h1>
        <p
          v-if="description"
          class="text-[30px] leading-snug"
          :style="{ color: muted, lineClamp: 2, textOverflow: 'ellipsis', textWrap: 'balance', display: 'block' }"
        >
          {{ description }}
        </p>
      </div>

      <!-- Footer -->
      <div class="flex items-center gap-3 pt-8 border-t-2" :style="{ borderColor: 'rgba(99,102,241,0.4)' }">
        <div class="w-2.5 h-2.5 rounded-full" :style="{ background: '#6366f1' }" />
        <span class="text-2xl font-semibold" :style="{ color: muted }">techxtrasol.tech</span>
        <span class="text-2xl font-medium" :style="{ color: muted }">·</span>
        <span class="text-2xl font-medium" :style="{ color: muted }">Software Engineering</span>
      </div>
    </div>
  </div>
</template>
