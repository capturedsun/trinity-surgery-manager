import { getInjection } from "@/di/container";
import { startSpan } from "@sentry/nextjs";
import type { SurgeryOrder } from "@/src/entities/models/surgery-order";

export async function getSurgeryOrderUseCase(id: string): Promise<SurgeryOrder> {
  return startSpan({ name: "getSurgeryOrder UseCase", op: "function" }, async () => {
    const surgeryOrdersRepository = getInjection("ISurgeryOrdersRepository");
    return await surgeryOrdersRepository.getSurgeryOrder(id);
  });
}
