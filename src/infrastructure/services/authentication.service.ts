import { createClient } from "@/app/utils/supabase/server";
import { DI_SYMBOLS } from "@/di/types";
import { type IUsersRepository } from "@/src/application/repositories/users.repository.interface";
import { IAuthenticationService } from "@/src/application/services/authentication.service.interface";
import { AuthenticationError, UnauthenticatedError } from "@/src/entities/errors/auth";
import { User } from "@/src/entities/models/user";
import { startSpan } from "@sentry/nextjs";
import { inject, injectable } from "inversify";
import 'reflect-metadata';

@injectable()
export class AuthenticationService implements IAuthenticationService {
  constructor(
    @inject(DI_SYMBOLS.IUsersRepository)
    private usersRepository: IUsersRepository,
  ) { }

  async validateSession(): Promise<{ user: User }> {
    return await startSpan(
      { name: "AuthenticationService > validateSession" },
      async () => {
        const supabase = createClient()
        const { data: authData, error: authError } = await supabase.auth.getUser()

        if (authError || !authData.user) {
          throw new UnauthenticatedError("Failed to authenticate user")
        }

        const { data: user, error: userError } = await supabase
          .from('users')
          .select('*')
          .eq('id', authData.user.id)
          .single()

        if (userError || !user) {
          throw new UnauthenticatedError("User not found in database")
        }

        return { user }
      }
    )
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
