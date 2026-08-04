import './AboutMe.css'

export function AboutMe() {
  return (
    <section id="about-me" className="about-me section">
      <div className="container">
        <header className="section-head">
          <h2 className="section-title">About me</h2>
        </header>

        <p className="about-me__text">
          Dedicated to calm, precise care in a modern clinical setting. Dr. Kani
          focuses on natural-looking restorations, thoughtful smile design, and
          treatments that respect both function and aesthetics.
        </p>

        <a href="#contact" className="about-me__cta">
          Book a consultation
        </a>
      </div>
    </section>
  )
}
