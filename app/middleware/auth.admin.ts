export default defineNuxtRouteMiddleware(async (to) => {
  const { loggedIn } = useAuth()

  if (!loggedIn.value) {
    return navigateTo('/api/login')
  }

  const { isAdmin, checkAdminStatus } = useAdmin()
  const isAuthorized = await checkAdminStatus()

  if (!isAuthorized) {
    return navigateTo('/')
  }
})
