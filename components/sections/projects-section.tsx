'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { releasedProjects, upcomingProjects, type Project } from '@/lib/data'
import { ProjectArtwork } from '@/components/releases/project-artwork'
import { ReleaseDetailPanel } from '@/components/releases/release-detail-panel'
import { SectionAtmosphere } from '@/components/shared/section-atmosphere'
import { AnimateOnScroll } from '@/components/shared/animate-on-scroll'
import { cn } from '@/lib/utils'

export function ProjectsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [panelOpen, setPanelOpen] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const slideRefs = useRef<(HTMLDivElement | null)[]>([])

  const updateActiveIndex = useCallback(() => {
    const container = carouselRef.current
    if (!container) return

    const containerCenter = container.scrollLeft + container.offsetWidth / 2
    let closestIndex = 0
    let closestDistance = Infinity

    slideRefs.current.forEach((slide, index) => {
      if (!slide) return
      const slideCenter = slide.offsetLeft + slide.offsetWidth / 2
      const distance = Math.abs(containerCenter - slideCenter)
      if (distance < closestDistance) {
        closestDistance = distance
        closestIndex = index
      }
    })

    setCurrentIndex(closestIndex)
  }, [])

  useEffect(() => {
    const container = carouselRef.current
    if (!container) return

    updateActiveIndex()
    container.addEventListener('scroll', updateActiveIndex, { passive: true })
    window.addEventListener('resize', updateActiveIndex)

    return () => {
      container.removeEventListener('scroll', updateActiveIndex)
      window.removeEventListener('resize', updateActiveIndex)
    }
  }, [updateActiveIndex])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.3 },
    )
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => {
      const newIndex = prev > 0 ? prev - 1 : releasedProjects.length - 1
      const slide = slideRefs.current[newIndex]
      const container = carouselRef.current
      if (slide && container) {
        const scrollLeft = slide.offsetLeft - (container.offsetWidth - slide.offsetWidth) / 2
        container.scrollTo({ left: scrollLeft, behavior: 'smooth' })
      }
      return newIndex
    })
  }, [])

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => {
      const newIndex = prev < releasedProjects.length - 1 ? prev + 1 : 0
      const slide = slideRefs.current[newIndex]
      const container = carouselRef.current
      if (slide && container) {
        const scrollLeft = slide.offsetLeft - (container.offsetWidth - slide.offsetWidth) / 2
        container.scrollTo({ left: scrollLeft, behavior: 'smooth' })
      }
      return newIndex
    })
  }, [])

  useEffect(() => {
    const isTypingTarget = (target: EventTarget | null) => {
      if (!(target instanceof HTMLElement)) return false
      const tag = target.tagName
      return tag === 'INPUT' || tag === 'TEXTAREA' || target.isContentEditable
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (isTypingTarget(event.target)) return

      if (event.key === 'Escape' && panelOpen) {
        event.preventDefault()
        setPanelOpen(false)
        return
      }

      if (!isInView || panelOpen) return

      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        handlePrev()
      } else if (event.key === 'ArrowRight') {
        event.preventDefault()
        handleNext()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isInView, panelOpen, handlePrev, handleNext])

  const scrollToIndex = (index: number) => {
    const slide = slideRefs.current[index]
    const container = carouselRef.current
    if (slide && container) {
      const scrollLeft = slide.offsetLeft - (container.offsetWidth - slide.offsetWidth) / 2
      container.scrollTo({ left: scrollLeft, behavior: 'smooth' })
    }
    setCurrentIndex(index)
  }

  const handlePrevClick = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : releasedProjects.length - 1
    scrollToIndex(newIndex)
  }

  const handleNextClick = () => {
    const newIndex = currentIndex < releasedProjects.length - 1 ? currentIndex + 1 : 0
    scrollToIndex(newIndex)
  }

  const openDetail = (project: Project) => {
    setSelectedProject(project)
    setPanelOpen(true)
  }

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-black py-32 md:py-48"
    >
      <SectionAtmosphere variant="vault" />

      <AnimateOnScroll className="relative z-10 mb-16 px-8">
        <span className="text-editorial">[01] THE VAULT</span>
      </AnimateOnScroll>

      <div className="relative z-10 flex items-center">
        <button
          onClick={handlePrevClick}
          data-cursor-label="PREV"
          className="absolute left-4 z-10 text-white/30 transition-smooth hover:text-white md:left-8"
          aria-label="Previous project"
        >
          <ChevronLeft className="h-8 w-8" strokeWidth={1} />
        </button>

        <div
          ref={carouselRef}
          className="scrollbar-hide flex snap-x snap-mandatory gap-8 overflow-x-auto px-8 md:px-24"
        >
          {releasedProjects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => {
                slideRefs.current[index] = el
              }}
              className={cn(
                'w-[60vw] shrink-0 snap-center transition-all duration-700 ease-out md:w-[40vw] lg:w-[30vw]',
                index === currentIndex ? 'scale-100 opacity-100' : 'scale-[0.92] opacity-45',
              )}
            >
              <ProjectArtwork project={project} onOpenDetail={() => openDetail(project)} />
              <AnimateOnScroll delay={index * 80}>
                <div className="space-y-2">
                  <h3 className="text-sharp-lg text-white">{project.title}</h3>
                  <p className="text-editorial">
                    {project.type} — {project.year}
                  </p>
                </div>
              </AnimateOnScroll>
            </div>
          ))}
        </div>

        <button
          onClick={handleNextClick}
          data-cursor-label="NEXT"
          className="absolute right-4 z-10 text-white/30 transition-smooth hover:text-white md:right-8"
          aria-label="Next project"
        >
          <ChevronRight className="h-8 w-8" strokeWidth={1} />
        </button>
      </div>

      <div className="relative z-10 mt-12 flex justify-center gap-3">
        {releasedProjects.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToIndex(index)}
            className={`h-[1px] w-8 transition-smooth ${
              index === currentIndex ? 'bg-white' : 'bg-white/20'
            }`}
            aria-label={`Go to project ${index + 1}`}
          />
        ))}
      </div>

      {upcomingProjects.length > 0 && (
        <AnimateOnScroll className="relative z-10 mt-20 px-8 md:px-24" delay={200}>
          <span className="text-editorial mb-8 block">UPCOMING</span>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-12 md:max-w-3xl">
            {upcomingProjects.map((project, index) => (
              <AnimateOnScroll key={project.id} delay={index * 120}>
                <div>
                  <ProjectArtwork
                    project={project}
                    compact
                    onOpenDetail={() => openDetail(project)}
                  />
                  <div className="space-y-2">
                    <h3 className="text-sharp-lg text-white/60">COMING SOON</h3>
                    <p className="text-editorial">TBA — {project.year}</p>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </AnimateOnScroll>
      )}

      <ReleaseDetailPanel
        project={selectedProject}
        open={panelOpen}
        onOpenChange={setPanelOpen}
      />
    </section>
  )
}
