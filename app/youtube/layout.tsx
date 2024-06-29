import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/app/globals.css'
import Link from 'next/link'
import { ThemeProvider } from '@/components/ThemeProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Z Tube',
  description: 'youtube api project',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section suppressHydrationWarning>
      <div className={`${inter.className} flex flex-col min-h-screen `}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
            <nav className="bg-white/20 p-3 w-full max-w-6xl mx-auto block">
              <Link href='/youtube?q' className='text-2xl font-extrabold bg-red-600 px-2 py-1 rounded-xl hover:shadow-md hover:drop-shadow-lg transition-all '>
                Z Tube
              </Link>
            </nav>
            <section className="">
              {children}
            </section>
        </ThemeProvider>
      </div>
    </section>
  )
}
