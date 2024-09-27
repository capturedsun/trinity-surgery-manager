import { startSpan } from "@sentry/nextjs"
import { getOrganizationStatusesUseCase } from "@/src/application/use-cases/organization/get-organization-statuses.use-case"
import { Status } from "@/src/entities/models/status"
import { NotFoundError } from "@/src/entities/errors/common"

function presenter(statuses: Status[]) {
  return startSpan({ name: "getOrganizationStatuses Presenter", op: "serialize" }, () => ({
    statuses
  }))
}

export async function statusesController(): Promise<ReturnType<typeof presenter>> {
  return await startSpan({ name: "getOrganizationStatuses Controller" }, async () => {
    const statuses = await getOrganizationStatusesUseCase()
    if (!statuses) {
      throw new NotFoundError("Statuses not found")
    }
    return presenter(statuses)
  })
}
