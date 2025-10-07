import { serverAnalytics } from '@/lib/analytics.server'

export async function GET(request: Request) {
  // Track an API request
  serverAnalytics.track('anonymous-user', 'API Request', {
    endpoint: '/api/test/analytics',
    method: 'GET',
  })

  return Response.json({
    message: 'Analytics event tracked!',
    tracked: process.env.APP_ENV === 'production',
  })
}

export async function POST(request: Request) {
  const body = await request.json()

  // Track with user ID if available
  const userId = body.userId || 'anonymous-user'

  serverAnalytics.track(userId, 'Data Submitted', {
    endpoint: '/api/test/analytics',
    method: 'POST',
    data: body,
  })

  return Response.json({
    success: true,
    tracked: process.env.APP_ENV === 'production',
  })
}
