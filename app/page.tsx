'use client'

import { useState } from 'react'
import { AudioProvider } from '@/components/audio/audio-provider'
import { AudioPlayer } from '@/components/audio/audio-player'
import { SiteBrand } from '@/components/layout/site-brand'
import { SpaceNavProvider } from '@/components/shared/space-nav-context'
import { CustomCursor } from '@/components/shared/custom-cursor'
import { CinematicHero } from '@/components/sections/cinematic-hero'
import { ProjectsSection } from '@/components/sections/projects-section'
import { StudioSection } from '@/components/sections/studio-section'
import { InquireSection } from '@/components/sections/inquire-section'

export default function Home() {
  const [subject, setSubject] = useState('')

  return (
    <AudioProvider>
      <SpaceNavProvider>
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
