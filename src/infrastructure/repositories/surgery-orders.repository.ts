import { injectable } from "inversify"
import { startSpan } from "@sentry/nextjs"
import { createClient } from "@/app/utils/supabase/server"
import { DatabaseOperationError } from "@/src/entities/errors/common"
import { ISurgeryOrdersRepository } from "@/src/application/repositories/surgery-orders.repository.interface"
import { SurgeryOrder } from "@/src/entities/models/surgery-order"

@injectable()
export class SurgeryOrdersRepository implements ISurgeryOrdersRepository {
  async getSurgeryOrders(): Promise<SurgeryOrder[]> {
    return await startSpan({ name: "SurgeryOrdersRepository > getSurgeryOrders" }, async () => {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('surgery_orders')
        .select('*')
        .limit(100)

      if (error || !data) {
        throw new DatabaseOperationError("Cannot get surgery orders.")
      }

      return data
    })
  }

  async updateSurgeryOrder(input: Partial<SurgeryOrder>): Promise<SurgeryOrder> {
    return await startSpan({ name: "SurgeryOrdersRepository > updateSurgeryOrder" }, async () => {
      const supabase = createClient()
      const { data: surgeryOrder, error } = await supabase
        .from('surgery_orders')
        .update(input)
        .eq('id', input.id)
        .select()
        .single()
        
      if (error || !surgeryOrder) {
        throw new DatabaseOperationError("Cannot update surgery order.")
      }

      return surgeryOrder
    })
  }
}
