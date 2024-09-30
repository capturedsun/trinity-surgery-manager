import { getInjection } from "@/di/container";
import { startSpan } from "@sentry/nextjs";
import type { Status, CategorizedStatuses } from "@/src/entities/models/status";


export async function getOrganizationStatusesUseCase(): Promise<CategorizedStatuses> {
  return startSpan(
    { name: "getOrganizationStatuses UseCase", op: "function" },
    async () => {
      const organizationRepository = getInjection("IOrganizationRepository")
      const statuses = await organizationRepository.getStatuses()
      
      const categorizedStatuses = statuses.reduce((acc: CategorizedStatuses, status: Status) => {
        const category = status.category || 'uncategorized'
        if (!acc[category]) acc[category] = []
        acc[category].push(status)
        return acc
      }, {})
      console.log(categorizedStatuses)
      return categorizedStatuses
    }
  )
}
