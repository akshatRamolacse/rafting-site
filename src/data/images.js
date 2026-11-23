// Local photos live in /public/images; the rest are Unsplash placeholders.
const u = (id, w = 1600) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75`

export const img = {
  // Real photos from /public/images
  logo: '/images/logo.png',
  rishikesh: '/images/rishikesh.jpg',
  raftCheer: '/images/raft-cheer.jpg',
  raftSelfie: '/images/raft-selfie.jpg',
  raftThumbs: '/images/raft-thumbs.jpg',
  raftShore: '/images/raft-shore.jpg',
  crewRaft: '/images/crew-raft.jpg',
  beachJump: '/images/beach-jump.jpg',
  beachGroup: '/images/beach-group.jpg',
  rockMural: '/images/rock-mural.jpg',
  bungeeRiver: '/images/bungee-river.jpg',
  bungeeValley: '/images/bungee-valley.jpg',
  bungeePlatform: '/images/bungee-platform.jpg',
  bungeeAerial: '/images/bungee-aerial.jpg',
  // Unsplash placeholders
  rafting: u('1530866495561-507c9faab2ed'),
  tent: u('1504280390367-361c6d9f38f4'),
  campfire: u('1478131143081-80f7f84ca84d'),
  mountain: u('1506905925346-21bda4d32df4'),
  camper: u('1523987355523-c7b5b0dd90a7'),
  forest: u('1441974231531-c6227db76b6e'),
  hills: u('1470071459604-3b5ec3a7fe05'),
  surf: u('1502680390469-be75c86b636f'),
  fjord: u('1527004013197-933c4bb611b3'),
}
