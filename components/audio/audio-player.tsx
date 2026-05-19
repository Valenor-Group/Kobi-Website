'use client'

import { useState } from 'react'
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { cn } from '@/lib/utils'

interface AudioPlayerProps {
  className?: string
}

export function AudioPlayer({ className }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [progress, setProgress] = useState(35)
  const [volume, setVolume] = useState(80)
  const [isVisible, setIsVisible] = useState(true) // Will be controlled by track selection later

  // For prototype, always show the player
  if (!isVisible) return null

  return (
    <div 
      className={cn(
        'fixed bottom-0 left-0 right-0 z-40 glass border-t border-white/10',
        className
      )}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center gap-4">
          {/* Track Info - Mobile & Desktop */}
          <div className="flex items-center gap-3 min-w-0 flex-1 md:flex-initial md:w-64">
            {/* Album Art Placeholder */}
            <div 
              className="w-12 h-12 rounded-md shrink-0"
              style={{
                background: 'linear-gradient(135deg, hsl(270, 60%, 25%) 0%, hsl(300, 70%, 15%) 100%)'
              }}
            />
            <div className="min-w-0">
              <p className="font-medium text-sm truncate">Midnight Protocol</p>
              <p className="text-xs text-muted-foreground truncate">Kobi!</p>
            </div>
          </div>

          {/* Controls - Center */}
          <div className="flex flex-col items-center gap-1 flex-1 max-w-xl hidden md:flex">
            {/* Playback Controls */}
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon-sm"
                className="text-muted-foreground hover:text-foreground"
              >
                <SkipBack className="size-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                className="text-foreground hover:text-primary"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? (
                  <Pause className="size-5" />
                ) : (
                  <Play className="size-5 ml-0.5" />
                )}
              </Button>
              <Button 
                variant="ghost" 
                size="icon-sm"
                className="text-muted-foreground hover:text-foreground"
              >
                <SkipForward className="size-4" />
              </Button>
            </div>

            {/* Progress Bar */}
            <div className="flex items-center gap-2 w-full">
              <span className="text-xs text-muted-foreground tabular-nums w-10 text-right">
                1:23
              </span>
              <Slider
                value={[progress]}
                onValueChange={(value) => setProgress(value[0])}
                max={100}
                step={1}
                className="flex-1"
              />
              <span className="text-xs text-muted-foreground tabular-nums w-10">
                3:45
              </span>
            </div>
          </div>

          {/* Mobile Play Button */}
          <Button 
            variant="ghost" 
            size="icon"
            className="md:hidden text-foreground"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? (
              <Pause className="size-5" />
            ) : (
              <Play className="size-5 ml-0.5" />
            )}
          </Button>

          {/* Volume - Desktop Only */}
          <div className="hidden md:flex items-center gap-2 w-32">
            <Button 
              variant="ghost" 
              size="icon-sm"
              className="text-muted-foreground hover:text-foreground"
              onClick={() => setIsMuted(!isMuted)}
            >
              {isMuted ? (
                <VolumeX className="size-4" />
              ) : (
                <Volume2 className="size-4" />
              )}
            </Button>
            <Slider
              value={[isMuted ? 0 : volume]}
              onValueChange={(value) => {
                setVolume(value[0])
                if (value[0] > 0) setIsMuted(false)
              }}
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
