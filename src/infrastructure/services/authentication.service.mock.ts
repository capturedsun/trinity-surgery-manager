import { inject, injectable } from "inversify";

import { SESSION_COOKIE } from "@/config";
import { DI_SYMBOLS } from "@/di/types";
import { type IUsersRepository } from "@/src/application/repositories/users.repository.interface";
import { IAuthenticationService } from "@/src/application/services/authentication.service.interface";
import { UnauthenticatedError } from "@/src/entities/errors/auth";
import { Cookie } from "@/src/entities/models/cookie";
import { Session, sessionSchema } from "@/src/entities/models/session";
import { User } from "@/src/entities/models/user";

@injectable()
export class MockAuthenticationService implements IAuthenticationService {
  private _sessions: Record<string, { session: Session; user: User }>;

  constructor(
    @inject(DI_SYMBOLS.IUsersRepository)
    private _usersRepository: IUsersRepository,
  ) {
    this._sessions = {};
  }

  async validateSession(): Promise<{ user: User }> {
    const result = this._sessions[sessionId] ?? { user: null, session: null };

    if (!result.user || !result.session) {
      throw new UnauthenticatedError("Unauthenticated");
    }

    const user = await this._usersRepository.getUser(result.user.id);

    return { user: user! };
  }

  async createSession(
    user: User,
  ): Promise<{ session: Session; cookie: Cookie }> {
    const luciaSession: Session = {
      id: "random_session_id",
      userId: user.id,
      expiresAt: new Date(new Date().getTime() + 86400000 * 7), // 7 days
    };
    const session = sessionSchema.parse(luciaSession);
    const cookie: Cookie = {
      name: SESSION_COOKIE,
      value: session.id + "_" + user.id,
      attributes: {},
    };

    this._sessions[session.id] = { session, user };

    return { session, cookie };
  }

  async invalidateSession(sessionId: string): Promise<{ blankCookie: Cookie }> {
    delete this._sessions[sessionId];
    const blankCookie: Cookie = {
      name: SESSION_COOKIE,
      value: "",
      attributes: {},
    };
    return Promise.resolve({ blankCookie });
  }

  generateUserId(): string {
    return (Math.random() + 1).toString(36).substring(7);
  }
}
