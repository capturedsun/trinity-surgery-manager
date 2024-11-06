import type { SurgeryOrderActivity } from "@/src/entities/models/surgery-order-activity"

export interface ISurgeryOrderActivityRepository {
  getSurgeryOrderActivities(): Promise<SurgeryOrderActivity[]>
  getSurgeryOrderActivity(id: string): Promise<SurgeryOrderActivity>
  addSurgeryOrderActivity(data: Partial<SurgeryOrderActivity>): Promise<SurgeryOrderActivity>
}
