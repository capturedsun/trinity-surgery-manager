import { getInjection } from "@/di/container"
import { startSpan } from "@sentry/nextjs"
import type { SurgeryOrderActivity } from "@/src/entities/models/surgery-order-activity"

export async function getSurgeryOrderActivityUseCase(id: string): Promise<SurgeryOrderActivity> {
  return startSpan({ name: "getSurgeryOrderActivity UseCase", op: "function" }, async () => {
    const surgeryOrderActivityRepository = getInjection("ISurgeryOrderActivityRepository")
    return await surgeryOrderActivityRepository.getSurgeryOrderActivity(id)
  })
}
