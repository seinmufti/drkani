import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { Logo } from './Logo'
import './Navbar.css'

const links = [
  { href: '#introduction', label: 'Introduction' },
  { href: '#results', label: 'Results' },
  { href: '#certificates', label: 'Credentials' },
  { href: '#contact', label: 'Get in Touch' },
]

/** No sections currently land on the title. */
function resolveScrollTarget(hash: string): HTMLElement | null {
  const section = document.querySelector(hash)
  if (!(section instanceof HTMLElement)) return null
  return section
}

function scrollAfterMorseLine(section: HTMLElement, navH: number, isMobile: boolean) {
  let afterLine = section.getBoundingClientRect().top + window.scrollY

  if (isMobile) {
    const before = getComputedStyle(section, '::before')
    const marginTop = parseFloat(before.marginTop) || 0
    const height = parseFloat(before.height) || 0
    afterLine += marginTop + height
  }

  window.scrollTo({ top: Math.max(0, afterLine - navH), behavior: 'smooth' })
}

function scrollToSectionHash(hash: string) {
  const styles = getComputedStyle(document.documentElement)
  const navH = parseFloat(styles.getPropertyValue('--nav-h')) || 72
  const isMobile = window.matchMedia('(max-width: 900px)').matches

  /*
   * Results, Credentials, Contact: land immediately under the Morse rule
   * (not on the title). Mobile owns the rule via section::before.
   */
  if (hash === '#results' || hash === '#certificates' || hash === '#contact') {
    const section = document.querySelector(hash)
    if (!(section instanceof HTMLElement)) return
    scrollAfterMorseLine(section, navH, isMobile)
    history.pushState(null, '', hash)
    return
  }

  const target = resolveScrollTarget(hash)
  if (!target) return

  // Match html scroll-padding-top breathing room (mobile vs desktop).
  const pad = isMobile ? 8 : 16
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
          href="#introduction"
          className="nav__brand"
          onClick={(event) => onHashNavClick(event, '#introduction')}
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
