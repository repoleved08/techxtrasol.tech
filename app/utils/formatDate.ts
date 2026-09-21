export function formatDate(dateValue: string | null | undefined, opts: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }): string {
  if (!dateValue) return ''
  const iso = /^\d{4}-\d{2}-\d{2}$/.test(dateValue) ? `${dateValue}T00:00:00Z` : dateValue
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return dateValue
  return new Intl.DateTimeFormat('en-US', { timeZone: 'UTC', ...opts }).format(d)
}