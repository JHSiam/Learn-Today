import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Outlet } from 'react-router-dom'
import Particles from './components/Particles'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />

      {/* w-full h-screen relative bg-black */}
      <div className="relative w-full min-h-screen bg-black overflow-hidden">


        {/* Animated Background Layer */}
        <div className="absolute inset-0 z-0">
          <Particles
            particleColors={['#ffffff', '#ffffff']}
            particleCount={200}
            particleSpread={10}
            speed={0.1}
            particleBaseSize={100}
            moveParticlesOnHover={true}
            alphaParticles={false}
            disableRotation={false}
          />
        </div>

        {/* Content Layer */}
        <div className="relative z-10">

          <div className="max-w-[1380px] mx-auto">
            <Outlet />
          </div>
          <Footer />
        </div>

      </div>




    </>
  )
}

export default App
