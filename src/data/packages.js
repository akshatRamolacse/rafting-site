import { img } from './images.js'

// Camping / rafting-trail packages — all end at Neem Beach.
export const campingPackages = [
  { id: 'devprayag', km: 70, from: 'Devprayag', level: 'Epic', hours: '2 days', blurb: 'The full expedition: the legendary confluence of Alaknanda and Bhagirathi down to Neem Beach, with a riverside night under the stars.' },
  { id: 'kodiyala', km: 36, from: 'Kodiyala', level: 'Adventurous', hours: '1 day + camp', blurb: 'Big-water rapids from Kodiyala, then camp on a quiet white-sand beach.' },
  { id: 'marine-drive', km: 24, from: 'Marine Drive', level: 'Thrilling', hours: '3–4 hrs + camp', blurb: 'The classic rapid-packed stretch — Golf Course, Three Blind Mice and more.' },
  { id: 'shivpuri', km: 16, from: 'Shivpuri', level: 'Popular', hours: '2–3 hrs + camp', blurb: 'The sweet spot between thrills and time — perfect for first-timers and friends.' },
  { id: 'clubhouse', km: 12, from: 'Clubhouse', level: 'Easy-Medium', hours: '1.5–2 hrs + camp', blurb: 'A short, splashy run with plenty of swim stops, ending at camp.' },
  { id: 'brahmpuri', km: 9, from: 'Brahmpuri', level: 'Beginner', hours: '1–1.5 hrs + camp', blurb: 'A gentle, family-friendly float through the holy town to Neem Beach.' },
].map((p) => ({ ...p, to: 'Neem Beach', title: `${p.from} → Neem Beach` }))

// Rafting-only runs on the same stretches as the camping trails (no overnight stay). Sample content — replace once real packages are provided.
export const raftingPackages = [
  { id: 'rafting-70', title: 'Devprayag → Rishikesh', km: 70, level: 'Epic', hours: '2 days', blurb: 'The full expedition from the confluence of Alaknanda and Bhagirathi, down the whole length of the Ganga.' },
  { id: 'rafting-36', title: 'Kodiyala → Rishikesh', km: 36, level: 'Adventurous', hours: '5–6 hrs', blurb: 'Big-water rapids from Kodiyala all the way down to Rishikesh.' },
  { id: 'rafting-24', title: 'Marine Drive → Rishikesh', km: 24, level: 'Thrilling', hours: '3 hrs', blurb: 'Grade III–IV rapids with a full-throttle finish.' },
  { id: 'rafting-16', title: 'Shivpuri → Rishikesh', km: 16, level: 'Popular', hours: '2 hrs', blurb: 'The crowd favourite: Golden, Roller Coaster, Club House.' },
  { id: 'rafting-12', title: 'Clubhouse → Rishikesh', km: 12, level: 'Easy-Medium', hours: '1.5 hrs', blurb: 'A short, splashy run with plenty of swim stops.' },
  { id: 'rafting-9', title: 'Brahmpuri → Rishikesh', km: 9, level: 'Beginner', hours: '1 hr', blurb: 'Gentle rapids, perfect for families and kids 7+.' },
]

// Bungee options by jump height. Rates are not shown on the site — guests get them when they book.
export const bungeePackages = [
  { id: 'bungee-55', height: '55 m', level: 'Starter', place: 'Thrill Factory, Rishikesh', blurb: 'The perfect first leap — a shorter drop that still delivers the full rush.' },
  { id: 'bungee-85', height: '85 m', level: 'Thrill', place: 'Splash Bungee, Rishikesh', blurb: 'A bigger drop over the turquoise Ganga with a trained crew at every step.' },
  { id: 'bungee-109', height: '109 m', level: 'Thrill', place: 'Splash Bungee, Rishikesh', blurb: 'Over 100 m of freefall above the forested valley.' },
  { id: 'bungee-111', height: '111 m', level: 'Freestyle', place: 'Himalayan Bungee Freestyle, Rishikesh', blurb: 'The freestyle jump — leap your own way into the gorge.' },
  { id: 'bungee-117', height: '117 m', level: 'Extreme', place: 'Himalayan Bungee Standard, Rishikesh', blurb: 'A classic standard jump from one of the taller platforms in Rishikesh.' },
  { id: 'bungee-200', height: '200 m', level: 'Epic', place: 'Rishikesh', blurb: 'A serious leap for serious thrill-seekers, high above the river.' },
  { id: 'bungee-249', height: '249 m', level: 'Ultimate', place: 'M&A Ganga Bungee, Devprayag', blurb: 'The ultimate drop, at the legendary confluence of the Alaknanda and Bhagirathi.' },
].map((p) => ({ ...p, title: `${p.height} Bungee` }))

export const activityOptions = [
  { value: 'rafting', label: 'River Rafting', packages: raftingPackages },
  { value: 'bungee', label: 'Bungee Jumping', packages: bungeePackages },
  { value: 'camping', label: 'Camping', packages: [{ id: 'camp-stay', title: 'Riverside camp stay – Neem Beach' }] },
]

export const raftImages = [img.raftCheer, img.raftShore, img.raftSelfie, img.raftThumbs, img.crewRaft, img.beachGroup]
export const campImages = [img.rockMural, img.beachGroup, img.beachJump, img.raftShore, img.raftCheer, img.crewRaft]
