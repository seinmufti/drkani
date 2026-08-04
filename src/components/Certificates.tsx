import './Certificates.css'

const certificates = [
  {
    title: 'Doctor of Dental Surgery',
    issuer: 'Faculty of Dentistry',
    year: '2014',
  },
  {
    title: 'Cosmetic Dentistry Certificate',
    issuer: 'Aesthetic Restorative Institute',
    year: '2017',
  },
  {
    title: 'Advanced Implantology',
    issuer: 'International Implant Academy',
    year: '2018',
  },
  {
    title: 'Digital Smile Design',
    issuer: 'DSD Continuum',
    year: '2019',
  },
  {
    title: 'Endodontics Masterclass',
    issuer: 'Clinical Endo Society',
    year: '2020',
  },
  {
    title: 'Periodontal Therapy',
    issuer: 'Soft Tissue Institute',
    year: '2021',
  },
]

export function Certificates() {
  return (
    <section id="certificates" className="certificates section">
      <div className="container">
        <header className="section-head certificates__head">
          <h2 className="section-title">Credentials</h2>
        </header>
      </div>

      <div className="wall" aria-label="Credentials gallery">
        <div className="wall__inner container">
          {certificates.map((cert, index) => (
            <article
              key={cert.title}
              className={`wall__frame wall__frame--${(index % 3) + 1}`}
            >
              <div className="wall__mat">
                <p className="wall__eyebrow">Certificate</p>
                <h3 className="wall__title">{cert.title}</h3>
                <p className="wall__issuer">{cert.issuer}</p>

                <div className="wall__footer">
                  <div className="wall__sign">
                    <span className="wall__flourish" aria-hidden="true">
                      Dr. Kani
                    </span>
                    <span className="wall__sign-line" aria-hidden="true" />
                    <span className="wall__sign-label">Authorized</span>
                  </div>

                  <div className="wall__ribbon" aria-hidden="true">
                    <span className="wall__ribbon-tails" />
                    <span className="wall__ribbon-seal" />
                  </div>

                  <div className="wall__date">
                    <span className="wall__year">{cert.year}</span>
                    <span className="wall__date-line" aria-hidden="true" />
                    <span className="wall__date-label">Awarded</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
