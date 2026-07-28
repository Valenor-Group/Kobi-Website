'use client'

import { flushSync } from 'react-dom'
import { createContext, useCallback, useContext, useState, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface SpaceNavContextValue {
  navigateToSpace: (href: string, spaceName: string) => void
}

const SpaceNavContext = createContext<SpaceNavContextValue | null>(null)

export function SpaceNavProvider({ children }: { children: ReactNode }) {
  const [transition, setTransition] = useState<string | null>(null)

  const navigateToSpace = useCallback((href: string, spaceName: string) => {
    flushSync(() => setTransition(spaceName))
    window.setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      window.setTimeout(() => setTransition(null), 450)
    }, 350)
  }, [])

  return (
    <SpaceNavContext.Provider value={{ navigateToSpace }}>
      {children}
      <div
        aria-hidden
        className={cn(
          'pointer-events-none fixed inset-0 z-[100] flex items-center justify-center bg-black transition-opacity duration-300',
          transition ? 'opacity-100' : 'opacity-0',
        )}
      >
        {transition && (
          <span className="text-sharp animate-fade-in text-white tracking-[0.3em]">
            {transition.toUpperCase()}
          </span>
        )}
      </div>
    </SpaceNavContext.Provider>
  )
}

export function useSpaceNav() {
  const context = useContext(SpaceNavContext)
  if (!context) {
    throw new Error('useSpaceNav must be used within SpaceNavProvider')
  }
  return context
}

export function scrollToSection(href: string) {
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
