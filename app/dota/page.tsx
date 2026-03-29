import HeroTable from "./heroTable";
 
export default async function Dota() {
    const res = await fetch('https://www.dota2.com/datafeed/herolist?language=english', {cache: "force-cache"})
    const data = (await res.json()).result.data.heroes;
    return (
        <main className="max-w-7xl mx-auto dota-cursor">
            <section className="p-3 ">
                <HeroTable data={data} />
            </section>
        </main>
    )
}
