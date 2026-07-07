import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { AppContext, type AppState, type ThemeMode } from './useStore'

interface ProviderProps {
  children: ReactNode
}

function detectQuality(): AppState['quality'] {
  if (typeof window === 'undefined') return 'high'
  const cores = navigator.hardwareConcurrency ?? 4
  const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4
  const mobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)
  if (mobile || cores <= 4 || mem <= 4) return 'low'
  if (cores <= 8) return 'medium'
  return 'high'
}

export function AppProvider({ children }: ProviderProps) {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    if (typeof window === 'undefined') return 'dark'
    const saved = localStorage.getItem('nova-theme') as ThemeMode | null
    if (saved === 'dark' || saved === 'light') return saved
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
  })
  const [reducedMotion, setReducedMotion] = useState(false)
  const [quality] = useState<AppState['quality']>(() => detectQuality())
  const [activeSection, setActiveSection] = useState('hero')
  const [loaded, setLoaded] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const [paused, setPaused] = useState(false)

  // Apply theme class to <html>
  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')
    root.classList.toggle('light', theme === 'light')
    root.style.colorScheme = theme
    localStorage.setItem('nova-theme', theme)
  }, [theme])

  // Detect reduced motion preference
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  // Reflect quality + reduced motion on html for CSS
  useEffect(() => {
    document.documentElement.dataset.quality = quality
    document.documentElement.classList.toggle('reduce-motion', reducedMotion)
  }, [quality, reducedMotion])

  const value = useMemo(
    () => ({
      theme,
      reducedMotion,
      quality,
      activeSection,
      loaded,
      menuOpen,
      paused,
      setTheme: (t: ThemeMode) => setThemeState(t),
      toggleTheme: () => setThemeState((p) => (p === 'dark' ? 'light' : 'dark')),
      setReducedMotion,
      setQuality: () => {},
      setActiveSection,
      setLoaded,
      setMenuOpen,
      setPaused,
    }),
    [theme, reducedMotion, quality, activeSection, loaded, menuOpen, paused],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
