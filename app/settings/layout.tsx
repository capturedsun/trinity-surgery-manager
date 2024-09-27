"use client"
import { siteConfig } from "@/app/siteConfig"
import { TabNavigation, TabNavigationLink } from "@/app/components/TabNavigation"
import { Sidebar } from "@/app/components/ui/navigation/Sidebar"
import { ThemeProvider } from "next-themes"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { createClient } from "@/app/utils/supabase/client"
import { redirect } from "next/navigation"

const navigationSettings = [
  { name: "General", href: siteConfig.baseLinks.settings.general },
  { name: "Billing & Usage", href: siteConfig.baseLinks.settings.billing },
  { name: "Users", href: siteConfig.baseLinks.settings.users },
  { name: "Status", href: siteConfig.baseLinks.settings.status },
]

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const supabase = createClient()
  const { data: { session } } = await supabase.auth.getSession()
  const { data: { user } } = await supabase.auth.getUser()

  if (!session || !user) {
    redirect("/sign-in")
  }

  const pathname = usePathname()
  return (
    <div className="">
      <ThemeProvider defaultTheme="system" attribute="class">
        <Sidebar />
        <main className="lg:pl-72 relative mx-auto max-w-screen-3xl">
          <div className="p-4 sm:px-6 sm:pb-10 sm:pt-10 lg:px-10 lg:pt-7">
            <h1 className="title">
              Settings
            </h1>
            <TabNavigation className="mt-4 sm:mt-6 lg:mt-10">
              {navigationSettings.map((item) => (
                <TabNavigationLink
                  key={item.name}
                  asChild
                  active={pathname === item.href}
                >
                  <Link href={item.href}>{item.name}</Link>
                </TabNavigationLink>
              ))}
            </TabNavigation>
            <div className="pt-6">{children}</div>
          </div>
        </main>
      </ThemeProvider>
    </div>
  )
}
