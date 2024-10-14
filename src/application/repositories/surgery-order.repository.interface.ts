import type { SurgeryOrder } from "@/src/entities/models/surgery-order"

export interface ISurgeryOrderRepository {
  createSurgeryOrder(surgeryOrder: SurgeryOrder): Promise<SurgeryOrder>
  getSurgeryOrder(id: number): Promise<SurgeryOrder | undefined>
  getSurgeryOrdersForUser(userId: string): Promise<SurgeryOrder[]>
  updateSurgeryOrder(id: number, input: Partial<SurgeryOrder>): Promise<SurgeryOrder>
}
