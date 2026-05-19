import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface GlassCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
}

export function GlassCard({ children, className, hover = true }: GlassCardProps) {
  return (
    <div
      className={cn(
        'glass-card p-6',
        hover && 'transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:glow-primary-sm',
        className
      )}
    >
      {children}
    </div>
  )
}
