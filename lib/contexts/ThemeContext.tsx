import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { Appearance } from 'react-native'

type Theme = 'light' | 'dark' | 'system'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  colorScheme: 'light' | 'dark'
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [systemColorScheme, setSystemColorScheme] = useState<'light' | 'dark'>(
    () => {
      const current = Appearance.getColorScheme()
      return current === 'dark' ? 'dark' : 'light'
    }
  )
  const [theme, setThemeState] = useState<Theme>('system')
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    // Load saved theme from storage
    AsyncStorage.getItem('theme').then((savedTheme) => {
      if (savedTheme) {
        setThemeState(savedTheme as Theme)
      }
      setIsReady(true)
    })
  }, [])

  useEffect(() => {
    // Listen for system theme changes
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setSystemColorScheme(colorScheme === 'dark' ? 'dark' : 'light')
    })

    // Also check current value when component mounts or theme changes
    const current = Appearance.getColorScheme()
    setSystemColorScheme(current === 'dark' ? 'dark' : 'light')

    return () => subscription.remove()
  }, [])

  const setTheme = async (newTheme: Theme) => {
    setThemeState(newTheme)
    await AsyncStorage.setItem('theme', newTheme)
  }

  const colorScheme = theme === 'system' ? systemColorScheme : theme

  // Don't render until we've loaded the saved theme
  if (!isReady) return null

  return (
    <ThemeContext.Provider value={{ theme, setTheme, colorScheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}
