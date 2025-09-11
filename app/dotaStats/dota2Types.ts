export type TLeague = {
  leagueid: number,
  name: string
}

export type TPlayerStats = {
  account_id: number
  name: string
  team_id: number
  team_name: string
  count: number
  kills: number
  min_kills: number
  max_kills: number
  avg_kills: string
  deaths: number
  min_deaths : number
  max_deaths: number
  avg_deaths: string
  assists: number
  min_assists : number
  max_assists: number
  avg_assists: string
  hero_damage: number
  min_hero_damage : number
  max_hero_damage: number
  avg_hero_damage: string
  tower_damage: number
  min_tower_damage : number
  max_tower_damage: number
  avg_tower_damage: number
  last_hits: number
  min_last_hits : number
  max_last_hits: number
  avg_last_hits: number
  denies: number
  min_denies : number
  max_denies: number
  avg_denies: number
  avg_gold: number
  avg_gpm: number
  min_gpm: number
  max_gpm: number
  logo_url: string
}

export type TTeamStats = {
  team_id: number
  team_name: string
  logo: string
  matches: number
  duration: string
  min_duration: string
  max_duration: string
  avg_duration: string
  kills: number
  min_kills: number
  max_kills: number
  avg_kills: string
  deaths: number
  min_deaths: number
  max_deaths: number
  avg_deaths: string
  assists: number
  min_assists: number
  max_assists: number
  avg_assists: string
  first_bloods: number
  roshans: number
  avg_roshans: string
  stacks: number
  min_stacks: number
  max_stacks: number
  avg_stacks: string
  runes: number
  avg_runes: string
  towers: number
  avg_towers: string
}

export type TMatchDuration = {
  idx: number
  match_id: number
  duration_minutes: string
  radiant_team_id: number
  radiant_team_name: string
  dire_team_id: number
  dire_team_name: string
  radiant_win: boolean
}


export type TColumnToggle =  Array<Record<string, (keyof TPlayerStats)[]>>
