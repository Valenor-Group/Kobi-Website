import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background" />
      
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px),
                           linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          {/* Tag */}
          <p className="text-sm font-mono text-primary mb-6 animate-fade-in tracking-wider uppercase">
            Producer / Artist / Sonic Architect
          </p>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 animate-fade-in-up text-balance">
            Crafting Sounds That Move
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-xl mx-auto animate-fade-in-delay-1 text-pretty">
            From intimate singles to full album productions. Let&apos;s bring your sonic vision to life.
          </p>

          {/* Dual CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-delay-2">
            <Button 
              asChild 
              variant="outline" 
              size="lg"
              className="w-full sm:w-auto min-w-[180px] h-12 border-white/20 hover:bg-white/5 hover:border-white/30"
            >
              <Link href="#releases">Explore Releases</Link>
            </Button>
            <Button 
              asChild 
              size="lg"
              className="w-full sm:w-auto min-w-[180px] h-12 bg-primary hover:bg-primary/90 glow-primary-sm"
            >
              <Link href="#contact">Book a Session</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-white/40 rounded-full" />
        </div>
      </div>
    </section>
  )
}
