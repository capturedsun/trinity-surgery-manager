import { QueryProvider } from "@/app/providers/QueryProvider";
import { createClient } from "@/app/utils/supabase/server";
import { ThemeProvider } from "next-themes";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Layout({ children }: { children: React.ReactNode }) {

  return (
    <div className="">
      <ThemeProvider defaultTheme="system" attribute="class">
        <QueryProvider>
          <main className="min-h-screen flex items-center justify-center relative">
              {children}
          </main>
        </QueryProvider>
      </ThemeProvider>
    </div>
  )
}
