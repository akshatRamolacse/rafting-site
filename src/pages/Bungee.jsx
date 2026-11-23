import Seo from '../components/Seo.jsx'
import PackageCard from '../components/PackageCard.jsx'
import PageHero from '../components/PageHero.jsx'
import Reveal from '../components/Reveal.jsx'
import SectionTitle from '../components/SectionTitle.jsx'
import { img } from '../data/images.js'
import { bungeePackages } from '../data/packages.js'

const images = [img.bungeePlatform, img.bungeeRiver, img.bungeeValley, img.bungeeAerial]
const perks = ['Certified equipment', 'Trained professionals', 'Safety first', 'Stunning locations', 'Photos & videos (optional)', 'Pickup & drop available']

export default function Bungee() {
  return (
    <>
      <Seo title="Bungee Jumping in Rishikesh – 55 m to 249 m" description="Bungee jumping in Rishikesh, India's bungee capital: seven jumps from 55 m to 249 m with certified equipment, trained crew and no-fuss online booking. Book now." />
      <PageHero image={img.bungeeValley} eyebrow="Bungee jumping" title="Life looks better from here.">Real adventure. Seven jumps from 55 m to 249 m — push your limits over the Ganga valley.</PageHero>
      <section className="mx-auto max-w-7xl px-5 py-24">
        <SectionTitle eyebrow="Packages" title="Choose your jump.">Pick a height and location, then book — we'll confirm the details with you on WhatsApp or phone.</SectionTitle>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {bungeePackages.map((p, i) => <PackageCard key={p.id} activity="bungee" pkg={p} image={images[i % images.length]} index={i} />)}
        </div>
      </section>
      <section className="bg-deep py-24">
        <div className="mx-auto max-w-7xl px-5">
          <SectionTitle eyebrow="Why jump with us" title="Adventure with safety built in.">Exact inclusions vary by jump and will be confirmed at booking.</SectionTitle>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {perks.map((t, i) => (
              <Reveal key={t} delay={i * 0.05}>
                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-night/50 p-5"><span className="text-ganga">✓</span>{t}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
