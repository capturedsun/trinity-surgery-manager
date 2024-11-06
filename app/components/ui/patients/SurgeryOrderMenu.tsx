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
import { ModalAddSurgeryOrder } from "./ModalAddSurgeryOrder"

export function SurgeryOrderMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="flex gap-1">
          Add Surgery Order
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 6.5L8.5 4L11 6.5" stroke="white" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M11 9.5L8.5 12L6 9.5" stroke="white" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[225px]">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <div className="text-[0.8125rem] relative z-10 leading-[1.38462] h-fit font-medium flex justify-between items-center w-full text-stone-500">
              Sync ECW 
              <div className="text-xs text-red-500 relative before:content-[''] before:absolute before:left-[50%] before:translate-x-[-50%] before:inset-0 before:-z-10 before:bg-red-50 before:w-[107%] before:rounded before:bg-[repeating-linear-gradient(45deg,transparent,transparent_2px,rgba(255,0,0,0.05)_2px,rgba(255,0,0,0.05)_4px)]">Not connected</div>
            </div>
          </DropdownMenuItem>
            <DropdownMenuItem onClick={(e) => e.preventDefault()}>
          <ModalAddSurgeryOrder className="text-[0.8125rem] leading-[1.38462] font-medium w-full h-full">
                <div>Enter Manually</div>
          </ModalAddSurgeryOrder>
            </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
