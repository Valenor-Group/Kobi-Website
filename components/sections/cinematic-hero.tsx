'use client'

import { navItems } from '@/lib/data'

export function CinematicHero() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section id="home" className="relative h-screen w-full flex flex-col justify-between bg-black overflow-hidden">
      {/* Subtle animated background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-white/[0.04] blur-[150px] animate-pulse-slow" />
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-white/[0.03] blur-[100px] animate-drift" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-white/[0.025] blur-[120px] animate-drift-reverse" />
      </div>

      {/* Center directory */}
      <div className="flex-1 flex items-center justify-center relative z-10">
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
      <div className="absolute bottom-8 left-8 flex items-center gap-4 animate-fade-in-delay-3 z-10">
        <div className="w-12 h-12 bg-white/10 overflow-hidden">
          <div className="w-full h-full bg-gradient-to-br from-white/20 to-transparent" />
        </div>
        <AudioToggle />
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-8 animate-fade-in-delay-3 z-10">
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
