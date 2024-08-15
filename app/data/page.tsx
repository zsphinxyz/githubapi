export default function page() {
  return (
    <main className="bg-slate-900 w-full text-slate-200 min-h-dvh py-5">
      <section className="max-w-screen-lg mx-auto px-2">

        <div className="">
          <h1 className="header">Random Data API</h1>
          <h2 className="sub">API Endpoint</h2>
          <p className="code">https://zapiz.vercel.app/api/data</p>
        </div>

        <div className="my-10">
          <h2 className="sub">Random user data <span className="sp">/data</span></h2>
          <p className="code">https://zapiz.vercel.app/api/data</p>
          <p className="desc"> Respond random user data on every requests.</p>
        </div>

        <div className="my-10">
          <h2 className="sub">Specific Id <span className="sp">/data?id=[number]</span></h2>
          <p className="code">https://zapiz.vercel.app/api/data?id=10</p>
          <p className="desc"> Respond the data of the user that has id of 10 (id must be between 1-1000)</p>
        </div>

        <div className="my-10">
          <h2 className="sub">Range <span className="sp">/data?id=[num1-num2]</span></h2>
          <p className="code">https://zapiz.vercel.app/api/data?id=1-10</p>
          <p className="desc"> Respond all the users between the id of 1 to 10 (seperate minimum id and maximun id with - hyphen)</p>
        </div>

        <div className="my-10">
          <h2 className="sub">All Users <span className="sp">/data?id=all</span></h2>
          <p className="code">https://zapiz.vercel.app/api/data?id=all</p>
          <p className="desc"> Respond all the 1000 users.</p>
        </div>

        <div className="my-10">
          <h2 className="sub">Admin Data <span className="sp">/data?id=admin&key=[key]</span></h2>
          <p className="code">https://zapiz.vercel.app/api/data?id=admin&key=[yourKeyHere]</p>
          <p className="desc"> Respond the data of admin. Need key to call this request.</p>
        </div>

        <hr />

        <div className="my-10">
          <h2 className="sub">Secret <span className="sp">/data/secret</span></h2>
          <p className="code">https://zapiz.vercel.app/api/data/secret</p>
          <p className="desc">
            Respond the secret sentence. You need to provide <b>key</b> to request headers. <br />
            Headers - <span className="font-mono">{`{'key': 'yourKeyHere'}`}</span>
          </p>
        </div>

      </section>

    </main>
  )
}
