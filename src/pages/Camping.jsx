import { Link } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import PageHero from '../components/PageHero.jsx'
import Reveal from '../components/Reveal.jsx'
import SectionTitle from '../components/SectionTitle.jsx'
import { callHref, phoneDisplay, whatsappHref } from '../data/contact.js'
import { galleryItems } from '../data/gallery.js'
import { img } from '../data/images.js'

const highlights = [
  { icon: '⛺', title: 'Riverside tents', text: 'Sleep in a comfortable tent on the sand, a few steps from the water.' },
  { icon: '🔥', title: 'Bonfire & music', text: 'Gather around the fire with friends, music and stories after dark.' },
  { icon: '🍽️', title: 'Dinner & breakfast', text: 'Hot, freshly prepared food in the evening and a proper breakfast to start the day.' },
  { icon: '✨', title: 'Starry skies', text: 'Away from the town lights, the night sky over the Ganga valley is something else.' },
  { icon: '🏖️', title: 'White-sand beach', text: 'Walk, play and relax on a quiet sandy bank of the Ganga — ideal for groups.' },
  { icon: '🌅', title: 'Sunrise by the river', text: 'Wake up to mountain light on the water and the sound of the current.' },
]

const night = [
  { title: 'Arrive & settle in', text: 'Meet the camp team, get your tent and freshen up.' },
  { title: 'Beach time', text: 'Relax, play and explore the sandy bank as the sun goes down.' },
  { title: 'Bonfire & music', text: 'Warm up around the fire with music and good company.' },
  { title: 'Dinner under the stars', text: 'A hot riverside meal, then settle into your tent beside the water.' },
  { title: 'Sunrise & breakfast', text: 'Wake up to the river, enjoy breakfast and head home refreshed.' },
]

const bring = ['Change of dry clothes', 'Warm layer for the night', 'Torch / headlamp', 'Sunscreen & sunglasses', 'Personal medicines', 'Valid photo ID']

const bookHref = '/book?activity=camping&package=camp-stay'

// Real guest photos first, then stock camp shots (swap in your own camp photos when you have them).
const campPhotos = [
  ...galleryItems.filter((g) => g.tag === 'Camping'),
  { src: img.tent, alt: 'Tents pitched at a riverside camp' },
  { src: img.campfire, alt: 'Bonfire at night' },
  { src: img.camper, alt: 'Guest enjoying the camp view' },
  { src: img.mountain, alt: 'Mountains above the river valley' },
  { src: img.forest, alt: 'Forest around the camp' },
]

export default function Camping() {
  const wa = whatsappHref("Hi Rishikesh Epic Adventure! I'd like to know more about camping at Neem Beach.")
  return (
    <>
      <Seo title="Riverside Camping in Rishikesh – Neem Beach Camp" description="Camp on the white sand of Neem Beach by the Ganga in Rishikesh: riverside tents, bonfire and music, dinner and breakfast. Call or message us to plan your stay." />
      <PageHero image={img.beachJump} eyebrow="Camping" title="Sleep by the Ganga." cta={{ to: bookHref, label: 'Book now' }}>Riverside tents, a crackling bonfire and a sky full of stars — a night at Neem Beach you won't forget.</PageHero>

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-24 lg:grid-cols-2">
        <Reveal>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-ganga">The camp</p>
          <h2 className="text-4xl font-extrabold leading-tight md:text-5xl">A night on the river, not just a stay.</h2>
          <p className="mt-5 text-foam/70">Neem Beach is a quiet, sandy bank of the Ganga, away from the town noise. Pitch up, unwind, and let the evening unfold — tents, a bonfire, hot food and nothing but the sound of the river.</p>
          <p className="mt-4 text-foam/70">It works for friends, couples, families and corporate groups. Tell us your group size and your dates, and we'll plan the stay with you.</p>
          <Link to={bookHref} className="mt-7 inline-flex items-center gap-2 rounded-full bg-ember px-7 py-3 font-semibold text-white transition hover:scale-[1.03] hover:bg-ganga hover:text-night">Book now <span aria-hidden>→</span></Link>
        </Reveal>
        <Reveal delay={0.1}>
          <img src={img.beachGroup} alt="Group of guests on Neem Beach" loading="lazy" className="aspect-[4/3] w-full rounded-3xl border border-white/10 object-cover" />
        </Reveal>
      </section>

      <section className="bg-deep py-24">
        <div className="mx-auto max-w-7xl px-5">
          <SectionTitle eyebrow="Camp life" title="What a night at camp feels like.">Exact facilities will be confirmed when you get in touch.</SectionTitle>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {highlights.map((h, i) => (
              <Reveal key={h.title} delay={i * 0.05}>
                <div className="h-full rounded-2xl border border-white/10 bg-night/50 p-6">
                  <span className="text-3xl" aria-hidden>{h.icon}</span>
                  <h3 className="mt-4 text-xl font-bold">{h.title}</h3>
                  <p className="mt-2 text-sm text-foam/65">{h.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24">
        <SectionTitle eyebrow="Your camp night" title="From sunset to sunrise.">A typical flow — exact timings depend on the season and your group.</SectionTitle>
        <ol className="grid gap-4 md:grid-cols-5">
          {night.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.06}>
              <li className="h-full list-none rounded-2xl border border-white/10 bg-deep p-6">
                <span className="font-display text-3xl font-extrabold text-ganga">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-3 text-lg font-bold">{s.title}</h3>
                <p className="mt-2 text-sm text-foam/65">{s.text}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="bg-deep py-24">
        <div className="mx-auto max-w-7xl px-5">
          <SectionTitle eyebrow="Gallery" title="Life at the camp." />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {campPhotos.map((g, i) => (
              <Reveal key={g.src} delay={i * 0.06}>
                <img src={g.src} alt={g.alt} loading="lazy" className="aspect-[4/3] w-full rounded-2xl border border-white/10 object-cover" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24">
        <div>
          <SectionTitle eyebrow="Pack smart" title="What to bring.">Light and simple — we take care of the tents and the food.</SectionTitle>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {bring.map((t, i) => (
              <Reveal key={t} delay={i * 0.05}>
                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-deep p-5"><span className="text-ganga">•</span>{t}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-24 text-center">
        <Reveal>
          <h2 className="text-4xl font-extrabold md:text-5xl">Ready to camp on the Ganga?</h2>
          <p className="mx-auto mt-4 max-w-xl text-foam/70">Send a quick enquiry and our team will call you back with rates, dates and options — or call and message us directly.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a href={callHref} className="rounded-full bg-ganga px-7 py-3 font-semibold text-night transition hover:bg-ember hover:text-white">Call {phoneDisplay}</a>
            <a href={wa} target="_blank" rel="noreferrer" className="rounded-full border border-white/20 px-7 py-3 font-semibold transition hover:border-ganga hover:text-ganga">WhatsApp us</a>
            <Link to={bookHref} className="rounded-full bg-ember px-7 py-3 font-semibold text-white transition hover:scale-[1.03]">Book now</Link>
          </div>
        </Reveal>
      </section>
    </>
  )
}
