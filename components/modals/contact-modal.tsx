'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { ContactForm } from '@/components/forms/contact-form'

interface ContactModalProps {
  trigger?: React.ReactNode
}

export function ContactModal({ trigger }: ContactModalProps) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="bg-primary hover:bg-primary/90">
            Book a Session
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="glass border-white/10 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">Get in Touch</DialogTitle>
          <DialogDescription>
            Tell me about your project and I&apos;ll get back to you within 24-48 hours.
          </DialogDescription>
        </DialogHeader>
        <ContactForm onSuccess={() => setTimeout(() => setOpen(false), 2000)} />
      </DialogContent>
    </Dialog>
  )
}
