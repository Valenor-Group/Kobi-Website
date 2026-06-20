# Kobi! Music Producer Portfolio — Implementation Plan

## Project Overview

A dynamic, dark-themed portfolio website for Kobi!, a music producer. The site serves dual purposes: showcasing artist releases and offering production services. Built as a prototype with placeholder content, designed for future CMS integration.

---

## Design Tokens

### Color Palette (5 Colors)

| Token | Hex | Usage |
|-------|-----|-------|
| `--background` | `#09090b` | Page background, dark base |
| `--foreground` | `#fafafa` | Primary text, headings |
| `--muted` | `#18181b` | Card backgrounds, sections |
| `--muted-foreground` | `#a1a1aa` | Secondary text, captions |
| `--primary` | `#8b5cf6` | Violet accent, CTAs, highlights |
| `--primary-foreground` | `#fafafa` | Text on primary buttons |
| `--border` | `#27272a` | Borders, dividers |
| `--ring` | `#8b5cf6` | Focus rings |
| `--card` | `#0f0f12` | Card surfaces |
| `--card-foreground` | `#fafafa` | Card text |

### Typography

| Element | Font | Weight | Size |
|---------|------|--------|------|
| Headings | Geist Sans | 600-700 | 2rem - 4rem |
| Body | Geist Sans | 400 | 1rem |
| Captions | Geist Sans | 400 | 0.875rem |
| Mono/Tags | Geist Mono | 400 | 0.75rem |

### Spacing Scale

Using Tailwind defaults: `4, 6, 8, 12, 16, 20, 24, 32`

### Effects

| Effect | Implementation |
|--------|----------------|
| Glass | `bg-white/5 backdrop-blur-md border border-white/10` |
| Glow | `shadow-[0_0_30px_rgba(139,92,246,0.3)]` |
| Hover lift | `hover:-translate-y-1 transition-transform` |

---

## Architecture

### Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS + shadcn/ui
- **Icons**: Lucide React
- **Animations**: CSS transitions + Intersection Observer
- **Database**: Supabase (future integration)
- **Fonts**: Geist Sans, Geist Mono

### File Structure

```
app/
├── layout.tsx              # Root layout, fonts, metadata
├── page.tsx                # Home page composition
├── globals.css             # Design tokens, base styles
│
components/
├── layout/
│   ├── navbar.tsx          # Fixed nav + mobile menu
│   ├── footer.tsx          # Footer with social links
│   └── mobile-menu.tsx     # Burger menu drawer
│
├── sections/
│   ├── hero.tsx            # Hero with dual CTAs
│   ├── artist-section.tsx  # Music releases grid
│   ├── producer-section.tsx # Services + pricing
│   └── newsletter.tsx      # Email capture
│
├── cards/
│   ├── release-card.tsx    # Album/EP card with glass effect
│   ├── service-card.tsx    # Production service card
│   └── pricing-card.tsx    # Pricing tier card
│
├── ui/                     # shadcn components (existing)
│
├── audio/
│   └── audio-player.tsx    # Sticky bottom player (UI shell)
│
├── forms/
│   ├── contact-form.tsx    # Inquiry/booking form
│   └── newsletter-form.tsx # Email signup
│
├── modals/
│   └── contact-modal.tsx   # Modal wrapper for contact form
│
└── shared/
    ├── section-header.tsx  # Reusable section title
    ├── glass-card.tsx      # Glass effect wrapper
    └── animate-on-scroll.tsx # Scroll animation wrapper
```

---

## Component Specifications

### 1. Navbar (`components/layout/navbar.tsx`)

**Desktop (md+)**
- Fixed top, full-width
- Logo left: "KOBI!" in Geist Sans bold
- Nav links center: Listen, Services, Contact
- CTA right: "Work With Me" button (violet)
- Glass background on scroll

**Mobile (<md)**
- Logo left, burger icon right
- Opens full-screen overlay menu
- Animated hamburger to X transition

**Max lines**: ~150

---

### 2. Hero Section (`components/sections/hero.tsx`)

**Content**
- Headline: "Crafting Sounds That Move"
- Subheadline: "Producer. Artist. Sonic Architect."
- Dual CTAs side-by-side:
  - "Explore Releases" (outline)
  - "Book a Session" (filled violet)

**Behavior**
- Full viewport height minus nav
- Subtle gradient overlay
- Fade-in animation on load

**Max lines**: ~100

---

### 3. Artist Section (`components/sections/artist-section.tsx`)

**Content**
- Section header: "Latest Releases"
- Grid of release cards (responsive: 1/2/3 cols)
- "View All" link at bottom

**Data (placeholder)**
```ts
const releases = [
  { id: 1, title: "Midnight Protocol", type: "EP", year: "2024", image: "/placeholder-1.jpg" },
  { id: 2, title: "Neon Dreams", type: "Single", year: "2024", image: "/placeholder-2.jpg" },
  { id: 3, title: "Voltage", type: "Album", year: "2023", image: "/placeholder-3.jpg" },
  { id: 4, title: "Static", type: "Single", year: "2023", image: "/placeholder-4.jpg" },
]
```

**Max lines**: ~120

---

### 4. Release Card (`components/cards/release-card.tsx`)

**Design**
- Square aspect ratio
- Glass effect border
- Hover: scale up slightly, show play overlay
- Display: artwork, title, type badge, year

**Max lines**: ~80

---

### 5. Producer Section (`components/sections/producer-section.tsx`)

**Content**
- Section header: "Production Services"
- Service cards grid (2 cols desktop)
- Pricing tiers below (3 cols desktop)

**Services (placeholder)**
```ts
const services = [
  { title: "Mixing", description: "Professional mixing for any genre" },
  { title: "Mastering", description: "Industry-standard mastering" },
  { title: "Production", description: "Full track production from scratch" },
  { title: "Sound Design", description: "Custom sounds and textures" },
]
```

**Pricing (placeholder)**
```ts
const tiers = [
  { name: "Starter", price: "$299", features: ["1 track", "2 revisions", "Stems included"] },
  { name: "Pro", price: "$599", features: ["3 tracks", "Unlimited revisions", "Mix + Master"] },
  { name: "Enterprise", price: "Custom", features: ["Album projects", "Priority support", "Full production"] },
]
```

**Max lines**: ~150

---

### 6. Service Card (`components/cards/service-card.tsx`)

**Design**
- Glass card with icon
- Title + short description
- Hover: border glow

**Max lines**: ~60

---

### 7. Pricing Card (`components/cards/pricing-card.tsx`)

**Design**
- Glass card, middle tier highlighted
- Price prominent, feature list
- CTA button at bottom

**Max lines**: ~80

---

### 8. Newsletter Section (`components/sections/newsletter.tsx`)

**Content**
- Headline: "Stay in the Loop"
- Subtext: "Get updates on new releases and exclusive content."
- Email input + Subscribe button
- Glass container with subtle glow

**Max lines**: ~80

---

### 9. Audio Player (`components/audio/audio-player.tsx`)

**Design**
- Sticky bottom bar (hidden until track selected)
- Glass background
- Elements: artwork thumb, track info, play/pause, progress bar, volume
- Mobile: simplified (no volume, smaller)

**Behavior (Phase 1)**
- UI shell only, no actual audio
- Progress bar visual only
- Buttons have hover states

**Max lines**: ~150

---

### 10. Contact Modal (`components/modals/contact-modal.tsx`)

**Trigger**: "Book a Session" or "Inquire" buttons

**Form Fields**
- Name (required)
- Email (required)
- Project type (select: Mix, Master, Production, Other)
- Message (textarea)
- Submit button

**Behavior**
- Modal overlay with glass effect
- Close on backdrop click, X button, or Escape
- Form validation (client-side)
- Success state after submit (no backend yet)

**Max lines**: ~100 (modal) + ~120 (form)

---

### 11. Footer (`components/layout/footer.tsx`)

**Content**
- Logo + tagline
- Quick links: Listen, Services, Contact
- Social icons: Spotify, Apple Music, Instagram, Twitter
- Copyright

**Design**
- Dark background, muted text
- Social icons with hover glow

**Max lines**: ~100

---

### 12. Shared Components

**`glass-card.tsx`** (~30 lines)
- Reusable glass effect wrapper
- Props: className, children

**`section-header.tsx`** (~40 lines)
- Title + optional subtitle
- Consistent spacing

**`animate-on-scroll.tsx`** (~50 lines)
- Intersection Observer wrapper
- Fade-in-up animation on enter viewport

---

## Responsive Breakpoints

| Breakpoint | Width | Layout Changes |
|------------|-------|----------------|
| Mobile | <640px | Single column, burger menu, simplified player |
| Tablet | 640-1024px | 2-column grids, full nav |
| Desktop | >1024px | 3-column grids, all features |

---

## Animation Specifications

| Element | Animation | Trigger |
|---------|-----------|---------|
| Hero content | Fade in + slide up | Page load |
| Section headers | Fade in | Scroll into view |
| Cards | Fade in + stagger | Scroll into view |
| Navbar | Glass effect | On scroll >50px |
| Buttons | Scale + glow | Hover |
| Cards | Lift + border glow | Hover |
| Mobile menu | Slide in from right | Toggle |
| Modal | Fade + scale | Open |

---

## SEO Strategy

### Metadata (layout.tsx)
```ts
export const metadata = {
  title: "Kobi! | Music Producer & Artist",
  description: "Professional music production, mixing, and mastering services. Explore releases and book your session.",
  keywords: ["music producer", "mixing", "mastering", "beats", "production"],
  openGraph: {
    title: "Kobi! | Music Producer & Artist",
    description: "Crafting sounds that move.",
    type: "website",
  },
}
```

### Additional
- Semantic HTML (main, section, article, nav)
- Alt text on all images
- Proper heading hierarchy (single h1, structured h2/h3)
- JSON-LD structured data for Person/MusicGroup

---

## Implementation Order

### Phase 1: Foundation
1. Update `globals.css` with design tokens
2. Update `layout.tsx` with fonts and metadata
3. Create shared components (glass-card, section-header, animate-on-scroll)

### Phase 2: Layout Shell
4. Build navbar with mobile menu
5. Build footer
6. Create page.tsx composition

### Phase 3: Sections
7. Hero section
8. Artist section + release cards
9. Producer section + service/pricing cards
10. Newsletter section

### Phase 4: Interactions
11. Contact modal + form
12. Audio player UI shell

### Phase 5: Polish
13. Scroll animations
14. Responsive testing
15. SEO finalization

---

## Placeholder Assets

Images needed (will use generated placeholders):
- `/public/images/hero-bg.jpg` — Abstract dark gradient
- `/public/images/release-1.jpg` through `release-4.jpg` — Album artwork
- `/public/images/kobi-portrait.jpg` — Artist photo (optional)

---

## Future Considerations (Out of Scope)

- Supabase integration for content management
- Admin dashboard for Kobi
- Real audio playback with streaming APIs
- Newsletter email service integration
- Analytics tracking
- Blog/news section

---

## Success Criteria

- [ ] All sections render correctly
- [ ] Fully responsive (mobile, tablet, desktop)
- [ ] Smooth animations throughout
- [ ] Contact modal opens/closes properly
- [ ] Form validates inputs
- [ ] Audio player UI is complete
- [ ] Lighthouse performance >90
- [ ] Accessibility: keyboard navigation, screen reader friendly
- [ ] Dark theme consistent across all components

---

## Notes

- This is a prototype; copy and images are placeholders
- Keep component files under 600 lines
- No global state management needed
- Prioritize visual polish and responsiveness
- Database integration will come in Phase 2 of the project
