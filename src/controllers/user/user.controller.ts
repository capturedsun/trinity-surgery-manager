import { startSpan } from "@sentry/nextjs"
import { getUserUseCase } from "@/src/application/use-cases/user/get-user.use-case"
import { User } from "@/src/entities/models/user"
import { NotFoundError } from "@/src/entities/errors/common"

function presenter(user: User) {
  return startSpan({ name: "getUser Presenter", op: "serialize" }, () => ({
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    org_code: user.org_code,
    role: user.role,
  }))
}

export async function userController(): Promise<ReturnType<typeof presenter>> {
  return await startSpan({ name: "getUser Controller" }, async () => {
    const user = await getUserUseCase()
    if (!user) {
      throw new NotFoundError("User not found")
    }
    return presenter(user)
  })
}
