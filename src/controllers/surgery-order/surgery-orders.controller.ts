import { startSpan } from "@sentry/nextjs"
import { getOrganizationUseCase } from "@/src/application/use-cases/organization/get-organization.use-case"
import { updateOrganizationStatusUseCase } from "@/src/application/use-cases/organization/update-organization-status.use-case"
import { createOrganizationStatusUseCase } from "@/src/application/use-cases/organization/create-organization-status.use-case"
import { Organization } from "@/src/entities/models/organization"
import { NotFoundError } from "@/src/entities/errors/common"
import { Status, CategorizedStatuses } from "@/src/entities/models/status"
import { SurgeryOrder } from "@/src/entities/models/surgery-order"
import { getSurgeryOrdersUseCase } from "@/src/application/use-cases/surgery-orders/get-surgery-orders.use-case"

function presenter(surgeryOrders: SurgeryOrder[]): SurgeryOrder[] {
  return surgeryOrders
}

export async function surgeryOrdersController(): Promise<ReturnType<typeof presenter>> {
  return await startSpan(
    { name: "getSurgeryOrder Controller" },
    async () => {
      const surgeryOrders = await getSurgeryOrdersUseCase()
      if (!surgeryOrders) {
        throw new NotFoundError("Surgery orders not found")
      }
      return presenter(surgeryOrders)
    }
  )
}