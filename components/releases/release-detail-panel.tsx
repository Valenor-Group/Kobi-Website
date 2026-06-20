'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { ExternalLink } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import type { Project } from '@/lib/data'

const platformLabels: Record<string, string> = {
  spotify: 'SPOTIFY',
  apple: 'APPLE MUSIC',
  youtube: 'YOUTUBE',
  soundcloud: 'SOUNDCLOUD',
}

interface ReleaseDetailPanelProps {
  project: Project | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ReleaseDetailPanel({ project, open, onOpenChange }: ReleaseDetailPanelProps) {
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    setImageError(false)
  }, [project?.id])

  if (!project) return null

  const isUpcoming = project.status === 'upcoming'
  const links = Object.entries(project.links).filter(([, url]) => Boolean(url))

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="rounded-none border-white/10 bg-black p-8 sm:max-w-md"
        showCloseButton
      >
        <DialogHeader className="gap-6">
          {!isUpcoming && (
            <div className="relative mx-auto aspect-square w-48 overflow-hidden bg-white/5">
              {!imageError ? (
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5" />
              )}
            </div>
          )}
          <div className="text-center">
            <DialogTitle className="text-sharp-lg font-mono font-normal tracking-[0.15em] text-white">
              {isUpcoming ? 'COMING SOON' : project.title}
            </DialogTitle>
            <p className="mt-2 text-editorial">
              {isUpcoming ? 'TBA — 2026' : `${project.type} — ${project.year}`}
            </p>
          </div>
        </DialogHeader>

        {isUpcoming ? (
          <p className="mt-4 text-center text-editorial">New music on the way.</p>
        ) : links.length > 0 ? (
          <div className="mt-4 flex flex-col gap-3">
            {links.map(([platform, url]) => (
              <a
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between border border-white/10 px-4 py-3 text-sharp text-white/70 transition-smooth hover:border-white/30 hover:text-white"
                data-cursor-label="LISTEN"
              >
                <span>{platformLabels[platform] ?? platform.toUpperCase()}</span>
                <ExternalLink className="size-3 opacity-0 transition-opacity group-hover:opacity-100" strokeWidth={1.5} />
              </a>
            ))}
          </div>
        ) : (
          <p className="mt-4 text-center text-editorial">Streaming links coming soon</p>
        )}
      </DialogContent>
    </Dialog>
  )
}
