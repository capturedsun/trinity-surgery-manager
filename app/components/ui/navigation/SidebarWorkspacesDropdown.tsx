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
import { cx, focusInput, remToPx, tailwindSizeToPx } from "@/app/lib/utils"
import { RiArrowRightSLine, RiExpandUpDownLine, RiLogoutBoxRLine } from "@remixicon/react"
import Image from "next/image"
import React from "react"
import { toast } from "@/app/lib/useToast"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useReducer } from "react"
import { ModalAddWorkspace } from "./ModalAddWorkspace"
import { useUser } from "@/app/hooks/useUser"
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

export const WorkspacesDropdownDesktop = ({ isOpen, navWidth, setNavWidth, navPaddingTW }: { isOpen: boolean, navWidth: number, setNavWidth: (width: number) => void, navPaddingTW: number }) => {
  const [dropdownOpen, setDropdownOpen] = React.useState(false)
  const [hasOpenDialog, setHasOpenDialog] = React.useState(false)
  const dropdownTriggerRef = React.useRef<null | HTMLButtonElement>(null)
  const focusRef = React.useRef<null | HTMLButtonElement>(null)
  const organizationLogoRef = React.useRef<null | HTMLImageElement>(null)
  const organizationMetaRef = React.useRef<null | HTMLDivElement>(null)
  const [dropdownMenuPadding, setDropdownMenuPadding] = React.useState(0.75)
  const [dropDownMenuWidthInPixels, setDropDownMenuWidthInPixels] = React.useState(500)
  const [computedWidthOfMeta, setComputedWidthOfMeta] = React.useState<null | number>(null)
  const [computedWidthOfLogo, setComputedWidthOfLogo] = React.useState<null | number>(null)
  const { data: user, isLoading, error } = useUser()
  const router = useRouter()

  const handleDialogItemSelect = () => {
    focusRef.current = dropdownTriggerRef.current
  }

  const handleSignOut = async () => {
    const response = await fetch('/api/auth', {
      method: 'POST',
      body: JSON.stringify({
        action: 'signOut'
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()
    if (data.error) {
      toast({
        title: "Error",
        description: data.error,
        variant: "error",
      })
    } else if (data.redirect) {
      router.push(data.redirect)
    }
  }

  useEffect(() => {
    if (organizationLogoRef.current) {
      const width = window.getComputedStyle(organizationLogoRef.current).width;
      console.log(width)
      setComputedWidthOfLogo(parseFloat(width))
    }
    if (organizationMetaRef.current) {
      const width = window.getComputedStyle(organizationMetaRef.current).width;
      setComputedWidthOfMeta(parseFloat(width))
    }
  }, []);

  useEffect(() => {
    if (computedWidthOfLogo && computedWidthOfMeta) {
      let width = 0
      if (isOpen) {
        width = (remToPx(dropdownMenuPadding) + (computedWidthOfMeta || 0) + (computedWidthOfLogo || 0))*2;
        setDropDownMenuWidthInPixels(width);
        setNavWidth(72*4)
      } else {
        width = (remToPx(dropdownMenuPadding)*2) + (computedWidthOfLogo || 0)
        setDropDownMenuWidthInPixels(width)
        setNavWidth(width + tailwindSizeToPx(navPaddingTW)*2)
      }
    } 
  }, [isOpen]);
  
  const handleDialogItemOpenChange = (open: boolean) => {
    setHasOpenDialog(open)
    if (open === false) {
      setDropdownOpen(false)
    }
  }
  return (
    <>
      <DropdownMenu
        open={dropdownOpen}
        onOpenChange={setDropdownOpen}
        modal={false}
      >
        <DropdownMenuTrigger asChild>
          <button
            style={{ width: `${dropDownMenuWidthInPixels}px` }}
            className={cx(
              "relative transition-width duration-200 ease-in-out max-w-fit inline-flex items-center overflow-hidden justify-center whitespace-nowrap rounded-[0.75rem]  py-[0.75rem] text-center text-base font-medium font-500 text-[0.8125rem] leading-[1.38462] h-fit",
              `px-[0.75rem]`,
              "disabled:pointer-events-none shadow-sm",
              "border-gray-300 dark:border-gray-800",
              "text-gray-900 dark:text-gray-50",
              dropdownOpen ? "bg-emerald-50" : "bg-white",
              "hover:bg-emerald-50 dark:hover:bg-emerald-900/60",
              "disabled:text-gray-400 disabled:dark:text-gray-600",
              "shadow-[0px_0px_0px_1px_rgba(0,0,0,0.07),0px_2px_3px_-1px_rgba(0,0,0,0.08),0px_1px_0px_0px_rgba(0,0,0,0.02)]",
              "hover:shadow-[0px_0px_0px_1px_rgba(6,78,59,0.07),0px_2px_3px_-1px_rgba(6,78,59,0.08),0px_1px_0px_0px_rgba(6,78,59,0.02)]",
              focusInput
            )}
          >
            <div className="flex w-full items-center justify-start gap-x-2">
              <Image ref={organizationLogoRef} src="/icon.png" alt="logo" width={20} height={20} />
              <div
                ref={organizationMetaRef}
                className={cx(
                  "transition-all duration-200 ease-in-out flex gap-x-2 items-center",
                  isOpen ? "opacity-100"  : "opacity-0"
                )}
              >
                <p className="truncate whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-50">
                  Trinity Orthopedics
                </p>
                <span className="rounded-lg px-1 text-xs font-medium leading-normal bg-emerald-100 text-emerald-800 border border-gray-200">Free</span>
                <svg className="opacity-50 relative ml-auto" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 6.5L8.5 4L11 6.5" stroke="black" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M11 9.5L8.5 12L6 9.5" stroke="black" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
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
              {user?.first_name} {user?.last_name}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              onClick={handleSignOut}
              className="cursor-pointer flex items-center gap-x-2.5"
            >
              <RiLogoutBoxRLine className="size-4 shrink-0 text-gray-500" aria-hidden="true" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuGroup>
          {/* <ModalAddWorkspace
            onSelect={handleDialogItemSelect}
            onOpenChange={handleDialogItemOpenChange}
            itemName="Add workspace"
          /> */}
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
