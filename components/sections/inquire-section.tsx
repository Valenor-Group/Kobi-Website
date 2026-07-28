'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import { useAudio } from '@/components/audio/audio-provider'
import { siteConfig } from '@/lib/data'
import { SectionAtmosphere } from '@/components/shared/section-atmosphere'
import { AnimateOnScroll } from '@/components/shared/animate-on-scroll'
import { useSectionInView } from '@/hooks/use-section-in-view'
import { cn } from '@/lib/utils'

interface InquireSectionProps {
  subject: string
  onSubjectChange: (subject: string) => void
}

export function InquireSection({ subject, onSubjectChange }: InquireSectionProps) {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [portraitError, setPortraitError] = useState(false)
  const { currentTrack } = useAudio()
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useSectionInView(sectionRef)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitStatus('idle')

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY
    if (!accessKey) {
      setSubmitStatus('error')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: accessKey,
          subject: subject.trim()
            ? `KOBI! Enquiry: ${subject.trim()}`
            : 'KOBI! Enquiry — beatsbykobi.com',
          email,
          message,
          from_name: 'KOBI! Website',
        }),
      })

      const data = (await response.json()) as { success?: boolean }

      if (!response.ok || !data.success) {
        setSubmitStatus('error')
        return
      }

      setSubmitStatus('success')
      onSubjectChange('')
      setEmail('')
      setMessage('')
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      ref={sectionRef}
      id="inquire"
      className="relative flex min-h-screen flex-col justify-center bg-black py-32 md:py-48"
    >
      <SectionAtmosphere variant="connect" paused={!inView} />

      <div className="pointer-events-none absolute inset-0 flex items-center justify-end overflow-hidden pr-8 md:pr-16 lg:pr-24">
        {!portraitError ? (
          <div className="relative h-[80vh] w-[50vw] max-w-xl shrink-0 opacity-25 md:opacity-30">
            <Image
              src={siteConfig.portrait}
              alt=""
              fill
              sizes="(max-width: 768px) 50vw, 576px"
              loading="lazy"
              className="object-cover object-center grayscale md:object-right"
              style={{
                maskImage:
                  'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)',
                WebkitMaskImage:
                  'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)',
              }}
              onError={() => setPortraitError(true)}
            />
            <div
              className="absolute inset-0 bg-gradient-to-r from-black via-black/25 at-[3%] to-transparent to-[10%] md:hidden"
              aria-hidden
            />
            <div
              className="absolute inset-0 hidden bg-gradient-to-r from-black via-black/40 at-[28%] to-transparent to-[58%] md:block"
              aria-hidden
            />
          </div>
        ) : (
          <div className="h-[80vh] w-[50vw] max-w-xl shrink-0 bg-gradient-to-t from-transparent via-white/[0.02] to-transparent opacity-50" />
        )}
      </div>

      <AnimateOnScroll className="relative z-10 mb-16 px-8">
        <span className="text-editorial">[03] CONNECT</span>
      </AnimateOnScroll>

      <div className="relative z-10 mx-auto w-full max-w-2xl px-8 pb-24 md:px-16 lg:px-32">
        <form onSubmit={handleSubmit} className="space-y-12">
          <AnimateOnScroll delay={0}>
            <div className="group">
              <input
                type="text"
                value={subject}
                onChange={(e) => onSubjectChange(e.target.value)}
                placeholder="SUBJECT_"
                className="text-sharp-lg w-full border-0 border-b border-white/20 bg-transparent py-4 text-white placeholder:text-white/30 transition-all duration-300 ease-out focus:border-white/50 focus:outline-none"
              />
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll delay={100}>
            <div className="group">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ENTER EMAIL_"
                required
                className="text-sharp-lg w-full border-0 border-b border-white/20 bg-transparent py-4 text-white placeholder:text-white/30 transition-all duration-300 ease-out focus:border-white/50 focus:outline-none"
              />
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll delay={200}>
            <div className="group">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="MESSAGE_"
                rows={4}
                required
                className="text-sharp-lg w-full resize-none border-0 border-b border-white/20 bg-transparent py-4 text-white placeholder:text-white/30 transition-all duration-300 ease-out focus:border-white/50 focus:outline-none"
              />
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll delay={300}>
            <div className="space-y-4 pt-8">
              <button
                type="submit"
                disabled={isSubmitting}
                className="text-sharp text-white/50 transition-all duration-300 ease-out hover:text-white disabled:opacity-30"
              >
                {isSubmitting ? 'SENDING...' : 'SEND ENQUIRY →'}
              </button>
              {submitStatus === 'success' && (
                <p className="text-editorial text-white/70" role="status">
                  ENQUIRY SENT — WE&apos;LL BE IN TOUCH SOON.
                </p>
              )}
              {submitStatus === 'error' && (
                <p className="text-editorial text-red-400/90" role="alert">
                  SOMETHING WENT WRONG. PLEASE TRY AGAIN.
                </p>
              )}
            </div>
          </AnimateOnScroll>
        </form>
      </div>

      <div
        className={cn(
          'absolute right-8 left-8 z-10 flex flex-col gap-4 transition-[bottom] duration-300 sm:flex-row sm:items-center sm:justify-between',
          currentTrack ? 'bottom-24 z-50 md:bottom-28' : 'bottom-8',
        )}
      >
        <span className="text-editorial">KOBI! — {new Date().getFullYear()}</span>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <a
            href={siteConfig.social.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="text-editorial transition-all duration-300 ease-out hover:text-white/80"
          >
            SPOTIFY
          </a>
          <a
            href={siteConfig.social.apple}
            target="_blank"
            rel="noopener noreferrer"
            className="text-editorial transition-all duration-300 ease-out hover:text-white/80"
          >
            APPLE MUSIC
          </a>
          <a
            href={siteConfig.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-editorial transition-all duration-300 ease-out hover:text-white/80"
          >
            INSTAGRAM
          </a>
        </div>
      </div>
    </section>
  )
}
