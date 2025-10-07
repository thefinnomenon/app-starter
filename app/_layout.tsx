import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as NavigationThemeProvider,
} from '@react-navigation/native'
import { Stack, Slot } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import './global.css'

import { ThemeProvider, useTheme } from '@/lib/contexts/ThemeContext'
import { PortalHost } from '@rn-primitives/portal'
import { useColorScheme } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Toaster } from 'sonner-native'
import { useColorScheme as useNativeWindColorScheme } from 'nativewind'
import { useEffect } from 'react'

export const unstable_settings = {
  anchor: '(tabs)',
}

function ThemedApp() {
  const { colorScheme } = useTheme()
  const { setColorScheme: setNativeWindColorScheme } =
    useNativeWindColorScheme()

  useEffect(() => {
    setNativeWindColorScheme(colorScheme)
  }, [colorScheme, setNativeWindColorScheme])

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationThemeProvider
        value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
      >
        <Slot />
        <PortalHost />
        <Toaster theme={colorScheme === 'dark' ? 'dark' : 'light'} />
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      </NavigationThemeProvider>
    </GestureHandlerRootView>
  )
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <ThemedApp />
    </ThemeProvider>
  )
}
