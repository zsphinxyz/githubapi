import {NextRequest, NextResponse} from 'next/server'
import data from '@/lib/userData.json'

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const id = searchParams.get('id');

  if(id == null) {
    const rand = Math.round(Math.random()*1000)
    return NextResponse.json(data[rand], {status: 200, 'statusText': 'OK'})
  }
  else if(id == 'all') {
    return NextResponse.json(data, {status: 200, statusText: 'OK'})
  }

  else if(id.includes('-')) {
    try {
      let num1 = parseInt(id.split('-')[0])
      let num2 = parseInt(id.split('-')[1])
      if (num1 >= num2) {
        return NextResponse.json({'error': `Range must be start from minimun number to maximun number.`}, {status: 400, statusText: 'Invalid parameter'})
      } 
      else{
        return NextResponse.json(data.slice(num1, num2), {status: 200, statusText: 'OK'})
      }
    } catch (error) {
      return NextResponse.json({'error': `Invalid parameter ${id}.`}, {status: 400, statusText: 'Invalid parameter'})
    }

  }
  else if(id) {
    try {
      return NextResponse.json(data[parseInt(id!)-1])
    } catch (error) {
      return NextResponse.json({'error': `Invalid user Id ${id}.`}, {status: 400, statusText: 'Invalid user ID'})
    }
  }

}
