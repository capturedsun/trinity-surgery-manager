import type { SurgeryOrder } from "@/src/entities/models/surgery-order"

export interface ISurgeryOrdersRepository {
  getSurgeryOrders(): Promise<SurgeryOrder[]>
  updateSurgeryOrder(data: Partial<SurgeryOrder>): Promise<SurgeryOrder>
}
