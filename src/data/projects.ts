import { SOUND } from '../lib/sound'
import { printivoCaseStudy, printivoStats } from './printivoCaseStudy'

export interface CaseStudySection {
  /** Small label above the section heading, e.g. "The Problem" */
  kicker: string
  heading: string
  body: string[]
  bullets?: string[]
  image?: { src: string; alt: string; caption?: string }
}

export interface CaseStudyStats {
  beforeLabel: string
  afterLabel: string
  before: string[]
  after: string[]
}

export interface Project {
  name: string
  slug: string
  /** snd-lib sound key played on hover — one distinct sound per project */
  hoverSound: string
  /** External live-project link shown on the case-study page, when one exists. */
  liveUrl?: string
  /** 500×700 preview shown on hover. Placeholders for now — replace with real project imagery. */
  image: string
  /** Wide hero used at the top of the project page. Placeholder — replace with real imagery. */
  imageWide: string
  /** Short discipline/category line shown in the project-page header. Placeholder copy. */
  category: string
  /** Role credit shown in the project-page header. Falls back to "Design & Direction". */
  role?: string
  /** Intro paragraphs for the project page, sourced from the portfolio presentation. */
  intro?: string[]
  /** Full case-study sections rendered below the opener. */
  sections?: CaseStudySection[]
  /** Before/after results block rendered after the sections. */
  stats?: CaseStudyStats
}

export const PROJECTS: Project[] = [
  {
    name: 'Printivo',
    slug: 'printivo',
    hoverSound: SOUND.TAP,
    liveUrl: 'https://printivo.com',
    image: '/images/projects/printivo.svg',
    imageWide: '/images/projects/printivo-wide.svg',
    category: 'E-commerce · Web-to-Print',
    role: 'Lead Product Designer',
    intro: [
      'Printivo.com is Nigeria’s first web-to-print platform, launched in 2013 to give individuals and small businesses easy access to quality prints for stationery and merchandise — serving over 10,000 customers. When bounce rates climbed to 89.3% and customer feedback turned to complaints, I led a full redesign of the digital experience.',
      'Fourteen customer interviews, internal research across marketing, support and tech, and a UX audit shaped a rebuilt homepage, search, product and checkout flow, plus a component design system. After launch, average monthly users grew 580%, new users 160%, and the bounce rate fell to 10.72%.',
    ],
    sections: printivoCaseStudy,
    stats: printivoStats,
  },
  {
    name: 'Speedy Transfer',
    slug: 'speedy-transfer',
    hoverSound: SOUND.BUTTON,
    image: '/images/projects/speedy-transfer.svg',
    imageWide: '/images/projects/speedy-transfer-wide.svg',
    category: 'Fintech · Remittance App',
    role: 'UI Designer',
    intro: [
      'Between 2013 and 2019, Nigeria received $96 billion in diaspora remittances — yet sending money home still demanded more tech-savvy than most people have, especially after the CBN banned popular routes like Wise. Speedy Transfer set out to make sending money back home as easy as paying for coffee with your card.',
      'On a three-week timeline I designed the app end to end — onboarding with KYC, instant bank transfers, bill payments and card management — grounding a handed-down PRD in quick interviews with friends in the diaspora, and handing off through a component-based design system in Zeplin.',
    ],
  },
  { name: 'Esoko', slug: 'esoko', hoverSound: SOUND.SELECT, image: '/images/projects/esoko.svg', imageWide: '/images/projects/esoko-wide.svg', category: 'Agritech Platform' },
  { name: 'Traderex', slug: 'traderex', hoverSound: SOUND.TOGGLE_ON, image: '/images/projects/traderex.svg', imageWide: '/images/projects/traderex-wide.svg', category: 'Trading Platform' },
  { name: 'WorkWise', slug: 'workwise', hoverSound: SOUND.TOGGLE_OFF, image: '/images/projects/workwise.svg', imageWide: '/images/projects/workwise-wide.svg', category: 'SaaS Product Design' },
  { name: 'TravelWahoo', slug: 'travelwahoo', hoverSound: SOUND.SWIPE, image: '/images/projects/travelwahoo.svg', imageWide: '/images/projects/travelwahoo-wide.svg', category: 'Travel Platform' },
  { name: 'eProd', slug: 'eprod', hoverSound: SOUND.TYPE, image: '/images/projects/eprod.svg', imageWide: '/images/projects/eprod-wide.svg', category: 'Production Tooling' },
  { name: 'Primer', slug: 'primer', hoverSound: SOUND.NOTIFICATION, image: '/images/projects/primer.svg', imageWide: '/images/projects/primer-wide.svg', category: 'Brand Identity' },
  { name: 'Ebi', slug: 'ebi', hoverSound: SOUND.TRANSITION_UP, image: '/images/projects/ebi.svg', imageWide: '/images/projects/ebi-wide.svg', category: 'Mobile App Design' },
  { name: 'Farmspeak', slug: 'farmspeak', hoverSound: SOUND.TRANSITION_DOWN, image: '/images/projects/farmspeak.svg', imageWide: '/images/projects/farmspeak-wide.svg', category: 'Agritech Product' },
]
