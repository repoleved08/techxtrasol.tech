<script setup>

const props = defineProps(['demo'])

const form = reactive({
  name: '',
  company: '',
  email: '',
  project_details: '',
})

const submitting = ref(false)
const submitted = ref(false)
const error = ref('')

async function handleSubmit() {
  if (!form.name.trim() || !form.email.trim()) {
    error.value = 'Please enter your name and email.'
    return
  }

  submitting.value = true
  error.value = ''

  try {
    const res = await $fetch('/api/contact', {
      method: 'POST',
      body: {
        name: form.name,
        company: form.company,
        email: form.email,
        project_details: form.project_details,
      },
    })
    submitted.value = true
  }
  catch (e) {
    error.value = e.data?.message || 'Something went wrong. Please try again.'
  }
  finally {
    submitting.value = false
  }
}

function closeDialog() {
  submitted.value = false
  error.value = ''
  form.name = ''
  form.company = ''
  form.email = ''
  form.project_details = ''
  document.getElementById('demo')?.close('close')
}

</script>

<template>

  <dialog id="demo" closedby="any" ref="modal_dialog"
    class="fixed inset-0 bg-bs-surface-0 m-auto z-50 p-6 md:p-12 rounded-xl w-full max-w-[95%] md:max-w-lg">

    <!-- Success state -->
    <div v-if="submitted" class="flex flex-col items-center justify-center gap-4 py-8">
      <div class="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center">
        <svg class="w-8 h-8 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M20 6L9 17l-5-5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <h2 class="text-xl font-bold text-bs-foreground-light text-center">Thank You!</h2>
      <p class="text-sm text-bs-foreground-dark text-center">We've received your consultation request and will get back to you within 24 hours.</p>
      <button @click="closeDialog" class="bs-btn mt-2">Close</button>
    </div>

    <!-- Form -->
    <form v-else method="dialog" @submit.prevent="handleSubmit" class="flex gap-6 flex-col">

      <!-- Header -->
      <h2 class="text-2xl flex justify-between items-center gap-4">

        <span>{{ demo.title }}</span>

        <button type="button" onclick="this.closest('dialog').close('close')" aria-label="Close dialog"
          class="bs-btn rounded-full !p-0 flex items-center justify-center h-10 w-10">

          <Icon name="bs-icon:x" size="20" />

        </button>

      </h2>

      <!-- Content -->
      <div class="flex flex-col gap-4">

        <!-- Intro -->
        <div class="bs-body-text mb-3" v-html="demo.content" />

        <!-- Form inputs -->

        <!-- Name -->
        <label class="sr-only" for="name">Name</label>

        <input id="name" v-model="form.name" type="text" required
          class="border-2 rounded-lg bg-bs-surface-0 border-bs-surface-3 form-input px-4 py-3"
          placeholder="Your name" />

        <!-- Company -->
        <label class="sr-only" for="company">Company</label>

        <input id="company" v-model="form.company" type="text"
          class="border-2 rounded-lg bg-bs-surface-0 border-bs-surface-3 form-input px-4 py-3"
          placeholder="Your company" />

        <!-- Email -->
        <label class="sr-only" for="email">Email</label>

        <input id="email" v-model="form.email" type="email" required
          class="border-2 rounded-lg bg-bs-surface-0 border-bs-surface-3 form-input px-4 py-3"
          placeholder="Your email" />

        <!-- Project details -->
        <label class="sr-only" for="project">Tell us about your project</label>

        <textarea id="project" v-model="form.project_details" rows="3"
          class="border-2 rounded-lg bg-bs-surface-0 border-bs-surface-3 form-input px-4 py-3 resize-none"
          placeholder="Tell us about your project"></textarea>

        <!-- Error -->
        <p v-if="error" class="text-sm text-red-400">{{ error }}</p>

        <!-- Submit -->
        <button type="submit" :disabled="submitting" class="bs-btn form-input px-4 py-3 inline-flex items-center justify-center gap-2">
          <Icon v-if="submitting" name="lucide:loader-2" class="w-4 h-4 animate-spin" />
          {{ submitting ? 'Sending...' : demo.cta }}
        </button>

      </div>

    </form>

  </dialog>

</template>

<style>

html:has(dialog[open]) {
  overflow: hidden;
  backdrop-filter: blur(0);
  scrollbar-gutter: stable;
}

dialog[open]::backdrop {
  backdrop-filter: blur(50px);
}

@keyframes scale-up {

  to {
    translate: 0 0;
    scale: 1;
  }

}

@media (prefers-reduced-motion: no-preference) {

  dialog {
    translate: 0 2rem;
    scale: .8
  }

  dialog[open] {
    animation: scale-up forwards 1s;
    animation-timing-function: var(--ease-bs-spring);
  }

}

</style>
