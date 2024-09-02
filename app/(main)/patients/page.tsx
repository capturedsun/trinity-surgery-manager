import { columns } from "@/app/components/ui/data-table/columns"
import { DataTable } from "@/app/components/ui/data-table/DataTable"
import { usage } from "@/app/data/data"

import { createClient } from '@/app/utils/supabase/server'
import { cookies } from 'next/headers'

export default async function Patients() {
  const db = createClient()

  const { data } = await db.from('surgery_orders').select()
  
  return (
    <>
      <h1 className="text-lg font-semibold text-gray-900 sm:text-xl dark:text-gray-50">
        Patients
      </h1>
      <div className="mt-4 sm:mt-6 lg:mt-10">
        <DataTable data={usage} columns={columns} />
      </div>
    </>
  )
}
