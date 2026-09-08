import type { MouseEvent } from 'react'
import { scrollToSectionHash } from '../scrollToSection'
import './About.css'

export function About() {
  const onBookClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    requestAnimationFrame(() => scrollToSectionHash('#contact'))
  }

  return (
    <section id="introduction" className="about section">
      <div className="container about__grid">
        <div className="about__copy">
          <div className="about__intro">
            <h1 className="about__name">Dr. Kani</h1>
            <p className="about__role">Cosmetic &amp; Restorative Dentistry</p>
          </div>

          <blockquote className="about__quote">
            <div className="about__quote-body">
              <p>Every smile tells a story.</p>
              <p>I help write the best one.</p>
            </div>
          </blockquote>

          <a href="#contact" className="about__cta" onClick={onBookClick}>
            Book a consultation
          </a>
        </div>

        <figure className="about__portrait">
          <img
            src={`${import.meta.env.BASE_URL}dr-kani.jpg?v=2`}
            alt="Dr. Kani in the clinic"
            width={900}
            height={1200}
          />
        </figure>
      </div>
    </section>
  )
}
