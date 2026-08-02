import { BeforeAfter } from './BeforeAfter'
import './Results.css'

const cases = [
  {
    title: 'Smile restoration',
    caption: 'Gaps closed and shade refined for a balanced, natural smile.',
    beforeSrc: '/before-after/case-1-before.jpg?v=2',
    afterSrc: '/before-after/case-1-after.jpg?v=2',
  },
  {
    title: 'Smile brightening',
    caption: 'Brighter shade and even contours for a refined finish.',
    beforeSrc: '/before-after/case-2-before.jpg',
    afterSrc: '/before-after/case-2-after.jpg',
  },
]

export function Results() {
  return (
    <section id="results" className="results section">
      <div className="container">
        <header className="section-head">
          <p className="section-label">Results</p>
          <h2 className="section-title">Before &amp; after</h2>
          <p className="section-intro">
            Drag the handle left or right to compare each case.
          </p>
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
