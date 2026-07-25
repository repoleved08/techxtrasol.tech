<script setup>

const props = defineProps(['settings'])

const { loggedIn, user } = useAuth()

const menuOpen = ref(false)
const userMenuOpen = ref(false)

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

const closeMenu = () => {
  menuOpen.value = false
}

const toggleUserMenu = () => {
  userMenuOpen.value = !userMenuOpen.value
}

const closeUserMenu = () => {
  userMenuOpen.value = false
}

onMounted(() => {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMenu()
      closeUserMenu()
    }
  })
  document.addEventListener('click', (e) => {
    if (userMenuOpen.value && !e.target.closest('.user-menu-container')) {
      closeUserMenu()
    }
  })
})

</script>

<template>

  <!-- Header -->
  <header class="wrapper bg-loop font-semibold">

    <!-- Wrapper -->
    <div class="bs-container py-6 flex justify-between items-center">

      <!-- Logo -->
      <a class="flex shrink-0 group" href="/" :aria-label="settings.title + ' - Home'">

        <img src="/icons/logo.svg" alt="Techxtrasol" class="h-8 w-auto" />
      </a>

      <!-- Nav (desktop) -->
      <nav class="hidden md:flex mx-auto self-stretch lg:gap-2">

        <!-- Links -->
        <a v-for="item in settings.nav" :key="item.link"
          class="bs-btn !bg-transparent before:translate-y-full hover:before:translate-y-0" :href="item.link">

          {{ item.title }}

        </a>

      </nav>

      <!-- Right side (desktop) -->
      <div class="hidden md:flex items-center gap-3">

        <!-- Logged out: login icon -->
        <a
          v-if="!loggedIn"
          href="/api/login"
          class="w-10 h-10 flex items-center justify-center rounded-lg text-bs-foreground-dark hover:text-bs-foreground-light hover:bg-bs-surface-3/50 transition-all duration-200"
          aria-label="Sign in"
        >
          <Icon name="lucide:user" class="w-5 h-5" />
        </a>

        <!-- Logged in: avatar dropdown -->
        <div v-else class="relative user-menu-container">
          <button
            type="button"
            class="w-10 h-10 rounded-full overflow-hidden border-2 border-bs-surface-3 hover:border-bs-accent transition-all duration-200"
            :aria-label="'Account menu'"
            :aria-expanded="userMenuOpen"
            @click.stop="toggleUserMenu"
          >
            <img
              v-if="user?.picture"
              :src="user.picture"
              :alt="user.given_name || 'Account'"
              class="w-full h-full object-cover"
            />
            <div v-else class="w-full h-full bg-bs-accent/20 flex items-center justify-center">
              <span class="text-bs-accent font-semibold text-sm">
                {{ (user?.given_name || 'U').charAt(0).toUpperCase() }}
              </span>
            </div>
          </button>

          <!-- Dropdown -->
          <Transition name="dropdown">
            <div
              v-if="userMenuOpen"
              class="absolute right-0 top-full mt-2 w-64 p-2 rounded-xl bg-bs-surface-0/95 backdrop-blur-xl border border-bs-surface-3/50 shadow-2xl z-50"
            >
              <!-- User info -->
              <div class="px-3 py-2 border-b border-bs-surface-3/50 mb-1">
                <p class="text-sm font-medium text-bs-foreground-light truncate">
                  {{ user?.given_name }} {{ user?.family_name }}
                </p>
                <p class="text-xs text-bs-foreground-dark truncate">
                  {{ user?.email }}
                </p>
              </div>

              <!-- Dashboard link -->
              <a
                href="/dashboard"
                class="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-bs-foreground-dark hover:text-bs-foreground-light hover:bg-bs-surface-3/50 transition-all duration-200"
                @click="closeUserMenu"
              >
                <Icon name="lucide LayoutDashboard" class="w-4 h-4" />
                Dashboard
              </a>

              <!-- Logout -->
              <a
                href="/api/logout"
                class="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200"
                @click="closeUserMenu"
              >
                <Icon name="lucide LogOut" class="w-4 h-4" />
                Sign out
              </a>
            </div>
          </Transition>
        </div>

        <button type="button" class="min-w-32 bs-btn" @click="useDialogOpen">
          {{ settings.demo.title }}
        </button>
      </div>

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

          <!-- Logged in: show user info -->
          <template v-if="loggedIn">
            <div class="px-4 py-2">
              <p class="text-sm font-medium text-bs-foreground-light">
                {{ user?.given_name }} {{ user?.family_name }}
              </p>
              <p class="text-xs text-bs-foreground-dark">
                {{ user?.email }}
              </p>
            </div>

            <a
              href="/dashboard"
              class="flex items-center gap-3 px-4 py-3 rounded-xl text-lg font-medium text-bs-foreground-dark hover:text-bs-foreground-light hover:bg-bs-surface-3/50 transition-all duration-200"
              @click="closeMenu"
            >
              <Icon name="lucide LayoutDashboard" class="w-5 h-5" />
              Dashboard
            </a>

            <a
              href="/api/logout"
              class="flex items-center gap-3 px-4 py-3 rounded-xl text-lg font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200"
              @click="closeMenu"
            >
              <Icon name="lucide LogOut" class="w-5 h-5" />
              Sign out
            </a>
          </template>

          <!-- Logged out: show login -->
          <a
            v-else
            href="/api/login"
            class="flex items-center gap-3 px-4 py-3 rounded-xl text-lg font-medium text-bs-foreground-dark hover:text-bs-foreground-light hover:bg-bs-surface-3/50 transition-all duration-200"
            @click="closeMenu"
          >
            <Icon name="lucide:user" class="w-5 h-5" />
            Sign in
          </a>

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

.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.95);
}
</style>
