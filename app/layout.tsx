import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import Navbar from '@/components/Navbar'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

const playfairDisplay = Playfair_Display({
  variable: '--font-serif',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Koré Coffee',
  description: 'Seoul Inspiration. New York Energy. Premium Korean-inspired coffee.',
  metadataBase: new URL('https://korecoffee.nyc'),
  icons: {
    icon: '/kore coffee logo.png',
    apple: '/kore coffee logo.png',
  },
  openGraph: {
    title: 'Koré Coffee',
    description: 'Seoul Inspiration. New York Energy. Premium Korean-inspired coffee.',
    url: 'https://korecoffee.nyc',
    siteName: 'Koré Coffee',
    images: [
      {
        url: '/hero/tiramisu_latte_calm.png',
        width: 1200,
        height: 630,
        alt: 'Koré Coffee Signature Tiramisu Latte',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#FAF7F2',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${playfairDisplay.variable} ${inter.variable}`}
    >
      <body className="bg-background font-sans antialiased">
        <Navbar />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
