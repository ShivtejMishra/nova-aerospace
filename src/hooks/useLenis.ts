import { useEffect } from 'react'
import Lenis from 'lenis'
import { useStore } from '../store/useStore'
import { setScroll } from '../store/scroll'

let lenisInstance: Lenis | null = null

/**
 * Initializes Lenis smooth scrolling and publishes a global scroll progress
 * value into the store.
 */
export function useLenis() {
  const { reducedMotion } = useStore()

  useEffect(() => {
    if (reducedMotion) return

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
    })
    lenisInstance = lenis

    let raf = 0
    const loop = (time: number) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const p = max > 0 ? window.scrollY / max : 0
      setScroll(p)
    }
    lenis.on('scroll', onScroll)

    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
      lenisInstance = null
    }
  }, [reducedMotion])
}

export function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  if (lenisInstance) {
    lenisInstance.scrollTo(el, { offset: 0, duration: 1.4 })
  } else {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}
