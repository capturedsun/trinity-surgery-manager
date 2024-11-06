import { injectable } from "inversify"
import { startSpan } from "@sentry/nextjs"
import { createClient } from "@/app/utils/supabase/server"
import { DatabaseOperationError } from "@/src/entities/errors/common"
import { ISurgeryOrderActivityRepository } from "@/src/application/repositories/surgery-order-activity.repository.interface"
import { SurgeryOrderActivity } from "@/src/entities/models/surgery-order-activity"

@injectable()
export class SurgeryOrderActivityRepository implements ISurgeryOrderActivityRepository {
  async getSurgeryOrderActivities(): Promise<SurgeryOrderActivity[]> {
    return await startSpan({ name: "SurgeryOrderActivityRepository > getSurgeryOrderActivities" }, async () => {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('surgery_order_activity')
        .select('*')
        .limit(100)

      if (error || !data) {
        throw new DatabaseOperationError("Cannot get surgery order activities.")
      }

      return data
    })
  }

  async getSurgeryOrderActivity(id: string): Promise<SurgeryOrderActivity> {
    return await startSpan({ name: "SurgeryOrderActivityRepository > getSurgeryOrderActivity" }, async () => {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('surgery_order_activity')
        .select('*')
        .eq('id', id)
        .limit(10)
        .single()

      if (error || !data) {
        throw new DatabaseOperationError("Cannot get surgery order activity.")
      }

      return data
    })
  }

  async addSurgeryOrderActivity(data: Partial<SurgeryOrderActivity>): Promise<SurgeryOrderActivity> {
    return await startSpan({ name: "SurgeryOrderActivityRepository > addSurgeryOrderActivity" }, async () => {
      const supabase = createClient()
      const { data: activity, error } = await supabase
        .from('surgery_order_activity')
        .insert(data)
        .select()
        .single()

      if (error || !activity) {
        throw new DatabaseOperationError("Cannot add surgery order activity.")
      }

      return activity
    })
  }
}
