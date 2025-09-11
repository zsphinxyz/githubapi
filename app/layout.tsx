import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import { Analytics } from "@vercel/analytics/react"
import QueryWrapper from '@/components/QueryWrapper'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'zapiz',
  description: 'Projects using APIs',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Analytics />
      <body className={`${inter.className} flex flex-col min-h-dvh justify-between bg-background text-foreground`}>
        <ThemeProvider
          attribute='class'
          defaultTheme='dark'
          enableSystem={true}
          disableTransitionOnChange
        >
          <QueryWrapper>
            <div className="min-h-dvh flex flex-col">
              {children}
              <footer className="bg-slate-800 mt-auto p-1 text-center text-xs font-medium">
                by <a href="https://github.com/zsphinxyz" target='_blank' className='text-blue-400 underline'>zsphinxyz</a>
              </footer>
            </div>
          </QueryWrapper>
        </ThemeProvider>
      </body>
    </html>
  )
}
