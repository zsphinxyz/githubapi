import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { GlobeIcon } from "@radix-ui/react-icons";

import Image from "next/image";
import { Suspense } from "react";
import { BiPhone } from "react-icons/bi";
import { BsCashCoin } from "react-icons/bs";
import { MdGroups } from "react-icons/md";
import { RiSpeakFill } from "react-icons/ri";

async function CountryPage({params}: {params: {name: string}}) {
    const res = await fetch(`https://restcountries.com/v3.1/name/${params.name}?fullText=true`);
    const data = await res.json()
    const countryData = await data[0];
    const nativesObj = await countryData.name.nativeName;
    const nativeValues = Object.values(nativesObj)
    let nativeNames:any[] = [];

    nativeValues.map( (i:any) => {
        nativeNames.push(i.official)
        nativeNames.push(i.common)
    })
    // @ts-ignore
    let nativeNameUnique:any = [...new Set(nativeNames)] 

    const languages = Object.values(countryData.languages)
    const currency:any = Object.values(countryData.currencies)[0]
    const phonePrefix:any = countryData.idd.root + countryData.idd.suffixes[0]

  return (
    <section className=" max-w-2xl mx-auto">
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-5 mb-2">
                    <div className="relative">
                        <Image src={countryData.flags.png} width={120} height={75} priority alt={countryData.flags.alt} className="size-auto" />

                        {countryData.unMember && 
                        <div className=" absolute select-none -top-2 -right-2 bg-white p-1 rounded-full flex shadow-sm shadow-black/50">
                            <GlobeIcon className="text-7xl text-blue-500" />
                            <span className="text-green-500 text-xs">UN</span>
                        </div>
                        }

                    </div>

                      <div className="space-y-1">
                          <h1 className="text-xl">
                              {countryData.name.official}
                          </h1>

                          <p className="text-muted-foreground">{countryData.capital[0]}</p>
                          <p className="text-muted-foreground">{countryData.region} • {countryData.subregion}</p>
                      </div>
                </CardTitle>

                <CardDescription>
                    <span className="flex flex-wrap gap-2 mb-2">
                        {
                            countryData.altSpellings.map((i: string) => (
                                <span key={i} className="bg-muted hover:bg-muted/50 block transition text-xs py-1 px-2 rounded-full select-none cursor-default">{i}</span>
                            ))
                        }
                    </span>

                    <span className="flex flex-wrap gap-2 ">
                    {
                        nativeNameUnique.map( (i:any) => ( <span key={i} className="bg-green-300/30 hover:bg-muted transition text-xs py-1 px-2 rounded-full select-none cursor-default">{i}</span> ))
                    }
                    </span>

                </CardDescription>
            </CardHeader>

            <CardContent>

                  <div className=" border border-muted rounded-md p-3 flex cursor-default">
                      <Suspense fallback={<div className="w-32 h-32 bg-red-500 flex items-center justify-center text-white">Loading...</div>}>
                          <Image src={countryData.coatOfArms.png} alt='' width={200} height={200} className="basis-1/2 size-auto p-5" />
                      </Suspense>
                      <div className="basis-1/2 bg-muted-foreground/10 p-5 space-y-3 text-foreground/80">
                          <p title='Currency & Symbol'><BsCashCoin className="inline-block text-yellow-500 mr-1" /> {currency.name} • {currency.symbol}</p>
                          <p title="Population"><MdGroups className="inline-block text-yellow-500 mr-1" />{countryData.population.toLocaleString()}</p>
                          <p title="Phone Pre-Fix"><BiPhone className="inline-block text-yellow-500 mr-1" />{phonePrefix}</p>
                          <p title='Spoken Languages'><RiSpeakFill className="inline-block text-yellow-500 mr-1" />
                              {
                                  languages.map((i: any) => (<span key={i}>{i}, </span>))
                              }
                          </p>
                      </div>
                  </div>

            </CardContent>
        </Card>
    </section>
  )
}

export default CountryPage