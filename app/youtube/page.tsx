import { timeAgo } from "@/lib/utils"
import { EyeOpenIcon } from "@radix-ui/react-icons"
import { revalidatePath } from "next/cache"
import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"
import { Suspense } from "react"
import { BiComment, BiEnvelope } from "react-icons/bi"
import { TbThumbUp } from "react-icons/tb"


export default async function page({searchParams}: {searchParams: {q:string}}) {
  const API_ENDPOINT = 'https://youtube.googleapis.com/youtube/v3'
  const key = process.env.YOUTUBE_API_KEY
  const maxResults = 12


  async function getVideos(q:string) {
      const URL = `${API_ENDPOINT}/search?part=snippet&maxResults=${maxResults}&q=${q}&type=video&key=${key}`
      // console.log(URL)
      const res = await fetch(URL)
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

  return (
    <section className="bg-neutral-900 p-5">
      <form action={handleSearch} className="w-1/2 mx-auto border mb-3 outline-none border-none">
        <input type="search" name="q" id='q' defaultValue={searchParams.q} placeholder="Search..." className="w-full py-2 px-5 border border-muted focus:border-muted-foreground outline-none rounded-full" />
        {searchParams.q && <p className="text-white/50 ml-5 my-1">Results for <span className="text-white/80">{searchParams.q}</span></p>}
      </form>

      <div className="flex flex-wrap justify-center gap-5 max-w-[1680px] mx-auto">
        {
          items ? items.map( async (item: any) => {

            const channelRes = await fetch(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet&id=${item.snippet.channelId}&key=${key}`, {method: 'GET', })
            const cData = await channelRes.json()

            const videoRes = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=statistics&id=${item.id.videoId}&key=${key}`)
            const vData = await videoRes.json()

            return (
                <Link href={`youtube/${vData.items[0].id}`} key={item.id.videoId} className={`min-w-full sm:min-w-[360px] bg-gradient-to-b from-black/0 via-black/10 to-white/5 hover:to-teal-300/20 p-1 sm:rounded-2xl shadow-sm shadow-red-500 hover:shadow-md hover:shadow-green-300/50 `} style={{ width: item.snippet.thumbnails.medium.width }} >
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
                        <EyeOpenIcon className="inline text-white/40" /> {parseInt(vData.items[0].statistics.viewCount).toLocaleString()} <span className="text-white/30">●</span>
                        <TbThumbUp className="inline text-white/40" /> {parseInt(vData.items[0].statistics.likeCount).toLocaleString()} <span className="text-white/30">●</span>
                        <BiComment className="inline text-white/40" /> {parseInt(vData.items[0].statistics.commentCount).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </Link>
            )
          })
          :
          <p className="text-red-400 bg-red-400/50 text-xl p-1 w-full mx-auto text-center">Error
            <span className="">
              you exceed the limit or you are offline
            </span>
          </p>
        }
      </div>
    </section>
  )
}
