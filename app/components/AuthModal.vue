<script setup>

const client = useSupabaseClient()

const email = ref('')
const password = ref('')
const totpCode = ref('')
const loading = ref(false)
const error = ref('')
const mode = ref('login')
const successMessage = ref('')

// MFA state
const mfaFactorId = ref('')
const mfaChallengeId = ref('')

const title = computed(() => {
  if (mode.value === 'reset') return 'Reset password'
  if (mode.value === 'mfa') return 'Two-factor authentication'
  return mode.value === 'login' ? 'Welcome back' : 'Create account'
})

const subtitle = computed(() => {
  if (mode.value === 'reset') return "Enter your email and we'll send a reset link"
  if (mode.value === 'mfa') return 'Enter the 6-digit code from your authenticator app'
  return mode.value === 'login' ? 'Sign in to access your dashboard' : 'Set up your admin account'
})

const submitLabel = computed(() => {
  if (loading.value) {
    if (mode.value === 'mfa') return 'Verifying...'
    if (mode.value === 'reset') return 'Sending...'
    return mode.value === 'login' ? 'Signing in...' : 'Creating account...'
  }
  if (mode.value === 'reset') return 'Send Reset Link'
  if (mode.value === 'mfa') return 'Verify Code'
  return mode.value === 'login' ? 'Sign In' : 'Create Account'
})

function switchMode() {
  mode.value = mode.value === 'login' ? 'register' : 'login'
  error.value = ''
  successMessage.value = ''
}

function goToReset() {
  mode.value = 'reset'
  error.value = ''
  successMessage.value = ''
}

function backToLogin() {
  mode.value = 'login'
  error.value = ''
  successMessage.value = ''
}

async function handleLogin() {
  const { data, error: authError } = await client.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  })
  if (authError) throw authError

  // Check if user has MFA factors
  const { data: factors } = await client.auth.mfa.listFactors()
  const totpFactor = factors?.totp?.[0]

  if (totpFactor) {
    // User has TOTP enrolled — create challenge
    mfaFactorId.value = totpFactor.id
    const { data: challenge, error: challengeError } = await client.auth.mfa.challenge({ factorId: totpFactor.id })
    if (challengeError) throw challengeError
    mfaChallengeId.value = challenge.id
    mode.value = 'mfa'
    return
  }

  // No MFA — proceed
  document.querySelector('#auth-modal').close('success')
  navigateTo('/admin')
}

async function handleMfaVerify() {
  const { error: verifyError } = await client.auth.mfa.verify({
    factorId: mfaFactorId.value,
    challengeId: mfaChallengeId.value,
    code: totpCode.value,
  })
  if (verifyError) throw verifyError

  document.querySelector('#auth-modal').close('success')
  navigateTo('/admin')
}

async function handleReset() {
  const { error: authError } = await client.auth.resetPasswordForEmail(email.value, {
    redirectTo: `${window.location.origin}/auth/confirm`,
  })
  if (authError) throw authError
  success.value = 'Check your email for a password reset link.'
}

async function handleRegister() {
  const { error: authError } = await client.auth.signUp({
    email: email.value,
    password: password.value,
    options: {
      data: { full_name: email.value.split('@')[0] },
      emailRedirectTo: window.location.origin + '/admin',
    },
  })
  if (authError) throw authError
  successMessage.value = 'Check your email for a confirmation link, then sign in.'
  mode.value = 'login'
}

async function handleSubmit() {
  loading.value = true
  error.value = ''
  successMessage.value = ''

  try {
    if (mode.value === 'login') {
      await handleLogin()
    } else if (mode.value === 'register') {
      await handleRegister()
    } else if (mode.value === 'reset') {
      await handleReset()
    } else if (mode.value === 'mfa') {
      await handleMfaVerify()
    }
  } catch (e) {
    error.value = e.message || 'An error occurred'
  } finally {
    loading.value = false
  }
}

function onDialogClose() {
  error.value = ''
  successMessage.value = ''
  email.value = ''
  password.value = ''
  totpCode.value = ''
  mfaFactorId.value = ''
  mfaChallengeId.value = ''
  mode.value = 'login'
}

</script>

<template>

  <dialog id="auth-modal" closedby="any"
    class="auth-modal bg-transparent p-0 m-auto z-50 w-full max-w-[95%] md:max-w-4xl rounded-2xl overflow-hidden">

    <div class="relative flex flex-col md:flex-row min-h-[480px]">

      <!-- Background image panel (left side on desktop) -->
      <div class="relative hidden md:flex md:w-5/12 flex-col justify-end p-8 overflow-hidden">

        <!-- Wallpaper background -->
        <img src="/content-images/blackspike-wallpaper-01.avif" alt=""
          class="absolute inset-0 w-full h-full object-cover" />

        <!-- Overlay -->
        <div class="absolute inset-0 bg-bs-accent/20"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-bs-surface-0/90 via-bs-surface-0/40 to-transparent"></div>

        <!-- Branding text -->
        <div class="relative z-10">
          <Icon name="bs-icon:logo" alt="TechXtrasol" class="h-7 w-auto mb-4 text-bs-foreground-light" />
          <p class="text-sm text-white/70 leading-relaxed">
            Engineering software that moves businesses forward.
          </p>
        </div>

      </div>

      <!-- Form panel (right side on desktop, full width on mobile) -->
      <div class="relative flex-1 bg-bs-surface-1 p-6 sm:p-8 md:p-10 flex flex-col justify-center">

        <!-- Mobile-only wallpaper hint -->
        <div class="absolute inset-0 md:hidden overflow-hidden">
          <img src="/content-images/blackspike-wallpaper-01.avif" alt=""
            class="absolute inset-0 w-full h-full object-cover opacity-10" />
        </div>

        <!-- Close button -->
        <button type="button" onclick="this.closest('dialog').close('close')" aria-label="Close"
          class="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-bs-surface-3/50 text-bs-foreground-dark hover:text-bs-foreground-light hover:bg-bs-surface-3 transition-all duration-200">
          <Icon name="bs-icon:x" size="18" />
        </button>

        <!-- Form content -->
        <div class="relative z-10 w-full max-w-sm mx-auto">

          <!-- Mobile logo -->
          <div class="md:hidden flex items-center gap-2 mb-6">
            <Icon name="bs-icon:logo" alt="TechXtrasol" class="h-6 w-auto text-bs-foreground-light" />
          </div>

          <!-- Header -->
          <h2 class="text-2xl font-bold text-bs-foreground-light mb-1">{{ title }}</h2>
          <p class="text-sm text-bs-foreground-dark mb-6">{{ subtitle }}</p>

          <!-- Error -->
          <Transition name="fade">
            <div v-if="error" class="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-sm text-red-400">
              {{ error }}
            </div>
          </Transition>

          <!-- Success -->
          <Transition name="fade">
            <div v-if="successMessage" class="mb-4 p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-sm text-green-400">
              {{ successMessage }}
            </div>
          </Transition>

          <!-- Form -->
          <form class="flex flex-col gap-4" @submit.prevent="handleSubmit">

            <!-- Email (login, register, reset) -->
            <div v-if="mode !== 'mfa'">
              <label for="auth-email" class="sr-only">Email</label>
              <input id="auth-email" v-model="email" type="email" required autocomplete="email"
                placeholder="Email address"
                class="w-full border-2 rounded-lg bg-bs-surface-0 border-bs-surface-3 form-input px-4 py-3 text-bs-foreground-light placeholder-bs-foreground-dark/50 focus:border-bs-accent/50 transition-all" />
            </div>

            <!-- Password (login, register) -->
            <div v-if="mode === 'login' || mode === 'register'">
              <label for="auth-password" class="sr-only">Password</label>
              <input id="auth-password" v-model="password" type="password" required
                :autocomplete="mode === 'login' ? 'current-password' : 'new-password'"
                placeholder="Password" minlength="6"
                class="w-full border-2 rounded-lg bg-bs-surface-0 border-bs-surface-3 form-input px-4 py-3 text-bs-foreground-light placeholder-bs-foreground-dark/50 focus:border-bs-accent/50 transition-all" />
            </div>

            <!-- TOTP Code (mfa) -->
            <div v-if="mode === 'mfa'">
              <label for="auth-totp" class="sr-only">Authentication code</label>
              <input id="auth-totp" v-model="totpCode" type="text" inputmode="numeric" required
                autocomplete="one-time-code" placeholder="000000" maxlength="6" pattern="[0-9]{6}"
                class="w-full border-2 rounded-lg bg-bs-surface-0 border-bs-surface-3 form-input px-4 py-3 text-bs-foreground-light placeholder-bs-foreground-dark/50 focus:border-bs-accent/50 transition-all text-center text-2xl tracking-[0.5em] font-mono" />
            </div>

            <!-- Submit -->
            <button type="submit" :disabled="loading" class="bs-btn form-input px-4 py-3 mt-1">
              <span v-if="loading" class="inline-block animate-spin mr-2">&#9696;</span>
              {{ submitLabel }}
            </button>

          </form>

          <!-- Forgot password (login mode only) -->
          <p v-if="mode === 'login'" class="mt-3 text-center">
            <button type="button" class="text-sm text-bs-accent hover:underline font-medium" @click="goToReset">
              Forgot password?
            </button>
          </p>

          <!-- Back to login (reset mode) -->
          <p v-if="mode === 'reset'" class="mt-5 text-center text-sm text-bs-foreground-dark">
            Remember your password?
            <button type="button" class="text-bs-accent hover:underline font-medium ml-1" @click="backToLogin">
              Sign In
            </button>
          </p>

          <!-- Toggle mode (login/register only) -->
          <p v-if="mode === 'login' || mode === 'register'" class="mt-5 text-center text-sm text-bs-foreground-dark">
            {{ mode === 'login' ? "Don't have an account?" : 'Already have an account?' }}
            <button type="button" class="text-bs-accent hover:underline font-medium ml-1" @click="switchMode">
              {{ mode === 'login' ? 'Register' : 'Sign In' }}
            </button>
          </p>

        </div>

      </div>

    </div>

  </dialog>

</template>

<style>

html:has(dialog#auth-modal[open]) {
  overflow: hidden;
  scrollbar-gutter: stable;
}

dialog#auth-modal[open]::backdrop {
  backdrop-filter: blur(50px);
}

@keyframes auth-scale-up {
  to {
    translate: 0 0;
    scale: 1;
  }
}

@media (prefers-reduced-motion: no-preference) {

  dialog#auth-modal {
    translate: 0 2rem;
    scale: .8;
  }

  dialog#auth-modal[open] {
    animation: auth-scale-up forwards 1s;
    animation-timing-function: var(--ease-bs-spring);
  }

}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

</style>
