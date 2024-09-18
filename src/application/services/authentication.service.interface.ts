import { User } from "@/src/entities/models/user";

export interface IAuthenticationService {
  validateSession(): Promise<{ user: User }>;
  createSession(input: { username: string; password: string }): Promise<void>;
  invalidateSession(): Promise<void>;
} 
