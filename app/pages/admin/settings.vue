<script setup>
definePageMeta({ middleware: 'auth-admin', layout: 'admin' })

const user = useSupabaseUser()
const client = useSupabaseClient()
const { adminUser } = useAdmin()

const userName = computed(() => user.value?.user_metadata?.full_name || user.value?.email || '')
const userEmail = computed(() => user.value?.email || '')

async function signOut() {
  await client.auth.signOut()
  navigateTo('/')
}
</script>

<template>
  <div class="max-w-2xl">
    <h1 class="text-2xl font-bold text-bs-foreground-light mb-6">Settings</h1>

    <!-- Account -->
    <div class="bg-bs-surface-1 border border-bs-surface-3/50 rounded-xl p-6 mb-6">
      <h2 class="text-lg font-semibold text-bs-foreground-light mb-4">Account</h2>
      <div class="space-y-3">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 rounded-full bg-bs-accent/20 border-2 border-bs-accent/30 flex items-center justify-center text-bs-accent font-bold">
            {{ userName.charAt(0) }}
          </div>
          <div>
            <p class="font-medium text-bs-foreground-light">{{ userName }}</p>
            <p class="text-sm text-bs-foreground-dark">{{ userEmail }}</p>
          </div>
        </div>
        <div class="pt-3 border-t border-bs-surface-3/50">
          <p class="text-sm text-bs-foreground-dark">
            <span class="font-medium text-bs-foreground-light">Role:</span>
            {{ adminUser?.role || 'admin' }}
          </p>
        </div>
      </div>
    </div>

    <!-- Quick Links -->
    <div class="bg-bs-surface-1 border border-bs-surface-3/50 rounded-xl p-6 mb-6">
      <h2 class="text-lg font-semibold text-bs-foreground-light mb-4">Quick Links</h2>
      <div class="space-y-2">
        <a href="/" class="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-bs-foreground-dark hover:text-bs-foreground-light hover:bg-bs-surface-3/50 transition-colors transition-transform transition-opacity">
          <Icon name="lucide:external-link" class="w-4 h-4" />
          View Live Site
        </a>
        <button type="button" class="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors transition-transform transition-opacity w-full text-left" @click="signOut">
          <Icon name="lucide:log-out" class="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </div>

    <!-- Info -->
    <div class="bg-bs-surface-1 border border-bs-surface-3/50 rounded-xl p-6">
      <h2 class="text-lg font-semibold text-bs-foreground-light mb-4">System Info</h2>
      <div class="space-y-2 text-sm">
        <div class="flex justify-between">
          <span class="text-bs-foreground-dark">Framework</span>
          <span class="text-bs-foreground-light">Nuxt 4</span>
        </div>
        <div class="flex justify-between">
          <span class="text-bs-foreground-dark">Auth Provider</span>
          <span class="text-bs-foreground-light">Supabase Auth</span>
        </div>
        <div class="flex justify-between">
          <span class="text-bs-foreground-dark">Database</span>
          <span class="text-bs-foreground-light">Supabase</span>
        </div>
      </div>
    </div>
  </div>
</template>
