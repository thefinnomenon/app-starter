import { sendEmail } from '@/lib/emails'
import { WelcomeEmail } from '../../../emails/welcome'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, username, loginUrl } = body

    if (!email) {
      return Response.json(
        {
          success: false,
          error: 'Email address is required',
        },
        { status: 400 }
      )
    }

    const result = await sendEmail({
      to: email,
      subject: 'Welcome to our app!',
      react: WelcomeEmail({
        username,
        loginUrl,
      }),
    })

    return Response.json({
      success: true,
      message: 'Email sent successfully',
      data: result.data,
    })
  } catch (error) {
    console.error('Error sending email:', error)
    return Response.json(
      {
        success: false,
        error: 'Failed to send email',
      },
      { status: 500 }
    )
  }
}
