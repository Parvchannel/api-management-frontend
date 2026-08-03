import { useMemo, useState } from 'react'
import StatsCard from './StatsCard.jsx'

export default function MonitorSearch({ monitors }) {
  const [query, setQuery] = useState('')

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return monitors
    return monitors.filter((m) => m.name.toLowerCase().includes(q))
  }, [monitors, query])

  return (
    <section className="panel">
      <h2 className="panel__title">Search checks</h2>
      <p className="panel__sub">Look up a check by name to see its latency and status breakdown.</p>

      <input
        className="search-input"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by name, e.g. orders-api-prod"
      />

      {monitors.length === 0 && (
        <p className="empty-state">No checks yet — add one above to see it here.</p>
      )}

      {monitors.length > 0 && results.length === 0 && (
        <p className="empty-state">No checks match "{query}".</p>
      )}

      <div className="results-grid">
        {results.map((m) => (
          <StatsCard key={m.id} monitor={m} />
        ))}
      </div>
    </section>
  )
}
