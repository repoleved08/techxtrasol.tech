<script setup>
definePageMeta({ layout: false })

const user = useSupabaseUser()

// Redirect to home — auth is now handled via modal
if (import.meta.client) {
  navigateTo('/')
}

// If SSR, redirect
if (import.meta.server) {
  navigateTo('/')
}
</script>

<template>
  <div></div>
</template>
