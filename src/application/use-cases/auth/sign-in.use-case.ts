import { getInjection } from "@/di/container";
import { startSpan } from "@sentry/nextjs";

export async function signInUseCase(input: {
  username: string;
  password: string;
}): Promise<void> {
  return startSpan({ name: "signIn Use Case", op: "function" }, async () => {
    const authenticationService = getInjection("IAuthenticationService");
    await authenticationService.createSession(input);
  });
}
