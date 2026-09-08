import { NordlysMark } from './NordlysMark'
import './Footer.css'

const GRASS_W = 480
const GRASS_H = 52
const GROUND = GRASS_H

type Blade = {
  x: number
  h: number
  w: number
  lean: number
}

/** Deterministic-ish variety from index (stable across renders). */
function bladeAt(i: number, spacing: number, phase: number): Blade {
  const n = Math.sin(i * 12.9898 + phase) * 43758.5453
  const r = n - Math.floor(n)
  const r2 = (Math.sin(i * 78.233 + phase * 2) * 43758.5453) % 1
  const r3 = Math.abs(r2)
  return {
    x: i * spacing + (r - 0.5) * spacing * 0.55,
    h: 18 + r * 30 + (i % 5) * 1.2,
    w: 2.2 + r3 * 2.8,
    lean: (r - 0.5) * 10,
  }
}

function bladePath({ x, h, w, lean }: Blade) {
  const tipX = x + w * 0.45 + lean
  const tipY = GROUND - h
  const midY = GROUND - h * 0.55
  return [
    `M${x.toFixed(1)} ${GROUND}`,
    `C${(x + lean * 0.35).toFixed(1)} ${midY.toFixed(1)}`,
    `${(tipX - w * 0.15).toFixed(1)} ${(tipY + h * 0.2).toFixed(1)}`,
    `${tipX.toFixed(1)} ${tipY.toFixed(1)}`,
    `C${(tipX + w * 0.2).toFixed(1)} ${(tipY + h * 0.22).toFixed(1)}`,
    `${(x + w + lean * 0.25).toFixed(1)} ${midY.toFixed(1)}`,
    `${(x + w).toFixed(1)} ${GROUND}`,
    'Z',
  ].join(' ')
}

const backBlades = Array.from({ length: 72 }, (_, i) => bladeAt(i, 6.7, 1.1))
const midBlades = Array.from({ length: 64 }, (_, i) => {
  const b = bladeAt(i, 7.5, 2.7)
  return { ...b, h: b.h * 0.82, x: b.x + 3.2 }
})
const frontBlades = Array.from({ length: 58 }, (_, i) => {
  const b = bladeAt(i, 8.3, 4.2)
  return { ...b, h: b.h * 0.62, w: b.w * 0.9, x: b.x + 1.6 }
})
const tipBlades = Array.from({ length: 40 }, (_, i) => {
  const b = bladeAt(i, 12, 5.5)
  return { ...b, h: 10 + (b.h % 14), w: b.w * 0.75, x: b.x + 5 }
})

export function Footer() {
  return (
    <footer className="footer">
      <svg
        className="footer__grass"
        viewBox={`0 0 ${GRASS_W} ${GRASS_H}`}
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        {/* Deep forest back row — tallest */}
        <g fill="#2a3d28">
          {backBlades.map((b, i) => (
            <path key={`b${i}`} d={bladePath(b)} />
          ))}
        </g>
        {/* Mid olive */}
        <g fill="#3d5a3a" opacity="0.95">
          {midBlades.map((b, i) => (
            <path key={`m${i}`} d={bladePath(b)} />
          ))}
        </g>
        {/* Sage front */}
        <g fill="#5a7a52" opacity="0.9">
          {frontBlades.map((b, i) => (
            <path key={`f${i}`} d={bladePath(b)} />
          ))}
        </g>
        {/* Bright tips — shorter accents */}
        <g fill="#7a9a68" opacity="0.75">
          {tipBlades.map((b, i) => (
            <path key={`t${i}`} d={bladePath(b)} />
          ))}
        </g>
      </svg>

      <div className="container footer__inner">
        <p className="footer__brand">kani</p>

        <p className="footer__copy">
          <span className="footer__copy-year">© {new Date().getFullYear()}</span>
          <span className="footer__copy-rest">All rights reserved.</span>
        </p>

        <p className="footer__credit">
          <span className="footer__credit-label">Developed by</span>
          <a
            className="footer__credit-brand"
            href="https://nordlyssolutions.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <strong>nordlys</strong>
            <NordlysMark className="footer__mark" />
          </a>
        </p>
      </div>
    </footer>
  )
}
