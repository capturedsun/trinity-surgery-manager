import { injectable } from "inversify";
import { startSpan } from "@sentry/nextjs";
import { createClient } from "@/app/utils/supabase/server";
import { DatabaseOperationError } from "@/src/entities/errors/common";
import { IOrganizationRepository } from "@/src/application/repositories/organization.repository.interface";
import { Organization } from "@/src/entities/models/organization";

@injectable()
export class OrganizationRepository implements IOrganizationRepository {
  async getOrganization(organizationId: string): Promise<Organization | undefined> {
    return await startSpan({ name: "OrganizationRepository > getOrganization" }, async () => {
      const supabase = createClient()
      const { data: organization, error } = await supabase
        .from('organizations')
        .select('*')
        .eq('id', organizationId)
        .single()
      if (error || !organization) {
        throw new DatabaseOperationError("Cannot get organization.");
      }
      return organization
    })
  }
}