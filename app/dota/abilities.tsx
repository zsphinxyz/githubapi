"use client";

import Image from 'next/image'
import { useState } from 'react';

// https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/icons/innate_icon.png

export default function Abilities({ data }: { data: any }) {
  const [ability, setAbility] = useState(0);
  return (
    <div className="mb-5 h-full self-stretch w-full">
      <div className="">
        <div className="">
          <Image title='innate ability' src="https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/icons/innate_icon.png" alt="innate" width={25} height={25} className='inline mr-1'/>
          <span className="font-medium">{data.abilities.filter((skill:any)=>skill.ability_is_innate)[0].name_loc}</span>
        </div>
        <p className="text-xs text-muted-foreground pl-7 mb-2">
          {data.abilities.filter((skill:any)=>skill.ability_is_innate)[0].desc_loc}
        </p>
      </div>
      <div className="w-full h-full flex gap-1 flex-wrap items-center justify-center md:mb-auto md:mt-5 ">
        {
          // data.abilities.filter((skill: any) => !skill.ability_is_granted_by_shard && !skill.ability_is_granted_by_septer && !skill.ability_is_innate)
          data.abilities.filter((skill:any) => skill.ability_is_innate == false)
            .map((skill: any, idx: number) => {
              return (
                <div
                  role='button'
                  key={skill.id}
                  title={skill.name_loc} 
                  className="group flex flex-col flex-wrap items-center justify-center gap-1 max-w-24"
                  onClick={() => setAbility(skill.id)}
                >
                  <div className="relative">
                    <Image 
                      src={`https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/abilities/${skill.name}.png`} alt={skill.name} 
                      width={90} height={90} 
                      className={`select-none group-hover:scale-105 size-20 md:w-auto transition border-2 ${ability == skill.id || (ability == 0 && idx == 0) ? "border-white" : "border-transparent"} `} 
                    />
                    {
                      (skill.ability_is_granted_by_shard || skill.ability_has_shard) && 
                      <Image src="https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/stats/aghs_shard.png" alt="shard" width={50} height={50} className='absolute -bottom-2 right-0' />
                    }
                    {
                      (skill.ability_is_granted_by_scepter || skill.ability_has_scepter) && 
                      <Image src="https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/stats/aghs_scepter.png" alt="shard" width={50} height={50} className='absolute -bottom-2 right-0' />
                    }
                  </div>
                  <p className="text-xs text-muted-foreground py-1 truncate w-20 text-center">{skill.name_loc}</p>
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

        <div className="">

        </div>
        
      </div>

    </div>
  )
}
