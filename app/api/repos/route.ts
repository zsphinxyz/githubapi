import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams
    const q = searchParams.get('q')
    const res = await fetch(`https://api.github.com/users/${q}/repos`)
    const data = await res.json()
    return Response.json({data});
}