import { Suspense, lazy, useEffect, useRef } from 'react'
import { useStore } from './store/useStore'
import { useLenis } from './hooks/useLenis'
import { useActiveSection } from './hooks/useActiveSection'
import { Navbar } from './components/ui/Navbar'
import { Footer } from './components/ui/Footer'
import { CustomCursor } from './components/ui/CustomCursor'
import { Hero } from './components/sections/Hero'
import { Mission } from './components/sections/Mission'
import { Launch } from './components/sections/Launch'
import { Spacecraft } from './components/sections/Spacecraft'
import { Satellites } from './components/sections/Satellites'
import { DeepSpace } from './components/sections/DeepSpace'
import { Technology } from './components/sections/Technology'
import { Timeline } from './components/sections/Timeline'
import { Impact } from './components/sections/Impact'
import { Careers } from './components/sections/Careers'
import { News } from './components/sections/News'
import { Contact } from './components/sections/Contact'

const BackgroundCanvas = lazy(() => import('./three/BackgroundCanvas'))

export default function App() {
  const { theme, setPaused } = useStore()
  useLenis()
  useActiveSection()

  // Pause all WebGL rendering when the tab is hidden (battery/CPU).
  useEffect(() => {
    const onVis = () => setPaused(document.hidden)
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [setPaused])

  // Subtle transition flash on theme change (skips initial mount).
  const mounted = useRef(false)
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
      return
    }
    const el = document.createElement('div')
    el.style.cssText =
      'position:fixed;inset:0;z-index:90;pointer-events:none;background:' +
      (theme === 'dark' ? '#03040a' : '#e9eefb') +
      ';opacity:0;transition:opacity .5s ease;'
    document.body.appendChild(el)
    requestAnimationFrame(() => {
      el.style.opacity = '0.45'
      setTimeout(() => {
        el.style.opacity = '0'
        setTimeout(() => el.remove(), 600)
      }, 60)
    })
  }, [theme])

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-nova-blue focus:px-4 focus:py-2 focus:text-space-950"
      >
        Skip to content
      </a>

      <div className="fixed inset-0 -z-10">
        <Suspense fallback={<div className="h-full w-full bg-space-950" />}>
          <BackgroundCanvas />
        </Suspense>
      </div>

      <CustomCursor />
      <Navbar />

      <main id="main">
        <Hero />
        <Mission />
        <Launch />
        <Spacecraft />
        <Satellites />
        <DeepSpace />
        <Technology />
        <Timeline />
        <Impact />
        <Careers />
        <News />
        <Contact />
      </main>

      <Footer />
    </>
  )
}
