import { SOUND } from '../lib/sound'

export interface Project {
  name: string
  slug: string
  /** snd-lib sound key played on hover — one distinct sound per project */
  hoverSound: string
  /** Where the project opens on click / double-pinch. Replace '#slug' with real case-study URLs. */
  url: string
  /** 500×700 preview shown on hover. Placeholders for now — replace with real project imagery. */
  image: string
  /** Wide hero used at the top of the project page. Placeholder — replace with real imagery. */
  imageWide: string
  /** Short discipline/category line shown in the project-page header. Placeholder copy. */
  category: string
}

export const PROJECTS: Project[] = [
  { name: 'Printivo', slug: 'printivo', hoverSound: SOUND.TAP, url: '#printivo', image: '/images/projects/printivo.svg', imageWide: '/images/projects/printivo-wide.svg', category: 'Brand & Product Design' },
  { name: 'Speedy Transfer', slug: 'speedy-transfer', hoverSound: SOUND.BUTTON, url: '#speedy-transfer', image: '/images/projects/speedy-transfer.svg', imageWide: '/images/projects/speedy-transfer-wide.svg', category: 'Fintech Product Design' },
  { name: 'Esoko', slug: 'esoko', hoverSound: SOUND.SELECT, url: '#esoko', image: '/images/projects/esoko.svg', imageWide: '/images/projects/esoko-wide.svg', category: 'Agritech Platform' },
  { name: 'Traderex', slug: 'traderex', hoverSound: SOUND.TOGGLE_ON, url: '#traderex', image: '/images/projects/traderex.svg', imageWide: '/images/projects/traderex-wide.svg', category: 'Trading Platform' },
  { name: 'WorkWise', slug: 'workwise', hoverSound: SOUND.TOGGLE_OFF, url: '#workwise', image: '/images/projects/workwise.svg', imageWide: '/images/projects/workwise-wide.svg', category: 'SaaS Product Design' },
  { name: 'TravelWahoo', slug: 'travelwahoo', hoverSound: SOUND.SWIPE, url: '#travelwahoo', image: '/images/projects/travelwahoo.svg', imageWide: '/images/projects/travelwahoo-wide.svg', category: 'Travel Platform' },
  { name: 'eProd', slug: 'eprod', hoverSound: SOUND.TYPE, url: '#eprod', image: '/images/projects/eprod.svg', imageWide: '/images/projects/eprod-wide.svg', category: 'Production Tooling' },
  { name: 'Primer', slug: 'primer', hoverSound: SOUND.NOTIFICATION, url: '#primer', image: '/images/projects/primer.svg', imageWide: '/images/projects/primer-wide.svg', category: 'Brand Identity' },
  { name: 'Ebi', slug: 'ebi', hoverSound: SOUND.TRANSITION_UP, url: '#ebi', image: '/images/projects/ebi.svg', imageWide: '/images/projects/ebi-wide.svg', category: 'Mobile App Design' },
  { name: 'Farmspeak', slug: 'farmspeak', hoverSound: SOUND.TRANSITION_DOWN, url: '#farmspeak', image: '/images/projects/farmspeak.svg', imageWide: '/images/projects/farmspeak-wide.svg', category: 'Agritech Product' },
]
