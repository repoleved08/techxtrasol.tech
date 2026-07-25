import type { AdminUser } from '~/types'

export function useAdmin() {
  const supabase = useSupabase()
  const { user, loggedIn } = useAuth()

  const isAdmin = ref(false)
  const adminUser = ref<AdminUser | null>(null)
  const loading = ref(false)

  async function checkAdminStatus() {
    if (!loggedIn.value || !user.value?.sub) {
      isAdmin.value = false
      adminUser.value = null
      return false
    }

    loading.value = true
    try {
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('kinde_id', user.value.sub)
        .single()

      if (error || !data) {
        isAdmin.value = false
        adminUser.value = null
        return false
      }

      isAdmin.value = true
      adminUser.value = data as AdminUser
      return true
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

  return {
    isAdmin: readonly(isAdmin),
    adminUser: readonly(adminUser),
    loading: readonly(loading),
    checkAdminStatus,
  }
}
