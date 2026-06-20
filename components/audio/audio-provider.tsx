'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import type { Project } from '@/lib/data'

interface AudioContextValue {
  audioEnabled: boolean
  toggleAudio: () => void
  currentTrack: Project | null
  isPlaying: boolean
  playPreview: (project: Project) => void
  togglePlayPause: () => void
  progress: number
  duration: number
  volume: number
  setVolume: (value: number) => void
  isMuted: boolean
  toggleMute: () => void
}

const AudioContext = createContext<AudioContextValue | null>(null)

export function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

export function AudioProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [audioEnabled, setAudioEnabled] = useState(false)
  const [currentTrack, setCurrentTrack] = useState<Project | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolumeState] = useState(80)
  const [isMuted, setIsMuted] = useState(false)

  useEffect(() => {
    const audio = new Audio()
    audioRef.current = audio

    const onTimeUpdate = () => setProgress(audio.currentTime)
    const onLoadedMetadata = () => setDuration(audio.duration)
    const onEnded = () => setIsPlaying(false)
    const onPlay = () => setIsPlaying(true)
    const onPause = () => setIsPlaying(false)

    audio.addEventListener('timeupdate', onTimeUpdate)
    audio.addEventListener('loadedmetadata', onLoadedMetadata)
    audio.addEventListener('ended', onEnded)
    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate)
      audio.removeEventListener('loadedmetadata', onLoadedMetadata)
      audio.removeEventListener('ended', onEnded)
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
      audio.pause()
      audioRef.current = null
    }
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = isMuted ? 0 : volume / 100
  }, [volume, isMuted])

  const toggleAudio = useCallback(() => {
    setAudioEnabled((prev) => {
      const next = !prev
      if (!next && audioRef.current) {
        audioRef.current.pause()
        setIsPlaying(false)
      }
      return next
    })
  }, [])

  const playPreview = useCallback(
    (project: Project) => {
      if (!project.previewUrl) return

      const audio = audioRef.current
      if (!audio) return

      setAudioEnabled(true)

      if (currentTrack?.id === project.id) {
        if (isPlaying) {
          audio.pause()
        } else {
          void audio.play()
        }
        return
      }

      audio.src = project.previewUrl
      setCurrentTrack(project)
      setProgress(0)
      void audio.play().catch(() => setIsPlaying(false))
    },
    [currentTrack?.id, isPlaying],
  )

  const togglePlayPause = useCallback(() => {
    const audio = audioRef.current
    if (!audio || !currentTrack) return

    if (isPlaying) {
      audio.pause()
    } else {
      void audio.play()
    }
  }, [currentTrack, isPlaying])

  const setVolume = useCallback((value: number) => {
    setVolumeState(value)
    if (value > 0) setIsMuted(false)
  }, [])

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev)
  }, [])

  return (
    <AudioContext.Provider
      value={{
        audioEnabled,
        toggleAudio,
        currentTrack,
        isPlaying,
        playPreview,
        togglePlayPause,
        progress,
        duration,
        volume,
        setVolume,
        isMuted,
        toggleMute,
      }}
    >
      {children}
    </AudioContext.Provider>
  )
}

export function useAudio() {
  const context = useContext(AudioContext)
  if (!context) {
    throw new Error('useAudio must be used within AudioProvider')
  }
  return context
}
