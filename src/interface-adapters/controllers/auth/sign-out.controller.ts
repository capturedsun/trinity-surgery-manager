import { startSpan } from "@sentry/nextjs";
import { getInjection } from "@/di/container";
import { signOutUseCase } from "@/src/application/use-cases/auth/sign-out.use-case";
import { Cookie } from "@/src/entities/models/cookie";
import { InputParseError } from "@/src/entities/errors/common";

export async function signOutController(): Promise<void> {
  return await startSpan({ name: "signOut Controller" }, async () => {
    const authenticationService = getInjection("IAuthenticationService");
    return await signOutUseCase();
 });
}
