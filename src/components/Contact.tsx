import { useEffect, useState } from 'react'
import { Footer } from './Footer'
import { PlantPot } from './PlantPot'
import './Contact.css'

/** Desktop-only plant decor — skip mount on mobile so heavy PNGs never download. */
function useDesktopDecor() {
  const [show, setShow] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(min-width: 901px)').matches,
  )

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 901px)')
    const onChange = () => setShow(mq.matches)
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return show
}

export function Contact() {
  const showPlants = useDesktopDecor()

  return (
    <section id="contact" className="contact section">
      <div className="container contact__grid">
        <div className="contact__copy">
          <h2 className="section-title">Get in touch</h2>
          <p className="section-intro">
            Reach out for consultations, appointments, or clinical questions.
            A calm reply typically follows within one business day.
          </p>

          <dl className="contact__details">
            <div>
              <dt>Clinic</dt>
              <dd>Coral Dental Clinic</dd>
            </div>
            <div>
              <dt>Phone</dt>
              <dd>
                <a href="tel:+9647504140225">+964 750 414 0225</a>
              </dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>
                <a href="mailto:drkani@gmail.com">drkani@gmail.com</a>
              </dd>
            </div>
            <div>
              <dt>Hours</dt>
              <dd>Mon–Fri, 9:00–17:00</dd>
            </div>
          </dl>

          {showPlants ? (
            <div className="contact__plants" aria-hidden="true">
              <PlantPot variant="leafy" className="contact__pot contact__pot--lg" />
              <PlantPot variant="round" className="contact__pot contact__pot--sm" />
            </div>
          ) : null}
        </div>

        <div className="contact__side">
          {showPlants ? (
            <div className="contact__plants contact__plants--edge" aria-hidden="true">
              <PlantPot variant="trail" className="contact__pot contact__pot--edge" />
            </div>
          ) : null}

          <div className="contact__map">
            <iframe
              className="contact__map-frame"
              title="Clinic location on Google Maps"
              src="https://maps.google.com/maps?q=36.18775884219302,43.96851291215664&z=16&hl=en&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </div>

      <Footer />
    </section>
  )
}
