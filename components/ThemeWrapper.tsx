import { useTheme } from '@/lib/contexts/ThemeContext'
import { useColorScheme as useNativeWindColorScheme } from 'nativewind'
import { useEffect } from 'react'

export function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const { colorScheme } = useTheme()
  const { setColorScheme } = useNativeWindColorScheme()

  useEffect(() => {
    setColorScheme(colorScheme)
  }, [colorScheme, setColorScheme])

  return <>{children}</>
}
