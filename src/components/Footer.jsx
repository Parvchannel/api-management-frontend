import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__row">
        <a href="#top" className="footer__logo">
          <span className="header__dot" aria-hidden="true" />
          pulsecheck
        </a>
        <p className="footer__note">Built to watch your API so you don't have to.</p>
        <p className="footer__copy">© {new Date().getFullYear()} Pulsecheck</p>
      </div>
    </footer>
  )
}
