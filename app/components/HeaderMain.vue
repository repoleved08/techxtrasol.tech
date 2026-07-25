<script setup>

const props = defineProps(['settings'])

const { loggedIn, user } = useAuth()

const menuOpen = ref(false)
const userMenuOpen = ref(false)

const initials = computed(() => {
  if (!user.value) return '?'
  const first = (user.value.given_name || '').charAt(0).toUpperCase()
  const last = (user.value.family_name || '').charAt(0).toUpperCase()
  return first + last
})

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
    <div class="bs-container py-4 md:py-5 flex items-center gap-4 md:gap-6">

      <!-- Logo -->
      <a class="shrink-0 group" href="/" :aria-label="settings.title + ' - Home'">
        <img src="/icons/logo.svg" alt="Techxtrasol" class="h-7 md:h-8 w-auto" />
      </a>

      <!-- Nav (desktop) -->
      <nav class="hidden lg:flex mx-auto items-center gap-1">
        <a v-for="item in settings.nav" :key="item.link"
          class="bs-btn !bg-transparent before:translate-y-full hover:before:translate-y-0" :href="item.link">
          {{ item.title }}
        </a>
      </nav>

      <!-- Right side (desktop) -->
      <div class="hidden lg:flex items-center gap-3 shrink-0">

        <!-- CTA button -->
        <button type="button" class="min-w-32 bs-btn" @click="useDialogOpen">
          {{ settings.demo.title }}
        </button>

        <!-- Logged out: user icon -->
        <a
          v-if="!loggedIn"
          href="/api/login"
          class="w-10 h-10 flex items-center justify-center rounded-full bg-bs-surface-3/50 text-bs-foreground-dark hover:text-bs-foreground-light hover:bg-bs-surface-3 transition-all duration-200"
          aria-label="Sign in"
        >
          <Icon name="lucide:user" class="w-5 h-5" />
        </a>

        <!-- Logged in: initials dropdown -->
        <div v-else class="relative user-menu-container">
          <button
            type="button"
            class="w-10 h-10 rounded-full bg-bs-accent/20 border-2 border-bs-accent/30 hover:border-bs-accent flex items-center justify-center transition-all duration-200"
            :aria-label="'Account menu'"
            :aria-expanded="userMenuOpen"
            @click.stop="toggleUserMenu"
          >
            <span class="text-bs-accent font-bold text-sm leading-none">{{ initials }}</span>
          </button>

          <!-- Dropdown -->
          <Transition name="dropdown">
            <div
              v-if="userMenuOpen"
              class="absolute right-0 top-full mt-2 w-64 p-2 rounded-xl bg-bs-surface-0/95 backdrop-blur-xl border border-bs-surface-3/50 shadow-2xl z-50"
            >
              <!-- User info -->
              <div class="px-3 py-2.5 border-b border-bs-surface-3/50 mb-1">
                <p class="text-sm font-medium text-bs-foreground-light truncate">
                  {{ user?.given_name }} {{ user?.family_name }}
                </p>
                <p class="text-xs text-bs-foreground-dark truncate">
                  {{ user?.email }}
                </p>
              </div>

              <!-- Dashboard -->
              <a
                href="/dashboard"
                class="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-bs-foreground-dark hover:text-bs-foreground-light hover:bg-bs-surface-3/50 transition-all duration-200"
                @click="closeUserMenu"
              >
                <Icon name="lucide:layout-dashboard" class="w-4 h-4" />
                Dashboard
              </a>

              <!-- Logout -->
              <a
                href="/api/logout"
                class="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200"
                @click="closeUserMenu"
              >
                <Icon name="lucide:log-out" class="w-4 h-4" />
                Sign out
              </a>
            </div>
          </Transition>
        </div>

      </div>

      <!-- Mobile right: CTA + hamburger -->
      <div class="flex lg:hidden items-center gap-3 ml-auto">

        <!-- CTA button (compact on small screens) -->
        <button type="button" class="bs-btn text-sm px-4 py-2" @click="useDialogOpen">
          {{ settings.demo.title }}
        </button>

        <!-- Hamburger -->
        <button
          type="button"
          class="relative z-50 w-10 h-10 flex items-center justify-center rounded-lg bg-bs-surface-3/50 backdrop-blur-sm border border-bs-surface-3 transition-all duration-300 hover:bg-bs-surface-3"
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

    </div>

  </header>

  <!-- Mobile menu overlay -->
  <Teleport to="body">

    <Transition name="menu-fade">
      <div
        v-if="menuOpen"
        class="fixed inset-0 z-40 lg:hidden"
        @click="closeMenu"
      >
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/40 backdrop-blur-md"></div>

        <!-- Menu panel -->
        <nav
          class="absolute top-20 left-4 right-4 p-6 rounded-2xl flex flex-col gap-1 bg-bs-surface-0/80 backdrop-blur-xl border border-bs-surface-3/50 shadow-2xl"
          @click.stop
        >
          <!-- Nav links -->
          <a
            v-for="item in settings.nav"
            :key="item.link"
            :href="item.link"
            class="block px-4 py-3 rounded-xl text-base font-medium text-bs-foreground-dark hover:text-bs-foreground-light hover:bg-bs-surface-3/50 transition-all duration-200"
            @click="closeMenu"
          >
            {{ item.title }}
          </a>

          <!-- Divider -->
          <div class="my-2 border-t border-bs-surface-3/50"></div>

          <!-- Logged in -->
          <template v-if="loggedIn">
            <!-- User info with initials -->
            <div class="flex items-center gap-3 px-4 py-2">
              <span class="w-9 h-9 rounded-full bg-bs-accent/20 border-2 border-bs-accent/30 flex items-center justify-center text-bs-accent font-bold text-sm">
                {{ initials }}
              </span>
              <div class="min-w-0">
                <p class="text-sm font-medium text-bs-foreground-light truncate">
                  {{ user?.given_name }} {{ user?.family_name }}
                </p>
                <p class="text-xs text-bs-foreground-dark truncate">
                  {{ user?.email }}
                </p>
              </div>
            </div>

            <a
              href="/dashboard"
              class="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium text-bs-foreground-dark hover:text-bs-foreground-light hover:bg-bs-surface-3/50 transition-all duration-200"
              @click="closeMenu"
            >
              <Icon name="lucide:layout-dashboard" class="w-5 h-5" />
              Dashboard
            </a>

            <a
              href="/api/logout"
              class="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200"
              @click="closeMenu"
            >
              <Icon name="lucide:log-out" class="w-5 h-5" />
              Sign out
            </a>
          </template>

          <!-- Logged out -->
          <a
            v-else
            href="/api/login"
            class="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium text-bs-foreground-dark hover:text-bs-foreground-light hover:bg-bs-surface-3/50 transition-all duration-200"
            @click="closeMenu"
          >
            <Icon name="lucide:user" class="w-5 h-5" />
            Sign in
          </a>
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
