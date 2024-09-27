import { startSpan } from "@sentry/nextjs"
import { getOrganizationUseCase } from "@/src/application/use-cases/organization/get-organization.use-case"
import { Organization } from "@/src/entities/models/organization"
import { NotFoundError } from "@/src/entities/errors/common"

function presenter(organization: Organization) {
  return startSpan({ name: "getOrganization Presenter", op: "serialize" }, () => ({
    organization
  }))
}

export async function organizationController(): Promise<ReturnType<typeof presenter>> {
  return await startSpan({ name: "getOrganization Controller" }, async () => {
    const organization = await getOrganizationUseCase()
    if (!organization) {
      throw new NotFoundError("Organization not found")
    }
    return presenter(organization)
  })
}
