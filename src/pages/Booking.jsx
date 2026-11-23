import Seo from '../components/Seo.jsx'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { activityOptions } from '../data/packages.js'
import { submitBooking } from '../lib/submitBooking.js'

const field = 'w-full rounded-xl border border-white/15 bg-deep px-4 py-3 text-foam outline-none transition placeholder:text-foam/30 focus:border-ganga focus:ring-2 focus:ring-ganga/30'

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-foam/80">{label}</span>
      {children}
    </label>
  )
}

export default function Booking() {
  const [params] = useSearchParams()
  const initialActivity = activityOptions.some((a) => a.value === params.get('activity')) ? params.get('activity') : 'camping'
  const [activity, setActivity] = useState(initialActivity)
  const packages = activityOptions.find((a) => a.value === activity).packages
  const [pkg, setPkg] = useState(packages.some((p) => p.id === params.get('package')) ? params.get('package') : packages[0].id)
  const [status, setStatus] = useState('idle')

  const changeActivity = (value) => {
    setActivity(value)
    setPkg(activityOptions.find((a) => a.value === value).packages[0].id)
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const selected = packages.find((p) => p.id === pkg)
    setStatus('sending')
    try {
      await submitBooking({
        name: f.get('name'),
        phone: f.get('phone'),
        email: f.get('email'),
        activity,
        package: selected.title,
        date: f.get('date'),
        guests: f.get('guests'),
        message: f.get('message'),
      })
      setStatus('done')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="mx-auto max-w-3xl px-5 pb-24 pt-32">
      <Seo title="Book Your Adventure" description="Book river rafting, camping or bungee jumping in Rishikesh. Choose your package, date and group size and we will confirm on WhatsApp or phone." />
      <AnimatePresence mode="wait">
        {status === 'done' ? (
          <motion.div key="done" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="rounded-3xl border border-ganga/30 bg-deep p-12 text-center">
            <p className="text-6xl">🎉</p>
            <h1 className="mt-4 text-4xl font-extrabold">Request received!</h1>
            <p className="mt-3 text-foam/70">Thanks — our team will contact you shortly to confirm your booking.</p>
            <Link to="/" className="mt-8 inline-block rounded-full bg-ganga px-8 py-3 font-semibold text-night">Back home</Link>
          </motion.div>
        ) : (
          <motion.div key="form" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-ganga">Booking</p>
            <h1 className="mt-2 text-5xl font-extrabold">Book your adventure</h1>
            <p className="mt-3 text-foam/65">Fill in your details and we'll get back to you to confirm.</p>
            <form onSubmit={onSubmit} className="mt-10 grid gap-5 sm:grid-cols-2">
              <Field label="Full name"><input required name="name" className={field} placeholder="Your name" /></Field>
              <Field label="Phone / WhatsApp"><input required name="phone" type="tel" pattern="[0-9+\s\-]{8,15}" className={field} placeholder="+91 98765 43210" /></Field>
              <div className="sm:col-span-2"><Field label="Email"><input required name="email" type="email" className={field} placeholder="you@example.com" /></Field></div>
              <Field label="Activity">
                <select value={activity} onChange={(e) => changeActivity(e.target.value)} className={field}>
                  {activityOptions.map((a) => <option key={a.value} value={a.value}>{a.label}</option>)}
                </select>
              </Field>
              <Field label="Package">
                <select value={pkg} onChange={(e) => setPkg(e.target.value)} className={field}>
                  {packages.map((p) => <option key={p.id} value={p.id}>{p.title}{p.km ? ` (${p.km} km)` : ''}</option>)}
                </select>
              </Field>
              <Field label="Preferred date"><input required name="date" type="date" min={new Date().toISOString().split('T')[0]} className={`${field} [color-scheme:dark]`} /></Field>
              <Field label="Number of guests"><input required name="guests" type="number" min="1" max="50" defaultValue="2" className={field} /></Field>
              <div className="sm:col-span-2"><Field label="Anything else? (optional)"><textarea name="message" rows="3" className={field} placeholder="Special requests, group details…" /></Field></div>
              {status === 'error' && <p className="text-sm text-red-400 sm:col-span-2">Something went wrong. Please try again.</p>}
              <button disabled={status === 'sending'} className="rounded-full bg-ember px-8 py-4 font-semibold text-white transition hover:scale-[1.02] disabled:opacity-60 sm:col-span-2">
                {status === 'sending' ? 'Sending…' : 'Submit booking request'}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
