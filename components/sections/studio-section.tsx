'use client'

import { studioServices } from '@/lib/data'

export function StudioSection() {
  const scrollToInquire = () => {
    const element = document.querySelector('#inquire')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="studio" className="min-h-screen bg-black py-32 md:py-48 flex flex-col justify-center">
      {/* Section label */}
      <div className="px-8 mb-16">
        <span className="text-editorial">[02] THE STUDIO</span>
      </div>

      {/* Services list */}
      <div className="px-8 md:px-16 lg:px-32 max-w-4xl mx-auto w-full">
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
