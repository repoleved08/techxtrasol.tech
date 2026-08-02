export function useIndexNow() {
  async function notify(urls: string[]) {
    try {
      await $fetch('/api/indexnow', {
        method: 'POST',
        body: { urls },
      })
    }
    catch {
      console.error('IndexNow notification failed')
    }
  }

  return { notify }
}
