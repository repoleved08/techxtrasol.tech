import type { AdminUser } from '~/types'

export function useAdmin() {
  const isAdmin = ref(false)
  const adminUser = ref<AdminUser | null>(null)
  const loading = ref(false)

  async function checkAdminStatus() {
    loading.value = true
    try {
      const data = await $fetch('/api/admin/me')
      isAdmin.value = data.isAdmin
      adminUser.value = data.user as AdminUser | null
      return data.isAdmin
    }
    catch {
      isAdmin.value = false
      adminUser.value = null
      return false
    }
    finally {
      loading.value = false
    }
  }

  async function setupAdmin() {
    loading.value = true
    try {
      const data = await $fetch('/api/admin/setup', { method: 'POST' })
      isAdmin.value = true
      adminUser.value = data.user as AdminUser
      return data
    }
    finally {
      loading.value = false
    }
  }

  return {
    isAdmin: readonly(isAdmin),
    adminUser: readonly(adminUser),
    loading: readonly(loading),
    checkAdminStatus,
    setupAdmin,
  }
}
