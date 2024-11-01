import type { Organization } from "@/src/entities/models/organization";
import type { Status } from "@/src/entities/models/status";
import type { User } from "@/src/entities/models/user";


export interface IOrganizationRepository {
  getOrganization(): Promise<{ organization: Organization, users: User[] }>;
  updateOrganization(input: Partial<Organization>): Promise<Organization>;

  getStatuses(): Promise<Status[]>;
  createStatus(input: Status): Promise<Status>;
  updateStatus(input: Partial<Status>): Promise<Status>;
  deleteStatus(id: number): Promise<void>;
}
