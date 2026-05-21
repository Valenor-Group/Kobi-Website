'use client'

import { useState } from 'react'
import { CinematicHero } from '@/components/sections/cinematic-hero'
import { ProjectsSection } from '@/components/sections/projects-section'
import { StudioSection } from '@/components/sections/studio-section'
import { InquireSection } from '@/components/sections/inquire-section'

export default function Home() {
  const [subject, setSubject] = useState('')

  return (
    <main className="bg-black">
      <CinematicHero />
      <ProjectsSection />
      <StudioSection onServiceSelect={setSubject} />
      <InquireSection subject={subject} onSubjectChange={setSubject} />
    </main>
  )
}
