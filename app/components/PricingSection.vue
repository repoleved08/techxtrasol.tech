<script setup>
const props = defineProps(['data'])

const activeTab = ref('web')

const tabs = [
  { id: 'web', label: 'Web Development' },
  { id: 'maintenance', label: 'Maintenance' },
  { id: 'social', label: 'Social Media' },
  { id: 'ui', label: 'UI Templates' },
]

function getPlans() {
  if (activeTab.value === 'web') return props.data.plans
  if (activeTab.value === 'maintenance') return props.data.maintenance.plans
  if (activeTab.value === 'social') return props.data.social_media.plans
  return []
}

function getSection() {
  if (activeTab.value === 'maintenance') return props.data.maintenance
  if (activeTab.value === 'social') return props.data.social_media
  if (activeTab.value === 'ui') return props.data.ui_templates || { title: 'Premium UI Templates', subtitle: 'Production-ready landing pages and UI kits. Purchase, customize, and deploy.' }
  return props.data
}

const { getPublishedTemplates } = useUiTemplates()
const uiTemplates = ref([])

onMounted(async () => {
  if (activeTab.value === 'ui') {
    uiTemplates.value = await getPublishedTemplates()
  }
})

watch(activeTab, async (tab) => {
  if (tab === 'ui' && uiTemplates.value.length === 0) {
    uiTemplates.value = await getPublishedTemplates()
  }
})
</script>

<template>

  <section class="bs-container bs-mt-lg" id="pricing">

    <!-- Header -->
    <div class="text-center max-w-2xl mx-auto">
      <h2 class="bs-h2">{{ data.title }}</h2>
      <p class="bs-body mt-4 text-bs-foreground-dark/70">{{ data.subtitle }}</p>
    </div>

    <!-- Tabs -->
    <div class="flex justify-center mt-10">
      <div class="inline-flex bg-bs-surface-2 rounded-xl p-1 border border-bs-surface-3">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          class="px-5 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 whitespace-nowrap"
          :class="activeTab === tab.id
            ? 'bg-bs-accent text-white shadow-lg'
            : 'text-bs-foreground-dark/60 hover:text-bs-foreground-dark'"
        >
          {{ tab.label }}
        </button>
      </div>
    </div>

    <!-- Section subtitle (for maintenance/social tabs) -->
    <p
      v-if="activeTab !== 'web'"
      class="text-center bs-body text-bs-foreground-dark/60 mt-6 max-w-xl mx-auto"
    >
      {{ getSection().subtitle }}
    </p>

    <!-- Pricing cards -->
    <div v-if="activeTab !== 'ui'" class="mt-10 grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">

      <div
        v-for="(plan, idx) in getPlans()"
        :key="`${activeTab}-${idx}`"
        class="relative flex flex-col rounded-2xl border transition-all duration-300 hover:scale-[1.02]"
        :class="plan.highlighted
          ? 'bg-bs-surface-1 border-bs-accent shadow-xl shadow-bs-accent/10'
          : 'bg-bs-surface-2 border-bs-surface-3 hover:border-bs-accent/40'"
      >

        <!-- Popular badge -->
        <div
          v-if="plan.highlighted"
          class="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-bs-accent text-white text-xs font-semibold rounded-full"
        >
          Most Popular
        </div>

        <div class="p-6 sm:p-8 flex flex-col flex-1">

          <!-- Plan name -->
          <h3 class="text-lg font-semibold text-bs-foreground-light">{{ plan.name }}</h3>
          <p class="text-sm text-bs-foreground-dark/60 mt-1">{{ plan.description }}</p>

          <!-- Price -->
          <div class="mt-6 mb-6">
            <span class="text-3xl sm:text-4xl font-bold text-bs-foreground-light">{{ plan.price }}</span>
            <span v-if="plan.period" class="text-sm text-bs-foreground-dark/50 ml-1">/ {{ plan.period }}</span>
          </div>

          <!-- Features -->
          <ul class="space-y-3 mb-8 flex-1">
            <li v-for="(feature, fIdx) in plan.features" :key="fIdx" class="flex items-start gap-3 text-sm text-bs-foreground-dark/80">
              <svg class="w-4 h-4 text-bs-accent mt-0.5 shrink-0" viewBox="0 0 16 16" fill="none">
                <path d="M3 8.5L6.5 12L13 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              {{ feature }}
            </li>
          </ul>

          <!-- CTA -->
          <a
            href="#contact"
            class="block text-center py-3 px-6 rounded-xl text-sm font-semibold transition-all duration-300"
            :class="plan.highlighted
              ? 'bg-bs-accent text-white hover:bg-bs-accent/90 shadow-lg shadow-bs-accent/25'
              : 'bg-bs-surface-3 text-bs-foreground-light hover:bg-bs-surface-3/80 border border-bs-surface-4'"
          >
            {{ plan.cta || 'Get Started' }}
          </a>

        </div>

      </div>

    </div>

    <!-- UI Templates grid -->
    <div v-else class="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
      <div
        v-for="tpl in uiTemplates"
        :key="tpl.id"
        class="group relative flex flex-col bg-bs-surface-1 border border-bs-surface-3 rounded-xl overflow-hidden transition-all duration-300 hover:border-amber-400/40 hover:shadow-[0_0_30px_rgba(251,191,36,0.06)]"
      >
        <div class="relative h-40 bg-bs-surface-3/30 overflow-hidden">
          <img v-if="tpl.preview_image" :src="tpl.preview_image" :alt="tpl.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
          <div v-else class="w-full h-full flex items-center justify-center">
            <Icon name="lucide:layout-template" class="w-10 h-10 text-bs-surface-3" />
          </div>
          <div class="absolute top-3 left-3">
            <span class="text-[10px] uppercase tracking-widest font-semibold px-2 py-0.5 rounded-full bg-amber-400 text-black">PRO</span>
          </div>
        </div>
        <div class="p-5 flex flex-col flex-1">
          <span class="text-xs text-bs-foreground-dark capitalize mb-1">{{ tpl.category?.replace('-', ' ') }}</span>
          <h3 class="font-semibold text-bs-foreground-light mb-1 group-hover:text-amber-400 transition-colors">{{ tpl.title }}</h3>
          <p class="text-sm text-bs-foreground-dark line-clamp-2 mb-4 flex-1">{{ tpl.description }}</p>
          <div class="flex items-center justify-between pt-3 border-t border-bs-surface-3/50">
            <span class="font-bold text-amber-400">{{ tpl.price || 'Free' }}</span>
            <a v-if="tpl.demo_url" :href="tpl.demo_url" target="_blank" rel="noopener noreferrer"
              class="text-xs font-medium text-bs-foreground-dark hover:text-amber-400 transition-colors inline-flex items-center gap-1">
              Live Demo
              <svg class="w-3 h-3" viewBox="0 0 12 12" fill="none"><path d="M3 9l6-6M5 3h4v4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty state for UI tab -->
    <div v-if="activeTab === 'ui' && uiTemplates.length === 0" class="text-center py-16">
      <Icon name="lucide:layout-template" class="w-16 h-16 text-bs-surface-3 mx-auto mb-4" />
      <p class="text-bs-foreground-dark">Templates coming soon. Check back soon.</p>
    </div>

    <!-- Contact note -->
    <p class="text-center text-sm text-bs-foreground-dark/50 mt-10">
      Need something custom?
      <a href="#contact" class="text-bs-accent hover:underline">Talk to us</a> about your specific requirements.
    </p>

  </section>

</template>
