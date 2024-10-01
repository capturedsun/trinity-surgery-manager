import { startSpan } from "@sentry/nextjs"
import { getOrganizationUseCase } from "@/src/application/use-cases/organization/get-organization.use-case"
import { updateOrganizationStatusUseCase } from "@/src/application/use-cases/organization/update-organization-status.use-case"
import { getOrganizationStatusesUseCase } from "@/src/application/use-cases/organization/get-organization-statuses.use-case"
import { createOrganizationStatusUseCase } from "@/src/application/use-cases/organization/create-organization-status.use-case"
import { Organization } from "@/src/entities/models/organization"
import { NotFoundError } from "@/src/entities/errors/common"
import { Status, CategorizedStatuses } from "@/src/entities/models/status"
import { stat } from "fs"

function presenterOrganization(organization: Organization) {
  return startSpan({ name: "getOrganization Presenter", op: "serialize" }, () => ({
    organization
  }))
}

function presenterStatus(status: Status) {
  return startSpan(
    { name: "modifyOrganizationStatuses Presenter", op: "serialize" },
    () => status
  )
}

function presenterStatuses(statuses: Status[]) {
  return startSpan(
    { name: "getOrganizationStatuses Presenter", op: "serialize" },
    () => statuses
  )
}

function presenterCategorizedStatuses(statuses: Status[]) {
  return startSpan(
    { name: "getOrganizationStatuses Presenter", op: "serialize" },
    () => {
      return statuses.reduce((acc: CategorizedStatuses, status: Status) => {
        const category = status.category || 'uncategorized'
        if (!acc[category]) acc[category] = []
        acc[category].push(status)
        return acc
      }, {})
    }
  )
}

export async function organizationController(organizationId: string): Promise<ReturnType<typeof presenterOrganization>> {
  return await startSpan(
    { name: "getOrganization Controller" },
    async () => {
      const organization = await getOrganizationUseCase(organizationId)
      if (!organization) {
        throw new NotFoundError("Organization not found")
      }
      return presenterOrganization(organization)
    }
  )
}

export async function modifyStatusController(updatedStatus: Partial<Status>): Promise<Status> {
  return startSpan({ name: "modifyOrganizationStatuses Controller" }, async () => {
    const modifiedStatus = await updateOrganizationStatusUseCase(updatedStatus)
    if (!modifiedStatus) {
      throw new NotFoundError("Failed to modify status")
    }
    return presenterStatus(modifiedStatus)
  })
}

export async function getStatusesController(sortByCategory: boolean): Promise<Status[] | CategorizedStatuses> {
  return await startSpan({ name: "getOrganizationStatuses Controller" }, async () => {
    const statuses = await getOrganizationStatusesUseCase()
    if (!statuses) {
      throw new NotFoundError("No statuses found")
    }
    if (sortByCategory) {
      return presenterCategorizedStatuses(statuses)
    } else {
      return presenterStatuses(statuses)
    }
  })
}

export async function createStatusController(status: Status): Promise<Status> {
  return await startSpan({ name: "createOrganizationStatus Controller" }, async () => {
    const newStatus = await createOrganizationStatusUseCase(status)
    if (!newStatus) {
      throw new NotFoundError("Failed to create status")
    }
    return presenterStatus(newStatus)
  })
}
