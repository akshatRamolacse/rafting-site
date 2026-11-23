import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Accordion from '../components/Accordion.jsx'
import Reveal from '../components/Reveal.jsx'
import Seo from '../components/Seo.jsx'
import { faqCategories, faqs } from '../data/faq.js'
import { whatsappHref } from '../data/contact.js'

export default function Faq() {
  const [cat, setCat] = useState('All')
  const items = cat === 'All' ? faqs : faqs.filter((f) => f.cat === cat)

  // FAQ structured data so Google can show the questions in search results
  useEffect(() => {
    const el = document.createElement('script')
    el.type = 'application/ld+json'
    el.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    })
    document.head.appendChild(el)
    return () => el.remove()
  }, [])

  const wa = whatsappHref('Hi Rishikesh Epic Adventure! I have a question about my trip.')
  return (
    <>
      <Seo title="FAQ – River Rafting, Camping & Bungee in Rishikesh" description="Answers to common questions about river rafting, camping at Neem Beach and bungee jumping in Rishikesh: age and weight limits, season, safety, what is included and how to book." />
      <section className="px-5 pb-10 pt-36 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-ganga">FAQ</p>
        <h1 className="mx-auto mt-3 max-w-3xl text-5xl font-extrabold leading-[1.02] md:text-7xl">Questions? Answered.</h1>
        <p className="mx-auto mt-4 max-w-md text-foam/70">Everything people ask before their first rapid, night on the beach or jump.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-2" role="tablist" aria-label="Question topics">
          {faqCategories.map((c) => (
            <button key={c} role="tab" aria-selected={cat === c} onClick={() => setCat(c)} className={`rounded-full px-5 py-2 text-sm font-semibold transition ${cat === c ? 'bg-ganga text-night' : 'border border-white/20 text-foam/80 hover:border-ganga hover:text-ganga'}`}>{c}</button>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-3xl px-5 pb-16">
        <Accordion key={cat} items={items} />
      </section>
      <section className="mx-auto max-w-3xl px-5 pb-24">
        <Reveal>
          <div className="rounded-3xl bg-gradient-to-br from-deep to-night p-8 text-center ring-1 ring-white/10">
            <h2 className="text-3xl font-extrabold">Still have a question?</h2>
            <p className="mt-2 text-foam/70">Message us and we will reply as soon as we can.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {wa.startsWith('http') ? <a href={wa} target="_blank" rel="noopener noreferrer" className="rounded-full bg-[#25D366] px-7 py-3.5 font-semibold text-white transition hover:scale-105">Ask on WhatsApp</a> : null}
              <Link to="/book" className="rounded-full bg-ember px-7 py-3.5 font-semibold text-white transition hover:scale-105">Book now</Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  )
}
