// Portfolio data for Kobi!
// Add images to public/images/ and streaming links when ready.

export type StreamingLinks = {
  spotify?: string
  apple?: string
  youtube?: string
  soundcloud?: string
}

export type ProjectStatus = 'released' | 'upcoming'

export type Project = {
  id: string
  title: string
  type: string
  year: string
  image: string
  status: ProjectStatus
  previewUrl?: string
  links: StreamingLinks
  internalTitle?: string
  featured?: boolean
}

export const projects: Project[] = [
  {
    id: '1',
    title: 'Trust Issues',
    type: 'EP',
    year: '2026',
    image: '/images/album-1.jpg',
    status: 'released',
    featured: true,
    previewUrl: '/audio/preview-1.mp3',
    links: {
      spotify: 'https://open.spotify.com/album/4jR3rZ1RxYlrrwuQs9FBhC?si=CMKYRrK6S6KLp3ogARPNdg',
      apple: 'https://music.apple.com/za/album/trust-issues-ep/1892733108',
      soundcloud: 'https://soundcloud.com/beatsbykobi/sets/trust-issues',
    },
  },
  {
    id: '2',
    title: 'Light After Dark',
    type: 'EP',
    year: '2025',
    image: '/images/album-2.jpg',
    status: 'released',
    previewUrl: '/audio/preview-2.mp3',
    links: {
      spotify: 'https://open.spotify.com/album/2eexLA0VACkWfUQyGBRZS4?si=13DCFqwjSNuaf8pbRaOuUA',
      apple: 'https://music.apple.com/za/album/light-after-dark-ep/1836433238',
      soundcloud: 'https://soundcloud.com/beatsbykobi/sets/light-after-dark',
    },
  },
  {
    id: '3',
    title: 'LET GO pt. 2',
    type: 'EP',
    year: '2025',
    image: '/images/album-3.jpg',
    status: 'released',
    previewUrl: '/audio/preview-3.mp3',
    links: {
      spotify: 'https://open.spotify.com/album/7e3HsJkes3fOCFjZIIgh25?si=5my0kqahStaGViOBWDGJxw',
      apple: 'https://music.apple.com/za/album/let-go-pt-2-ep/1829728763',
      soundcloud: 'https://soundcloud.com/beatsbykobi/sets/let-go-pt2',
    },
  },
  {
    id: '4',
    title: 'better late than never',
    type: 'EP',
    year: '2024',
    image: '/images/album-4.jpg',
    status: 'released',
    previewUrl: '/audio/preview-4.mp3',
    links: {
      spotify: 'https://open.spotify.com/album/6cZn3a1L9HzgSJAHpE1k1R?si=5twHRMP2TqCbjoWYju4mSQ',
      apple: 'https://music.apple.com/za/album/better-late-than-never-ep/1768398387',
      soundcloud: 'https://soundcloud.com/beatsbykobi/sets/better-late-than-never',
    },
  },
  {
    id: '5',
    title: 'VISION',
    type: 'EP',
    year: '2024',
    image: '/images/album-5.jpg',
    status: 'released',
    previewUrl: '/audio/preview-5.mp3',
    links: {
      spotify: 'https://open.spotify.com/album/5dtqQp9GTsDzJYxyedNFXC?si=sO9-4imPRLebRKEWI08B_Q',
      apple: 'https://music.apple.com/za/album/vision-ep/1742104989',
    },
  },
  {
    id: '6',
    title: 'MiSS!ON',
    type: 'Single',
    year: '2023',
    image: '/images/album-6.jpg',
    status: 'released',
    previewUrl: '/audio/preview-6.mp3',
    links: {
      spotify: 'https://open.spotify.com/album/3mAXLbqn1imAJ8lANWhmRq?si=dWt1iUrORvytmMLF48pCfA',
      apple: 'https://music.apple.com/za/album/miss-on-single/1687755704',
      soundcloud: 'https://soundcloud.com/beatsbykobi/misson-prod-x-artiste-extended-version',
    },
  },
  {
    id: '7',
    title: 'LET GO',
    type: 'EP',
    year: '2022',
    image: '/images/album-7.jpg',
    status: 'released',
    previewUrl: '/audio/preview-7.mp3',
    links: {
      spotify: 'https://open.spotify.com/album/7CZjS0Kogh9gCPwGPcNAgH?si=FE7gR2mBSGiZeR2fRW-y7w',
      apple: 'https://music.apple.com/za/album/let-go-ep/1654067934',
      soundcloud: 'https://soundcloud.com/beatsbykobi/sets/let-go',
    },
  },
  {
    id: '8',
    title: 'Moët',
    type: 'Single',
    year: '2026',
    image: '/images/album-8.jpg',
    status: 'released',
    previewUrl: '/audio/preview-8.mp3',
    links: {
      spotify: 'https://open.spotify.com/album/4kQprxoC1VNQaxnjAokOhI?si=Bn4acpENTUyoMDj6LMS1cQ',
      apple: 'https://music.apple.com/za/album/mo%C3%ABt-single/1615476328',
      soundcloud: 'https://soundcloud.com/beatsbykobi/moet',
    },
  },
  {
    id: '9',
    title: 'COMING SOON',
    type: 'TBA',
    year: '2026',
    image: '/images/album-9.jpg',
    status: 'upcoming',
    internalTitle: 'LET GO pt. 3',
    links: {},
  },
  {
    id: '10',
    title: 'COMING SOON',
    type: 'TBA',
    year: '2026',
    image: '/images/album-10.jpg',
    status: 'upcoming',
    internalTitle: 'Da Vinci',
    links: {},
  },
]

export const releasedProjects = projects.filter((p) => p.status === 'released')
export const upcomingProjects = projects.filter((p) => p.status === 'upcoming')
export const featuredProject =
  releasedProjects.find((p) => p.featured) ?? releasedProjects[0]

export const studioServices = [
  {
    id: '1',
    title: 'PRODUCTION',
    description: '— custom sound design and beats tailored to you',
    detail:
      'Full production from blank canvas to release-ready track. Custom drums, textures, and arrangement built around your vision — whether you need a beat, a full instrumental, or co-production on your project.',
  },
  {
    id: '2',
    title: 'MIXING',
    description: '— industry standard sonic balance and spatial engineering',
    detail:
      'Professional mixing that gives your record clarity, depth, and punch. Vocal balance, low-end control, and spatial placement so your music translates on every system.',
  },
  {
    id: '3',
    title: 'MASTERING',
    description: '— final commercial polish, translation, and dynamic optimization',
    detail:
      'The final polish before release. Loudness optimization, tonal balance, and format delivery so your track competes at a commercial level on streaming platforms.',
  },
  {
    id: '4',
    title: 'FEATURE',
    description: '— exclusive feature from Kobi!',
    detail:
      'An exclusive Kobi! feature on your track — verse, hook, or production credit. Limited availability for artists and labels looking for a distinctive sound.',
  },
] as const

export const navItems = [
  { id: '01', label: 'THE VAULT', spaceName: 'The Vault', href: '#projects' },
  { id: '02', label: 'THE LAB', spaceName: 'The Lab', href: '#studio' },
  { id: '03', label: 'CONNECT', spaceName: 'Connect', href: '#inquire' },
] as const

export const siteConfig = {
  portrait: '/images/kobi-portrait.jpg',
  // Update with your real profile URLs
  social: {
    spotify: 'https://open.spotify.com/artist/3PfySXhK9TkqEJwEUG6muk?si=SgP_9NS_SSmmMOiTLFVWmQ',
    apple: 'https://music.apple.com/za/artist/kobi/1507618248',
    instagram: 'https://www.instagram.com/kouldbekobi/',
  },
} as const

export type StudioService = (typeof studioServices)[number]
