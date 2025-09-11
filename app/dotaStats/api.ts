import { APIENDPOINT } from "./const";
import { TLeague, TMatchDuration } from "./dota2Types";
import { get_matches_by_league, get_matches_duration, get_players_stats, get_teams_stats } from "./sql";

const URL = `${APIENDPOINT}/explorer?sql=`;

export async function getMatchesByLeague() {
  const url = `${URL}${get_matches_by_league}`;
  const res = await(fetch(url));
  const data = await res.json();
  return data;
}

export async function getPlayerStats(id:string) {
  const url = `${URL}${get_players_stats(id)}`
  const res = await fetch(url);
  const data = await res.json();
  return data;
}


export async function getTeamsStats(id:string) {
  const url = `${URL}${get_teams_stats(id)}`
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

export async function getMatchesDuration(id: string): Promise<TMatchDuration[]>{
  const url = `${URL}${get_matches_duration(id)}`
  const res = await fetch(url);
  const data = await res.json();
  return data.rows;
}