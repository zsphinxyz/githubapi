'use client'

import Image from "next/image";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";

export default function HeroTable({data}:any) {
    const [key, setKey] = useState('')
    // const [x, setX] = useState(0)
    // const [y, setY] = useState(0)

    // console.log(x,y)

    function handleKeyPress(e:any) {
        const ignoreKeys = ['Control', 'Enter','Alt', 'Shift', 'CapsLock', 'Tab', 'Fn', 'FnLock', 'NumLock', 'ScrollLock', 'End', 'Home', 'PageDown', 'PageUp', 'Insert', 'Delete', 
        'F1','F2','F3','F4','F5','F6','F7','F8','F9','F10','F11','F12','1','2','3','4','5','6','7','8','9','0',
        '/','`',';','\\', ']', '[',',','.','-','='];

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
        setKey( prev => prev + e.key)
    }

    // function handlePointerPosition(e:any) {
    //     setX(e.clientX)
    //     setY(e.clientY)
    // }
    
    useEffect( () => {

        window.addEventListener('keyup', handleKeyPress);
        const timeout = setTimeout(() => {
            setKey('')
        }, 3000)

        key.length > 15 && setKey('')

        // window.addEventListener('mouseover', handlePointerPosition)

        return () => {
            window.removeEventListener('keyup', handleKeyPress);
            // window.removeEventListener('mouseover', handlePointerPosition);
            clearTimeout(timeout)
        }

    }, [key])


    return (
        <div>
            <div className="flex gap-2 flex-wrap relative">
                {
                    data.map((data: any, i: number) => {
                        let name = data.localized_name as string
                        name = name.toLocaleLowerCase().split(' ').join('')
                        let isSearch = name.includes(key.toLowerCase())

                        return(
                        <Link key={i} href={`/dota/${i}`} className="basis-32 flex flex-col items-center justify-center self-center cursor-default border border-muted hover:border-muted-foreground" >
                            <Suspense fallback={<div>...</div>}>
                                <Image id={name} priority src={`https://cdn.dota2.com${data.img}`} width={100} height={55} alt={data.localized_name} className="w-auto h-auto" style={{opacity: isSearch ? 1 : 0.2}} />
                                <p className="text-xs text-muted-foreground py-1">{data.localized_name}</p>
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
