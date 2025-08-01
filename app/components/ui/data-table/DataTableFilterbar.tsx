"use client"

import { Button } from "@/app/components/Button"
import { RiDownloadLine, RiAddLine, RiArrowDownSLine } from "@remixicon/react"
import { Table } from "@tanstack/react-table"
import { useState } from "react"
import { useDebouncedCallback } from "use-debounce"
import { DataTableFilter } from "./DataTableFilter"
import { ViewOptions } from "./DataTableViewOptions"
import { useStatuses } from "@/app/hooks/useStatuses"
import axios from 'axios'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function Filterbar<TData>({ table }: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isAirtableLoading, setIsAirtableLoading] = useState<boolean>(false)
  const { data: statuses, isLoading: isStatusesLoading, error: statusesError } = useStatuses(false)

  async function handleECWAuth() {
    setIsLoading(true)
    try {
      const res = await axios.get('/api/ecw_auth', { responseType: 'text' });
      window.open(res.data, '_blank');
      setIsLoading(false)
    } catch (error) {
      console.error(error);
    }
  }

  async function postToAirtable() {
    setIsAirtableLoading(true)
    try {
      const res = await axios.post('/api/airtable');
      console.log(res.data)
      setIsAirtableLoading(false)
    } catch (error) {
      console.error(error);
    }
  }

  const debouncedSetFilterValue = useDebouncedCallback((value) => {
    table.getColumn("name")?.setFilterValue(value)
  }, 300)

  const handleSearchChange = (event: any) => {
    const value = event.target.value
    setSearchTerm(value)
    debouncedSetFilterValue(value)
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-x-6">
      <div className="flex w-full flex-col gap-2 sm:w-fit sm:flex-row sm:items-center">
        {/* {table.getColumn("comm_status")?.getIsVisible() && !isStatusesLoading && statuses && (
          <DataTableFilter
            column={table.getColumn("comm_status")}
            title="Comm Status"
            options={statuses.map((status) => ({ label: status.label, value: status.id.toString() }))}
            type="select"
          />
        )} */}
        {/* {table.getColumn("surgery")?.getIsVisible() && (
          <DataTableFilter
            column={table.getColumn("surgery")}
            title="Surgery"
            options={surgeries}
            type="checkbox"
          />
        )} */}
        {/* {table.getColumn("costs")?.getIsVisible() && (
          <DataTableFilter
            column={table.getColumn("costs")}
            title="Costs"
            type="number"
            options={conditions}
            formatter={formatters.currency}
          />
        )} */}
        {/* {table.getColumn("surgeryOrder")?.getIsVisible() && (
          <Searchbar
            type="search"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full sm:max-w-[250px] sm:[&>input]:h-[30px]"
          />
        )} */}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="border border-gray-200 px-2 font-semibold text-indigo-600 sm:border-none sm:py-1 dark:border-gray-800 dark:text-indigo-500"
          >
            Clear filters
          </Button>
        )}
      </div>
      <div className="flex items-center gap-2">
        <Button
          id="ecw-auth-button"
          variant="secondary"
          className="hidden gap-x-2 px-2 py-1.5 text-sm sm:text-xs lg:flex bg-indigo-600 text-white hover:bg-indigo-400 shadow-[inset_0_2px_4px_0_rgba(99,102,241,1)]"
          onClick={handleECWAuth}
          isLoading={isLoading}
        >
         Connect ECW
        </Button>
        <Button
          id="airtable-auth-button"
          variant="secondary"
          className="hidden gap-x-2 px-2 py-1.5 text-sm sm:text-xs lg:flex bg-indigo-600 text-white hover:bg-indigo-400 shadow-[inset_0_2px_4px_0_rgba(99,102,241,1)]"
          onClick={postToAirtable}
          isLoading={isAirtableLoading}
        >
         Connect Airtable
        </Button>
        <Button
          variant="secondary"
          className="hidden gap-x-2 px-2 py-1.5 text-sm sm:text-xs lg:flex"
          disabled={true}
        >
          <RiDownloadLine className="size-4 shrink-0" aria-hidden="true" />
          Export
        </Button>
        <ViewOptions table={table} />
      </div>
    </div>
  )
}
