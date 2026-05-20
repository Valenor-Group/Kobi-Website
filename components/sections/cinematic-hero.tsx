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
      {/* Animated background with more motion */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Central morphing blob */}
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-white/[0.03] blur-[100px] animate-morph" />
        {/* Drifting orbs */}
        <div className="absolute top-[20%] left-[15%] w-[300px] h-[300px] rounded-full bg-white/[0.025] blur-[80px] animate-drift" />
        <div className="absolute top-[60%] right-[20%] w-[350px] h-[350px] rounded-full bg-white/[0.03] blur-[90px] animate-drift-reverse" />
        <div className="absolute bottom-[15%] left-[40%] w-[250px] h-[250px] rounded-full bg-white/[0.02] blur-[70px] animate-float" />
        {/* Pulsing center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-white/[0.015] blur-[120px] animate-pulse-slow" />
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
