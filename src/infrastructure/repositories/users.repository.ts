import { captureException, startSpan } from "@sentry/nextjs";
import { eq } from "drizzle-orm";
import { injectable } from "inversify";
import { createClient } from "@/app/utils/supabase/server";
import { UnauthenticatedError } from "@/src/entities/errors/auth";

import { IUsersRepository } from "@/src/application/repositories/users.repository.interface";
import { DatabaseOperationError } from "@/src/entities/errors/common";
import { User } from "@/src/entities/models/user";
import { db } from "@/src/infrastructure/drizzle";
import { users } from "@/src/infrastructure/drizzle/schema";

@injectable()
export class UsersRepository implements IUsersRepository {
  
  async getUser(): Promise<User | undefined> {
    return await startSpan({ name: "UsersRepository > getUser" }, async () => {
      try {
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

        return user
      } catch (err) {
        captureException(err);
        throw err;
      }
    });
  }
  async createUser(input: User): Promise<User> {
    return await startSpan(
      { name: "UsersRepository > createUser" },
      async () => {
        try {
          const query = db.insert(users).values(input).returning();

          const [created] = await startSpan(
            {
              name: query.toSQL().sql,
              op: "db.query",
              attributes: { "db.system": "sqlite" },
            },
            () => query.execute(),
          );

          if (created) {
            return created;
          } else {
            throw new DatabaseOperationError("Cannot create user.");
          }
        } catch (err) {
          captureException(err);
          throw err; // TODO: convert to Entities error
        }
      },
    );
  }
  async updateUser(input: User): Promise<User> {
    return await startSpan({ name: "UsersRepository > updateUser" }, async () => {
      try {
        const supabase = createClient()
        const { data: user, error } = await supabase
          .from('users')
          .update(input)
          .eq('id', input.id)
          .select()
          .single()
        if (error || !user) {
          throw new DatabaseOperationError("Cannot update user.");
        }
        return user
      } catch (err) {
        captureException(err);
        throw err; // TODO: convert to Entities error
      }
    });
  }
  async deleteUser(id: string): Promise<void> {
    return await startSpan({ name: "UsersRepository > deleteUser" }, async () => {
      try {
        const supabase = createClient()
        const { data, error } = await supabase
          .from('users')
          .delete()
          .eq('id', id)
          .select()
          .single()
        if (error || !data) {
          throw new DatabaseOperationError("Cannot delete user.");
        }
      } catch (err) {
        captureException(err);
        throw err; // TODO: convert to Entities error
      }
    });
  }
}
