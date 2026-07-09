import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValue } from 'framer-motion'
import HandControl from './HandControl'
import { PROJECTS } from '../data/projects'
import { loadSounds, playSound, playClickSound } from '../lib/sound'
import './Hero.css'

function useClock() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
  const tzAbbr =
    new Intl.DateTimeFormat('en-US', { timeZoneName: 'short' })
      .formatToParts(now)
      .find((part) => part.type === 'timeZoneName')?.value ?? timeZone

  const time = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  }).format(now)

  return `{${tzAbbr} + ${time}}`
}

export default function Hero() {
  const clock = useClock()
  const [hovered, setHovered] = useState<number | null>(null)
  const listRef = useRef<HTMLUListElement>(null)

  // The preview image trails the cursor (mouse or hand): a persistent rAF
  // loop eases the display position toward the last pointer position.
  const cursorTarget = useRef({ x: 0, y: 0 })
  const hasCursor = useRef(false)
  const previewX = useMotionValue(0)
  const previewY = useMotionValue(0)

  useEffect(() => {
    let raf = 0
    const loop = () => {
      const t = cursorTarget.current
      previewX.set(previewX.get() + (t.x - previewX.get()) * 0.14)
      previewY.set(previewY.get() + (t.y - previewY.get()) * 0.14)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [previewX, previewY])

  const moveCursor = useCallback(
    (x: number, y: number) => {
      cursorTarget.current = { x, y }
      // Snap instead of trail on the very first position so the preview
      // doesn't fly in from the corner.
      if (!hasCursor.current) {
        hasCursor.current = true
        previewX.set(x)
        previewY.set(y)
      }
    },
    [previewX, previewY],
  )

  useEffect(() => {
    loadSounds()
  }, [])

  const hoverItem = useCallback(
    (index: number | null) => {
      setHovered((prev) => {
        if (index !== null && index !== prev) playSound(PROJECTS[index].hoverSound)
        return index
      })
    },
    [],
  )

  const openProject = useCallback((index: number) => {
    playClickSound()
    window.open(PROJECTS[index].url, '_blank', 'noopener')
  }, [])

  const indexAtPoint = useCallback((pos: { x: number; y: number }) => {
    const items = listRef.current?.querySelectorAll('li')
    if (!items) return null
    for (let i = 0; i < items.length; i++) {
      const r = items[i].getBoundingClientRect()
      if (pos.x >= r.left && pos.x <= r.right && pos.y >= r.top && pos.y <= r.bottom) return i
    }
    return null
  }, [])

  const onHandCursor = useCallback(
    (pos: { x: number; y: number } | null) => {
      if (pos) moveCursor(pos.x, pos.y)
      hoverItem(pos ? indexAtPoint(pos) : null)
    },
    [moveCursor, hoverItem, indexAtPoint],
  )

  const onPinchClick = useCallback(
    (pos: { x: number; y: number }) => {
      const index = indexAtPoint(pos)
      if (index !== null) openProject(index)
    },
    [indexAtPoint, openProject],
  )

  return (
    <section
      className="hero"
      aria-label="Introduction"
      onMouseMove={(e) => moveCursor(e.clientX, e.clientY)}
    >
      <div className="hero__frame">
        <h1 className="hero__headline">
          MUDIA
          <br />
          IMASUEN,
          <br />
          FILMMAKER &amp;
          <br />
          <span className="hero__headline--fat">DESIGNER</span>
          <br />
          BASED IN
          <br />
          KADUNA
        </h1>

        <img
          className="hero__portrait"
          src="/images/portrait.webp"
          alt="Portrait of Mudia Imasuen"
          width={604}
          height={821}
        />

        <div className="hero__work">
          <p className="hero__label">Selected work</p>
          <ul className="hero__work-list" ref={listRef}>
            {PROJECTS.map((project, i) => (
              <motion.li
                key={project.slug}
                animate={{
                  x: hovered === i ? 28 : 0,
                  opacity: hovered === null || hovered === i ? 1 : 0.35,
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              >
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener"
                  onMouseEnter={() => hoverItem(i)}
                  onMouseLeave={() => hoverItem(null)}
                  onClick={(e) => {
                    e.preventDefault()
                    openProject(i)
                  }}
                >
                  {project.name}
                </a>
              </motion.li>
            ))}
          </ul>
        </div>

        <AnimatePresence>
          {hovered !== null && (
            <motion.img
              key={PROJECTS[hovered].slug}
              className="hero__preview"
              src={PROJECTS[hovered].image}
              alt={`${PROJECTS[hovered].name} preview`}
              width={500}
              height={700}
              style={{ x: previewX, y: previewY }}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            />
          )}
        </AnimatePresence>

        <p className="hero__clock">MY TIME ZONE: {clock}</p>
      </div>

      <HandControl onCursor={onHandCursor} onPinchClick={onPinchClick} />
    </section>
  )
}
