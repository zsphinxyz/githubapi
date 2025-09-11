import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TMatchDuration } from '../dota2Types';


const DurationTooltip = ({ active, payload }: any) => {
  if (!active || !payload || payload.length === 0) return null;
  const p = payload[0].payload as TMatchDuration;
  return (
    <div className='bg-slate-900/90 text-slate-200 p-2 rounded-lg shadow-sm text-sm min-w-36'>
      <div className='mb-1 leading-snug'>
        <p className={`text-green-500 font-medium ${p.radiant_win ? "opacity-100" : "opacity-75"}`}> {p.radiant_team_name} {p.radiant_win && "👑"} </p>
        <p className={`text-red-400 font-medium ${!p.radiant_win ? "opacity-100" : "opacity-75"}`}> {p.dire_team_name} {!p.radiant_win && "👑"}</p>
      </div>
      <div className='opacity-75'><span>{p.duration_minutes} mins</span></div>
    </div>
  )
}

export default function DurationChart({ data }: { data: TMatchDuration[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid vertical={false} stroke='#3d516e' />
        <XAxis dataKey="idx" type='number' tick={{ fill: '#aaaaaa' }} />
        <YAxis dataKey="duration_minutes" name='duration' unit='min' tick={{ fill: "#aaaaaa" }} />
        <Tooltip
          content={<DurationTooltip />}
          cursor={{stroke: "#3d516e" }}
          animationDuration={0}
        />
        {/* <Legend /> */}
        <Line type="linear" dataKey="duration_minutes" stroke="#aaaacc" />
        {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
      </LineChart>
    </ResponsiveContainer>
  )
}
