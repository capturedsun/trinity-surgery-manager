import { getInjection } from "@/di/container";
import { startSpan } from "@sentry/nextjs";

export function updateOrganizationStatusUseCase(organizationId: string, statusId: string): Promise<Organization> {
  return startSpan({ name: "updateOrganizationStatus UseCase", op: "function" }, async () => {
    const organizationRepository = getInjection("IOrganizationRepository");
    return await organizationRepository.updateStatus(organizationId, statusId);
  });
}
