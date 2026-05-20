'use client'

import { useState, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { projects } from '@/lib/data'

export function ProjectsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  const scrollToIndex = (index: number) => {
    if (carouselRef.current) {
      const scrollAmount = index * (carouselRef.current.offsetWidth * 0.6 + 32)
      carouselRef.current.scrollTo({ left: scrollAmount, behavior: 'smooth' })
    }
    setCurrentIndex(index)
  }

  const handlePrev = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : projects.length - 1
    scrollToIndex(newIndex)
  }

  const handleNext = () => {
    const newIndex = currentIndex < projects.length - 1 ? currentIndex + 1 : 0
    scrollToIndex(newIndex)
  }

  return (
    <section id="projects" className="min-h-screen bg-black py-32 md:py-48 flex flex-col justify-center relative overflow-hidden">
      {/* Subtle animated background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-white/[0.035] blur-[120px] animate-drift" />
        <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-white/[0.03] blur-[100px] animate-drift-reverse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-white/[0.04] blur-[180px] animate-pulse-slow" />
      </div>

      {/* Section label */}
      <div className="px-8 mb-16 relative z-10">
        <span className="text-editorial">[01] PROJECTS</span>
      </div>

      {/* Carousel container */}
      <div className="relative flex items-center z-10">
        {/* Left arrow */}
        <button
          onClick={handlePrev}
          className="absolute left-4 md:left-8 z-10 text-white/30 hover:text-white transition-smooth"
          aria-label="Previous project"
        >
          <ChevronLeft className="w-8 h-8" strokeWidth={1} />
        </button>

        {/* Carousel */}
        <div
          ref={carouselRef}
          className="flex gap-8 overflow-x-auto scrollbar-hide px-8 md:px-24 snap-x snap-mandatory"
        >
          {projects.map((project) => (
            <div
              key={project.id}
              className="flex-shrink-0 w-[60vw] md:w-[40vw] lg:w-[30vw] snap-center group"
            >
              {/* Album artwork */}
              <div className="aspect-square bg-white/5 mb-6 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-white/10 via-transparent to-white/5 group-hover:scale-105 transition-transform duration-700" />
              </div>

              {/* Album info */}
              <div className="space-y-2">
                <h3 className="text-sharp-lg text-white">{project.title}</h3>
                <p className="text-editorial">
                  {project.type} — {project.year}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Right arrow */}
        <button
          onClick={handleNext}
          className="absolute right-4 md:right-8 z-10 text-white/30 hover:text-white transition-smooth"
          aria-label="Next project"
        >
          <ChevronRight className="w-8 h-8" strokeWidth={1} />
        </button>
      </div>

      {/* Progress indicators */}
      <div className="flex justify-center gap-3 mt-12 relative z-10">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToIndex(index)}
            className={`w-8 h-[1px] transition-smooth ${
              index === currentIndex ? 'bg-white' : 'bg-white/20'
            }`}
            aria-label={`Go to project ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
