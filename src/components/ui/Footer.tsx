import { useState } from 'react'
import { scrollToId } from '../../hooks/useLenis'

type Link = { label: string; id: string }
type Group = { title: string; links: Link[] }

const GROUPS: Group[] = [
  {
    title: 'Vehicles',
    links: [
      { label: 'Launch Services', id: 'launch' },
      { label: 'Spacecraft', id: 'spacecraft' },
    ],
  },
  {
    title: 'Solutions',
    links: [
      { label: 'Satellites', id: 'satellites' },
      { label: 'Deep Space', id: 'deepspace' },
      { label: 'Technology', id: 'technology' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Mission', id: 'mission' },
      { label: 'Timeline', id: 'timeline' },
      { label: 'Impact', id: 'impact' },
      { label: 'Careers', id: 'careers' },
    ],
  },
]

const SOCIALS: { name: string; path: string }[] = [
  {
    name: 'LinkedIn',
    path: 'M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.8-2.05 3.7-2.05 4 0 4.45 2.6 4.45 6V21h-4v-5.3c0-1.3 0-2.9-1.8-2.9s-2.05 1.4-2.05 2.8V21H9z',
  },
  { name: 'X', path: 'M17.5 3h3l-7 8 8.2 10h-6.4l-5-6.1L4 21H1l7.5-8.6L.8 3h6.6l4.5 5.6z' },
  {
    name: 'YouTube',
    path: 'M23 12s0-3.2-.4-4.7a3 3 0 00-2.1-2.1C18.9 4.8 12 4.8 12 4.8s-6.9 0-8.5.4A3 3 0 001.4 7.3C1 8.8 1 12 1 12s0 3.2.4 4.7a3 3 0 002.1 2.1c1.6.4 8.5.4 8.5.4s6.9 0 8.5-.4a3 3 0 002.1-2.1C23 15.2 23 12 23 12zM9.8 15.3V8.7l5.7 3.3z',
  },
  {
    name: 'GitHub',
    path: 'M12 2a10 10 0 00-3.2 19.5c.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.3-3.4-1.3-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.3-1.1.6-1.3-2.2-.300-4.6-1.1-4.6-4.9 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1a9.4 9.4 0 015 0c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.8-2.4 4.6-4.6 4.9.4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5A10 10 0 0012 2z',
  },
]

function Newsletter() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        if (email) setDone(true)
      }}
      className="w-full max-w-sm"
    >
      <label htmlFor="newsletter" className="mb-2 block font-mono text-xs uppercase tracking-widest text-[color:var(--muted)]">
        Mission briefings
      </label>
      {done ? (
        <p className="text-sm text-nova-cyan">You’re on the list. Stand by for transmission.</p>
      ) : (
        <div className="flex gap-2">
          <input
            id="newsletter"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@earth.org"
            className="w-full rounded-full border border-[color:var(--glass-border)] bg-[color:var(--bg)]/60 px-4 py-2.5 text-sm text-[color:var(--fg)] outline-none transition-colors focus:border-nova-cyan"
          />
          <button type="submit" className="btn-primary !px-5 !py-2.5 text-sm">
            Join
          </button>
        </div>
      )}
    </form>
  )
}

export function Footer() {
  const year = new Date().getFullYear()
  const [open, setOpen] = useState<string | null>(null)

  return (
    <footer className="relative z-10 border-t border-[color:var(--glass-border)] bg-[color:var(--bg-soft)]/70">
      <div className="mx-auto max-w-7xl px-6 py-14 md:px-10">
        {/* Top: brand + newsletter */}
        <div className="flex flex-col justify-between gap-8 border-b border-[color:var(--glass-border)] pb-10 md:flex-row md:items-end">
          <div>
            <div className="font-display text-xl font-semibold">
              NOVA<span className="text-gradient">AEROSPACE</span>
            </div>
            <p className="mt-3 max-w-xs text-sm text-[color:var(--muted)]">
              Engineering the road to the stars — reusable launch, satellite constellations, and
              permanent off-world presence.
            </p>
            <div className="mt-5 flex gap-3">
              {SOCIALS.map((s) => (
                <button
                  key={s.name}
                  type="button"
                  aria-label={s.name}
                  className="glass flex h-9 w-9 items-center justify-center rounded-full text-[color:var(--fg)]/80 transition-colors hover:text-nova-cyan"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d={s.path} />
                  </svg>
                </button>
              ))}
            </div>
          </div>
          <Newsletter />
        </div>

        {/* Desktop columns */}
        <div className="hidden grid-cols-4 gap-8 py-10 md:grid">
          {GROUPS.map((col) => (
            <div key={col.title}>
              <h4 className="mb-4 font-mono text-xs uppercase tracking-widest text-[color:var(--muted)]">
                {col.title}
              </h4>
              <ul className="space-y-2.5 text-sm">
                {col.links.map((l) => (
                  <li key={l.id}>
                    <button
                      type="button"
                      onClick={() => scrollToId(l.id)}
                      className="text-[color:var(--fg)]/80 transition-colors hover:text-nova-cyan"
                    >
                      {l.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h4 className="mb-4 font-mono text-xs uppercase tracking-widest text-[color:var(--muted)]">
              Connect
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="mailto:mission@nova.aero" className="text-[color:var(--fg)]/80 hover:text-nova-cyan">
                  mission@nova.aero
                </a>
              </li>
              <li>
                <a href="mailto:press@nova.aero" className="text-[color:var(--fg)]/80 hover:text-nova-cyan">
                  press@nova.aero
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Mobile accordion */}
        <div className="divide-y divide-[color:var(--glass-border)] py-4 md:hidden">
          {GROUPS.map((col) => {
            const isOpen = open === col.title
            return (
              <div key={col.title}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : col.title)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between py-4 text-left"
                >
                  <span className="font-mono text-xs uppercase tracking-widest text-[color:var(--muted)]">
                    {col.title}
                  </span>
                  <span className={`text-[color:var(--muted)] transition-transform ${isOpen ? 'rotate-45' : ''}`}>
                    +
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-300 ${isOpen ? 'grid-rows-[1fr] pb-4' : 'grid-rows-[0fr]'}`}
                >
                  <div className="overflow-hidden">
                    <ul className="space-y-3 text-sm">
                      {col.links.map((l) => (
                        <li key={l.id}>
                          <button
                            type="button"
                            onClick={() => scrollToId(l.id)}
                            className="text-[color:var(--fg)]/80"
                          >
                            {l.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )
          })}
          <div className="py-4">
            <h4 className="mb-3 font-mono text-xs uppercase tracking-widest text-[color:var(--muted)]">
              Connect
            </h4>
            <div className="flex gap-3">
              {SOCIALS.map((s) => (
                <button
                  key={s.name}
                  type="button"
                  aria-label={s.name}
                  className="glass flex h-9 w-9 items-center justify-center rounded-full text-[color:var(--fg)]/80"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d={s.path} />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-[color:var(--glass-border)] pt-6 text-xs text-[color:var(--muted)] md:flex-row">
          <span>© {year} Nova Aerospace. All rights reserved.</span>
          <div className="flex gap-5">
            <button type="button" className="hover:text-nova-cyan">Privacy</button>
            <button type="button" className="hover:text-nova-cyan">Terms</button>
            <span className="font-mono">Built for the beyond · v1.2</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
