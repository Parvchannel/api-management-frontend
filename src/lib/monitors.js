export const MONITORS_API = '/api-monitors'

export async function fetchMonitor(id) {
  const res = await fetch(`${MONITORS_API}/${id}`)
  if (!res.ok) throw new Error('Failed to fetch monitor')
  return res.json()
}

export async function refreshMonitors(current) {
  return Promise.all(
    current.map(async (m) => {
      try {
        const data = await fetchMonitor(m.id)
        return { name: m.name, method: m.method, ...data }
      } catch {
        return m
      }
    }),
  )
}
