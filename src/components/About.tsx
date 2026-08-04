import './About.css'

export function About() {
  return (
    <section id="about" className="about section">
      <div className="container about__grid">
        <div className="about__copy">
          <div className="about__intro">
            <h1 className="about__name">Dr. Kani</h1>
          </div>

          <p className="about__role">Cosmetic &amp; Restorative Dentistry</p>

          {/* Holds the old body footprint so hero proportions stay stable */}
          <div className="about__spacer" aria-hidden="true" />
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
