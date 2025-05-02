import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import {Table, TableBody, TableHeader, TableCell, TableRow, TableHead, TableCaption} from "@/components/ui/table"
import Image from "next/image";

export default function UserData({data, repos}:any) {

  // console.log(data, repos)
  if(data.status == '404' && repos.status == '404') {
    return (
      <div className="text-red-500 text-center bg-red-400/20 text-xl font-bold">Not found</div>
    )
  }
  else if(data?.message?.includes("limit exceeded")) {
    return(
      <div className="text-red-500 bg-red-400/20 text-xl font-bold text-center py-5">API call limit Exceeded</div>
    )
  }

    return(
        <>
        <Card className="w-11/12 mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 mb-3">
            {
            data.length != 0 ? 
              <Image src={data.avatar_url} alt={data.name} width={70} height={70} className="inline" />
            :
              <div className="w-[70px] h-[70px] bg-border animate-pulse"></div>
          }
            <div className="flex flex-col gap-1">
              <p>{data.name} <span className="inline text-muted-foreground">(@{data.login})</span></p>
              <p className="opacity-50 text-sm">#{data.id} • {data.type} </p>
              <p className="text-muted-foreground text-sm">{data.bio} </p>
            </div>
          </CardTitle>

          <CardDescription>
            {data.followers} followers • {data.following} following • {data.public_repos} public repos
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Table>
            <TableCaption>Since {data.created_at && data.created_at.split('-')[0]} {data.location && ' • From '+data.location} • {data.blog && <a href={data.blog} target="_blank" className="underline">{data.blog}</a> } </TableCaption>
            <TableHeader>
              <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Repo Name</TableHead>
                  <TableHead>Repo URL & Description</TableHead>
                  <TableHead>Stars</TableHead>
                  <TableHead>Language</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
                {
                  repos ? repos?.map( (repo:any) => (
                    <TableRow key={repo.id}>
                      <TableCell>{repo.id}</TableCell>
                      <TableCell >{repo.name}</TableCell>
                      <TableCell >{<a href={repo.html_url} target="_blank">{repo.html_url}</a>} <br /> <span className="text-muted-foreground">{repo.description}</span></TableCell>
                      <TableCell >{repo.stargazers_count}⭐</TableCell>
                      <TableCell >{repo.language}</TableCell>
                  </TableRow>
                  )) : <TableRow><TableCell className="text-rose-500">No Data to Show❗</TableCell></TableRow>
                }
            </TableBody>
          </Table>
        </CardContent>

        <CardFooter>Github Api Data</CardFooter>
      </Card>
      </>
    )
}