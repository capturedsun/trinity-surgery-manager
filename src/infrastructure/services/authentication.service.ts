import { DI_SYMBOLS } from "@/di/types";
import { type IUsersRepository } from "@/src/application/repositories/users.repository.interface";
import { IAuthenticationService } from "@/src/application/services/authentication.service.interface";
import { AuthenticationError, UnauthenticatedError } from "@/src/entities/errors/auth";
import { Session } from "@/src/entities/models/session";
import { User } from "@/src/entities/models/user";
import { createClient } from "@/src/infrastructure/supabase/server";
import { startSpan } from "@sentry/nextjs";
import { inject, injectable } from "inversify";

@injectable()
export class AuthenticationService implements IAuthenticationService {
  constructor(
    @inject(DI_SYMBOLS.IUsersRepository)
    private _usersRepository: IUsersRepository,
  ) { }

  async validateSession(sessionId: Session["id"]): Promise<{ user: User; session: Session }> {
    return await startSpan(
      { name: "AuthenticationService > validateSession" },
      async () => {
        const supabase = createClient();
        const { data, error } = await supabase.auth.getSession();

        if (error || !data.session || data.session.id !== sessionId) {
          throw new UnauthenticatedError("Unauthenticated");
        }

        const user = await this._usersRepository.getUser(data.session.user.id);

        if (!user) {
          throw new UnauthenticatedError("User doesn't exist");
        }

        return { user, session: data.session };
      },
    );
  }

  async createSession(
    input: { username: string; password: string },
  ): Promise<void> {
    return await startSpan(
      { name: "AuthenticationService > createSession" },
      async () => {
        const supabase = createClient()

        const { error } = await supabase.auth.signInWithPassword({
          email: input.username,
          password: input.password,
        });

        if (error) {
          throw new AuthenticationError("Invalid username or password");
        }
      },
    );
  }

  async invalidateSession(): Promise<void> {
    return await startSpan({ name: "supabase.invalidateSession", op: "function" }, () => {
      const supabase = createClient()
      supabase.auth.signOut()
    });
  }
}
