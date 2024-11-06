import { startSpan } from "@sentry/nextjs"
import { getOrganizationUseCase } from "@/src/application/use-cases/organization/get-organization.use-case"
import { updateOrganizationStatusUseCase } from "@/src/application/use-cases/organization/update-organization-status.use-case"
import { createOrganizationStatusUseCase } from "@/src/application/use-cases/organization/create-organization-status.use-case"
import { Organization } from "@/src/entities/models/organization"
import { NotFoundError } from "@/src/entities/errors/common"
import { SurgeryOrderActivity } from "@/src/entities/models/surgery-order-activity"
import { getSurgeryOrdersActivityUseCase } from "@/src/application/use-cases/surgery-order-activity/get-surgery-orders-activity.use-case"

function presenter(surgeryOrdersActivity: SurgeryOrderActivity[]): SurgeryOrderActivity[] {
  return surgeryOrdersActivity
}
export const surgeryOrdersActivityController = {
  async getAll(): Promise<ReturnType<typeof presenter>> {
    return await startSpan(
      { name: "getSurgeryOrder Activity Controller" },
      async () => {
        const surgeryOrdersActivity = await getSurgeryOrdersActivityUseCase()
        if (!surgeryOrdersActivity) {
          throw new NotFoundError("Surgery orders activity not found")
        }
        return presenter(surgeryOrdersActivity)
      }
    )
  },

  async getSingle(id: string): Promise<SurgeryOrderActivity> {
    return await startSpan(
      { name: "getSingleSurgeryOrderActivity Controller" },
      async () => {
        const activity = await getSurgeryOrdersActivityUseCase(id)
        if (!activity) {
          throw new NotFoundError(`Surgery order activity with id ${id} not found`)
        }
        return activity
      }
    )
  }
}