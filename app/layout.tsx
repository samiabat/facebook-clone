import type { Metadata } from 'next'
import './globals.css'
import { Providers } from '@/components/Providers'

export const metadata: Metadata = {
  title: 'Social Blade',
  description: 'Connect with friends and the world around you on Social Blade.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
