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
import { Suspense } from "react"

function SetAttribute(value: String) {
  if (value == 'str') {
    return `Strength`
  } else if (value == 'agi') {
    return 'Agility'
  } else if (value == 'int') {
    return 'Intelligent'
  } else if (value == 'all') {
    return 'Universal'
  }
  else {
    return 'None'
  }
}

async function getStratzData() {
  const stratzAPI = await fetch('https://docs.stratz.com/api/v1/hero')
  const stratzData = await stratzAPI.json()
  return stratzData
}

function TagToString(str: string) {
  return str.replace(/<[^>]+>/g, '')
}


async function Page({ params }: { params: { id: string } }) {
  const res = await fetch('https://api.opendota.com/api/heroStats');
  const data = await res.json();
  const id = params.id;
  const hero = await data[id];
  const attribute = await hero.primary_attr;

  const stratzData = await getStratzData();
  const stratzId = parseInt(id) < 118 ? parseInt(id) + 1 : parseInt(id) + 2 // cause 118 is dummy api so I skipped it
  const stratzDataArray: any = Object.values(stratzData)

  const abilityArray = stratzDataArray[stratzId].abilities;
  let newAbilityArray: any[] = []
  let abilityDesc: any[] = []
  const abilityRes: any = await fetch('https://docs.stratz.com/api/v1/ability', { cache: "no-store" });
  const abilityData = await abilityRes.json()

  for (let i = 0; i < abilityArray.length; i++) {
    let currentAbilityIndex: string = abilityArray[i].abilityId
    let abilityInfo = abilityData[currentAbilityIndex].language

    newAbilityArray.push(abilityInfo.displayName)
    abilityDesc.push(abilityInfo.description[0])
  }


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
    <div className="w-3/4 mx-auto my-5 relative overflow-hidden cursor-default">
      <Card className="bg-transparent">

        <CardHeader>
          <Suspense fallback={'...'}>
            <CardTitle className="flex items-center gap-5 mb-2">
              <Image src={`https://cdn.dota2.com${hero.img}`} width={120} height={75} alt={hero.localized_name} />
              <div className="">
                <h1 className="text-xl">
                  {hero.localized_name}
                  <Image priority src={`https://cdn.dota2.com${hero.icon}`} width={20} height={20} alt={hero.localized_name} className="ml-1 mb-1 inline" />
                </h1>

                {
                  stratzDataArray[stratzId].aliases.length != 0 &&
                  <p className="w-full flex text-muted-foreground my-1 divide-x-2 divide-muted-foreground/50">
                    ({stratzDataArray[stratzId].aliases.map((i: string) => (
                      <span key={i} className="px-2">{i}</span>
                    ))})
                  </p>
                }


                <p className="text-muted-foreground select-none">{hero.attack_type} • {SetAttribute(attribute)}</p>
              </div>
            </CardTitle>
          </Suspense>

          <CardDescription>
            <Suspense fallback={'...'}>

              {
                hero.roles.map((i: string) => (
                  <span key={i} className="bg-muted hover:bg-muted/50 transition text-xs mx-1 py-1 px-2 rounded-full select-none cursor-default">{i}</span>
                ))
              }
              {
                <span className="text-muted-foreground mt-3 block">
                  {
                    TagToString(stratzDataArray[stratzId].language.hype)
                  }
                </span>
              }
            </Suspense>

          </CardDescription>
        </CardHeader>

        <CardContent>
          <Suspense fallback={'...'}>

            <div className="ring-muted ring-1 rounded-md p-3">
              <div className="text-foreground/80 text-sm text-pretty">
                <h1 className="font-bold text-xl mb-1">Bio</h1>
                {
                  TagToString(stratzDataArray[stratzId].language.bio)
                }
              </div>
            </div>

            <div className="p-3 ring-1 ring-muted my-3 rounded-lg">
              <h1 className="font-bold text-xl mb-1">Abilities</h1>
              {
                newAbilityArray.map((data: string, i: number) => (
                  <div key={i} className="pl-2">
                    <h1 className="font-medium mb-1">{data}</h1>
                    <p className=" pl-2 mb-5 relative">
                      <span className="text-sm text-muted-foreground">{abilityDesc[i]}</span>
                      <span className="w-[2px] h-full absolute inset-0 bg-muted-foreground/20"></span>
                    </p>
                  </div>
                ))
              }
            </div>
          </Suspense>
        </CardContent>

        <CardFooter className="flex justify-between">

          <form action={PrevAction}>
            {parseInt(id) > 0 && <button name='next' type="submit" className="bg-muted select-none px-3 py-2 hover:bg-muted/50 transition text-sm rounded-md">◀ {data[parseInt(id) - 1].localized_name}</button>}
          </form>

          <form action={NextAction}>
            {parseInt(id) <= 122 && <button name='next' type="submit" className="bg-muted select-none px-3 py-2 hover:bg-muted/50 transition text-sm rounded-md">{data[parseInt(id) + 1].localized_name} ▶</button>}
          </form>

        </CardFooter>
      </Card>

      <Image src={`https://cdn.dota2.com${hero.img}`} fill alt={hero.localized_name} className="ml-3 absolute left-0 top-0 inline z-[-1] !blur-3xl !opacity-15 rotate-180" />
    </div>
  )
}

export default Page