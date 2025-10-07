import { Tabs } from 'expo-router'
import React from 'react'

import { Colors } from '@/constants/theme'
import { useTheme } from '@/lib/contexts/ThemeContext'

export default function TabLayout() {
  const { colorScheme } = useTheme()

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
        }}
      />
    </Tabs>
  )
}
