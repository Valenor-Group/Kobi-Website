import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const geistSans = Geist({ 
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

const geistMono = Geist_Mono({ 
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

export const metadata: Metadata = {
  title: 'Kobi! | Music Producer & Artist',
  description: 'Professional music production, mixing, and mastering services. Explore releases and book your session with Kobi!',
  keywords: ['music producer', 'mixing', 'mastering', 'beats', 'production', 'Kobi'],
  authors: [{ name: 'Kobi!' }],
  creator: 'Kobi!',
  openGraph: {
    title: 'Kobi! | Music Producer & Artist',
    description: 'Crafting sounds that move. Professional music production, mixing, and mastering services.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Kobi!',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kobi! | Music Producer & Artist',
    description: 'Crafting sounds that move. Professional music production services.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: '#09090b',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} bg-background`}>
      <body className="font-sans antialiased min-h-screen">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
