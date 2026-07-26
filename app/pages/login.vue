<script setup>
definePageMeta({ layout: false })

const client = useSupabaseClient()
const user = useSupabaseUser()

const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')
const mode = ref('login')

// Redirect if already logged in
watch(user, (u) => {
  if (u) navigateTo('/admin')
}, { immediate: true })

async function handleSubmit() {
  loading.value = true
  error.value = ''

  try {
    if (mode.value === 'login') {
      const { error: authError } = await client.auth.signInWithPassword({
        email: email.value,
        password: password.value,
      })
      if (authError) throw authError
      navigateTo('/admin')
    } else {
      const { error: authError } = await client.auth.signUp({
        email: email.value,
        password: password.value,
        options: {
          data: { full_name: email.value.split('@')[0] },
        },
      })
      if (authError) throw authError
      error.value = 'Check your email for a confirmation link.'
    }
  } catch (e) {
    error.value = e.message || 'An error occurred'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-bs-surface-0 px-4">
    <div class="w-full max-w-md">
      <!-- Logo -->
      <div class="text-center mb-8">
        <a href="/" class="inline-block">
          <img src="/icons/logo.svg" alt="TechXtrasol" class="h-8 mx-auto" />
        </a>
        <h1 class="mt-4 text-2xl font-bold text-bs-foreground-light">
          {{ mode === 'login' ? 'Welcome back' : 'Create account' }}
        </h1>
        <p class="mt-1 text-sm text-bs-foreground-dark">
          {{ mode === 'login' ? 'Sign in to your admin account' : 'Set up a new admin account' }}
        </p>
      </div>

      <!-- Form -->
      <form
        class="bg-bs-surface-1 border border-bs-surface-3/50 rounded-xl p-6 space-y-4"
        @submit.prevent="handleSubmit"
      >
        <!-- Error -->
        <div v-if="error" class="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-sm text-red-400">
          {{ error }}
        </div>

        <!-- Email -->
        <div>
          <label for="email" class="block text-sm font-medium text-bs-foreground-dark mb-1.5">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            required
            autocomplete="email"
            placeholder="you@example.com"
            class="w-full px-3 py-2.5 rounded-lg bg-bs-surface-2 border border-bs-surface-3/50 text-bs-foreground-light placeholder-bs-foreground-dark/50 focus:outline-none focus:ring-2 focus:ring-bs-accent/50 focus:border-bs-accent/50 transition-all"
          />
        </div>

        <!-- Password -->
        <div>
          <label for="password" class="block text-sm font-medium text-bs-foreground-dark mb-1.5">Password</label>
          <input
            id="password"
            v-model="password"
            type="password"
            required
            autocomplete="current-password"
            placeholder="Enter your password"
            minlength="6"
            class="w-full px-3 py-2.5 rounded-lg bg-bs-surface-2 border border-bs-surface-3/50 text-bs-foreground-light placeholder-bs-foreground-dark/50 focus:outline-none focus:ring-2 focus:ring-bs-accent/50 focus:border-bs-accent/50 transition-all"
          />
        </div>

        <!-- Submit -->
        <button
          type="submit"
          :disabled="loading"
          class="w-full bs-btn !py-2.5 !text-sm"
        >
          <span v-if="loading" class="inline-block animate-spin mr-2">&#9696;</span>
          {{ mode === 'login' ? 'Sign In' : 'Create Account' }}
        </button>

        <!-- Toggle mode -->
        <p class="text-center text-sm text-bs-foreground-dark">
          {{ mode === 'login' ? "Don't have an account?" : 'Already have an account?' }}
          <button
            type="button"
            class="text-bs-accent hover:underline ml-1"
            @click="mode = mode === 'login' ? 'register' : 'login'; error = ''"
          >
            {{ mode === 'login' ? 'Register' : 'Sign In' }}
          </button>
        </p>
      </form>
    </div>
  </div>
</template>
