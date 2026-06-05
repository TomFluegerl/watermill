import './globals.css'
import { ChunkLoadErrorHandler } from '@/components/chunk-load-error-handler'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Hochzeit – Alte Wassermühle | 26. Juni 2026',
  description: 'Hochzeit Alte Wassermühle – 26. Juni 2026, Mauterndorf im Lungau',
  metadataBase: new URL(process.env.NEXTAUTH_URL || 'http://localhost:3000'),
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
  openGraph: {
    title: 'Hochzeit – Alte Wassermühle',
    description: '26. Juni 2026 · Mauterndorf im Lungau',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Lora:ital,wght@0,400;0,500;0,600;1,400&family=Great+Vibes&display=swap"
          rel="stylesheet"
        />
        <script src="https://apps.abacus.ai/chatllm/appllm-lib.js"></script>
      </head>
      <body>
        {children}
        <ChunkLoadErrorHandler />
      </body>
    </html>
  )
}
