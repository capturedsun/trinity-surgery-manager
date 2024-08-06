import { ThemeProvider } from "next-themes"
import { Sidebar } from "@/components/ui/navigation/Sidebar"

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="mx-auto max-w-screen-2xl">
      <ThemeProvider defaultTheme="system" attribute="class">
        <Sidebar />
        <main className="lg:pl-72 relative"> 
          <div className="p-4 sm:px-6 sm:pb-10 sm:pt-10 lg:px-10 lg:pt-7">
            {children}
          </div>
        </main>
      </ThemeProvider>
    </div>
  )
}
