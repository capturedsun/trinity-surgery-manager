import { columns } from "@/app/components/ui/data-table/columns"
import { DataTable } from "@/app/components/ui/data-table/DataTable"
import { usage } from "@/app/data/data"

export default async function Patients() {
  return (
    <>
      <h1 className="title">
        Patients
      </h1>
      <div className="mt-4 sm:mt-6 lg:mt-10">
        <DataTable columns={columns} />
      </div>
      {/* <Notice/> */}
    </>
  )
}
