"use client"
import { useState } from "react";
import { signIn } from "@/utils/supabase/authActions";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(event.currentTarget);
    await signIn(formData);
    setIsLoading(false);
  };

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <form
        onSubmit={handleSignIn}
        className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
      >
        <label className="text-md" htmlFor="email">
          <h3 className="font-bold text-gray-900 sm:text-sm dark:text-gray-50">
            Email
          </h3>
        </label>
        <Input
          name="email"
          placeholder="you@example.com"
        />
        <label className="text-md" htmlFor="password">
          <h3 className="font-bold text-gray-900 sm:text-sm dark:text-gray-50">
            Password
          </h3>
        </label>
        <Input
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />
        <Button
          type="submit"
          className="mt-5"
          isLoading={isLoading}
          loadingText="Signing In..."
        >
          Sign In
        </Button>
        {searchParams?.message && (
          <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
            {searchParams.message}
          </p>
        )}
      </form>
    </div>
  );
}