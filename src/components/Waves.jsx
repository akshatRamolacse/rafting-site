// Two layers of looping SVG waves. `fill` is the colour of the section below.
const path = 'M0 60 C 150 10 350 110 600 60 S 1050 10 1200 60 V120 H0 Z'

export default function Waves({ fill = '#06141a', className = '' }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-x-0 bottom-[-1px] h-24 overflow-hidden ${className}`}>
      <svg className="animate-wave-b absolute bottom-0 h-full w-[200%] opacity-40" viewBox="0 0 2400 120" preserveAspectRatio="none">
        <path d={path} fill={fill} /><path d={path} fill={fill} transform="translate(1200 0)" />
      </svg>
      <svg className="animate-wave-a absolute bottom-0 h-3/4 w-[200%]" viewBox="0 0 2400 120" preserveAspectRatio="none">
        <path d={path} fill={fill} /><path d={path} fill={fill} transform="translate(1200 0)" />
      </svg>
    </div>
  )
}
