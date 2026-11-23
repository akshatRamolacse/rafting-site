import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function PackageCard({ activity, pkg, image, index = 0 }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
      whileHover={{ y: -8 }}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-deep"
    >
      <div className="relative h-52 overflow-hidden">
        <img src={image} alt="" loading="lazy" decoding="async" className="size-full object-cover transition duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-deep to-transparent" />
        {pkg.km && (
          <div className="absolute left-4 top-4 rounded-2xl bg-night/70 px-3 py-1.5 backdrop-blur">
            <span className="font-display text-2xl font-extrabold text-ganga">{pkg.km}</span>
            <span className="ml-1 text-xs uppercase tracking-wider text-foam/70">km</span>
          </div>
        )}
        {pkg.height && (
          <div className="absolute left-4 top-4 rounded-2xl bg-night/70 px-3 py-1.5 font-display text-2xl font-extrabold text-ganga backdrop-blur">{pkg.height}</div>
        )}
        <span className="absolute right-4 top-4 rounded-full bg-ember px-3 py-1 text-xs font-semibold text-white">{pkg.level}</span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-2xl font-bold">{pkg.title}</h3>
        {pkg.hours && <p className="mt-1 text-sm text-ganga">{pkg.hours}</p>}
        {pkg.place && <p className="mt-1 flex items-start gap-1.5 text-sm text-ganga"><span aria-hidden>📍</span>{pkg.place}</p>}
        {pkg.blurb && <p className="mt-3 flex-1 text-sm leading-relaxed text-foam/65">{pkg.blurb}</p>}
        <Link
          to={`/book?activity=${activity}&package=${pkg.id}`}
          className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-ganga px-6 py-3 font-semibold text-night transition hover:bg-ember hover:text-white"
        >
          Book now <span className="transition group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </motion.article>
  )
}
