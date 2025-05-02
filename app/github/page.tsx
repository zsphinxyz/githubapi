
import { ModeToggle } from "@/components/Mode";
import UserData from "@/components/UserData";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { div } from "framer-motion/client";
import { redirect } from "next/navigation";


export default async function Home({searchParams}: {searchParams: { [key: string]: string | string[] | undefined }}) {
  const {q} = searchParams
  const searchName = q || 'github'
  // console.log(searchName)

  const res = await fetch(`https://api.github.com/users/${searchName}`)
  const data = await res.json()

  const res_repos = await fetch(`https://api.github.com/users/${searchName}/repos`)
  const repos = await res_repos.json()

  return (
    <div className=''>
      <div className="flex items-center justify-center">
        <form className="mx-auto my-3 flex w-full max-w-sm items-center space-x-2" action={ async (formData:FormData) => {
          "use server";
          const username = formData.get("username") as string;
          redirect("?q="+username)
        }}>
          <Input type="text" name='username' placeholder="github" defaultValue={searchName} />
          <Button type="submit" >Search</Button>
        </form>
        <div className="mr-auto block">
          <ModeToggle />
        </div>
      </div>

        <UserData data={data} repos={repos} />

     
    </div>
    
  )
}
