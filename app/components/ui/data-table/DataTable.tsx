"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@/app/components/Table"
import { cx } from "@/app/lib/utils"
import * as React from "react"

import { DataTableBulkEditor } from "./DataTableBulkEditor"
import { Filterbar } from "./DataTableFilterbar"
import { DataTablePagination } from "./DataTablePagination"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { useSurgeryOrders } from "@/app/hooks/useSurgeryOrders"

interface DataTableProps<TData> {
  columns: ColumnDef<TData>[]
  data: any
}

export function DataTable<TData>({ columns }: DataTableProps<TData>) {
  const { data: surgeryOrders } = useSurgeryOrders()
  const pageSize = 20
  const [rowSelection, setRowSelection] = React.useState({})
  const table = useReactTable({
    data: surgeryOrders || [],
    columns,
    state: {
      rowSelection,
    },
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: pageSize,
      },
    },
    enableRowSelection: true,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <>
      <div className="space-y-3">
        <Filterbar table={table} />
        <div className="relative overflow-hidden overflow-x-auto">
          <Table>
            <TableHead>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  className="border-y border-gray-200 dark:border-gray-800"
                >
                  {headerGroup.headers.map((header) => (
                    <TableHeaderCell
                      key={header.id}
                      className={cx(
                        "whitespace-nowrap py-1 text-sm sm:text-xs",
                        header.column.columnDef.meta?.className,
                      )}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                    </TableHeaderCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableBody>
              {surgeryOrders?.length ? (
                surgeryOrders?.map((row) => (
                  <TableRow
                    key={row.id}
                    onClick={() => {
                        // row.toggleSelected(!row.getIsSelected())
                        // placeholder
                      }
                    }
                    className="group select-none hover:bg-gray-50 hover:dark:bg-gray-900"
                  >
                    {Object.entries(row).map(([key, value]) => (
                      <div key={key} className="entry-div">
                        {/* Render the key and value of each entry */}
                        <strong>{key}: </strong> {value}
                      </div>
                    ))}
                    {/* {Object.keys(row).forEach((key, index) => (
                      <TableCell
                        key={key}
                        className={cx(
                          // @SEV: first: w-10 is hard value, but somehow you can really modify width of the checkbox value (e.g. w-6 does not make it smaller) -> what's the best formatting option here to make it a lean column?
                          "relative whitespace-nowrap py-1 text-gray-600 first:w-10 dark:text-gray-400",
                          // cell.column.columnDef.meta?.className,
                        )}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))} */}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <DataTableBulkEditor table={table} rowSelection={rowSelection} />
        </div>
        <DataTablePagination table={table} pageSize={pageSize} />
        </div>
    </>
  )
}
