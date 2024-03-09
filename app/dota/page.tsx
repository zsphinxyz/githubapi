import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

async function getData() {
    const data = await fetch('https://api.opendota.com/api/heroStats');
    if (!data.ok) throw new Error('Failed to Fetch Data')
    return data.json()
}
let search = Promise.all('loading...')



async function Dota() {
    const data = await getData();
  return (
    <main className="max-w-7xl mx-auto">
        <section className="p-3 ">
            <div className="flex gap-2 flex-wrap">
                {
                    data.map((data: any, i: number) => (
                        <Link key={i} href={`/dota/${i}`} className="basis-32 flex flex-col items-center justify-center self-center cursor-default border border-muted hover:border-muted-foreground" >
                            <Suspense fallback={<div>...</div>}>
                                <Image src={`https://cdn.dota2.com${data.img}`} width={100} height={55} alt='hero' className="w-auto h-auto" />
                                <p className="text-xs text-muted-foreground py-1">{data.localized_name}</p>
                            </Suspense>
                        </Link>
                    ))
                }
            </div>
        </section>

    </main>
  )
}

export default Dota