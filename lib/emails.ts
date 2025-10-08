import { render } from '@react-email/render'
import { Resend } from 'resend'
import { env } from './env'
import { ReactElement } from 'react'

const resend = new Resend(env.RESEND_API_KEY)

interface SendEmailOptions {
  to: string | string[]
  subject: string
  react: ReactElement
  from?: string
}

export async function sendEmail({
  to,
  subject,
  react,
  from = env.EMAIL_FROM,
}: SendEmailOptions) {
  try {
    const html = await render(react)

    const { data, error } = await resend.emails.send({
      from,
      to,
      subject,
      html,
    })

    if (error) {
      console.error('Error sending email:', error)
      throw error
    }

    return { success: true, data }
  } catch (error) {
    console.error('Failed to send email:', error)
    throw error
  }
}
