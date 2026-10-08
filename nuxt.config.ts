// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-10-01',
  devtools: { enabled: false },
  modules: ['@nuxt/fonts'],
  css: ['~/assets/css/main.css'],

  fonts: {
    families: [
      { name: 'Cormorant Garamond', provider: 'google', weights: [400, 500, 600], styles: ['normal', 'italic'] },
      { name: 'Instrument Sans', provider: 'google', weights: [400, 500, 600] },
    ],
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'Crystal Kizor — Architect, Designer, Educator',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Crystal Kizor is an Enugu-based architect and designer building an ecosystem of climate-responsive architecture, African-rooted product design, education and community work.',
        },
        { name: 'theme-color', content: '#F6F1EA' },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'Crystal Kizor — Rooted in place. Designed for people.' },
        {
          property: 'og:description',
          content: 'Architecture, design, education and community — one practice, many forms.',
        },
        { property: 'og:image', content: '/og-image.jpg' },
        { name: 'twitter:card', content: 'summary_large_image' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      ],
    },
  },

  // The landing page is static HTML; only /api/enquiry runs on the server.
  routeRules: {
    '/': { prerender: true },
  },

  nitro: {
    compressPublicAssets: true,
  },

  runtimeConfig: {
    resendApiKey: '', // NUXT_RESEND_API_KEY
    enquiryTo: '', // NUXT_ENQUIRY_TO
    enquiryFrom: 'Crystal Kizor Website <onboarding@resend.dev>', // NUXT_ENQUIRY_FROM
    public: {
      umamiWebsiteId: '', // NUXT_PUBLIC_UMAMI_WEBSITE_ID
      umamiSrc: 'https://cloud.umami.is/script.js', // NUXT_PUBLIC_UMAMI_SRC
    },
  },
})
