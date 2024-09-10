"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/Dropdown"
import { useUser } from "@/app/context/UserContext"
import { cx, focusInput } from "@/app/lib/utils"
import { RiArrowRightSLine, RiExpandUpDownLine } from "@remixicon/react"
import React from "react"
import { ModalAddWorkspace } from "./ModalAddWorkspace"

const workspaces = [
  {
    value: "trinity-orthopedics",
    name: "Trinity Orthopedics",
    initials: "RA",
    role: "Member",
    color: "bg-indigo-600 dark:bg-indigo-500",
  },
  // Add more workspaces...
]

export const WorkspacesDropdownDesktop = () => {
  const userState = useUser();
  console.log(userState);
  const [dropdownOpen, setDropdownOpen] = React.useState(false)
  const [hasOpenDialog, setHasOpenDialog] = React.useState(false)
  const dropdownTriggerRef = React.useRef<null | HTMLButtonElement>(null)
  const focusRef = React.useRef<null | HTMLButtonElement>(null)

  const handleDialogItemSelect = () => {
    focusRef.current = dropdownTriggerRef.current
  }

  const handleDialogItemOpenChange = (open: boolean) => {
    setHasOpenDialog(open)
    if (open === false) {
      setDropdownOpen(false)
    }
  }
  return (
    <>
      {/* sidebar (lg+) */}
      <DropdownMenu
        open={dropdownOpen}
        onOpenChange={setDropdownOpen}
        modal={false}
      >
        <DropdownMenuTrigger asChild>
          <button
            className={cx(
              "relative w-full inline-flex items-center justify-center whitespace-nowrap rounded-[0.75rem] px-[0.75rem] py-[0.75rem] text-center text-base font-medium transition-all ease-in-out duration-200 font-500 text-[0.8125rem] leading-[1.38462] h-fit",
              "disabled:pointer-events-none shadow-sm",
              "border-gray-300 dark:border-gray-800",
              "text-gray-900 dark:text-gray-50",
              "bg-white dark:bg-gray-950",
              "hover:bg-emerald-50 dark:hover:bg-emerald-900/60",
              "disabled:text-gray-400 disabled:dark:text-gray-600",
              "shadow-[0px_0px_0px_1px_rgba(0,0,0,0.07),0px_2px_3px_-1px_rgba(0,0,0,0.08),0px_1px_0px_0px_rgba(0,0,0,0.02)]",
              "hover:shadow-[0px_0px_0px_1px_rgba(6,78,59,0.07),0px_2px_3px_-1px_rgba(6,78,59,0.08),0px_1px_0px_0px_rgba(6,78,59,0.02)]",
              focusInput
            )}
          >
            <div className="flex w-full items-center justify-start gap-x-2">
              <p className="truncate whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-50">
                Trinity Orthopedics
              </p>
              <span className="rounded-lg px-1 text-xs font-medium leading-normal bg-gray-100 text-gray-1100 border">Free</span>
              <svg className="opacity-50 relative ml-auto" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 6.5L8.5 4L11 6.5" stroke="black" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M11 9.5L8.5 12L6 9.5" stroke="black" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>

            </div>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          hidden={hasOpenDialog}
          onCloseAutoFocus={(event) => {
            if (focusRef.current) {
              focusRef.current.focus()
              focusRef.current = null
              event.preventDefault()
            }
          }}
        >
          <DropdownMenuGroup>
            <DropdownMenuLabel>
              Workspaces ({workspaces.length})
            </DropdownMenuLabel>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <ModalAddWorkspace
            onSelect={handleDialogItemSelect}
            onOpenChange={handleDialogItemOpenChange}
            itemName="Add workspace"
          />
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export const WorkspacesDropdownMobile = () => {
  const [dropdownOpen, setDropdownOpen] = React.useState(false)
  const [hasOpenDialog, setHasOpenDialog] = React.useState(false)
  const dropdownTriggerRef = React.useRef<null | HTMLButtonElement>(null)
  const focusRef = React.useRef<null | HTMLButtonElement>(null)

  const handleDialogItemSelect = () => {
    focusRef.current = dropdownTriggerRef.current
  }

  const handleDialogItemOpenChange = (open: boolean) => {
    setHasOpenDialog(open)
    if (open === false) {
      setDropdownOpen(false)
    }
  }
  return (
    <>
      {/* sidebar (xs-lg) */}
      <DropdownMenu
        open={dropdownOpen}
        onOpenChange={setDropdownOpen}
        modal={false}
      >
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-x-1.5 rounded-md p-2 hover:bg-gray-100 focus:outline-none hover:dark:bg-gray-900">
            <span
              className={cx(
                "flex aspect-square size-7 items-center justify-center rounded bg-indigo-600 p-2 text-xs font-medium text-white dark:bg-indigo-500",
              )}
              aria-hidden="true"
            >
              RA
            </span>
            <RiArrowRightSLine
              className="size-4 shrink-0 text-gray-500"
              aria-hidden="true"
            />
            <div className="flex w-full items-center justify-between gap-x-3 truncate">
              <p className="truncate whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-50">
                Trinity Orthopedics
              </p>
              <RiExpandUpDownLine
                className="size-4 shrink-0 text-gray-500"
                aria-hidden="true"
              />
            </div>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="!min-w-72"
          hidden={hasOpenDialog}
          onCloseAutoFocus={(event) => {
            if (focusRef.current) {
              focusRef.current.focus()
              focusRef.current = null
              event.preventDefault()
            }
          }}
        >
          <DropdownMenuGroup>
            <DropdownMenuLabel>
              Workspaces ({workspaces.length})
            </DropdownMenuLabel>
            {workspaces.map((workspace) => (
              <DropdownMenuItem key={workspace.value}>
                <div className="flex w-full items-center gap-x-2.5">
                  <span
                    className={cx(
                      workspace.color,
                      "flex size-8 items-center justify-center rounded p-2 text-xs font-medium text-white",
                    )}
                    aria-hidden="true"
                  >
                    {workspace.initials}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-50">
                      {workspace.name}
                    </p>
                    <p className="text-xs text-gray-700 dark:text-gray-300">
                      {workspace.role}
                    </p>
                  </div>
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <ModalAddWorkspace
            onSelect={handleDialogItemSelect}
            onOpenChange={handleDialogItemOpenChange}
            itemName="Add workspace"
          />
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
