'use client'

import { navItems } from '@/lib/data'

export function CinematicHero() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative h-screen w-full flex flex-col justify-between bg-black">
      {/* Center directory */}
      <div className="flex-1 flex items-center justify-center">
        <nav className="flex flex-col items-center gap-6">
          {navItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.href)}
              className="group flex items-center gap-4 text-sharp transition-smooth hover:opacity-50"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <span className="text-white/40 text-[10px] tracking-[0.3em]">[{item.id}]</span>
              <span className="text-white tracking-[0.2em]">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Bottom left - Portrait and audio toggle */}
      <div className="absolute bottom-8 left-8 flex items-center gap-4 animate-fade-in-delay-3">
        <div className="w-12 h-12 bg-white/10 overflow-hidden">
          <div className="w-full h-full bg-gradient-to-br from-white/20 to-transparent" />
        </div>
        <AudioToggle />
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-8 animate-fade-in-delay-3">
        <span className="text-editorial">SCROLL</span>
      </div>
    </section>
  )
}

function AudioToggle() {
  return (
    <button className="text-editorial hover:text-white/80 transition-smooth">
      AUDIO: OFF
    </button>
  )
}
