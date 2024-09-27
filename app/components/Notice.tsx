"use client"
import * as React from "react"
import { tv, type VariantProps } from "tailwind-variants"
import { cx, focusInput, focusRing } from "@/app/lib/utils"
import Link from "next/link"

const noticeVariants = tv({
  base: cx(
    "flex flex-col gap-4 justify-center items-center cursor-default select-none text-sm",
  ),
  variants: {
    variant: {
      default: [
        "bg-indigo-50 text-indigo-800",
        "dark:bg-indigo-400/10 dark:text-indigo-400",
      ],
      neutral: [
        "bg-gray-50 text-gray-700",
        "dark:bg-gray-400/10 dark:text-gray-300",
      ],
      success: [
        "bg-emerald-50 text-emerald-800",
        "dark:bg-emerald-400/10 dark:text-emerald-400",
      ],
      error: [
        "bg-red-50 text-red-800",
        "dark:bg-red-400/10 dark:text-red-400",
      ],
      warning: [
        "bg-yellow-50 text-yellow-800",
        "dark:bg-yellow-400/10 dark:text-yellow-500",
      ],
      progress: [
        "bg-indigo-50 text-indigo-800",
        "dark:bg-indigo-400/10 dark:text-indigo-500",
      ],
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

interface NoticeProps extends VariantProps<typeof noticeVariants> {
  children?: React.ReactNode
  className?: string
}


 export const Notice = ({children, className}: NoticeProps) => {
  return (
    <div className={cx("flex flex-col gap-4 justify-center items-center cursor-default select-none text-sm", className)}>
      <div
        className={cx(`relative z-10 h-fit w-[19rem] p-[1px] rounded-[1.3rem] bg-neutral-300 flex justify-center items-center shadow-lg transition-all duration-300`)}
      >

        <div className={cx("relative z-30 h-full w-full p-[1px] rounded-[1.25rem] bg-gradient-to-b from-indigo-50 to-indigo-100", className)}>
          <div className={cx("relative z-40 h-full w-full rounded-[1.2rem] bg-indigo-100 p-4 flex flex-col", className)}>


            <div className="self-end mt-auto flex flex-col gap-2">
              <h2 className={cx("scroll-mt-10 font-semibold text-indigo-900 dark:text-gray-50", className)}>Optimize Your Workflow</h2>
              <p className={cx("font-normal text-neutral-500", className)}>
                Click here to streamline your tasks.
                <br />
                Automate repetitive processes and focus on your priorities.
              </p>

              <p className={cx("text-indigo-900 underline underline-offset-2 text-left w-20 whitespace-nowrap", className)}>
                <Link href="/">
                  Learn More
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
