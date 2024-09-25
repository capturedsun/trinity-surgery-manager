import { startSpan } from "@sentry/nextjs";

import { getInjection } from "@/di/container";

export async function signOutUseCase(): Promise<void> {
  return startSpan({ name: "signOut Use Case", op: "function" }, async () => {
    const authenticationService = getInjection("IAuthenticationService");
    return await authenticationService.invalidateSession();
  });
}
