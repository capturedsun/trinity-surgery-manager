import { getInjection } from "@/di/container";
import { startSpan } from "@sentry/nextjs";
import type { SurgeryOrder } from "@/src/entities/models/surgery-order";

export async function getSurgeryOrdersUseCase(): Promise<SurgeryOrder[]> {
  return startSpan({ name: "getSurgeryOrders UseCase", op: "function" }, async () => {
    const surgeryOrdersRepository = getInjection("ISurgeryOrdersRepository");
    return await surgeryOrdersRepository.getSurgeryOrders();
  });
}
