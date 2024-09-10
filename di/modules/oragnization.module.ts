// import { ContainerModule, interfaces } from "inversify"

// import { IOrganizationRepository } from "@/src/application/repositories/organization.repository.interface"
// import { OrganizationRepository } from "@/src/infrastructure/repositories/organization.repository"
// import { MockOrganizationRepository } from "@/src/infrastructure/repositories/organization.repository.mock"

// import { DI_SYMBOLS } from "../types"

// const initializeModule = (bind: interfaces.Bind) => {
//   if (process.env.NODE_ENV === "test") {
//     bind<IOrganizationRepository>(DI_SYMBOLS.IOrganizationRepository).to(MockOrganizationRepository)
//   } else {
//     bind<IOrganizationRepository>(DI_SYMBOLS.IOrganizationRepository).to(OrganizationRepository)
//   }
// }

// export const OrganizationModule = new ContainerModule(initializeModule)
