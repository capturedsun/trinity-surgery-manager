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
          <Sidebar />
          <main className="lg:pl-72 relative mx-auto max-w-[1800px]">
            <div className="p-4 sm:px-6 sm:pb-10 sm:pt-10 lg:px-10 lg:pt-7">
              {children}
            </div>
          </main>
        </QueryProvider>
      </ThemeProvider>
    </div>
  )
}
