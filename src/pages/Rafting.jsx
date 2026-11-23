import Seo from '../components/Seo.jsx'
import PackageCard from '../components/PackageCard.jsx'
import PageHero from '../components/PageHero.jsx'
import Reveal from '../components/Reveal.jsx'
import SectionTitle from '../components/SectionTitle.jsx'
import { img } from '../data/images.js'
import { raftImages, raftingPackages } from '../data/packages.js'

const inclusions = ['Rafting with certified guide', 'Safety gear & life jacket', 'Helmet & paddle', 'Safety kayaker support', 'Swim & cliff-jump stops', 'Transfers to start point']

export default function Rafting() {
  return (
    <>
      <Seo title="River Rafting in Rishikesh" description="River rafting in Rishikesh on the Ganga: Grade II–IV rapids, certified guides and six trips from 9 km to 70 km. Choose your stretch and book online." />
      <PageHero image={img.raftThumbs} eyebrow="River rafting" title="White water, real thrills.">Six stretches, one river. Pick your distance — from a gentle family float to the full Devprayag expedition.</PageHero>
      <section className="mx-auto max-w-7xl px-5 py-24">
        <SectionTitle eyebrow="Packages" title="Pick your stretch.">Sample packages — final routes and details coming soon.</SectionTitle>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {raftingPackages.map((p, i) => (
            <PackageCard key={p.id} activity="rafting" pkg={p} image={raftImages[i]} index={i} />
          ))}
        </div>
      </section>
      <section className="bg-deep py-24">
        <div className="mx-auto max-w-7xl px-5">
          <SectionTitle eyebrow="Typically included" title="Everything for a perfect run.">Exact inclusions vary by package and will be confirmed at booking.</SectionTitle>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {inclusions.map((t, i) => (
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
