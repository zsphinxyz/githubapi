"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  SortingState,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useRef, useState } from "react"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { BiChevronDown } from "react-icons/bi"
import { TColumnToggle, TPlayerStats } from "../dota2Types"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function PlayerDataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {

  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: { sorting },
    onSortingChange: setSorting,
  });

  const containerRef = useRef<HTMLDivElement>(null);

  let groups:TColumnToggle = [
    {KDA: table.getAllColumns().filter(col => col.id.includes("kills") || col.id.includes("assists") || col.id.includes("deaths")).map(col => col.id as keyof TPlayerStats)},
    {Damage: table.getAllColumns().filter(col => col.id.includes("damage")).map(col => col.id as keyof TPlayerStats) },
    {CS: table.getAllColumns().filter(col => col.id.includes("last_hits") || col.id.includes("denies")).map(col => col.id as keyof TPlayerStats)},
    {Gold: table.getAllColumns().filter(col => col.id.includes("gold") || col.id.includes("gpm")).map(col => col.id as keyof TPlayerStats)}
  ]
  
  // {min: ["min_kills", "min_assists", "min_deaths", "min_hero_damage", "min_tower_damage", "min_denies", "min_last_hits"]},
  // {max: ["max_kills", "max_assists", "max_deaths", "max_hero_damage", "max_tower_damage", "max_denies", "max_last_hits"]},
  // {avg: ["avg_kills", "avg_assists", "avg_deaths", "avg_hero_damage", "avg_tower_damage", "avg_denies", "avg_last_hits"]},
  // let subCols: TColumnToggle = [
  //   {total: ["kills", "deaths", "assists", "hero_damage", "tower_damage", "last_hits", "denies"]},
  //   {min: groups.map(col => Object.values(col)[0]).flat().filter(i => i.includes('min'))},
  //   {max: groups.map(col => Object.values(col)[0]).flat().filter(i => i.includes('max'))},
  //   {max: groups.map(col => Object.values(col)[0]).flat().filter(i => i.includes('avg'))},
  // ]

  // console.log(subCols);

  let [subColsHidden, setSubColsHidden] = useState<Record<string, boolean>>({min: true, max: true, avg: false});

  return (
    <div className="relative">
      <div className="flex justify-between mb-1">
        <h1 className="font-bold text-xl">Player Stats</h1>
        <div className="space-x-2">
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto bg-slate-800 border border-white/50">
                Columns <BiChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-slate-900">
              {groups
                .map((column, idx) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={idx}
                      className="capitalize "
                      checked={
                        table.getAllColumns().find(col => col.id == Object.values(groups[idx])[0][0])!.getIsVisible()
                      }
                      onCheckedChange={(value) =>
                        table.getAllColumns().forEach(col => {
                          if (Object.values(groups[idx])[0].includes(col.id as keyof TPlayerStats)) {
                            col.toggleVisibility(!!value)
                          }
                        }
                      )}
                    >
                      {Object.keys(groups[idx])}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto bg-slate-800 border border-white/50">
                Sub Columns <BiChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-slate-900">
              {Object.keys(subColsHidden)
                .map((column, idx:number) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={idx}
                      className="capitalize"
                      checked={
                        !subColsHidden[column]
                        // table.getAllColumns().find(col => col.id == Object.values(subCols[idx])[0][0])!.getIsVisible()
                      }
                      onCheckedChange={(value) =>
                        setSubColsHidden({...subColsHidden, [column]: !!!value})
                      }
                    >
                      {column}
                      {/* {Object.keys(subCols[idx])} */}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>

        </div>
      </div>
      <div ref={containerRef} className="border group transition-all relative min-h-full max-h-[460px] overflow-auto">
        <Table className="bg-slate-700 relative">
          <TableHeader className="!sticky !top-0 bg-slate-800 z-20">
            {
              table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  <TableHead>No</TableHead>
                  {headerGroup.headers.filter(header => !!header.column.columnDef.header).map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        hidden = {!!Object.entries(subColsHidden).filter(kvArr => header.column.id.includes(kvArr[0])).flat()[1]}
                        className={`
                          ${header.column.id == "name" && "sticky left-0 bg-slate-800"} 
                          ${(header.column.getIsSorted()) && "text-green-500 bg-green-500/10"} 
                          ${(header.column.columnDef.header?.toString().includes("avg") || header.column.columnDef.header?.toString().includes("matches")) && "border-r border-white/20"}
                        `}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))
            }
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, idx) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={`odd:bg-black/10`}
                >
                  <TableCell>
                    {idx + 1}
                  </TableCell>
                  {
                    row.getVisibleCells().filter(cell => !!cell.column.columnDef.header).map((cell) => (
                      <TableCell
                        hidden = {!!Object.entries(subColsHidden).filter(kvArr => cell.column.id.includes(kvArr[0])).flat()[1]}
                        key={cell.id} 
                        className={`
                          ${cell.column.id == "name" && "sticky left-0 z-[0]"}
                          ${(cell.column.id == "name" && idx % 2 == 0) && "bg-[#2e3a4c]"}
                          ${(cell.column.id == "name" && idx % 2 !== 0) && "bg-[#334155]"}
                          ${(cell.column.columnDef.header?.toString().includes("avg") || cell.column.id.includes("count")) && "border-r border-r-white/20"}
                      `}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        {/* <span className="text-green-600 text-xs block">{cell.column.id}</span> */}
                      </TableCell>
                    ))
                  }
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

      </div>
      <label htmlFor="more" className="w-full mx-auto h-7 block select-none bg-slate-800 absolute -bottom-7 z-10 text-center">
        <input type="checkbox" name="more" id="more" className="peer hidden"
          onChange={(e) => {
            if (e.target.checked) {
              containerRef.current?.classList.add("!max-h-full");
            } else {
              containerRef.current?.classList.remove("!max-h-full");
            }
          }}
        />
        <span className="after:content-['Show_All'] peer-checked:after:content-['Show_Less']">
        </span>

      </label>
    </div>
  )
}