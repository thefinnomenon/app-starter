import { Mixpanel } from 'mixpanel-react-native'
import { env, isProduction } from './env'

let mixpanel: Mixpanel | null = null

const initializeMixpanel = async () => {
  if (!isProduction()) return

  const token = env.MIXPANEL_TOKEN

  if (!token) {
    console.warn('Mixpanel token not found. Analytics will not be tracked.')
    return
  }

  try {
    mixpanel = new Mixpanel(token, true)
    await mixpanel.init()
  } catch (error) {
    console.error('Failed to initialize Mixpanel:', error)
  }
}

const track = (eventName: string, properties?: Record<string, any>) => {
  if (!isProduction()) return
  if (!mixpanel) {
    console.warn('Mixpanel not initialized')
    return
  }
  mixpanel.track(eventName, properties)
}

const identify = (userId: string) => {
  if (!isProduction()) return
  if (!mixpanel) {
    console.warn('Mixpanel not initialized')
    return
  }
  mixpanel.identify(userId)
}

const setUserProperties = (properties: Record<string, any>) => {
  if (!isProduction()) return
  if (!mixpanel) {
    console.warn('Mixpanel not initialized')
    return
  }
  mixpanel.getPeople().set(properties)
}

const reset = () => {
  if (!isProduction()) return
  if (!mixpanel) {
    console.warn('Mixpanel not initialized')
    return
  }
  mixpanel.reset()
}

const registerSuperProperties = (properties: Record<string, any>) => {
  if (!isProduction()) return
  if (!mixpanel) {
    console.warn('Mixpanel not initialized')
    return
  }
  mixpanel.registerSuperProperties(properties)
}

const timeEvent = (eventName: string) => {
  if (!isProduction()) return
  if (!mixpanel) {
    console.warn('Mixpanel not initialized')
    return
  }
  mixpanel.timeEvent(eventName)
}

const trackScreenView = (
  screenName: string,
  properties?: Record<string, any>
) => {
  track('Screen View', { screen: screenName, ...properties })
}

// Export as namespace
export const analytics = {
  init: initializeMixpanel,
  track,
  identify,
  setUserProperties,
  reset,
  registerSuperProperties,
  timeEvent,
  trackScreenView,
}

// Also export individual functions for backward compatibility
export {
  identify as identifyUser,
  initializeMixpanel,
  registerSuperProperties,
  reset as resetAnalytics,
  setUserProperties,
  timeEvent,
  track as trackEvent,
  trackScreenView,
}
