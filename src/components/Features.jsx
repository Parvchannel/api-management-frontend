import './Features.css'

const FEATURES = [
  {
    label: 'Uptime',
    title: 'Know the second it goes down',
    body: 'Every check is timestamped and logged. If a request fails, times out, or the connection drops, Pulsecheck marks the incident and starts the clock on your downtime window.',
  },
  {
    label: 'Latency',
    title: 'Watch response time drift',
    body: 'Track response time on every call and see it trend over hours, days, and weeks — so a slow creep toward timeouts shows up long before it becomes an outage.',
  },
  {
    label: 'Status codes',
    title: 'Catch quiet failures too',
    body: "A 200 doesn't always mean healthy. Pulsecheck flags 4xx and 5xx responses, unexpected status changes, and can also check the body of the response for other data.",
  },
]

export default function Features() {
  return (
    <section className="features" id="features">
      <div className="container">
        <h2 className="features__heading">What each check is watching for</h2>
        <div className="features__grid">
          {FEATURES.map((f) => (
            <article className="feature-card" key={f.label}>
              <p className="feature-card__label">{f.label}</p>
              <h3 className="feature-card__title">{f.title}</h3>
              <p className="feature-card__body">{f.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
