import { useState } from 'react'
import { MONITORS_API, fetchMonitor } from '../lib/monitors.js'

const METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
const INTERVALS = [
  { label: '10s', value: 10 },
  { label: '30s', value: 30 },
  { label: '60s', value: 60 },
  { label: '5m', value: 300 },
  { label: '15m', value: 900 },
]

const initialForm = {
  name: '',
  url: '',
  method: 'GET',
  interval: 60,
  body: '',
}

export default function AddMonitorForm({ onAdd }) {
  const [form, setForm] = useState(initialForm)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.name.trim() || !form.url.trim()) {
      setError('Give the check a name and an endpoint URL.')
      return
    }
    setError('')
    setSubmitting(true)
    try {
      const res = await fetch(MONITORS_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: form.url.trim(),
          intervalMs: Number(form.interval) * 1000,
        }),
      })
      if (!res.ok) throw new Error('Request failed')
      const created = await res.json()
      const monitor = await fetchMonitor(created.id)

      onAdd({
        name: form.name.trim(),
        method: form.method,
        ...monitor,
      })
      setForm(initialForm)
    } catch {
      setError("Couldn't add the check. Try again in a moment.")
    } finally {
      setSubmitting(false)
    }
  }

  const showBody = form.method === 'POST' || form.method === 'PUT' || form.method === 'PATCH'

  return (
    <section className="panel">
      <h2 className="panel__title">Add a new check</h2>
      <p className="panel__sub">Give it a name, tell it what to call, and how often.</p>

      <form className="add-form" onSubmit={handleSubmit}>
        <label className="field field--name">
          <span>Name</span>
          <input
            type="text"
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
            placeholder="orders-api-prod"
          />
        </label>

        <label className="field field--url">
          <span>Endpoint URL</span>
          <input
            type="text"
            value={form.url}
            onChange={(e) => update('url', e.target.value)}
            placeholder="https://api.yourapp.com/v1/orders"
          />
        </label>

        <label className="field field--method">
          <span>Method</span>
          <select value={form.method} onChange={(e) => update('method', e.target.value)}>
            {METHODS.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </label>

        <label className="field field--interval">
          <span>Check every</span>
          <select value={form.interval} onChange={(e) => update('interval', e.target.value)}>
            {INTERVALS.map((i) => (
              <option key={i.value} value={i.value}>
                {i.label}
              </option>
            ))}
          </select>
        </label>

        {showBody && (
          <label className="field field--body">
            <span>Request body (optional)</span>
            <textarea
              value={form.body}
              onChange={(e) => update('body', e.target.value)}
              placeholder='{ "key": "value" }'
              rows={3}
            />
          </label>
        )}

        <button className="btn btn--primary add-form__submit" type="submit" disabled={submitting}>
          {submitting ? 'Adding…' : 'Add check'}
        </button>

        {error && <p className="add-form__error">{error}</p>}
      </form>
    </section>
  )
}
