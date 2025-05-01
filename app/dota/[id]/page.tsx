import Image from "next/image"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { redirect } from "next/navigation"
import { Suspense, useState } from "react"


async function Page({ params }: { params: { id: string } }) {
  // const res = await fetch('https://api.opendota.com/api/heroStats');


  const id = params.id;
  const res = await fetch(`https://www.dota2.com/datafeed/herodata?language=english&hero_id=${id}`)
  const data = (await res.json()).result.data.heroes[0];
  const attrLink = "https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/icons/hero_"
  const primary_attr = data.primary_attr == 0 ? attrLink + "strength.png" 
                                            : data.primary_attr == 1 ? attrLink + "agility.png" 
                                            : data.primary_attr == 2 ? attrLink + "intelligence.png" 
                                            : attrLink + "universal.png"

  // console.log(data)
  // const skills = await data.abilities
  // console.log(skills)
  // https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/abilities/${res.}.png
  // https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/axe.png
  async function NextAction() {
    'use server'
    const newId = parseInt(id) + 1
    redirect(`${newId}`);
  }

  async function PrevAction() {
    'use server'
    const newId = parseInt(id) - 1
    redirect(`${newId}`);
  }

  return (
    <div className="w-full max-w-screen-lg mx-auto my-5 relative overflow-hidden cursor-default">
      <Card className="bg-transparent">

        <CardHeader>
          <Suspense fallback={'...'}>
            <CardTitle className="">
             <p className="text-3xl font-bold">
              {data.name_loc}
              <Image src={primary_attr} alt="attributes" width={22} height={22} className="inline ml-1" />
              </p>
             <p className="font-normal pt-1 opacity-70 text-sm">{data.npe_desc_loc}</p>
             <p className="font-normal pt-1 opacity-70 text-sm border-y-2 border-muted py-3 my-2" 
                dangerouslySetInnerHTML={{ __html: data.hype_loc }}></p>
            </CardTitle>
          </Suspense>

          <CardDescription>

            <div className="flex flex-col md:flex-row items-center justify-between gap-2">
              <video className="max-h-96 mx-auto"
                loop autoPlay playsInline preload="auto" poster={`https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/${data.name.slice(14)}.png`}>
                <source type="video/webm" src={`https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/${data.name.slice(14)}.webm`} />
                <source type={`video/video/mp4; codecs="hvc1"`} src={`https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/${data.name.slice(14)}.mov`} />
                <img src={`https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/${data.name.slice(14)}.png`} />
              </video>

              <div className="w-full flex gap-2 flex-wrap items-center justify-center ">
                {
                   data.abilities.filter((skill: any) => !skill.ability_is_granted_by_shard && !skill.ability_is_granted_by_septer && !skill.ability_is_innate)
                   .map((skill: any, i: number) => {
                    return (
                      <div key={i} className="flex flex-col flex-wrap items-center justify-center gap-2 max-w-24">
                        <Image src={`https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/abilities/${skill.name}.png`} alt={skill.name} width={90} height={90} className=" select-none" />
                        <p className="text-xs text-muted-foreground py-1">{skill.name_loc}</p>
                      </div>
                    )
                  })
                } 
                {/* <p className="">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias nam alias nesciunt ex similique sunt nobis odio, soluta, exercitationem dolor eaque rerum qui sit a debitis ad eligendi beatae consequatur!
                </p> */}
              </div>
            </div>

          </CardDescription>
        </CardHeader>

        <CardContent>
          <Suspense fallback={'...'}>
            <div className="ring-muted ring-1 rounded-md p-3 text-sm">
              <p className="underline font-bold text-lg text-muted-foreground">Bio</p>
              <p className="font-normal pt-1 opacity-70 text-sm" 
                 dangerouslySetInnerHTML={{ __html: data.bio_loc }}></p>
            </div>
          </Suspense>
        </CardContent>

        <CardFooter className="flex justify-between">

          {/* <form action={PrevAction}>
            {parseInt(id) > 0 && 
            <button name='next' type="submit" className="bg-muted select-none px-3 py-2 hover:bg-muted/50 transition text-sm rounded-md">
              ◀ {data[parseInt(id) - 1].localized_name}
            </button>}
          </form>

          <form action={NextAction}>
            {parseInt(id) <= 122 && 
            <button name='next' type="submit" className="bg-muted select-none px-3 py-2 hover:bg-muted/50 transition text-sm rounded-md">
              {data[parseInt(id) + 1].localized_name} ▶
            </button>}
          </form> */}

        </CardFooter>
      </Card>

      {/* <Image src={`https://cdn.dota2.com${hero.img}`} fill alt={hero.localized_name} className="ml-3 absolute left-0 top-0 inline z-[-1] !blur-3xl !opacity-15 rotate-180" /> */}
    </div>
  )
}

export default Page