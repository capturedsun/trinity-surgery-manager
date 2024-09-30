"use client"
import { siteConfig } from "@/app/siteConfig"
import { cx, focusRing, tailwindSizeToPx } from "@/app/lib/utils"
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
import { useState, useEffect } from "react"

const navigation = [
  { name: "Overview", href: siteConfig.baseLinks.overview, icon: RiHome2Line },
  { name: "Patients", href: siteConfig.baseLinks.patients, icon: RiGroupFill },
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

const MorphingShape = ({ isOpen }: { isOpen: boolean }) => (
  <div className="flex flex-col items-center justify-center group w-[16px] h-[24px]">
    <div className={cx(
      "h-[8px] w-[2px] bg-[#b6c0cd] transform rounded-sm rounded-br-none rounded-bl-none rotate-0  transition duration-300 ease-in-out group-hover:bg-slate-700 group-hover:transform group-hover:translate-y-[1.5px]",
      isOpen ? " group-hover:rotate-[45deg]" : " group-hover:-rotate-[45deg]",
    )}></div>
    <div className={cx(
      "h-[8px] w-[2px] bg-[#b6c0cd] transform rounded-sm rounded-tr-none rounded-tl-none rotate-0 transition duration-300 ease-in-out  group-hover:bg-slate-700 group-hover:transform group-hover:translate-y-[-1.5px]",
      isOpen ? " group-hover:-rotate-[45deg]" : " group-hover:rotate-[45deg]",
    )}></div>
  </div>
);


export function Sidebar() {
  const [isOpen, setIsOpen] = useState(true)
  const [isShifted, setIsShifted] = useState(false)
  const [navWidth, setNavWidth] = useState(72*4)
  const navPaddingTW = 4
  const pathname = usePathname()
  const isActive = (itemHref: string) => {
    if (itemHref === siteConfig.baseLinks.settings.general) {
      return pathname.startsWith("/settings")
    }
    return pathname === itemHref || pathname.startsWith(itemHref)
  }

  return (
    <>
      <nav 
        style={{ width: `${navWidth}px` }}
        className={cx(
          "sticky left-0 top-0 h-screen max-h-screen z-50 flex flex-col transition-width duration-300 ease-in-out",
        )}>
        <div className={cx(
          isShifted ? 
            isOpen ? "right-[0px]" : "right-[-4px]" :
            isOpen ? "right-[-4px]" : "right-[0px]",
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
                  <MorphingShape isOpen={isOpen} />
                </div>
            </div>
          </Tooltip>
        </div>
        <aside 
          className={cx(
            "flex grow flex-col gap-y-6 overflow-y-auto  bg-white p-4 dark:border-gray-800 dark:bg-gray-950",
            `p-${navPaddingTW}`,
          )}
        >
          <WorkspacesDropdownDesktop 
            isOpen={isOpen}
            navWidth={navWidth}
            setNavWidth={setNavWidth}
            navPaddingTW={navPaddingTW}
           />
          <nav
            aria-label="core navigation links"
            className="flex flex-1 flex-col space-y-10"
          >
            <ul role="list" className="space-y-0.5">
              {navigation.map((item) => (
                <li 
                  key={item.name}
                  className="relative group"
                >
                  <Link
                    href={item.href}

                    className={cx(
                      isActive(item.href)
                        ? "text-emerald-800 dark:text-emerald-400 after:absolute after:content-[''] after:top-1/2 after:left-[4px] after:w-[2px] after:rounded-full after:h-[calc(100%-1.25rem)] after:bg-emerald-700 after:transform after:translate-y-[-50%]"
                        : "text-gray-700 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50",
                      "flex items-center gap-x-2.5 rounded-md px-[0.75rem] py-1.5 text-sm font-medium transition hover:bg-gray-100 hover:dark:bg-gray-900 active:first-child:scale-95 duration-200 ease-in-out group",
                      focusRing,
                    )}
                  >
                    <div 
                      className={cx(
                        "w-[20px] h-[20px] flex items-center justify-center group relative",
                        "after:content-[attr(data-name)] after:absolute after:left-full after:ml-2 after:whitespace-nowrap",
                        isOpen ? "after:opacity-100": "after:opacity-0",
                        "after:transition-opacity after:duration-200 ",
                      )}
                      data-name={item.name}
                    >
                      <item.icon className="size-4 shrink-0 group-active:size-3.5 duration-200 ease-in-out" aria-hidden="true" />
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          {/* <div className="mt-auto">
            <UserProfileDesktop/>
          </div> */}
        </aside>
      </nav>
    </>
  )
}
