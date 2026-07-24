<script setup>

import Swiper from 'swiper'
import 'swiper/css'

const props = defineProps(['title', 'services'])

const prevBtn = ref(null)
const nextBtn = ref(null)
let swiperInstance = null

onMounted(() => {

  swiperInstance = new Swiper('.js-fc-swiper', {
    slidesPerView: 1.05,
    spaceBetween: 8,
    speed: 500,
    loop: true,
    centeredSlides: true,
    breakpoints: {
      640: {
        slidesPerView: 1.2,
        spaceBetween: 32,
      },
      1600: {
        slidesPerView: 1.4,
        spaceBetween: 64,
      },
      1900: {
        slidesPerView: 1.6,
        spaceBetween: 64,
      },
    }
  })

  if (prevBtn.value) prevBtn.value.addEventListener('click', () => swiperInstance.slidePrev())
  if (nextBtn.value) nextBtn.value.addEventListener('click', () => swiperInstance.slideNext())

})
</script>

<template>

  <section id="services">

    <!-- Header -->
    <header class="bs-container flex items-center justify-between">

      <h2 v-if="title" class="bs-h2">{{ title }}</h2>

      <!-- Buttons -->
      <nav class="bs-st-button-wrapper flex justify-center gap-4">

        <!-- Prev -->
        <button aria-label="Previous slide" ref="prevBtn"
          class="js-fc-btn-prev group bs-btn rounded-full !p-0 flex items-center justify-center h-10 w-10 md:h-12 md:w-12">

          <Icon name="bs-icon:arrow" class="opacity-60 h-4 w-4 -translate-x-[2px] group-active:translate-y-[1px]"
            size="16" />

        </button>

        <!-- Next -->
        <button aria-label="Next slide" ref="nextBtn"
          class="js-fc-btn-next group bs-btn rounded-full !p-0 flex items-center justify-center h-10 w-10 md:h-12 md:w-12 -scale-x-100">

          <Icon name="bs-icon:arrow" class="opacity-60 h-4 w-4 -translate-x-[2px] group-active:translate-y-[1px]"
            size="16" />

        </button>

      </nav>

    </header>

    <!-- Slides -->
    <div class="js-fc-swiper swiper select-none bs-mt-md">

      <div class="swiper-wrapper">

        <div v-for="(item, idx) in [...services, ...services]" :key="idx"
          class="swiper-slide bg-bs-surface-0 border border-bs-surface-3 rounded-xl overflow-hidden !h-auto">

          <figure class="flex flex-col gap-6 isolate min-h-[50svh] md:min-h-[40rem] h-full relative">

            <!-- BG image -->
            <img :src="item.image" :alt="item.image_alt" loading="lazy"
              class="opacity-20 md:opacity-80 rounded-xl grayscale overflow-hidden w-full h-full object-cover object-left absolute inset-0"
              height="1024" width="768" />

            <!-- Gradient mask -->
            <div
              class="hidden md:block absolute rounded-xl overflow-hidden w-full h-full object-cover object-left inset-0 bg-gradient-to-r from-bs-surface-0/90 via-bs-surface-0/60">
            </div>

              <!-- Content -->
              <figcaption class="z-10 p-6 sm:p-10 md:p-20 max-w-xl flex flex-col gap-6 h-full">

                <!-- Title -->
                <h2 class="bs-h2" v-html="item.title" />

                <!-- Intro -->
                <div class="bs-body-text text-pretty flex-1" v-html="item.content" />

                <!-- Features -->
                <ul v-if="item.features" class="flex flex-wrap gap-2 mt-2">
                  <li v-for="(feature, fIdx) in item.features" :key="fIdx"
                    class="text-xs px-3 py-1.5 rounded-full bg-bs-accent/10 text-bs-accent border border-bs-accent/20">
                    {{ feature }}
                  </li>
                </ul>

                <!-- Cta -->
                <button type="button" class="bs-btn inline-block self-start bs-mt-sm" @click="useDialogOpen">

                  {{ item.cta }}

                </button>

              </figcaption>

          </figure>

        </div>

      </div>

    </div>

  </section>

</template>


<style>
/* Show buttons only when in view */

@keyframes show-buttons {
  to {
    opacity: 1;
  }
}

@supports (animation-timeline: view()) {
  .bs-st-button-wrapper {
    opacity: 0;
    animation: show-buttons linear forwards;
    animation-timeline: view(20% block);
  }
}
</style>