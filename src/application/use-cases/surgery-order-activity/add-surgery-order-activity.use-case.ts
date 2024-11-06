import { getInjection } from "@/di/container"
import { startSpan } from "@sentry/nextjs"
import type { SurgeryOrderActivity } from "@/src/entities/models/surgery-order-activity"

export async function addSurgeryOrderActivityUseCase(data: Partial<SurgeryOrderActivity>): Promise<SurgeryOrderActivity> {
  return startSpan({ name: "addSurgeryOrderActivity UseCase", op: "function" }, async () => {
    const surgeryOrderActivityRepository = getInjection("ISurgeryOrderActivityRepository")
    return await surgeryOrderActivityRepository.addSurgeryOrderActivity(data)
  })
}
