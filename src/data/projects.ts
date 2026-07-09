import { SOUND } from '../lib/sound'

export interface Project {
  name: string
  slug: string
  /** snd-lib sound key played on hover — one distinct sound per project */
  hoverSound: string
  /** Where the project opens on click / double-pinch. Replace '#slug' with real case-study URLs. */
  url: string
}

export const PROJECTS: Project[] = [
  { name: 'Printivo', slug: 'printivo', hoverSound: SOUND.TAP, url: '#printivo' },
  { name: 'Speedy Transfer', slug: 'speedy-transfer', hoverSound: SOUND.BUTTON, url: '#speedy-transfer' },
  { name: 'Esoko', slug: 'esoko', hoverSound: SOUND.SELECT, url: '#esoko' },
  { name: 'Traderex', slug: 'traderex', hoverSound: SOUND.TOGGLE_ON, url: '#traderex' },
  { name: 'WorkWise', slug: 'workwise', hoverSound: SOUND.TOGGLE_OFF, url: '#workwise' },
  { name: 'TravelWahoo', slug: 'travelwahoo', hoverSound: SOUND.SWIPE, url: '#travelwahoo' },
  { name: 'eProd', slug: 'eprod', hoverSound: SOUND.TYPE, url: '#eprod' },
  { name: 'Primer', slug: 'primer', hoverSound: SOUND.NOTIFICATION, url: '#primer' },
  { name: 'Ebi', slug: 'ebi', hoverSound: SOUND.TRANSITION_UP, url: '#ebi' },
  { name: 'Farmspeak', slug: 'farmspeak', hoverSound: SOUND.TRANSITION_DOWN, url: '#farmspeak' },
]
