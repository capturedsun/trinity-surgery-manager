import { startSpan } from "@sentry/nextjs";
import { inject, injectable } from "inversify";
import { DI_SYMBOLS } from "@/di/types";
// import { supabase } 
import { type IUsersRepository } from "@/src/application/repositories/users.repository.interface";
import { IAuthenticationService } from "@/src/application/services/authentication.service.interface";
import { UnauthenticatedError } from "@/src/entities/errors/auth";
import { Cookie } from "@/src/entities/models/cookie";
import { Session, sessionSchema } from "@/src/entities/models/session";
import { User } from "@/src/entities/models/user";

@injectable()
export class AuthenticationService implements IAuthenticationService {
  constructor(
    @inject(DI_SYMBOLS.IUsersRepository)
    private _usersRepository: IUsersRepository,
  ) {}

  async validateSession(): Promise<{ user: User; session: Session }> {
    return await startSpan(
      { name: "AuthenticationService > validateSession" },
      async () => {
        const {data, error } = await supabase.auth.getSession()

        if (error || !data.session) {
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
    user: User,
  ): Promise<{ session: Session; cookie: Cookie }> {
    return await startSpan(
      { name: "AuthenticationService > createSession" },
      async () => {
        const luciaSession = await startSpan(
          { name: "lucia.createSession", op: "function" },
          () => this._lucia.createSession(user.id, {}),
        );

        const session = sessionSchema.parse(luciaSession);
        const cookie = startSpan(
          { name: "lucia.createSessionCookie", op: "function" },
          () => this._lucia.createSessionCookie(session.id),
        );

        return { session, cookie };
      },
    );
  }

  async invalidateSession(): Promise<void> {
    await startSpan({ name: "supabase.invalidateSession", op: "function" }, () =>
      supabase.auth.signOut()
    );
  }
}
