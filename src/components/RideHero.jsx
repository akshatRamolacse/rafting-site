import { motion, useMotionValue, useMotionValueEvent, useScroll, useSpring, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { frameSrc, RIDE } from '../data/ride.js'

const headline = ['Ride', 'the', 'Ganga.', 'Jump.', 'Camp', 'wild.']

// Scrolling "drives" the raft through the frame sequence; the cursor only nudges the camera.
const captions = [
  { range: [0.2, 0.3, 0.44, 0.52], title: 'Feel the rush.', text: 'Grade II–IV rapids that wake up every nerve.' },
  { range: [0.5, 0.58, 0.7, 0.78], title: 'Paddle as one.', text: 'Certified guides, a full crew and the Ganga doing the rest.' },
]

function Caption({ progress, range, title, text }) {
  const opacity = useTransform(progress, range, [0, 1, 1, 0])
  const y = useTransform(progress, range, [40, 0, 0, -40])
  return (
    <motion.div style={{ opacity, y }} className="pointer-events-none absolute inset-x-0 bottom-[22%] mx-auto w-full max-w-7xl px-5">
      <h2 className="max-w-2xl text-5xl font-extrabold leading-none drop-shadow-xl md:text-7xl">{title}</h2>
      <p className="mt-4 max-w-md text-lg text-foam drop-shadow-lg">{text}</p>
    </motion.div>
  )
}

export default function RideHero() {
  const wrap = useRef(null)
  const canvasRef = useRef(null)
  const frames = useRef(new Array(RIDE.count).fill(null))
  const target = useRef(0)
  const [ready, setReady] = useState(false)

  const { scrollYProgress } = useScroll({ target: wrap, offset: ['start start', 'end end'] })
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    target.current = v * (RIDE.count - 1)
  })

  // Cursor → camera.
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 55, damping: 15, mass: 1.1 })
  const sy = useSpring(my, { stiffness: 55, damping: 15, mass: 1.1 })
  const camX = useTransform(sx, [-0.5, 0.5], ['3.5%', '-3.5%'])
  const camY = useTransform(sy, [-0.5, 0.5], ['3%', '-3%'])
  const camRoll = useTransform(sx, [-0.5, 0.5], [-2.2, 2.2])
  const camRotY = useTransform(sx, [-0.5, 0.5], [-4, 4])
  const camRotX = useTransform(sy, [-0.5, 0.5], [2.5, -2.5])
  const onMove = (e) => {
    mx.set(e.clientX / window.innerWidth - 0.5)
    my.set(e.clientY / window.innerHeight - 0.5)
  }

  // Preload: first frame, then a sparse pass, then fill in the rest — so it can play almost immediately.
  useEffect(() => {
    let cancelled = false
    const order = []
    const seen = new Set()
    for (const step of [RIDE.count, 12, 6, 3, 1]) {
      for (let i = 0; i < RIDE.count; i += step) {
        if (!seen.has(i)) {
          seen.add(i)
          order.push(i)
        }
      }
    }
    let next = 0
    const load = () => {
      if (cancelled || next >= order.length) return
      const i = order[next++]
      const im = new Image()
      im.decoding = 'async'
      im.onload = () => {
        // decode now so drawing a frame mid-scroll never stalls the main thread
        const done = () => {
          frames.current[i] = im
          if (i === 0) setReady(true)
          load()
        }
        if (im.decode) im.decode().then(done, done)
        else done()
      }
      im.onerror = load
      im.src = frameSrc(i)
    }
    for (let k = 0; k < 4; k++) load()
    return () => {
      cancelled = true
    }
  }, [])

  // Draw loop: ease toward the scroll position and cross-fade neighbouring frames for smooth motion.
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.imageSmoothingQuality = 'high'
    let raf
    let current = 0
    let lastKey = ''
    let visible = true
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
    })
    io.observe(canvas)
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.25)
      canvas.width = Math.round(canvas.clientWidth * dpr)
      canvas.height = Math.round(canvas.clientHeight * dpr)
      ctx.imageSmoothingQuality = 'high'
      lastKey = ''
    }
    const near = (i) => {
      for (let d = 0; d < RIDE.count; d++) {
        const f = frames.current[i - d] || frames.current[i + d]
        if (f) return f
      }
      return null
    }
    const drawCover = (im, alpha) => {
      const s = Math.max(canvas.width / im.naturalWidth, canvas.height / im.naturalHeight)
      const w = im.naturalWidth * s
      const h = im.naturalHeight * s
      ctx.globalAlpha = alpha
      ctx.drawImage(im, (canvas.width - w) / 2, (canvas.height - h) / 2, w, h)
    }
    const tick = () => {
      if (!visible) {
        raf = requestAnimationFrame(tick)
        return
      }
      current += (target.current - current) * 0.1
      if (Math.abs(target.current - current) < 0.002) current = target.current
      const i0 = Math.floor(current)
      const frac = current - i0
      const a = near(i0)
      const b = frames.current[Math.min(i0 + 1, RIDE.count - 1)]
      const key = `${i0}|${frac.toFixed(2)}|${a ? 1 : 0}${b ? 1 : 0}`
      if (a && key !== lastKey) {
        lastKey = key
        drawCover(a, 1)
        if (b && b !== a && frac > 0.02) drawCover(b, frac)
      }
      raf = requestAnimationFrame(tick)
    }
    resize()
    window.addEventListener('resize', resize)
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener('resize', resize)
    }
  }, [])

  const introOpacity = useTransform(scrollYProgress, [0, 0.1, 0.18], [1, 1, 0])
  const introY = useTransform(scrollYProgress, [0, 0.18], [0, -60])
  const hintOpacity = useTransform(scrollYProgress, [0, 0.06], [1, 0])
  const endOpacity = useTransform(scrollYProgress, [0.82, 0.92], [0, 1])
  const endY = useTransform(scrollYProgress, [0.82, 0.92], [40, 0])
  const endEvents = useTransform(scrollYProgress, (v) => (v > 0.85 ? 'auto' : 'none'))

  return (
    <section ref={wrap} onPointerMove={onMove} className="relative h-[520vh]">
      <div className="sticky top-0 h-screen overflow-hidden bg-deep [perspective:1400px]">
        <motion.div style={{ x: camX, y: camY, rotate: camRoll, rotateX: camRotX, rotateY: camRotY }} className="absolute inset-0">
          <motion.div animate={{ y: [0, -6, 4, -3, 0], rotate: [0, 0.35, -0.3, 0.2, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} className="absolute -inset-[4%]">
            <canvas ref={canvasRef} aria-label="A raft of passengers riding river rapids" className="size-full" />
          </motion.div>
        </motion.div>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-night/70 via-transparent via-40% to-night/75" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-night/45 via-transparent to-transparent" />

        {!ready && <div className="absolute inset-0 grid place-items-center text-sm uppercase tracking-[0.3em] text-foam/70">Loading the river…</div>}

        {/* intro */}
        <motion.div style={{ opacity: introOpacity, y: introY }} className="pointer-events-none absolute inset-x-0 top-0 mx-auto w-full max-w-7xl px-5 pt-28 md:pt-36">
          <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm">
            <span className="size-2 animate-pulse rounded-full bg-ganga" /> Rishikesh · Uttarakhand · Season open
          </motion.p>
          <h1 className="max-w-4xl text-[clamp(2.5rem,5.6vw,5.25rem)] font-extrabold leading-[0.98] drop-shadow-xl">
            {headline.map((w, i) => (
              <span key={i} className="mr-[0.25em] inline-block overflow-hidden align-bottom">
                <motion.span
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className={`inline-block ${i === 2 ? 'text-ganga' : i === 5 ? 'text-ember' : ''}`}
                >
                  {w}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }} className="mt-4 max-w-xl text-lg text-foam drop-shadow-lg">
            White-water rafting, heart-stopping bungee and riverside camping on the holy Ganga — guided by certified pros.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4 }} className="pointer-events-auto mt-6 flex flex-wrap gap-4">
            <Link to="/book" className="rounded-full bg-ember px-8 py-4 font-semibold text-white shadow-lg shadow-ember/30 transition hover:scale-105">Book your adventure</Link>
            <a href="#activities" className="rounded-full border border-white/30 bg-night/30 px-8 py-4 font-semibold transition hover:bg-white/10">Explore activities</a>
          </motion.div>
        </motion.div>

        {captions.map((c) => (
          <Caption key={c.title} progress={scrollYProgress} {...c} />
        ))}

        {/* finale */}
        <motion.div style={{ opacity: endOpacity, y: endY, pointerEvents: endEvents }} className="absolute inset-x-0 bottom-[20%] mx-auto w-full max-w-7xl px-5">
          <h2 className="max-w-3xl text-5xl font-extrabold leading-none drop-shadow-xl md:text-7xl">Then camp under the stars.</h2>
          <p className="mt-4 max-w-md text-lg text-foam drop-shadow-lg">Raft in, pitch up at Neem Beach, wake to the Ganga.</p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link to="/book" className="rounded-full bg-ember px-8 py-4 font-semibold text-white shadow-lg shadow-ember/30 transition hover:scale-105">Book your adventure</Link>
            <Link to="/camping" className="rounded-full border border-white/30 bg-night/30 px-8 py-4 font-semibold transition hover:bg-white/10">See camping packages</Link>
          </div>
        </motion.div>

        {/* hints + progress */}
        <motion.div style={{ opacity: hintOpacity }} className="pointer-events-none absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-xs uppercase tracking-[0.3em] text-foam/90">
          <span className="hidden md:block">Move to look around</span>
          <span>Scroll to ride</span>
          <motion.span animate={{ y: [0, 8, 0] }} transition={{ duration: 1.4, repeat: Infinity }} className="block h-8 w-px bg-foam/80" />
        </motion.div>
        <div className="pointer-events-none absolute right-5 top-1/2 hidden h-40 w-0.5 -translate-y-1/2 rounded bg-white/20 md:block">
          <motion.div style={{ scaleY: scrollYProgress, transformOrigin: 'top' }} className="size-full rounded bg-ganga" />
        </div>
      </div>
    </section>
  )
}
