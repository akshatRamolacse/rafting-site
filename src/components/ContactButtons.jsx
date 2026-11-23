import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { callHref, isExternal, whatsappHref, whatsappMessage } from '../data/contact.js'

const WhatsAppIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
    <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.3-1.4-.8-.7-1.4-1.6-1.6-1.9-.2-.3 0-.4.1-.6l.4-.5c.1-.1.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3zM12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2z" />
  </svg>
)
const PhoneIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
    <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.6 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.6 3.6a1 1 0 0 1-.25 1z" />
  </svg>
)

// Link or anchor depending on whether the target is an in-app route (placeholder) or tel:/wa.me.
function Action({ href, children, ...rest }) {
  return isExternal(href) ? (
    <a href={href} {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...rest}>{children}</a>
  ) : (
    <Link to={href} {...rest}>{children}</Link>
  )
}

export default function ContactButtons() {
  const { pathname } = useLocation()
  const wa = whatsappHref(whatsappMessage(pathname))

  return (
    <>
      {/* desktop / tablet: floating buttons */}
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5, type: 'spring', stiffness: 160, damping: 18 }} className="fixed bottom-6 right-6 z-40 hidden flex-col items-end gap-3 md:flex">
        <Action href={callHref} aria-label="Call us" className="group flex items-center gap-3">
          <span className="pointer-events-none translate-x-2 rounded-full bg-night/90 px-4 py-2 text-sm font-medium opacity-0 shadow-lg transition group-hover:translate-x-0 group-hover:opacity-100">Call us</span>
          <span className="grid size-12 place-items-center rounded-full bg-ganga text-night shadow-lg shadow-black/30 transition group-hover:scale-110"><PhoneIcon className="size-6" /></span>
        </Action>
        <Action href={wa} aria-label="Chat with us on WhatsApp" className="group flex items-center gap-3">
          <span className="pointer-events-none translate-x-2 rounded-full bg-night/90 px-4 py-2 text-sm font-medium opacity-0 shadow-lg transition group-hover:translate-x-0 group-hover:opacity-100">Chat on WhatsApp</span>
          <span className="relative grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/30 transition group-hover:scale-110">
            <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/50 [animation-duration:2.4s]" />
            <WhatsAppIcon className="relative size-8" />
          </span>
        </Action>
      </motion.div>

      {/* phones: a bottom bar that never leaves the screen */}
      <motion.div initial={{ y: 80 }} animate={{ y: 0 }} transition={{ delay: 1, type: 'spring', stiffness: 160, damping: 20 }} className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-px bg-white/10 pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_30px_rgba(0,0,0,0.35)] md:hidden">
        <Action href={callHref} className="flex items-center justify-center gap-2 bg-night py-3.5 font-semibold text-foam">
          <PhoneIcon className="size-5 text-ganga" /> Call
        </Action>
        <Action href={wa} className="flex items-center justify-center gap-2 bg-[#25D366] py-3.5 font-semibold text-white">
          <WhatsAppIcon className="size-5" /> WhatsApp
        </Action>
      </motion.div>
    </>
  )
}
