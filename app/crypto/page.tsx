import React, { Suspense } from 'react'
 
export default async function Page() {
    // https://docs.cryptapi.io/
    // const INFO_URL = 'https://api.cryptapi.io/info/?prices=1'
    // const COIN_INFO_URL = 'https://api.cryptapi.io/{ticker}/info/?prices=1'


    // https://docs.coincap.io/#89deffa0-ab03-4e0a-8d92-637a857d2c91
    // https://api.coincap.io/v2/assets

    const URL = 'https://cataas.com/cat'
    const res = await fetch(URL, {cache: 'no-store'})
    const imgBlob = await (await res.blob()).arrayBuffer()
    // console.log(_arrayBufferToBase64(imgBlob)) 

    function _arrayBufferToBase64( buffer:any ) { 
      var binary = '';
      var bytes = new Uint8Array( buffer );
      var len = bytes.byteLength;
      for (var i = 0; i < len; i++) {
        // if (i == 10) continue
         binary += String.fromCharCode( bytes[ i ] );
      }
      return btoa( binary );
    }
    


  return (
    <div>
      <img src={'data:image/jpeg;base64,' + _arrayBufferToBase64(imgBlob)} alt="Cat" />
      <img src={'data:image/jpeg;blob,'+imgBlob} alt="Cat" />

    </div>
  )
}
