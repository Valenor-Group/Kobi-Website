import Link from 'next/link'
import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { PricingTier } from '@/lib/data'
import { cn } from '@/lib/utils'

interface PricingCardProps {
  tier: PricingTier
}

export function PricingCard({ tier }: PricingCardProps) {
  return (
    <div 
      className={cn(
        'glass-card p-6 flex flex-col h-full transition-all duration-300 hover:-translate-y-1',
        tier.highlighted && 'border-primary/50 glow-primary-sm'
      )}
    >
      {/* Header */}
      <div className="mb-6">
        {tier.highlighted && (
          <span className="inline-block text-xs font-mono text-primary uppercase tracking-wider mb-2">
            Most Popular
          </span>
        )}
        <h3 className="text-xl font-semibold">{tier.name}</h3>
        <p className="text-sm text-muted-foreground mt-1">{tier.description}</p>
      </div>

      {/* Price */}
      <div className="mb-6">
        <span className="text-4xl font-bold">{tier.price}</span>
        {tier.price !== 'Custom' && (
          <span className="text-muted-foreground ml-1">/project</span>
        )}
      </div>

      {/* Features */}
      <ul className="space-y-3 mb-8 flex-1">
        {tier.features.map((feature) => (
          <li key={feature} className="flex items-center gap-3 text-sm">
            <Check className="size-4 text-primary shrink-0" />
            <span className="text-muted-foreground">{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Button 
        asChild
        variant={tier.highlighted ? 'default' : 'outline'}
        className={cn(
          'w-full',
          tier.highlighted 
            ? 'bg-primary hover:bg-primary/90' 
            : 'border-white/20 hover:bg-white/5'
        )}
      >
        <Link href="#contact">
          {tier.price === 'Custom' ? 'Get in Touch' : 'Get Started'}
        </Link>
      </Button>
    </div>
  )
}
