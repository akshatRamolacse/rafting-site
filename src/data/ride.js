// Scroll-driven hero: 98 frames (1920x1080) extracted from a free Pexels clip
// ("People Doing Rafting in the River" by hasan kurt, pexels.com/video/12155882, Pexels licence).
export const RIDE = { count: 98, width: 1920, height: 1080 }
export const frameSrc = (i) => `/frames/ride-${String(i + 1).padStart(3, '0')}.webp`
