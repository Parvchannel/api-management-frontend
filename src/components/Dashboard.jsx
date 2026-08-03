import { useEffect, useState } from 'react'
import DashboardHeader from './DashboardHeader.jsx'
import AddMonitorForm from './AddMonitorForm.jsx'
import MonitorSearch from './MonitorSearch.jsx'
import { nextId, seedChecks, simulateCheck } from '../lib/stats.js'
import './Dashboard.css'

export default function Dashboard({ username, onSignOut }) {
  const [monitors, setMonitors] = useState([])

  function handleAddMonitor(config) {
    const monitor = {
      id: nextId('mon'),
      ...config,
      checks: seedChecks(28),
    }
    setMonitors((prev) => [monitor, ...prev])
  }

  // Simulated background checking: every couple seconds, each monitor
  // that's "due" (based on its configured interval) gets a new result.
  // No real network calls are made — this is demo data standing in for
  // what a live monitoring backend would report.
  useEffect(() => {
    const tick = setInterval(() => {
      setMonitors((prev) =>
        prev.map((m) => {
          const due = Math.random() < Math.min(1, 3 / Math.max(m.interval, 3))
          if (!due) return m
          const checks = [...m.checks, simulateCheck()].slice(-60)
          return { ...m, checks }
        }),
      )
    }, 2000)
    return () => clearInterval(tick)
  }, [])

  return (
    <div className="dashboard">
      <DashboardHeader username={username} onSignOut={onSignOut} />
      <main className="container dashboard__main">
        <AddMonitorForm onAdd={handleAddMonitor} />
        <MonitorSearch monitors={monitors} />
      </main>
    </div>
  )
}
