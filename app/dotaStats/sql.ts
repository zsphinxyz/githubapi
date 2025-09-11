export const get_matches_by_league = encodeURI(`
-- TI 2025
SELECT leagueid, name 
FROM leagues 
WHERE name ILIKE '%International 2025%';
`);

export const get_players_stats = (leagueId: string) => encodeURI(`
SELECT
  notable_players.account_id,
  notable_players.name,
  notable_players.team_id,
  notable_players.team_name,
  count(distinct matches.match_id) count,
  SUM(kills) "kills",
  MIN(kills) "min_kills",
  MAX(kills) "max_kills",
  ROUND(AVG(kills), 2) "avg_kills",
  SUM(assists) "assists",
  MIN(assists) "min_assists",
  MAX(assists) "max_assists",
  ROUND(AVG(assists), 2) "avg_assists",
  SUM(deaths) "deaths",
  MIN(deaths) "min_deaths",
  MAX(deaths) "max_deaths",
  ROUND(AVG(deaths), 2) "avg_deaths",
  SUM(hero_damage) "hero_damage",
  MIN(hero_damage) "min_hero_damage",
  MAX(hero_damage) "max_hero_damage",
  ROUND(AVG(hero_damage), 2) "avg_hero_damage",
  SUM(tower_damage) "tower_damage",
  MIN(tower_damage) "min_tower_damage",
  MAX(tower_damage) "max_tower_damage",
  ROUND(AVG(tower_damage), 2) "avg_tower_damage",
  SUM(last_hits) "last_hits",
  MIN(last_hits) "min_last_hits",
  MAX(last_hits) "max_last_hits",
  ROUND(AVG(last_hits), 2) "avg_last_hits",
  SUM(denies) "denies",
  MIN(denies) "min_denies",
  MAX(denies) "max_denies",
  ROUND(AVG(denies), 2) "avg_denies",
  ROUND(AVG(gold), 2) "avg_gold",
  ROUND(AVG(gold_per_min), 2) "avg_gpm",
  ROUND(MIN(gold_per_min), 2) "min_gpm",
  ROUND(MAX(gold_per_min), 2) "max_gpm",
  teams.logo_url
FROM matches
JOIN match_patch using(match_id)
JOIN leagues using(leagueid)
JOIN player_matches using(match_id)
JOIN heroes on heroes.id = player_matches.hero_id
LEFT JOIN notable_players ON notable_players.account_id = player_matches.account_id
LEFT JOIN teams using(team_id)
WHERE TRUE
AND leagueId = ${leagueId}
AND kills IS NOT NULL AND deaths IS NOT NULL AND hero_damage IS NOT NULL
GROUP BY notable_players.name, notable_players.team_name, notable_players.account_id, notable_players.team_id, teams.logo_url
HAVING count(distinct matches.match_id) >= 5
ORDER BY "avg_hero_damage" DESC
`);


export const get_teams_stats = (leagueId: string) => encodeURI(`
  WITH team_match_stats AS (
    SELECT
    m.match_id,
    m.radiant_team_id AS team_id,
    MAX(m.duration) AS duration,
    SUM(CASE WHEN pm.player_slot < 128 THEN pm.kills ELSE 0 END) AS kills,
    SUM(CASE WHEN pm.player_slot < 128 THEN pm.deaths ELSE 0 END) AS deaths,
    SUM(CASE WHEN pm.player_slot < 128 THEN pm.assists ELSE 0 END) AS assists,
    MAX(CASE WHEN pm.player_slot < 128 THEN pm.firstblood_claimed ELSE 0 END) AS first_blood,
    SUM(CASE WHEN pm.player_slot < 128 THEN COALESCE(pm.obs_placed,0) ELSE 0 END) AS obs,
    SUM(CASE WHEN pm.player_slot < 128 THEN COALESCE(pm.sen_placed,0) ELSE 0 END) AS sentry,
    SUM(CASE WHEN pm.player_slot < 128 THEN COALESCE(pm.roshans_killed,0) ELSE 0 END) AS roshans,
    SUM(CASE WHEN pm.player_slot < 128 THEN COALESCE(pm.camps_stacked,0) ELSE 0 END) AS stacks,
    SUM(CASE WHEN pm.player_slot < 128 THEN COALESCE(pm.rune_pickups,0) ELSE 0 END) AS runes,
    SUM(CASE WHEN pm.player_slot < 128 THEN COALESCE(pm.towers_killed,0) ELSE 0 END) AS towers
    FROM matches m
    JOIN player_matches pm ON pm.match_id = m.match_id
  WHERE m.leagueid = ${leagueId}
  GROUP BY m.match_id, m.radiant_team_id
  
  UNION ALL
  
  SELECT
  m.match_id,
    m.dire_team_id AS team_id,
    MAX(m.duration) AS duration,
    SUM(CASE WHEN pm.player_slot >= 128 THEN pm.kills ELSE 0 END) AS kills,
    SUM(CASE WHEN pm.player_slot >= 128 THEN pm.deaths ELSE 0 END) AS deaths,
    SUM(CASE WHEN pm.player_slot >= 128 THEN pm.assists ELSE 0 END) AS assists,
    MAX(CASE WHEN pm.player_slot >= 128 THEN pm.firstblood_claimed ELSE 0 END) AS first_blood,
    SUM(CASE WHEN pm.player_slot >= 128 THEN COALESCE(pm.obs_placed,0) ELSE 0 END) AS obs,
    SUM(CASE WHEN pm.player_slot >= 128 THEN COALESCE(pm.sen_placed,0) ELSE 0 END) AS sentry,
    SUM(CASE WHEN pm.player_slot >= 128 THEN COALESCE(pm.roshans_killed,0) ELSE 0 END) AS roshans,
    SUM(CASE WHEN pm.player_slot >= 128 THEN COALESCE(pm.camps_stacked,0) ELSE 0 END) AS stacks,
    SUM(CASE WHEN pm.player_slot >= 128 THEN COALESCE(pm.rune_pickups,0) ELSE 0 END) AS runes,
    SUM(CASE WHEN pm.player_slot >= 128 THEN COALESCE(pm.towers_killed,0) ELSE 0 END) AS towers
    FROM matches m
    JOIN player_matches pm ON pm.match_id = m.match_id
  WHERE m.leagueid = ${leagueId}
  GROUP BY m.match_id, m.dire_team_id
)

SELECT
  t.team_id,
  t.name AS team_name,
  t.logo_url AS logo,

  COUNT(*) AS matches,
  ROUND(SUM(tm.duration)/ 60.0, 2) AS duration,
  ROUND(MIN(tm.duration)/ 60.0, 2) AS min_duration,
  ROUND(MAX(tm.duration)/ 60.0, 2) AS max_duration,
  ROUND(AVG(tm.duration) / 60.0, 2) AS avg_duration,

  SUM(tm.kills) AS kills,
  MIN(tm.kills) AS min_kills,
  MAX(tm.kills) AS max_kills,
  ROUND(AVG(tm.kills), 2) AS avg_kills,
  SUM(tm.deaths) AS deaths,
  MIN(tm.deaths) AS min_deaths,
  MAX(tm.deaths) AS max_deaths,
  ROUND(AVG(tm.deaths), 2) AS avg_deaths,
  SUM(tm.assists) AS assists,
  MIN(tm.assists) AS min_assists,
  MAX(tm.assists) AS max_assists,
  ROUND(AVG(tm.assists), 2) AS avg_assists,

  SUM(tm.stacks) AS stacks,
  MIN(tm.stacks) AS min_stacks,
  MAX(tm.stacks) AS max_stacks,
  ROUND(AVG(tm.stacks), 2) AS avg_stacks,

  SUM(tm.first_blood) AS first_bloods,
  SUM(tm.roshans) AS roshans,
  ROUND(AVG(tm.roshans), 2) AS avg_roshans,
  SUM(tm.runes) AS runes,
  ROUND(AVG(tm.runes), 2) AS avg_runes,
  SUM(tm.towers) AS towers,
  ROUND(AVG(tm.towers), 2) AS avg_towers

FROM team_match_stats tm
JOIN teams t ON t.team_id = tm.team_id
WHERE tm.team_id IS NOT NULL
GROUP BY t.team_id, t.name, t.logo_url
ORDER BY avg_kills DESC;
`);

export const get_matches_duration = (leagueId: string) => encodeURI(`
SELECT
  ROW_NUMBER() OVER (ORDER BY m.match_id) - 1 AS idx,
  m.match_id,
  ROUND(m.duration / 60.0, 2) AS duration_minutes,
  m.radiant_team_id,
  tr.name AS radiant_team_name,
  m.dire_team_id,
  td.name AS dire_team_name,
  radiant_win
FROM matches m
LEFT JOIN teams tr ON m.radiant_team_id = tr.team_id
LEFT JOIN teams td ON m.dire_team_id = td.team_id
WHERE m.leagueid = ${leagueId}
ORDER BY m.match_id;
`);
