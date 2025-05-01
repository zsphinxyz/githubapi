'use client'

import Image from "next/image";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";

export default function HeroTable({data}:any) {
    const [key, setKey] = useState('');
    const [sort, setSort] = useState('id')


    /*  
    Response from API:
        {
            "id": 1,
            "name": "npc_dota_hero_antimage",
            "name_loc": "Anti-Mage",
            "name_english_loc": "Anti-Mage",
            "primary_attr": 1,
            "complexity": 1
        }
    */


    function handleKeyPress(e:any) {
        const ignoreKeys = ['Control', 'Enter','Alt', 'Shift', 'CapsLock', 'Tab', 'Fn', 'FnLock', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'NumLock', 'ScrollLock', 'End', 'Home', 'PageDown', 'PageUp', 'Insert', 'Delete',
        'F1','F2','F3','F4','F5','F6','F7','F8','F9','F10','F11','F12','1','2','3','4','5','6','7','8','9','0',
        '/','`',';','\\', ']', '[',',','.','-','=', 'Meta'];

        if(ignoreKeys.includes(e.key)){
            return null;
        }
        else if (e.key === 'Escape') {
            setKey("")
            return null;
        }
        else if (e.key === 'Backspace') {
            setKey(key.slice(0,-1))
            return null;
        }
        if(e.key === ' ' && e.target == document.body) {
            e.preventDefault()  // Stop page from scrolling on space
            return false;
        }

        setKey( prev => prev + e.key)
    }


    useEffect( () => {

        window.addEventListener('keydown', handleKeyPress);
        const timeout = setTimeout(() => {
            setKey('')
        }, 3000)

        key.length > 15 && setKey('')

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
            clearTimeout(timeout)
        }

    }, [key])

    return (
        <div>
            <label htmlFor="attr">Sort By</label>
            <select name="attr" id="attr" onChange={(e) => setSort(e.target.value)} className="bg-muted text-muted-foreground rounded-md p-1 mb-2">
                <option value="id">Id</option>
                <option value="attr">Attributes</option>
            </select>
            <div className="flex gap-2 flex-wrap relative items-center justify-center">
                {
                    data.sort( (a:any, b:any) => {
                        if (sort === 'id') {
                            return a.id - b.id
                        } 
                        else if (sort === 'attr') {
                            return a.primary_attr - b.primary_attr
                        }
                        else {
                            return a.id - b.id
                        }
                    })
                    .map((data: any, i: number) => {
                        let name = data.name_english_loc as string
                        name = name.toLocaleLowerCase().split(' ').join('')
                        let isSearch = name.includes(key.toLowerCase().split(' '). join(''))
                        
                        const attrLink = "https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/icons/hero_"
                        const primary_attr =  data.primary_attr == 0 ? attrLink + "strength.png" 
                                            : data.primary_attr == 1 ? attrLink + "agility.png" 
                                            : data.primary_attr == 2 ? attrLink + "intelligence.png" 
                                            : attrLink + "universal.png"

                        return(
                        <Link key={i} href={`/dota/${data.id}`} className="" >
                            <Suspense fallback={<div className="w-[100px] h-[55px] bg-neutral-600 animate-ping">...</div>}>
                                <div 
                                    className="group basis-32 relative flex flex-col items-center justify-center self-center cursor-default border border-muted hover:border-muted-foreground transition"
                                >
                                    <Image id={name} priority src={`https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/${data.name.slice(14)}.png`} width={100} height={55} alt={data.name} className="w-auto h-auto min-w-24 min-h-14 select-none" style={{opacity: isSearch ? 1 : 0.2}} />
                                    <p className="text-xs text-muted-foreground py-1">{data.name_loc}</p>
                                    <Image src={primary_attr} width={20} height={20} alt="attr" className="absolute top-1 left-1 [filter:_drop-shadow(2px_2px_2px_black)]" />
                                </div>
                            </Suspense>
                        </Link>
                    )})
                }
            <div className="fixed inset-1/2 w-fit -translate-x-1/2 -translate-y-1/2 z-10 text-[1000%] cursor-none pointer-events-none">{key.toUpperCase()}</div>
            </div>
            {/* <div className="size-16 bg-white rounded-full absolute inset-0 -translate-1/2 -translate-y-1/2" style={{top: y, left: x}} /> */}
        </div>
    )
}
