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

function SetAttribute(value: String) {
  if(value == 'str') {
    return `Strength`
  } else if (value == 'agi'){
    return 'Agility'
  } else if (value == 'int') {
    return 'Intelligent'
  } else if (value == 'all') {
    return 'Universal'
  }
  else{
    return 'None'
  }
}

async function getStratzData() {
  const stratzAPI = await fetch('https://docs.stratz.com/api/v1/hero')
  const stratzData = await stratzAPI.json()
  return stratzData
}


async function Page({params}: {params: {id: string}}) {
    const res = await fetch('https://api.opendota.com/api/heroStats');
    const data = await res.json();
    const id = params.id;
    const hero = await data[id];
    const attribute = await hero.primary_attr;

    const stratzData = await getStratzData();
    const stratzDataArray:any = Object.values(stratzData)

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
    <div className="w-3/4 mx-auto my-5 relative overflow-hidden">
      <Card className="bg-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-5 mb-2">
            <Image src={`https://cdn.dota2.com${hero.img}`} width={100} height={55} alt={hero.localized_name}/>
            <div className="">
              <h1 className="text-xl">{hero.localized_name}
                <Image src={`https://cdn.dota2.com${hero.icon}`} width={30} height={30} alt={hero.localized_name} className="ml-3 inline"/>
              </h1>
              <p className="text-muted-foreground">{hero.attack_type} • {SetAttribute(attribute)}</p>
            </div>
          </CardTitle>
          <CardDescription>
            {
              hero.roles.map((i:string) => (
                <span key={i} className="bg-muted text-xs mx-1 py-1 px-2 rounded-full select-none cursor-default">{i}</span>
              ))
            }
            {
              <span className="text-muted-foreground mt-3 block"
                dangerouslySetInnerHTML={{__html: stratzDataArray[parseInt(id)+1].language.hype }}
              />
            }

          </CardDescription>
        </CardHeader>

        <CardContent>

          <div className="ring-muted ring-1 rounded-md p-3">
              <h1 className="text-lg font-bold ">Bio</h1>
              <p className="text-foreground/80 text-sm text-pretty"
                dangerouslySetInnerHTML={{__html:stratzDataArray[parseInt(id)+1].language.bio}}
              />

          </div>
        </CardContent>

        <CardFooter className="flex justify-between">

          <form action={PrevAction}>
            {parseInt(id) > 0 && <button name='next' type="submit" className="bg-muted px-3 py-1 text-sm rounded-md">◀ {data[parseInt(id)-1].localized_name}</button>}
          </form>

          <form action={NextAction}>
            {parseInt(id) <= 122 && <button name='next' type="submit" className="bg-muted px-3 py-1 text-sm rounded-md">{data[parseInt(id)+1].localized_name} ▶</button>}
          </form>

        </CardFooter>
      </Card>

      <Image src={`https://cdn.dota2.com${hero.img}`} fill alt={hero.localized_name} className="ml-3 absolute left-0 top-0 inline z-[-1] blur-3xl opacity-15 rotate-180"/>
    </div>
  )
}

export default Page