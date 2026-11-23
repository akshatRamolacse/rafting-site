import Reveal from './Reveal.jsx'

export default function SectionTitle({ eyebrow, title, children, center }) {
  return (
    <Reveal className={`mb-12 ${center ? 'mx-auto text-center' : ''} max-w-2xl`}>
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-ganga">{eyebrow}</p>
      <h2 className="text-4xl font-extrabold leading-tight md:text-5xl">{title}</h2>
      {children && <p className="mt-4 text-foam/65">{children}</p>}
    </Reveal>
  )
}
