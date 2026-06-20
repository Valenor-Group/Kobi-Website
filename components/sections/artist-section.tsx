import Link from 'next/link'
import { releases } from '@/lib/data'
import { SectionHeader } from '@/components/shared/section-header'
import { AnimateOnScroll } from '@/components/shared/animate-on-scroll'
import { ReleaseCard } from '@/components/cards/release-card'

export function ArtistSection() {
  return (
    <section id="releases" className="py-24 md:py-32">
      <div className="container mx-auto px-4">
        <AnimateOnScroll>
          <SectionHeader 
            title="Latest Releases"
            subtitle="Explore the latest tracks, singles, and albums from the studio."
          />
        </AnimateOnScroll>

        {/* Releases Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {releases.map((release, index) => (
            <AnimateOnScroll key={release.id} delay={index * 100}>
              <ReleaseCard release={release} />
            </AnimateOnScroll>
          ))}
        </div>

        {/* View All Link */}
        <AnimateOnScroll delay={400}>
          <div className="mt-12 text-center">
            <Link 
              href="#" 
              className="text-sm text-muted-foreground hover:text-primary transition-colors underline-offset-4 hover:underline"
            >
              View all releases
            </Link>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
