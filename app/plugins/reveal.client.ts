// Fades elements marked with [data-reveal] in as they enter the viewport.
// Content is fully visible without JS; the `js-reveal` class opts in to the effect.
export default defineNuxtPlugin((nuxtApp) => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  if (!('IntersectionObserver' in window)) return

  document.documentElement.classList.add('js-reveal')

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  )

  nuxtApp.hook('app:mounted', () => {
    document.querySelectorAll('[data-reveal]').forEach((el) => observer.observe(el))
  })
})
