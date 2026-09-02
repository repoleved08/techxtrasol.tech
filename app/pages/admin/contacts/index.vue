<script setup>
definePageMeta({ middleware: 'auth-admin', layout: 'admin' })

const supabase = useSupabase()

const submissions = ref([])
const loading = ref(true)
const selectedSubmission = ref(null)

onMounted(async () => {
  try {
    const { data } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false })

    submissions.value = data || []
  }
  finally {
    loading.value = false
  }
})

async function updateStatus(id, status) {
  await supabase.from('contact_submissions').update({ status }).eq('id', id)
  const sub = submissions.value.find(s => s.id === id)
  if (sub) sub.status = status
}

async function deleteSubmission(id) {
  if (!confirm('Delete this submission?')) return
  await supabase.from('contact_submissions').delete().eq('id', id)
  submissions.value = submissions.value.filter(s => s.id !== id)
  if (selectedSubmission.value?.id === id) selectedSubmission.value = null
}

function viewSubmission(sub) {
  selectedSubmission.value = sub
  if (sub.status === 'new') updateStatus(sub.id, 'viewed')
}

function formatDate(d) {
  return new Date(d).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

const statusColors = {
  new: 'bg-blue-400/10 text-blue-400',
  viewed: 'bg-bs-surface-3/50 text-bs-foreground-dark',
  contacted: 'bg-green-400/10 text-green-400',
  archived: 'bg-bs-surface-3/30 text-bs-foreground-dark/50',
}
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold text-bs-foreground-light">Contact Submissions</h1>
        <p class="text-sm text-bs-foreground-dark mt-1">Consultation requests from the website</p>
      </div>
    </div>

    <div v-if="loading" class="flex items-center justify-center py-20">
      <div class="w-8 h-8 border-2 border-bs-accent border-t-transparent rounded-full animate-spin" />
    </div>

    <div v-else-if="submissions.length === 0" class="text-center py-20 bg-bs-surface-1 border border-bs-surface-3/50 rounded-xl">
      <Icon name="lucide:mail" class="w-16 h-16 text-bs-surface-3 mx-auto mb-4" />
      <p class="text-bs-foreground-dark">No submissions yet.</p>
    </div>

    <div v-else class="flex gap-6">
      <!-- List -->
      <div class="flex-1 space-y-2">
        <div v-for="sub in submissions" :key="sub.id"
          @click="viewSubmission(sub)"
          class="p-4 rounded-xl border cursor-pointer transition-colors transition-transform transition-opacity"
          :class="selectedSubmission?.id === sub.id
            ? 'bg-bs-surface-1 border-bs-accent/40'
            : 'bg-bs-surface-1 border-bs-surface-3/50 hover:border-bs-surface-3'">
          <div class="flex items-center justify-between mb-1">
            <h3 class="text-sm font-semibold text-bs-foreground-light">{{ sub.name }}</h3>
            <span class="text-[10px] px-2 py-0.5 rounded-full" :class="statusColors[sub.status] || statusColors.new">{{ sub.status }}</span>
          </div>
          <p class="text-xs text-bs-foreground-dark">{{ sub.email }}</p>
          <p v-if="sub.company" class="text-xs text-bs-foreground-dark/60 mt-0.5">{{ sub.company }}</p>
          <p class="text-xs text-bs-foreground-dark/40 mt-1">{{ formatDate(sub.created_at) }}</p>
        </div>
      </div>

      <!-- Detail -->
      <div v-if="selectedSubmission" class="w-full max-w-md bg-bs-surface-1 border border-bs-surface-3/50 rounded-xl p-6 sticky top-24 self-start">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-bold text-bs-foreground-light">{{ selectedSubmission.name }}</h2>
          <button @click="selectedSubmission = null" class="p-1 rounded-lg text-bs-foreground-dark hover:text-bs-foreground-light hover:bg-bs-surface-3/50">
            <Icon name="lucide:x" class="w-4 h-4" />
          </button>
        </div>

        <div class="space-y-3 text-sm">
          <div>
            <span class="text-bs-foreground-dark text-xs">Email</span>
            <p class="text-bs-foreground-light">{{ selectedSubmission.email }}</p>
          </div>
          <div v-if="selectedSubmission.company">
            <span class="text-bs-foreground-dark text-xs">Company</span>
            <p class="text-bs-foreground-light">{{ selectedSubmission.company }}</p>
          </div>
          <div>
            <span class="text-bs-foreground-dark text-xs">Submitted</span>
            <p class="text-bs-foreground-light">{{ formatDate(selectedSubmission.created_at) }}</p>
          </div>
          <div v-if="selectedSubmission.project_details">
            <span class="text-bs-foreground-dark text-xs">Project Details</span>
            <p class="text-bs-foreground-light whitespace-pre-wrap mt-1">{{ selectedSubmission.project_details }}</p>
          </div>
        </div>

        <!-- Status actions -->
        <div class="flex flex-wrap gap-2 mt-6 pt-4 border-t border-bs-surface-3/50">
          <button v-if="selectedSubmission.status !== 'contacted'"
            @click="updateStatus(selectedSubmission.id, 'contacted')"
            class="text-xs px-3 py-1.5 rounded-lg bg-green-400/10 text-green-400 hover:bg-green-400/20 transition-colors">
            Mark Contacted
          </button>
          <button v-if="selectedSubmission.status !== 'archived'"
            @click="updateStatus(selectedSubmission.id, 'archived')"
            class="text-xs px-3 py-1.5 rounded-lg bg-bs-surface-3/50 text-bs-foreground-dark hover:text-bs-foreground-light transition-colors">
            Archive
          </button>
          <button @click="deleteSubmission(selectedSubmission.id)"
            class="text-xs px-3 py-1.5 rounded-lg bg-red-400/10 text-red-400 hover:bg-red-400/20 transition-colors">
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
