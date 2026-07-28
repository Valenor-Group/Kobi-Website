'use client'

import { useEffect, useState, type RefObject } from 'react'

/** True when the section is on screen (with margin so effects resume before fully visible). */
export function useSectionInView(
  ref: RefObject<HTMLElement | null>,
  rootMargin = '40% 0px',
  initialInView = false,
) {
  const [inView, setInView] = useState(initialInView)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin, threshold: 0 },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [ref, rootMargin])

  return inView
}
