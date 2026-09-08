/** Shared hash navigation — Morse sections land just under the separator. */

function resolveScrollTarget(hash: string): HTMLElement | null {
  const section = document.querySelector(hash)
  if (!(section instanceof HTMLElement)) return null
  return section
}

function scrollAfterMorseLine(section: HTMLElement, navH: number) {
  let afterLine = section.getBoundingClientRect().top + window.scrollY

  const before = getComputedStyle(section, '::before')
  const marginTop = parseFloat(before.marginTop) || 0
  const height = parseFloat(before.height) || 0
  const marginBottom = parseFloat(before.marginBottom) || 0
  afterLine += marginTop + height + marginBottom

  window.scrollTo({ top: Math.max(0, afterLine - navH), behavior: 'smooth' })
}

export function scrollToSectionHash(hash: string) {
  const styles = getComputedStyle(document.documentElement)
  const navH = parseFloat(styles.getPropertyValue('--nav-h')) || 72
  const isMobile = window.matchMedia('(max-width: 900px)').matches

  /*
   * Results, Credentials, Contact: land immediately under the Morse rule
   * (not on the title). Morse sits in no-man's land above the content band.
   */
  if (hash === '#results' || hash === '#certificates' || hash === '#contact') {
    const section = document.querySelector(hash)
    if (!(section instanceof HTMLElement)) return
    scrollAfterMorseLine(section, navH)
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
