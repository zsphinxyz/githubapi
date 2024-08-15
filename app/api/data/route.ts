import {NextRequest, NextResponse} from 'next/server'
import data from '@/lib/userData.json'

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const id = searchParams.get('id');
  const key = searchParams.get('key');
  const reqHeaders = req.headers

  const admin = {
    "email": "z@mail.com",
    "ip_address": "235.202.41.52",
    "pwd": "a1b2c3d4%556",
    "pwdHash": "$2a$04$MltbTKopBgJ5ngXhv6.T2uLRmQz1MSh2Fc.qwhUxJFroDeeUtCuZq",
    "location": "48098 Claremont Pass",
    "phone": "173-924-8847",
    "hash": "d663f65e691179d98bb1665bcc5dc24f"
  }
  const headers = {
    name: 'EarthShaker',
    wife: 'Lina',
    cousin: 'Rubik',
    location: 'Dota_2'

  }


  if(id =='admin') {
    if (key == null) {
      return NextResponse.json({'error': 'API key is required. (key param required)'}, {status: 401, statusText: 'required API Key'})
    }
    else if(key == 'zsphinx') {
      return NextResponse.json(admin, {status: 200, statusText: 'OK', headers})
    }
    else {
      return NextResponse.json({'error': 'API key is incorrect.'}, {status: 401, statusText: 'incorrect API Key'})
    }
  }

  if(id == null) {
    const rand = Math.round(Math.random()*1000)
    return NextResponse.json(data[rand], {status: 200, 'statusText': 'OK', headers})
  }

  else if(id == 'all') {
    return NextResponse.json(data, {status: 200, statusText: 'OK', headers})
  }

  else if(id.includes('-')) {
    try {
      let num1 = parseInt(id.split('-')[0]) -1
      let num2 = parseInt(id.split('-')[1])
      if (num1 >= num2) {
        return NextResponse.json({'error': `Range must be start from minimun number to maximun number.`}, {status: 400, statusText: 'Invalid parameter'})
      } 
      else{
        return NextResponse.json(data.slice(num1, num2), {status: 200, statusText: 'OK', headers})
      }
    } catch (error) {
      return NextResponse.json({'error': `Invalid parameter ${id}.`}, {status: 400, statusText: 'Invalid parameter'})
    }
  }

  else if(id) {
    try {
      return NextResponse.json(data[parseInt(id!)-1], {status: 200, statusText: 'OK', headers})
    } catch (error) {
      return NextResponse.json({'error': `Invalid user Id ${id}.`}, {status: 400, statusText: 'Invalid user ID'})
    }
  }


}
