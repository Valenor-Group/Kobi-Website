'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Play, Pause, Volume2, VolumeX } from 'lucide-react'
import { Slider } from '@/components/ui/slider'
import { cn } from '@/lib/utils'
import { formatTime, useAudio } from '@/components/audio/audio-provider'

interface AudioPlayerProps {
  className?: string
}

export function AudioPlayer({ className }: AudioPlayerProps) {
  const {
    currentTrack,
    isPlaying,
    togglePlayPause,
    progress,
    duration,
    volume,
    setVolume,
    isMuted,
    toggleMute,
  } = useAudio()

  const [imageError, setImageError] = useState(false)

  if (!currentTrack) return null

  const progressPercent = duration > 0 ? (progress / duration) * 100 : 0

  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-black/90 backdrop-blur-md',
        className,
      )}
    >
      <div className="mx-auto max-w-6xl px-4 py-3 md:px-8">
        <div className="flex items-center gap-4">
          <div className="flex min-w-0 flex-1 items-center gap-3 md:w-64 md:flex-initial">
            <div className="relative size-12 shrink-0 overflow-hidden bg-white/5">
              {!imageError ? (
                <Image
                  src={currentTrack.image}
                  alt={currentTrack.title}
                  fill
                  sizes="48px"
                  className="object-cover"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
              )}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{currentTrack.title}</p>
              <p className="truncate text-xs text-white/50">Kobi!</p>
            </div>
          </div>

          <div className="hidden max-w-xl flex-1 flex-col items-center gap-1 md:flex">
            <button
              type="button"
              onClick={togglePlayPause}
              className="text-white transition-smooth hover:text-white/70"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause className="size-5" />
              ) : (
                <Play className="ml-0.5 size-5" />
              )}
            </button>

            <div className="flex w-full items-center gap-2">
              <span className="w-10 text-right text-xs tabular-nums text-white/50">
                {formatTime(progress)}
              </span>
              <div className="relative h-[1px] flex-1 bg-white/20">
                <div
                  className="absolute left-0 top-0 h-full bg-white transition-all"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <span className="w-10 text-xs tabular-nums text-white/50">
                {formatTime(duration)}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={togglePlayPause}
            className="text-white md:hidden"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause className="size-5" /> : <Play className="ml-0.5 size-5" />}
          </button>

          <div className="hidden w-32 items-center gap-2 md:flex">
            <button
              type="button"
              onClick={toggleMute}
              className="text-white/50 transition-smooth hover:text-white"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
            </button>
            <Slider
              value={[isMuted ? 0 : volume]}
              onValueChange={(value) => setVolume(value[0])}
              max={100}
              step={1}
              className="flex-1"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
