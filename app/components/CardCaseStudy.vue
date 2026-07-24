<script setup>

const props = defineProps(['caseStudy'])

</script>

<template>

  <!-- Wrapper -->
  <div class="group @container">

    <!-- Case study -->
    <article :class="caseStudy.bg"
      class="relative isolate flex h-full w-full gap-6 overflow-hidden rounded-xl pt-[20rem]  @md:pt-[28rem] @xl:justify-end @4xl:pt-0">

      <img :src="caseStudy.image" :alt="caseStudy.image_alt"
        class="drop-shadow-[0_100px_100px_rgba(0,0,0,0.5)] absolute top-[4cqb] left-8 mx-auto w-[90cqi] rounded-xl  @4xl:w-[60cqi] group-hover:scale-105 transition-transform duration-3000 ease-bs-spring transform-gpu"
        loading="lazy" height="1024" width="768">

      <!-- Content -->
      <div class="z-10 flex w-full h-full flex-col gap-6 bg-bs-surface-0/50 backdrop-blur-3xl p-6 @4xl:w-1/2 @4xl:p-20">

        <!-- Header -->
        <header class="flex flex-col gap-3">

          <!-- Sector -->
          <div class="text-xs uppercase tracking-widest font-semibold text-transparent bg-clip-text
            bg-gradient-to-r" :class="caseStudy.bg" v-html="caseStudy.sector" />

          <!-- Title -->
          <h2 class="bs-h2" v-html="caseStudy.title" />

        </header>

        <!-- Intro -->
        <div class="bs-body-text flex-grow text-balance" v-html="caseStudy.content" />

        <!-- Technology -->
        <div v-if="caseStudy.technology" class="flex flex-wrap gap-2">
          <span v-for="(tech, tIdx) in caseStudy.technology" :key="tIdx"
            class="text-[10px] px-2 py-1 rounded-full bg-white/10 text-white/80 border border-white/20">
            {{ tech }}
          </span>
        </div>

        <!-- Results -->
        <ul v-if="caseStudy.results" class="space-y-1.5">
          <li v-for="(result, rIdx) in caseStudy.results" :key="rIdx"
            class="flex items-center gap-2 text-sm text-white/80">
            <svg class="w-3 h-3 shrink-0" viewBox="0 0 12 12" fill="none">
              <path d="M2 6L5 9L10 3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            {{ result }}
          </li>
        </ul>

        <!-- CTAs -->
        <div class="flex flex-wrap gap-3 @4xl:mt-12">
          <a v-if="caseStudy.case_study_link" :href="caseStudy.case_study_link" target="_blank" rel="noopener noreferrer"
            class="bs-btn inline-block">
            {{ caseStudy.cta }}
          </a>
          <a v-if="caseStudy.live_link" :href="caseStudy.live_link" target="_blank" rel="noopener noreferrer"
            class="bs-btn inline-block !bg-white/10 hover:!bg-white/20">
            Visit Live Site
          </a>
        </div>

      </div>

    </article>

  </div>

</template>
