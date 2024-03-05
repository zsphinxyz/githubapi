import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

async function getData() {
    const data = await fetch('https://api.opendota.com/api/heroStats');
    if (!data.ok) throw new Error('Failed to Fetch Data')
    return data.json()
}

async function Dota() {
    const data = await getData();
  return (
    <main className="flex gap-2 flex-wrap ">
        {
            data.map( (data:any, i:any) => (
                <Link key={i}  href={`/dota/${i}`} className="basis-32 flex flex-col items-center justify-center self-center cursor-default border border-muted hover:border-muted-foreground" >
                    <Suspense fallback= {<div>...</div>}>
                        <Image src={`https://cdn.dota2.com${data.img}`} width={100} height={55} alt='hero'/>
                        <p className="text-xs text-muted-foreground">{data.localized_name}</p>
                    </Suspense>
                </Link>
            ) )
        }
    </main>
  )
}

export default Dota