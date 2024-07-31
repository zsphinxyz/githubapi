import { timeAgo } from "@/lib/utils"
import { EyeOpenIcon } from "@radix-ui/react-icons"
import Image from "next/image"
import Link from "next/link"
import { Suspense } from "react"
import { BiComment } from "react-icons/bi"
import { TbThumbUp } from "react-icons/tb"
import {YouTubeEmbed} from '@next/third-parties/google'

export default async function Trending({ API_ENDPOINT, maxResults, apiKey }: { API_ENDPOINT: string, maxResults: number, apiKey: string }) {
  const URL = `${API_ENDPOINT}/videos?part=snippet,contentDetails,statistics&chart=mostPopular&regionCode=US&maxResults=${maxResults}&key=${apiKey}`
  const res = await fetch(URL)
  const data = await res.json()
  const items = await data.items

  return (
    <div className="flex flex-wrap justify-center gap-5 max-w-[1680px] mx-auto">
      {
        items.map((nData: any) => {
          // const nData = data[i]
          // console.log(nData)
          return (
            <Link href={`youtube/${nData.id}`} key={nData.id} className={`min-w-full sm:min-w-[360px] bg-gradient-to-b from-black/0 via-black/10 to-white/5 hover:to-teal-300/20 p-1 sm:rounded-2xl shadow-sm shadow-red-500 hover:shadow-md hover:shadow-green-300/50 `} style={{ width: nData.snippet.thumbnails.medium.width }} >
              <Suspense fallback={'🔘'}>
                <Image className="border border-white/30 sm:rounded-2xl mx-auto transition-all duration-300 delay-150 aspect-video object-cover"
                  src={nData.snippet.thumbnails.high.url}
                  alt={nData.snippet.title}
                  width={nData.snippet.thumbnails.high.width}
                  height={nData.snippet.thumbnails.high.height}
                />
              </Suspense>
              <div className="py-2 flex gap-1 items-start">
                <Suspense fallback={'🔘'}>
                  <Image className="rounded-full grow-0 object-cover max-w-10 aspect-square scale-90"
                    src={nData.snippet.thumbnails.default.url}
                    width={88}
                    height={88}
                    alt={'img'}
                  />
                </Suspense>
                <div className="w-full">
                  <p className="text-md font-medium truncate text-wrap" title={nData.snippet.title}>
                    {nData.snippet.title.replace('&#39;', "'").replace('&quot;', '"')}
                  </p>
                  <div className="text-sm flex text-white/50 w-full justify-between items-center">
                    <p className="">{nData.snippet.channelTitle}
                      {/* ({cnData.items.snippet.customUrl}) */}
                    </p>
                    <p className="inline-block text-xs text-right w-fit ">{timeAgo(new Date(nData.snippet.publishedAt))}</p>
                  </div>
                  <p className="text-xs flex gap-1 items-center text-white/50 justify-start mt-1">
                    <span><EyeOpenIcon className="inline text-white/40" /> {parseInt(nData.statistics.viewCount).toLocaleString()} <span className="text-white/30">●</span></span>
                    <span><TbThumbUp className="inline text-white/40" /> {parseInt(nData.statistics.likeCount).toLocaleString()} </span>
                    { nData.statistics.commentCount && <span><span className="text-white/30">●</span> <BiComment className="inline text-white/40" /> {parseInt(nData.statistics.commentCount).toLocaleString()}</span> }
                  </p>
                </div>
              </div>
            </Link>

            
          )
        })
      }

    </div>
  )
}
