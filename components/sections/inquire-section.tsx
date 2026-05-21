'use client'

import { useState, useEffect } from 'react'

interface InquireSectionProps {
  subject: string
  onSubjectChange: (subject: string) => void
}

export function InquireSection({ subject, onSubjectChange }: InquireSectionProps) {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Placeholder for form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    onSubjectChange('')
    setEmail('')
    setMessage('')
  }

  return (
    <section id="inquire" className="min-h-screen bg-black py-32 md:py-48 flex flex-col justify-center relative">
      {/* Background portrait - faded */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[50vw] h-[70vh] bg-gradient-to-t from-transparent via-white/[0.02] to-transparent opacity-50" />
      </div>

      {/* Section label */}
      <div className="px-8 mb-16 relative z-10">
        <span className="text-editorial">[03] INQUIRE</span>
      </div>

      {/* Form */}
      <div className="px-8 md:px-16 lg:px-32 max-w-2xl mx-auto w-full relative z-10">
        <form onSubmit={handleSubmit} className="space-y-12">
          {/* Subject field */}
          <div className="group">
            <input
              type="text"
              value={subject}
              onChange={(e) => onSubjectChange(e.target.value)}
              placeholder="SUBJECT_"
              className="w-full bg-transparent border-0 border-b border-white/20 focus:border-white/50 py-4 text-sharp-lg text-white placeholder:text-white/30 focus:outline-none transition-all duration-300 ease-out"
            />
          </div>

          {/* Email field */}
          <div className="group">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ENTER EMAIL_"
              required
              className="w-full bg-transparent border-0 border-b border-white/20 focus:border-white/50 py-4 text-sharp-lg text-white placeholder:text-white/30 focus:outline-none transition-all duration-300 ease-out"
            />
          </div>

          {/* Message field */}
          <div className="group">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="MESSAGE_"
              rows={4}
              required
              className="w-full bg-transparent border-0 border-b border-white/20 focus:border-white/50 py-4 text-sharp-lg text-white placeholder:text-white/30 focus:outline-none transition-all duration-300 ease-out resize-none"
            />
          </div>

          {/* Submit */}
          <div className="pt-8">
            <button
              type="submit"
              disabled={isSubmitting}
              className="text-sharp text-white/50 hover:text-white transition-all duration-300 ease-out disabled:opacity-30"
            >
              {isSubmitting ? 'SENDING...' : 'SEND INQUIRY →'}
            </button>
          </div>
        </form>
      </div>

      {/* Footer */}
      <div className="absolute bottom-8 left-8 right-8 flex justify-between items-center">
        <span className="text-editorial">KOBI! — {new Date().getFullYear()}</span>
        <div className="flex gap-6">
          <a href="#" className="text-editorial hover:text-white/80 transition-all duration-300 ease-out">
            SPOTIFY
          </a>
          <a href="#" className="text-editorial hover:text-white/80 transition-all duration-300 ease-out">
            APPLE MUSIC
          </a>
          <a href="#" className="text-editorial hover:text-white/80 transition-all duration-300 ease-out">
            INSTAGRAM
          </a>
        </div>
      </div>
    </section>
  )
}
