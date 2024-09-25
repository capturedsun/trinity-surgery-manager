import { startSpan } from "@sentry/nextjs";
import 'server-only';
import { z } from "zod";

import { signInUseCase } from "@/src/application/use-cases/auth/sign-in.use-case";
import { InputParseError } from "@/src/entities/errors/common";

const inputSchema = z.object({
  username: z.string().min(3).max(31),
  password: z.string().min(6).max(31),
});

export async function signInController(
  input: Partial<z.infer<typeof inputSchema>>,
): Promise<void> {
  return await startSpan({ name: "signIn Controller" }, async () => {
    const { data, error: inputParseError } = inputSchema.safeParse(input);

    if (inputParseError) throw new InputParseError("Invalid data", { cause: inputParseError });

    await signInUseCase(data);
  });
}
