import { intents } from '~~/app/data/ecosystem'

// Naive per-instance rate limit. Good enough to blunt bursts from one client on a
// low-traffic site; a shared store (KV/Redis) would be the next step at scale.
const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 5
const hits = new Map<string, number[]>()

function rateLimited(ip: string) {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  return recent.length > MAX_PER_WINDOW
}

const clean = (value: unknown, max: number) => (typeof value === 'string' ? value.trim().slice(0, max) : '')

export default defineEventHandler(async (event) => {
  const body = await readBody<Record<string, unknown>>(event)

  // Bots fill every field; quietly accept and drop.
  if (clean(body?.website, 200)) return { ok: true }

  const ip = getRequestIP(event, { xForwardedFor: true }) ?? 'unknown'
  if (rateLimited(ip)) {
    throw createError({ statusCode: 429, message: 'Too many messages in a short time. Please try again later.' })
  }

  const intent = intents.find((i) => i.id === body?.intent)
  const name = clean(body?.name, 120)
  const email = clean(body?.email, 200)
  const organisation = clean(body?.organisation, 200)
  const message = clean(body?.message, 5000)

  if (!intent || name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || message.length < 10) {
    throw createError({ statusCode: 422, message: 'Please check the form and try again.' })
  }

  const { resendApiKey, enquiryTo, enquiryFrom } = useRuntimeConfig(event)
  const subject = `[${intent.brand}] New enquiry from ${name}`
  const details = [
    `Topic: ${intent.label} (${intent.brand})`,
    `Name: ${name}`,
    `Email: ${email}`,
    organisation ? `Organisation: ${organisation}` : null,
  ].filter(Boolean)
  const text = `${details.join("\n")}\n\n${message}`

  if (!resendApiKey || !enquiryTo) {
    if (import.meta.dev) {
      console.info('\n[enquiry] Email not configured — logging instead:\n' + subject + '\n' + text + '\n')
      return { ok: true }
    }
    console.error('[enquiry] NUXT_RESEND_API_KEY / NUXT_ENQUIRY_TO are not set')
    throw createError({
      statusCode: 503,
      message: 'Our enquiry form is temporarily unavailable. Please email contact@studiocoka.com instead.',
    })
  }

  try {
    await $fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${resendApiKey}` },
      body: { from: enquiryFrom, to: enquiryTo.split(','), reply_to: email, subject, text },
    })
  } catch (error) {
    console.error('[enquiry] Resend failed', error)
    throw createError({
      statusCode: 502,
      message: 'We could not send your message just now. Please try again, or email contact@studiocoka.com.',
    })
  }

  return { ok: true }
})
