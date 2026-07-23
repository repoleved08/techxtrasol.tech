<script setup>

const props = defineProps(['settings'])

const menuOpen = ref(false)

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

const closeMenu = () => {
  menuOpen.value = false
}

onMounted(() => {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu()
  })
})

</script>

<template>

  <!-- Header -->
  <header class="wrapper bg-loop font-semibold">

    <!-- Wrapper -->
    <div class="bs-container py-6 flex justify-between items-center">

      <!-- Logo -->
      <a class="flex xl:min-w-32 group" href="/" :aria-label="settings.title + ' - Home'">

        <Icon
          name="bs-icon:logo"
          class="group-hover:-rotate-180 group-hover:scale-80 transition-transform ease-bs-spring duration-1000"
          size="48"
        />
      </a>

      <!-- Nav (desktop) -->
      <nav class="hidden md:flex mx-auto self-stretch lg:gap-2">

        <!-- Links -->
        <a v-for="item in settings.nav" :key="item.link"
          class="bs-btn !bg-transparent before:translate-y-full hover:before:translate-y-0" :href="item.link">

          {{ item.title }}

        </a>

      </nav>

      <!-- CTA (desktop) -->
      <button type="button" class="hidden md:block min-w-32 bs-btn" @click="useDialogOpen">

        {{ settings.demo.title }}

      </button>

      <!-- Mobile menu toggle -->
      <button
        type="button"
        class="md:hidden relative z-50 w-10 h-10 flex items-center justify-center rounded-lg bg-bs-surface-3/50 backdrop-blur-sm border border-bs-surface-3 transition-all duration-300 hover:bg-bs-surface-3"
        :aria-label="menuOpen ? 'Close menu' : 'Open menu'"
        :aria-expanded="menuOpen"
        @click="toggleMenu"
      >
        <span class="flex flex-col gap-[5px] w-5 transition-all duration-300" :class="{ '[&_span]:rotate-45 [&_span]:translate-y-[7px]': menuOpen }">
          <span class="block h-[2px] bg-bs-foreground-light rounded-full transition-all duration-300" :class="{ 'rotate-45 translate-y-[7px]': menuOpen }"></span>
          <span class="block h-[2px] bg-bs-foreground-light rounded-full transition-all duration-300" :class="{ 'opacity-0 scale-x-0': menuOpen }"></span>
          <span class="block h-[2px] bg-bs-foreground-light rounded-full transition-all duration-300" :class="{ '-rotate-45 -translate-y-[7px]': menuOpen }"></span>
        </span>
      </button>

    </div>

  </header>

  <!-- Mobile menu overlay -->
  <Teleport to="body">

    <Transition name="menu-fade">
      <div
        v-if="menuOpen"
        class="fixed inset-0 z-40 md:hidden"
        @click="closeMenu"
      >
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/40 backdrop-blur-md"></div>

        <!-- Menu panel -->
        <nav
          class="absolute top-20 left-4 right-4 p-6 rounded-2xl flex flex-col gap-2 bg-bs-surface-0/80 backdrop-blur-xl border border-bs-surface-3/50 shadow-2xl"
          @click.stop
        >
          <!-- Nav links -->
          <a
            v-for="item in settings.nav"
            :key="item.link"
            :href="item.link"
            class="block px-4 py-3 rounded-xl text-lg font-medium text-bs-foreground-dark hover:text-bs-foreground-light hover:bg-bs-surface-3/50 transition-all duration-200"
            @click="closeMenu"
          >
            {{ item.title }}
          </a>

          <!-- Divider -->
          <div class="my-2 border-t border-bs-surface-3/50"></div>

          <!-- CTA -->
          <button
            type="button"
            class="w-full bs-btn text-lg mt-1"
            @click="closeMenu(); useDialogOpen()"
          >
            {{ settings.demo.title }}
          </button>
        </nav>
      </div>
    </Transition>

  </Teleport>

</template>

<style scoped>
.menu-fade-enter-active,
.menu-fade-leave-active {
  transition: opacity 0.25s ease;
}

.menu-fade-enter-active > div:last-child,
.menu-fade-leave-active > div:last-child {
  transition: transform 0.3s var(--ease-bs-spring), opacity 0.25s ease;
}

.menu-fade-enter-from,
.menu-fade-leave-to {
  opacity: 0;
}

.menu-fade-enter-from > div:last-child {
  transform: translateY(-10px) scale(0.97);
  opacity: 0;
}

.menu-fade-leave-to > div:last-child {
  transform: translateY(-10px) scale(0.97);
  opacity: 0;
}
</style>
