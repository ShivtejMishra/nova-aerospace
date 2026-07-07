import { createContext, useContext } from 'react'

export type ThemeMode = 'dark' | 'light'

export interface AppState {
  theme: ThemeMode
  reducedMotion: boolean
  quality: 'low' | 'medium' | 'high'
  activeSection: string
  loaded: boolean
  menuOpen: boolean
  paused: boolean
}

export interface AppActions {
  setTheme: (theme: ThemeMode) => void
  toggleTheme: () => void
  setReducedMotion: (v: boolean) => void
  setQuality: (q: AppState['quality']) => void
  setActiveSection: (id: string) => void
  setLoaded: (v: boolean) => void
  setMenuOpen: (v: boolean) => void
  setPaused: (v: boolean) => void
}

export type Store = AppState & AppActions

const noop = () => {}

export const AppContext = createContext<Store>({
  theme: 'dark',
  reducedMotion: false,
  quality: 'high',
  activeSection: 'hero',
  loaded: true,
  menuOpen: false,
  paused: false,
  setTheme: noop,
  toggleTheme: noop,
  setReducedMotion: noop,
  setQuality: noop,
  setActiveSection: noop,
  setLoaded: noop,
  setMenuOpen: noop,
  setPaused: noop,
})

export const useStore = () => useContext(AppContext)

export const useTheme = () => {
  const { theme, toggleTheme, setTheme } = useStore()
  return { theme, toggleTheme, setTheme, isDark: theme === 'dark' }
}
