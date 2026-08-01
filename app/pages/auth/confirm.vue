<script setup>
const client = useSupabaseClient()

const newPassword = ref('')
const confirmPassword = ref('')
const loading = ref(false)
const error = ref('')
const success = ref(false)
const sessionReady = ref(false)

onMounted(async () => {
  // Supabase sends tokens in the URL hash: #access_token=...&refresh_token=...&type=recovery
  const hash = window.location.hash.substring(1)
  const params = new URLSearchParams(hash)
  const accessToken = params.get('access_token')
  const refreshToken = params.get('refresh_token')
  const type = params.get('type')

  if (type !== 'recovery' || !accessToken || !refreshToken) {
    error.value = 'Invalid or expired reset link. Please request a new one.'
    return
  }

  // Set the session with the recovery tokens
  const { error: sessionError } = await client.auth.setSession({
    access_token: accessToken,
    refresh_token: refreshToken,
  })

  if (sessionError) {
    error.value = 'Failed to verify reset link. Please request a new one.'
    return
  }

  sessionReady.value = true
  // Clean the URL hash
  window.history.replaceState(null, '', window.location.pathname)
})

async function handleReset() {
  error.value = ''

  if (newPassword.value.length < 6) {
    error.value = 'Password must be at least 6 characters.'
    return
  }

  if (newPassword.value !== confirmPassword.value) {
    error.value = 'Passwords do not match.'
    return
  }

  loading.value = true
  try {
    const { error: updateError } = await client.auth.updateUser({
      password: newPassword.value,
    })
    if (updateError) throw updateError
    success.value = true
  } catch (e) {
    error.value = e.message || 'Failed to reset password.'
  } finally {
    loading.value = false
  }
}

function goToLogin() {
  navigateTo('/')
  setTimeout(() => {
    document.querySelector('#auth-modal')?.showModal()
  }, 100)
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center px-4">
    <div class="w-full max-w-md">

      <!-- Logo -->
      <div class="flex items-center gap-2 mb-8 justify-center">
        <Icon name="bs-icon:logo" alt="TechXtrasol" class="h-7 w-auto text-bs-foreground-light" />
      </div>

      <!-- Card -->
      <div class="bg-bs-surface-1 border border-bs-surface-3/50 rounded-2xl p-8">

        <!-- Loading state -->
        <div v-if="!sessionReady && !error && !success" class="text-center py-8">
          <div class="w-8 h-8 border-2 border-bs-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p class="text-sm text-bs-foreground-dark">Verifying reset link...</p>
        </div>

        <!-- Error state -->
        <div v-else-if="error && !sessionReady" class="text-center py-8">
          <Icon name="lucide:alert-circle" class="w-12 h-12 text-red-400 mx-auto mb-4" />
          <p class="text-sm text-red-400 mb-6">{{ error }}</p>
          <button @click="goToLogin" class="bs-btn">Back to Sign In</button>
        </div>

        <!-- Success state -->
        <div v-else-if="success" class="text-center py-8">
          <div class="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
            <Icon name="lucide:check" class="w-8 h-8 text-green-400" />
          </div>
          <h2 class="text-xl font-bold text-bs-foreground-light mb-2">Password updated</h2>
          <p class="text-sm text-bs-foreground-dark mb-6">Your password has been reset successfully.</p>
          <button @click="goToLogin" class="bs-btn">Sign In</button>
        </div>

        <!-- Reset form -->
        <div v-else-if="sessionReady">
          <h1 class="text-xl font-bold text-bs-foreground-light mb-1">Set new password</h1>
          <p class="text-sm text-bs-foreground-dark mb-6">Choose a strong password for your account.</p>

          <div v-if="error" class="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-sm text-red-400">
            {{ error }}
          </div>

          <form @submit.prevent="handleReset" class="flex flex-col gap-4">
            <div>
              <label for="new-password" class="block text-sm font-medium text-bs-foreground-dark mb-1.5">New Password</label>
              <input id="new-password" v-model="newPassword" type="password" required minlength="6"
                autocomplete="new-password" placeholder="Minimum 6 characters"
                class="w-full border-2 rounded-lg bg-bs-surface-0 border-bs-surface-3 form-input px-4 py-3 text-bs-foreground-light placeholder-bs-foreground-dark/50 focus:border-bs-accent/50 transition-all" />
            </div>

            <div>
              <label for="confirm-password" class="block text-sm font-medium text-bs-foreground-dark mb-1.5">Confirm Password</label>
              <input id="confirm-password" v-model="confirmPassword" type="password" required minlength="6"
                autocomplete="new-password" placeholder="Re-enter password"
                class="w-full border-2 rounded-lg bg-bs-surface-0 border-bs-surface-3 form-input px-4 py-3 text-bs-foreground-light placeholder-bs-foreground-dark/50 focus:border-bs-accent/50 transition-all" />
            </div>

            <button type="submit" :disabled="loading" class="bs-btn px-4 py-3 mt-1">
              <span v-if="loading" class="inline-block animate-spin mr-2">&#9696;</span>
              {{ loading ? 'Updating...' : 'Update Password' }}
            </button>
          </form>
        </div>

      </div>

    </div>
  </div>
</template>
