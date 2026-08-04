import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { Logo } from './Logo'
import './Navbar.css'

const links = [
  { href: '#about', label: 'About' },
  { href: '#results', label: 'Results' },
  { href: '#certificates', label: 'Credentials' },
  { href: '#contact', label: 'Get in Touch' },
]

/** Sections with a Morse ::before above the content (skip About). */
const MORSE_HASHES = new Set(['#about-me', '#results', '#certificates', '#contact'])

function resolveScrollTarget(hash: string): HTMLElement | null {
  const section = document.querySelector(hash)
  if (!(section instanceof HTMLElement)) return null

  // Land on the title/head so the Morse rule scrolls up under the sticky nav.
  if (MORSE_HASHES.has(hash)) {
    const inner =
      section.querySelector('.section-head') ??
      section.querySelector('.section-title')
    if (inner instanceof HTMLElement) return inner
  }

  return section
}

function scrollToSectionHash(hash: string) {
  const target = resolveScrollTarget(hash)
  if (!target) return

  const styles = getComputedStyle(document.documentElement)
  const navH = parseFloat(styles.getPropertyValue('--nav-h')) || 72
  // Match html scroll-padding-top breathing room (mobile vs desktop).
  const pad = window.matchMedia('(max-width: 900px)').matches ? 8 : 16
  const top = target.getBoundingClientRect().top + window.scrollY - navH - pad

  window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' })
  history.pushState(null, '', hash)
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const linksRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  useEffect(() => {
    if (!open) return

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target
      if (!(target instanceof Node)) return
      if (toggleRef.current?.contains(target)) return
      if (linksRef.current?.contains(target)) return
      setOpen(false)
    }

    // Capture so we close before the page behind handles the tap.
    document.addEventListener('pointerdown', onPointerDown, true)
    return () => document.removeEventListener('pointerdown', onPointerDown, true)
  }, [open])

  const onHashNavClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault()
    setOpen(false)
    // Unlock body scroll immediately (menu close effect may lag one frame).
    document.body.style.overflow = ''
    // Defer so layout settles after the overlay closes.
    requestAnimationFrame(() => scrollToSectionHash(href))
  }

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="container nav__inner">
        <a
          href="#about"
          className="nav__brand"
          onClick={(event) => onHashNavClick(event, '#about')}
          aria-label="Dr. Kani"
        >
          <Logo />
        </a>

        <button
          ref={toggleRef}
          className={`nav__toggle ${open ? 'nav__toggle--open' : ''}`}
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="primary-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>

        <nav
          ref={linksRef}
          id="primary-nav"
          className={`nav__links ${open ? 'nav__links--open' : ''}`}
          aria-label="Primary"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav__link"
              onClick={(event) => onHashNavClick(event, link.href)}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
