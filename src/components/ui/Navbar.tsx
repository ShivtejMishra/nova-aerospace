import { useState, useSyncExternalStore } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { subscribeScroll, getScroll } from '../../store/scroll'
import { useStore } from '../../store/useStore'
import { scrollToId } from '../../hooks/useLenis'
import { ThemeToggle } from './ThemeToggle'
import { MagneticButton } from './MagneticButton'

interface NavLink {
  id: string
  label: string
}
interface NavGroup {
  label: string
  id?: string
  items?: NavLink[]
}

const GROUPS: NavGroup[] = [
  { label: 'Home', id: 'hero' },
  {
    label: 'Vehicles',
    items: [
      { id: 'launch', label: 'Launch Services' },
      { id: 'spacecraft', label: 'Spacecraft' },
    ],
  },
  {
    label: 'Solutions',
    items: [
      { id: 'satellites', label: 'Satellite Solutions' },
      { id: 'deepspace', label: 'Deep Space' },
      { id: 'technology', label: 'Technology' },
    ],
  },
  {
    label: 'Company',
    items: [
      { id: 'mission', label: 'Mission' },
      { id: 'timeline', label: 'Timeline' },
      { id: 'impact', label: 'Global Impact' },
      { id: 'careers', label: 'Careers' },
    ],
  },
  { label: 'News', id: 'news' },
]

function Logo() {
  return (
    <button
      type="button"
      onClick={() => scrollToId('hero')}
      className="flex items-center gap-2"
      aria-label="Nova Aerospace home"
    >
      <span className="relative flex h-7 w-7 items-center justify-center">
        <span className="absolute inset-0 rounded-full bg-gradient-to-br from-nova-cyan to-nova-blue opacity-80 blur-[2px]" />
        <span className="relative h-2.5 w-2.5 rounded-full bg-white" />
      </span>
      <span className="font-display text-base font-semibold tracking-tight">
        NOVA<span className="text-gradient">AEROSPACE</span>
      </span>
    </button>
  )
}

function go(id: string) {
  scrollToId(id)
}

export function Navbar() {
  const { activeSection, menuOpen, setMenuOpen } = useStore()
  const [openGroup, setOpenGroup] = useState<string | null>(null)
  const [openMobile, setOpenMobile] = useState<string | null>(null)
  const progress = useSyncExternalStore(subscribeScroll, getScroll, getScroll)

  return (
    <>
      <div
        className="fixed left-0 top-0 z-[60] h-0.5 bg-gradient-to-r from-nova-cyan via-nova-blue to-nova-violet"
        style={{ width: `${progress * 100}%` }}
        aria-hidden="true"
      />

      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="fixed inset-x-0 top-3 z-50 flex justify-center px-4"
      >
        <nav className="glass-strong flex w-full max-w-5xl items-center justify-between rounded-full px-3 py-2 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.55)]">
          <Logo />

          <ul className="hidden items-center gap-0.5 md:flex">
            {GROUPS.map((g) =>
              g.items ? (
                <li
                  key={g.label}
                  className="relative"
                  onMouseEnter={() => setOpenGroup(g.label)}
                  onMouseLeave={() => setOpenGroup(null)}
                >
                  <button
                    type="button"
                    aria-haspopup="true"
                    aria-expanded={openGroup === g.label}
                    onFocus={() => setOpenGroup(g.label)}
                    className={`flex items-center gap-1 rounded-full px-3.5 py-1.5 text-sm transition-colors ${
                      openGroup === g.label || g.items.some((i) => i.id === activeSection)
                        ? 'text-[color:var(--fg)]'
                        : 'text-[color:var(--muted)] hover:text-[color:var(--fg)]'
                    }`}
                  >
                    {g.label}
                    <svg width="9" height="9" viewBox="0 0 10 10" className="opacity-60">
                      <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.4" fill="none" />
                    </svg>
                  </button>
                  <AnimatePresence>
                    {openGroup === g.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.18 }}
                        className="glass-strong absolute left-1/2 top-full mt-3 w-56 -translate-x-1/2 rounded-2xl p-2"
                      >
                        {g.items.map((it) => (
                          <button
                            key={it.id}
                            type="button"
                            onClick={() => {
                              go(it.id)
                              setOpenGroup(null)
                            }}
                            className={`block w-full rounded-xl px-3 py-2 text-left text-sm transition-colors ${
                              activeSection === it.id
                                ? 'bg-[color:var(--glass)] text-[color:var(--fg)]'
                                : 'text-[color:var(--muted)] hover:bg-[color:var(--glass)] hover:text-[color:var(--fg)]'
                            }`}
                          >
                            {it.label}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              ) : (
                <li key={g.label}>
                  <button
                    type="button"
                    onClick={() => go(g.id!)}
                    className={`rounded-full px-3.5 py-1.5 text-sm transition-colors ${
                      activeSection === g.id
                        ? 'text-[color:var(--fg)]'
                        : 'text-[color:var(--muted)] hover:text-[color:var(--fg)]'
                    }`}
                  >
                    {g.label}
                  </button>
                </li>
              ),
            )}
          </ul>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <div className="hidden md:block">
              <MagneticButton onClick={() => go('contact')} className="btn-primary !px-5 !py-1.5 text-sm" ariaLabel="Get in touch">
                Contact
              </MagneticButton>
            </div>
            <button
              type="button"
              onClick={() => {
                setMenuOpen(!menuOpen)
              }}
              className="glass flex h-9 w-9 items-center justify-center rounded-full md:hidden"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <span className="text-lg">{menuOpen ? '✕' : '☰'}</span>
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-3 top-[4.5rem] z-40 md:hidden"
          >
            <ul className="glass-strong flex max-h-[78vh] flex-col gap-1 overflow-y-auto rounded-3xl p-4">
              {GROUPS.map((g) =>
                g.items ? (
                  <li key={g.label}>
                    <button
                      type="button"
                      onClick={() => setOpenMobile(openMobile === g.label ? null : g.label)}
                      aria-expanded={openMobile === g.label}
                      className="flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-medium text-[color:var(--fg)]"
                    >
                      {g.label}
                      <span
                        className={`text-[color:var(--muted)] transition-transform ${
                          openMobile === g.label ? 'rotate-45' : ''
                        }`}
                      >
                        +
                      </span>
                    </button>
                    <div
                      className={`grid transition-all duration-300 ${
                        openMobile === g.label ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <ul className="pb-1">
                          {g.items.map((it) => (
                            <li key={it.id}>
                              <button
                                type="button"
                                onClick={() => {
                                  go(it.id)
                                  setOpenMobile(null)
                                  setMenuOpen(false)
                                }}
                                className="block w-full rounded-xl px-4 py-2.5 text-left text-sm text-[color:var(--muted)] transition-colors hover:text-[color:var(--fg)]"
                              >
                                {it.label}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </li>
                ) : (
                  <li key={g.label}>
                    <button
                      type="button"
                      onClick={() => {
                        go(g.id!)
                        setMenuOpen(false)
                      }}
                      className="w-full rounded-2xl px-4 py-3 text-left text-sm text-[color:var(--fg)]"
                    >
                      {g.label}
                    </button>
                  </li>
                ),
              )}
              <li className="px-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    go('contact')
                    setMenuOpen(false)
                  }}
                  className="btn-primary w-full"
                >
                  Contact
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
