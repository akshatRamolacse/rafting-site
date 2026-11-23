import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero.jsx'
import Reveal from '../components/Reveal.jsx'
import SectionTitle from '../components/SectionTitle.jsx'
import Seo from '../components/Seo.jsx'
import { campingPackages } from '../data/packages.js'
import { img } from '../data/images.js'

const months = [
  ['Jan', 'cold'], ['Feb', 'cold'], ['Mar', 'good'], ['Apr', 'best'], ['May', 'best'], ['Jun', 'good'],
  ['Jul', 'closed'], ['Aug', 'closed'], ['Sep', 'good'], ['Oct', 'best'], ['Nov', 'best'], ['Dec', 'cold'],
]
const monthStyle = {
  best: 'bg-ganga text-night',
  good: 'bg-ganga/35 text-foam',
  cold: 'bg-sky-400/25 text-foam',
  closed: 'bg-white/5 text-foam/35 line-through',
}
const legend = [
  ['best', 'Best time', 'Great water, pleasant weather'],
  ['good', 'Good', 'Fun, with some heat or fewer rapids'],
  ['cold', 'Cold', 'Cold water and chilly mornings; wetsuits help'],
  ['closed', 'Closed', 'Monsoon — rafting is paused'],
]

const who = [
  { icon: '👶', title: 'Age', text: 'Gentler 9–16 km stretches suit children; bigger rapids are best for teenagers and adults. Limits depend on the stretch and the water level that day.' },
  { icon: '⚖️', title: 'Weight', text: 'Every rafter needs a life jacket that fits properly, so there are minimum and maximum weights. Share your group’s weights when you book.' },
  { icon: '🏊', title: 'Swimming', text: 'Not required. Life jackets and helmets are mandatory, and your guide briefs everyone before launch.' },
  { icon: '🩺', title: 'Health', text: 'Skip rafting if you are pregnant or have a heart, back, neck or serious joint condition. Ask your doctor if unsure.' },
]

const wear = ['Quick-dry T-shirt and shorts or a swimsuit', 'Sports sandals or floaters with a back strap', 'Sunglasses with a strap', 'Sunscreen and a cap for after the trip']
const bring = ['A full change of dry clothes and a towel', 'A warm layer for evenings at camp', 'A waterproof phone pouch with a wrist strap', 'Personal medicines and a small torch']
const leave = ['Cotton jeans and heavy clothes (they stay wet)', 'Jewellery and watches', 'Open-toe flip-flops', 'Valuables and large amounts of cash']

const reach = [
  { icon: '✈️', title: 'By air', text: 'Jolly Grant Airport (Dehradun) is the nearest, about 35 km away — roughly an hour by taxi.' },
  { icon: '🚆', title: 'By train', text: 'Haridwar Junction is the main railhead, about 25 km away. Rishikesh also has its own station.' },
  { icon: '🚗', title: 'By road', text: 'From Delhi it is around 240 km, usually 5 to 6 hours by car or bus on a good highway.' },
]

function Checklist({ title, items, tone }) {
  return (
    <div className="h-full rounded-3xl border border-white/10 bg-night/50 p-7">
      <h3 className="text-xl font-bold">{title}</h3>
      <ul className="mt-4 space-y-3">
        {items.map((t) => (
          <li key={t} className="flex gap-3 text-foam/75"><span className={tone === 'no' ? 'text-ember' : 'text-ganga'}>{tone === 'no' ? '✕' : '✓'}</span>{t}</li>
        ))}
      </ul>
    </div>
  )
}

export default function Guide() {
  return (
    <>
      <Seo title="Rishikesh Rafting Guide – Best Season, Who Can Raft, What to Wear" description="Plan your river rafting trip in Rishikesh: the best time to go, age and weight limits, what to wear and bring, rafting stretches from 9 to 70 km, and how to reach Rishikesh." />
      <PageHero image={img.raftThumbs} eyebrow="Rishikesh guide" title="Plan your trip like a local.">Best season, who can raft, what to wear and how to get here.</PageHero>

      <section className="mx-auto max-w-7xl px-5 py-24">
        <SectionTitle eyebrow="Best season" title="When to go rafting in Rishikesh." >Rafting usually runs from mid-September to mid-June. Dates are set by local authorities and the river, so always confirm with us before you travel.</SectionTitle>
        <Reveal>
          <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-12">
            {months.map(([m, s]) => (
              <div key={m} className={`rounded-2xl px-2 py-4 text-center font-display text-lg font-bold ${monthStyle[s]}`}>{m}</div>
            ))}
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {legend.map(([k, name, text]) => (
              <div key={k} className="flex items-start gap-3 text-sm">
                <span className={`mt-1 size-3 shrink-0 rounded-full ${monthStyle[k].split(' ')[0]}`} />
                <p><span className="font-semibold">{name}.</span> <span className="text-foam/65">{text}</span></p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="bg-deep py-24">
        <div className="mx-auto max-w-7xl px-5">
          <SectionTitle eyebrow="Who can raft" title="Good to know before you book." >These are typical limits. Your guide confirms them on the day, based on the stretch and the water.</SectionTitle>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {who.map((w, i) => (
              <Reveal key={w.title} delay={i * 0.08}>
                <div className="h-full rounded-3xl border border-white/10 bg-night/50 p-7">
                  <p className="text-4xl">{w.icon}</p>
                  <h3 className="mt-4 text-xl font-bold">{w.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-foam/65">{w.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24">
        <SectionTitle eyebrow="What to wear" title="Dress for the river, not the city." >Life jackets, helmets and paddles are provided. You bring the rest.</SectionTitle>
        <div className="grid gap-5 md:grid-cols-3">
          <Reveal><Checklist title="Wear" items={wear} /></Reveal>
          <Reveal delay={0.1}><Checklist title="Bring" items={bring} /></Reveal>
          <Reveal delay={0.2}><Checklist title="Leave behind" items={leave} tone="no" /></Reveal>
        </div>
      </section>

      <section className="bg-deep py-24">
        <div className="mx-auto max-w-7xl px-5">
          <SectionTitle eyebrow="Rafting stretches" title="Choose your distance." >Every camping package ends at Neem Beach. Shorter means gentler; longer means bigger water and more time on the river.</SectionTitle>
          <div className="overflow-hidden rounded-3xl border border-white/10">
            {campingPackages.map((p, i) => (
              <Reveal key={p.id}>
                <Link to={`/book?activity=camping&package=${p.id}`} className={`group flex flex-wrap items-center gap-x-6 gap-y-2 px-6 py-5 transition hover:bg-white/5 ${i ? 'border-t border-white/10' : ''}`}>
                  <span className="w-20 font-display text-4xl font-extrabold text-ganga">{p.km}<span className="ml-1 text-sm text-foam/50">km</span></span>
                  <span className="min-w-48 flex-1 font-display text-xl font-bold">{p.title}</span>
                  <span className="rounded-full bg-ember/90 px-3 py-1 text-xs font-semibold text-white">{p.level}</span>
                  <span className="w-36 text-sm text-foam/60">{p.hours}</span>
                  <span className="font-semibold text-ganga transition group-hover:translate-x-1">Book →</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24">
        <SectionTitle eyebrow="Getting here" title="How to reach Rishikesh." />
        <div className="grid gap-5 md:grid-cols-3">
          {reach.map((r, i) => (
            <Reveal key={r.title} delay={i * 0.1}>
              <div className="h-full rounded-3xl border border-white/10 bg-deep p-7">
                <p className="text-4xl">{r.icon}</p>
                <h3 className="mt-4 text-xl font-bold">{r.title}</h3>
                <p className="mt-2 text-foam/65">{r.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="mt-16 flex flex-wrap items-center justify-between gap-6 rounded-3xl bg-gradient-to-r from-deep to-night p-8 ring-1 ring-white/10 md:p-10">
            <div>
              <h2 className="text-3xl font-extrabold md:text-4xl">Ready to hit the water?</h2>
              <p className="mt-1 text-foam/70">Questions first? Our FAQ covers the rest.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/faq" className="rounded-full border border-white/25 px-7 py-3.5 font-semibold transition hover:border-ganga hover:text-ganga">Read the FAQ</Link>
              <Link to="/book" className="rounded-full bg-ember px-7 py-3.5 font-semibold text-white transition hover:scale-105">Book now</Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  )
}
