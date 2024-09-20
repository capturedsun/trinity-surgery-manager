"use client"

import { Button } from "@/app/components/Button"
import { cx, focusRing } from "@/app/lib/utils"
import { RiMore2Fill } from "@remixicon/react"

import { useAppDataContext } from '@/app/providers/app-data-provider';
import { DropdownUserProfile } from "./DropdownUserProfile"

export const UserProfileDesktop = () => {
  const { user, isLoading, error } = useAppDataContext();
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
        {isLoading ? (
          <span className="flex items-center gap-3">
            <span
              className="flex size-8 shrink-0 items-center justify-center rounded-full border border-gray-300 bg-gray-300 animate-pulse"
              aria-hidden="true"
            />
            <span className="w-24 h-4 bg-gray-300 animate-pulse rounded-md" />
          </span>
        ) : error ? (
          <div>Error: {error}</div>
        ) : (
          <span className="flex items-center gap-3">
            <span
              className="flex size-8 shrink-0 items-center justify-center rounded-full border border-gray-300 bg-white text-xs text-gray-700 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-300"
              aria-hidden="true"
            >
              {(user?.first_name?.[0] ?? '') + (user?.last_name?.[0] ?? '')}
            </span>
            <span>{user?.first_name} {user?.last_name}</span>
          </span>
        )}
        {isLoading ? (
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
  const { user, isLoading, error } = useAppDataContext();

  return (
    <DropdownUserProfile align="end">
      <Button
        aria-label="User settings"
        variant="ghost"
        className={cx(
          "group flex items-center rounded-md p-1 text-sm font-medium text-gray-900 hover:bg-gray-100 data-[state=open]:bg-gray-100 data-[state=open]:bg-gray-400/10 hover:dark:bg-gray-400/10",
        )}
      >
        {isLoading ? (
          <span
            className="flex size-7 shrink-0 items-center justify-center rounded-full border border-gray-300 bg-gray-300 animate-pulse"
            aria-hidden="true"
          />
        ) : error ? (
          <div>Error: {error}</div>
        ) : (
          <span
            className="flex size-7 shrink-0 items-center justify-center rounded-full border border-gray-300 bg-white text-xs text-gray-700 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-300"
            aria-hidden="true"
          >
            {(user?.first_name?.[0] ?? '') + (user?.last_name?.[0] ?? '')}
          </span>
        )}
      </Button>
    </DropdownUserProfile>
  )
}