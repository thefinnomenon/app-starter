import Mixpanel from 'mixpanel'

let mixpanel: Mixpanel.Mixpanel | null = null

const isProduction = process.env.APP_ENV === 'production'

function initMixpanel() {
  if (!isProduction) {
    return null
  }

  const token = process.env.EXPO_PUBLIC_MIXPANEL_TOKEN

  if (!token) {
    console.warn('Mixpanel token not found for server-side tracking')
    return null
  }

  if (!mixpanel) {
    mixpanel = Mixpanel.init(token)
  }

  return mixpanel
}

function getMixpanel() {
  if (!mixpanel) {
    mixpanel = initMixpanel()
  }
  return mixpanel
}

const track = (
  distinctId: string,
  eventName: string,
  properties?: Record<string, any>
) => {
  if (!isProduction) return

  const client = getMixpanel()
  if (!client) return

  client.track(eventName, {
    distinct_id: distinctId,
    ...properties,
  })
}

const identify = (distinctId: string, properties?: Record<string, any>) => {
  if (!isProduction) return

  const client = getMixpanel()
  if (!client) return

  if (properties) {
    client.people.set(distinctId, properties)
  }
}

const incrementProperty = (
  distinctId: string,
  property: string,
  value: number = 1
) => {
  if (!isProduction) return

  const client = getMixpanel()
  if (!client) return

  client.people.increment(distinctId, property, value)
}

// Export as namespace for consistency with client-side analytics
export const serverAnalytics = {
  track,
  identify,
  incrementProperty,
}
