<script setup>
definePageMeta({ middleware: 'auth-admin', layout: 'admin' })

const users = ref([])
const loading = ref(true)
const actionLoading = ref(null)

onMounted(async () => {
  await fetchUsers()
})

async function fetchUsers() {
  loading.value = true
  try {
    users.value = await $fetch('/api/admin/users')
  }
  catch (e) {
    console.error('Failed to fetch users:', e)
  }
  finally {
    loading.value = false
  }
}

async function toggleAdmin(user) {
  actionLoading.value = user.id
  try {
    if (user.is_admin) {
      await $fetch('/api/admin/users', {
        method: 'POST',
        body: { auth_id: user.id, action: 'remove_admin' },
      })
    }
    else {
      await $fetch('/api/admin/users', {
        method: 'POST',
        body: { auth_id: user.id, action: 'make_admin' },
      })
    }
    await fetchUsers()
  }
  catch (e) {
    alert(e.data?.message || 'Action failed')
  }
  finally {
    actionLoading.value = null
  }
}

function formatDate(d) {
  if (!d) return '—'
  return new Date(d).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' })
}
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold text-bs-foreground-light">Users</h1>
        <p class="text-sm text-bs-foreground-dark mt-1">Manage admin access for authenticated users</p>
      </div>
    </div>

    <div v-if="loading" class="flex items-center justify-center py-20">
      <div class="w-8 h-8 border-2 border-bs-accent border-t-transparent rounded-full animate-spin" />
    </div>

    <div v-else-if="users.length === 0" class="text-center py-20 bg-bs-surface-1 border border-bs-surface-3/50 rounded-xl">
      <Icon name="lucide:users" class="w-16 h-16 text-bs-surface-3 mx-auto mb-4" />
      <p class="text-bs-foreground-dark">No users found.</p>
    </div>

    <div v-else class="bg-bs-surface-1 border border-bs-surface-3/50 rounded-xl overflow-hidden">
      <table class="w-full text-left">
        <thead>
          <tr class="border-b border-bs-surface-3/50">
            <th class="px-5 py-3 text-xs font-semibold text-bs-foreground-dark uppercase tracking-wider">User</th>
            <th class="px-5 py-3 text-xs font-semibold text-bs-foreground-dark uppercase tracking-wider hidden md:table-cell">Joined</th>
            <th class="px-5 py-3 text-xs font-semibold text-bs-foreground-dark uppercase tracking-wider hidden md:table-cell">Last Sign In</th>
            <th class="px-5 py-3 text-xs font-semibold text-bs-foreground-dark uppercase tracking-wider">Role</th>
            <th class="px-5 py-3 text-xs font-semibold text-bs-foreground-dark uppercase tracking-wider text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id" class="border-b border-bs-surface-3/30 hover:bg-bs-surface-2/50 transition-colors">
            <td class="px-5 py-4">
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-full bg-bs-accent/20 border-2 border-bs-accent/30 flex items-center justify-center text-bs-accent font-bold text-sm shrink-0">
                  {{ (user.name || user.email || '?').charAt(0).toUpperCase() }}
                </div>
                <div class="min-w-0">
                  <p class="text-sm font-medium text-bs-foreground-light truncate">{{ user.name || 'Unnamed' }}</p>
                  <p class="text-xs text-bs-foreground-dark truncate">{{ user.email }}</p>
                </div>
              </div>
            </td>
            <td class="px-5 py-4 hidden md:table-cell">
              <span class="text-xs text-bs-foreground-dark">{{ formatDate(user.created_at) }}</span>
            </td>
            <td class="px-5 py-4 hidden md:table-cell">
              <span class="text-xs text-bs-foreground-dark">{{ formatDate(user.last_sign_in) }}</span>
            </td>
            <td class="px-5 py-4">
              <span v-if="user.is_admin"
                class="text-xs px-2 py-0.5 rounded-full bg-bs-accent/10 text-bs-accent font-medium">
                Admin
              </span>
              <span v-else
                class="text-xs px-2 py-0.5 rounded-full bg-bs-surface-3/50 text-bs-foreground-dark">
                User
              </span>
            </td>
            <td class="px-5 py-4 text-right">
              <button
                @click="toggleAdmin(user)"
                :disabled="actionLoading === user.id"
                class="text-xs px-3 py-1.5 rounded-lg font-medium transition-all"
                :class="user.is_admin
                  ? 'bg-red-400/10 text-red-400 hover:bg-red-400/20'
                  : 'bg-green-400/10 text-green-400 hover:bg-green-400/20'"
              >
                <Icon v-if="actionLoading === user.id" name="lucide:loader-2" class="w-3 h-3 animate-spin inline mr-1" />
                {{ user.is_admin ? 'Remove Admin' : 'Make Admin' }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
