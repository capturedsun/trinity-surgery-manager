"use client"

import { Button } from "@/app/components/Button"
import { cx, focusRing } from "@/app/lib/utils"
import { RiMore2Fill } from "@remixicon/react"

import { useUser } from "@/app/context/UserContext"
import { DropdownUserProfile } from "./DropdownUserProfile"

export const UserProfileDesktop = () => {
  const userState = useUser();
  return (
    <DropdownUserProfile>
      <Button
        aria-label="User settings"
        variant="ghost"
        className={cx(
          focusRing,
          "group flex w-full items-center justify-between rounded-md p-2 text-sm font-medium text-gray-900 hover:bg-gray-100 data-[state=open]:bg-gray-100 data-[state=open]:bg-gray-400/10 hover:dark:bg-gray-400/10",
        )}
      >
        {userState.loading ? (
          <span className="flex items-center gap-3">
            <span
              className="flex size-8 shrink-0 items-center justify-center rounded-full border border-gray-300 bg-gray-300 animate-pulse"
              aria-hidden="true"
            />
            <span className="w-24 h-4 bg-gray-300 animate-pulse rounded-md" />
          </span>
        ) : userState.error ? (
          <div>Error: {userState.error}</div>
        ) : (
          <span className="flex items-center gap-3">
            <span
              className="flex size-8 shrink-0 items-center justify-center rounded-full border border-gray-300 bg-white text-xs text-gray-700 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-300"
              aria-hidden="true"
            >
              {userState.userData?.first_name[0] + userState.userData?.last_name[0]}
            </span>
            <span>{userState.userData?.first_name} {userState.userData?.last_name}</span>
          </span>
        )}
        {userState.loading ? (
          <span className="size-4 shrink-0 bg-gray-300 animate-pulse rounded-md" />
        ) : (
          <RiMore2Fill
            className="size-4 shrink-0 text-gray-500 group-hover:text-gray-700 group-hover:dark:text-gray-400"
            aria-hidden="true"
          />
        )}
      </Button>
    </DropdownUserProfile>
  )
}
export const UserProfileMobile = () => {
  const userState = useUser();

  return (
    <DropdownUserProfile align="end">
      <Button
        aria-label="User settings"
        variant="ghost"
        className={cx(
          "group flex items-center rounded-md p-1 text-sm font-medium text-gray-900 hover:bg-gray-100 data-[state=open]:bg-gray-100 data-[state=open]:bg-gray-400/10 hover:dark:bg-gray-400/10",
        )}
      >
        {userState.loading ? (
          <span
            className="flex size-7 shrink-0 items-center justify-center rounded-full border border-gray-300 bg-gray-300 animate-pulse"
            aria-hidden="true"
          />
        ) : userState.error ? (
          <div>Error: {userState.error}</div>
        ) : (
          <span
            className="flex size-7 shrink-0 items-center justify-center rounded-full border border-gray-300 bg-white text-xs text-gray-700 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-300"
            aria-hidden="true"
          >
            {userState.userData?.first_name[0] + userState.userData?.last_name[0]}
          </span>
        )}
      </Button>
    </DropdownUserProfile>
  )
}