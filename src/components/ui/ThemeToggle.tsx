import { useStore } from '../../store/useStore'
import { motion } from 'framer-motion'

export function ThemeToggle() {
  const { theme, toggleTheme } = useStore()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className="glass relative flex h-9 w-16 items-center rounded-full px-1"
    >
      <motion.span
        layout
        transition={{ type: 'spring', stiffness: 500, damping: 32 }}
        className={`flex h-7 w-7 items-center justify-center rounded-full text-sm ${
          isDark ? 'ml-auto bg-nova-blue text-white' : 'bg-nova-gold text-space-950'
        }`}
      >
        {isDark ? '🌙' : '☀'}
      </motion.span>
    </button>
  )
}
