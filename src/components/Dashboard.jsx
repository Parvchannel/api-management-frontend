import { useEffect, useState } from 'react'
import DashboardHeader from './DashboardHeader.jsx'
import AddMonitorForm from './AddMonitorForm.jsx'
import MonitorSearch from './MonitorSearch.jsx'
import { refreshMonitors } from '../lib/monitors.js'
import './Dashboard.css'

export default function Dashboard({ username, onSignOut }) {
  const [monitors, setMonitors] = useState([])

  function handleAddMonitor(monitor) {
    setMonitors((prev) => [monitor, ...prev])
  }

  useEffect(() => {
    const tick = setInterval(() => {
      setMonitors((prev) => {
        if (prev.length === 0) return prev
        refreshMonitors(prev).then(setMonitors)
        return prev
      })
    }, 5000)
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
