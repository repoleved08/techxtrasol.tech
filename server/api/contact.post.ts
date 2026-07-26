import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const { name, company, email, project_details } = body || {}

  if (!name || !email) {
    throw createError({ statusCode: 400, message: 'Name and email are required' })
  }

  const config = useRuntimeConfig()
  const supabase = createClient(
    config.supabase.url || config.public.supabaseUrl,
    config.supabaseServiceKey || config.public.supabaseKey,
  )

  const { error } = await supabase
    .from('contact_submissions')
    .insert({
      name: name.trim(),
      company: company?.trim() || null,
      email: email.trim(),
      project_details: project_details?.trim() || null,
    })

  if (error) {
    throw createError({ statusCode: 500, message: 'Failed to save submission' })
  }

  // TODO: Send email notification via Resend/Web3Forms/Gmail SMTP
  // For now, submission is saved to DB and visible in admin panel

  return { success: true, message: 'Thank you! We will get back to you within 24 hours.' }
})
