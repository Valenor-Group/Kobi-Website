import type { StreamingLinks } from '@/lib/data'

interface PromoStreamingLinksProps {
  links: StreamingLinks
}

export function PromoStreamingLinks({ links }: PromoStreamingLinksProps) {
  return (
    <div className="flex items-center justify-center gap-6">
      {links.spotify && (
        <a
          href={links.spotify}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Listen on Spotify"
          className="touch-manipulation flex size-12 items-center justify-center rounded-full bg-[#1DB954] transition-transform hover:scale-105"
        >
          <SpotifyIcon className="size-7 text-black" />
        </a>
      )}
      {links.apple && (
        <a
          href={links.apple}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Listen on Apple Music"
          className="touch-manipulation flex size-12 items-center justify-center rounded-full bg-gradient-to-b from-[#FA57C1] to-[#FA243C] transition-transform hover:scale-105"
        >
          <AppleMusicIcon className="size-7 text-white" />
        </a>
      )}
    </div>
  )
}

function SpotifyIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.49 17.308c-.213.349-.668.458-1.017.245-2.786-1.704-6.295-2.088-10.422-1.141-.399.091-.798-.157-.889-.556-.091-.399.157-.798.556-.889 4.528-1.031 8.446-.596 11.54 1.286.349.213.458.668.232 1.055zm1.47-3.272c-.269.437-.841.574-1.278.305-3.186-1.959-8.038-2.525-11.806-1.381-.483.148-.995-.125-1.143-.608-.148-.483.125-.995.608-1.143 4.312-1.313 9.738-.683 13.456 1.604.437.269.574.841.163 1.223zm.126-3.403C14.692 8.095 8.6 7.875 5.009 9.061c-.578.175-1.191-.151-1.366-.729-.175-.578.151-1.191.729-1.366 4.116-1.247 10.945-.996 15.11 1.604.521.317.686 1.002.369 1.523-.317.521-1.002.686-1.523.369z" />
    </svg>
  )
}

function AppleMusicIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
  )
}
