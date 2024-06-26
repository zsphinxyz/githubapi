import { revalidatePath } from "next/cache"
import Image from "next/image"
import { redirect } from "next/navigation"
import { Suspense } from "react"


export default async function page({searchParams}: {searchParams: {q:string}}) {
  const API_ENDPOINT = 'https://youtube.googleapis.com/youtube/v3'
  const key = process.env.YOUTUBE_API_KEY
  const maxResults = 12


  async function getVideos(q:string) {
    const URL = `${API_ENDPOINT}/search?part=snippet&maxResults=${maxResults}&q=${q}&type=video&key=${key}`
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

  // console.log('1', items)

  return (
    <section className="bg-neutral-900 pt-5">
      <form action={handleSearch} className="w-1/2 mx-auto border mb-3 outline-none border-none">
        <input type="search" name="q" id='q' defaultValue={searchParams.q} placeholder="Search..." className="w-full py-2 px-5 border border-muted focus:border-muted-foreground outline-none rounded-full" />
        <p className="text-white/50 ml-5 my-1">Results for <span className="text-white/80">{searchParams.q}</span></p>
      </form>

      <div className="flex flex-wrap justify-center gap-5">
        {
          items.map( async (item: any) => {

            const channelRes = await fetch(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet&id=${item.snippet.channelId}&key=${key}`)
            const cData = await channelRes.json()

            const videoRes = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=statistics&id=${item.id.videoId}&key=${key}`)
            const vData = await videoRes.json()


            return (
                <div key={item.id.videoId} className={``} style={{ maxWidth: item.snippet.thumbnails.medium.width }} >
                  <Image  className="border border-white/30 rounded-2xl hover:rounded-none transition-all duration-300 delay-150 aspect-video object-cover" 
                          src={item.snippet.thumbnails.high.url} 
                          alt={item.snippet.title} 
                          width={item.snippet.thumbnails.high.width} 
                          height={item.snippet.thumbnails.high.height} 
                  />
                  <div className="py-2 flex gap-1 items-start">
                    <Image  className="rounded-full grow-0 object-cover max-w-10 aspect-square scale-90" 
                            src={cData.items[0].snippet.thumbnails.default.url} 
                            width={88} 
                            height={88} 
                            alt={'img'} 
                    />
                    <div className="">
                      <p className="text-md font-medium truncate text-wrap" title={item.snippet.title}>{item.snippet.title.replace('&#39;', "'")} </p>
                      <p className="text-sm text-white/50">{item.snippet.channelTitle} ({cData.items[0].snippet.customUrl})</p>
                      <p className="text-xs">
                        {vData.items[0].statistics.viewCount} |
                        {vData.items[0].statistics.likeCount} |
                        {vData.items[0].statistics.commentCount}
                      </p>
                    </div>
                  </div>
                </div>
            )
          })
        }
      </div>
    </section>
  )
}
