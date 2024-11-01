import { getInjection } from "@/di/container";
import { startSpan } from "@sentry/nextjs";
import type { Organization } from "@/src/entities/models/organization";
import type { User } from "@/src/entities/models/user";

export function getOrganizationUseCase(): Promise<{ organization: Organization, users: User[] }> {
  return startSpan(
    { name: "getOrganization UseCase", op: "function" },
    async () => {
      const organizationRepository = getInjection("IOrganizationRepository");

      return await organizationRepository.getOrganization();
    },
  );
}
