import { ThemeProvider } from "next-themes";
import { Sidebar } from "@/app/components/ui/navigation/Sidebar";
import { QueryProvider } from "@/app/providers/QueryProvider";
import { createClient } from "@/app/utils/supabase/server"
import { redirect } from "next/navigation"


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
          <main className="w-full h-screen flex flex-row relative ">
            <Sidebar />
            <div className="relative w-full flex flex-col items-center overflow-scroll">
              <div className=" p-4 sm:px-6 sm:pb-10 sm:pt-7 lg:px-10 lg:max-w-[800px] lg:pt-7 w-full">
                {children}
              </div>
            </div>
          </main>
        </QueryProvider>
      </ThemeProvider>
    </div>
  )
}
