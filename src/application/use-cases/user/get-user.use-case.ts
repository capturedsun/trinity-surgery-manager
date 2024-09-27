import { getInjection } from "@/di/container";
import { startSpan } from "@sentry/nextjs";
import type { User } from "@/src/entities/models/user";

export async function getUserUseCase(): Promise<User | undefined> {
  return startSpan(
    { name: "getUser UseCase", op: "function" },
    async () => {
      const usersRepository = getInjection("IUsersRepository");
      return await usersRepository.getUser();
    },
  );
}
