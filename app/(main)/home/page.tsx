"use client"

import { Button } from "@/app/components/Button";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter()
  async function handleECWAuth() {
    setIsLoading(true)
    try {
      const res = await axios.get('/api/ecw_auth', { responseType: 'text' });
      window.open(res.data, '_blank');
      setIsLoading(false)
    } catch (error) {
      console.error(error);
    }
  }

  async function handleSignOut() {
    const response = await fetch('/api/auth', {
      method: 'POST',
      body: JSON.stringify({
        action: 'signOut'
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()
    if (data.error) {
      alert(data.error)
    } else if (data.redirect) {
      router.push(data.redirect)
    }
  }

  return (
    <div className="self-start mt-[clamp(2rem,10vw,5rem)] box-border flex flex-col items-stretch justify-center w-[25rem] max-w-[calc(100vw-2.5rem)] rounded-[.75rem] text-[#212126] relative overflow-hidden border-0 shadow-[0_5px_15px_0_rgba(0,0,0,0.08),0_15px_35px_-5px_rgba(25,28,33,0.2),0_0_0_1px_rgba(0,0,0,0.07)] bg-white/80 backdrop-blur-sm transition-all duration-200 text-center z-10 border-solid border-[rgba(0,0,0,0.03)] p-10 gap-8">
      <Image src="/icon.png" className="self-center" alt="Trinity Orthopedics" width={32} height={32} />
      <form
        className="flex-1 flex flex-col w-full justify-center gap-[2rem]"
      >
        <div className="flex flex-col gap-4">
          <h1 className="title flex items-center gap-2">
            <div className="rounded-lg px-1 text-center">Trinity Orthopedics</div>
          </h1>
          <p className="text-sm text-gray-500">Welcome back! Please authenticate with ECW to continue</p>
          <Button
            id="ecw-auth-button"
            variant="secondary"
            className="flex gap-x-2 px-2 py-1.5 text-sm bg-indigo-600 text-white hover:bg-indigo-400 shadow-[inset_0_2px_4px_0_rgba(99,102,241,1)]"
            onClick={handleECWAuth}
            isLoading={isLoading}
          >
            Connect ECW
          </Button>
        </div>
      </form>
    </div>
  );
}