import { useCallback, useRef } from 'react'
import HandControl from './HandControl'

/**
 * Site-wide hand control. Mounted once at the app level, it translates
 * fingertip tracking into synthetic pointer events, so every page's existing
 * hover and click handlers work without any hand-specific code:
 *
 * - Move: the element under the fingertip receives mouseover/mouseout/mousemove.
 * - Double pinch: dispatches a click on whatever is under the cursor.
 * - Pinch + drag vertically: grabs the page and scrolls it.
 */
const SCROLL_GAIN = 2.2
const DRAG_ENGAGE_PX = 26
const DRAG_ENGAGE_MS = 220

type Pos = { x: number; y: number }

export default function HandCursor() {
  const hovered = useRef<Element | null>(null)
  const drag = useRef<{
    startY: number
    startScroll: number
    at: number
    engaged: boolean
  } | null>(null)

  const setHover = useCallback((el: Element | null, pos: Pos | null) => {
    const prev = hovered.current
    if (prev === el) return
    const init = { bubbles: true, clientX: pos?.x ?? 0, clientY: pos?.y ?? 0 }
    prev?.dispatchEvent(new MouseEvent('mouseout', { ...init, relatedTarget: el }))
    el?.dispatchEvent(new MouseEvent('mouseover', { ...init, relatedTarget: prev }))
    hovered.current = el
  }, [])

  const onCursor = useCallback(
    (pos: Pos | null) => {
      if (!pos) {
        setHover(null, null)
        drag.current = null
        return
      }

      // While pinch-dragging, the hand scrolls the page instead of hovering.
      const d = drag.current
      if (d) {
        const dy = d.startY - pos.y
        if (
          !d.engaged &&
          (Math.abs(dy) > DRAG_ENGAGE_PX || performance.now() - d.at > DRAG_ENGAGE_MS)
        ) {
          d.engaged = true
          setHover(null, pos)
        }
        if (d.engaged) {
          window.scrollTo({ top: d.startScroll + dy * SCROLL_GAIN })
          return
        }
      }

      const el = document.elementFromPoint(pos.x, pos.y)
      setHover(el, pos)
      el?.dispatchEvent(
        new MouseEvent('mousemove', { bubbles: true, clientX: pos.x, clientY: pos.y }),
      )
    },
    [setHover],
  )

  const onPinch = useCallback((pinching: boolean, pos: Pos | null) => {
    drag.current =
      pinching && pos
        ? { startY: pos.y, startScroll: window.scrollY, at: performance.now(), engaged: false }
        : null
  }, [])

  const onPinchClick = useCallback((pos: Pos) => {
    document
      .elementFromPoint(pos.x, pos.y)
      ?.dispatchEvent(
        new MouseEvent('click', { bubbles: true, cancelable: true, clientX: pos.x, clientY: pos.y }),
      )
  }, [])

  return <HandControl onCursor={onCursor} onPinch={onPinch} onPinchClick={onPinchClick} />
}
