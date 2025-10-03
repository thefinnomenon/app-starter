import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { env, isDevelopment, isStaging, isProduction } from '@/lib/env'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'

export function EnvironmentInfo() {
  const getBadgeColor = () => {
    if (isDevelopment()) return '#10B981' // Green
    if (isStaging()) return '#F59E0B' // Yellow
    return '#EF4444' // Red
  }

  const getBadgeText = () => {
    if (isDevelopment()) return 'DEV'
    if (isStaging()) return 'STAGING'
    return 'PROD'
  }

  if (isProduction()) {
    // Don't show environment info in production
    return null
  }

  return (
    <ThemedView style={styles.container}>
      <View style={[styles.badge, { backgroundColor: getBadgeColor() }]}>
        <Text style={styles.badgeText}>{getBadgeText()}</Text>
      </View>
      <ThemedText style={styles.envText}>Environment: {env.APP_ENV}</ThemedText>
      <ThemedText style={styles.apiText}>API: {env.API_URL}</ThemedText>
      <ThemedText style={styles.apiText}>
        Debug Mode: {env.ENABLE_DEBUG_MODE ? 'ON' : 'OFF'}
      </ThemedText>
      <ThemedText style={styles.apiText}>
        Analytics: {env.ENABLE_ANALYTICS ? 'ON' : 'OFF'}
      </ThemedText>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    margin: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: 8,
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  envText: {
    fontSize: 14,
    marginBottom: 4,
  },
  apiText: {
    fontSize: 12,
    opacity: 0.7,
  },
})
