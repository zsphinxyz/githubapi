import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'zapiz',
  description: 'Projects using APIs Created by Zsphinx',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Analytics />
        <body className={`${inter.className} flex flex-col min-h-screen justify-between bg-background text-foreground`}>
          <ThemeProvider
            attribute='class'
            defaultTheme='dark'
            enableSystem={true}
            disableTransitionOnChange
          >
            <div className="">
                {children}
            </div>
          </ThemeProvider>
        </body>
    </html>
  )
}
