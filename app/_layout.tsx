import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as NavigationThemeProvider,
} from '@react-navigation/native'
import { Slot } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import './global.css'

import { ThemeProvider, useTheme } from '@/lib/contexts/ThemeContext'
import { MixpanelProvider } from '@/lib/providers/MixpanelProvider'
import { PortalHost } from '@rn-primitives/portal'
import { useColorScheme as useNativeWindColorScheme } from 'nativewind'
import { useEffect } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Toaster } from 'sonner-native'

export const unstable_settings = {
  anchor: '(tabs)',
}

function ThemedApp() {
  const { theme, colorScheme } = useTheme()
  const { setColorScheme: setNativeWindColorScheme } =
    useNativeWindColorScheme()

  useEffect(() => {
    // Force NativeWind to update by setting to undefined first if switching to system
    if (theme === 'system') {
      setNativeWindColorScheme(colorScheme)
    } else {
      setNativeWindColorScheme(colorScheme)
    }
  }, [colorScheme, setNativeWindColorScheme, theme])

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
    <MixpanelProvider>
      <ThemeProvider>
        <ThemedApp />
      </ThemeProvider>
    </MixpanelProvider>
  )
}
