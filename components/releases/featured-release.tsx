'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Play } from 'lucide-react'
import { featuredProject } from '@/lib/data'
import { useAudio } from '@/components/audio/audio-provider'
import { useSpaceNav } from '@/components/shared/space-nav-context'
import { cn } from '@/lib/utils'

export function FeaturedRelease() {
  const { playPreview, currentTrack, isPlaying } = useAudio()
  const { navigateToSpace } = useSpaceNav()
  const [imageError, setImageError] = useState(false)

  const isPlayingFeatured =
    currentTrack?.id === featuredProject.id && isPlaying
  const hasPreview = Boolean(featuredProject.previewUrl)

  return (
    <div className="animate-fade-in-delay-3 absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 items-center gap-4 px-8">
      <div className="relative size-10 shrink-0 overflow-hidden bg-white/10">
        {!imageError ? (
          <Image
            src={featuredProject.image}
            alt={featuredProject.title}
            fill
            className="object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-white/15 to-transparent" />
        )}
      </div>

      <div className="hidden min-w-0 sm:block">
        <p className="text-editorial">LATEST</p>
        <p className="text-sharp truncate text-white">{featuredProject.title}</p>
      </div>

      <div className="flex items-center gap-3">
        {hasPreview && (
          <button
            type="button"
            data-cursor-label="PLAY"
            onClick={() => playPreview(featuredProject)}
            className={cn(
              'flex size-8 items-center justify-center border border-white/20 transition-smooth hover:border-white/50',
              isPlayingFeatured && 'border-white/60',
            )}
            aria-label={`Play preview of ${featuredProject.title}`}
          >
            <Play className="ml-0.5 size-3 fill-white text-white" />
          </button>
        )}
        <button
          type="button"
          data-cursor-label="ENTER"
          onClick={() => navigateToSpace('#projects', 'The Vault')}
          className="text-editorial transition-smooth hover:text-white"
        >
          ENTER VAULT →
        </button>
      </div>
    </div>
  )
}
