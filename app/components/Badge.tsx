// Tremor Raw Badge [v0.0.0]

import React from "react"
import { tv, type VariantProps } from "tailwind-variants"

import { cx } from "@/app/lib/utils"

const badgeVariants = tv({
  base: cx(
    "inline-flex items-center gap-x-1 whitespace-nowrap rounded px-1.5 py-0.5 text-xs font-semibold ring-1",
  ),
  variants: {
    variant: {
      default: [
        "bg-indigo-50 text-indigo-800 ring-indigo-500/30",
        "dark:bg-indigo-400/10 dark:text-indigo-400 dark:ring-indigo-400/30",
      ],
      neutral: [
        "bg-gray-50 text-gray-700 ring-gray-500/30",
        "dark:bg-gray-400/10 dark:text-gray-300 dark:ring-gray-400/20",
      ],
      success: [
        "bg-emerald-50 text-emerald-800 ring-emerald-600/30",
        "dark:bg-emerald-400/10 dark:text-emerald-400 dark:ring-emerald-400/20",
      ],
      error: [
        "bg-red-50 text-red-800 ring-red-600/20",
        "dark:bg-red-400/10 dark:text-red-400 dark:ring-red-400/20",
      ],
      warning: [
        "bg-yellow-50 text-yellow-800 ring-yellow-600/30",
        "dark:bg-yellow-400/10 dark:text-yellow-500 dark:ring-yellow-400/20",
      ],
      progress: [
        "bg-indigo-50 text-indigo-800 ring-indigo-600/30",
        "dark:bg-indigo-400/10 dark:text-indigo-500 dark:ring-indigo-400/20",
      ],
    },
  },
  defaultVariants: {
    variant: "default",
  },
})
const badgeSquareStyle = (variant: BadgeProps['variant']) => {
  const variantClasses = {
    default: 'bg-indigo-500 dark:bg-indigo-600 shadow-sm',
    neutral: 'bg-gray-500 dark:bg-gray-600 shadow-sm',
    success: 'bg-emerald-500 dark:bg-emerald-600 shadow-sm',
    error: 'bg-red-500 dark:bg-red-600 shadow-sm',
    warning: 'bg-yellow-500 dark:bg-yellow-600 shadow-sm',
    progress: 'bg-indigo-500 dark:bg-indigo-600 shadow-sm',
  }

  return variantClasses[variant as keyof typeof variantClasses] || variantClasses.default
}

interface BadgeProps
  extends React.ComponentPropsWithoutRef<"span">,
  VariantProps<typeof badgeVariants> {
  showSquare?: boolean
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, showSquare, ...props }: BadgeProps, forwardedRef) => {
    return (
      <span
        ref={forwardedRef}
        className={cx(badgeVariants({ variant }), className)}
        {...props}
      >
        {showSquare && (
          <span
            className={cx(
              "inline-block size-2 rounded-sm bg-rose-900",
              badgeSquareStyle(variant)
            )}
          />
        )}
        {props.children}
      </span>
    )
  },
)

Badge.displayName = "Badge"

export { Badge, badgeVariants, type BadgeProps }

