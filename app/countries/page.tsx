import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export default async function Page() {
    const res = await fetch('https://restcountries.com/v3.1/all');
    const data = await res.json();

  return (
    <main className="flex flex-wrap gap-5 cursor-default">
        {
            data.map((d:any, j:number) => {
                if (j == 194) {
                    return null;
                }
                return(
                    <div key={d.name.official} className="shrink-0 grow-0 h-fit basis-28 border border-muted hover:bg-white/10 transition overflow-hidden">
                        <div className="w-28 h-28 object-contain bg-white/10 flex items-center">
                            <Link href={`countries/${d.name.official}`}>
                                <Suspense fallback={<div className="w-28 h-28 bg-muted"></div>}>
                                    <Image src={d.flags.png} alt={d.flags.alt} width={112} height={112} className="w-28 h-28 select-none object-contain"/>
                                </Suspense>
                            </Link>
                        </div>
                        <p className="text-xs text-nowrap text-ellipsis">{d.name.common}</p>
                    </div>
                )
            } )
        }
    </main>
  )
}
