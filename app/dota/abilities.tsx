"use client";

import Image from 'next/image'
import { useState } from 'react';

export default function Abilities({ data }: { data: any }) {
  const [ability, setAbility] = useState<number>(0);

  function replacePlaceholder(text: string) {
    return text.replaceAll(/%[\w]+%/gm, "{...}").replaceAll(/%%/gm, "%");
  }

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
        <label htmlFor='dummy' className="block mr-4 mb-auto peer relative [anchor-name:--talent]">
          <Image src="/assets/dota/talents.svg" width={73} height={77} alt='talent tree' className='block bg-slate-950 rounded-full p-1 text-transparent' />
        </label>
        <input type="checkbox" name="dummy" id="dummy" className='peer/test appearance-none hidden' />
        <div className="py-3 fixed [position-anchor:--talent] z-10 [position-area:top] -bottom-1 opacity-0 hidden not-sm:peer-checked/test:block not-sm:peer-checked/test:opacity-100 peer-hover:opacity-100 peer-hover:block hover:block hover:opacity-100 transition-opacity">
          <div className="bg-linear-150 from-neutral-600 to-neutral-800 p-2 w-full max-w-2xl z-10 text-xs grid grid-cols-2 gap-2 place-content-center ">
          <p className="text-lg text-center col-span-2 font-extrabold">Talent Tree</p>
            {
              (data.talents as Array<string>).map((_: any, idx: number) => (
                <div className="relative flex bg-neutral-900">
                  <p className=" relative px-3 py-1 align-middle text-center text-foreground min-h-8 overflow-hidden w-full text-ellipsis flex justify-center items-center" key={data.talents[7-idx].id}>
                    {/* {talent.name_loc} */}
                    {data.talents[7-idx].name_loc.replace(/{[\w|\S| \d]+}/, "#")}
                  </p>
                    { idx % 2 == 0 &&
                    (
                      <span className="z-10 size-8 bg-neutral-800 border-4 border-neutral-700 absolute rounded-full -right-5 -top-px grid place-content-center text-amber-400 [text-shadow:0_0_5px_gold]">
                        {(5 - (idx/2)) * 5}
                      </span>
                    )
                    }
                </div>
              ))
            }
          </div>
        </div>
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
                      className={`select-none bg-slate-800 text-transparent group-hover:scale-105 size-20 md:w-auto max-w-22.5 text-xs transition border-2 ${ability == skill.id || (ability == 0 && idx == 0) ? "border-white" : "border-transparent"} `}
                    />
                    {
                      (skill.ability_is_granted_by_shard || skill.ability_has_shard) && 
                      <img title='shard' src="/assets/dota/aghs_shard_icon.png" alt="shard" width={25} height={25} className='absolute -bottom-4 right-0 filter-[drop-shadow(2px_2px_2px_#000)]' />
                    }
                    {
                      (skill.ability_is_granted_by_scepter || skill.ability_has_scepter) && 
                      <img title='scepter' src="/assets/dota/aghs_scepter_icon.png" alt="scepter" width={25} height={25} className='absolute bottom-0 right-0 filter-[drop-shadow(2px_2px_2px_#000)]' />
                    }
                    {
                      skill.ability_is_innate &&
                      <img title='innate ability' src="https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/icons/innate_icon.png" alt="innate" width={25} height={25} className=' absolute -bottom-2 left-1/2 -translate-x-1/2 filter-[drop-shadow(2px_2px_2px_#000)] bg-slate-900 rounded-full' />                    
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
              replacePlaceholder(data.abilities[0].desc_loc)
              :
              replacePlaceholder(data.abilities.filter((skill: any) => skill.id == ability)[0].desc_loc)
          }}
        />

        <section className="space-y-2">
        {/* Note */}
        <p className="bg-yellow-300/20 p-1 text-sm empty:hidden"
          dangerouslySetInnerHTML={{
            __html: !ability ?
              replacePlaceholder(data.abilities[0].notes_loc.join("<br />"))
              :
              replacePlaceholder(data.abilities.filter((skill: any) => skill.id == ability)[0]?.notes_loc.join("<br />"))
          }}
        />

          {/* Scepter */}
        <div className="relative">
          <p className="bg-slate-500/10 border border-slate-500/50 px-1 py-3 text-sm empty:hidden peer"
            dangerouslySetInnerHTML={{
              __html: !ability ?
                replacePlaceholder(data.abilities[0].scepter_loc)
                :
                replacePlaceholder(data.abilities.filter((skill: any) => skill.id == ability)[0]?.scepter_loc)
            }}
            />
            <img src="/assets/dota/aghs_scepter_icon.png" alt="scepter" width={25} height={25} className='peer-empty:hidden absolute -top-2 -left-3 filter-[drop-shadow(2px_2px_2px_#000)]' />
        </div>

          {/* Shard */}
            <div className=" relative">
              <p className="bg-slate-500/10 border border-slate-500/50 px-1 py-3 text-sm empty:hidden peer"
                dangerouslySetInnerHTML={{
                  __html: !ability ? 
                    replacePlaceholder(data.abilities[0].shard_loc)
                    :
                    replacePlaceholder(data.abilities.filter((skill: any) => skill.id == ability)[0]?.shard_loc)
                }}
              />
              <img src="/assets/dota/aghs_shard_icon.png" alt="shard" width={25} height={25} className='peer-empty:hidden absolute -top-1 -left-3 filter-[drop-shadow(2px_2px_2px_#000)]' />
            </div>
        </section>


      </div>

    </div>
  )
}
