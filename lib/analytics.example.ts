/**
 * Mixpanel Analytics Usage Examples
 *
 * This file demonstrates how to use the analytics functions in your app.
 * Screen views are tracked automatically via MixpanelProvider.
 *
 * In development mode, all analytics calls will be logged to console instead
 * of sending data to Mixpanel.
 */

import { analytics } from '@/lib/analytics'

// Example 1: Track a button click
export function handleButtonClick() {
  analytics.track('Button Clicked', {
    button_name: 'Submit Form',
    screen: 'Home',
  })
}

// Example 2: Track form submission
export function handleFormSubmit(formData: any) {
  analytics.track('Form Submitted', {
    form_type: 'registration',
    fields_count: Object.keys(formData).length,
  })
}

// Example 3: Identify a user after login
export function handleUserLogin(userId: string, email: string) {
  analytics.identify(userId)
  analytics.setUserProperties({
    email,
    last_login: new Date().toISOString(),
  })
}

// Example 4: Set super properties (sent with every event)
export function setAppContext() {
  analytics.registerSuperProperties({
    app_version: '1.0.0',
    platform: 'mobile',
  })
}

// Example 5: Track timed events (e.g., video watching)
export function startWatchingVideo() {
  analytics.timeEvent('Video Watched')
}

export function finishWatchingVideo(videoId: string, duration: number) {
  analytics.track('Video Watched', {
    video_id: videoId,
    duration,
  })
}

// Example 6: Reset on logout
export function handleUserLogout() {
  analytics.reset()
}

// Example 7: Track purchase
export function handlePurchase(productId: string, price: number) {
  analytics.track('Purchase Completed', {
    product_id: productId,
    price,
    currency: 'USD',
  })
}

// Example 8: Track error
export function trackError(error: Error, context?: string) {
  analytics.track('Error Occurred', {
    error_message: error.message,
    error_stack: error.stack,
    context,
  })
}
