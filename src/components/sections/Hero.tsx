import { Suspense, lazy, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { useStore } from '../../store/useStore'
import { scrollToId } from '../../hooks/useLenis'
import { MagneticButton } from '../ui/MagneticButton'

const HeroCanvas = lazy(() => import('../../three/HeroCanvas'))

export function Hero() {
  const { reducedMotion } = useStore()
  const rootRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const [heroVisible, setHeroVisible] = useState(true)

  useEffect(() => {
    const node = rootRef.current
    if (!node || typeof IntersectionObserver === 'undefined') return
    const obs = new IntersectionObserver(([e]) => setHeroVisible(e.isIntersecting), {
      threshold: 0.05,
    })
    obs.observe(node)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (reducedMotion || !titleRef.current) return
    const ctx = gsap.context(() => {
      gsap.from('.hero-line', {
        yPercent: 120,
        opacity: 0,
        duration: 1.1,
        ease: 'power4.out',
        stagger: 0.12,
        delay: 0.3,
      })
      gsap.from('.hero-sub', { opacity: 0, y: 24, duration: 1, delay: 0.9 })
      gsap.from('.hero-cta', { opacity: 0, y: 24, duration: 1, delay: 1.1, stagger: 0.1 })
    }, rootRef)
    return () => ctx.revert()
  }, [reducedMotion])

  return (
    <section
      id="hero"
      ref={rootRef}
      className="relative flex h-[100svh] min-h-[640px] w-full items-center justify-center overflow-hidden"
    >
      {/* 3D interactive spacecraft */}
      <div className="absolute inset-0 z-0">
        {heroVisible && (
          <Suspense
            fallback={
              <div className="flex h-full w-full items-center justify-center">
                <div className="h-40 w-40 animate-spin-slow rounded-full border-2 border-nova-cyan/30 border-t-nova-cyan" />
              </div>
            }
          >
            <HeroCanvas />
          </Suspense>
        )}
      </div>

      {/* Readability gradient */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-space-950/30 via-transparent to-space-950/80" />

      {/* Content */}
      <div className="section-shell relative z-10 flex flex-col items-center text-center">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="eyebrow mb-5"
        >
          Beyond the Horizon
        </motion.span>

        <h1
          ref={titleRef}
          className="font-display text-5xl font-bold leading-[0.95] tracking-tight md:text-7xl lg:text-8xl"
        >
          <span className="block overflow-hidden">
            <span className="hero-line block">We Build the</span>
          </span>
          <span className="block overflow-hidden">
            <span className="hero-line block text-gradient">Road to the Stars</span>
          </span>
        </h1>

        <p className="hero-sub mt-6 max-w-xl text-pretty text-base text-[color:var(--muted)] md:text-lg">
          Nova Aerospace designs reusable launch vehicles, satellite constellations, and
          deep-space habitats — engineering humanity&apos;s permanent presence beyond Earth.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <div className="hero-cta">
            <MagneticButton onClick={() => scrollToId('launch')} className="btn-primary" ariaLabel="Explore launches">
              Explore Launches
              <span aria-hidden>→</span>
            </MagneticButton>
          </div>
          <div className="hero-cta">
            <MagneticButton onClick={() => scrollToId('mission')} className="btn-ghost" ariaLabel="Our mission">
              Our Mission
            </MagneticButton>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        type="button"
        onClick={() => scrollToId('mission')}
        aria-label="Scroll to next section"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        animate={reducedMotion ? undefined : { y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="flex h-10 w-6 items-start justify-center rounded-full border border-[color:var(--glass-border)] p-1.5">
          <span className="h-2 w-1 rounded-full bg-nova-cyan" />
        </span>
      </motion.button>
    </section>
  )
}
