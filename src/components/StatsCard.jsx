import { computeStats } from '../lib/stats.js'

function toneFor(bucket) {
  if (bucket === '2xx' || bucket === '3xx') return 'ok'
  if (bucket === '4xx') return 'warn'
  return 'down'
}

function formatInterval(intervalMs) {
  if (!intervalMs) return '—'
  const sec = intervalMs / 1000
  if (sec < 60) return `${sec}s`
  if (sec % 60 === 0) return `${sec / 60}m`
  return `${sec}s`
}

export default function StatsCard({ monitor }) {
  const stats = computeStats(monitor.checkHistory)

  return (
    <article className="stats-card">
      <div className="stats-card__head">
        <div>
          <h3 className="stats-card__name">{monitor.name}</h3>
          <p className="stats-card__meta">
            {monitor.method} · {monitor.url}
          </p>
        </div>
        <span className="stats-card__interval">every {formatInterval(monitor.intervalMs)}</span>
      </div>

      {!stats ? (
        <p className="empty-state">Waiting on the first check…</p>
      ) : (
        <>
          <div className="stats-card__latency">
            <div>
              <span className="stats-card__value">{stats.best}ms</span>
              <span className="stats-card__label">Best</span>
            </div>
            <div>
              <span className="stats-card__value">{stats.median}ms</span>
              <span className="stats-card__label">Median</span>
            </div>
            <div>
              <span className="stats-card__value">{stats.avg}ms</span>
              <span className="stats-card__label">Average</span>
            </div>
            <div>
              <span className="stats-card__value">{stats.worst}ms</span>
              <span className="stats-card__label">Worst</span>
            </div>
          </div>

          <div className="stats-card__breakdown">
            {stats.breakdown.map((b) => (
              <div className="breakdown-row" key={b.key}>
                <span className={`breakdown-row__key breakdown-row__key--${toneFor(b.key)}`}>
                  {b.key}
                </span>
                <div className="breakdown-row__bar">
                  <div
                    className={`breakdown-row__fill breakdown-row__fill--${toneFor(b.key)}`}
                    style={{ width: `${b.pct}%` }}
                  />
                </div>
                <span className="breakdown-row__pct">{b.pct.toFixed(0)}%</span>
              </div>
            ))}
          </div>

          <p className="stats-card__count">{stats.total} checks recorded</p>
        </>
      )}
    </article>
  )
}
