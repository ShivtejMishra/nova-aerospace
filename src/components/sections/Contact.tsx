import { useState, type FormEvent } from 'react'
import { SectionHeading } from '../ui/SectionHeading'
import { Reveal } from '../ui/Reveal'
import { GlassPanel } from '../ui/GlassPanel'
import { MagneticButton } from '../ui/MagneticButton'
import { SceneSection } from '../ui/SceneSection'
import { ContactScene } from '../../three/scenes/ContactScene'

export function Contact() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const update = (k: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [k]: e.target.value }))

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <SceneSection id="contact" scene={<ContactScene />}>
      <SectionHeading
        align="left"
        eyebrow="Contact"
        title={
          <>
            Let’s build the <span className="text-gradient">future together</span>
          </>
        }
        subtitle="Partnerships, press, payloads, or joining the team — reach out and a human will reply within two business days."
      />
      <Reveal delay={0.1} className="mt-8 grid gap-6 md:grid-cols-[1.2fr_1fr]">
        <GlassPanel className="!p-6">
          {sent ? (
            <div className="flex h-full flex-col items-start justify-center py-8">
              <div className="text-3xl">🛰️</div>
              <h3 className="mt-3 font-display text-xl font-semibold">Transmission received</h3>
              <p className="mt-2 max-w-sm text-sm text-[color:var(--muted)]">
                Thanks, {form.name || 'friend'}. Your message is on its way to Mission Control.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSent(false)
                  setForm({ name: '', email: '', message: '' })
                }}
                className="btn-ghost mt-5"
              >
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label htmlFor="c-name" className="mb-1.5 block text-sm text-[color:var(--muted)]">Name</label>
                <input
                  id="c-name" required value={form.name} onChange={update('name')}
                  className="w-full rounded-xl border border-[color:var(--glass-border)] bg-[color:var(--bg)]/60 px-4 py-3 text-[color:var(--fg)] outline-none transition-colors focus:border-nova-cyan"
                  placeholder="Ada Lovelace"
                />
              </div>
              <div>
                <label htmlFor="c-email" className="mb-1.5 block text-sm text-[color:var(--muted)]">Email</label>
                <input
                  id="c-email" type="email" required value={form.email} onChange={update('email')}
                  className="w-full rounded-xl border border-[color:var(--glass-border)] bg-[color:var(--bg)]/60 px-4 py-3 text-[color:var(--fg)] outline-none transition-colors focus:border-nova-cyan"
                  placeholder="you@earth.org"
                />
              </div>
              <div>
                <label htmlFor="c-msg" className="mb-1.5 block text-sm text-[color:var(--muted)]">Message</label>
                <textarea
                  id="c-msg" required rows={4} value={form.message} onChange={update('message')}
                  className="w-full resize-none rounded-xl border border-[color:var(--glass-border)] bg-[color:var(--bg)]/60 px-4 py-3 text-[color:var(--fg)] outline-none transition-colors focus:border-nova-cyan"
                  placeholder="Tell us about your mission…"
                />
              </div>
              <MagneticButton className="btn-primary w-full" ariaLabel="Send message">
                Transmit message →
              </MagneticButton>
            </form>
          )}
        </GlassPanel>

        <div className="space-y-3">
          {[
            { k: 'Mission Control', v: 'mission@nova.aero' },
            { k: 'Press', v: 'press@nova.aero' },
            { k: 'HQ', v: 'Cape Nova · 28.5°N Launch Complex' },
          ].map((c) => (
            <GlassPanel key={c.k} className="!p-5">
              <div className="font-mono text-xs uppercase tracking-widest text-[color:var(--muted)]">{c.k}</div>
              <div className="mt-1 font-display text-base">{c.v}</div>
            </GlassPanel>
          ))}
        </div>
      </Reveal>
    </SceneSection>
  )
}
