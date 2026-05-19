import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { Hero } from '@/components/sections/hero'
import { ArtistSection } from '@/components/sections/artist-section'
import { ProducerSection } from '@/components/sections/producer-section'
import { Newsletter } from '@/components/sections/newsletter'
import { AudioPlayer } from '@/components/audio/audio-player'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ArtistSection />
        <ProducerSection />
        <Newsletter />
      </main>
      <Footer />
      <AudioPlayer />
    </>
  )
}
