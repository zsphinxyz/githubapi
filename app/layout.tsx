import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import Link from 'next/link'

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
        <body className={`${inter.className} flex flex-col min-h-screen justify-between`}>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
            <div className="">
              <header className='p-3 bg-muted'>
                <Link href='/' className='text-xl font-bold'>Home</Link>
              </header>
                {children}
            </div>
              <footer className='my-5 text-center text-foreground'>&copy; 2024 by <a href='https://linktr.ee/zsphinx' target='_blank' className='text-blue-500 underline'>zsphinx</a></footer>
          </ThemeProvider>
        </body>
    </html>
  )
}
