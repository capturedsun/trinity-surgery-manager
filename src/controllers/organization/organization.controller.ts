import { startSpan } from "@sentry/nextjs"
import { getOrganizationUseCase } from "@/src/application/use-cases/organization/get-organization.use-case"
import { updateOrganizationStatusUseCase } from "@/src/application/use-cases/organization/update-organization-status.use-case"
import { getOrganizationStatusesUseCase } from "@/src/application/use-cases/organization/get-organization-statuses.use-case"
import { createOrganizationStatusUseCase } from "@/src/application/use-cases/organization/create-organization-status.use-case"
import { Organization } from "@/src/entities/models/organization"
import { NotFoundError } from "@/src/entities/errors/common"
import { Status, CategorizedStatuses } from "@/src/entities/models/status"
import { User } from "@/src/entities/models/user"

function camelCaseLabel(status: Status): Status {
  return {
    ...status,
    name: status.label.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) =>
      index === 0 ? match.toLowerCase() : match.toUpperCase()
    ).replace(/\s+/g, '')
  }
}

function presenterOrganization(organization: Organization, users: User[]) {
  return startSpan({ name: "getOrganization Presenter", op: "serialize" }, () => ({
    organization,
    users
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

export async function organizationController(): Promise<ReturnType<typeof presenterOrganization>> {
  return await startSpan(
    { name: "getOrganization Controller" },
    async () => {
      const organization = await getOrganizationUseCase()
      if (!organization) {
        throw new NotFoundError("Organization not found")
      }
      if (!organization.users) {
        throw new NotFoundError("Organization users not found")
      }
      return presenterOrganization(organization.organization, organization.users)
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
    const newStatus = await createOrganizationStatusUseCase(camelCaseLabel(status))
    if (!newStatus) {
      throw new NotFoundError("Failed to create status")
    }
    return presenterStatus(newStatus)
  })
}