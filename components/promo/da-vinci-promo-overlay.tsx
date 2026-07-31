'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { promoOverlay } from '@/lib/data'
import { StreamingIconRow } from '@/components/releases/streaming-icons'

export function DaVinciPromoOverlay() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!promoOverlay.enabled) return

    try {
      const dismissed = localStorage.getItem(promoOverlay.storageKey)
      if (!dismissed) setVisible(true)
    } catch {
      setVisible(true)
    }
  }, [])

  const dismiss = () => {
    setVisible(false)
    try {
      localStorage.setItem(promoOverlay.storageKey, '1')
    } catch {
      // ignore storage failures
    }
  }

  if (!promoOverlay.enabled || !visible) return null

  return (
    <div
      className="fixed inset-0 z-[150] flex items-center justify-center bg-black px-8 py-16"
      role="dialog"
      aria-modal="true"
      aria-labelledby="da-vinci-promo-title"
    >
      <button
        type="button"
        onClick={dismiss}
        className="touch-manipulation absolute top-8 right-8 text-white transition-opacity hover:opacity-60"
        aria-label="Close and enter site"
      >
        <X className="size-6" strokeWidth={1.5} />
      </button>

      <div className="flex w-full max-w-sm flex-col items-center text-center">
        <h1 id="da-vinci-promo-title" className="text-sharp-lg mb-8 text-white">
          {promoOverlay.title}
        </h1>

        <div className="relative mb-8 aspect-square w-full max-w-[280px] overflow-hidden bg-white/5">
          <Image
            src={promoOverlay.image}
            alt="Da Vinci EP artwork"
            fill
            sizes="(max-width: 768px) 280px, 320px"
            priority
            className="object-cover"
          />
        </div>

        <StreamingIconRow
          links={promoOverlay.links}
          className="justify-center gap-4 [&_svg]:size-7"
          iconClassName="text-white/70 hover:text-white p-2"
        />
      </div>
    </div>
  )
}
