import { BeforeAfter } from './BeforeAfter'
import './Results.css'

const cases = [
  {
    title: 'Smile restoration',
    beforeSrc: '/before-after/case-1-before.png?v=4',
    afterSrc: '/before-after/case-1-after.png?v=4',
  },
  {
    title: 'Smile brightening',
    beforeSrc: '/before-after/case-2-before.png?v=4',
    afterSrc: '/before-after/case-2-after.png?v=4',
  },
]

export function Results() {
  return (
    <section id="results" className="results section">
      <div className="container">
        <header className="section-head">
          <h2 className="section-title">Before &amp; afters</h2>
        </header>

        <div className="results__grid">
          {cases.map((item) => (
            <BeforeAfter key={item.title} {...item} />
          ))}
        </div>
      </div>
    </section>
  )
}
