// ─── Team: replace the placeholders below ──────────────────────────────────
// photo: put the file in /public/images/team/ and use '/images/team/name.jpg' (square or portrait works best).
// Leave photo as '' to show a placeholder avatar. Add or remove members freely.
export const team = [
  {
    name: 'Nitin',
    role: 'Lead river guide',
    bio: 'Government-licensed river guide who knows every rapid on the Ganga stretch from Shivpuri to Rishikesh.',
    photo: '/images/team/nitin.jpg',
    certs: ['UTDB Licensed River Guide'],
    // Only the verifiable licence details are shown publicly — not the personal info printed on the card.
    license: { issuer: 'Uttarakhand Tourism Development Board', title: 'River Guide Identity Card', number: '072/177/2022', validTill: '31 Aug 2027' },
  },
  {
    name: 'Deepak Thapa',
    role: 'River guide',
    bio: 'Government-licensed river guide who keeps every raft crew safe, relaxed and laughing from put-in to take-out.',
    photo: '/images/team/deepak.jpg',
    certs: ['UTDB Licensed River Guide'],
    license: { issuer: 'Uttarakhand Tourism Development Board', title: 'River Guide Identity Card', number: '178/168/2026' },
  },
  { name: 'Arvind Kumar', role: 'Field staff', bio: 'On the river and on the ground — keeping every trip safe, smooth and on schedule.', photo: '/images/team/field-staff.jpg', certs: [] },
  { name: 'Atul Bhandari', role: 'Guide helper', bio: 'Supports our lead guides on the water — gear checks, safety briefings and keeping every raft crew looked after.', photo: '/images/team/atul.jpg', focus: 'center 15%', certs: [] },
  { name: 'Yogesh Aswal', role: 'Receptionist', bio: 'Your first point of contact — he handles bookings, answers your questions and gets your trip confirmed.', photo: '/images/team/yogesh.jpg', certs: [] },
]
