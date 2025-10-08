import 'dotenv/config'

const IS_DEV = process.env.APP_ENV === 'development'
const IS_STAGING = process.env.APP_ENV === 'staging'

const getAppName = () => {
  if (IS_DEV) return 'App Starter (Dev)'
  if (IS_STAGING) return 'App Starter (Staging)'
  return 'App Starter'
}

const getAppSlug = () => {
  if (IS_DEV) return 'app-starter-dev'
  if (IS_STAGING) return 'app-starter-staging'
  return 'app-starter'
}

const getAppScheme = () => {
  if (IS_DEV) return 'appstarter-dev'
  if (IS_STAGING) return 'appstarter-staging'
  return 'appstarter'
}

const getAppIcon = () => {
  // You can use different icons for different environments
  return './assets/images/icon.png'
}

const getBundleIdentifier = () => {
  if (IS_DEV) return 'com.appstarter.dev'
  if (IS_STAGING) return 'com.appstarter.staging'
  return 'com.appstarter'
}

const getAndroidPackage = () => {
  if (IS_DEV) return 'com.appstarter.dev'
  if (IS_STAGING) return 'com.appstarter.staging'
  return 'com.appstarter'
}

export default {
  expo: {
    name: getAppName(),
    slug: getAppSlug(),
    version: '1.0.0',
    orientation: 'portrait',
    icon: getAppIcon(),
    scheme: getAppScheme(),
    userInterfaceStyle: 'automatic',
    newArchEnabled: true,
    runtimeVersion: {
      policy: 'appVersion',
    },
    updates: {
      url: `https://u.expo.dev/${process.env.EAS_PROJECT_ID || 'YOUR_PROJECT_ID'}`,
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: getBundleIdentifier(),
    },
    android: {
      package: getAndroidPackage(),
      adaptiveIcon: {
        backgroundColor: '#E6F4FE',
        foregroundImage: './assets/images/android-icon-foreground.png',
        backgroundImage: './assets/images/android-icon-background.png',
        monochromeImage: './assets/images/android-icon-monochrome.png',
      },
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false,
    },
    web: {
      output: 'static',
      favicon: './assets/images/favicon.png',
      bundler: 'metro',
    },
    plugins: [
      'expo-router',
      [
        'expo-splash-screen',
        {
          image: './assets/images/splash-icon.png',
          imageWidth: 200,
          resizeMode: 'contain',
          backgroundColor: '#ffffff',
          dark: {
            backgroundColor: '#000000',
          },
        },
      ],
      [
        '@sentry/react-native/expo',
        {
          url: 'https://sentry.io/',
          project: 'app-starter',
          organization: 'the-finnternet',
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
      reactCompiler: true,
    },
    extra: {
      eas: {
        projectId: '477d8efe-85bc-4b87-a7a9-46c9cf3e681e',
      },
    },
  },
}
