import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components'
import * as React from 'react'

interface WelcomeEmailProps {
  username?: string
  loginUrl?: string
}

export const WelcomeEmail = ({
  username = 'there',
  loginUrl = 'https://example.com/login',
}: WelcomeEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Welcome to our app! Get started today.</Preview>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                border: 'hsl(214.3 31.8% 91.4%)',
                input: 'hsl(214.3 31.8% 91.4%)',
                ring: 'hsl(221.2 83.2% 53.3%)',
                background: 'hsl(0 0% 100%)',
                foreground: 'hsl(222.2 84% 4.9%)',
                primary: {
                  DEFAULT: 'hsl(221.2 83.2% 53.3%)',
                  foreground: 'hsl(210 40% 98%)',
                },
                secondary: {
                  DEFAULT: 'hsl(210 40% 96.1%)',
                  foreground: 'hsl(222.2 47.4% 11.2%)',
                },
                destructive: {
                  DEFAULT: 'hsl(0 84.2% 60.2%)',
                  foreground: 'hsl(210 40% 98%)',
                },
                muted: {
                  DEFAULT: 'hsl(210 40% 96.1%)',
                  foreground: 'hsl(215.4 16.3% 46.9%)',
                },
                accent: {
                  DEFAULT: 'hsl(210 40% 96.1%)',
                  foreground: 'hsl(222.2 47.4% 11.2%)',
                },
                card: {
                  DEFAULT: 'hsl(0 0% 100%)',
                  foreground: 'hsl(222.2 84% 4.9%)',
                },
              },
            },
          },
        }}
      >
        <Body className="bg-background font-sans">
          <Container className="mx-auto py-12 px-4">
            <Section className="bg-card rounded-lg border border-border p-8 shadow-sm">
              <Heading className="text-3xl font-bold text-foreground mb-4">
                Welcome, {username}! 👋
              </Heading>
              <Text className="text-muted-foreground text-base mb-6">
                We&apos;re excited to have you on board. Your account has been
                successfully created and you&apos;re ready to get started.
              </Text>
              <Hr className="border-border my-6" />
              <Section className="mb-6">
                <Text className="text-foreground text-base mb-4">
                  Here are a few things you can do to get started:
                </Text>
                <Text className="text-muted-foreground text-base mb-2">
                  • Complete your profile
                </Text>
                <Text className="text-muted-foreground text-base mb-2">
                  • Explore the dashboard
                </Text>
                <Text className="text-muted-foreground text-base mb-2">
                  • Connect with your team
                </Text>
                <Text className="text-muted-foreground text-base">
                  • Set up your preferences
                </Text>
              </Section>
              <Section className="text-center">
                <Button
                  className="bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium no-underline"
                  href={loginUrl}
                >
                  Get Started
                </Button>
              </Section>
              <Hr className="border-border my-6" />
              <Text className="text-muted-foreground text-sm">
                Need help? Feel free to{' '}
                <Link
                  href="https://example.com/support"
                  className="text-primary underline"
                >
                  contact our support team
                </Link>
                .
              </Text>
            </Section>
            <Section className="mt-8">
              <Text className="text-muted-foreground text-xs text-center">
                If you didn&apos;t create this account, you can safely ignore
                this email.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

export default WelcomeEmail
