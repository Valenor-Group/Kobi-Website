'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'
import { AudioProvider } from '@/components/audio/audio-provider'
import { SiteBrand } from '@/components/layout/site-brand'
import { SpaceNavProvider } from '@/components/shared/space-nav-context'
import { CinematicHero } from '@/components/sections/cinematic-hero'
import { ProjectsSection } from '@/components/sections/projects-section'
import { StudioSection } from '@/components/sections/studio-section'
import { InquireSection } from '@/components/sections/inquire-section'
import { DaVinciPromoOverlay } from '@/components/promo/da-vinci-promo-overlay'

const CustomCursor = dynamic(
  () => import('@/components/shared/custom-cursor').then((m) => m.CustomCursor),
  { ssr: false },
)

const AudioPlayer = dynamic(
  () => import('@/components/audio/audio-player').then((m) => m.AudioPlayer),
  { ssr: false },
)

export function HomeClient() {
  const [subject, setSubject] = useState('')

  return (
    <AudioProvider>
      <SpaceNavProvider>
        <DaVinciPromoOverlay />
        <CustomCursor />
        <SiteBrand />
        <main className="bg-black">
          <CinematicHero />
          <ProjectsSection />
          <StudioSection onServiceSelect={setSubject} />
          <InquireSection subject={subject} onSubjectChange={setSubject} />
        </main>
        <AudioPlayer />
      </SpaceNavProvider>
    </AudioProvider>
  )
}
