const theme = ref<'light' | 'dark'>('dark')

function resolveInitialTheme() {
  if (import.meta.client) {
    const stored = localStorage.getItem('bs-theme')
    if (stored === 'light' || stored === 'dark') return stored
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
  }
  return 'dark'
}

export function useTheme() {
  const isLight = computed(() => theme.value === 'light')

  function applyTheme(value: 'light' | 'dark') {
    theme.value = value
    if (import.meta.client) {
      const root = document.documentElement
      root.classList.toggle('light', value === 'light')
      localStorage.setItem('bs-theme', value)
    }
  }

  function toggleTheme() {
    applyTheme(theme.value === 'light' ? 'dark' : 'light')
  }

  if (import.meta.client && !import.meta.server) {
    applyTheme(resolveInitialTheme())
  }

  return {
    theme,
    isLight,
    toggleTheme,
    applyTheme,
  }
}
