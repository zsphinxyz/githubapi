import Link from "next/link"

function Home() {
  return (
    <main className="flex flex-col gap-5 items-center justify-center text-lg p-3 w-80 min-w-52 mx-auto
      hover:*:text-blue-400 hover:*:bg-white/10 *:w-full *:border *:border-muted *:py-2 *:px-10 *:block *:rounded-lg *:text-center *:transition-colors
    ">
      <Link href='/dota'>Dota2</Link>
      <Link href='/dotaStats'>Dota2 Stats</Link>
      {/* <Link href='/countries'>Countries</Link> */}
      <Link href='/github'>Github</Link>
      <Link href='/youtube'>Youtube</Link>
      <Link href='/data'>Random Data API</Link>
    </main>
  )
}

export default Home