import { timeAgo } from "@/lib/utils"
import { EyeOpenIcon } from "@radix-ui/react-icons"
import { revalidatePath } from "next/cache"
import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"
import { Suspense } from "react"
import { BiComment, BiEnvelope } from "react-icons/bi"
import { TbThumbUp } from "react-icons/tb"
import Trending from "./trending"


export default async function page({searchParams}: {searchParams: {q:string, result:number}}) {
  const API_ENDPOINT = 'https://youtube.googleapis.com/youtube/v3'
  const key = process.env.YOUTUBE_API_KEY
  let maxResults = searchParams.result || 3


  async function getVideos(q:string) {
    const URL = `${API_ENDPOINT}/search?part=snippet&maxResults=${maxResults}&q=${q}&type=video&key=${key}`
    // console.log(URL)
    const res = await fetch(URL, {cache: "no-cache"})
    const data = await res.json()
    const items = data.items
    return items
  }

  let items = await getVideos(searchParams.q)

  async function handleSearch(formData: FormData) {
    'use server'
    const q = formData.get('q') as string;
    revalidatePath('/youtube')
    redirect(`?q=${q}`)
  }

  async function loadMore() {
    'use server'
    searchParams.result = 6
    redirect(`?result=`+ searchParams.result)
  }


  return (
    <section className="bg-green-200/20 p-5 min-h-[calc(100vh-56px)]">

      <form action={handleSearch} className="w-1/2 mx-auto border mb-3 outline-none border-none">
        <input type="search" name="q" id='q' defaultValue={searchParams.q} placeholder="Search..." className="w-full py-2 px-5 border border-muted bg-white/20 focus:border-muted-foreground outline-none rounded-full" />
        {searchParams.q ? 
          <p className="text-white/50 ml-5 my-1">Results for <span className="text-white/80">{searchParams.q}</span></p>
        :
          <p className="mt-5 font-medium text-xl text-center ">Trending</p>
      }
      </form>

      <div className="flex flex-wrap justify-center gap-5 max-w-[1680px] mx-auto">
        {
          !searchParams.q ? <Trending API_ENDPOINT={API_ENDPOINT} apiKey={key!} maxResults={maxResults}  />
          :
          items.map( async (item: any) => {

            const channelRes = await fetch(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${item.snippet.channelId}&key=${key}`, {method: 'GET', })
            const cData = await channelRes.json()
            return (
                <Link href={`youtube/${item.id.videoId}`} key={item.id.videoId} className={`min-w-full sm:min-w-[360px] bg-gradient-to-b from-black/0 via-black/10 to-white/5 hover:to-teal-300/20 p-1 sm:rounded-2xl shadow-sm shadow-red-500 hover:shadow-md hover:shadow-green-300/50 transition-all`} style={{ width: item.snippet.thumbnails.medium.width }} >
                  <Suspense fallback={'🔘'}>
                    <Image  className="border border-white/30 sm:rounded-2xl mx-auto transition-all duration-300 delay-150 aspect-video object-cover" 
                            src={item.snippet.thumbnails.high.url} 
                            alt={item.snippet.title} 
                            width={item.snippet.thumbnails.high.width} 
                            height={item.snippet.thumbnails.high.height} 
                    />
                  </Suspense>
                  <div className="py-2 flex gap-1 items-start">
                    <Suspense fallback={'🔘'}>
                      <Image  className="rounded-full grow-0 object-cover max-w-10 aspect-square scale-90" 
                              src={cData.items[0].snippet.thumbnails.default.url} 
                              width={88}
                              height={88} 
                              alt={'img'} 
                      />
                    </Suspense>
                    <div className="w-full">
                      <p className="text-md font-medium truncate text-wrap" title={item.snippet.title}>
                        {item.snippet.title.replace('&#39;', "'").replace('&quot;', '"')}
                      </p>
                      <div className="text-sm flex text-white/50 w-full justify-between items-center">
                        <p className="">{item.snippet.channelTitle} ({cData.items[0].snippet.customUrl})</p>
                        <p className="inline-block text-xs text-right w-fit ">{timeAgo(new Date(item.snippet.publishedAt))}</p>
                      </div>
                      <p className="text-xs flex gap-1 items-center text-white/50 justify-start mt-1">
                        <span><EyeOpenIcon className="inline text-white/40" /> {parseInt(cData.items[0].statistics.viewCount).toLocaleString()} <span className="text-white/30">●</span></span>
                        <span><TbThumbUp className="inline text-white/40" /> {parseInt(cData.items[0].statistics.likeCount).toLocaleString()} <span className="text-white/30">●</span></span>
                        {cData.items[0].statistics.commentCount && <span><BiComment className="inline text-white/40" /> {parseInt(cData.items[0].statistics.commentCount).toLocaleString()}</span>}
                      </p>
                    </div>
                  </div>
                </Link>
            )
          })
          
        }
        </div>
      
      {/* <Link href={`?q=${searchParams.q}&result=5`}>Load More</Link> */}
      <form action={loadMore}>
        <button type="submit">Load More...</button>
      </form>
      
    </section>
  )
}
