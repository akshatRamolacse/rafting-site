import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const links = [
  { to: '/rafting', label: 'Rafting' },
  { to: '/bungee', label: 'Bungee' },
  { to: '/camping', label: 'Camping' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/guide', label: 'Guide' },
  { to: '/about', label: 'About' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled || open ? 'bg-night/90 shadow-lg shadow-black/20' : ''}`}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <Link to="/" onClick={() => setOpen(false)} className="flex items-center gap-3 font-display text-lg font-bold leading-none">
          <img src="/images/logo.png" alt="Epic Adventure logo" className="size-12 drop-shadow-lg" />
          <span className="hidden sm:block">Rishikesh <span className="text-ganga">Epic</span> Adventure</span>
        </Link>
        <ul className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <li key={l.to}>
              <NavLink to={l.to} className={({ isActive }) => `text-sm font-medium transition hover:text-ganga ${isActive ? 'text-ganga' : 'text-foam/80'}`}>
                {l.label}
              </NavLink>
            </li>
          ))}
          <li>
            <Link to="/book" className="rounded-full bg-ember px-5 py-2 text-sm font-semibold text-white transition hover:scale-105 hover:bg-ember/90">Book now</Link>
          </li>
        </ul>
        <button aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)} className="grid size-10 place-items-center lg:hidden">
          <span className="relative block h-3.5 w-6">
            <span className={`absolute left-0 h-0.5 w-6 bg-foam transition ${open ? 'top-1.5 rotate-45' : 'top-0'}`} />
            <span className={`absolute left-0 top-3 h-0.5 w-6 bg-foam transition ${open ? 'top-1.5 -rotate-45' : ''}`} />
          </span>
        </button>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.ul initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden px-5 lg:hidden">
            {[...links, { to: '/book', label: 'Book now' }].map((l) => (
              <li key={l.to}>
                <Link to={l.to} onClick={() => setOpen(false)} className="block border-t border-white/10 py-4 font-display text-2xl">{l.label}</Link>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  )
}
