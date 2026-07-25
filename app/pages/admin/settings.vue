<script setup>
definePageMeta({ middleware: 'auth.admin', layout: 'admin' })

const { user } = useAuth()
const { adminUser, isAdmin } = useAdmin()
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
            {{ (user?.given_name || 'A').charAt(0) }}{{ (user?.family_name || '').charAt(0) }}
          </div>
          <div>
            <p class="font-medium text-bs-foreground-light">{{ user?.given_name }} {{ user?.family_name }}</p>
            <p class="text-sm text-bs-foreground-dark">{{ user?.email }}</p>
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
        <a href="/" class="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-bs-foreground-dark hover:text-bs-foreground-light hover:bg-bs-surface-3/50 transition-all">
          <Icon name="lucide:external-link" class="w-4 h-4" />
          View Live Site
        </a>
        <a href="/api/logout" class="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all">
          <Icon name="lucide:log-out" class="w-4 h-4" />
          Sign Out
        </a>
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
          <span class="text-bs-foreground-light">Kinde</span>
        </div>
        <div class="flex justify-between">
          <span class="text-bs-foreground-dark">Database</span>
          <span class="text-bs-foreground-light">Supabase</span>
        </div>
      </div>
    </div>
  </div>
</template>
