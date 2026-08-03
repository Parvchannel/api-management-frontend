import './Header.css'

export default function DashboardHeader({ username, onSignOut }) {
  return (
    <header className="header">
      <div className="container header__row">
        <a href="#" className="header__logo">
          <span className="header__dot" aria-hidden="true" />
          pulsecheck
        </a>
        <p className="dash-header__user">Signed in as {username}</p>
        <button className="header__cta" onClick={onSignOut}>
          Sign out
        </button>
      </div>
    </header>
  )
}
