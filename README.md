# Crystal Kizor — Landing Page

> **Assessment Submission — Evaluation Only**
>
> This repository has been shared solely for assessment and recruitment evaluation. The source code is not licensed for commercial, production, redistribution or derivative use without prior written permission. See [LICENSE](LICENSE).

A single-page personal brand site for Crystal Kizor: architect, designer, educator and founder. It is built with **Nuxt 4**.

- **Live:** _add deployed URL_

## Stack

| Concern | Choice | Why |
| --- | --- | --- |
| Framework | Nuxt 4 (Vue 3) | Homepage is prerendered to static HTML. The only server code is the enquiry endpoint. |
| Styling | Scoped CSS + design tokens (`app/assets/css/main.css`) | No framework overhead, and a palette drawn from the brands' own sites. |
| Fonts | `@nuxt/fonts` (Cormorant Garamond + Instrument Sans) | Self-hosted, preloaded, no third-party requests. |
| Images | `scripts/optimize-images.mjs` (sharp) → AVIF/WebP at 4 widths | Responsive `srcset`, intrinsic sizes for zero layout shift. |
| Enquiries | `server/api/enquiry.post.ts` → Resend | Validation, honeypot, rate limit, topic-aware subject lines. |
| Analytics | Umami (optional) | Cookieless, ~2KB, tracks the enquiry funnel with custom events. |

## Structure

```
app/
  data/ecosystem.ts      # brands, pillars, enquiry intents (single source of truth)
  components/            # one component per page section
  composables/           # useEnquiry (shared form intent), useTrack (analytics)
  plugins/               # analytics loader, scroll-reveal
server/api/enquiry.post.ts
scripts/optimize-images.mjs
```

## Assets

The photographs and logos were supplied privately for this assessment, so they are **not included in this repository**. To run the site with them, point the asset script at the original asset pack (the folder containing `Crystal_s pictures` and `Other assets`):

```bash
ASSETS_DIR="/path/to/asset-pack" npm run images
```

This creates responsive AVIF/WebP images, cuts the logo marks from the logo sheet, and creates the favicons and the social share image.

## Develop

```bash
npm install
npm run images   # with ASSETS_DIR set, see above
npm run dev
```

Without email credentials, enquiries are logged to the terminal in dev.

## Deploy

Because the assets are not in git, deploy from a machine that has them, using the Vercel CLI's prebuilt flow:

```bash
npx vercel link
npx vercel env add NUXT_RESEND_API_KEY
npx vercel build --prod
npx vercel deploy --prebuilt --prod
```

Environment variables (see `.env.example`):
- `NUXT_RESEND_API_KEY`: from resend.com
- `NUXT_ENQUIRY_TO`: the inbox that receives enquiries (comma-separate for several)
- `NUXT_ENQUIRY_FROM`: a sender on a Resend-verified domain (`onboarding@resend.dev` for testing)
- `NUXT_PUBLIC_UMAMI_WEBSITE_ID`: optional, enables analytics

## Tracked events

`enquiry-intent` (which CTA set which topic), `enquiry-started`, `enquiry-submitted`, `enquiry-failed`, plus `data-umami-event` click events on header and hero CTAs and on every outbound brand and social link.
