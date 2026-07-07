import { useEffect, useRef } from 'react'
import { useStore } from '../../store/useStore'

/**
 * Custom cursor: a small dot that tracks the pointer instantly and a ring that
 * lags slightly and grows over interactive elements. Hidden on touch devices.
 */
export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!fine) return

    document.documentElement.classList.add('has-custom-cursor')
    let mx = window.innerWidth / 2
    let my = window.innerHeight / 2
    let rx = mx
    let ry = my
    let raf = 0
    let hovering = false

    const move = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
      if (dot.current) dot.current.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`
      const target = e.target as HTMLElement
      const isInteractive = !!target.closest('a, button, [data-cursor="hover"], input, textarea')
      if (isInteractive !== hovering && ring.current) {
        hovering = isInteractive
        ring.current.classList.toggle('is-hovering', hovering)
      }
    }
    const loop = () => {
      rx += (mx - rx) * 0.18
      ry += (my - ry) * 0.18
      if (ring.current) ring.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    window.addEventListener('mousemove', move)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', move)
      document.documentElement.classList.remove('has-custom-cursor')
    }
  }, [])

  const { reducedMotion } = useStore()
  if (reducedMotion) return null

  return (
    <>
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
      <div ref={ring} className="cursor-ring" aria-hidden="true" />
    </>
  )
}
