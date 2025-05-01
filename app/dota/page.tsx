import HeroTable from "./heroTable";
 
async function getData() {
    // const data = await fetch('https://api.opendota.com/api/heroStats');
    
    // https://www.dota2.com/datafeed/herolist?language=english
}

export default async function Dota() {
    const res = await fetch('https://www.dota2.com/datafeed/herolist?language=english')
    const data = (await res.json()).result.data.heroes;
    return (
        <main className="max-w-7xl mx-auto">
            <section className="p-3 ">
                <HeroTable data={data} />
            </section>
        </main>
    )
}
