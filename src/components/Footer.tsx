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
          <NordlysMark className="footer__mark" />
          <span className="footer__credit-text">
            Developed by <strong>nordlys</strong>
          </span>
        </p>
      </div>
    </footer>
  )
}
