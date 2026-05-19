'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AnimateOnScroll } from '@/components/shared/animate-on-scroll'

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'success'>('idle')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Placeholder - will integrate with email service later
    setStatus('success')
    setEmail('')
    setTimeout(() => setStatus('idle'), 3000)
  }

  return (
    <section id="contact" className="py-24 md:py-32">
      <div className="container mx-auto px-4">
        <AnimateOnScroll>
          <div className="max-w-2xl mx-auto text-center">
            <div className="glass-card p-8 md:p-12 glow-primary-sm">
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-balance">
                Stay in the Loop
              </h2>
              <p className="text-muted-foreground mb-8 text-pretty">
                Get updates on new releases, exclusive content, and studio news.
              </p>

              {status === 'success' ? (
                <p className="text-primary font-medium">
                  Thanks for subscribing!
                </p>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 h-12 bg-white/5 border-white/10 focus:border-primary"
                  />
                  <Button 
                    type="submit"
                    size="lg"
                    className="h-12 px-8 bg-primary hover:bg-primary/90"
                  >
                    Subscribe
                  </Button>
                </form>
              )}

              <p className="mt-4 text-xs text-muted-foreground">
                No spam. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
