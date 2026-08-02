import { useCallback, useEffect, useRef, useState } from 'react'
import './BeforeAfter.css'

type BeforeAfterProps = {
  beforeSrc: string
  afterSrc: string
  beforeAlt?: string
  afterAlt?: string
  title: string
  caption?: string
}

export function BeforeAfter({
  beforeSrc,
  afterSrc,
  beforeAlt = 'Before treatment',
  afterAlt = 'After treatment',
  title,
  caption,
}: BeforeAfterProps) {
  const frameRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)
  const [position, setPosition] = useState(50)

  const updateFromClientX = useCallback((clientX: number) => {
    const el = frameRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const next = ((clientX - rect.left) / rect.width) * 100
    setPosition(Math.min(100, Math.max(0, next)))
  }, [])

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      if (!dragging.current) return
      updateFromClientX(event.clientX)
    }

    const onUp = () => {
      dragging.current = false
    }

    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }
  }, [updateFromClientX])

  return (
    <article className="ba">
      <div className="ba__meta">
        <h3 className="ba__title">{title}</h3>
        {caption ? <p className="ba__caption">{caption}</p> : null}
      </div>

      <div
        ref={frameRef}
        className="ba__frame"
        onPointerDown={(event) => {
          dragging.current = true
          updateFromClientX(event.clientX)
        }}
      >
        <img className="ba__img" src={afterSrc} alt={afterAlt} draggable={false} />
        <div
          className="ba__before"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <img className="ba__img" src={beforeSrc} alt={beforeAlt} draggable={false} />
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

        <input
          className="ba__range"
          type="range"
          min={0}
          max={100}
          value={position}
          aria-label={`Reveal before and after for ${title}`}
          onChange={(event) => setPosition(Number(event.target.value))}
        />
      </div>
    </article>
  )
}
