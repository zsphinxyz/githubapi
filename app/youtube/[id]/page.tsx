
export default async function page({params}: {params: {id:string}}) {
  const API_ENDPOINT = 'https://youtube.googleapis.com/youtube/v3'
  const key = process.env.YOUTUBE_API_KEY

  async function getVideo(id:string) {
    const URL = `${API_ENDPOINT}/videos?part=player&id=${id}&key=${key}`
    const res = await fetch(URL)
    const data = await res.json()
    const video = data.items[0].player.embedHtml.replace(480, 480*2).replace(270, 270*2) as string
    return {__html: video}
  }

  const video = await getVideo(params.id)
  console.log(video)

    
  return (
    <div className="flex p-10 justify-center w-full h-dvh">

    {/* <iframe width="480" height="270" src="//www.youtube.com/embed/B0J27sf9N1Y" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe> */}
      <div className="" dangerouslySetInnerHTML={video} />
    </div>
  )
}
