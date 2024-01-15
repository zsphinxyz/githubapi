import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams
    const q = searchParams.get('q')
    const res = await fetch(`https://api.github.com/users/${q}`, {
        headers: {
            'Content-Type': 'application/json',
            // 'access_token': process.env.GITHUB_AccessToken!
        }
    })
    const data = await res.json()
    return Response.json({data});
}