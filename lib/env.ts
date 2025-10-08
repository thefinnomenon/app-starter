const appEnv = process.env.EXPO_PUBLIC_APP_ENV || 'development'

export const isEnvironment = (environment: string): boolean =>
  appEnv === environment
export const isDevelopment = (): boolean => isEnvironment('development')
export const isStaging = (): boolean => isEnvironment('staging')
export const isProduction = (): boolean => isEnvironment('production')

export const env = {
  APP_ENV: appEnv,
  MIXPANEL_TOKEN: process.env.EXPO_PUBLIC_MIXPANEL_TOKEN || '',
  SENTRY_DSN: process.env.EXPO_PUBLIC_SENTRY_DSN || '',
  RESEND_API_KEY: process.env.EXPO_PUBLIC_RENDER_API_KEY || '',
  EMAIL_FROM: process.env.EMAIL_FROM || 'onboarding@resend.dev',
}
