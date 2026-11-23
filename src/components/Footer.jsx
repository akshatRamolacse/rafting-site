import { Link } from 'react-router-dom'
import { ADDRESS_LINES, callHref, EMAIL, isExternal, mapEmbedSrc, mapLinkHref, phoneDisplay } from '../data/contact.js'

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-night">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-3">
        <div>
          <img src="/images/logo.png" alt="Epic Adventure logo" className="mb-3 size-24" />
          <p className="font-display text-2xl font-bold">Rishikesh <span className="text-ganga">Epic</span> Adventure</p>
          <p className="mt-3 max-w-xs text-sm text-foam/60">Rafting, bungee and riverside camping on the Ganga — the Yoga Capital's wildest side.</p>
        </div>
        <div className="text-sm">
          <p className="mb-3 font-semibold text-foam">Explore</p>
          <ul className="space-y-2 text-foam/60">
            <li><Link className="hover:text-ganga" to="/rafting">River Rafting</Link></li>
            <li><Link className="hover:text-ganga" to="/bungee">Bungee Jumping</Link></li>
            <li><Link className="hover:text-ganga" to="/camping">Camping</Link></li>
            <li><Link className="hover:text-ganga" to="/gallery">Gallery</Link></li>
            <li><Link className="hover:text-ganga" to="/guide">Rishikesh Guide</Link></li>
            <li><Link className="hover:text-ganga" to="/about">About us</Link></li>
            <li><Link className="hover:text-ganga" to="/faq">FAQ</Link></li>
            <li><Link className="hover:text-ganga" to="/book">Book an adventure</Link></li>
          </ul>
        </div>
        <div className="text-sm text-foam/60">
          <p className="mb-3 font-semibold text-foam">Contact</p>
          <address className="mb-2 not-italic">
            {ADDRESS_LINES.map((line) => <p key={line}>{line}</p>)}
          </address>
          <p>{isExternal(callHref) ? <a className="hover:text-ganga" href={callHref}>{phoneDisplay}</a> : phoneDisplay}</p>
          <p><a className="hover:text-ganga" href={`mailto:${EMAIL}`}>{EMAIL}</a></p>
          <a className="mt-3 inline-block text-ganga hover:underline" href={mapLinkHref} target="_blank" rel="noreferrer">Get directions →</a>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-5 pb-14">
        <iframe
          title="Rishikesh Epic Adventure office location"
          src={mapEmbedSrc}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-64 w-full rounded-2xl border border-white/10 opacity-90 [filter:invert(90%)_hue-rotate(180deg)] md:h-80"
        />
      </div>
      <p className="border-t border-white/10 py-5 text-center text-xs text-foam/40">© {new Date().getFullYear()} Rishikesh Epic Adventure.</p>
    </footer>
  )
}
