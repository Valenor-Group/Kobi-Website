import { Sliders, Disc3, Music, Waves } from 'lucide-react'
import type { Service } from '@/lib/data'
import { GlassCard } from '@/components/shared/glass-card'

interface ServiceCardProps {
  service: Service
}

function ServiceIcon({ icon }: { icon: string }) {
  const iconClass = "size-8 text-primary"
  
  switch (icon) {
    case 'sliders':
      return <Sliders className={iconClass} />
    case 'disc':
      return <Disc3 className={iconClass} />
    case 'music':
      return <Music className={iconClass} />
    case 'waveform':
      return <Waves className={iconClass} />
    default:
      return <Music className={iconClass} />
  }
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <GlassCard>
      <div className="mb-4">
        <ServiceIcon icon={service.icon} />
      </div>
      <h3 className="font-semibold text-lg mb-2">
        {service.title}
      </h3>
      <p className="text-sm text-muted-foreground text-pretty">
        {service.description}
      </p>
    </GlassCard>
  )
}
