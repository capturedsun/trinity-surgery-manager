"use client"

import { Badge, BadgeProps } from "@/app/components/Badge"
import { Button } from "@/app/components/Button"
import { ModalManageStatusTag } from "@/app/components/ui/settings/ModalManageStatusTag"
import { CategorizedTags, StatusTag } from "@/app/data/schema"
import { RiAddLine, RiEditLine } from "@remixicon/react"
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from "react"
import { useUser } from "@/app/context/UserContext"
import { getOrganizationStatusTags, updateStatusTag } from "./actions"

export default function Statuses() {
  const { data: userData, isLoading: isUserDataLoading } = useUser()
  const [categorizedTags, setCategorizedTags] = useState<CategorizedTags[]>([])
  const orgCode = userData?.org_code

  const handleSave = async (tag: Partial<StatusTag>) => {
    await updateStatusTag(tag)
  }

  useEffect(() => {
    const fetchTags = async () => {
      if (orgCode) {
        const tags = await getOrganizationStatusTags(orgCode);
        console.log(tags)
        setCategorizedTags(tags);
      }
    };

    fetchTags();
  }, [orgCode]);

  return (
    <>
      <section aria-labelledby="statuses">
        <div className="grid grid-cols-1 gap-x-14 gap-y-8 md:grid-cols-3">
          <div>
            <h2
              id="statuses"
              className="scroll-mt-10 font-semibold text-gray-900 dark:text-gray-50"
            >
              Configure Statuses
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-500">
              Add additional statuses or edit existing ones to better manage incoming referrals.
            </p>
          </div>
          <div className="md:col-span-2">
            <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
              <h3 className="text-sm font-semibold">Create a new status tag</h3>
              <ModalManageStatusTag
                categories={categorizedTags ?? []}
                onSave={handleSave}>
                <Button variant="light" className="mt-4 w-full gap-2 sm:mt-0 sm:w-fit">
                  <RiAddLine className="-ml-1 size-4 shrink-0" aria-hidden="true" />
                  Add status
                </Button>
              </ModalManageStatusTag>
            </div>
            <ul
              role="list"
              className="mt-6 "
            >
              {categorizedTags?.map(({ category, tags }: { category: string; tags: StatusTag[] }) => (
                <div key={category} className="mt-6">
                  <p className="text-sm font-semibold">Category / {category.charAt(0).toUpperCase() + category.slice(1)}</p>
                  <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-800 mt-3 divide-dashed">
                    {tags.map((tag: StatusTag) => (
                      <li key={tag.id} className="flex items-center justify-between py-2.5">
                        <Badge className="inline-flex items-center whitespace-nowrap rounded-md px-2 py-1 text-xs font-medium gap-2" showSquare variant={tag.style_variant ?? "default"}>
                          {tag.label}
                        </Badge>
                        <div className="flex items-center gap-2">
                          <ModalManageStatusTag categories={categorizedTags ?? []} existingTag={tag} onSave={handleSave}>
                            <Button variant="ghost" className="group size-8 hover:border hover:border-gray-300 hover:bg-gray-50 data-[state=open]:border-gray-300 data-[state=open]:bg-gray-50 hover:dark:border-gray-700 hover:dark:bg-gray-900 data-[state=open]:dark:border-gray-700 data-[state=open]:dark:bg-gray-900">
                              <RiEditLine className="size-4 shrink-0 text-gray-500 group-hover:text-gray-700 group-hover:dark:text-gray-400" aria-hidden="true" />
                            </Button>
                          </ModalManageStatusTag>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* <section className="mt-12" aria-labelledby="pending-invitations">
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
            {invitedUsers.map((user) => (
              <li
                key={user.initials}
                className="flex items-center justify-between gap-x-6 py-2.5"
              >
                <div className="flex items-center gap-x-4">
                  <span
                    className="hidden size-9 shrink-0 items-center justify-center rounded-full border border-dashed border-gray-300 bg-white text-xs text-gray-700 sm:flex dark:border-gray-800 dark:bg-gray-950 dark:text-gray-300"
                    aria-hidden="true"
                  >
                    {user.initials}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-50">
                      {user.email}
                    </p>
                    <p className="text-xs text-gray-500">
                      Expires in {user.expires} days
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Select defaultValue={user.role}>
                    <SelectTrigger className="h-8 w-32">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent align="end">
                      {roles.map((role) => (
                        <SelectItem
                          key={role.value}
                          value={role.value}
                          disabled={role.value === "admin"}
                        >
                          {role.label}
                        </SelectItem>
                      ))}
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
                      <DropdownMenuItem
                        className="text-red-600 dark:text-red-500"
                        disabled={user.role === "admin"}
                      >
                        Revoke invitation
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </li>
            ))}
          </ul>
        </section> */}
    </>
  )
}
