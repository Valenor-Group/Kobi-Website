'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Play } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAudio } from '@/components/audio/audio-provider'
import { hasStreamingLinks, StreamingIconRow } from '@/components/releases/streaming-icons'
import type { Project } from '@/lib/data'

interface ProjectArtworkProps {
  project: Project
  onOpenDetail?: () => void
  compact?: boolean
  priority?: boolean
}

function PlayButton({
  isActive,
  onClick,
  size = 'default',
}: {
  isActive: boolean
  onClick: (e: React.MouseEvent) => void
  size?: 'default' | 'compact'
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-cursor-label="PLAY"
      aria-label="Play preview"
      className={cn(
        'flex shrink-0 items-center justify-center border border-white/30 bg-black/60 transition-smooth hover:border-white hover:bg-black/80',
        size === 'default' ? 'size-14' : 'size-10',
        isActive && 'border-white/60',
      )}
    >
      <Play
        className={cn('fill-white text-white', size === 'default' ? 'ml-0.5 size-5' : 'ml-0.5 size-3.5')}
      />
    </button>
  )
}

export function ProjectArtwork({ project, onOpenDetail, compact, priority = false }: ProjectArtworkProps) {
  const [imageError, setImageError] = useState(false)
  const { playPreview, currentTrack, isPlaying } = useAudio()

  const isUpcoming = project.status === 'upcoming'
  const isActive = currentTrack?.id === project.id && isPlaying
  const hasPreview = Boolean(project.previewUrl) && !isUpcoming
  const hasLinks = hasStreamingLinks(project.links)
  const showControls = !isUpcoming && (hasPreview || hasLinks)

  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!hasPreview) return
    playPreview(project)
  }

  const handleCoverClick = () => {
    if (isUpcoming) {
      onOpenDetail?.()
    }
  }

  return (
    <div
      role={isUpcoming && onOpenDetail ? 'button' : undefined}
      tabIndex={isUpcoming && onOpenDetail ? 0 : undefined}
      onClick={isUpcoming ? handleCoverClick : undefined}
      onKeyDown={
        isUpcoming && onOpenDetail
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                handleCoverClick()
              }
            }
          : undefined
      }
      className={cn(
        'group relative mb-6 aspect-square w-full overflow-hidden bg-white/5 text-left',
        isUpcoming && onOpenDetail && 'cursor-default',
        compact && 'mb-4',
      )}
      aria-label={isUpcoming ? 'Upcoming release' : project.title}
    >
      {!imageError ? (
        <Image
          src={project.image}
          alt={isUpcoming ? 'Upcoming release' : project.title}
          fill
          sizes={compact ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 60vw, 30vw'}
          priority={priority}
          loading={priority ? undefined : 'lazy'}
          className={cn(
            'object-cover transition-transform duration-700',
            !isUpcoming && 'group-hover:scale-105',
            isUpcoming && 'opacity-40 blur-sm',
          )}
          onError={() => setImageError(true)}
        />
      ) : (
        <div
          className={cn(
            'absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 transition-transform duration-700',
            !isUpcoming && 'group-hover:scale-105',
            isUpcoming && 'opacity-40',
          )}
        />
      )}

      {isUpcoming ? (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
          <span className="text-editorial text-white/80">COMING SOON</span>
        </div>
      ) : showControls ? (
        <>
          {/* Desktop: play + icons centered on hover */}
          <div
            className={cn(
              'absolute inset-0 hidden flex-col items-center justify-center gap-4 bg-black/30 transition-opacity duration-300 md:flex',
              isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100',
            )}
          >
            {hasPreview && <PlayButton isActive={isActive} onClick={handlePlayClick} />}
            {hasLinks && <StreamingIconRow links={project.links} />}
          </div>

          {/* Mobile: muted controls always visible at bottom */}
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-2 bg-gradient-to-t from-black/80 via-black/50 to-transparent px-3 py-3 md:hidden">
            {hasPreview && (
              <PlayButton isActive={isActive} onClick={handlePlayClick} size="compact" />
            )}
            {hasLinks && (
              <StreamingIconRow links={project.links} iconClassName="text-white/40 active:text-white" />
            )}
          </div>
        </>
      ) : null}
    </div>
  )
}
