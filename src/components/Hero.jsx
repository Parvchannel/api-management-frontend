import { useEffect, useState } from 'react'
import './Hero.css'

const SAMPLE_CHECKS = [
  { method: 'GET', path: '/v1/orders', status: 200, ms: 84 },
  { method: 'GET', path: '/v1/orders', status: 200, ms: 91 },
  { method: 'POST', path: '/v1/webhooks/stripe', status: 201, ms: 142 },
  { method: 'GET', path: '/v1/orders', status: 200, ms: 210 },
  { method: 'GET', path: '/v1/orders', status: 503, ms: 3004 },
  { method: 'GET', path: '/v1/orders', status: 200, ms: 88 },
  { method: 'POST', path: '/v1/auth/refresh', status: 200, ms: 63 },
  { method: 'GET', path: '/v1/orders', status: 200, ms: 79 },
  { method: 'GET', path: '/v1/inventory', status: 429, ms: 320 },
  { method: 'GET', path: '/v1/orders', status: 200, ms: 95 },
]

function statusTone(status) {
  if (status >= 500) return 'down'
  if (status >= 400) return 'warn'
  return 'ok'
}

export default function Hero({ onSignInClick }) {
  const [lines, setLines] = useState(() => [{ ...SAMPLE_CHECKS[0], id: 0 }])
  const [cursor, setCursor] = useState(1)

  useEffect(() => {
    const interval = setInterval(() => {
      setLines((prev) => {
        const next = [...prev, { ...SAMPLE_CHECKS[cursor % SAMPLE_CHECKS.length], id: prev.length }]
        return next.slice(-6)
      })
      setCursor((c) => c + 1)
    }, 1400)
    return () => clearInterval(interval)
  }, [cursor])

  const last = lines[lines.length - 1]

  return (
    <section className="hero" id="top">
      <div className="container hero__grid">
        <div className="hero__copy">
          <p className="hero__eyebrow">Uptime &amp; latency monitoring</p>
          <h1 className="hero__headline">
            Point it at an endpoint.
            <br />
            It watches the pulse.
          </h1>
          <p className="hero__sub">
            Give Pulsecheck a URL, a method, an optional body, and how often to ask.
            It calls your API on schedule and tells you the moment downtime, slow
            responses, or bad status codes show up — before your customers do.
          </p>
          <div className="hero__actions">
            <button className="btn btn--primary" onClick={onSignInClick}>
              Start monitoring
            </button>
            <a className="btn btn--ghost" href="#how-it-works">
              See how checks run
            </a>
          </div>
          <div className="hero__stats">
            <div>
              <span className="hero__stat-value">10s</span>
              <span className="hero__stat-label">fastest check interval</span>
            </div>
            <div>
              <span className="hero__stat-value">GET/POST/PUT</span>
              <span className="hero__stat-label">plus custom bodies</span>
            </div>
          </div>
        </div>

        <div className="hero__panel" aria-label="Live example of a monitored endpoint">
          <div className="terminal">
            <div className="terminal__chrome">
              <span className="terminal__dot" style={{ background: '#f2495c' }} />
              <span className="terminal__dot" style={{ background: '#f5a623' }} />
              <span className="terminal__dot" style={{ background: '#4ce0c0' }} />
              <span className="terminal__title">watching · api.yourapp.com/v1/orders</span>
            </div>
            <div className="terminal__body">
              {lines.map((line) => (
                <div className="terminal__line" key={line.id}>
                  <span className={`dot dot--${statusTone(line.status)}`} />
                  <span className="terminal__method">{line.method}</span>
                  <span className="terminal__path">{line.path}</span>
                  <span className={`terminal__status terminal__status--${statusTone(line.status)}`}>
                    {line.status}
                  </span>
                  <span className="terminal__ms">{line.ms}ms</span>
                </div>
              ))}
              <div className="terminal__cursor-row">
                <span className="terminal__cursor" />
                <span>next check in progress…</span>
              </div>
            </div>
          </div>
          <p className="hero__panel-caption">
            Last response{' '}
            <span className={`inline-tone inline-tone--${statusTone(last.status)}`}>
              {last.status}
            </span>{' '}
            in {last.ms}ms — simulated example, your dashboard shows real checks.
          </p>
        </div>
      </div>
    </section>
  )
}
