'use client'

import type { MouseEvent, ReactNode } from 'react'
import { useSpaceNav, scrollToSection } from '@/components/shared/space-nav-context'
import { cn } from '@/lib/utils'

interface SectionLinkProps {
  href: string
  spaceName?: string
  className?: string
  style?: React.CSSProperties
  children: ReactNode
  'data-cursor-label'?: string
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void
}

/**
 * Anchor link that scrolls natively before JS hydrates, then uses the cinematic
 * transition (when spaceName is set) or smooth scroll once React is ready.
 */
export function SectionLink({
  href,
  spaceName,
  className,
  style,
  children,
  onClick,
  ...props
}: SectionLinkProps) {
  const { navigateToSpace } = useSpaceNav()

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    onClick?.(event)
    if (spaceName) {
      navigateToSpace(href, spaceName)
    } else {
      scrollToSection(href)
    }
  }

  return (
    <a
      href={href}
      onClick={handleClick}
      className={cn('touch-manipulation', className)}
      style={style}
      {...props}
    >
      {children}
    </a>
  )
}
