import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Dota 2 TI2025 Stats',
  description: 'opendota api project',
  keywords: ["dota2", "The International", "TI 2025", "Dota", "Esport", "Game", "MOBA"],
  openGraph: {
    title: 'Dota 2 TI2025 Stats',
    description: 'opendota api project',
    images: [{url: "https://zapiz.vercel.app/dotaStats.png"}],
    siteName: 'Dota Stats',
    url: "https://zapiz.vercel.app/dotaStats"
  }
}

const Page = ({children}: {children: React.ReactNode}) => children
export default Page;