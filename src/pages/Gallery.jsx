import Seo from '../components/Seo.jsx'
import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { galleryItems } from '../data/gallery.js'

const filters = ['All', 'Rafting', 'Camping']

function Lightbox({ items, index, onClose, onStep }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onStep(1)
      if (e.key === 'ArrowLeft') onStep(-1)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose, onStep])

  const item = items[index]
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 z-[60] grid place-items-center bg-night/95 p-4" role="dialog" aria-modal="true" aria-label={item.alt}>
      <button onClick={onClose} aria-label="Close" className="absolute right-5 top-5 grid size-11 place-items-center rounded-full bg-white/10 text-2xl transition hover:bg-white/20">×</button>
      <button onClick={(e) => { e.stopPropagation(); onStep(-1) }} aria-label="Previous photo" className="absolute left-3 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-xl transition hover:bg-ganga hover:text-night md:left-8">←</button>
      <button onClick={(e) => { e.stopPropagation(); onStep(1) }} aria-label="Next photo" className="absolute right-3 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-xl transition hover:bg-ganga hover:text-night md:right-8">→</button>
      <motion.figure key={item.src} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }} onClick={(e) => e.stopPropagation()} className="max-h-full max-w-5xl">
        <img src={item.src} alt={item.alt} className="max-h-[80vh] w-auto rounded-2xl object-contain" />
        <figcaption className="mt-4 flex items-center justify-between text-sm text-foam/80">
          <span className="font-display text-lg font-semibold text-foam">{item.title}</span>
          <span>{index + 1} / {items.length}</span>
        </figcaption>
      </motion.figure>
    </motion.div>
  )
}

export default function Gallery() {
  const [filter, setFilter] = useState('All')
  const [open, setOpen] = useState(null)
  const items = filter === 'All' ? galleryItems : galleryItems.filter((g) => g.tag === filter)

  const close = useCallback(() => setOpen(null), [])
  const step = useCallback((d) => setOpen((i) => (i === null ? i : (i + d + items.length) % items.length)), [items.length])

  return (
    <>
      <Seo title="Gallery" description="Photos from our river rafting and beach camping trips in Rishikesh." />
      <section className="relative overflow-hidden px-5 pb-10 pt-36 text-center">
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-24 select-none font-display text-[clamp(5rem,22vw,20rem)] font-extrabold leading-none tracking-tighter text-white/[0.04]">MOMENTS</div>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative text-sm font-semibold uppercase tracking-[0.3em] text-ganga">Gallery</motion.p>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="relative mx-auto mt-3 max-w-3xl text-5xl font-extrabold leading-[1.02] md:text-7xl">Moments from the river.</motion.h1>
        <p className="relative mx-auto mt-4 max-w-md text-foam/70">Real guests, real rapids, real beach nights. Tap any photo to open it.</p>
        <div className="relative mt-8 flex justify-center gap-2" role="tablist" aria-label="Filter photos">
          {filters.map((f) => (
            <button key={f} role="tab" aria-selected={filter === f} onClick={() => setFilter(f)} className={`rounded-full px-5 py-2 text-sm font-semibold transition ${filter === f ? 'bg-ganga text-night' : 'border border-white/20 text-foam/80 hover:border-ganga hover:text-ganga'}`}>
              {f}
            </button>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-24">
        <div key={filter} className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
          {items.map((g, i) => (
            <motion.button
              key={g.src}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => setOpen(i)}
              className="group relative block w-full break-inside-avoid overflow-hidden rounded-3xl text-left"
            >
              <img src={g.src} alt={g.alt} loading="lazy" decoding="async" className="w-full object-cover transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-night/80 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
              <div className="absolute inset-x-0 bottom-0 translate-y-3 p-5 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <span className="rounded-full bg-ember px-3 py-1 text-xs font-semibold text-white">{g.tag}</span>
                <p className="mt-2 font-display text-xl font-bold">{g.title}</p>
              </div>
            </motion.button>
          ))}
        </div>
        <div className="mt-10 text-center">
          <p className="text-foam/60">Been on a trip with us? Your photo could be here next.</p>
          <Link to="/book" className="mt-5 inline-block rounded-full bg-ember px-8 py-4 font-semibold text-white shadow-lg shadow-ember/30 transition hover:scale-105">Book your adventure</Link>
        </div>
      </section>

      <AnimatePresence>{open !== null && <Lightbox items={items} index={open} onClose={close} onStep={step} />}</AnimatePresence>
    </>
  )
}
