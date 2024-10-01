import { startSpan } from "@sentry/nextjs"
import { getOrganizationUseCase } from "@/src/application/use-cases/organization/get-organization.use-case"
import { updateOrganizationStatusUseCase } from "@/src/application/use-cases/organization/update-organization-status.use-case"
import { getOrganizationStatusesUseCase } from "@/src/application/use-cases/organization/get-organization-statuses.use-case"
// import { createOrganizationStatusUseCase } from "@/src/application/use-cases/organization/create-organization-status.use-case"
import { Organization } from "@/src/entities/models/organization"
import { NotFoundError } from "@/src/entities/errors/common"
import { Status, CategorizedStatuses } from "@/src/entities/models/status"

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

function presenterStatuses(statuses: CategorizedStatuses) {
  return startSpan(
    { name: "getOrganizationStatuses Presenter", op: "serialize" },
    () => statuses
  )
}

export async function organizationController(): Promise<ReturnType<typeof presenterOrganization>> {
  return await startSpan({ name: "getOrganization Controller" }, async () => {
    const organization = await getOrganizationUseCase()
    if (!organization) {
      throw new NotFoundError("Organization not found")
    }
    return presenterOrganization(organization)
  })
}

export async function modifyStatusController(updatedStatus: Partial<Status>[]): Promise<Status> {
  return await startSpan({ name: "modifyOrganizationStatuses Controller" }, async () => {
    const updatedStatuses = await updateOrganizationStatusUseCase(updatedStatus)
    if (!updatedStatuses) {
      throw new NotFoundError("Failed to modify statuses")
    }
    return presenterStatus(updatedStatuses)
  })
}

export async function getStatusesController(): Promise<CategorizedStatuses> {
  return await startSpan({ name: "getOrganizationStatuses Controller" }, async () => {
    const statuses = await getOrganizationStatusesUseCase()
    if (!statuses) {
      throw new NotFoundError("No statuses found")
    }
    return presenterStatus(statuses)
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
