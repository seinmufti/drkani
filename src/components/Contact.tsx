import { useState, type FormEvent } from 'react'
import { PlantPot } from './PlantPot'
import './Contact.css'

export function Contact() {
  const [sent, setSent] = useState(false)

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSent(true)
  }

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
              <dd>Modern Dental Studio</dd>
            </div>
            <div>
              <dt>Phone</dt>
              <dd>
                <a href="tel:+10000000000">+1 (000) 000-0000</a>
              </dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>
                <a href="mailto:hello@drkani.clinic">hello@drkani.clinic</a>
              </dd>
            </div>
            <div>
              <dt>Hours</dt>
              <dd>Mon–Fri, 9:00–17:00</dd>
            </div>
          </dl>

          <div className="contact__plants" aria-hidden="true">
            <PlantPot variant="small" className="contact__pot contact__pot--xs" />
            <PlantPot variant="leafy" className="contact__pot contact__pot--lg" />
            <PlantPot variant="round" className="contact__pot contact__pot--sm" />
          </div>
        </div>

        <div className="contact__side">
          <div className="contact__plants contact__plants--edge" aria-hidden="true">
            <PlantPot variant="trail" className="contact__pot contact__pot--edge" />
          </div>

          <form className="contact__form" onSubmit={onSubmit}>
            <label className="contact__field">
              <span>Name</span>
              <input name="name" type="text" autoComplete="name" required />
            </label>

            <label className="contact__field">
              <span>Email</span>
              <input name="email" type="email" autoComplete="email" required />
            </label>

            <label className="contact__field">
              <span>Message</span>
              <textarea name="message" rows={3} required />
            </label>

            <button className="contact__submit" type="submit">
              Send message
            </button>

            {sent ? (
              <p className="contact__note" role="status">
                Thank you. Your message is ready — connect this form to your email
                or booking tool when you deploy.
              </p>
            ) : null}
          </form>
        </div>
      </div>
    </section>
  )
}
