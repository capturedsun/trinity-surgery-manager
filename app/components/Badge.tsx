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
      ],
      neutral: [
        "bg-gray-50 text-gray-700 ring-gray-500/30",
      ],
      success: [
        "bg-emerald-50 text-emerald-800 ring-emerald-600/30",
      ],
      error: [
        "bg-red-50 text-red-800 ring-red-600/20",
      ],
      warning: [
        "bg-yellow-50 text-yellow-800 ring-yellow-600/30",
      ],
      progress: [
        "bg-indigo-50 text-indigo-800 ring-indigo-600/30",
      ],
    },
  },
  defaultVariants: {
    variant: "default",
  },
})
const badgeSquareStyle = (variant: BadgeProps['variant']) => {
  const variantClasses = {
    default: 'bg-indigo-500 shadow-sm border-indigo-400',
    neutral: 'bg-gray-500 shadow-sm border-gray-400',
    success: 'bg-emerald-500 shadow-sm border-emerald-400',
    error: 'bg-red-500 shadow-sm border-red-400',
    warning: 'bg-yellow-500 shadow-sm border-yellow-400',
    progress: 'bg-indigo-500 shadow-sm border-indigo-400',
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
              "inline-block size-2 rounded-full border",
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

