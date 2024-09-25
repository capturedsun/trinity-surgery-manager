import { getInjection } from "@/di/container"
import { AuthenticationError } from "@/src/entities/errors/auth"
import { User } from "@/src/entities/models/user"
import { startSpan } from "@sentry/nextjs"

export function checkSessionUseCase(): Promise<{ user: User }> {
  return startSpan({ name: "checkSession Use Case", op: "function" }, async () => {
    const authenticationService = getInjection("IAuthenticationService")

    const result = await authenticationService.validateSession()

    if (!result) {
      throw new AuthenticationError("Invalid session. Did you forget to log in or something?")
    }

    return result
  })
}
