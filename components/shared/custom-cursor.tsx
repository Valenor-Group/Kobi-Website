'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [label, setLabel] = useState<string | null>(null)
  const [visible, setVisible] = useState(false)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(pointer: fine)')
    const updateEnabled = () => {
      const isFine = media.matches
      setEnabled(isFine)
      document.documentElement.classList.toggle('custom-cursor-active', isFine)
    }
    updateEnabled()
    media.addEventListener('change', updateEnabled)
    return () => {
      media.removeEventListener('change', updateEnabled)
      document.documentElement.classList.remove('custom-cursor-active')
    }
  }, [])

  useEffect(() => {
    if (!enabled) return

    const onMove = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY })
      setVisible(true)

      const target = event.target as HTMLElement | null
      const labeled = target?.closest('[data-cursor-label]') as HTMLElement | null
      setLabel(labeled?.dataset.cursorLabel ?? null)
    }

    const onLeave = () => setVisible(false)

    window.addEventListener('mousemove', onMove)
    document.documentElement.addEventListener('mouseleave', onLeave)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <>
      <div
        className={cn(
          'pointer-events-none fixed z-[200] size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white mix-blend-difference transition-opacity duration-200',
          visible ? 'opacity-100' : 'opacity-0',
        )}
        style={{ left: position.x, top: position.y }}
        aria-hidden
      />
      {label && visible && (
        <span
          className="pointer-events-none fixed z-[200] text-editorial text-white/70"
          style={{ left: position.x + 14, top: position.y - 6 }}
          aria-hidden
        >
          {label}
        </span>
      )}
    </>
  )
}
