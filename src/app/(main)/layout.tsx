import { ThemeProvider } from "next-themes"
import { Sidebar } from "@/components/ui/navigation/Sidebar"
import { checkAuth } from "@/utils/supabase/authActions"
import { UserProvider } from "@/context/UserContext"
import { OrganizationProvider } from "@/context/OrganizationContext"
import { QueryClientProvider } from '@tanstack/react-query'
import queryClient from '@/app/queryClient'

export default async function Layout({ children }: { children: React.ReactNode }) {
  await checkAuth()

  return (
    <div className="mx-auto max-w-screen-2xl">
      <ThemeProvider defaultTheme="system" attribute="class">
        <QueryClientProvider client={queryClient}>
          <UserProvider>
            <OrganizationProvider>
              <Sidebar />
              <main className="lg:pl-72 relative"> 
                <div className="p-4 sm:px-6 sm:pb-10 sm:pt-10 lg:px-10 lg:pt-7">
                  {children}
                </div>
              </main>
            </OrganizationProvider>
          </UserProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </div>
  )
}
