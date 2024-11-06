"use client"
import { DynamicCell } from "@/app/components/DynamicCell"
import { StatusManager } from "@/app/components/Table/StatusManager"

import { SurgeryOrder } from "@/src/entities/models/surgery-order"
import { ColumnDef, createColumnHelper } from "@tanstack/react-table"
import { DataTableColumnHeader } from "./DataTableColumnHeader"
import { DataTableRowActions } from "./DataTableRowActions"

const columnHelper = createColumnHelper()

export const columns = [
  // columnHelper.display({
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected()
  //           ? true
  //           : table.getIsSomeRowsSelected()
  //             ? "indeterminate"
  //             : false
  //       }
  //       onCheckedChange={() => table.toggleAllPageRowsSelected()}
  //       className="translate-y-0.5"
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={() => row.toggleSelected()}
  //       className="translate-y-0.5"
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  //   meta: {
  //     displayName: "Select",
  //   },
  // }),
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
  // columnHelper.accessor("patient_name", {
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Patient Name" />
  //   ),
  //   enableSorting: false,
  //   meta: {
  //     className: "text-left",
  //     displayName: "Patient Name",
  //   },
  // }),
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
      return (
        <StatusManager statusID={statusID as string} statusCode={"comm-status"}/>
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
      return (
        <StatusManager statusID={statusID as string} statusCode={"insurance-status"}/>
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
      return (
        <StatusManager statusID={statusID as string} statusCode={"clearance-status"}/>
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
  // columnHelper.display({
  //   id: "edit",
  //   header: "Edit",
  //   enableSorting: false,
  //   enableHiding: false,
  //   meta: {
  //     className: "text-right",
  //     displayName: "Edit",
  //   },
  //   cell: ({ row }) => <DataTableRowActions row={row} />,
  // }),
] as ColumnDef<SurgeryOrder>[]
