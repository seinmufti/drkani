import { BeforeAfter } from './BeforeAfter'
import './Results.css'

const cases = [
  {
    title: 'Smile restoration',
    beforeSrc: '/before-after/case-1-before.jpg?v=3',
    afterSrc: '/before-after/case-1-after.jpg?v=3',
  },
  {
    title: 'Smile brightening',
    beforeSrc: '/before-after/case-2-before.jpg',
    afterSrc: '/before-after/case-2-after.jpg',
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
