import './Header.css'

export default function Header({ onSignInClick }) {
  return (
    <header className="header">
      <div className="container header__row">
        <a href="#top" className="header__logo">
          <span className="header__dot" aria-hidden="true" />
          pulsecheck
        </a>

        <nav className="header__nav">
          <a href="#features">Monitoring</a>
          <a href="#how-it-works">Setup</a>
        </nav>

        <button className="header__cta" onClick={onSignInClick}>
          Sign in
        </button>
      </div>
    </header>
  )
}
