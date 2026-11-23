import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero.jsx'
import Reveal from '../components/Reveal.jsx'
import SectionTitle from '../components/SectionTitle.jsx'
import Seo from '../components/Seo.jsx'
import { img } from '../data/images.js'
import { team } from '../data/team.js'

const values = [
  { n: '01', title: 'Safety first', text: 'Certified life jackets and helmets, a briefing before every trip and a trained guide in every raft. The thrill is only fun when everyone is safe.' },
  { n: '02', title: 'Local to the river', text: 'We run trips on the stretch of the Ganga we know best, from the gentle floats near Brahmpuri to the big water below Devprayag.' },
  { n: '03', title: 'Made for every group', text: 'Friends, families, couples, college and office groups. Tell us who is coming and we shape the trip around them.' },
]

// Keeps the grid tidy for any team size: a short last row is centred instead of hugging the left edge.
function teamPlacement(i, n) {
  const c = []
  if (n % 2 === 1 && i === n - 1) c.push('sm:max-lg:col-span-2 sm:max-lg:w-[calc(50%-12px)] sm:max-lg:justify-self-center')
  if (n % 3 === 2 && i === n - 2) c.push('lg:col-start-2 xl:col-start-auto')
  if (n % 3 === 1 && i === n - 1) c.push('lg:col-start-3 xl:col-start-auto')
  return c.join(' ')
}

function Avatar({ person }) {
  if (person.photo) return <img src={person.photo} alt={person.name} loading="lazy" decoding="async" style={person.focus ? { objectPosition: person.focus } : undefined} className="aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-105" />
  return (
    <div className="grid aspect-[4/5] w-full place-items-center bg-gradient-to-br from-deep via-[#0f4a55] to-night">
      <svg viewBox="0 0 24 24" className="size-24 text-white/20" fill="currentColor" aria-hidden><path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0 2c-4.4 0-8 2.2-8 5v1h16v-1c0-2.8-3.6-5-8-5z" /></svg>
    </div>
  )
}

export default function About() {
  return (
    <>
      <Seo title="About Us – Rafting, Camping & Bungee in Rishikesh" description="Meet the team behind Rishikesh Epic Adventure: certified river guides running rafting, riverside camping at Neem Beach and bungee jumping on the Ganga." />
      <PageHero image={img.crewRaft} eyebrow="About us" title="Born on the banks of the Ganga.">Rafting, bungee and riverside camping — run by people who love this river.</PageHero>

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-24 lg:grid-cols-2">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-ganga">Our story</p>
          <h2 className="mt-3 text-4xl font-extrabold leading-tight md:text-5xl">Adventure with a little spirit in it.</h2>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-foam/70">
            <p>Rishikesh is known as the Yoga Capital of the World — and it is also the place where the Ganga turns wild. Rishikesh Epic Adventure was started to share both sides of that: the rush of white water and the calm of a night under the stars.</p>
            <p>We keep our trips simple and well run: good gear, honest guides and a camp you will not want to leave. Placeholder story — replace this with how and why you started, in your own words.</p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/book" className="rounded-full bg-ember px-7 py-3.5 font-semibold text-white transition hover:scale-105">Book your adventure</Link>
            <Link to="/guide" className="rounded-full border border-white/25 px-7 py-3.5 font-semibold transition hover:border-ganga hover:text-ganga">Read the Rishikesh guide</Link>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="relative">
            <img src={img.raftThumbs} alt="Guests on a raft giving thumbs up" loading="lazy" decoding="async" className="aspect-[4/5] w-full rounded-[2rem] object-cover" />
            <img src={img.rockMural} alt="Group at the painted rock on the beach" loading="lazy" decoding="async" className="absolute -bottom-8 -left-6 hidden w-2/5 rotate-[-4deg] rounded-3xl border-4 border-night object-cover shadow-2xl md:block" />
          </div>
        </Reveal>
      </section>

      <section className="bg-deep py-24">
        <div className="mx-auto max-w-7xl px-5">
          <SectionTitle eyebrow="What we stand for" title="Three promises." />
          <div className="grid gap-5 md:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.n} delay={i * 0.1}>
                <div className="h-full rounded-3xl border border-white/10 bg-night/50 p-8">
                  <p className="font-display text-5xl font-extrabold text-ganga/40">{v.n}</p>
                  <h3 className="mt-4 text-2xl font-bold">{v.title}</h3>
                  <p className="mt-3 text-foam/65">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24">
        <SectionTitle eyebrow="The team" title="Meet your guides." center>The people who will be in the raft, at the camp and on the phone when you book.</SectionTitle>
        <div className="grid auto-rows-fr gap-6 sm:grid-cols-2 lg:grid-cols-6 xl:grid-cols-10">
          {team.map((p, i) => (
            <motion.article key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6, delay: i * 0.08 }} className={`group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-deep lg:col-span-2 ${teamPlacement(i, team.length)}`}>
              <div className="overflow-hidden"><Avatar person={p} /></div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-xl font-bold">{p.name}</h3>
                <p className="text-sm font-medium text-ganga">{p.role}</p>
                <p className="mt-3 flex-1 text-sm text-foam/65">{p.bio}</p>
                {p.certs.length > 0 && !p.license && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.certs.map((c) => <span key={c} className="rounded-full bg-white/10 px-3 py-1 text-xs">{c}</span>)}
                  </div>
                )}
                {p.license && (
                  <div className="mt-4 rounded-2xl border border-ganga/30 bg-ganga/10 p-4 text-xs text-foam/75">
                    <p className="font-semibold text-ganga">✔ {p.certs[0] || p.license.title}</p>
                    <p className="mt-1 text-foam/55">{p.license.title}</p>
                    <p className="mt-1">{p.license.issuer}</p>
                    <p className="mt-1 text-foam/55">Licence no. {p.license.number}{p.license.validTill && ` · Valid till ${p.license.validTill}`}</p>
                  </div>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </>
  )
}
