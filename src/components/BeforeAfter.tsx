import { useCallback, useEffect, useRef, useState } from 'react'
import './BeforeAfter.css'

type BeforeAfterProps = {
  beforeSrc: string
  afterSrc: string
  beforeAlt?: string
  afterAlt?: string
  title: string
  /** Overrides `.ba__img` object-position on the before image only. */
  beforeObjectPosition?: string
  /** Absolute CSS scale for the before image (default CSS scale is 1.035). */
  beforeScale?: number
  /** Overrides `.ba__img` object-position on the after image only. */
  afterObjectPosition?: string
  /** Absolute CSS scale for the after image (default CSS scale is 1.035). */
  afterScale?: number
}

type DragMode = 'pending' | 'slide' | 'scroll'

const AXIS_LOCK_PX = 10

export function BeforeAfter({
  beforeSrc,
  afterSrc,
  beforeAlt = 'Before treatment',
  afterAlt = 'After treatment',
  title,
  beforeObjectPosition,
  beforeScale,
  afterObjectPosition,
  afterScale,
}: BeforeAfterProps) {
  const frameRef = useRef<HTMLDivElement>(null)
  /** True only after pointerdown on *this* frame — ignores sibling sliders. */
  const trackingRef = useRef(false)
  const modeRef = useRef<DragMode>('pending')
  const startRef = useRef({ x: 0, y: 0 })
  const [position, setPosition] = useState(50)
  const [dragging, setDragging] = useState(false)

  const updateFromClientX = useCallback((clientX: number) => {
    const el = frameRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const next = ((clientX - rect.left) / rect.width) * 100
    setPosition(Math.min(100, Math.max(0, next)))
  }, [])

  const endGesture = useCallback((event?: PointerEvent) => {
    if (!trackingRef.current) return
    const el = frameRef.current
    if (el && modeRef.current === 'slide' && event) {
      try {
        el.releasePointerCapture(event.pointerId)
      } catch {
        /* already released */
      }
    }
    trackingRef.current = false
    modeRef.current = 'pending'
    setDragging(false)
  }, [])

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      if (!trackingRef.current) return

      // Hover / move without a pressed button must never drive the slider
      if (event.pointerType === 'mouse' && event.buttons === 0) {
        endGesture(event)
        return
      }

      if (modeRef.current === 'scroll') return

      if (modeRef.current === 'pending') {
        const dx = Math.abs(event.clientX - startRef.current.x)
        const dy = Math.abs(event.clientY - startRef.current.y)
        if (dx < AXIS_LOCK_PX && dy < AXIS_LOCK_PX) return

        // Vertical intent → let the page scroll; ignore this gesture for the slider
        if (dy > dx) {
          modeRef.current = 'scroll'
          setDragging(false)
          return
        }

        // Horizontal swipe/drag only — no tap or hover seek
        modeRef.current = 'slide'
        setDragging(true)
        const el = frameRef.current
        if (el) {
          try {
            el.setPointerCapture(event.pointerId)
          } catch {
            /* already released */
          }
        }
      }

      if (modeRef.current !== 'slide') return
      event.preventDefault()
      updateFromClientX(event.clientX)
    }

    const onUp = (event: PointerEvent) => {
      endGesture(event)
    }

    window.addEventListener('pointermove', onMove, { passive: false })
    window.addEventListener('pointerup', onUp)
    window.addEventListener('pointercancel', onUp)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('pointercancel', onUp)
    }
  }, [endGesture, updateFromClientX])

  return (
    <article className="ba">
      <div className="ba__meta">
        <h3 className="ba__title">{title}</h3>
      </div>

      <div
        ref={frameRef}
        className={dragging ? 'ba__frame ba__frame--dragging' : 'ba__frame'}
        role="slider"
        tabIndex={0}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(position)}
        aria-label={`Reveal before and after for ${title}`}
        onPointerDown={(event) => {
          if (event.button !== 0 && event.pointerType === 'mouse') return
          trackingRef.current = true
          modeRef.current = 'pending'
          setDragging(false)
          startRef.current = { x: event.clientX, y: event.clientY }
        }}
        onKeyDown={(event) => {
          if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
            event.preventDefault()
            setPosition((p) => Math.max(0, p - 2))
          } else if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
            event.preventDefault()
            setPosition((p) => Math.min(100, p + 2))
          } else if (event.key === 'Home') {
            event.preventDefault()
            setPosition(0)
          } else if (event.key === 'End') {
            event.preventDefault()
            setPosition(100)
          }
        }}
      >
        <img
          className="ba__img"
          src={afterSrc}
          alt={afterAlt}
          draggable={false}
          style={{
            ...(afterObjectPosition ? { objectPosition: afterObjectPosition } : {}),
            ...(afterScale != null ? { transform: `scale(${afterScale})` } : {}),
          }}
        />
        <div
          className="ba__before"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <img
            className="ba__img"
            src={beforeSrc}
            alt={beforeAlt}
            draggable={false}
            style={{
              ...(beforeObjectPosition ? { objectPosition: beforeObjectPosition } : {}),
              ...(beforeScale != null ? { transform: `scale(${beforeScale})` } : {}),
            }}
          />
        </div>

        <div className="ba__handle" style={{ left: `${position}%` }} aria-hidden="true">
          <span className="ba__handle-line" />
          <span className="ba__handle-knob">
            <span />
            <span />
          </span>
        </div>

        <span className="ba__label ba__label--before">Before</span>
        <span className="ba__label ba__label--after">After</span>
      </div>
    </article>
  )
}
