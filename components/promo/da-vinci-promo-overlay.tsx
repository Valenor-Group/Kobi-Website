'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { isPromoActive, promoOverlay } from '@/lib/data'
import { PromoStreamingLinks } from '@/components/promo/promo-streaming-links'

function getInitialVisible() {
  if (typeof window === 'undefined' || !isPromoActive()) return false
  try {
    return !sessionStorage.getItem(promoOverlay.storageKey)
  } catch {
    return true
  }
}

export function DaVinciPromoOverlay() {
  const [visible, setVisible] = useState(getInitialVisible)

  useEffect(() => {
    try {
      localStorage.removeItem(promoOverlay.legacyStorageKey)
    } catch {
      // ignore storage failures
    }
  }, [])

  const dismiss = () => {
    setVisible(false)
    try {
      sessionStorage.setItem(promoOverlay.storageKey, '1')
    } catch {
      // ignore storage failures
    }
  }

  if (!isPromoActive() || !visible) return null

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

        <div className="relative mb-8 aspect-square w-full max-w-[280px] overflow-hidden bg-white/5 shadow-[0_0_48px_rgba(255,255,255,0.14)] ring-1 ring-white/10">
          <Image
            src={promoOverlay.image}
            alt="Da Vinci EP artwork"
            fill
            sizes="(max-width: 768px) 280px, 320px"
            className="object-cover"
          />
        </div>

        <PromoStreamingLinks links={promoOverlay.links} />
      </div>
    </div>
  )
}
