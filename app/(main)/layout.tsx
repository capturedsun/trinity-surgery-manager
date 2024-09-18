import { ThemeProvider } from "next-themes"
import { Sidebar } from "@/app/components/ui/navigation/Sidebar"
import { UserProvider } from "@/app/context/UserContext"
import { OrganizationProvider } from "@/app/context/OrganizationContext"
import { checkSessionController } from "@/src/interface-adapters/controllers/auth/check-session.controller"

export default async function Layout({ children }: { children: React.ReactNode }) {
  const { user } = await checkSessionController();

  return (
    <div className="mx-auto max-w-screen-2xl">
      <ThemeProvider defaultTheme="system" attribute="class">
        <UserProvider user={user} >
          <OrganizationProvider>
            <Sidebar />
            <main className="lg:pl-72 relative"> 
              <div className="p-4 sm:px-6 sm:pb-10 sm:pt-10 lg:px-10 lg:pt-7">
                {children}
              </div>
            </main>
          </OrganizationProvider>
        </UserProvider>
      </ThemeProvider>
    </div>
  )
}
