import { columns } from "@/app/components/ui/data-table/columns"
import { DataTable } from "@/app/components/ui/data-table/DataTable"
import { SurgeryOrderMenu } from "@/app/components/ui/patients/SurgeryOrderMenu"

export default async function Patients() {
  return (
    <>
    <div className="flex justify-between gap-4">
      <h1 className="title flex items-center gap-2">
        <div className="rounded-lg px-1">Surgery Orders</div>
      </h1>
      <SurgeryOrderMenu/>
    </div>
      <div className="mt-4 sm:mt-6 lg:mt-10">
        <DataTable columns={columns} />
      </div>
    </>
  )
}
