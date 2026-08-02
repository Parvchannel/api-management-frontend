import { useEffect, useRef, useState } from 'react'
import './SignInModal.css'

// Sample/demo endpoint only. In a real build this would hit your own
// auth API, which would look up the username and either sign the person
// in or create a new account on first use.
const SAMPLE_AUTH_ENDPOINT = 'https://jsonplaceholder.typicode.com/users'

export default function SignInModal({ onClose }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [message, setMessage] = useState('')
  const dialogRef = useRef(null)

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    dialogRef.current?.focus()
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  async function handleSubmit(e) {
    e.preventDefault()
    if (!username.trim() || !password.trim()) {
      setStatus('error')
      setMessage('Enter a username and password to continue.')
      return
    }

    setStatus('loading')
    setMessage('')

    try {
      const res = await fetch(SAMPLE_AUTH_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })

      if (!res.ok) throw new Error('Request failed')
      await res.json()

      setStatus('success')
      setMessage(`Welcome, ${username}. Your account is ready.`)
    } catch (err) {
      setStatus('error')
      setMessage("Couldn't reach the sample API. Try again in a moment.")
    }
  }

  return (
    <div className="modal-overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="sign-in-heading"
        ref={dialogRef}
        tabIndex={-1}
      >
        <button className="modal__close" onClick={onClose} aria-label="Close sign in dialog">
          ×
        </button>

        <p className="modal__eyebrow">pulsecheck</p>
        <h2 className="modal__heading" id="sign-in-heading">
          Sign in or create an account
        </h2>
        <p className="modal__sub">
          One username and password gets you in — new here, and we set up your account
          automatically.
        </p>

        <form className="modal__form" onSubmit={handleSubmit}>
          <label className="modal__field">
            <span>Username</span>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="jane_dev"
              autoComplete="username"
            />
          </label>

          <label className="modal__field">
            <span>Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </label>

          <button className="btn btn--primary modal__submit" type="submit" disabled={status === 'loading'}>
            {status === 'loading' ? 'Checking…' : 'Continue'}
          </button>

          {message && (
            <p className={`modal__message modal__message--${status}`} role="status">
              {message}
            </p>
          )}
        </form>

        <p className="modal__footnote">
          Demo only — this calls a public sample API, not a real account system.
        </p>
      </div>
    </div>
  )
}
