import { getInjection } from "@/di/container"
import { startSpan } from "@sentry/nextjs"
import { Status } from "@/src/entities/models/status"

export function createOrganizationStatusUseCase(newStatus: Status): Promise<Status> {
  return startSpan({ name: "createOrganizationStatus UseCase", op: "function" }, async () => {
    const organizationRepository = getInjection("IOrganizationRepository")
    return await organizationRepository.createStatus(newStatus)
  })
}
