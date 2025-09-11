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
import { useState } from "react"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { BiChevronDown } from "react-icons/bi"
import { TTeamStats } from "../dota2Types"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function TeamDataTable<TData, TValue>({
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
  let [subColsHidden, setSubColsHidden] = useState<Record<string, boolean>>({min: true, max: true, avg: false});

  // const teamContainerRef = useRef<HTMLDivElement>(null);
  let groups = [
    {KDA: table.getAllColumns().filter(col => col.id.includes("kills") || col.id.includes("assists") || col.id.includes("deaths")).map(col => col.id as keyof TTeamStats)},
    {Towers: table.getAllColumns().filter(col => col.id.includes("towers")).map(col => col.id as keyof TTeamStats) },
    {"Stacks & Runes": table.getAllColumns().filter(col => col.id.includes("stacks") || col.id.includes("runes")).map(col => col.id as keyof TTeamStats) },
    {Others: table.getAllColumns().filter(col => col.id.includes("first") || col.id.includes("roshans")).map(col => col.id as keyof TTeamStats) },
  ]

  return (
    <div className="relative">
      <div className="flex justify-between mb-1">
        <h2 className="text-xl font-bold">Teams Stats</h2>
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
                          if (Object.values(groups[idx])[0].includes(col.id as keyof TTeamStats)) {
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
                .map((column, idx: number) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={idx}
                      className="capitalize"
                      checked={
                        !subColsHidden[column]
                        // table.getAllColumns().find(col => col.id == Object.values(subCols[idx])[0][0])!.getIsVisible()
                      }
                      onCheckedChange={(value) =>
                        setSubColsHidden({ ...subColsHidden, [column]: !!!value })
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
      <div className="border group transition-all relative min-h-[460px] max-h-dvh overflow-auto">
        <Table className="bg-slate-700 relative">
            <TableHeader className="!sticky !top-0 z-10 bg-slate-800">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                <TableHead>No</TableHead>
                {headerGroup.headers.filter(header => !!header.column.columnDef.header).map((header) => {
                  if (true) {
                    return (
                      <TableHead
                        hidden = {!!Object.entries(subColsHidden).filter(kvArr => header.column.id.includes(kvArr[0])).flat()[1]}
                        key={header.id}
                        className={`
                          ${header.column.id == "team_name" && "sticky left-0 bg-slate-800"} 
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
                  }
              })}
              </TableRow>
            ))}
            </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, idx) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={`
                    odd:bg-black/10
                  `}
                >
                  <TableCell>{idx+1}</TableCell>
                  {
                    row.getVisibleCells().filter(cell => !!cell.column.columnDef.header).map((cell) => {
                      if (true) {
                        return (
                          <TableCell 
                            hidden = {!!Object.entries(subColsHidden).filter(kvArr => cell.column.id.includes(kvArr[0])).flat()[1]}
                            key={cell.id} 
                            className={`
                              ${(cell.column.columnDef.header?.toString().includes("avg") || cell.column.columnDef.header?.toString().includes("matches")) && "border-r border-r-white/20"}
                              ${cell.column.id == "team_name" && "sticky left-0 z-[0]"}
                              ${(cell.column.id == "team_name" && idx % 2 == 0) && "bg-[#2e3a4c]"}
                              ${(cell.column.id == "team_name" && idx % 2 !== 0) && "bg-[#334155]"}
                            `}   
                          >
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </TableCell>
                        )
                      }
                    })
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
    </div>
  )
}