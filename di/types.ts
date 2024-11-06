import { ITodosRepository } from "@/src/application/repositories/todos.repository.interface";
import { IUsersRepository } from "@/src/application/repositories/users.repository.interface";
import { IOrganizationRepository } from "@/src/application/repositories/organization.repository.interface";
import { IAuthenticationService } from "@/src/application/services/authentication.service.interface";
import { ISurgeryOrdersRepository } from "@/src/application/repositories/surgery-orders.repository.interface";
import { ISurgeryOrderActivityRepository } from "@/src/application/repositories/surgery-order-activity.repository.interface";

export const DI_SYMBOLS = {
  // Services
  IAuthenticationService: Symbol.for("IAuthenticationService"),

  // Repositories
  ITodosRepository: Symbol.for("ITodosRepository"),
  IUsersRepository: Symbol.for("IUsersRepository"),
  IOrganizationRepository: Symbol.for("IOrganizationRepository"),
  ISurgeryOrdersRepository: Symbol.for("ISurgeryOrdersRepository"),
  ISurgeryOrderActivityRepository: Symbol.for("ISurgeryOrderActivityRepository"),
};

export interface DI_RETURN_TYPES {
  // Services
  IAuthenticationService: IAuthenticationService;

  // Repositories
  ITodosRepository: ITodosRepository;
  IUsersRepository: IUsersRepository;
  IOrganizationRepository: IOrganizationRepository;
  ISurgeryOrdersRepository: ISurgeryOrdersRepository;
  ISurgeryOrderActivityRepository: ISurgeryOrderActivityRepository;
}
