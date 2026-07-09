import { useCallback, useEffect, useRef, useState } from 'react'
import './HandControl.css'

interface HandControlProps {
  /** Reports the on-screen fingertip cursor position (viewport px), or null when no hand is visible. */
  onCursor: (pos: { x: number; y: number } | null) => void
  /** Fired when the user pinches twice quickly — treated as a click at the cursor position. */
  onPinchClick: (pos: { x: number; y: number }) => void
}

const PINCH_THRESHOLD = 0.3
const DOUBLE_PINCH_MS = 500
const SMOOTHING = 0.35

export default function HandControl({ onCursor, onPinchClick }: HandControlProps) {
  const [enabled, setEnabled] = useState(false)
  const [status, setStatus] = useState<'idle' | 'loading' | 'running' | 'error'>('idle')
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null)
  const [pinched, setPinched] = useState(false)

  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const rafRef = useRef(0)
  const smoothed = useRef<{ x: number; y: number } | null>(null)
  const wasPinching = useRef(false)
  const lastPinchAt = useRef(0)

  const stop = useCallback(() => {
    cancelAnimationFrame(rafRef.current)
    streamRef.current?.getTracks().forEach((t) => t.stop())
    streamRef.current = null
    smoothed.current = null
    setCursor(null)
    setStatus('idle')
    onCursor(null)
  }, [onCursor])

  useEffect(() => {
    if (!enabled) {
      stop()
      return
    }

    let cancelled = false

    async function start() {
      setStatus('loading')
      try {
        // Camera permission is requested here — the browser shows its native prompt.
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 640, height: 480, facingMode: 'user' },
        })
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop())
          return
        }
        streamRef.current = stream
        const video = videoRef.current!
        video.srcObject = stream
        await video.play()

        const { FilesetResolver, HandLandmarker } = await import('@mediapipe/tasks-vision')
        const fileset = await FilesetResolver.forVisionTasks('/mediapipe/wasm')
        const landmarker = await HandLandmarker.createFromOptions(fileset, {
          baseOptions: { modelAssetPath: '/models/hand_landmarker.task', delegate: 'GPU' },
          runningMode: 'VIDEO',
          numHands: 1,
        })
        if (cancelled) {
          landmarker.close()
          return
        }
        setStatus('running')

        let lastVideoTime = -1
        const track = () => {
          if (cancelled) return
          if (video.currentTime !== lastVideoTime) {
            lastVideoTime = video.currentTime
            const result = landmarker.detectForVideo(video, performance.now())
            const hand = result.landmarks[0]
            if (hand) {
              const tip = hand[8]
              const thumb = hand[4]
              // Mirror x so moving your hand right moves the cursor right.
              const target = {
                x: (1 - tip.x) * window.innerWidth,
                y: tip.y * window.innerHeight,
              }
              const prev = smoothed.current ?? target
              smoothed.current = {
                x: prev.x + (target.x - prev.x) * SMOOTHING,
                y: prev.y + (target.y - prev.y) * SMOOTHING,
              }
              setCursor(smoothed.current)
              onCursor(smoothed.current)

              // Pinch = thumb tip close to index tip, normalized by hand size (wrist → middle knuckle).
              const handSize = Math.hypot(hand[0].x - hand[9].x, hand[0].y - hand[9].y)
              const pinchDist = Math.hypot(thumb.x - tip.x, thumb.y - tip.y)
              const isPinching = pinchDist < handSize * PINCH_THRESHOLD
              setPinched(isPinching)
              if (isPinching && !wasPinching.current) {
                const now = performance.now()
                if (now - lastPinchAt.current < DOUBLE_PINCH_MS) {
                  lastPinchAt.current = 0
                  onPinchClick(smoothed.current)
                } else {
                  lastPinchAt.current = now
                }
              }
              wasPinching.current = isPinching
            } else {
              smoothed.current = null
              setCursor(null)
              setPinched(false)
              wasPinching.current = false
              onCursor(null)
            }
          }
          rafRef.current = requestAnimationFrame(track)
        }
        rafRef.current = requestAnimationFrame(track)
      } catch {
        if (!cancelled) {
          setStatus('error')
          setEnabled(false)
        }
      }
    }

    start()
    return () => {
      cancelled = true
      stop()
    }
  }, [enabled, onCursor, onPinchClick, stop])

  return (
    <>
      <button
        type="button"
        className="hand-control__toggle"
        onClick={() => setEnabled((v) => !v)}
        aria-pressed={enabled}
      >
        {status === 'loading' ? 'Starting camera…' : enabled ? 'Disable hand control' : '✋ Enable hand control'}
      </button>
      {status === 'error' && (
        <p className="hand-control__error" role="alert">
          Camera unavailable — check permission and try again.
        </p>
      )}
      <video ref={videoRef} className="hand-control__video" data-visible={status === 'running'} muted playsInline />
      {cursor && (
        <div
          className="hand-control__cursor"
          data-pinched={pinched}
          style={{ transform: `translate(${cursor.x}px, ${cursor.y}px)` }}
          aria-hidden="true"
        />
      )}
    </>
  )
}
