<script setup>
const { isLight, toggleTheme } = useTheme()
</script>

<template>
  <button
    type="button"
    class="w-10 h-10 flex items-center justify-center rounded-full bg-bs-surface-3/50 text-bs-foreground-dark hover:text-bs-foreground-light hover:bg-bs-surface-3 transition-colors transition-transform transition-opacity duration-200"
    :aria-label="isLight ? 'Switch to dark mode' : 'Switch to light mode'"
    @click="toggleTheme"
  >
    <Transition name="theme-icon" mode="out-in">
      <Icon v-if="isLight" key="sun" name="lucide:sun" class="w-5 h-5" />
      <Icon v-else key="moon" name="lucide:moon" class="w-5 h-5" />
    </Transition>
  </button>
</template>

<style scoped>
.theme-icon-enter-active,
.theme-icon-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.theme-icon-enter-from {
  opacity: 0;
  transform: rotate(-90deg) scale(0.6);
}

.theme-icon-leave-to {
  opacity: 0;
  transform: rotate(90deg) scale(0.6);
}
</style>
