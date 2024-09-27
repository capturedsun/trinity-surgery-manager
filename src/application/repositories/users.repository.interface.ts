import type { User } from "@/src/entities/models/user";

export interface IUsersRepository {
  getUser(): Promise<User | undefined>;
  createUser(input: User): Promise<User>;
  updateUser(input: User): Promise<User>;
  deleteUser(id: string): Promise<void>;
}
