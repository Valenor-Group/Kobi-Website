'use client'

import { studioServices } from '@/lib/data'

interface StudioSectionProps {
  onServiceSelect: (service: string) => void
}

export function StudioSection({ onServiceSelect }: StudioSectionProps) {
  const handleServiceClick = (serviceTitle: string) => {
    onServiceSelect(serviceTitle)
    const element = document.querySelector('#inquire')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section id="studio" className="min-h-screen bg-black py-32 md:py-48 flex flex-col justify-center relative overflow-hidden">
      {/* Animated background with more motion */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Central morphing blob */}
        <div className="absolute top-1/2 left-1/2 w-[550px] h-[550px] bg-white/[0.025] blur-[110px] animate-morph" />
        {/* Drifting orbs */}
        <div className="absolute top-[25%] left-[20%] w-[320px] h-[320px] rounded-full bg-white/[0.025] blur-[85px] animate-drift" />
        <div className="absolute bottom-[20%] right-[15%] w-[380px] h-[380px] rounded-full bg-white/[0.03] blur-[95px] animate-drift-reverse" />
        <div className="absolute top-[60%] right-[35%] w-[260px] h-[260px] rounded-full bg-white/[0.02] blur-[75px] animate-float" />
        {/* Pulsing accent */}
        <div className="absolute top-[20%] right-[30%] w-[300px] h-[300px] rounded-full bg-white/[0.015] blur-[90px] animate-pulse-slow" />
      </div>

      {/* Section label */}
      <div className="px-8 mb-16 relative z-10">
        <span className="text-editorial">[02] THE STUDIO</span>
      </div>

      {/* Services list */}
      <div className="px-8 md:px-16 lg:px-32 max-w-5xl mx-auto w-full relative z-10">
        <ul className="space-y-8 md:space-y-12">
          {studioServices.map((service) => (
            <li key={service.id} className="group">
              <button
                onClick={() => handleServiceClick(service.title)}
                className="w-full flex items-center gap-4 py-4 border-b border-white/10 hover:border-white/30 transition-all duration-300 ease-out text-left"
              >
                <span className="font-sans text-2xl md:text-4xl lg:text-5xl font-light tracking-tight text-white group-hover:text-white/70 transition-all duration-300 ease-out whitespace-nowrap">
                  {service.title}
                </span>
                <span className="text-white/40 text-sm md:text-base font-mono tracking-wide opacity-0 max-w-0 group-hover:opacity-100 group-hover:max-w-[500px] transition-all duration-300 ease-out overflow-hidden whitespace-nowrap">
                  {service.description}
                </span>
                <span className="text-editorial opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out ml-auto whitespace-nowrap">
                  INQUIRE →
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
