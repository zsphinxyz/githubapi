import Link from "next/link"

function Home() {
  return (
    <main className="flex flex-col gap-5 items-center justify-center text-xl py-3">
      <Link href='/dota'>Dota2</Link>
      <Link href='/countries'>Countries</Link>
      <Link href='/github'>Github</Link>
    </main>
  )
}

export default Home