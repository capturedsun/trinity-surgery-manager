"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSubMenu,
  DropdownMenuSubMenuContent,
  DropdownMenuSubMenuTrigger,
  DropdownMenuTrigger,
} from "@/app/components/Dropdown"
import {
  RiArrowRightUpLine,
  RiComputerLine,
  RiMoonLine,
  RiSunLine,
} from "@remixicon/react"
import { useTheme } from "next-themes"
import { useRouter } from "next/navigation"
import { toast } from "@/app/lib/useToast"
import * as React from "react"

import { useUser } from "@/app/hooks/useUser"

export type DropdownUserProfileProps = {
  children: React.ReactNode
  align?: "center" | "start" | "end"
}

export function DropdownUserProfile({
  children,
  align = "start",
}: DropdownUserProfileProps) {
  const router = useRouter();
  const [mounted, setMounted] = React.useState(false)
  const { theme, setTheme } = useTheme()
  const { data: user, isLoading, error } = useUser()
  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
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
  
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent align={align}>
          <DropdownMenuLabel>{user?.first_name} {user?.last_name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              Changelog
              <RiArrowRightUpLine
                className="mb-1 ml-1 size-2.5 shrink-0 text-gray-500"
                aria-hidden="true"
              />
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                router.push("/settings/general")
              }}
            >
              Settings
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={handleSignOut}>Sign out</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
