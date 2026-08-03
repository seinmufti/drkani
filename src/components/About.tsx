import './About.css'

export function About() {
  return (
    <section id="about" className="about section">
      <div className="container about__grid">
        <div className="about__copy">
          <div className="about__intro">
            <h1 className="about__name">Dr. Kani</h1>
            <p className="about__role">Cosmetic &amp; Restorative Dentistry</p>
          </div>

          <div className="about__body">
            <p className="section-label">About me</p>
            <p className="about__text">
              Dedicated to calm, precise care in a modern clinical setting. Dr. Kani
              focuses on natural-looking restorations, thoughtful smile design, and
              treatments that respect both function and aesthetics.
            </p>
            <a href="#contact" className="about__cta">
              Book a consultation
            </a>
          </div>
        </div>

        <figure className="about__portrait">
          <img
            src="/dr-kani.jpg?v=2"
            alt="Dr. Kani in the clinic"
            width={900}
            height={1200}
          />
        </figure>
      </div>
    </section>
  )
}
