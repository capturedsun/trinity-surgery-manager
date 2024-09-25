import { ThemeProvider } from "next-themes";
import { Sidebar } from "@/app/components/ui/navigation/Sidebar";
import { QueryProvider } from "@/app/providers/QueryProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-screen-2xl">
      <ThemeProvider defaultTheme="system" attribute="class">
        <QueryProvider>
          <Sidebar />
          <main className="lg:pl-72 relative">
            <div className="p-4 sm:px-6 sm:pb-10 sm:pt-10 lg:px-10 lg:pt-7">
              {children}
            </div>
          </main>
        </QueryProvider>
      </ThemeProvider>
    </div>
  );
}
