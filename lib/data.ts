// Placeholder data for Kobi! portfolio
// This will be replaced with database data in production

export const releases = [
  {
    id: '1',
    title: 'Midnight Protocol',
    type: 'EP',
    year: '2024',
    image: '/images/release-1.jpg',
  },
  {
    id: '2',
    title: 'Neon Dreams',
    type: 'Single',
    year: '2024',
    image: '/images/release-2.jpg',
  },
  {
    id: '3',
    title: 'Voltage',
    type: 'Album',
    year: '2023',
    image: '/images/release-3.jpg',
  },
  {
    id: '4',
    title: 'Static',
    type: 'Single',
    year: '2023',
    image: '/images/release-4.jpg',
  },
] as const

export const services = [
  {
    id: '1',
    title: 'Mixing',
    description: 'Professional mixing that brings clarity and punch to your tracks across any genre.',
    icon: 'sliders',
  },
  {
    id: '2',
    title: 'Mastering',
    description: 'Industry-standard mastering for streaming platforms and physical distribution.',
    icon: 'disc',
  },
  {
    id: '3',
    title: 'Production',
    description: 'Full track production from concept to completion, tailored to your vision.',
    icon: 'music',
  },
  {
    id: '4',
    title: 'Sound Design',
    description: 'Custom sounds, textures, and sonic landscapes for your projects.',
    icon: 'waveform',
  },
] as const

export const pricingTiers = [
  {
    id: '1',
    name: 'Starter',
    price: '$299',
    description: 'Perfect for single releases',
    features: [
      '1 track',
      '2 revision rounds',
      'Stems included',
      '7-day delivery',
    ],
    highlighted: false,
  },
  {
    id: '2',
    name: 'Pro',
    price: '$599',
    description: 'Best for serious artists',
    features: [
      '3 tracks',
      'Unlimited revisions',
      'Mix + Master included',
      'Priority support',
      '5-day delivery',
    ],
    highlighted: true,
  },
  {
    id: '3',
    name: 'Enterprise',
    price: 'Custom',
    description: 'For album projects and labels',
    features: [
      'Album projects',
      'Dedicated support',
      'Full production',
      'Custom timeline',
      'Session files',
    ],
    highlighted: false,
  },
] as const

export const socialLinks = [
  { name: 'Spotify', href: '#', icon: 'spotify' },
  { name: 'Apple Music', href: '#', icon: 'apple' },
  { name: 'Instagram', href: '#', icon: 'instagram' },
  { name: 'Twitter', href: '#', icon: 'twitter' },
] as const

export const navLinks = [
  { name: 'Listen', href: '#releases' },
  { name: 'Services', href: '#services' },
  { name: 'Contact', href: '#contact' },
] as const

export type Release = typeof releases[number]
export type Service = typeof services[number]
export type PricingTier = typeof pricingTiers[number]
