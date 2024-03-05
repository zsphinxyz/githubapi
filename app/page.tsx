import Link from "next/link"

function Home() {
  return (
    <main className="flex flex-col gap-5 items-center justify-center text-xl py-3">
        <Link href='/github'>Github</Link>
        <Link href='/dota'>Dota2</Link>
    </main>
  )
}

export default Home