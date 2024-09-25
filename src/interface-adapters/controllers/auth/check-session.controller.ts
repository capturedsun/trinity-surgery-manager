import { checkSessionUseCase } from "@/src/application/use-cases/auth/check-session.use-case";
import { User } from "@/src/entities/models/user";
import { startSpan } from "@sentry/nextjs";

export async function checkSessionController(): Promise<{ user: User; }> {
  return await startSpan({ name: "checkSession Controller" }, async () => {
    return await checkSessionUseCase();
  });
}