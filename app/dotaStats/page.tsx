"use client";

import { useQuery } from "@tanstack/react-query";
import { PlayerDataTable } from "./components/playerDataTable";
import { playerColumns } from "./components/playerColumn";
import { getMatchesByLeague, getMatchesDuration, getPlayerStats, getTeamsStats } from "./api";
import { TeamDataTable } from "./components/teamDataTable";
import { teamColumns } from "./components/teamColumn";
import { useState } from "react";
import { TLeague } from "./dota2Types";
import DurationChart from "./components/durationChart";


export default function page() {
  //background-image: url(&quot;https://cdn.steamstatic.com/apps/dota2/images/dota_react/backgrounds/greyfade.jpg&quot;);
  // 18324 TI2025
  const [leagueId, setLeagueId] = useState("18324");

  const { data: leagues, isSuccess: isLeagueSuccess } = useQuery({
    queryKey: ["leagues"],
    queryFn: getMatchesByLeague
  })

  const { data: playerStats, isSuccess, isPending } = useQuery({
    queryKey: ["playersStats", leagueId],
    queryFn: async () => await getPlayerStats(leagueId),

  });

  const { data: teamStats, isSuccess: isTeamSuccess, isPending: isTeamPending } = useQuery({
    queryKey: ["teamsStats", leagueId],
    queryFn: async () => await getTeamsStats(leagueId),
  })

  const { data: matchesDuration, isSuccess: isMatchesDuration, isPending: isMatchesDurationPending } = useQuery({
    queryKey: ["matches_duration", leagueId],
    queryFn: async () => await getMatchesDuration(leagueId)
  });


  return (
    <div className="w-full min-h-dvh bg-slate-900">

      {/* {JSON.stringify(leagues)} */}
      <div className="p-2">
        <select value={leagueId} onChange={(e) => setLeagueId(e.target.value)} className="bg-slate-700 p-1 max-w-full">
          {isLeagueSuccess &&
            leagues.rows.filter((league: TLeague) => !league.name.includes("Open")).map((league: TLeague) => (
              <option key={league.leagueid} value={league.leagueid}>{league.name.replace("The International", "TI")}</option>
            ))
          }
        </select>
      </div>

      {isLeagueSuccess && <h1 className="text-xl sm:text-2xl font-bold p-1 text-center text-white">
        {leagues.rows.filter((league: TLeague) => league.leagueid == Number(leagueId))[0]["name"]}
      </h1>}
      <div className="p-1 sm:p-2 lg:p-3">
        {
          isPending &&
          <div className="w-full rounded-md border border-white/30 max-w-[1660px] h-[460px] rows_loader animate-pulse mx-auto" />
        }
        {isSuccess &&
          <PlayerDataTable columns={playerColumns} data={playerStats.rows} />
        }
      </div>

      <div className="mt-10 p-1 sm:p-2 lg:p-3">
        {
          isTeamPending &&
          <div className="w-full rounded-md border border-white/30 max-w-[1660px] h-[460px] rows_loader animate-pulse mx-auto" />
        }
        {
          isTeamSuccess &&
          <TeamDataTable columns={teamColumns} data={teamStats.rows} />
        }
      </div>

      <div className="p-1 sm:p-2 lg:p-3">
        <h2 className="font-bold mt-10">Matches Duration</h2>
        <div className="w-full h-[500px] bg-slate-800 relative">
          {
            isMatchesDurationPending &&
            <div className="w-full h-[500px] bg-slate-700/10 animate-pulse" />
          }
          {
            isMatchesDuration &&
              <DurationChart data={matchesDuration} />
          }

          {
            isMatchesDuration &&
            <div className="absolute bottom-10 left-[80px] bg-slate-900/30 text-sm p-2 rounded-md">
              <p className="">
                <span className="inline-block min-w-28 text-white font-bold">Total Matches</span>
                <span className="">: {matchesDuration.length}</span>
              </p>
              <p className="">
                <span className="inline-block min-w-28 text-green-500 font-bold">■ Radiant Wins</span>
                <span>: {matchesDuration.filter( i => i.radiant_win).length} {" "} 
                  ({((100 * matchesDuration.filter( i => i.radiant_win).length) / matchesDuration.length).toFixed(2) }%)
                </span>
              </p>
              <p className="">
                <span className="inline-block min-w-28 text-red-400 font-bold">■ Dire Wins</span>
                <span>: {matchesDuration.filter( i => !i.radiant_win).length} {" "}
                  ({((100 * matchesDuration.filter( i => !i.radiant_win).length) / matchesDuration.length).toFixed(2) }%)
                </span>
              </p>
            </div>
          }
        </div>
      </div>

    </div>
  )
}
