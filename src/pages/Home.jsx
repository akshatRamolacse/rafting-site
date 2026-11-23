import Seo from '../components/Seo.jsx'
import { animate, motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import DiveHero from '../components/DiveHero.jsx'
import RideHero from '../components/RideHero.jsx'
import Reveal from '../components/Reveal.jsx'
import SectionTitle from '../components/SectionTitle.jsx'
import { img } from '../data/images.js'

const activities = [
  { to: '/rafting', title: 'River Rafting', text: 'Grade II–IV rapids on the Ganga with expert guides.', image: img.raftSelfie },
  { to: '/bungee', title: 'Bungee Jumping', text: "Seven jumps from 55 m to 249 m over the Ganga valley.", image: img.bungeeRiver },
  { to: '/camping', title: 'Camping', text: 'Sleep on white-sand beaches. Six trails, one Neem Beach finish.', image: img.beachJump },
]

function Activities() {
  const [active, setActive] = useState(0)
  return (
    <section id="activities" className="mx-auto max-w-7xl px-5 py-28">
      <SectionTitle eyebrow="What we do" title="Three ways to feel alive.">Pick your thrill — or stack all three into one unforgettable trip.</SectionTitle>
      <div className="flex h-[34rem] flex-col gap-3 lg:flex-row">
        {activities.map((a, i) => (
          <Link
            key={a.to}
            to={a.to}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            style={{ flexGrow: active === i ? 4 : 1 }}
            className="group relative min-h-24 flex-1 basis-0 overflow-hidden rounded-3xl transition-[flex-grow] duration-700 ease-[cubic-bezier(.22,1,.36,1)]"
          >
            <img src={a.image} alt="" loading="lazy" decoding="async" className="absolute inset-0 size-full object-cover transition duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-night/90 via-night/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-7">
              <span className="font-display text-sm text-ganga">0{i + 1}</span>
              <h3 className="text-3xl font-extrabold">{a.title}</h3>
              <p className={`mt-2 max-w-sm text-foam/80 transition-all duration-500 ${active === i ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'}`}>{a.text}</p>
              <span className={`mt-3 inline-block text-sm font-semibold text-ember transition-opacity ${active === i ? 'opacity-100' : 'opacity-0'}`}>Explore →</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

function Counter({ to, suffix = '', label }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!inView) return
    const c = animate(0, to, { duration: 2, ease: 'easeOut', onUpdate: (v) => setN(Math.round(v)) })
    return () => c.stop()
  }, [inView, to])
  return (
    <div ref={ref} className="text-center">
      <p className="font-display text-5xl font-extrabold text-ganga md:text-6xl">{n.toLocaleString()}{suffix}</p>
      <p className="mt-2 text-sm uppercase tracking-widest text-foam/60">{label}</p>
    </div>
  )
}

function Stats() {
  return (
    <section className="border-y border-white/10 bg-deep py-16 md:py-20">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 px-5 md:grid-cols-4">
        <Counter to={10000} suffix="+" label="Happy riders" />
        <Counter to={70} suffix=" km" label="Longest trail" />
        <Counter to={12} suffix="+" label="Years on the river" />
        <Counter to={100} suffix="%" label="Safety certified" />
      </div>
    </section>
  )
}

function CampingTeaser() {
  const trails = [70, 36, 24, 16, 12, 9]
  return (
    <section className="relative overflow-hidden py-28">
      <img src={img.beachGroup} alt="" loading="lazy" decoding="async" className="absolute inset-0 size-full object-cover opacity-25" />
      <div className="absolute inset-0 bg-gradient-to-b from-night via-transparent to-night" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-2">
        <div>
          <SectionTitle eyebrow="Camping" title="Raft in. Camp on the beach. Wake up to the Ganga.">Six rafting-to-camp trails, from a 9 km float to the 70 km Devprayag expedition — all ending at Neem Beach.</SectionTitle>
          <Link to="/camping" className="rounded-full bg-ganga px-8 py-4 font-semibold text-night transition hover:bg-ember hover:text-white">See all 6 packages</Link>
        </div>
        <Reveal>
          <div className="grid grid-cols-3 gap-3">
            {trails.map((km) => (
              <Link key={km} to="/camping" className="group rounded-2xl border border-white/10 bg-night/60 p-5 text-center backdrop-blur transition hover:-translate-y-1 hover:border-ganga">
                <p className="font-display text-4xl font-extrabold text-ganga group-hover:text-ember">{km}</p>
                <p className="text-xs uppercase tracking-widest text-foam/60">km</p>
              </Link>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Gallery() {
  // one hero tile + four small ones: a compact mosaic that links to the full gallery
  const tiles = [
    { src: img.raftThumbs, label: 'Thumbs up on the Ganga', cls: 'col-span-2 row-span-2' },
    { src: img.beachJump, label: 'Beach jump', cls: '' },
    { src: img.crewRaft, label: 'Ready to launch', cls: '' },
    { src: img.rockMural, label: 'The mural rock', cls: '' },
    { src: img.raftSelfie, label: 'Raft selfie', cls: '' },
  ]
  return (
    <section className="mx-auto max-w-7xl px-5 py-20">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <SectionTitle eyebrow="Gallery" title="Moments from the river." />
        <Reveal>
          <Link to="/gallery" className="group mb-12 inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 font-semibold transition hover:border-ganga hover:text-ganga">
            Open the gallery <span className="transition group-hover:translate-x-1">→</span>
          </Link>
        </Reveal>
      </div>
      <div className="relative">
        <div className="grid auto-rows-[9.5rem] grid-cols-2 gap-3 md:auto-rows-[12rem] md:grid-cols-4">
          {tiles.map((t, i) => (
            <motion.div
              key={t.src}
              initial={{ opacity: 0, y: 40, rotate: i % 2 ? 2 : -2 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className={`${t.cls}`}
            >
              <Link to="/gallery" className="group relative block size-full overflow-hidden rounded-3xl">
                <img src={t.src} alt={t.label} loading="lazy" decoding="async" className="size-full object-cover transition duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-night/70 via-transparent to-transparent opacity-70 transition group-hover:opacity-100" />
                <span className="absolute bottom-3 left-3 translate-y-2 rounded-full bg-night/70 px-3 py-1 text-xs font-medium opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">{t.label}</span>
              </Link>
            </motion.div>
          ))}
        </div>
        {/* spinning badge */}
        <Link to="/gallery" aria-label="View the full gallery" className="absolute -bottom-7 right-4 hidden size-28 place-items-center rounded-full bg-ember text-white shadow-xl shadow-ember/30 transition hover:scale-110 md:grid">
          <svg viewBox="0 0 100 100" className="absolute inset-0 animate-[spin_14s_linear_infinite]" aria-hidden>
            <defs><path id="badge" d="M50 50 m-36 0 a36 36 0 1 1 72 0 a36 36 0 1 1 -72 0" /></defs>
            <text className="fill-white text-[9.5px] font-bold uppercase tracking-[0.18em]"><textPath href="#badge">View gallery • View gallery • </textPath></text>
          </svg>
          <span className="text-2xl">↗</span>
        </Link>
      </div>
    </section>
  )
}

const reviews = [
  { name: 'Aarav S.', text: 'The rapids were insane and the guides made us feel completely safe. Camping on the beach after was magic.' },
  { name: 'Priya M.', text: 'Best trip with friends. The bonfire, the stars, the sunrise on the Ganga — unforgettable.' },
  { name: 'Daniel R.', text: 'Professional, fun and well organised. The bungee jump is a must-do. Placeholder review.' },
]

function Reviews() {
  return (
    <section className="bg-deep py-28">
      <div className="mx-auto max-w-7xl px-5">
        <SectionTitle eyebrow="Reviews" title="Don't take our word for it." />
        <div className="grid gap-5 md:grid-cols-3">
          {reviews.map((r, i) => (
            <Reveal key={r.name} delay={i * 0.1}>
              <figure className="h-full rounded-3xl border border-white/10 bg-night/50 p-7">
                <p className="text-ember">★★★★★</p>
                <blockquote className="mt-4 text-foam/80">“{r.text}”</blockquote>
                <figcaption className="mt-5 font-semibold">{r.name}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTA() {
  return (
    <section className="relative overflow-hidden py-32 text-center">
      <img src={img.raftCheer} alt="" loading="lazy" decoding="async" className="absolute inset-0 size-full object-cover opacity-30" />
      <div className="absolute inset-0 bg-night/60" />
      <Reveal className="relative mx-auto max-w-3xl px-5">
        <h2 className="text-5xl font-extrabold leading-tight md:text-7xl">Your adventure starts at the river.</h2>
        <Link to="/book" className="mt-10 inline-block rounded-full bg-ember px-10 py-5 text-lg font-semibold text-white shadow-lg shadow-ember/30 transition hover:scale-105">Book now</Link>
      </Reveal>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Seo title="Book River Rafting, Camping & Bungee in Rishikesh" description="Book River Rafting, Camping & Bungee in Rishikesh" />
      <DiveHero />
      <RideHero />
      <Stats />
      <Activities />
      <CampingTeaser />
      <Gallery />
      <Reviews />
      <CTA />
    </>
  )
}
