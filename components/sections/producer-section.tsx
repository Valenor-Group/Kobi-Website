import { services, pricingTiers } from '@/lib/data'
import { SectionHeader } from '@/components/shared/section-header'
import { AnimateOnScroll } from '@/components/shared/animate-on-scroll'
import { ServiceCard } from '@/components/cards/service-card'
import { PricingCard } from '@/components/cards/pricing-card'

export function ProducerSection() {
  return (
    <section id="services" className="py-24 md:py-32 bg-card/30">
      <div className="container mx-auto px-4">
        {/* Services */}
        <AnimateOnScroll>
          <SectionHeader 
            title="Production Services"
            subtitle="Professional audio services tailored to your creative vision."
          />
        </AnimateOnScroll>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {services.map((service, index) => (
            <AnimateOnScroll key={service.id} delay={index * 100}>
              <ServiceCard service={service} />
            </AnimateOnScroll>
          ))}
        </div>

        {/* Pricing */}
        <AnimateOnScroll>
          <SectionHeader 
            title="Pricing"
            subtitle="Transparent pricing for every project size."
          />
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {pricingTiers.map((tier, index) => (
            <AnimateOnScroll key={tier.id} delay={index * 100}>
              <PricingCard tier={tier} />
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
