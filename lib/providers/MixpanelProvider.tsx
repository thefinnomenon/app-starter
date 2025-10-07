import { analytics } from '@/lib/analytics'
import { usePathname, useSegments } from 'expo-router'
import { useEffect, useRef } from 'react'

export function MixpanelProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const segments = useSegments()
  const lastPathRef = useRef<string | null>(null)

  // Initialize Mixpanel once on mount
  useEffect(() => {
    analytics.init()
  }, [])

  // Track screen views automatically
  useEffect(() => {
    if (lastPathRef.current === pathname) return
    lastPathRef.current = pathname

    // Get screen name from pathname
    const screenName = pathname === '/' ? 'Home' : pathname.replace('/', '')

    // Track screen view
    analytics.trackScreenView(screenName, {
      pathname,
      segments: segments.join('/'),
    })
  }, [pathname, segments])

  return <>{children}</>
}
