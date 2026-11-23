// ─── Fill these in when you have the real details ───────────────────────────
// Digits only, with country code and no "+" or spaces. Example: '919876543210'
export const PHONE = '919548211669'
export const WHATSAPP = '919548211669' // can be the same number as PHONE
export const EMAIL = 'hello@rishikeshepicadventure.com'
// Office location — taken from the pin shared (Ashutosh Nagar, Dehradun Rd, Rishikesh).
export const ADDRESS_LINES = ['Ashutosh Nagar, Dehradun Road', 'Rishikesh, Uttarakhand, India']
export const MAP_QUERY = '30.114472,78.283944' // 30°06'52.1"N 78°17'02.2"E
// ────────────────────────────────────────────────────────────────────────────

const pretty = (n) => (n.length > 10 ? `+${n.slice(0, n.length - 10)} ${n.slice(-10, -5)} ${n.slice(-5)}` : n)

export const phoneDisplay = PHONE ? pretty(PHONE) : '+91 00000 00000'

// Until a number is added, the buttons send people to the booking form so they never hit a dead link.
export const callHref = PHONE ? `tel:+${PHONE}` : '/book'
export const whatsappHref = (message) =>
  WHATSAPP ? `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}` : '/book'
export const isExternal = (href) => !href.startsWith('/')

// Pre-filled WhatsApp message that matches the page the visitor is on.
export function whatsappMessage(pathname) {
  const base = "Hi Rishikesh Epic Adventure! I'd like to know more about"
  if (pathname.startsWith('/rafting')) return `${base} river rafting.`
  if (pathname.startsWith('/bungee')) return `${base} bungee jumping.`
  if (pathname.startsWith('/camping')) return `${base} camping at Neem Beach.`
  return `${base} rafting, bungee and camping packages.`
}

export const mapEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&z=15&output=embed`
export const mapLinkHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAP_QUERY)}`
