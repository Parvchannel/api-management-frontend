import { useState } from 'react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Features from './components/Features.jsx'
import HowItWorks from './components/HowItWorks.jsx'
import Footer from './components/Footer.jsx'
import SignInModal from './components/SignInModal.jsx'
import Dashboard from './components/Dashboard.jsx'

export default function App() {
  const [signInOpen, setSignInOpen] = useState(false)
  const [page, setPage] = useState('landing') // 'landing' | 'dashboard'
  const [username, setUsername] = useState('')

  function handleSignInSuccess(name) {
    setUsername(name)
    setSignInOpen(false)
    setPage('dashboard')
  }

  if (page === 'dashboard') {
    return <Dashboard username={username} onSignOut={() => setPage('landing')} />
  }else{

  return (
    <>
      <Header onSignInClick={() => setSignInOpen(true)} />
      <main>
        <Hero onSignInClick={() => setSignInOpen(true)} />
        <Features />
        <HowItWorks />
      </main>
      <Footer />
      {signInOpen && (
        <SignInModal onClose={() => setSignInOpen(false)} onSuccess={handleSignInSuccess} />
      )}
    </>
  )
}
}
