"use client"
import { Button } from "@/app/components/Button";
import { Input } from "@/app/components/Input";
import { useState } from "react";
import Image from "next/image";

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    const formData = new FormData(event.currentTarget)

    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        body: JSON.stringify({
          action: 'signIn',
          username: formData.get('username'),
          password: formData.get('password')
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Sign in failed')
      }
      
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="self-start mt-[clamp(2rem,10vw,5rem)] box-border flex flex-col items-stretch justify-center w-[25rem] max-w-[calc(100vw-2.5rem)] rounded-[.75rem] text-[#212126] relative overflow-hidden border-0 shadow-[0_5px_15px_0_rgba(0,0,0,0.08),0_15px_35px_-5px_rgba(25,28,33,0.2),0_0_0_1px_rgba(0,0,0,0.07)] bg-white transition-all duration-200 text-center z-10 border-solid border-[rgba(0,0,0,0.03)] p-10 gap-8">
      <Image src="/icon.png" className="self-center" alt="Trinity Orthopedics" width={32} height={32} />
      <form
        onSubmit={handleSubmit}
        className="flex-1 flex flex-col w-full justify-center gap-[2rem]"
      >
        <div className="flex flex-col gap-[.25rem]">
          <h1 className="title"> Sign In to Trinity Orthopedics</h1>
          <p className="subtitle">Welcome back! Please sign in to continue</p>
        </div>
        <div className="flex flex-col gap-[.5rem]">
          <label className="label text-left" htmlFor="username">
            Username
          </label>
          <Input
            name="username"
            placeholder="you@example.com"
          />
          <label className="label text-left" htmlFor="password">
              Password
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
            loadingText="Sign In..."
            disabled={isLoading}
          >
            Sign In
          </Button>
          {searchParams?.message && (
            <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
              {searchParams.message}
            </p>
          )}
        </div>
      </form>
    </div>
  );
}