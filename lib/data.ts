// Placeholder data for Kobi! portfolio
// This will be replaced with database data in production

export const projects = [
  {
    id: '1',
    title: "DON'T DRINK THE POISON",
    type: 'LP',
    year: '2024',
    image: '/images/album-1.jpg',
  },
  {
    id: '2',
    title: 'SUBTERRANEAN VIBEZ',
    type: 'EP',
    year: '2024',
    image: '/images/album-2.jpg',
  },
  {
    id: '3',
    title: 'MIDNIGHT PROTOCOL',
    type: 'EP',
    year: '2023',
    image: '/images/album-3.jpg',
  },
  {
    id: '4',
    title: 'NEON DREAMS',
    type: 'SINGLE',
    year: '2023',
    image: '/images/album-4.jpg',
  },
] as const

export const studioServices = [
  { id: '1', title: 'PRODUCTION', description: '— custom sound design and beats tailored to you' },
  { id: '2', title: 'MIXING', description: '— industry standard sonic balance and spatial engineering' },
  { id: '3', title: 'MASTERING', description: '— final commercial polish, translation, and dynamic optimization' },
  { id: '4', title: 'FEATURE', description: '— exclusive feature from Kobi!' },
] as const

export const navItems = [
  { id: '01', label: 'PROJECTS', href: '#projects' },
  { id: '02', label: 'THE STUDIO', href: '#studio' },
  { id: '03', label: 'INQUIRE', href: '#inquire' },
] as const

export type Project = (typeof projects)[number]
export type StudioService = (typeof studioServices)[number]
