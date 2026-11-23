import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

export default function Accordion({ items }) {
  const [open, setOpen] = useState(0)
  return (
    <div className="divide-y divide-white/10 overflow-hidden rounded-3xl border border-white/10 bg-deep/60">
      {items.map((it, i) => {
        const isOpen = open === i
        return (
          <div key={it.q}>
            <button onClick={() => setOpen(isOpen ? -1 : i)} aria-expanded={isOpen} className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left transition hover:bg-white/5">
              <span className="font-display text-lg font-semibold md:text-xl">{it.q}</span>
              <motion.span animate={{ rotate: isOpen ? 45 : 0 }} className={`grid size-8 shrink-0 place-items-center rounded-full text-xl transition ${isOpen ? 'bg-ganga text-night' : 'bg-white/10'}`}>+</motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                  <p className="px-6 pb-6 pr-16 leading-relaxed text-foam/70">{it.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
