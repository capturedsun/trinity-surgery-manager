// Tremor Raw ProgressCircle [v0.0.0]

import * as React from "react"
import { tv, VariantProps } from "tailwind-variants"

import { cx } from "@/app/lib/utils"

const progressCircleVariants = tv({
  slots: {
    background: "",
    circle: "",
  },
  variants: {
    variant: {
      default: {
        background: "stroke-indigo-200 dark:stroke-indigo-500/30",
        circle: "stroke-indigo-600 dark:stroke-indigo-500",
      },
      neutral: {
        background: "stroke-gray-200 dark:stroke-gray-500/40",
        circle: "stroke-gray-500 dark:stroke-gray-500",
      },
      warning: {
        background: "stroke-yellow-200 dark:stroke-yellow-500/30",
        circle: "stroke-yellow-500 dark:stroke-yellow-500",
      },
      error: {
        background: "stroke-red-200 dark:stroke-red-500/30",
        circle: "stroke-red-500 dark:stroke-red-500",
      },
      success: {
        background: "stroke-emerald-200 dark:stroke-emerald-500/30",
        circle: "stroke-emerald-500 dark:stroke-emerald-500",
      },
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

interface ProgressCircleProps
  extends Omit<React.SVGProps<SVGSVGElement>, "value">,
  VariantProps<typeof progressCircleVariants> {
  value?: number
  max?: number
  showAnimation?: boolean
  radius?: number
  strokeWidth?: number
  children?: React.ReactNode
}

const ProgressCircle = React.forwardRef<SVGSVGElement, ProgressCircleProps>(
  (
    {
      value = 0,
      max = 100,
      radius = 32,
      strokeWidth = 6,
      showAnimation = true,
      variant,
      className,
      children,
      ...props
    }: ProgressCircleProps,
    forwardedRef,
  ) => {
    const safeValue = Math.min(max, Math.max(value, 0))
    const normalizedRadius = radius - strokeWidth / 2
    const circumference = normalizedRadius * 2 * Math.PI
    const offset = circumference - (safeValue / max) * circumference

    const { background, circle } = progressCircleVariants({ variant })
    return (
      <>
        <div className={cx("relative")}>
          <svg
            ref={forwardedRef}
            width={radius * 2}
            height={radius * 2}
            viewBox={`0 0 ${radius * 2} ${radius * 2}`}
            className={cx("-rotate-90 transform", className)}
            role="progress circle"
            aria-label="progress bar"
            aria-valuenow={value}
            aria-valuemin={0}
            aria-valuemax={max}
            data-max={max}
            data-value={safeValue ?? null}
            {...props}
          >
            <circle
              r={normalizedRadius}
              cx={radius}
              cy={radius}
              strokeWidth={strokeWidth}
              fill="transparent"
              stroke=""
              strokeLinecap="round"
              className={cx("transition-colors ease-linear", background())}
            />
            {safeValue >= 0 ? (
              <circle
                r={normalizedRadius}
                cx={radius}
                cy={radius}
                strokeWidth={strokeWidth}
                strokeDasharray={`${circumference} ${circumference}`}
                strokeDashoffset={offset}
                fill="transparent"
                stroke=""
                strokeLinecap="round"
                className={cx(
                  "transition-colors ease-linear",
                  circle(),
                  showAnimation && "transition-all duration-300 ease-in-out",
                )}
              />
            ) : null}
          </svg>
          <div
            className={cx("absolute inset-0 flex items-center justify-center")}
          >
            {children}
          </div>
        </div>
      </>
    )
  },
)

ProgressCircle.displayName = "ProgressCircle"

export { ProgressCircle, type ProgressCircleProps }

