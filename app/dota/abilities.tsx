"use client";

import Image from 'next/image'
import { Suspense, useState } from 'react';

export default function Abilities({ data }: { data: any }) {
  const [ability, setAbility] = useState<number>(0);

  return (
    <div className="mb-5 h-full self-stretch w-full cursor-[inherit]">
      {/* <div className="">
        <div className="">
          <Image title='innate ability' src="https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/icons/innate_icon.png" alt="innate" width={25} height={25} className='inline mr-1' />
          <span className="font-medium">{data.abilities.filter((skill: any) => skill.ability_is_innate)[0].name_loc}</span>
        </div>
        <p className="text-xs text-muted-foreground pl-7 mb-2" dangerouslySetInnerHTML={{ __html: data.abilities.filter((skill: any) => skill.ability_is_innate)[0].desc_loc }} />
      </div> */}
      <div className="w-full h-full flex gap-1 flex-wrap items-center justify-center md:mb-auto md:mt-5 ">
        {
          data.abilities
            .map((skill: any, idx: number) => {
              return (
                <div
                  role='button'
                  key={skill.id}
                  title={skill.name_loc}
                  className="group flex flex-col flex-wrap items-center justify-center gap-1 max-w-24 cursor-dota-green"
                  onClick={() => setAbility(skill.id)}
                >
                  <div className="relative">
                    <Image
                      src={`https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/abilities/${skill.name}.png`} alt={skill.name}
                      width={90} height={90}
                      className={`select-none bg-slate-800 text-transparent group-hover:scale-105 size-20 md:w-auto max-w-[90px] text-xs transition border-2 ${ability == skill.id || (ability == 0 && idx == 0) ? "border-white" : "border-transparent"} `}
                    />
                    {
                      (skill.ability_is_granted_by_shard || skill.ability_has_shard) &&
                      <Image title='shard' src="https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/stats/aghs_shard_icon.png" alt="shard" width={25} height={25} className='absolute -bottom-4 right-0 [filter:drop-shadow(2px_2px_2px_#000)]' />
                    }
                    {
                      (skill.ability_is_granted_by_scepter || skill.ability_has_scepter) &&
                      <Image title='scepter' src="https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/stats/aghs_scepter_icon.png" alt="scepter" width={25} height={25} className='absolute -bottom-0 right-0 [filter:drop-shadow(2px_2px_2px_#000)]' />
                    }
                    {
                      skill.ability_is_innate &&
                      <Image title='innate ability' src="https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/icons/innate_icon.png" alt="innate" width={25} height={25} className='absolute -bottom-2 left-1/3 [filter:drop-shadow(2px_2px_2px_#000)] bg-slate-900 rounded-full' />                    
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
            !ability ?
              data.abilities[0].name_loc
              :
              data.abilities.filter((i: any) => i.id == ability)[0].name_loc
          }
        </h2>
        <p className="text-sm text-muted-foreground py-1"
          dangerouslySetInnerHTML={{
            __html: !ability ?
              data.abilities[0].desc_loc
              :
              data.abilities.filter((skill: any) => skill.id == ability)[0].desc_loc
          }}
        />

        <section className="space-y-2">
        {/* Note */}
        <p className="bg-yellow-300/20 p-1 text-sm empty:hidden"
          dangerouslySetInnerHTML={{
            __html: !ability ?
              data.abilities[0].notes_loc.join("<br />")
              :
              data.abilities.filter((skill: any) => skill.id == ability)[0]?.notes_loc.join("<br />")
          }}
        />

          {/* Scepter */}
        <div className="relative">
          <p className="bg-slate-500/10 border border-slate-500/50 px-1 py-3 text-sm empty:hidden peer"
            dangerouslySetInnerHTML={{
              __html: !ability ?
                data.abilities[0].scepter_loc
                :
                data.abilities.filter((skill: any) => skill.id == ability)[0]?.scepter_loc
            }}
            />
            <Image src="https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/stats/aghs_scepter_icon.png" alt="scepter" width={25} height={25} className='peer-empty:hidden absolute -top-2 -left-3 [filter:drop-shadow(2px_2px_2px_#000)]' />
        </div>

          {/* Shard */}
          <Suspense fallback="...">
            <div className=" relative">
              <p className="bg-slate-500/10 border border-slate-500/50 px-1 py-3 text-sm empty:hidden peer"
                dangerouslySetInnerHTML={{
                  __html: !ability ? 
                    data.abilities[0].shard_loc
                    :
                    data.abilities.filter((skill: any) => skill.id == ability)[0]?.shard_loc
                }}
              />
              <Image src="https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/stats/aghs_shard_icon.png" alt="shard" width={25} height={25} className='peer-empty:hidden absolute -top-1 -left-3 [filter:drop-shadow(2px_2px_2px_#000)]' />
            </div>
          </Suspense>
        </section>


      </div>

    </div>
  )
}
