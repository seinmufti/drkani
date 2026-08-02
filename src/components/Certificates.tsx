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
          <p className="section-label">Credentials</p>
          <h2 className="section-title">Certificate wall</h2>
          <p className="section-intro">
            A quiet gallery of training and clinical certifications — update
            titles, issuers, and years to match Dr. Kani&apos;s credentials.
          </p>
        </header>
      </div>

      <div className="wall" aria-label="Certificate gallery">
        <div className="wall__inner container">
          {certificates.map((cert, index) => (
            <article
              key={cert.title}
              className={`wall__frame wall__frame--${(index % 3) + 1}`}
            >
              <div className="wall__mat">
                <div className="wall__seal" aria-hidden="true" />
                <h3 className="wall__title">{cert.title}</h3>
                <p className="wall__issuer">{cert.issuer}</p>
                <p className="wall__year">{cert.year}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
