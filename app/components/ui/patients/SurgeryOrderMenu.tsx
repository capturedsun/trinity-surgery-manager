"use client"
import { Button } from "@/app/components/Button"
import { RiAddLine } from "@remixicon/react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/Dropdown"
import { cx } from "@/app/lib/utils"

export function SurgeryOrderMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="flex gap-1">
          <RiAddLine size={12}/>
          Add Surgery Order
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 6.5L8.5 4L11 6.5" stroke="white" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M11 9.5L8.5 12L6 9.5" stroke="white" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            From ECW
          </DropdownMenuItem>
          <DropdownMenuItem>
            Manual Entry
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
