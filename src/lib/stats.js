let idCounter = 0
export function nextId(prefix = 'id') {
  idCounter += 1
  return `${prefix}-${Date.now()}-${idCounter}`
}

// Generates one simulated check result. Latency is mostly fast with an
// occasional slow tail, and status is mostly 2xx with rare 4xx/5xx —
// just enough variance to make the stats below feel real.
export function simulateCheck() {
  const roll = Math.random()
  let status
  if (roll > 0.97) status = [500, 502, 503][Math.floor(Math.random() * 3)]
  else if (roll > 0.9) status = [400, 404, 429][Math.floor(Math.random() * 3)]
  else if (roll > 0.86) status = 301
  else status = [200, 200, 200, 201][Math.floor(Math.random() * 4)]

  const base = 60 + Math.random() * 140
  const spike = roll > 0.95 ? Math.random() * 1800 : 0
  const latency = Math.round(base + spike)

  return {
    id: nextId('chk'),
    ts: Date.now(),
    status,
    latency,
  }
}

export function seedChecks(count = 30) {
  return Array.from({ length: count }, () => simulateCheck())
}

function median(sorted) {
  const mid = Math.floor(sorted.length / 2)
  return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2
}

export function computeStats(checks) {
  if (!checks || checks.length === 0) return null

  const latencies = checks.map((c) => c.latency).sort((a, b) => a - b)
  const avg = latencies.reduce((sum, n) => sum + n, 0) / latencies.length

  const buckets = { '2xx': 0, '3xx': 0, '4xx': 0, '5xx': 0 }
  checks.forEach((c) => {
    const key = `${Math.floor(c.status / 100)}xx`
    if (buckets[key] === undefined) buckets[key] = 0
    buckets[key] += 1
  })

  const total = checks.length
  const breakdown = Object.entries(buckets)
    .filter(([, n]) => n > 0)
    .map(([key, n]) => ({ key, count: n, pct: (n / total) * 100 }))
    .sort((a, b) => b.pct - a.pct)

  return {
    total,
    best: latencies[0],
    worst: latencies[latencies.length - 1],
    avg: Math.round(avg),
    median: Math.round(median(latencies)),
    breakdown,
  }
}
