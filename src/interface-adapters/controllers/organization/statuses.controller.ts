import { startSpan } from "@sentry/nextjs"
import { getOrganizationStatusesUseCase } from "@/src/application/use-cases/organization/get-organization-statuses.use-case"
import { CategorizedStatuses } from "@/src/entities/models/status"
import { NotFoundError } from "@/src/entities/errors/common"

function presenter(statuses: CategorizedStatuses) {
  return startSpan({ name: "getOrganizationStatuses Presenter", op: "serialize" }, () => statuses)
}

export async function statusesController(): Promise<CategorizedStatuses> {
  return await startSpan({ name: "getOrganizationStatuses Controller" }, async () => {
    const statuses = await getOrganizationStatusesUseCase()
    if (!statuses) {
      throw new NotFoundError("No statuses found")
    }
    return presenter(statuses)
  })
}
