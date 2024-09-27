"use client"
import { siteConfig } from "@/app/siteConfig"
import { cx, focusRing } from "@/app/lib/utils"
import {
  RiHome2Line,
  RiLinkM,
  RiGroupFill,
  RiSettings5Line,
  RiFileList3Line,
} from "@remixicon/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Tooltip } from "@/app/components/Tooltip"
import {
  WorkspacesDropdownDesktop,
} from "./SidebarWorkspacesDropdown"
import { UserProfileDesktop } from "./UserProfile"
import { useState } from "react"

const navigation = [
  { name: "Overview", href: siteConfig.baseLinks.overview, icon: RiHome2Line },
  { name: "Patients", href: siteConfig.baseLinks.patients, icon: RiGroupFill },
  { name: "Letter", href: siteConfig.baseLinks.letter, icon: RiFileList3Line },
  {
    name: "Settings",
    href: siteConfig.baseLinks.settings.general,
    icon: RiSettings5Line,
  },
] as const

const shortcuts = [
  {
    name: "Add new user",
    href: "/settings/users",
    icon: RiLinkM,
  },
  {
    name: "Workspace usage",
    href: "/settings/billing#billing-overview",
    icon: RiLinkM,
  },
  {
    name: "Cost spend control",
    href: "/settings/billing#cost-spend-control",
    icon: RiLinkM,
  },
  {
    name: "Overview – Rows written",
    href: "/overview#usage-overview",
    icon: RiLinkM,
  },
] as const

const MorphingShape = () => (
  <div className="flex flex-col items-center justify-center group w-[16px] h-[24px]">
    <div className="h-[8px] w-[2px] bg-[#b6c0cd] transform rounded-sm rotate-0  transition duration-300 ease-in-out group-hover:rotate-[45deg] group-hover:bg-slate-700 group-hover:transform group-hover:translate-x-[0px] group-hover:translate-y-[1.5px]"></div>
    <div className="h-[8px] w-[2px] bg-[#b6c0cd] transform rounded-sm rotate-0 transition duration-300 ease-in-out group-hover:-rotate-[45deg] group-hover:bg-slate-700 group-hover:transform group-hover:translate-x-[0px] group-hover:translate-y-[-1.5px]"></div>
  </div>
);


export function Sidebar() {
  const [isOpen, setIsOpen] = useState(true)
  const [isShifted, setIsShifted] = useState(false)
  const pathname = usePathname()
  const isActive = (itemHref: string) => {
    if (itemHref === siteConfig.baseLinks.settings.general) {
      return pathname.startsWith("/settings")
    }
    return pathname === itemHref || pathname.startsWith(itemHref)
  }

  return (
    <>
      <nav className="fixed inset-y-0 z-50 flex w-72 flex-col transition-width duration-300 ease-in-out">
        <div className={cx(
          isShifted ? "right-[-2px]" : "right-[-8px]",
            "absolute top-0 z-50 border-none bg-[#ebeef1] h-full w-[1px] flex flex-col items-center justify-center transition-right duration-300 ease-in-out",
          )}
          >
        </div>
        <div className={cx(
            "absolute top-0 z-50 right-[-6px] border-none  h-full bg-none w-[1px] flex flex-col items-center justify-center transition-transform duration-300 ease-in-out",
          )}
          >
            <Tooltip content={isOpen ? "Collapse" : "Expand"} sideOffset={10} showArrow={false} side="right" className="bg-slate-700 p-1 rounded-md group">
              <div
                className={cx(
                  "relative group w-[40px] h-[56px] group transform translate-x-1/2",
                )}
                onMouseEnter={() => setIsShifted(true)}
                onMouseLeave={() => setIsShifted(false)}
                onClick={() => setIsOpen(!isOpen)}
              >
              
                <div 
                  className={cx(
                    "absolute top-1/2 transform left-[-6px] -translate-y-1/2 group p-2 transition-all duration-100 pointer-events-none",
                  )}
                >
                  <MorphingShape />
                </div>
            </div>
          </Tooltip>
        </div>
        <aside className="flex grow flex-col gap-y-6 overflow-y-auto  bg-white p-4 dark:border-gray-800 dark:bg-gray-950">
          <WorkspacesDropdownDesktop isOpen={isOpen} />
          <nav
            aria-label="core navigation links"
            className="flex flex-1 flex-col space-y-10"
          >
            <ul role="list" className="space-y-0.5">
              {navigation.map((item) => (
                <li 
                  key={item.name}
                  className="relative"
                >
                  <Link
                    href={item.href}
                    className={cx(
                      isActive(item.href)
                        ? "text-emerald-800 dark:text-emerald-400 after:absolute after:content-[''] after:top-1/2 after:left-[4px] after:w-[2px] after:rounded-full after:h-[calc(100%-1.25rem)] after:bg-emerald-700 after:transform after:translate-y-[-50%]"
                        : "text-gray-700 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50",
                      "flex items-center gap-x-2.5 rounded-md px-[0.75rem] py-1.5 text-sm font-medium transition hover:bg-gray-100 hover:dark:bg-gray-900",
                      focusRing,
                    )}
                  >
                    <item.icon className="size-4 shrink-0" aria-hidden="true" />
                    <span className={cx(
                      isOpen ? "opacity-100" : "opacity-0",
                      "transition duration-200 ease-linear"
                    )}>
                      {item.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-auto">
            <UserProfileDesktop/>
          </div>
        </aside>
      </nav>
    </>
  )
}
