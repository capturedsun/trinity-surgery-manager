import { siteConfig } from "@/app/siteConfig"
import { TabNavigation, TabNavigationLink } from "@/app/components/TabNavigation"
import { Sidebar } from "@/app/components/ui/navigation/Sidebar"
import { QueryProvider } from "@/app/providers/QueryProvider"
import { ThemeProvider } from "next-themes"
import Link from "next/link"

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


  return (
    <div className="">
      <ThemeProvider defaultTheme="system" attribute="class">
        <QueryProvider>
          <main className="w-full h-screen flex flex-row relative">
            <Sidebar />
            <div className="relative w-full flex flex-col items-center overflow-scroll">
              <div className="p-4 sm:px-6 sm:pb-10 sm:pt-7 lg:px-10 lg:max-w-[800px] lg:pt-7 w-full ">
                <h1 className="title">
                  Settings
                </h1>
                <TabNavigation className="mt-4 sm:mt-6 lg:mt-10">
                  {navigationSettings.map((item) => (
                    <TabNavigationLink
                      key={item.name}
                      asChild
                      active={item.name === "General"}
                    >
                      <Link href={item.href}>{item.name}</Link>
                    </TabNavigationLink>
                  ))}
                </TabNavigation>
                <div className="pt-6">{children}</div>
              </div>
            </div>
          </main>
        </QueryProvider>
      </ThemeProvider>
    </div>
  )
}
