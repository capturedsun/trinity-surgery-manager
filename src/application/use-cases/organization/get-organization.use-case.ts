import { getInjection } from "@/di/container";
import { startSpan } from "@sentry/nextjs";
import type { Organization } from "@/src/entities/models/organization";

export function getOrganizationUseCase(organizationId: string): Promise<Organization> {
  return startSpan(
    { name: "getOrganization UseCase", op: "function" },
    async () => {
      const organizationRepository = getInjection("IOrganizationRepository");

      return await organizationRepository.getOrganization(organizationId);
    },
  );
}
