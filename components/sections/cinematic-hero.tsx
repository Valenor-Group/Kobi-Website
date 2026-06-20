'use client'

import { navItems } from '@/lib/data'
import { useAudio } from '@/components/audio/audio-provider'
import { SectionAtmosphere } from '@/components/shared/section-atmosphere'
import { useSpaceNav } from '@/components/shared/space-nav-context'
import { FeaturedRelease } from '@/components/releases/featured-release'

export function CinematicHero() {
  const { audioEnabled, toggleAudio } = useAudio()
  const { navigateToSpace } = useSpaceNav()

  return (
    <section id="home" className="relative flex h-screen w-full flex-col justify-between overflow-hidden bg-black">
      <SectionAtmosphere variant="front" />

      <div className="relative z-10 flex flex-1 items-center justify-center">
        <nav className="flex flex-col items-center gap-6">
          {navItems.map((item, index) => (
            <button
              key={item.id}
              data-cursor-label="ENTER"
              onClick={() => navigateToSpace(item.href, item.spaceName)}
              className="group text-sharp transition-smooth hover:opacity-50"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <span className="flex items-center gap-4">
                <span className="text-[10px] tracking-[0.3em] text-white/40">[{item.id}]</span>
                <span className="tracking-[0.2em] text-white">{item.label}</span>
              </span>
            </button>
          ))}
        </nav>
      </div>

      <FeaturedRelease />

      <div className="animate-fade-in-delay-3 absolute bottom-8 left-8 z-10 md:bottom-8">
        <button
          type="button"
          onClick={toggleAudio}
          className="text-editorial transition-smooth hover:text-white/80 md:hidden"
        >
          AUDIO: {audioEnabled ? 'ON' : 'OFF'}
        </button>
      </div>

      <div className="animate-fade-in-delay-3 absolute right-8 bottom-8 z-10">
        <span className="text-editorial">SCROLL</span>
      </div>
    </section>
  )
}
