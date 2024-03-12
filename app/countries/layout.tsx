import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Countries',
  description: 'Countries Data',
}

export default function RootLayout({
  children,
  side
}: {
  children: React.ReactNode
  side: React.ReactNode
}) {
  return (
    <div className="">
        {children}
        {/* {side} */}
    </div>

  )
}
