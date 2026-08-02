import logo from './logo.svg';
import './App.css';
import { useState } from 'react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Features from './components/Features.jsx'
import HowItWorks from './components/HowItWorks.jsx'
import Footer from './components/Footer.jsx'
import SignInModal from './components/SignInModal.jsx'
function App() {
  const [signInOpen, setSignInOpen] = useState(false)
  
     return (
        <>
          <Header onSignInClick={() => setSignInOpen(true)} />
          <main>
            <Hero onSignInClick={() => setSignInOpen(true)} />
            <Features />
            <HowItWorks />
          </main>
          <Footer />
          {signInOpen && <SignInModal onClose={() => setSignInOpen(false)} />}
        </>
      )
  
}

export default App;
