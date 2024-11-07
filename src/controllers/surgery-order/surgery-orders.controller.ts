import { startSpan } from "@sentry/nextjs"
import { getOrganizationUseCase } from "@/src/application/use-cases/organization/get-organization.use-case"
import { updateOrganizationStatusUseCase } from "@/src/application/use-cases/organization/update-organization-status.use-case"
import { createOrganizationStatusUseCase } from "@/src/application/use-cases/organization/create-organization-status.use-case"
import { Organization } from "@/src/entities/models/organization"
import { NotFoundError } from "@/src/entities/errors/common"
import { Status, CategorizedStatuses } from "@/src/entities/models/status"
import { SurgeryOrder } from "@/src/entities/models/surgery-order"
import { getSurgeryOrdersUseCase } from "@/src/application/use-cases/surgery-orders/get-surgery-orders.use-case"
import { getSurgeryOrderUseCase } from "@/src/application/use-cases/surgery-orders/get-surgery-order.use-case"

function presenter(surgeryOrders: SurgeryOrder[]): SurgeryOrder[] {
  return surgeryOrders
}

export const surgeryOrdersController = {
  async getAll(): Promise<ReturnType<typeof presenter>> {
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
  },

  async get(id: string): Promise<SurgeryOrder> {
    return await startSpan(
      { name: "getSurgeryOrder Controller" },
      async () => {
        const surgeryOrder = await getSurgeryOrderUseCase(id)
        if (!surgeryOrder) {
          throw new NotFoundError("Surgery order not found")
        }
        return surgeryOrder
      }
    )
  },

  async create(data: Partial<SurgeryOrder>): Promise<SurgeryOrder> {
    return await startSpan(
      { name: "createSurgeryOrder Controller" },
      async () => {
        // TODO: Implement create surgery order use case
        throw new Error("Not implemented")
      }
    )
  },

  async update(data: Partial<SurgeryOrder>): Promise<SurgeryOrder> {
    return await startSpan(
      { name: "updateSurgeryOrder Controller" },
      async () => {
        // TODO: Implement update surgery order use case
        throw new Error("Not implemented") 
      }
    )
  },

  async delete(id: string): Promise<void> {
    return await startSpan(
      { name: "deleteSurgeryOrder Controller" },
      async () => {
        // TODO: Implement delete surgery order use case
        throw new Error("Not implemented")
      }
    )
  }
}