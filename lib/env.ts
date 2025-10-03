export const isEnvironment = (environment: string): boolean =>
  process.env.NODE_ENV === environment
export const isDevelopment = (): boolean => isEnvironment('development')
export const isStaging = (): boolean => isEnvironment('staging')
export const isProduction = (): boolean => isEnvironment('production')
