import { useEffect } from 'react'
import { NAV_ITEMS } from '../data/nav'
import { useStore } from '../store/useStore'

/** Tracks which section is currently in view and updates the store + URL hash. */
export function useActiveSection() {
  const { setActiveSection } = useStore()

  useEffect(() => {
    const ids = NAV_ITEMS.map((n) => n.id)
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el)

    if (typeof IntersectionObserver === 'undefined' || sections.length === 0) return

    const visible = new Map<string, number>()
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          visible.set(e.target.id, e.isIntersecting ? e.intersectionRatio : 0)
        }
        let best = ''
        let bestRatio = 0
        visible.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            bestRatio = ratio
            best = id
          }
        })
        if (best) setActiveSection(best)
      },
      { threshold: [0.15, 0.35, 0.6], rootMargin: '-20% 0px -20% 0px' },
    )

    sections.forEach((s) => obs.observe(s))
    return () => obs.disconnect()
  }, [setActiveSection])
}
