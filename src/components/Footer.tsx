import { NordlysMark } from './NordlysMark'
import './Footer.css'

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p className="footer__brand">kani</p>

        <p className="footer__copy">
          © {new Date().getFullYear()} All rights reserved.
        </p>

        <p className="footer__credit">
          <span className="footer__credit-text">
            Developed by{' '}
            <span className="footer__credit-brand">
              <strong>nordlys</strong>
              <NordlysMark className="footer__mark" />
            </span>
          </span>
        </p>
      </div>
    </footer>
  )
}
