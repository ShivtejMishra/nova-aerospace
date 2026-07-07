import { useEffect, useRef, useState } from 'react'

/**
 * Animates a number from 0 to `target` when `active` becomes true.
 * Respects reduced-motion by snapping to the final value.
 */
export function useCountUp(
  target: number,
  active: boolean,
  duration = 2000,
  decimals = 0,
) {
  const [value, setValue] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    if (!active || started.current) return
    started.current = true

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      setValue(target)
      return
    }

    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      // easeOutExpo
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
      setValue(target * eased)
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [active, target, duration])

  return decimals > 0 ? Number(value.toFixed(decimals)) : Math.round(value)
}
