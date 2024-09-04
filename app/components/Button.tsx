// Tremor Raw Button [v0.0.0]

import { Slot } from "@radix-ui/react-slot"
import { RiLoader2Fill } from "@remixicon/react"
import React from "react"
import { tv, type VariantProps } from "tailwind-variants"

import { cx, focusRing } from "@/app/lib/utils"

const buttonVariants = tv({
  base: [
    // base
    "relative inline-flex items-center justify-center whitespace-nowrap rounded-[0.375rem] px-[0.75rem] py-[0.375rem] text-center text-base font-medium shadow-sm transition-all ease-in-out duration-200 font-500 text-[0.8125rem] leading-[1.38462] h-fit",
    // disabled
    "disabled:pointer-events-none disabled:shadow-none",
    // focus
    focusRing,
    // pseudo-element
    "after:absolute after:content-[''] after:rounded-[inherit] after:-z-[1] after:inset-0 after:opacity-100 after:transition-[background-color,background,border-color,color,fill,stroke,opacity,box-shadow,transform] after:duration-100 after:bg-gradient-to-b after:from-white/[0.11] after:to-transparent",
  ],
  variants: {
    variant: {
      primary: [
        // base
        "isolate",
        // border
        "border-[hsla(153,100%,12%,1)]",
        // text color
        "text-white dark:text-gray-50",
        // background color
        "bg-[hsla(153,100%,12%,1)] dark:bg-[hsla(333,100%,12%,1)]",
        // hover color
        "hover:bg-[hsla(153,100%,22%,1)] dark:hover:bg-[hsla(333,100%,22%,1)]",
        // hover border
        "hover:border-[hsla(153,100%,22%,1)] dark:hover:border-[hsla(333,100%,22%,1)]",
        // disabled
        "disabled:bg-indigo-100 disabled:text-gray-400",
        "disabled:dark:bg-indigo-800 disabled:dark:text-indigo-400",
        // custom box shadow
        "shadow-[0_0_0_1px_rgb(0,61,34),inset_0_1px_1px_0_rgba(255,255,255,0.07),0_2px_3px_0_rgba(34,42,53,0.2),0_1px_1px_0_rgba(0,0,0,0.24)]",
        // hover alpha overlay
        "hover:after:bg-[hsla(0,0%,0%,0.03)]",
      ],
      secondary: [
        // border
        "border-gray-300 dark:border-gray-800",
        // text color
        "text-gray-900 dark:text-gray-50",
        // background color
        "bg-white dark:bg-gray-950",
        //hover color
        "hover:bg-gray-50 dark:hover:bg-gray-900/60",
        // disabled
        "disabled:text-gray-400",
        "disabled:dark:text-gray-600",
      ],
      light: [
        // base
        "shadow-none",
        // border
        "border-transparent",
        // text color
        "text-gray-900 dark:text-gray-50",
        // background color
        "bg-gray-200 dark:bg-gray-900",
        // hover color
        "hover:bg-gray-300/70 dark:hover:bg-gray-800/80",
        // disabled
        "disabled:bg-gray-100 disabled:text-gray-400",
        "disabled:dark:bg-gray-800 disabled:dark:text-gray-600",
      ],
      ghost: [
        // base
        "shadow-none",
        // border
        "border-transparent",
        // text color
        "text-gray-900 dark:text-gray-50",
        // disabled
        "disabled:bg-gray-100 disabled:text-gray-400",
        "disabled:dark:bg-gray-800 disabled:dark:text-gray-600",
      ],
      destructive: [
        // text color
        "text-white",
        // border
        "border-transparent",
        // background color
        "bg-red-600 dark:bg-red-700",
        // hover color
        "hover:bg-red-700 dark:hover:bg-red-600",
        // disabled
        "disabled:bg-red-300 disabled:text-white",
        "disabled:dark:bg-red-950 disabled:dark:text-red-400",
      ],
    },
  },
  defaultVariants: {
    variant: "primary",
  },
})

interface ButtonProps
  extends React.ComponentPropsWithoutRef<"button">,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
  isLoading?: boolean
  loadingText?: string
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      asChild,
      isLoading = false,
      loadingText,
      className,
      disabled,
      variant,
      children,
      ...props
    }: ButtonProps,
    forwardedRef,
  ) => {
    const Component = asChild ? Slot : "button"
    return (
      <Component
        ref={forwardedRef}
        className={cx(buttonVariants({ variant }), className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <span className="pointer-events-none flex shrink-0 items-center justify-center gap-1.5">
            <RiLoader2Fill
              className="size-4 shrink-0 animate-spin"
              aria-hidden="true"
            />
            <span className="sr-only">
              {loadingText ? loadingText : "Loading"}
            </span>
            {loadingText ? loadingText : children}
          </span>
        ) : (
          children
        )}
      </Component>
    )
  },
)

Button.displayName = "Button"

export { Button, buttonVariants, type ButtonProps }

