"use client"

import { Badge, BadgeProps } from "@/app/components/Badge"
import { Button } from "@/app/components/Button"
import { ModalManageStatusTag } from "@/app/components/ui/settings/ModalManageStatusTag"
import { RiAddLine, RiEditLine } from "@remixicon/react"
import { Status, CategorizedStatuses } from "@/src/entities/models/status"
import { useEffect, useState } from "react"
import { useStatuses, useUpdateStatus } from "@/app/hooks/useStatuses"
import { useUser } from "@/app/hooks/useUser"

export default function Statuses() {
  const { data: user, isLoading, error } = useUser()
  const { data: categorizedStatuses, isLoading: isStatusesLoading, error: statusesError } = useStatuses()
  const updateStatusMutation = useUpdateStatus()

  const handleSave = (status: Partial<Status>) => {
    updateStatusMutation(status as Status)
  }

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
                categories={categorizedStatuses ?? {}}
                onSave={(status) => handleSave(status as Partial<Status>)}>
                <Button variant="solid" className="mt-4 w-full gap-2 sm:mt-0 sm:w-fit">
                  <RiAddLine className="-ml-1 size-4 shrink-0" aria-hidden="true" />
                  Add status
                </Button>
              </ModalManageStatusTag>
            </div>
            <ul
              role="list"
              className="mt-6 "
            >
              {Object.entries(categorizedStatuses ?? {}).map(([category, tags]) => (
                <div key={category} className="mt-6">
                  <p className="text-sm font-semibold">Category / {category.charAt(0).toUpperCase() + category.slice(1)}</p>
                  <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-800 mt-3 divide-dashed">
                    {tags.map((tag: Status) => (
                      <li key={tag.id} className="flex items-center justify-between py-2.5">
                        <Badge className="inline-flex items-center whitespace-nowrap rounded-md px-2 py-1 text-xs font-medium gap-2" showSquare variant={tag.style_variant as BadgeProps["variant"] ?? "default"}>
                          {tag.label}
                        </Badge>
                        <div className="flex items-center gap-2">
                          <ModalManageStatusTag categories={categorizedStatuses ?? {}} existingTag={tag} onSave={(status) => handleSave(status as Partial<Status>)}>
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
    </>
  )
}
