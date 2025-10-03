export const isEnvironment = (environment: string): boolean =>
  process.env.APP_ENV === environment
export const isDevelopment = (): boolean => isEnvironment('development')
export const isStaging = (): boolean => isEnvironment('staging')
export const isProduction = (): boolean => isEnvironment('production')

export const env = {
  APP_ENV: process.env.APP_ENV,
}
