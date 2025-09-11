"use client"

import { ColumnDef } from "@tanstack/react-table"
import { TTeamStats } from "../dota2Types"
import Image from "next/image";
import { TEAMURL } from "../const";

export const teamColumns: ColumnDef<TTeamStats>[] = [
  {
    accessorKey: "team_name",
    header: ({ column }) => (
      <button
        className="flex items-center gap-2"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        title="Sort by team"
      >
        Team
        <span>
          {column.getIsSorted() === "asc" ? "↑" : column.getIsSorted() === "desc" ? "↓" : "↕"}
        </span>
      </button>
    ),
    enableSorting: true,
    sortingFn: (rowA, rowB, columnId) => String(rowA.getValue(columnId)).localeCompare(String(rowB.getValue(columnId))),
    cell: ({ cell, row }) => {
      let teamName = cell.getValue() as string;
      let img = row.getValue("logo") as string;
      return (
        <a title={teamName} href={`${TEAMURL}/${row.getValue("team_id")}`} className="" target="_blank">
          {
            img ?
              <Image src={img} width={50} height={50} alt={teamName} className="size-auto" />
              :
              <span className="size-4 bg-black/30">❔</span>
          }
        </a>
      )
    }
  },
  {
    accessorKey: "matches",
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
  // #region Duration
  {
    accessorKey: "duration",
    header: ({ column }) => (
      <button
        className="flex items-center gap-2"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        title="Sort by duration"
      >
        Total Duration hours
        <span>
          {column.getIsSorted() === "asc" ? "↑" : column.getIsSorted() === "desc" ? "↓" : "↕"}
        </span>
      </button>
    ),
    enableSorting: true,
    sortingFn: (rowA, rowB, columnId) => Number(rowA.getValue(columnId)) - Number(rowB.getValue(columnId)),
  },
  {
    accessorKey: "min_duration",
    header: ({ column }) => (
      <button
        className="flex items-center gap-2"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        title="Sort by duration"
      >
        Min Duration mins
        <span>
          {column.getIsSorted() === "asc" ? "↑" : column.getIsSorted() === "desc" ? "↓" : "↕"}
        </span>
      </button>
    ),
    enableSorting: true,
    sortingFn: (rowA, rowB, columnId) => Number(rowA.getValue(columnId)) - Number(rowB.getValue(columnId)),
  },  {
    accessorKey: "max_duration",
    header: ({ column }) => (
      <button
        className="flex items-center gap-2"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        title="Sort by duration"
      >
        Max duration mins
        <span>
          {column.getIsSorted() === "asc" ? "↑" : column.getIsSorted() === "desc" ? "↓" : "↕"}
        </span>
      </button>
    ),
    enableSorting: true,
    sortingFn: (rowA, rowB, columnId) => Number(rowA.getValue(columnId)) - Number(rowB.getValue(columnId)),
  },
  {
    accessorKey: "avg_duration",
    header: ({ column }) => (
      <button
        className="flex items-center gap-2"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        title="Sort by avg duration"
      >
        Avg Duration mins
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
    header: ({ column }) => (
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
    ),
    enableSorting: true,
    sortingFn: (rowA, rowB, columnId) => Number(rowA.getValue(columnId)) - Number(rowB.getValue(columnId)),
  },
  {
    accessorKey: "min_kills",
    header: ({ column }) => (
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
    ),
    enableSorting: true,
    sortingFn: (rowA, rowB, columnId) => Number(rowA.getValue(columnId)) - Number(rowB.getValue(columnId)),
  },  {
    accessorKey: "max_kills",
    header: ({ column }) => (
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
    ),
    enableSorting: true,
    sortingFn: (rowA, rowB, columnId) => Number(rowA.getValue(columnId)) - Number(rowB.getValue(columnId)),
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
    header: ({ column }) => (
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
    ),
    enableSorting: true,
    sortingFn: (rowA, rowB, columnId) => Number(rowA.getValue(columnId)) - Number(rowB.getValue(columnId)),
  },  {
    accessorKey: "max_deaths",
    header: ({ column }) => (
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
    ),
    enableSorting: true,
    sortingFn: (rowA, rowB, columnId) => Number(rowA.getValue(columnId)) - Number(rowB.getValue(columnId)),
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
    header: ({ column }) => (
      <button
        className="flex items-center gap-2"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        title="Sort by min assists"
      >
        min Assists
        <span>
          {column.getIsSorted() === "asc" ? "↑" : column.getIsSorted() === "desc" ? "↓" : "↕"}
        </span>
      </button>
    ),
    enableSorting: true,
    sortingFn: (rowA, rowB, columnId) => Number(rowA.getValue(columnId)) - Number(rowB.getValue(columnId)),
  },  {
    accessorKey: "max_assists",
    header: ({ column }) => (
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
    ),
    enableSorting: true,
    sortingFn: (rowA, rowB, columnId) => Number(rowA.getValue(columnId)) - Number(rowB.getValue(columnId)),
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
  },
  // #region Tower
  {
    accessorKey: "towers",
    header: ({ column }) => (
      <button
        className="flex items-center gap-2"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        title="Sort by towers killed"
      >
        Total Towers Killed
        <span>
          {column.getIsSorted() === "asc" ? "↑" : column.getIsSorted() === "desc" ? "↓" : "↕"}
        </span>
      </button>
    ),
    enableSorting: true,
    sortingFn: (rowA, rowB, columnId) => Number(rowA.getValue(columnId)) - Number(rowB.getValue(columnId)),
  },
  {
    accessorKey: "avg_towers",
    header: ({ column }) => (
      <button
        className="flex items-center gap-2"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        title="Sort by avg towers killed"
      >
        Avg Towers Killed
        <span>
          {column.getIsSorted() === "asc" ? "↑" : column.getIsSorted() === "desc" ? "↓" : "↕"}
        </span>
      </button>
    ),
    enableSorting: true,
    sortingFn: (rowA, rowB, columnId) => Number(rowA.getValue(columnId)) - Number(rowB.getValue(columnId)),
  },
  // #region Stacks
  {
    accessorKey: "stacks",
    header: ({ column }) => (
      <button
        className="flex items-center gap-2"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        title="Sort by stacks"
      >
        Stacks
        <span>
          {column.getIsSorted() === "asc" ? "↑" : column.getIsSorted() === "desc" ? "↓" : "↕"}
        </span>
      </button>
    ),
    enableSorting: true,
    sortingFn: (rowA, rowB, columnId) => Number(rowA.getValue(columnId)) - Number(rowB.getValue(columnId)),
  },
  {
    accessorKey: "min_stacks",
    header: ({ column }) => (
      <button
        className="flex items-center gap-2"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        title="Sort by min stacks"
      >
        Min Stacks
        <span>
          {column.getIsSorted() === "asc" ? "↑" : column.getIsSorted() === "desc" ? "↓" : "↕"}
        </span>
      </button>
    ),
    enableSorting: true,
    sortingFn: (rowA, rowB, columnId) => Number(rowA.getValue(columnId)) - Number(rowB.getValue(columnId)),
  },  {
    accessorKey: "max_stacks",
    header: ({ column }) => (
      <button
        className="flex items-center gap-2"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        title="Sort by max stacks"
      >
        Max Stacks
        <span>
          {column.getIsSorted() === "asc" ? "↑" : column.getIsSorted() === "desc" ? "↓" : "↕"}
        </span>
      </button>
    ),
    enableSorting: true,
    sortingFn: (rowA, rowB, columnId) => Number(rowA.getValue(columnId)) - Number(rowB.getValue(columnId)),
  },
  {
    accessorKey: "avg_stacks",
    header: ({ column }) => (
      <button
        className="flex items-center gap-2"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        title="Sort by avg stacks"
      >
        Avg Stacks
        <span>
          {column.getIsSorted() === "asc" ? "↑" : column.getIsSorted() === "desc" ? "↓" : "↕"}
        </span>
      </button>
    ),
    enableSorting: true,
    sortingFn: (rowA, rowB, columnId) => Number(rowA.getValue(columnId)) - Number(rowB.getValue(columnId)),
  },
  // #region Runes
  {
    accessorKey: "runes",
    header: ({ column }) => (
      <button
        className="flex items-center gap-2"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        title="Sort by runes"
      >
        Runes
        <span>
          {column.getIsSorted() === "asc" ? "↑" : column.getIsSorted() === "desc" ? "↓" : "↕"}
        </span>
      </button>
    ),
    enableSorting: true,
    sortingFn: (rowA, rowB, columnId) => Number(rowA.getValue(columnId)) - Number(rowB.getValue(columnId)),
  },
  {
    accessorKey: "avg_runes",
    header: ({ column }) => (
      <button
        className="flex items-center gap-2"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        title="Sort by runes"
      >
        Avg Runes
        <span>
          {column.getIsSorted() === "asc" ? "↑" : column.getIsSorted() === "desc" ? "↓" : "↕"}
        </span>
      </button>
    ),
    enableSorting: true,
    sortingFn: (rowA, rowB, columnId) => Number(rowA.getValue(columnId)) - Number(rowB.getValue(columnId)),
  },
  // #region 1st Blood
  {
    accessorKey: "first_bloods",
    header: ({ column }) => (
      <button
        className="flex items-center gap-2"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        title="Sort by first bloods"
      >
        First Bloods
        <span>
          {column.getIsSorted() === "asc" ? "↑" : column.getIsSorted() === "desc" ? "↓" : "↕"}
        </span>
      </button>
    ),
    enableSorting: true,
    sortingFn: (rowA, rowB, columnId) => Number(rowA.getValue(columnId)) - Number(rowB.getValue(columnId)),
  },
  {
    accessorKey: "roshans",
    header: ({ column }) => (
      <button
        className="flex items-center gap-2"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        title="Sort by roshans"
      >
        Roshans
        <span>
          {column.getIsSorted() === "asc" ? "↑" : column.getIsSorted() === "desc" ? "↓" : "↕"}
        </span>
      </button>
    ),
    enableSorting: true,
    sortingFn: (rowA, rowB, columnId) => Number(rowA.getValue(columnId)) - Number(rowB.getValue(columnId)),
  },


  // #region EMPTY Cols
  {
    accessorKey: "logo",
    header: "",
    cell: "",
  },
  {
    accessorKey: "team_id",
    header: "",
    cell: "",
  }


]