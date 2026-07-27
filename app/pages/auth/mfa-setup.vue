<script setup>
const client = useSupabaseClient()

const loading = ref(true)
const enrolling = ref(false)
const verifying = ref(false)
const error = ref('')
const success = ref(false)
const qrCode = ref('')
const secret = ref('')
const factorId = ref('')
const verifyCode = ref('')

onMounted(async () => {
  try {
    // Check if user already has a TOTP factor
    const { data: factors } = await client.auth.mfa.listFactors()
    const existingTotp = factors?.totp?.[0]

    if (existingTotp) {
      // Already enrolled
      success.value = true
      loading.value = false
      return
    }

    // Start enrollment
    const { data, error: enrollError } = await client.auth.mfa.enroll({
      factorType: 'totp',
      friendlyName: 'TechXtrasol Admin',
    })
    if (enrollError) throw enrollError

    factorId.value = data.id
    // Supabase returns the QR code as a data URI
    qrCode.value = data.totp?.qr_code || ''
    secret.value = data.totp?.secret || ''
  } catch (e) {
    error.value = e.message || 'Failed to start MFA setup.'
  } finally {
    loading.value = false
  }
})

async function handleVerify() {
  if (verifyCode.value.length !== 6) {
    error.value = 'Enter a 6-digit code.'
    return
  }

  verifying.value = true
  error.value = ''

  try {
    // Unenroll the temporary factor first, then re-enroll properly
    // Actually, we need to create a challenge and verify
    const { data: challenge, error: challengeError } = await client.auth.mfa.challenge({
      factorId: factorId.value,
    })
    if (challengeError) throw challengeError

    const { error: verifyError } = await client.auth.mfa.verify({
      factorId: factorId.value,
      challengeId: challenge.id,
      code: verifyCode.value,
    })
    if (verifyError) throw verifyError

    success.value = true
  } catch (e) {
    error.value = e.message || 'Invalid code. Try again.'
  } finally {
    verifying.value = false
  }
}

function copySecret() {
  navigator.clipboard.writeText(secret.value)
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center px-4">
    <div class="w-full max-w-md">

      <!-- Logo -->
      <div class="flex items-center gap-2 mb-8 justify-center">
        <img src="/icons/logo.svg" alt="TechXtrasol" class="h-7 w-auto" />
      </div>

      <!-- Card -->
      <div class="bg-bs-surface-1 border border-bs-surface-3/50 rounded-2xl p-8">

        <!-- Loading -->
        <div v-if="loading" class="text-center py-8">
          <div class="w-8 h-8 border-2 border-bs-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p class="text-sm text-bs-foreground-dark">Setting up MFA...</p>
        </div>

        <!-- Already enrolled -->
        <div v-else-if="success && !qrCode" class="text-center py-8">
          <div class="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
            <Icon name="lucide:shield-check" class="w-8 h-8 text-green-400" />
          </div>
          <h2 class="text-xl font-bold text-bs-foreground-light mb-2">MFA is active</h2>
          <p class="text-sm text-bs-foreground-dark mb-6">Two-factor authentication is already enabled on your account.</p>
          <NuxtLink to="/admin" class="bs-btn">Go to Dashboard</NuxtLink>
        </div>

        <!-- Error -->
        <div v-else-if="error && !qrCode" class="text-center py-8">
          <Icon name="lucide:alert-circle" class="w-12 h-12 text-red-400 mx-auto mb-4" />
          <p class="text-sm text-red-400 mb-6">{{ error }}</p>
          <NuxtLink to="/admin" class="bs-btn">Back to Dashboard</NuxtLink>
        </div>

        <!-- Enrollment: QR code -->
        <div v-else-if="qrCode && !success">
          <h1 class="text-xl font-bold text-bs-foreground-light mb-1">Set up authenticator</h1>
          <p class="text-sm text-bs-foreground-dark mb-6">
            Scan this QR code with your authenticator app (Google Authenticator, Authy, etc.).
          </p>

          <!-- QR Code -->
          <div class="flex justify-center mb-4">
            <div class="bg-white p-4 rounded-xl">
              <img :src="qrCode" alt="MFA QR Code" class="w-48 h-48" />
            </div>
          </div>

          <!-- Manual entry -->
          <div class="mb-6">
            <p class="text-xs text-bs-foreground-dark text-center mb-2">Or enter this code manually:</p>
            <div class="flex items-center gap-2 justify-center">
              <code class="text-xs bg-bs-surface-0 border border-bs-surface-3/50 rounded-lg px-3 py-2 text-bs-foreground-light font-mono select-all">
                {{ secret }}
              </code>
              <button @click="copySecret" class="p-2 rounded-lg text-bs-foreground-dark hover:text-bs-accent hover:bg-bs-accent/10 transition-all" title="Copy">
                <Icon name="lucide:copy" class="w-4 h-4" />
              </button>
            </div>
          </div>

          <!-- Verify -->
          <div v-if="error" class="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-sm text-red-400">
            {{ error }}
          </div>

          <form @submit.prevent="handleVerify" class="flex flex-col gap-4">
            <div>
              <label for="totp-verify" class="block text-sm font-medium text-bs-foreground-dark mb-1.5">Verification code</label>
              <input id="totp-verify" v-model="verifyCode" type="text" inputmode="numeric" required
                autocomplete="one-time-code" placeholder="000000" maxlength="6" pattern="[0-9]{6}"
                class="w-full border-2 rounded-lg bg-bs-surface-0 border-bs-surface-3 form-input px-4 py-3 text-bs-foreground-light placeholder-bs-foreground-dark/50 focus:border-bs-accent/50 transition-all text-center text-2xl tracking-[0.5em] font-mono" />
            </div>

            <button type="submit" :disabled="verifying" class="bs-btn px-4 py-3">
              <span v-if="verifying" class="inline-block animate-spin mr-2">&#9696;</span>
              {{ verifying ? 'Verifying...' : 'Verify & Enable' }}
            </button>
          </form>
        </div>

        <!-- Success after verify -->
        <div v-else-if="success" class="text-center py-8">
          <div class="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
            <Icon name="lucide:shield-check" class="w-8 h-8 text-green-400" />
          </div>
          <h2 class="text-xl font-bold text-bs-foreground-light mb-2">MFA enabled</h2>
          <p class="text-sm text-bs-foreground-dark mb-6">
            Two-factor authentication is now active. You'll need your authenticator app to sign in.
          </p>
          <NuxtLink to="/admin" class="bs-btn">Go to Dashboard</NuxtLink>
        </div>

      </div>

    </div>
  </div>
</template>
