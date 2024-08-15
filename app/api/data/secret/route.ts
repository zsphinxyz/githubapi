import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
  const reqHeaders = req.headers
  const key = reqHeaders.get('key')

  if(!key) {
    return(NextResponse.json({'error': 'key prop is required in request Headers'}, {status: 401, statusText: 'Unauthorized'}))
  }
  else if (key != 'zsphinx') {
    return(NextResponse.json({'error': 'Incorrect key.'}, {status: 403, statusText: 'Incorrect Key'}))
  }
  else if (key == 'zsphinx') {
    return(NextResponse.json({'secret': 'thequickbrownfoxjumpsoverthelazydog...'}, {status: 200, statusText: 'OK'}))
  }
  else {
    return(NextResponse.json({'error': 'Something went wrong'}, {status: 401, statusText: 'Error'}))
  }
}
