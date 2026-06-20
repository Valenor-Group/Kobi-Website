'use client'

import Image from 'next/image'
import { Play } from 'lucide-react'
import type { Release } from '@/lib/data'
import { cn } from '@/lib/utils'

interface ReleaseCardProps {
  release: Release
}

export function ReleaseCard({ release }: ReleaseCardProps) {
  return (
    <div className="group relative">
      {/* Card */}
      <div className="glass-card p-3 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:glow-primary-sm">
        {/* Artwork */}
        <div className="relative aspect-square overflow-hidden rounded-lg bg-muted mb-4">
          {/* Placeholder gradient - will be replaced with actual images */}
          <div 
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, 
                hsl(${parseInt(release.id) * 60}, 60%, 20%) 0%, 
                hsl(${parseInt(release.id) * 60 + 30}, 70%, 10%) 100%)`
            }}
          />
          
          {/* Play overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button 
              className="w-14 h-14 rounded-full bg-primary flex items-center justify-center transition-transform hover:scale-110"
              aria-label={`Play ${release.title}`}
            >
              <Play className="size-6 fill-current ml-1" />
            </button>
          </div>
        </div>

        {/* Info */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono text-primary uppercase tracking-wider">
              {release.type}
            </span>
            <span className="text-xs text-muted-foreground">
              {release.year}
            </span>
          </div>
          <h3 className="font-semibold truncate">
            {release.title}
          </h3>
        </div>
      </div>
    </div>
  )
}
