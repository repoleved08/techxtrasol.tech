import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const { name, company, email, project_details } = body || {}

  if (!name || !email) {
    throw createError({ statusCode: 400, message: 'Name and email are required' })
  }

  const config = useRuntimeConfig()

  // Save to database
  const supabase = createClient(
    config.supabase.url || config.public.supabaseUrl,
    config.supabaseServiceKey || config.public.supabaseKey,
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

      await resend.emails.send({
        from: 'TechXtrasol <techxtrasol.design@gmail.com>',
        to: config.notificationEmail || 'biinorman1@gmail.com',
        subject: `New Consultation Request from ${name}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #18181b; border-bottom: 2px solid #6366f1; padding-bottom: 8px;">New Consultation Request</h2>
            <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
              <tr>
                <td style="padding: 8px 0; color: #6b7280; font-weight: 600; width: 120px;">Name</td>
                <td style="padding: 8px 0; color: #111827;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280; font-weight: 600;">Email</td>
                <td style="padding: 8px 0; color: #111827;"><a href="mailto:${email}">${email}</a></td>
              </tr>
              ${company ? `<tr>
                <td style="padding: 8px 0; color: #6b7280; font-weight: 600;">Company</td>
                <td style="padding: 8px 0; color: #111827;">${company}</td>
              </tr>` : ''}
              ${project_details ? `<tr>
                <td style="padding: 8px 0; color: #6b7280; font-weight: 600; vertical-align: top;">Project</td>
                <td style="padding: 8px 0; color: #111827; white-space: pre-wrap;">${project_details}</td>
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
