import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import Link from 'next/link'
import { Suspense } from 'react'
import Loading from './loading'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Dota 2',
  description: 'Dota 2 api project',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="">

        <header className='p-3 bg-muted'>
            <Link href='/dota' className='text-xl font-bold'>Dota 2</Link>
        </header>
        
            {children}

        <footer className='my-5 text-center text-sm text-foreground space-x-10'>
            <span className="">&copy; 2024 by {' '}
                <a href='https://linktr.ee/zsphinx' target='_blank' className='text-blue-500 underline'>zsphinx</a>
            </span>
            <span className="space-x-2">
                API &gt;&gt; &nbsp; 
                <a href="https://docs.opendota.com/" target="_blank" rel="noopener noreferrer" className='text-blue-500 underline'>Open Dota API</a>,
                <a href="https://docs.stratz.com/index.html" target="_blank" rel="noopener noreferrer" className='text-blue-500 underline'>Stratz API</a>
            </span>
        </footer>
    </div>

  )
}
