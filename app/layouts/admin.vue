<script setup>
definePageMeta({ layout: 'admin' })

const user = useSupabaseUser()
const client = useSupabaseClient()
const { isAdmin, adminUser, checkAdminStatus } = useAdmin()
const route = useRoute()

onMounted(async () => {
  await checkAdminStatus()
})

async function signOut() {
  await client.auth.signOut()
  navigateTo('/')
}

const sidebarOpen = ref(false)

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: 'lucide:layout-dashboard' },
  { name: 'Projects', href: '/admin/projects', icon: 'lucide:briefcase' },
  { name: 'Case Studies', href: '/admin/case-studies', icon: 'lucide:file-text' },
  { name: 'Blog', href: '/admin/blog', icon: 'lucide:pencil' },
  { name: 'Services', href: '/admin/services', icon: 'lucide:cog' },
  { name: 'Testimonials', href: '/admin/testimonials', icon: 'lucide:quote' },
  { name: 'UI Templates', href: '/admin/ui-templates', icon: 'lucide:layout-template' },
  { name: 'Categories', href: '/admin/categories', icon: 'lucide:tag' },
  { name: 'Technologies', href: '/admin/technologies', icon: 'lucide:cpu' },
  { name: 'Industries', href: '/admin/industries', icon: 'lucide:factory' },
  { name: 'Settings', href: '/admin/settings', icon: 'lucide:settings' },
]

function isActive(href) {
  if (href === '/admin') return route.path === '/admin'
  return route.path.startsWith(href)
}
</script>

<template>
  <div class="min-h-screen bg-bs-surface-0">
    <!-- Mobile sidebar backdrop -->
    <Transition name="fade">
      <div
        v-if="sidebarOpen"
        class="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
        @click="sidebarOpen = false"
      />
    </Transition>

    <!-- Sidebar -->
    <aside
      class="fixed inset-y-0 left-0 z-50 w-64 bg-bs-surface-1 border-r border-bs-surface-3/50 transform transition-transform duration-300 lg:translate-x-0"
      :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <!-- Logo -->
      <div class="flex items-center gap-3 px-6 py-5 border-b border-bs-surface-3/50">
        <a href="/" class="flex items-center gap-2">
          <img src="/icons/logo.svg" alt="TechXtrasol" class="h-7 w-auto" />
        </a>
        <span class="text-xs font-medium text-bs-foreground-dark bg-bs-accent/10 text-bs-accent px-2 py-0.5 rounded-full">Admin</span>
      </div>

      <!-- Navigation -->
      <nav class="flex flex-col gap-1 p-4 overflow-y-auto">
        <a
          v-for="item in navigation"
          :key="item.href"
          :href="item.href"
          class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200"
          :class="isActive(item.href) ? 'bg-bs-accent/10 text-bs-accent' : 'text-bs-foreground-dark hover:text-bs-foreground-light hover:bg-bs-surface-3/50'"
          @click="sidebarOpen = false"
        >
          <Icon :name="item.icon" class="w-5 h-5" />
          {{ item.name }}
        </a>
      </nav>

      <!-- User info -->
      <div class="absolute bottom-0 left-0 right-0 p-4 border-t border-bs-surface-3/50">
        <div class="flex items-center gap-3 px-3 py-2">
          <div class="w-9 h-9 rounded-full bg-bs-accent/20 border-2 border-bs-accent/30 flex items-center justify-center text-bs-accent font-bold text-sm">
            {{ (user?.user_metadata?.full_name || 'A').charAt(0) }}{{ (user?.user_metadata?.full_name || '').split(' ').pop()?.charAt(0) || '' }}
          </div>
          <div class="min-w-0 flex-1">
            <p class="text-sm font-medium text-bs-foreground-light truncate">{{ user?.user_metadata?.full_name || user?.email }}</p>
            <p class="text-xs text-bs-foreground-dark truncate">{{ user?.email }}</p>
          </div>
        </div>
      </div>
    </aside>

    <!-- Main content -->
    <div class="lg:pl-64">
      <!-- Top bar -->
      <header class="sticky top-0 z-30 flex items-center gap-4 px-6 py-4 bg-bs-surface-0/80 backdrop-blur-xl border-b border-bs-surface-3/50">
        <!-- Mobile menu toggle -->
        <button
          type="button"
          class="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg bg-bs-surface-3/50 text-bs-foreground-dark hover:bg-bs-surface-3 transition-all"
          @click="sidebarOpen = true"
        >
          <Icon name="lucide:menu" class="w-5 h-5" />
        </button>

        <div class="flex-1" />

        <!-- Back to site -->
        <a
          href="/"
          class="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-bs-foreground-dark hover:text-bs-foreground-light hover:bg-bs-surface-3/50 transition-all"
        >
          <Icon name="lucide:external-link" class="w-4 h-4" />
          <span class="hidden sm:inline">View Site</span>
        </a>

        <!-- Sign out -->
        <button
          type="button"
          class="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all"
          @click="signOut"
        >
          <Icon name="lucide:log-out" class="w-4 h-4" />
          <span class="hidden sm:inline">Sign Out</span>
        </button>
      </header>

      <!-- Page content -->
      <main class="p-6">
        <slot />
      </main>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
