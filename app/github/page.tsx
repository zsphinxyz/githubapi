'use client'
import { ModeToggle } from "@/components/Mode";
import UserData from "@/components/UserData";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"


export default function Home() {

  const [data, setData] = useState<any>([])
  const [repos, setRepos] = useState<any>([])
  const [input, setInput] = useState('')    // user input dynamic
  const [search, setSearch] = useState('github')  // user input

  async function getAll() {
    const getGithubData = async (user: string) => {
      try {
        let res = await fetch(`https://api.github.com/users/${user}`)
        if (!res.ok) {
          return ({})
        }
        return (
          res.json()
        )
      } catch (error) {
        console.log(error)
      }

    }

    const getGithubRepo = async (user: string) => {
      try {
        const res = await fetch(`https://api.githb.com/users/${user}/repos`)
        if (!res.ok) {
          return ({})
        }
        return (
          res.json()
        )
      } catch (error) {
        console.log(error)
      }

    }  
    
    const apiData = await getGithubData(search);
    const apiRepos = await getGithubRepo(search);

    setData(apiData)
    setRepos(apiRepos)
  }

  useEffect(()=>{
    if (search != '') {
      try {
        getAll();
      } catch (error) {
        setData(null)
        setRepos([])
      }

    }
    console.log(data, repos)
  },[search])

  // console.log(data, repos)
  return (
    <div className=''>
      <div className="mx-auto my-3 flex w-full max-w-sm items-center space-x-2">
        <Input type="text" onChange={(e)=>setInput(e.target.value)} placeholder="Search by Github User Name" />
        <Button type="submit" onClick={() => setSearch(input)}>Search</Button>
        <div className="mr-auto block">
          <ModeToggle />
        </div>
      </div>
          <UserData data={data} repos={repos} />
     
    </div>
    
  )
}
