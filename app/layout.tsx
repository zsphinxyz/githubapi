import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Github API',
  description: 'GITHUB API GUI Created by Zsphinx',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
              {children}
              <footer className='my-5 text-center text-foreground'>&copy; 2024 by <a href='https://linktr.ee/zsphinx' target='_blank' className='text-blue-500 underline'>zsphinx</a></footer>
          </ThemeProvider>
        </body>
    </html>
  )
}
