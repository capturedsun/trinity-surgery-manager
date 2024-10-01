import { getInjection } from "@/di/container";
import { startSpan } from "@sentry/nextjs";
import type { Status, CategorizedStatuses } from "@/src/entities/models/status";


export async function getOrganizationStatusesUseCase(): Promise<Status[]> {
  return startSpan(
    { name: "getOrganizationStatuses UseCase", op: "function" },
    async () => {
      const organizationRepository = getInjection("IOrganizationRepository")
      const statuses = await organizationRepository.getStatuses()
      return statuses
    }
  )
}
