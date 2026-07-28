'use client'

import { useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { studioServices, type StudioService } from '@/lib/data'
import { SectionAtmosphere } from '@/components/shared/section-atmosphere'
import { AnimateOnScroll } from '@/components/shared/animate-on-scroll'
import { scrollToSection } from '@/components/shared/space-nav-context'
import { useSectionInView } from '@/hooks/use-section-in-view'

const ServiceDetailPanel = dynamic(
  () => import('@/components/studio/service-detail-panel').then((m) => m.ServiceDetailPanel),
  { ssr: false },
)

interface StudioSectionProps {
  onServiceSelect: (service: string) => void
}

export function StudioSection({ onServiceSelect }: StudioSectionProps) {
  const [selectedService, setSelectedService] = useState<StudioService | null>(null)
  const [panelOpen, setPanelOpen] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useSectionInView(sectionRef)

  const openService = (service: StudioService) => {
    setSelectedService(service)
    setPanelOpen(true)
  }

  const handleInquire = (serviceTitle: string) => {
    onServiceSelect(serviceTitle)
    scrollToSection('#inquire')
  }

  return (
    <section
      ref={sectionRef}
      id="studio"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-black py-32 md:py-48"
    >
      <SectionAtmosphere variant="lab" paused={!inView} />

      <AnimateOnScroll className="relative z-10 mb-16 px-8">
        <span className="text-editorial">[02] THE LAB</span>
      </AnimateOnScroll>

      <div className="relative z-10 mx-auto w-full max-w-5xl px-8 md:px-16 lg:px-32">
        <ul className="space-y-8 md:space-y-12">
          {studioServices.map((service, index) => (
            <AnimateOnScroll key={service.id} delay={index * 100}>
              <li className="group">
                <button
                  data-cursor-label="VIEW"
                  onClick={() => openService(service)}
                  className="flex w-full items-center gap-4 border-b border-white/10 py-4 text-left transition-all duration-300 ease-out hover:border-white/30"
                >
                  <span className="font-sans text-2xl font-light tracking-tight whitespace-nowrap text-white transition-all duration-300 ease-out group-hover:text-white/70 md:text-4xl lg:text-5xl">
                    {service.title}
                  </span>
                  <span className="max-w-0 overflow-hidden font-mono text-sm tracking-wide whitespace-nowrap text-white/40 opacity-0 transition-all duration-300 ease-out group-hover:max-w-[500px] group-hover:opacity-100 md:text-base">
                    {service.description}
                  </span>
                  <span className="text-editorial ml-auto whitespace-nowrap opacity-0 transition-all duration-300 ease-out group-hover:opacity-100">
                    VIEW →
                  </span>
                </button>
              </li>
            </AnimateOnScroll>
          ))}
        </ul>
      </div>

      <ServiceDetailPanel
        service={selectedService}
        open={panelOpen}
        onOpenChange={setPanelOpen}
        onInquire={handleInquire}
      />
    </section>
  )
}
