'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import type { StudioService } from '@/lib/data'

interface ServiceDetailPanelProps {
  service: StudioService | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onInquire: (serviceTitle: string) => void
}

export function ServiceDetailPanel({
  service,
  open,
  onOpenChange,
  onInquire,
}: ServiceDetailPanelProps) {
  if (!service) return null

  const handleInquire = () => {
    onInquire(service.title)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="rounded-none border-white/10 bg-black p-8 sm:max-w-md"
        showCloseButton
      >
        <DialogHeader className="gap-4 text-left">
          <p className="text-editorial">THE LAB</p>
          <DialogTitle className="font-sans text-2xl font-light tracking-tight text-white md:text-3xl">
            {service.title}
          </DialogTitle>
          <p className="text-sm leading-relaxed text-white/60">{service.detail}</p>
        </DialogHeader>

        <button
          type="button"
          data-cursor-label="ENQUIRE"
          onClick={handleInquire}
          className="mt-6 text-sharp text-white/50 transition-smooth hover:text-white"
        >
          ENQUIRE →
        </button>
      </DialogContent>
    </Dialog>
  )
}
