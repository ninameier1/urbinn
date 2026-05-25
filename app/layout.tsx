import type { Metadata } from 'next'
import { montserrat } from '@fonts/fonts'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: "Let's GLOW Flevoland!",
    template: "%s | Let's GLOW Flevoland!",
  },
  description: "Gezonde Leefomgeving op Wijkniveau",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={montserrat.className}>
      <body className="bg-background m-0">
        {children}
      </body>
    </html>
  )
}
