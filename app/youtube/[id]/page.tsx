import { timeAgo } from "@/lib/utils"
import { EyeOpenIcon } from "@radix-ui/react-icons"
import Link from "next/link"
import { BiComment } from "react-icons/bi"
import { TbThumbUp } from "react-icons/tb"

export default async function page({params}: {params: {id:string}}) {
  const API_ENDPOINT = 'https://youtube.googleapis.com/youtube/v3'
  const key = process.env.YOUTUBE_API_KEY

  async function getVideo(id:string) {
    const URL = `${API_ENDPOINT}/videos?part=player,snippet,statistics&id=${id}&key=${key}`
    const res = await fetch(URL)
    const data = await res.json()
    return data
  }

  const data = await getVideo(params.id)

  const video = {__html: (await data.items[0].player.embedHtml.replace(480, 480*2).replace(270, 270*2) as string)}
  return (
    <section className=" p-5 w-full h-dvh">

    {/* <iframe width="480" height="270" src="//www.youtube.com/embed/B0J27sf9N1Y" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe> */}
      <div className="mx-auto flex items-center justify-center" dangerouslySetInnerHTML={video} />
      <div className="flex items-center justify-between py-1 px-10 gap-3 max-w-5xl mx-auto">

        <div className="flex gap-5 items-center text-sm">
          <span className="text-white/70"><EyeOpenIcon className="inline text-white/40 bg-black/10" /> {parseInt(data.items[0].statistics.viewCount).toLocaleString()} </span> 
          <span className="text-white/70"><TbThumbUp className="inline text-white/40 bg-black/10" /> {parseInt(data.items[0].statistics.likeCount).toLocaleString()} </span>
          {data.items[0].statistics.commentCount && <span className="text-white/70"><BiComment className="inline text-white/40 bg-black/10" /> {parseInt(data.items[0].statistics.commentCount).toLocaleString()}</span>}
        </div>

        <div className="text-sm text-white/70">
          {timeAgo(new Date(data.items[0].snippet.publishedAt))}
        </div>

      </div> 
        <h1 className="text-2xl font-medium py-3 text-center">{data.items[0].snippet.title}</h1>
        <p className="max-w-5xl mx-auto bg-white/5 block p-2 text-balance tracking-wide">
          {data.items[0].snippet.description}
          <br />
          {
            data.items[0].snippet?.tags?.map( (i:string) => (
              <span key={i} className="px-3 text-sm m-1 rounded-full py-1 bg-white/10 cursor-default hover:bg-white/5 inline-block transition">{i}</span>
            ))
          }
        </p>
    </section>
  )
}
