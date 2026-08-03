import { useState } from 'react'

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

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.name.trim() || !form.url.trim()) {
      setError('Give the check a name and an endpoint URL.')
      return
    }
    setError('')
    onAdd({
      name: form.name.trim(),
      url: form.url.trim(),
      method: form.method,
      interval: Number(form.interval),
      body: form.body.trim(),
    })
    setForm(initialForm)
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

        <button className="btn btn--primary add-form__submit" type="submit">
          Add check
        </button>

        {error && <p className="add-form__error">{error}</p>}
      </form>
    </section>
  )
}
