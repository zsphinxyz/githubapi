import HeroTable from "./heroTable";

async function getData() {
    const data = await fetch('https://api.opendota.com/api/heroStats');
    if (!data.ok) throw new Error('Failed to Fetch Data')
    return data.json()
}

async function Dota() {
    const data = await getData();
    return (
        <main className="max-w-7xl mx-auto">
            <section className="p-3 ">
                <HeroTable data={data} />
            </section>

        </main>
    )
}

export default Dota