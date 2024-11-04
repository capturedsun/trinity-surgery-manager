import { ContainerModule, interfaces } from "inversify"

import { ISurgeryOrdersRepository } from "@/src/application/repositories/surgery-orders.repository.interface"
import { SurgeryOrdersRepository } from "@/src/infrastructure/repositories/surgery-orders.repository"

import { DI_SYMBOLS } from "../types"

const initializeModule = (bind: interfaces.Bind) => {
  bind<ISurgeryOrdersRepository>(DI_SYMBOLS.ISurgeryOrdersRepository).to(SurgeryOrdersRepository)
}

export const SurgeryOrdersModule = new ContainerModule(initializeModule)
