import type { Organization } from "@/src/entities/models/organization";
import type { Status } from "@/src/entities/models/status";


export interface IOrganizationRepository {
  getOrganization(organizationId: string): Promise<Organization>;
  updateOrganization(input: Partial<Organization>): Promise<Organization>;

  getStatuses(): Promise<Status[]>;
  createStatus(input: Status): Promise<Status>;
  updateStatus(input: Partial<Status>): Promise<Status>;
  deleteStatus(id: number): Promise<void>;
}
