function median(sorted) {
  const mid = Math.floor(sorted.length / 2)
  return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2
}

export function computeStats(checkHistory) {
  if (!checkHistory || checkHistory.length === 0) return null

  const latencies = checkHistory
    .map((c) => c.responseTimeMs)
    .filter((n) => n != null)
    .sort((a, b) => a - b)

  if (latencies.length === 0) return null

  const avg = latencies.reduce((sum, n) => sum + n, 0) / latencies.length

  const buckets = { '2xx': 0, '3xx': 0, '4xx': 0, '5xx': 0 }
  checkHistory.forEach((c) => {
    if (c.statusCode == null) return
    const key = `${Math.floor(c.statusCode / 100)}xx`
    if (key in buckets) buckets[key] += 1
  })

  const total = checkHistory.length
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
    buckets,
  }
}
