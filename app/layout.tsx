import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Marathon Skills 2026',
  description: 'Полумарафон 21.097 км · 15 июня 2026 · Боровое',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  )
}
