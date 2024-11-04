"use client"

import { Button } from "@/app/components/Button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/Dropdown"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/Select"
import { Tooltip } from "@/app/components/Tooltip"
import { ModalAddUser } from "@/app/components/ui/settings/ModalAddUser"
import { invitedUsers, roles } from "@/app/data/data"
import { RiAddLine, RiMore2Fill } from "@remixicon/react"
import { useUser } from "@/app/hooks/useUser"
import { useOrganization } from "@/app/hooks/useOrganization"

export default function Users() {
  const { data: user, isLoading: isUsersLoading, error: usersError } = useUser()
  const { data, isLoading: isOrganizationLoading, error: organizationError } = useOrganization()
  return (
    <>
      <section aria-labelledby="existing-users">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div>
            <h3
              id="existing-users"
              className="scroll-mt-10 font-semibold text-gray-900 dark:text-gray-50"
            >
              Users
            </h3>
            <p className="text-sm leading-6 text-gray-500">
              Workspace administrators can add, manage, and remove users.
            </p>
          </div>
          <ModalAddUser>
            <Button disabled={true} variant="solid" className="mt-4 w-full gap-2 sm:mt-0 sm:w-fit">
              <RiAddLine className="-ml-1 size-4 shrink-0" aria-hidden="true" />
              Add user
            </Button>
          </ModalAddUser>
        </div>
        <ul
          role="list"
          className="mt-6 divide-y divide-gray-200 dark:divide-gray-800"
        >
          {data?.users.map((user) => (
            <li
              key={user.id}
              className="flex items-center justify-between gap-x-6 py-2.5"
            >
              <div className="flex items-center gap-x-4 truncate">
                <span
                  className="hidden size-9 shrink-0 items-center justify-center rounded-full border border-gray-300 bg-white text-xs text-gray-700 sm:flex dark:border-gray-800 dark:bg-gray-950 dark:text-gray-300"
                  aria-hidden="true"
                >
                  {user.first_name.charAt(0)}
                  {user.last_name.charAt(0)}
                </span>
                <div className="truncate">
                  <p className="truncate text-sm font-medium text-gray-900 dark:text-gray-50">
                    {user.first_name} {user.last_name}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Select
                  defaultValue={user.role}
                  disabled={true}
                >
                  <SelectTrigger className="h-8 w-32">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent align="end">
                    <SelectItem
                      key={user.role}
                      value={user.role}
                      disabled={user.role === "admin"}
                    >
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </SelectItem>
                  </SelectContent>
                </Select>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="group size-8 hover:border hover:border-gray-300 hover:bg-gray-50 data-[state=open]:border-gray-300 data-[state=open]:bg-gray-50 hover:dark:border-gray-700 hover:dark:bg-gray-900 data-[state=open]:dark:border-gray-700 data-[state=open]:dark:bg-gray-900"
                    >
                      <RiMore2Fill
                        className="size-4 shrink-0 text-gray-500 group-hover:text-gray-700 group-hover:dark:text-gray-400"
                        aria-hidden="true"
                      />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-36">
                    <DropdownMenuItem disabled={user.role === "admin"}>
                      View details
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-red-600 dark:text-red-500"
                      disabled={user.role === "admin"}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </li>
          ))}
        </ul>
      </section>
      <section className="mt-12" aria-labelledby="pending-invitations">
        <h2
          id="pending-invitations"
          className="scroll-mt-10 font-semibold text-gray-900 dark:text-gray-50"
        >
          Pending invitations
        </h2>
        <ul
          role="list"
          className="mt-6 divide-y divide-gray-200 dark:divide-gray-800"
        >
          <span className="text-sm text-gray-500 border-dotted">No pending invitations</span>
        </ul>
      </section>
    </>
  )
}
