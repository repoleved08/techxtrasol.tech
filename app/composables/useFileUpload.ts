import { createClient } from '@supabase/supabase-js'

const BUCKET = 'techxtrasol'

export function useFileUpload() {
  const supabase = useSupabase()

  const uploading = ref(false)
  const progress = ref(0)
  const error = ref('')

  async function uploadFile(file: File, folder = 'uploads'): Promise<string | null> {
    uploading.value = true
    progress.value = 0
    error.value = ''

    try {
      const ext = file.name.split('.').pop() || 'jpg'
      const name = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`

      const { data, error: uploadError } = await supabase.storage
        .from(BUCKET)
        .upload(name, file, {
          cacheControl: '31536000',
          upsert: false,
        })

      if (uploadError) throw uploadError

      const { data: urlData } = supabase.storage
        .from(BUCKET)
        .getPublicUrl(data.path)

      progress.value = 100
      return urlData.publicUrl
    }
    catch (e: any) {
      error.value = e.message || 'Upload failed'
      return null
    }
    finally {
      uploading.value = false
    }
  }

  async function deleteFile(path: string): Promise<boolean> {
    try {
      // Extract path after bucket URL
      const url = new URL(path)
      const parts = url.pathname.split('/')
      const bucketIndex = parts.indexOf(BUCKET)
      if (bucketIndex === -1) return false
      const filePath = parts.slice(bucketIndex + 1).join('/')

      const { error: delError } = await supabase.storage
        .from(BUCKET)
        .remove([filePath])

      return !delError
    }
    catch {
      return false
    }
  }

  return { uploadFile, deleteFile, uploading, progress, error }
}
