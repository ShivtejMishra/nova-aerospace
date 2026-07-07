import { useInView } from '../../hooks/useInView'
import { useCountUp } from '../../hooks/useCountUp'

interface CounterProps {
  value: number
  label: string
  suffix?: string
  prefix?: string
  decimals?: number
  className?: string
}

export function Counter({ value, label, suffix = '', prefix = '', decimals = 0, className = '' }: CounterProps) {
  const { ref, inView } = useInView<HTMLDivElement>()
  const display = useCountUp(value, inView, 2200, decimals)

  return (
    <div ref={ref} className={`text-center ${className}`}>
      <div className="font-display text-4xl font-bold text-gradient md:text-5xl">
        {prefix}
        {display.toLocaleString()}
        {suffix}
      </div>
      <div className="mt-2 text-sm text-[color:var(--muted)]">{label}</div>
    </div>
  )
}
