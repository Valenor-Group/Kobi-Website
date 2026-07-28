'use client'

import { useEffect, useState } from 'react'
import { navItems } from '@/lib/data'
import { useAudio } from '@/components/audio/audio-provider'
import { scrollToSection } from '@/components/shared/space-nav-context'
import { cn } from '@/lib/utils'

export function SiteBrand() {
  const [scrolled, setScrolled] = useState(false)
  const { audioEnabled, toggleAudio } = useAudio()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.6)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 right-0 left-0 z-50 flex items-center justify-between px-8 py-8 transition-smooth',
        scrolled && 'bg-black/40 backdrop-blur-sm',
      )}
    >
      <button
        type="button"
        onClick={() => scrollToSection('#home')}
        className={cn(
          'touch-manipulation font-sans text-sm font-semibold tracking-[0.25em] transition-smooth hover:opacity-100',
          scrolled ? 'text-white' : 'text-white/60',
        )}
        aria-label="Back to home"
      >
        KOBI!
      </button>

      <nav
        className={cn(
          'hidden items-center gap-6 transition-all duration-500 md:flex',
          scrolled ? 'opacity-100 translate-y-0' : 'pointer-events-none opacity-0 -translate-y-1',
        )}
        aria-hidden={!scrolled}
      >
        {navItems.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => scrollToSection(item.href)}
            className="touch-manipulation text-editorial transition-smooth hover:text-white"
          >
            {item.label}
          </button>
        ))}
        <span className="h-3 w-px bg-white/20" aria-hidden />
        <button
          type="button"
          onClick={toggleAudio}
          className="text-editorial transition-smooth hover:text-white/80"
        >
          AUDIO: {audioEnabled ? 'ON' : 'OFF'}
        </button>
      </nav>
    </header>
  )
}
