import { createError, defineEventHandler, readBody } from 'h3'

const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const body = await readBody(event)
  const urls: string[] = Array.isArray(body?.urls) ? body.urls : []

  if (!urls.length) {
    throw createError({ statusCode: 400, message: 'A non-empty `urls` array is required' })
  }

  const sanitized = [...new Set(urls)]
    .filter(u => typeof u === 'string' && /^https:\/\/techxtrasol\.tech\//.test(u))
    .slice(0, 10000)

  if (!sanitized.length) {
    throw createError({ statusCode: 422, message: 'No valid techxtrasol.tech URLs provided' })
  }

  const payload = {
    host: 'techxtrasol.tech',
    key: config.indexnowKey,
    keyLocation: `https://techxtrasol.tech/${config.indexnowKey}.txt`,
    urlList: sanitized,
  }

  const res = await fetch(INDEXNOW_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    throw createError({
      statusCode: 502,
      message: `IndexNow submission failed with status ${res.status}`,
    })
  }

  return { success: true, submitted: sanitized.length }
})
