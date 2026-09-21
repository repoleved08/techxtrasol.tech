<script setup>
const { theme, toggleTheme, isLight } = useTheme()

useHead({
  link: [
    { rel: 'preload', href: '/_fonts/178SDQEgKlkYIwN3m_zkIjcMBFousbX0HQCZgo0EBNLzf6Q-6gJALEDS7yNhRMCqenJPe8GZSicXSdryDX23b39FgW8.woff2', as: 'font', type: 'font/woff2', crossorigin: 'anonymous' },
    { rel: 'preload', href: '/_fonts/1A__tf0ZS0Popmdoy0kDZjC9cmK73U4dP6MIlsd_mVE-zPz52wX6aUUJP2ax_uXZbgJ0eM8_rL4hFCIvGE44Ffk.woff2', as: 'font', type: 'font/woff2', crossorigin: 'anonymous' },
    { rel: 'preload', href: '/_fonts/3zHJNmqdAFbSygXFh60olvDMc9mZf_RpJHm5hhtqFXI-PBGlnsMtfLn7RnCxO5_jJe61l26CMDVuNLtfG9gtTlE.woff2', as: 'font', type: 'font/woff2', crossorigin: 'anonymous' },
  ],
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
