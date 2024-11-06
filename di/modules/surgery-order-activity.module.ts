import { ContainerModule, interfaces } from "inversify"

import { ISurgeryOrderActivityRepository } from "@/src/application/repositories/surgery-order-activity.repository.interface"
import { SurgeryOrderActivityRepository } from "@/src/infrastructure/repositories/surgery-order-activity.repository"

import { DI_SYMBOLS } from "../types"

const initializeModule = (bind: interfaces.Bind) => {
  bind<ISurgeryOrderActivityRepository>(DI_SYMBOLS.ISurgeryOrderActivityRepository).to(SurgeryOrderActivityRepository)
}

export const SurgeryOrderActivityModule = new ContainerModule(initializeModule)
