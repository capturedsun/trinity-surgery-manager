"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@/app/components/Table"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { cx } from "@/app/lib/utils"
import * as React from "react"
import { DataTableBulkEditor } from "./DataTableBulkEditor"
import { Filterbar } from "./DataTableFilterbar"
import { DataTablePagination } from "./DataTablePagination"
import { useSurgeryOrders } from "@/app/hooks/useSurgeryOrders"
import { ColumnDef, createColumnHelper } from "@tanstack/react-table"
import { DataTableColumnHeader } from "./DataTableColumnHeader"
import { StatusManager } from "@/app/components/Table/StatusManager"
import { DynamicCell } from "@/app/components/DynamicCell"
import { useStatuses } from "@/app/hooks/useStatuses"

interface DataTableProps<TData> {
  columns: ColumnDef<TData>[]
}

export function DataTable<TData>() {
  const { data: surgeryOrders } = useSurgeryOrders()
  const { data: statuses } = useStatuses(true)
  const pageSize = 20
  const [rowSelection, setRowSelection] = React.useState({})

  const columnHelper = createColumnHelper()
  const columns = [
    columnHelper.accessor("patient_name", {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Patient Name" />
      ),
      enableSorting: false,
      meta: {
        className: "text-left",
        displayName: "Patient Name",
      },
    }),
    columnHelper.accessor("comm_status", {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Comm Status" />
      ),
      enableSorting: true,
      meta: {
        className: "text-left",
        displayName: "Status",
      },
      cell: ({ row }) => {
        const statusID = row.getValue("comm_status");
        return statuses ? (
          <StatusManager statusID={statusID} statusCode={"comm-status"} statuses={statuses} />
        ) : (
          <span>Loading...</span> // Placeholder while statuses loads
        );
      },
    }),
    columnHelper.accessor("insurance_status", {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Insurance Status" />
      ),
      enableSorting: true,
      meta: {
        className: "text-left",
        displayName: "Status",
      },
      cell: ({ row }) => {
        const statusID = row.getValue("insurance_status");
        return statuses ? (
          <StatusManager statusID={statusID} statusCode={"insurance_status"} statuses={statuses} />
        ) : (
          <span>Loading...</span> // Placeholder while statuses loads
        );
      },
    }),
    columnHelper.accessor("clearance_status", {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Clearance Status" />
      ),
      enableSorting: true,
      meta: {
        className: "text-left",
        displayName: "Status",
      },
      cell: ({ row }) => {
        const statusID = row.getValue("clearance_status");
        return statuses ? (
          <StatusManager statusID={statusID} statusCode={"clearance_status"} statuses={statuses} />
        ) : (
          <span>Loading...</span> // Placeholder while statuses loads
        );
      },
    }),
    // FOR ONSITE QUICK ADD
    columnHelper.accessor("grouped_cell", {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Meta" />
      ),
      enableSorting: true,
      meta: {
        className: "text-left",
        displayName: "Grouped Cell",
      },
      cell: ({ row }) => {
        return (
          <div className="rounded-lg hover:bg-indigo-50 transition-colors p-1 px-2  cursor-pointer text-black">
            <DynamicCell row={row} />
          </div>
        );
      },
    }),
    columnHelper.accessor("insurance_auth", {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Insurance Auth" />
      ),
      enableSorting: false,
      meta: {
        className: "text-left",
        displayName: "Insurance Auth",
      },
    }),
    columnHelper.accessor("surgical_assistant", {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Surgical Assistant" />
      ),
      enableSorting: false,
      meta: {
        className: "text-left",
        displayName: "Assistant",
      },
    }),
  
    columnHelper.accessor("provider", {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Provider" />
      ),
      enableSorting: true,
      meta: {
        className: "text-left",
        displayName: "Provider",
      },
    }),
  
    columnHelper.accessor("other_location", {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Other Location" />
      ),
      enableSorting: false,
      meta: {
        className: "text-left",
        displayName: "Other Location",
      },
    }),
  
    columnHelper.accessor("surgery_date", {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Surgery Date" />
      ),
      enableSorting: true,
      meta: {
        className: "tabular-nums",
        displayName: "Surgery Date",
      },
    }),
  
    columnHelper.accessor("pre_op_labs", {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Pre-Op Labs" />
      ),
      enableSorting: false,
      meta: {
        className: "text-left",
        displayName: "Pre-Op Labs",
      },
    }),
  
    columnHelper.accessor("clearance", {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Clearance" />
      ),
      enableSorting: false,
      meta: {
        className: "text-left",
        displayName: "Clearance",
      },
    }),
  
    columnHelper.accessor("pre_op_visit_dme", {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Pre-Op Visit DME" />
      ),
      enableSorting: false,
      meta: {
        className: "text-left",
        displayName: "Pre-Op Visit DME",
      },
    }),
  
    columnHelper.accessor("post_op_visit", {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Post-Op Visit" />
      ),
      enableSorting: false,
      meta: {
        className: "text-left",
        displayName: "Post-Op Visit",
      },
    }),
  
    columnHelper.accessor("first_assist", {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="First Assist" />
      ),
      enableSorting: false,
      meta: {
        className: "text-left",
        displayName: "First Assist",
      },
    }),
  
    columnHelper.accessor("hardware_rep", {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Hardware Rep" />
      ),
      enableSorting: false,
      meta: {
        className: "text-left",
        displayName: "Hardware Rep",
      },
    }),
  
    columnHelper.accessor("patient_cost", {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Patient Cost" />
      ),
      enableSorting: true,
      meta: {
        className: "text-right",
        displayName: "Cost",
      },
    }),
  
    columnHelper.accessor("surgery_orders_faxed", {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Orders Faxed" />
      ),
      enableSorting: false,
      meta: {
        className: "text-center",
        displayName: "Faxed",
      },
      cell: ({ row }) => (
        <span>{row.getValue("surgery_orders_faxed") ? "Yes" : "No"}</span>
      ),
    }),
  
    columnHelper.accessor("surgery_instructions", {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Instructions" />
      ),
      enableSorting: false,
      meta: {
        className: "text-left",
        displayName: "Instructions",
      },
    }),
  
    columnHelper.accessor("notes", {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Notes" />
      ),
      enableSorting: false,
      meta: {
        className: "text-left",
        displayName: "Notes",
      },
    }),
  ] as ColumnDef<SurgeryOrder>[]

  const table = useReactTable({
    data: surgeryOrders as TData[] || [],
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
            {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    onClick={() => {
                        // row.toggleSelected(!row.getIsSelected())
                        // placeholder
                      }
                    }
                    className="group select-none hover:bg-gray-50 hover:dark:bg-gray-900"
                  >
                    {row.getVisibleCells().map((cell, index) => (
                      <TableCell
                        key={cell.id}
                        className={cx(
                          row.getIsSelected()
                            ? "bg-gray-50 dark:bg-gray-900"
                            : "",
                          // @SEV: first: w-10 is hard value, but somehow you can really modify width of the checkbox value (e.g. w-6 does not make it smaller) -> what's the best formatting option here to make it a lean column?
                          "relative whitespace-nowrap py-1 text-gray-600 first:w-10 dark:text-gray-400",
                          cell.column.columnDef.meta?.className,
                        )}
                      >
                        {index === 0 && row.getIsSelected() && (
                          <div className="absolute inset-y-0 left-0 w-0.5 bg-indigo-600 dark:bg-indigo-500" />
                        )}
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
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
