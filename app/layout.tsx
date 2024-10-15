import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'

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
        <body className={`${inter.className} flex flex-col min-h-screen justify-between`}>
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
