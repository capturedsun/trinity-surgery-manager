import { columns } from "@/app/components/ui/data-table/columns"
import { DataTable } from "@/app/components/ui/data-table/DataTable"
import { usage } from "@/app/data/data"

import { createClient } from '@/src/infrastructure/supabase/server'

export default async function Patients() {
  const db = createClient()

  const { data } = await db.from('surgery_orders').select()

  return (
    <>
      <h1 className="title">
        Patients
      </h1>
      <div className="mt-4 sm:mt-6 lg:mt-10">
        <DataTable data={usage} columns={columns} />
      </div>
    </>
  )
}
