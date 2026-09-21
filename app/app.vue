<script setup>
const { theme, toggleTheme, isLight } = useTheme()

useHead({
  script: [
    {
      innerHTML: `(function () {
  var stored = null;
  try { stored = localStorage.getItem('bs-theme'); } catch (e) {}
  if (stored === 'light' || stored === 'dark') {
    document.documentElement.classList.toggle('light', stored === 'light');
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    document.documentElement.classList.add('light');
  }
})();`,
      tagPriority: -1,
    },
  ],
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <WhatsAppButton />
</template>
