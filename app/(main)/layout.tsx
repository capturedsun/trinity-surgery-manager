import { QueryProvider } from "@/app/providers/QueryProvider";
import { createClient } from "@/app/utils/supabase/server";
import { ThemeProvider } from "next-themes";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const supabase = createClient()
  const { data: { session } } = await supabase.auth.getSession()
  const { data: { user } } = await supabase.auth.getUser()


  if (!session || !user) {
    redirect("/sign-in")
  }

  return (
    <div className="">
      <ThemeProvider defaultTheme="system" attribute="class">
        <QueryProvider>
          <main className="min-h-screen flex items-center justify-center relative">
            <Image
              src="/trinity_home_bg.png"
              width={1920}
              height={1080}
              alt="Trinity Orthopedics"
              className="absolute inset-0 object-cover w-full h-full"
              priority
            />
              {children}
          </main>
        </QueryProvider>
      </ThemeProvider>
    </div>
  )
}
