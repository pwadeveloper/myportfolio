import SndImport from 'snd-lib'
import { KIT_INFO } from 'snd-lib/dist/constant'

// snd-lib ships CJS with `exports.default`; depending on how the bundler
// interops, the class can arrive directly or under `.default`.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Snd: typeof SndImport = (SndImport as any).default ?? SndImport

/** Sound keys from snd-lib's kit (see its SoundKeys type). */
export const SOUND = {
  TAP: 'tap',
  BUTTON: 'button',
  SELECT: 'select',
  TOGGLE_ON: 'toggle_on',
  TOGGLE_OFF: 'toggle_off',
  SWIPE: 'swipe',
  TYPE: 'type',
  NOTIFICATION: 'notification',
  TRANSITION_UP: 'transition_up',
  TRANSITION_DOWN: 'transition_down',
  CELEBRATION: 'celebration',
} as const

// Self-host the kit's audio sprite (copied from the snd-lib package into
// public/sounds) instead of pulling it from jsDelivr at runtime.
KIT_INFO['01'].audioSrc = '/sounds/kit01.mp3'

const snd = new Snd({ easySetup: true })

let loading: Promise<void> | null = null

export function loadSounds(): Promise<void> {
  if (!loading) loading = snd.load(Snd.KITS?.SND01 ?? '01')
  return loading
}

export function playSound(key: string): void {
  loadSounds()
    .then(() => snd.play(key))
    .catch(() => {})
}

export function playClickSound(): void {
  playSound(SOUND.CELEBRATION)
}
