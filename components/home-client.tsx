'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'
import { AudioProvider } from '@/components/audio/audio-provider'
import { SiteBrand } from '@/components/layout/site-brand'
import { SpaceNavProvider } from '@/components/shared/space-nav-context'
import { CinematicHero } from '@/components/sections/cinematic-hero'

const CustomCursor = dynamic(
  () => import('@/components/shared/custom-cursor').then((m) => m.CustomCursor),
  { ssr: false },
)

const ProjectsSection = dynamic(
  () => import('@/components/sections/projects-section').then((m) => m.ProjectsSection),
)

const StudioSection = dynamic(
  () => import('@/components/sections/studio-section').then((m) => m.StudioSection),
)

const InquireSection = dynamic(
  () => import('@/components/sections/inquire-section').then((m) => m.InquireSection),
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
