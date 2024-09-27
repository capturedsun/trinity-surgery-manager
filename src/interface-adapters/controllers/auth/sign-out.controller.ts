import { signOutUseCase } from "@/src/application/use-cases/auth/sign-out.use-case";
import { startSpan } from "@sentry/nextjs";

export async function signOutController(): Promise<void> {
  return await startSpan({ name: "signOut Controller" }, async () => {
    return await signOutUseCase();
  });
}
