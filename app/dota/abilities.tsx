"use client";

import Image from 'next/image'
import { useState } from 'react';


export default function Abilities({ data }: { data: any }) {
  const [ability, setAbility] = useState(0);
  return (
    <div className="mb-5 h-full self-stretch ">
      <div className="w-full h-full flex gap-2 flex-wrap items-center justify-center md:mb-auto md:mt-5 ">
        {
          data.abilities.filter((skill: any) => !skill.ability_is_granted_by_shard && !skill.ability_is_granted_by_septer && !skill.ability_is_innate)
            .map((skill: any, idx: number) => {

              return (
                <div
                  role='button'
                  key={skill.id}
                  title={skill.name_loc} 
                  className="group flex flex-col flex-wrap items-center justify-center gap-2 max-w-24"
                  onClick={() => setAbility(skill.id)}
                >
                  <Image 
                    src={`https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/abilities/${skill.name}.png`} alt={skill.name} 
                    width={90} height={90} 
                    className={`select-none group-hover:scale-105 transition border-2 ${ability == skill.id || (ability == 0 && idx == 0) ? "border-white" : "border-transparent"} `} 
                  />
                  <p className="text-xs text-muted-foreground py-1 truncate w-24 text-center">{skill.name_loc}</p>
                </div>
              )
            })
        }
      </div>

      <div className="">
        <h2 className="font-bold text-lg ">
          {
            ability == 0 ? 
              data.abilities[0].name_loc
            :
              data.abilities.filter( (i:any) => i.id == ability)[0].name_loc
          }
        </h2>
        <p className="text-sm text-muted-foreground py-1">
          {
            ability == 0 ? 
              data.abilities[0].desc_loc 
            : 
              data.abilities.filter((skill: any) => skill.id == ability)[0].desc_loc
          }
        </p>
      </div>

    </div>
  )
}
