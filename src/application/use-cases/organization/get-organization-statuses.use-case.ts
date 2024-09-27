import { getInjection } from "@/di/container";
import { startSpan } from "@sentry/nextjs";
import type { Status } from "@/src/entities/models/status";

export function getOrganizationStatusesUseCase(organizationId: string): Promise<Status[]> {
  return startSpan({ name: "getOrganizationStatuses UseCase", op: "function" }, async () => {
    const organizationRepository = getInjection("IOrganizationRepository");
    return await organizationRepository.getStatuses(organizationId);
  });
}
