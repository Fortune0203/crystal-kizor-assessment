<script setup lang="ts">
useSeoMeta({
  title: 'Crystal Kizor — Architect, Designer, Educator',
  ogTitle: 'Crystal Kizor — Rooted in place. Designed for people.',
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Crystal Kizor',
        jobTitle: 'Architect and Designer',
        worksFor: { '@type': 'Organization', name: 'Studio COKA', url: 'https://studiocoka.com' },
        address: { '@type': 'PostalAddress', addressLocality: 'Enugu', addressCountry: 'NG' },
        sameAs: [
          'https://www.instagram.com/crystalkizor',
          'https://www.youtube.com/@crystalkizor',
          'https://www.linkedin.com/in/crystal-kizor',
          'https://x.com/crystal_kizor',
        ],
      }),
    },
  ],
})
</script>

<template>
  <div>
    <a href="#main" class="skip-link">Skip to content</a>
    <SiteHeader />
    <main id="main">
      <HeroSection />
      <AboutSection />
      <EcosystemSection />
      <WorkSection />
      <IdeasSection />
      <ImpactSection />
      <EnquirySection />
    </main>
    <SiteFooter />
  </div>
</template>
