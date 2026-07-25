export default defineNuxtRouteMiddleware(async (to) => {
  const { loggedIn } = useAuth()

  if (!loggedIn.value) {
    return navigateTo('/api/login')
  }

  const { isAdmin, checkAdminStatus, setupAdmin } = useAdmin()
  let authorized = await checkAdminStatus()

  // Auto-approve first user as admin
  if (!authorized) {
    await setupAdmin()
    authorized = true
  }

  if (!authorized) {
    return navigateTo('/')
  }
})
