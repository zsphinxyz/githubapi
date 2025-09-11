"use client"

import { ColumnDef } from "@tanstack/react-table"
import { TPlayerStats } from "../dota2Types"
import Image from "next/image";
import { PLAYERURL } from "../const";

function formatLongNum(num: string) {
  // return parseFloat(num).toFixed(2);
  return parseInt(num).toLocaleString();
}

export const playerColumns: ColumnDef<TPlayerStats>[] = [
  // #region Name
  {
    accessorKey: "name",
    enableHiding: false,
    header: ({ column }) => (
      <button
        className='flex items-center gap-2'
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        title="Sort by name"
      >
        Name
        <span>
          {column.getIsSorted() === "asc" ? "↑" : column.getIsSorted() === "desc" ? "↓" : "↕"}
        </span>
      </button>
    ),
    enableSorting: true,
    sortingFn: (rowA, rowB, columnId) => {
      return String(rowA.getValue(columnId)).localeCompare(String(rowB.getValue(columnId)));
    },
    cell: ({ cell, row }) => {
      let teamName = row.getValue("team_name") as string;
      let img = row.getValue("logo_url") as string;
      return (
        <p className="pl-1">
          <a href={`${PLAYERURL}/${cell.row.getValue("account_id")}`} target="_blank" className="hover:underline hover:text-blue-500">
            {cell.getValue() as string}
          </a>
          {
            img ? (
              <Image title={teamName} src={img} alt={teamName} width={30} height={30} className="size-auto inline" />
            ) :
              <span title={teamName || "?"} className="text-xs p-1 rounded-md bg-black/20 border border-white/20 inline-block font-bold text-center cursor-default">
                {teamName ? teamName.split(" ").map(word => word.split("")[0]) : "❔"}
              </span>

          }
        </p>
      )
    }
  },
  {
    accessorKey: "count",
    enableHiding: false,
    header: ({ column }) => (
      <button
        className="flex items-center gap-2"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        title="Sort by matches"
      >
        Matches
        <span>
          {column.getIsSorted() === "asc" ? "↑" : column.getIsSorted() === "desc" ? "↓" : "↕"}
        </span>
      </button>
    ),
    enableSorting: true,
    sortingFn: (rowA, rowB, columnId) => Number(rowA.getValue(columnId)) - Number(rowB.getValue(columnId)),
  },
  // #region Kills
  {
    accessorKey: "kills",
    header: ({ column }) => {
      return (
        <button
          className="flex items-center gap-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          title="Sort by kills"
        >
          Total Kills
          <span>
            {column.getIsSorted() === "asc" ? "↑" : column.getIsSorted() === "desc" ? "↓" : "↕"}
          </span>
        </button>
      );
    },
    cell: ({ cell }) => cell.getValue() as string,
    enableSorting: true,
    sortingFn: (rowA, rowB, columnId) => {
      return Number(rowA.getValue(columnId)) - Number(rowB.getValue(columnId));
    },
  },
  {
    accessorKey: "min_kills",
    header: ({ column }) => {
      return (
        <button
          className="flex items-center gap-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          title="Sort by min kills"
        >
          Min Kills
          <span>
            {column.getIsSorted() === "asc" ? "↑" : column.getIsSorted() === "desc" ? "↓" : "↕"}
          </span>
        </button>
      );
    },
    cell: ({ cell }) => cell.getValue() as string,
    enableSorting: true,
    sortingFn: (rowA, rowB, columnId) => {
      return Number(rowA.getValue(columnId)) - Number(rowB.getValue(columnId));
    },
  },
  {
    accessorKey: "max_kills",
    header: ({ column }) => {
      return (
        <button
          className="flex items-center gap-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          title="Sort by max kills"
        >
          Max Kills
          <span>
            {column.getIsSorted() === "asc" ? "↑" : column.getIsSorted() === "desc" ? "↓" : "↕"}
          </span>
        </button>
      );
    },
    cell: ({ cell }) => cell.getValue() as string,
    enableSorting: true,
    sortingFn: (rowA, rowB, columnId) => {
      return Number(rowA.getValue(columnId)) - Number(rowB.getValue(columnId));
    },
  },
  {
    accessorKey: "avg_kills",
    header: ({ column }) => (
      <button
        className="flex items-center gap-2"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        title="Sort by avg kills"
      >
        Avg Kills
        <span>
          {column.getIsSorted() === "asc" ? "↑" : column.getIsSorted() === "desc" ? "↓" : "↕"}
        </span>
      </button>
    ),
    enableSorting: true,
    sortingFn: (rowA, rowB, columnId) => Number(rowA.getValue(columnId)) - Number(rowB.getValue(columnId)),
    cell: ({ cell }) => parseFloat(cell.getValue() as string).toFixed(2)
  },
  // #region Deaths
  {
    accessorKey: "deaths",
    header: ({ column }) => (
      <button
        className="flex items-center gap-2"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        title="Sort by deaths"
      >
        Total Deaths
        <span>
          {column.getIsSorted() === "asc" ? "↑" : column.getIsSorted() === "desc" ? "↓" : "↕"}
        </span>
      </button>
    ),
    enableSorting: true,
    sortingFn: (rowA, rowB, columnId) => Number(rowA.getValue(columnId)) - Number(rowB.getValue(columnId)),
  },
  {
    accessorKey: "min_deaths",
    header: ({ column }) => {
      return (
        <button
          className="flex items-center gap-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          title="Sort by min deaths"
        >
          Min Deaths
          <span>
            {column.getIsSorted() === "asc" ? "↑" : column.getIsSorted() === "desc" ? "↓" : "↕"}
          </span>
        </button>
      );
    },
    cell: ({ cell }) => cell.getValue() as string,
    enableSorting: true,
    sortingFn: (rowA, rowB, columnId) => {
      return Number(rowA.getValue(columnId)) - Number(rowB.getValue(columnId));
    },
  },
  {
    accessorKey: "max_deaths",
    header: ({ column }) => {
      return (
        <button
          className="flex items-center gap-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          title="Sort by max deaths"
        >
          Max Deaths
          <span>
            {column.getIsSorted() === "asc" ? "↑" : column.getIsSorted() === "desc" ? "↓" : "↕"}
          </span>
        </button>
      );
    },
    cell: ({ cell }) => cell.getValue() as string,
    enableSorting: true,
    sortingFn: (rowA, rowB, columnId) => {
      return Number(rowA.getValue(columnId)) - Number(rowB.getValue(columnId));
    },
  },
  {
    accessorKey: "avg_deaths",
    header: ({ column }) => (
      <button
        className="flex items-center gap-2"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        title="Sort by avg deaths"
      >
        Avg Deaths
        <span>
          {column.getIsSorted() === "asc" ? "↑" : column.getIsSorted() === "desc" ? "↓" : "↕"}
        </span>
      </button>
    ),
    enableSorting: true,
    sortingFn: (rowA, rowB, columnId) => Number(rowA.getValue(columnId)) - Number(rowB.getValue(columnId)),
    cell: ({ cell }) => parseFloat(cell.getValue() as string).toFixed(2)
  },
  // #region Assists
  {
    accessorKey: "assists",
    header: ({ column }) => (
      <button
        className="flex items-center gap-2"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        title="Sort by assists"
      >
        Total Assists
        <span>
          {column.getIsSorted() === "asc" ? "↑" : column.getIsSorted() === "desc" ? "↓" : "↕"}
        </span>
      </button>
    ),
    enableSorting: true,
    sortingFn: (rowA, rowB, columnId) => Number(rowA.getValue(columnId)) - Number(rowB.getValue(columnId)),
  },
  {
    accessorKey: "min_assists",
    header: ({ column }) => {
      return (
        <button
          className="flex items-center gap-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          title="Sort by min assists"
        >
          Min Assists
          <span>
            {column.getIsSorted() === "asc" ? "↑" : column.getIsSorted() === "desc" ? "↓" : "↕"}
          </span>
        </button>
      );
    },
    cell: ({ cell }) => cell.getValue() as string,
    enableSorting: true,
    sortingFn: (rowA, rowB, columnId) => {
      return Number(rowA.getValue(columnId)) - Number(rowB.getValue(columnId));
    },
  },
  {
    accessorKey: "max_assists",
    header: ({ column }) => {
      return (
        <button
          className="flex items-center gap-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          title="Sort by max assists"
        >
          Max Assists
          <span>
            {column.getIsSorted() === "asc" ? "↑" : column.getIsSorted() === "desc" ? "↓" : "↕"}
          </span>
        </button>
      );
    },
    cell: ({ cell }) => cell.getValue() as string,
    enableSorting: true,
    sortingFn: (rowA, rowB, columnId) => {
      return Number(rowA.getValue(columnId)) - Number(rowB.getValue(columnId));
    },
  },
  {
    accessorKey: "avg_assists",
    header: ({ column }) => (
      <button
        className="flex items-center gap-2"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        title="Sort by avg assists"
      >
        Avg Assists
        <span>
          {column.getIsSorted() === "asc" ? "↑" : column.getIsSorted() === "desc" ? "↓" : "↕"}
        </span>
      </button>
    ),
    enableSorting: true,
    sortingFn: (rowA, rowB, columnId) => Number(rowA.getValue(columnId)) - Number(rowB.getValue(columnId)),
    cell: ({ cell }) => parseFloat(cell.getValue() as string).toFixed(2),
  },
  // #region Hero Dmg
  {
    accessorKey: "hero_damage",
    header: ({ column }) => (
      <button
        className="flex items-center gap-2"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        title="Sort by hero dmg"
      >
        Total Hero Dmg
        <span>
          {column.getIsSorted() === "asc" ? "↑" : column.getIsSorted() === "desc" ? "↓" : "↕"}
        </span>
      </button>
    ),
    enableSorting: true,
    sortingFn: (rowA, rowB, columnId) => Number(rowA.getValue(columnId)) - Number(rowB.getValue(columnId)),
    cell: ({ cell }) => formatLongNum(cell.getValue() as string),
  },
  {
    accessorKey: "min_hero_damage",
    header: ({ column }) => (
      <button
        className="flex items-center gap-2"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        title="Sort by min hero dmg"
      >
        Min Hero Dmg
        <span>
          {column.getIsSorted() === "asc" ? "↑" : column.getIsSorted() === "desc" ? "↓" : "↕"}
        </span>
      </button>
    ),
    enableSorting: true,
    sortingFn: (rowA, rowB, columnId) => Number(rowA.getValue(columnId)) - Number(rowB.getValue(columnId)),
    cell: ({ cell }) => formatLongNum(cell.getValue() as string),
  },
  {
    accessorKey: "max_hero_damage",
    header: ({ column }) => (
      <button
        className="flex items-center gap-2"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        title="Sort by max hero dmg"
      >
        Max Hero Dmg
        <span>
          {column.getIsSorted() === "asc" ? "↑" : column.getIsSorted() === "desc" ? "↓" : "↕"}
        </span>
      </button>
    ),
    enableSorting: true,
    sortingFn: (rowA, rowB, columnId) => Number(rowA.getValue(columnId)) - Number(rowB.getValue(columnId)),
    cell: ({ cell }) => formatLongNum(cell.getValue() as string),
  },
  {
    accessorKey: "avg_hero_damage",
    header: ({ column }) => (
      <button
        className={`flex items-center gap-2`}
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        title="Sort by avg hero dmg"
      >
        Avg Hero Dmg
        <span>
          {column.getIsSorted() === "asc" ? "↑" : column.getIsSorted() === "desc" ? "↓" : "↕"}
        </span>
      </button>
    ),
    enableSorting: true,
    sortingFn: (rowA, rowB, columnId) => Number(rowA.getValue(columnId)) - Number(rowB.getValue(columnId)),
    cell: ({ cell }) => formatLongNum(cell.getValue() as string),
  },
  // #region Tower Dmg
  {
    accessorKey: "tower_damage",
    header: ({ column }) => (
      <button
        className="flex items-center gap-2"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        title="Sort by tower dmg"
      >
        Total Tower Dmg
        <span>
          {column.getIsSorted() === "asc" ? "↑" : column.getIsSorted() === "desc" ? "↓" : "↕"}
        </span>
      </button>
    ),
    enableSorting: true,
    sortingFn: (rowA, rowB, columnId) => Number(rowA.getValue(columnId)) - Number(rowB.getValue(columnId)),
    cell: ({ cell }) => formatLongNum(cell.getValue() as string),
  },
  {
    accessorKey: "min_tower_damage",
    header: ({ column }) => (
      <button
        className="flex items-center gap-2"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        title="Sort by min tower dmg"
      >
        Min Tower Dmg
        <span>
          {column.getIsSorted() === "asc" ? "↑" : column.getIsSorted() === "desc" ? "↓" : "↕"}
        </span>
      </button>
    ),
    enableSorting: true,
    sortingFn: (rowA, rowB, columnId) => Number(rowA.getValue(columnId)) - Number(rowB.getValue(columnId)),
    cell: ({ cell }) => formatLongNum(cell.getValue() as string),
  },
  {
    accessorKey: "max_tower_damage",
    header: ({ column }) => (
      <button
        className="flex items-center gap-2"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        title="Sort by max tower dmg"
      >
        Max Tower Dmg
        <span>
          {column.getIsSorted() === "asc" ? "↑" : column.getIsSorted() === "desc" ? "↓" : "↕"}
        </span>
      </button>
    ),
    enableSorting: true,
    sortingFn: (rowA, rowB, columnId) => Number(rowA.getValue(columnId)) - Number(rowB.getValue(columnId)),
    cell: ({ cell }) => formatLongNum(cell.getValue() as string),
  },
  {
    accessorKey: "avg_tower_damage",
    header: ({ column }) => (
      <button
        className="flex items-center gap-2"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        title="Sort by avg tower dmg"
      >
        Avg Tower Dmg
        <span>
          {column.getIsSorted() === "asc" ? "↑" : column.getIsSorted() === "desc" ? "↓" : "↕"}
        </span>
      </button>
    ),
    enableSorting: true,
    sortingFn: (rowA, rowB, columnId) => Number(rowA.getValue(columnId)) - Number(rowB.getValue(columnId)),
    cell: ({ cell }) => formatLongNum(cell.getValue() as string),
  },
  // #region Last hits
  {
    accessorKey: "last_hits",
    header: ({ column }) => (
      <button
        className="flex items-center gap-2"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        title="Sort by cs"
      >
        Total CS
        <span>
          {column.getIsSorted() === "asc" ? "↑" : column.getIsSorted() === "desc" ? "↓" : "↕"}
        </span>
      </button>
    ),
    enableSorting: true,
    sortingFn: (rowA, rowB, columnId) => Number(rowA.getValue(columnId)) - Number(rowB.getValue(columnId)),
    cell: ({ cell }) => formatLongNum(cell.getValue() as string),
  },
    {
    accessorKey: "min_last_hits",
    header: ({ column }) => (
      <button
        className="flex items-center gap-2"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        title="Sort by min cs"
      >
        Min CS
        <span>
          {column.getIsSorted() === "asc" ? "↑" : column.getIsSorted() === "desc" ? "↓" : "↕"}
        </span>
      </button>
    ),
    enableSorting: true,
    sortingFn: (rowA, rowB, columnId) => Number(rowA.getValue(columnId)) - Number(rowB.getValue(columnId)),
    cell: ({ cell }) => formatLongNum(cell.getValue() as string),
  },
    {
    accessorKey: "max_last_hits",
    header: ({ column }) => (
      <button
        className="flex items-center gap-2"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        title="Sort by max cs"
      >
        Max CS
        <span>
          {column.getIsSorted() === "asc" ? "↑" : column.getIsSorted() === "desc" ? "↓" : "↕"}
        </span>
      </button>
    ),
    enableSorting: true,
    sortingFn: (rowA, rowB, columnId) => Number(rowA.getValue(columnId)) - Number(rowB.getValue(columnId)),
    cell: ({ cell }) => formatLongNum(cell.getValue() as string),
  },
  {
    accessorKey: "avg_last_hits",
    header: ({ column }) => (
      <button
        className="flex items-center gap-2"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        title="Sort by avg cs"
      >
        Avg CS
        <span>
          {column.getIsSorted() === "asc" ? "↑" : column.getIsSorted() === "desc" ? "↓" : "↕"}
        </span>
      </button>
    ),
    enableSorting: true,
    sortingFn: (rowA, rowB, columnId) => Number(rowA.getValue(columnId)) - Number(rowB.getValue(columnId)),
    cell: ({ cell }) => formatLongNum(cell.getValue() as string),
  },
  // #region Denies
  {
    accessorKey: "denies",
    header: ({ column }) => (
      <button
        className="flex items-center gap-2"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        title="Sort by denies"
      >
        Total Denies
        <span>
          {column.getIsSorted() === "asc" ? "↑" : column.getIsSorted() === "desc" ? "↓" : "↕"}
        </span>
      </button>
    ),
    enableSorting: true,
    sortingFn: (rowA, rowB, columnId) => Number(rowA.getValue(columnId)) - Number(rowB.getValue(columnId)),
    cell: ({ cell }) => formatLongNum(cell.getValue() as string),
  },
  {
    accessorKey: "min_denies",
    header: ({ column }) => (
      <button
        className="flex items-center gap-2"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        title="Sort by denies"
      >
        Min Denies
        <span>
          {column.getIsSorted() === "asc" ? "↑" : column.getIsSorted() === "desc" ? "↓" : "↕"}
        </span>
      </button>
    ),
    enableSorting: true,
    sortingFn: (rowA, rowB, columnId) => Number(rowA.getValue(columnId)) - Number(rowB.getValue(columnId)),
    cell: ({ cell }) => formatLongNum(cell.getValue() as string),
  },
  {
    accessorKey: "max_denies",
    header: ({ column }) => (
      <button
        className="flex items-center gap-2"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        title="Sort by denies"
      >
        Max Denies
        <span>
          {column.getIsSorted() === "asc" ? "↑" : column.getIsSorted() === "desc" ? "↓" : "↕"}
        </span>
      </button>
    ),
    enableSorting: true,
    sortingFn: (rowA, rowB, columnId) => Number(rowA.getValue(columnId)) - Number(rowB.getValue(columnId)),
    cell: ({ cell }) => formatLongNum(cell.getValue() as string),
  },
  {
    accessorKey: "avg_denies",
    header: ({ column }) => (
      <button
        className="flex items-center gap-2"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        title="Sort by avg denies"
      >
        Avg Denies
        <span>
          {column.getIsSorted() === "asc" ? "↑" : column.getIsSorted() === "desc" ? "↓" : "↕"}
        </span>
      </button>
    ),
    enableSorting: true,
    sortingFn: (rowA, rowB, columnId) => Number(rowA.getValue(columnId)) - Number(rowB.getValue(columnId)),
    cell: ({ cell }) => parseFloat(cell.getValue() as string).toFixed(2),
  },
  // #region Gold
  {
    accessorKey: "avg_gold",
    header: ({ column }) => (
      <button
        className="flex items-center gap-2"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        title="Sort by avg gold"
      >
        Avg Gold
        <span>
          {column.getIsSorted() === "asc" ? "↑" : column.getIsSorted() === "desc" ? "↓" : "↕"}
        </span>
      </button>
    ),
    enableSorting: true,
    sortingFn: (rowA, rowB, columnId) => Number(rowA.getValue(columnId)) - Number(rowB.getValue(columnId)),
    cell: ({ cell }) => formatLongNum(cell.getValue() as string),
  },
  {
    accessorKey: "min_gpm",
    header: ({ column }) => (
      <button
        className="flex items-center gap-2"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        title="Sort by min gpm"
      >
        Min GPM
        <span>
          {column.getIsSorted() === "asc" ? "↑" : column.getIsSorted() === "desc" ? "↓" : "↕"}
        </span>
      </button>
    ),
    enableSorting: true,
    sortingFn: (rowA, rowB, columnId) => Number(rowA.getValue(columnId)) - Number(rowB.getValue(columnId)),
    cell: ({ cell }) => formatLongNum(cell.getValue() as string),
  },
  {
    accessorKey: "max_gpm",
    header: ({ column }) => (
      <button
        className="flex items-center gap-2"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        title="Sort by max gpm"
      >
        Max GPM
        <span>
          {column.getIsSorted() === "asc" ? "↑" : column.getIsSorted() === "desc" ? "↓" : "↕"}
        </span>
      </button>
    ),
    enableSorting: true,
    sortingFn: (rowA, rowB, columnId) => Number(rowA.getValue(columnId)) - Number(rowB.getValue(columnId)),
    cell: ({ cell }) => formatLongNum(cell.getValue() as string),
  },{
    accessorKey: "avg_gpm",
    header: ({ column }) => (
      <button
        className="flex items-center gap-2"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        title="Sort by avg gpm"
      >
        Avg GPM
        <span>
          {column.getIsSorted() === "asc" ? "↑" : column.getIsSorted() === "desc" ? "↓" : "↕"}
        </span>
      </button>
    ),
    enableSorting: true,
    sortingFn: (rowA, rowB, columnId) => Number(rowA.getValue(columnId)) - Number(rowB.getValue(columnId)),
    cell: ({ cell }) => formatLongNum(cell.getValue() as string),
  },

  // #region EMPTY COLUMNS
  {
    accessorKey: "team_name",
    enableHiding: true,
    header: "",
    cell: "",
    enableSorting: false,
  },
  {
    accessorKey: "account_id",
    enableHiding: true,
    header: "",
    cell: "",
    enableSorting: false,
  },
  {
    accessorKey: "logo_url",
    enableHiding: true,
    header: "",
    cell: "",
  },
]