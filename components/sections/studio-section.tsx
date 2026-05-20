'use client'

import { studioServices } from '@/lib/data'

export function StudioSection() {
  const scrollToInquire = () => {
    const element = document.querySelector('#inquire')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section id="studio" className="min-h-screen bg-black py-32 md:py-48 flex flex-col justify-center relative overflow-hidden">
      {/* Subtle animated background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[350px] h-[350px] rounded-full bg-white/[0.01] blur-[90px] animate-drift" />
        <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] rounded-full bg-white/[0.012] blur-[110px] animate-drift-reverse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-white/[0.008] blur-[130px] animate-pulse-slow" />
      </div>

      {/* Section label */}
      <div className="px-8 mb-16 relative z-10">
        <span className="text-editorial">[02] THE STUDIO</span>
      </div>

      {/* Services list */}
      <div className="px-8 md:px-16 lg:px-32 max-w-4xl mx-auto w-full relative z-10">
        <ul className="space-y-8 md:space-y-12">
          {studioServices.map((service) => (
            <li key={service.id} className="group">
              <button
                onClick={scrollToInquire}
                className="w-full flex items-center justify-between py-4 border-b border-white/10 hover:border-white/30 transition-smooth"
              >
                <span className="font-sans text-2xl md:text-4xl lg:text-5xl font-light tracking-tight text-white group-hover:text-white/70 transition-smooth">
                  {service.title}
                </span>
                <span className="text-editorial opacity-0 group-hover:opacity-100 transition-smooth">
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
