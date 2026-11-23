import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { img } from '../data/images.js'
import { fragmentSrc, vertexSrc } from './waterShader.js'

const RIPPLES = 8

function compile(gl, type, src) {
  const s = gl.createShader(type)
  gl.shaderSource(s, src)
  gl.compileShader(s)
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) || 'shader error')
  return s
}

export default function DiveHero() {
  const wrap = useRef(null)
  const canvasRef = useRef(null)
  const dive = useRef(0)
  const visible = useRef(true)
  const [fallback, setFallback] = useState(false)

  const { scrollYProgress } = useScroll({ target: wrap, offset: ['start start', 'end end'] })
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    dive.current = v
  })

  // Pointer state is kept in refs so the render loop never triggers React re-renders.
  const pointer = useRef({ x: 0.5, y: 0.55, tx: 0.5, ty: 0.55, lx: -1, ly: -1 })
  const rip = useRef({ data: new Float32Array(RIPPLES * 3), next: 0 })

  const spawn = (x, y, t) => {
    const r = rip.current
    r.data.set([x, y, t], r.next * 3)
    r.next = (r.next + 1) % RIPPLES
  }

  const onMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = 1 - (e.clientY - rect.top) / rect.height
    const p = pointer.current
    p.tx = x
    p.ty = y
    const moved = Math.hypot((x - p.lx) * (rect.width / rect.height), y - p.ly)
    if (y < 0.5 && moved > 0.045) {
      spawn(x, y, performance.now() / 1000 - startRef.current)
      p.lx = x
      p.ly = y
    }
  }
  const onClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    spawn((e.clientX - rect.left) / rect.width, 1 - (e.clientY - rect.top) / rect.height, performance.now() / 1000 - startRef.current)
  }
  const startRef = useRef(performance.now() / 1000)

  useEffect(() => {
    const canvas = canvasRef.current
    const gl = canvas.getContext('webgl', { antialias: false, powerPreference: 'high-performance' })
    if (!gl) {
      setFallback(true)
      return
    }
    let prog
    try {
      prog = gl.createProgram()
      gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, vertexSrc))
      gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, fragmentSrc))
      gl.linkProgram(prog)
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog))
    } catch (err) {
      console.error('[water] shader failed, using static fallback', err)
      setFallback(true)
      return
    }
    gl.useProgram(prog)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(prog, 'aPos')
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)

    const U = (n) => gl.getUniformLocation(prog, n)
    const u = { res: U('uRes'), time: U('uTime'), dive: U('uDive'), aspect: U('uAspect'), imgAspect: U('uImgAspect'), imgW: U('uImgW'), mouse: U('uMouse'), rip: U('uRip'), tex: U('uTex') }

    const tex = gl.createTexture()
    let imgAspect = 4 / 3
    let texReady = false
    const image = new Image()
    image.crossOrigin = 'anonymous'
    image.onload = () => {
      gl.bindTexture(gl.TEXTURE_2D, tex)
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
      imgAspect = image.naturalWidth / image.naturalHeight
      texReady = true
    }
    image.src = img.rishikesh

    let w = 1
    let h = 1
    const resize = () => {
      // render at <= ~1.3 megapixels and let the browser scale up: the shader is the heaviest thing on the page
      const dpr = Math.min(window.devicePixelRatio || 1, 1.25)
      let k = dpr
      const px = canvas.clientWidth * canvas.clientHeight * dpr * dpr
      if (px > 1.3e6) k = dpr * Math.sqrt(1.3e6 / px)
      w = Math.max(1, Math.round(canvas.clientWidth * k))
      h = Math.max(1, Math.round(canvas.clientHeight * k))
      canvas.width = w
      canvas.height = h
      gl.viewport(0, 0, w, h)
    }
    resize()
    window.addEventListener('resize', resize)

    // empty ripples start "in the past" so nothing shows until the cursor moves
    const d = rip.current.data
    for (let i = 0; i < RIPPLES; i++) d[i * 3 + 2] = -100

    let raf
    let diveS = 0
    let nextDrop = 1.5
    const t0 = startRef.current
    const io = new IntersectionObserver(([entry]) => {
      visible.current = entry.isIntersecting
    })
    io.observe(canvas)
    const frame = () => {
      if (!visible.current) {
        raf = requestAnimationFrame(frame)
        return
      }
      const t = performance.now() / 1000 - t0
      const p = pointer.current
      p.x += (p.tx - p.x) * 0.06
      p.y += (p.ty - p.y) * 0.06
      diveS += (dive.current - diveS) * 0.08
      // a gentle drip now and then so the water feels alive without any input
      if (t > nextDrop && diveS < 0.5) {
        spawn(0.15 + Math.random() * 0.7, 0.04 + Math.random() * 0.3, t)
        nextDrop = t + 2 + Math.random() * 2.5
      }
      if (texReady) {
        const aspect = w / h
        const hAtW1 = aspect / imgAspect
        gl.uniform2f(u.res, w, h)
        gl.uniform1f(u.time, t)
        gl.uniform1f(u.dive, diveS)
        gl.uniform1f(u.aspect, aspect)
        gl.uniform1f(u.imgAspect, imgAspect)
        gl.uniform1f(u.imgW, Math.max(1.04, 0.9 / hAtW1))
        gl.uniform2f(u.mouse, p.x, p.y)
        gl.uniform3fv(u.rip, rip.current.data)
        gl.activeTexture(gl.TEXTURE0)
        gl.bindTexture(gl.TEXTURE_2D, tex)
        gl.uniform1i(u.tex, 0)
        gl.drawArrays(gl.TRIANGLES, 0, 3)
      }
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener('resize', resize)
    }
  }, [])

  // Text choreography along the dive.
  const p = scrollYProgress
  const titleOpacity = useTransform(p, [0, 0.14, 0.26], [1, 1, 0])
  const titleY = useTransform(p, [0, 0.26], [0, -140])
  const titleScale = useTransform(p, [0, 0.26], [1, 1.12])
  const promptOpacity = useTransform(p, [0, 0.1], [1, 0])
  const diveOpacity = useTransform(p, [0.3, 0.4, 0.55, 0.65], [0, 1, 1, 0])
  const diveY = useTransform(p, [0.3, 0.4, 0.55, 0.65], [50, 0, 0, -50])
  const endOpacity = useTransform(p, [0.72, 0.84], [0, 1])
  const endY = useTransform(p, [0.72, 0.84], [50, 0])
  const endEvents = useTransform(p, (v) => (v > 0.78 ? 'auto' : 'none'))

  return (
    <section ref={wrap} onPointerMove={onMove} onClick={onClick} className="relative h-[360vh]">
      <div className="sticky top-0 h-screen overflow-hidden bg-night">
        <canvas ref={canvasRef} aria-label="The Ganga at Rishikesh" className="absolute inset-0 size-full" />
        {fallback && <img src={img.rishikesh} alt="The Ganga at Rishikesh" className="absolute inset-0 size-full object-cover" />}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-night/70 to-transparent" />

        {/* title over the skyline */}
        <motion.div style={{ opacity: titleOpacity, y: titleY, scale: titleScale }} className="pointer-events-none absolute inset-x-0 top-[10%] px-5 text-center md:top-[9%]">
          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-2 text-xs font-semibold uppercase tracking-[0.5em] text-white/90 drop-shadow md:text-sm">
            Epic Adventure
          </motion.p>
          <h1 className="font-display text-[clamp(3rem,11vw,10rem)] font-extrabold leading-[0.9] tracking-tighter text-white drop-shadow-[0_8px_30px_rgba(0,0,0,0.45)]">
            {'Rishikesh'.split('').map((c, i) => (
              <motion.span key={i} initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.5 + i * 0.07, ease: [0.22, 1, 0.36, 1] }} className="inline-block">
                {c}
              </motion.span>
            ))}
          </h1>
        </motion.div>

        <motion.div style={{ opacity: promptOpacity }} className="pointer-events-none absolute inset-x-0 top-[70%] text-center">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.8 }} className="mx-auto w-fit max-w-[90vw] rounded-full border border-white/20 bg-night/75 px-6 py-3 font-display text-sm font-semibold tracking-[0.18em] text-white shadow-lg shadow-black/30 md:text-lg">
            Are you ready to challenge yourself?
          </motion.p>
          <motion.span initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: 2.2, duration: 0.8 }} style={{ transformOrigin: 'top' }} className="mx-auto mt-5 block h-20 w-px bg-white/70" />
          <p className="mx-auto mt-3 hidden w-fit rounded-full bg-night/65 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.35em] text-white/85 md:block">Move over the water · Scroll to dive</p>
        </motion.div>

        <motion.div style={{ opacity: diveOpacity, y: diveY }} className="pointer-events-none absolute inset-0 grid place-items-center px-5 text-center">
          <h2 className="font-display text-[clamp(3rem,10vw,9rem)] font-extrabold leading-none tracking-tighter text-white drop-shadow-xl">Dive in.</h2>
        </motion.div>

        <motion.div style={{ opacity: endOpacity, y: endY, pointerEvents: endEvents }} className="absolute inset-0 grid place-items-center px-5 text-center">
          <div>
            <h2 className="font-display text-[clamp(2.5rem,8vw,7rem)] font-extrabold leading-[0.95] tracking-tighter text-white drop-shadow-xl">Rafting. Bungee.<br />Camping.</h2>
            <p className="mx-auto mt-4 max-w-md text-lg text-foam">Three ways to feel the Ganga — pick your rush.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link to="/rafting" className="rounded-full bg-ganga px-7 py-3.5 font-semibold text-night transition hover:scale-105">River Rafting</Link>
              <Link to="/bungee" className="rounded-full bg-ganga px-7 py-3.5 font-semibold text-night transition hover:scale-105">Bungee</Link>
              <Link to="/camping" className="rounded-full bg-ganga px-7 py-3.5 font-semibold text-night transition hover:scale-105">Camping</Link>
              <Link to="/book" className="rounded-full bg-ember px-7 py-3.5 font-semibold text-white shadow-lg shadow-ember/30 transition hover:scale-105">Book now</Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
