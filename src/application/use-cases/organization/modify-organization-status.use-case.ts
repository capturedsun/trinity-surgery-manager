import { getInjection } from "@/di/container"
import { startSpan } from "@sentry/nextjs"
import type { Status } from "@/src/entities/models/status"

export async function modifyOrganizationStatusUseCase(id: number, statusUpdates: Partial<Status>): Promise<Status> {
  return startSpan(
    { name: "modifyOrganizationStatus UseCase", op: "function" },
    async () => {
      const organizationRepository = getInjection("IOrganizationRepository")

      const updatedStatuses = await organizationRepository.updateStatus(id, statusUpdates)
      
      return updatedStatuses
    }
  )
}
