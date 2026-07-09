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
}

export const PROJECTS: Project[] = [
  { name: 'Printivo', slug: 'printivo', hoverSound: SOUND.TAP, url: '#printivo', image: '/images/projects/printivo.svg' },
  { name: 'Speedy Transfer', slug: 'speedy-transfer', hoverSound: SOUND.BUTTON, url: '#speedy-transfer', image: '/images/projects/speedy-transfer.svg' },
  { name: 'Esoko', slug: 'esoko', hoverSound: SOUND.SELECT, url: '#esoko', image: '/images/projects/esoko.svg' },
  { name: 'Traderex', slug: 'traderex', hoverSound: SOUND.TOGGLE_ON, url: '#traderex', image: '/images/projects/traderex.svg' },
  { name: 'WorkWise', slug: 'workwise', hoverSound: SOUND.TOGGLE_OFF, url: '#workwise', image: '/images/projects/workwise.svg' },
  { name: 'TravelWahoo', slug: 'travelwahoo', hoverSound: SOUND.SWIPE, url: '#travelwahoo', image: '/images/projects/travelwahoo.svg' },
  { name: 'eProd', slug: 'eprod', hoverSound: SOUND.TYPE, url: '#eprod', image: '/images/projects/eprod.svg' },
  { name: 'Primer', slug: 'primer', hoverSound: SOUND.NOTIFICATION, url: '#primer', image: '/images/projects/primer.svg' },
  { name: 'Ebi', slug: 'ebi', hoverSound: SOUND.TRANSITION_UP, url: '#ebi', image: '/images/projects/ebi.svg' },
  { name: 'Farmspeak', slug: 'farmspeak', hoverSound: SOUND.TRANSITION_DOWN, url: '#farmspeak', image: '/images/projects/farmspeak.svg' },
]
