// Single source of truth for the brand ecosystem and the enquiry routes.
// Facts marked in comments come from public sources (checked Oct 2026);
// everything else comes from the assessment brief.

export type IntentId = 'project' | 'furniture' | 'learn' | 'speaking' | 'education' | 'youth' | 'press'

export interface Intent {
  id: IntentId
  /** Visitor-facing goal, written in their words */
  goal: string
  /** Where that goal leads in the ecosystem */
  brand: string
  /** Form label for the enquiry type */
  label: string
  /** Contextual placeholder for the message box */
  placeholder: string
}

export const intents: Intent[] = [
  {
    id: 'project',
    goal: 'Design or build a space',
    brand: 'Studio COKA',
    label: 'A building or interior project',
    placeholder: 'Tell us about the site, the type of project, rough budget and timeline…',
  },
  {
    id: 'furniture',
    goal: 'Furnish a space',
    brand: 'ELEvated',
    label: 'Furniture & products',
    placeholder: 'What are you looking for — a piece, a collection, or a custom commission?',
  },
  {
    id: 'learn',
    goal: 'Grow as an architect',
    brand: 'The Effective Architect',
    label: 'The Effective Architect',
    placeholder: 'Where are you in your career, and what would help you most right now?',
  },
  {
    id: 'speaking',
    goal: 'Invite Crystal to speak',
    brand: 'Speaking',
    label: 'A speaking invitation',
    placeholder: 'Event name, date, location, audience size and the topic you have in mind…',
  },
  {
    id: 'education',
    goal: 'Put a child back in school',
    brand: 'AKO Alliance',
    label: 'Supporting AKO Alliance',
    placeholder: 'Are you looking to sponsor, partner, or volunteer?',
  },
  {
    id: 'youth',
    goal: 'Find purpose & community',
    brand: 'Alive and Free',
    label: 'Alive and Free',
    placeholder: 'Tell us a little about yourself, or how you would like to get involved…',
  },
  {
    id: 'press',
    goal: 'Collaborate or interview',
    brand: 'Crystal Kizor',
    label: 'Press, research or collaboration',
    placeholder: 'Who you are, what you are working on, and how Crystal could be involved…',
  },
]

export interface Brand {
  name: string
  kind: string
  description: string
  audience: string
  intent: IntentId
  cta: string
  /** External link, when the brand has a live public home */
  href?: string
  flagship?: boolean
}

export interface Pillar {
  id: string
  index: string
  title: string
  verb: string
  summary: string
  accent: string
  brands: Brand[]
}

export const pillars: Pillar[] = [
  {
    id: 'design',
    index: '01',
    title: 'Design & Build',
    verb: 'Shaping spaces and objects',
    summary: 'Where the ideas become physical — buildings, interiors and the things we live with.',
    accent: 'var(--clay)',
    brands: [
      {
        name: 'Studio COKA',
        kind: 'Architecture · Interiors · Construction',
        description:
          'A climate-responsive design-and-build studio in Enugu, designing homes, hospitals and civic spaces that stay cool, use less energy and belong to their place.',
        audience: 'For homeowners, developers and institutions',
        intent: 'project',
        cta: 'Start a project',
        href: 'https://studiocoka.com',
        flagship: true,
      },
      {
        name: 'ELEvated',
        kind: 'Furniture & Product Design',
        description:
          'Contemporary furniture and objects that are functional, well made and rooted in African context, materials and ideas.',
        audience: 'For homes, hospitality and workspaces',
        intent: 'furniture',
        cta: 'Enquire about pieces',
      },
    ],
  },
  {
    id: 'knowledge',
    index: '02',
    title: 'Knowledge & Voice',
    verb: 'Sharing what she learns',
    summary: 'Teaching, research and conversation — so that better practice spreads beyond one studio.',
    accent: 'var(--ink)',
    brands: [
      {
        name: 'The Effective Architect',
        kind: 'Education & Media',
        description:
          'A learning and media platform helping architects and built-environment professionals grow their skills, practices and careers.',
        audience: 'For architects, students and young practices',
        intent: 'learn',
        cta: 'Join the community',
      },
      {
        name: 'Speaking',
        kind: 'Talks & Conversations',
        description:
          'Keynotes, panels and workshops on climate-responsive design, African cities, entrepreneurship and the built environment.',
        audience: 'For conferences, universities and organisations',
        intent: 'speaking',
        cta: 'Invite Crystal',
      },
      {
        name: 'Research & Writing',
        kind: 'Crystal Kizor',
        description:
          'Essays, films and research on indigenous architecture, identity and building better — published under Crystal’s own name.',
        audience: 'For readers, researchers and the curious',
        intent: 'press',
        cta: 'Watch on YouTube',
        href: 'https://www.youtube.com/@crystalkizor',
      },
    ],
  },
  {
    id: 'purpose',
    index: '03',
    title: 'Purpose & Community',
    verb: 'Investing in people',
    summary: 'Because the future of African cities depends on the young people who will inherit them.',
    accent: 'var(--ochre)',
    brands: [
      {
        name: 'AKO Alliance',
        kind: 'Education Access',
        description:
          'Returning out-of-school children to the classroom by sponsoring tuition, books and uniforms — tracked transparently, child by child.',
        audience: 'For sponsors, partners and volunteers',
        intent: 'education',
        cta: 'Sponsor a child',
        href: 'https://akoalliance.com',
      },
      {
        name: 'Alive and Free',
        kind: 'Christian Youth Movement',
        description:
          'A movement helping young people walk in truth, healing, freedom, identity and purpose — life in Christ, lived out loud.',
        audience: 'For young people, parents and churches',
        intent: 'youth',
        cta: 'Get involved',
      },
    ],
  },
]

export const socials = [
  { name: 'Instagram', href: 'https://www.instagram.com/crystalkizor' },
  { name: 'YouTube', href: 'https://www.youtube.com/@crystalkizor' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/crystal-kizor' },
  { name: 'X', href: 'https://x.com/crystal_kizor' },
]
