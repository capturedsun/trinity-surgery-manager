import { injectable } from "inversify";
import { startSpan } from "@sentry/nextjs";
import { createClient } from "@/app/utils/supabase/server";
import { DatabaseOperationError } from "@/src/entities/errors/common";
import { IOrganizationRepository } from "@/src/application/repositories/organization.repository.interface";
import { Organization } from "@/src/entities/models/organization";
import { Status } from "@/src/entities/models/status";
import { User } from "@/src/entities/models/user";
import { UnauthenticatedError } from "@/src/entities/errors/auth";

@injectable()
export class OrganizationRepository implements IOrganizationRepository {
  async getOrganization(): Promise<{ organization: Organization, users: User[] }> {
    return await startSpan({ name: "OrganizationRepository > getOrganization" }, async () => {
      const supabase = createClient()
      const { data: authData, error: authError } = await supabase.auth.getUser()

      if (authError || !authData.user) {
        throw new UnauthenticatedError("Failed to authenticate user")
      }

      const { data: user, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', authData.user.id)
        .single()

      if (userError || !user) {
        throw new UnauthenticatedError("User not found in database")
      }

      const organizationCode = user.org_code

      const [{ data: organization, error }, { data: users, error: usersError }] = await Promise.all([
        supabase
          .from('organizations')
          .select('*')
          .single(),
        supabase
          .from('users')
          .select('*')
          .eq('org_code', organizationCode)
      ])

      console.log("test")

      if (error || !organization) {
        throw new DatabaseOperationError("Cannot get organization.");
      }

      if (usersError) {
        throw new DatabaseOperationError("Cannot get organization users.");
      }

      console.log({
        organization,
        users
      })

      return {
        organization,
        users: users || []
      }
    })
  }

  async updateOrganization(input: Partial<Organization>): Promise<Organization> {
    return await startSpan({ name: "OrganizationRepository > updateOrganization" }, async () => {
      const supabase = createClient()
      const { data: organization, error } = await supabase
        .from('organizations')
        .update(input)
        .eq('id', input.id)
        .single()
      if (error || !organization) {
        throw new DatabaseOperationError("Cannot update organization.");
      }
      return organization
    })
  }

  async getStatuses(): Promise<Status[]> {
    return await startSpan({ name: "OrganizationRepository > getStatuses" }, async () => {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('statuses')
        .select('*')
      if (error || !data) {
        throw new DatabaseOperationError("Cannot get statuses.");
      }
      return data
    })
  }

  async createStatus(input: Status): Promise<Status> {
    return await startSpan({ name: "OrganizationRepository > createStatus" }, async () => {
      const supabase = createClient()
      const { data: status, error } = await supabase
        .from('statuses')
        .insert(input)
        .select()
        .single()
      if (error || !status) {
        throw new DatabaseOperationError("Cannot create status.");
      }
      return status
    })
  }

  async updateStatus(input: Partial<Status>): Promise<Status> {
    return await startSpan({ name: "OrganizationRepository > updateStatus" }, async () => {
      const supabase = createClient()
      const { data: status, error } = await supabase
        .from('statuses')
        .update(input)
        .eq('id', input.id)
        .select()
        .single()
        
      if (error || !status) {
        console.log(error)
        throw new DatabaseOperationError("Cannot update status.");
      }
      return status
    })
  }

  async deleteStatus(id: number): Promise<void> {
    return await startSpan({ name: "OrganizationRepository > deleteStatus" }, async () => {
      const supabase = createClient()
      const { error } = await supabase
        .from('statuses')
        .delete()
        .eq('id', id)
      if (error) {
        throw new DatabaseOperationError("Cannot delete status.");
      }
    })
  }
}
