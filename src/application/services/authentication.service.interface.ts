import { Cookie } from "@/src/entities/models/cookie";
import { Session } from "@/src/entities/models/session";
import { User } from "@/src/entities/models/user";

export interface IAuthenticationService {
  generateUserId(): string;
  validateSession(
    sessionId: Session["id"],
  ): Promise<{ user: User; session: Session }>;
  createSession(input: { username: string; password: string }): Promise<void>;
  invalidateSession(): Promise<void>;
} 
