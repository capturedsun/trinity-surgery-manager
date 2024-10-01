import { getInjection } from "@/di/container";
import { startSpan } from "@sentry/nextjs";
import { Status } from "@/src/entities/models/status";

export function updateOrganizationStatusUseCase(updatedStatus: Partial<Status>): Promise<Status> {
  return startSpan({ name: "updateOrganizationStatus UseCase", op: "function" }, async () => {
    const organizationRepository = getInjection("IOrganizationRepository");
    const newStatus = await organizationRepository.updateStatus(updatedStatus);
    return newStatus;
  });
}
