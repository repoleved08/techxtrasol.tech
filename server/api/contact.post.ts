import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const { name, company, email, project_details } = body || {}

  if (!name || !email) {
    throw createError({ statusCode: 400, message: 'Name and email are required' })
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw createError({ statusCode: 400, message: 'A valid email is required' })
  }

  if (typeof name !== 'string' || (company && typeof company !== 'string') || (project_details && typeof project_details !== 'string')) {
    throw createError({ statusCode: 400, message: 'Invalid submission data' })
  }

  const config = useRuntimeConfig()

  if (!config.supabaseServiceKey) {
    throw createError({ statusCode: 500, message: 'Service key not configured' })
  }

  // Save to database
  const supabase = createClient(
    config.public.supabase.url,
    config.supabaseServiceKey,
  )

  const { error: dbError } = await supabase
    .from('contact_submissions')
    .insert({
      name: name.trim(),
      company: company?.trim() || null,
      email: email.trim(),
      project_details: project_details?.trim() || null,
    })

  if (dbError) {
    throw createError({ statusCode: 500, message: 'Failed to save submission' })
  }

  // Send email notification via Resend
  if (config.resendApiKey) {
    try {
      const resend = new Resend(config.resendApiKey)

      const safeName = escapeHtml(name.trim())
      const safeEmail = escapeHtml(email.trim())
      const safeCompany = company ? escapeHtml(company.trim()) : ''
      const safeDetails = project_details ? escapeHtml(project_details.trim()) : ''

      await resend.emails.send({
        from: 'TechXtrasol <techxtrasol.design@gmail.com>',
        to: config.notificationEmail,
        subject: `New Consultation Request from ${safeName}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #18181b; border-bottom: 2px solid #6366f1; padding-bottom: 8px;">New Consultation Request</h2>
            <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
              <tr>
                <td style="padding: 8px 0; color: #6b7280; font-weight: 600; width: 120px;">Name</td>
                <td style="padding: 8px 0; color: #111827;">${safeName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280; font-weight: 600;">Email</td>
                <td style="padding: 8px 0; color: #111827;"><a href="mailto:${safeEmail}">${safeEmail}</a></td>
              </tr>
              ${safeCompany ? `<tr>
                <td style="padding: 8px 0; color: #6b7280; font-weight: 600;">Company</td>
                <td style="padding: 8px 0; color: #111827;">${safeCompany}</td>
              </tr>` : ''}
              ${safeDetails ? `<tr>
                <td style="padding: 8px 0; color: #6b7280; font-weight: 600; vertical-align: top;">Project</td>
                <td style="padding: 8px 0; color: #111827; white-space: pre-wrap;">${safeDetails}</td>
              </tr>` : ''}
            </table>
            <p style="margin-top: 24px; color: #6b7280; font-size: 13px;">Submitted via TechXtrasol consultation form</p>
          </div>
        `,
      })
    }
    catch (emailError) {
      // Don't fail the request if email fails — submission is already saved
      console.error('Email send failed:', emailError)
    }
  }

  return { success: true, message: 'Thank you! We will get back to you within 24 hours.' }
})
