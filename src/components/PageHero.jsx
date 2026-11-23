import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import Waves from './Waves.jsx'

export default function PageHero({ image, eyebrow, title, children, cta }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  return (
    <section ref={ref} className="relative flex min-h-[70vh] items-end overflow-hidden">
      <motion.img src={image} alt="" style={{ y }} className="absolute inset-0 size-full scale-110 object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-night via-night/50 to-night/30" />
      <div className="relative mx-auto w-full max-w-7xl px-5 pb-28 pt-40">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-ganga">{eyebrow}</motion.p>
        <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-3xl text-5xl font-extrabold leading-[1.02] md:text-7xl">{title}</motion.h1>
        {children && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-5 max-w-xl text-lg text-foam/75">{children}</motion.p>}
        {cta && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }} className="mt-8">
            <Link to={cta.to} className="inline-flex items-center gap-2 rounded-full bg-ember px-8 py-4 font-semibold text-white transition hover:scale-[1.03] hover:bg-ganga hover:text-night">{cta.label} <span aria-hidden>→</span></Link>
          </motion.div>
        )}
      </div>
      <Waves />
    </section>
  )
}
