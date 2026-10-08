// Umami: cookieless, GDPR-friendly, ~2KB. Loaded only when a website id is configured.
export default defineNuxtPlugin(() => {
  const { umamiWebsiteId, umamiSrc } = useRuntimeConfig().public
  if (!umamiWebsiteId) return

  useHead({
    script: [{ src: umamiSrc, defer: true, 'data-website-id': umamiWebsiteId }],
  })
})
