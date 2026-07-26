<script setup>
const props = defineProps({
  modelValue: { type: String, default: '' },
  label: { type: String, default: 'Image' },
  folder: { type: String, default: 'uploads' },
  accept: { type: String, default: 'image/*' },
})

const emit = defineEmits(['update:modelValue'])

const { uploadFile, uploading, error } = useFileUpload()

const fileInput = ref(null)
const dragOver = ref(false)
const preview = computed(() => props.modelValue)

function openPicker() {
  if (!uploading.value) fileInput.value?.click()
}

function onDrop(e) {
  dragOver.value = false
  const file = e.dataTransfer?.files?.[0]
  if (file) handleFile(file)
}

function onFileChange(e) {
  const file = e.target?.files?.[0]
  if (file) handleFile(file)
}

async function handleFile(file) {
  if (!file.type.startsWith('image/')) return
  const url = await uploadFile(file, props.folder)
  if (url) emit('update:modelValue', url)
}

function clearImage() {
  emit('update:modelValue', '')
}
</script>

<template>
  <div>
    <label class="block text-sm font-medium text-bs-foreground-dark mb-1.5">{{ label }}</label>

    <!-- Preview -->
    <div v-if="preview" class="relative group rounded-xl overflow-hidden border border-bs-surface-3/50 bg-bs-surface-0">
      <img :src="preview" :alt="label" class="w-full h-48 object-cover" />
      <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
        <button type="button" @click="openPicker"
          class="px-4 py-2 rounded-lg bg-bs-surface-1 text-bs-foreground-light text-sm font-medium hover:bg-bs-surface-3 transition-colors">
          Replace
        </button>
        <button type="button" @click="clearImage"
          class="px-4 py-2 rounded-lg bg-red-500/20 text-red-400 text-sm font-medium hover:bg-red-500/30 transition-colors">
          Remove
        </button>
      </div>
      <div v-if="uploading" class="absolute inset-0 bg-black/60 flex items-center justify-center">
        <div class="flex items-center gap-3 text-sm text-bs-foreground-light">
          <div class="w-5 h-5 border-2 border-bs-accent border-t-transparent rounded-full animate-spin" />
          Uploading...
        </div>
      </div>
    </div>

    <!-- Drop zone -->
    <div v-else
      @click="openPicker"
      @dragover.prevent="dragOver = true"
      @dragleave="dragOver = false"
      @drop.prevent="onDrop"
      class="relative flex flex-col items-center justify-center h-40 rounded-xl border-2 border-dashed cursor-pointer transition-all"
      :class="dragOver ? 'border-bs-accent bg-bs-accent/5' : 'border-bs-surface-3/50 hover:border-bs-surface-3 bg-bs-surface-0'">

      <div v-if="uploading" class="flex flex-col items-center gap-2">
        <div class="w-8 h-8 border-2 border-bs-accent border-t-transparent rounded-full animate-spin" />
        <span class="text-sm text-bs-foreground-dark">Uploading...</span>
      </div>

      <div v-else class="flex flex-col items-center gap-2 text-bs-foreground-dark">
        <svg class="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span class="text-sm font-medium">Click or drag to upload</span>
        <span class="text-xs text-bs-foreground-dark/60">PNG, JPG, WebP up to 10MB</span>
      </div>

      <input ref="fileInput" type="file" :accept="accept" class="hidden" @change="onFileChange" />
    </div>

    <!-- Error -->
    <p v-if="error" class="mt-1.5 text-xs text-red-400">{{ error }}</p>

    <!-- URL fallback -->
    <div class="mt-2">
      <input :value="modelValue" @input="emit('update:modelValue', $event.target.value)"
        placeholder="Or paste an image URL..."
        class="w-full px-4 py-2 rounded-lg bg-bs-surface-0 border border-bs-surface-3/50 text-bs-foreground-light text-xs focus:outline-none focus:border-bs-accent transition-colors" />
    </div>
  </div>
</template>
